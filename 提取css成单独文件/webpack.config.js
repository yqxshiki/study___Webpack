const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//设置nodejs环境变量
process.env.NODE_ENV = "development";

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader"
          // 代替style-loader  提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          "css-loader",
          /**
           * css兼容处理 postcss-loader postcss-preset-env
           *  "browserslist": {
                    "development": [
                    "last 1 chrome version",
                    "last 1 firefox version",
                    "last 1 safari version"
                    ],
                    默认生产环境
                    "production": [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                    ]
                }
           */
          //   'postcss-loader' 修改loader的默认配置
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => {
                require("postcss-preset-env");
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templact: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      //输出的css文件名
      filename: "css/build.css",
    }),
  ],
  mode: "development",
};
