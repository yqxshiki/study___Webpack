module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          /**
           * 开启多进程打包
           * 进程大概600ms
           * 只有工作消耗时间长 长需要使用多进程
           */
          {
            loader: "thread-loader",
            options: {
              //进程2个
              workers: 2,
            },
          },
        ],
      },
    ],
  },
};
