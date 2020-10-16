module.exports = {
  //多入口
  //   entry: {
  //     index: "./src/js/index.js",
  //     test: "./src/js/test.js",
  //   },
  output: {
    filename: "js/[name].[contenthash:10].js",
  },
  /**
   * 可以将node-modules中代码单独打包一个chunk最终输出
   * 自动分析多入口chunk中，有没有公共的文件 有就打包一个单独的chunk
   */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
};
