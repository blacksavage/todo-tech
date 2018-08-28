const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    // https://webpack.js.org/configuration/target/
    // 为类浏览器的环境提供编译
    target: 'web',
    // 入口文件
    entry: path.join(__dirname, '../client/index.js'),
    // 输出
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                // 预处理：在进行别的loader处理前，先进行eslint的处理(post：后处理)
                enforce: 'pre'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // 忽略依赖包文件夹里的js
                exclude: /node_modules/
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
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}

module.exports = config