const { resolve } = require("path");
const HtmlWebnpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        //下载url-loader file-loader
        test: /.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          //小于8kb就 base64处理
          limit: 8 * 1024,
          //关闭url-loader的es6模块化
          esModule: false,
          //[ext] 文件的原扩展名
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        //处理html文件的img图片  引入img 从而使url-loader处理
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebnpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
