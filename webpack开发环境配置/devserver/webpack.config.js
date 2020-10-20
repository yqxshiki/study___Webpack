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
  //只会在编译中打包 不会有任何输出
  //启动命令 npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, "build"),
    //启动gzip压缩
    compress: true,
    port: 3000,
    //自动打开浏览器
    open: true,
  },
};
