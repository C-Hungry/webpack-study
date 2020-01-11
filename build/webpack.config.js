const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');
module.exports = {
  mode: "development", // 开发模式
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')], // 入口文件
    header: path.resolve(__dirname, '../src/header.js'), // 入口文件
  },
  output: {
    filename: "[name].[hash:8].js", // 打包后文件的名字
    path: path.resolve(__dirname, '../dist') // 打包后的目录
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: '../dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../publish/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../publish/header.html'),
      filename: 'header.html',
      chunks: 'header' // 与入口文件对应的模块名
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [Autoprefixer]
          }
        }, 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      ' @': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  }
}