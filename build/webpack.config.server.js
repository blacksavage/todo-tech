const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // 运行在node环境，所以不需要打包依赖包
  externals: Object.keys(require('../package').dependencies),
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
  plugins: [
    // 将css单独打包一个文件
    new ExtractPlugin('styles.[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
