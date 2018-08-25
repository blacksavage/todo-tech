const path = require('path')
const webpack = require('webpack')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV = 'development'

const config = {
    // https://webpack.js.org/configuration/target/
    // 为类浏览器的环境提供编译
    target: 'web',
    // 入口文件
    entry: path.join(__dirname, 'src/index.js'),
    // 输出
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            // 如果stylus-loader生成了sourceMap，则直接使用stylus-loader生成的sourceMap，提升编译效率
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 如果小于1024k，就便以为base64
                            limit: 1024,
                            // 打包之后文件的名字
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // 告诉webpack是什么环境，然后打包对应的文件
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        // html编译
        new HTMLPlugin(),
        // vue-loader
        new vueLoaderPlugin(),

    ]
}

if (isDev) {
    // 方便调试代码，不然展示的是编译后的代码
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        // 编译过程的错误显示到网页上
        overlay: {
            errors: true
        },
        // 启动的时候自动打开浏览器
        open: false,
        // 修改代码后只重新加载当前组件，防止页面刷新数据丢失
        hot: true
    }
    config.plugins.push(
        // 配合 hot: true
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config