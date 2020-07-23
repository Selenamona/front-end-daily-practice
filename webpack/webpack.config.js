const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig,
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
    }],
  },
  // #配置文件中添加下列内容，代表服务启动的文件夹是dist
  devServer: {
    contentBase: './dist',
  },
  // 用来生成html文件，默认生成文件名是index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 生成文件参照的模版也可以是其他文件
    }),
    new VueLoaderPlugin()
  ],
};
