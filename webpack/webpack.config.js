const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry:"./src/main.js",
  output:{
    filename:"bundle.js",
    path:path.resolve(__dirname,"dist")
  },
  module: {
      rules: [
          {
              test: /.san$/,
              use: 'san-loader'
          }
      ]
  },
  // #配置文件中添加下列内容，代表服务启动的文件夹是dist
  devServer: {
     contentBase: './dist'
  },
  // 用来生成html文件，默认生成文件名是index.html
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html' //生成文件参照的模版也可以是其他文件
      })
  ],
}