const path = require('path')
const webpack = require('webpack')
// 合并webpack配置项 - 深度合并覆盖
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    // 告诉webpack是什么环境，然后打包对应的文件
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  // 生成html文件(or 用template绑定到一个html上)
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  // 处理vue文件
  new VueLoaderPlugin(),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  // 编译过程的错误显示到网页上
  overlay: {
    errors: true
  },
  // router设置为history之后，由于前段的路径和后端不同，导致后端找不到页面，所以要指定默认渲染的html
  // 指定的文件路径为HTMLPlugin生成的html
  historyApiFallback: {
    index: '/public/index.html'
  },
  // 启动的时候自动打开浏览器
  open: false,
  // 修改代码后只重新加载当前组件，防止页面刷新数据丢失
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    // 方便调试代码，不然展示的是编译后的代码
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            // 让vue文件内的样式热加载(同时也可以处理.css .styl等文件)
            'vue-style-loader',
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
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      // 配合 hot: true
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    // 入口文件
    entry: {
      app: path.join(__dirname, '../client/client-entry.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      // 将css单独打包一个文件
      new ExtractPlugin('styles.[hash:8].css')
      // CommonsChunkPlugin 在 webpack4 被废弃
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // })
    ])
  })
}

module.exports = config
