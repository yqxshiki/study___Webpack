/**
 * HMR:模块热替换
 *  一个模块发生变化 ,只会重新打包这一个模块
 * 极大的提升构建速度
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ["./src/index.js", "./src/index.html"],
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
        },
      },
      //处理html中的img资源
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      //处理其他资源
      {
        exclude: /\.(less|css|js|html|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
    //开启HMR
    hot: true,
  },
  devtool: "source-map",
};

/**
 * source-map:一种提供源代码到构建后代码映射技术
 *                                       外部
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 *
 * source-map
 * 外部
 * 错误代码准确信息 和源代码的错误位置
 *
 * inline-source-map
 * 内联  只生成一个source-map
 * 错误代码准确信息 和源代码的错误位置
 *
 * hidden-source-map
 * 外部
 * 错误代码准确信息 但是没有错误位置
 * 不能追踪源代码错，只能提示到构建后代码的错误位置
 *
 * eval-source-map
 * 内联 每个文件都生成一个对应的source-map  堵在eval
 * 错误代码准确信息 和源代码的错误位置
 *
 * nosources-source-map
 * 外部
 * 错误代码准确信息 但是没有任何源代码的信息
 *
 * cheap--source-map
 * 外部
 * 错误代码准确信息 和源代码的错误位置
 * 只能精确到行
 *
 * * cheap-module-source-map
 * 外部
 * 错误代码准确信息 和源代码的错误位置
 * 会将loader的source-map加入
 *
 *  内联合外部的区别：
 *   1 外部生成了文件 内联没有
 *   2 内联构建速度更快
 *
 * 开发环境：速度快 调试更友好
 *   eval-source-map
 *
 * 生产环境：源代码不不要隐藏 调试要不要更友好
 *
 * source-map
 */
