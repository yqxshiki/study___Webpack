const { resolve } = require("path");
const HtmlWebpackPlugins = require("html-webpack-plugin");

module.exports = {
  entry: "",
  output: {
    filename: "build.js",
    path: resolve(__dirnamem, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    //创建一个空的html 引入打包输出的所有资源（js、css）
    new HtmlWebpackPlugins({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
