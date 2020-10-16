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
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        //除了js css html 之外的资源
        exclude: /\.(js|css|html)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
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
