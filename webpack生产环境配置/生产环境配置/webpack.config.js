const { resolve } = require("path");
const MiniCssExtractPlguin = require("mini-css-extract-plguin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "production";

const commonCssLoader = [
  MiniCssExtractPlguin.loader,
  "css-loader",
  {
    //还需要在package.json中配置  css兼容处理
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => {
        require("postcss-preset-env");
      },
    },
  },
];
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/build",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      /**
       * 一个文件只能一个loader处理
       * 当一个文件要被多个loader处理时 一定要指定loader的执行顺序
       */
      //在package.json中eslintConfig-->airbnb
      {
        test: /\.js$/,
        exclude: /node_modules/,
        //优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: { version: 3 },
                targets: {
                  chrome: "60",
                  firefox: "50",
                },
              },
            ],
          ],
        },
      },
      {
        test: /.(jpg|png|gif)/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(js|css|html|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlguin({
      filename: "css/build.css",
    }),
    //css代码压缩
    new OptimizeCssAssetsWebpackPlugin(),
    //html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: "production",
};
