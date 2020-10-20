const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

/**
 * entry:入口起点
 *  1 string  输出一个bundle文件 chunk名称默认为main
 *  2 array  所有入口文件最终只会形成一个chunk 输出一个bundle文件  HMR html热更新生效
 *  3 object 有几个入口就有几个chunk 输出几个bundle文件 chunk名为key
 *
 */
module.export = {
  //   entry: "./src/index.js",
  //   entry: ["./src/index.js", "./src/add.js"],
  entry: {
    index: "./src/index.js",
    add: "./src/add.js",
  },

  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  plugin: [new HtmlWebpackPlugin()],
  mode: "development",
};
