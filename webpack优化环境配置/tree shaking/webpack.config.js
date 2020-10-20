const { resolve } = require("path");
const MiniCssExtractPlguin = require("mini-css-extract-plguin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "production";

/**
 * tree shaking: 去除无用代码
 * 前提：1 必须使用ES6模块化
 *   2 开启production模式
 * 作用:减少代码体积
 *
 *  package.json中配置
 * "seideEffects":fase 所以柋都没有副作用（都进行tree shaking）
 */
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
    filename: "js/build.[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
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
        //loader 只会匹配一个
        //注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, "less-loader"],
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
              //开启babel缓存
              //第二次构建时，会读取之前的缓存
              cacheDirectory: true,
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
            test: /.html$/,
            loader: "html-loader",
          },
          {
            exclude: /.(js|css|html|jpg|png|gif)/,
            loader: "file-loader",
            options: {
              outputPath: "media",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlguin({
      filename: "css/build.[contenthash:10].css",
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
