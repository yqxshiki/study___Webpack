// 配置文件
// 所有构件工具都是基于nodejs运行的-模块化默认采用common.js
const { resolve } = require("path");

module.exports = {
  //入口七点
  entry: "./src/index.js",
  //输出
  output: {
    //输出文件名
    filename: "build.js",
    //输出路径 __dirname是nodejs的变量 代表当前文件的目录绝对路径'
    path: resolve(__dirname, "build"),
  },
  //loader的配置
  module: {
    rules: [
      //不同文件使用不同的loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        //下载less less-loader
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  //plugins的配置
  plugins: [
    //
  ],
  //模式
  mode: "development",
  //   model:"production"
};

// var a = 456;

// const obj = {
//   a: 123,
//   fn: () => {
//     console.log(this.a);
//   },
//   newFn() {
//     this.fn();
//   },
// };
// obj.fn();
// obj.newFn();
// obj.newFn() fn 此时的this指向newFn newFn里面没有a 找上级作用域window 也就是456
