module.exports = {
  model: "production",
  externals: {
    //拒绝jQuery被打包进来
    //在 index.html中CDN引入
    jquery: "jQuery",
  },
};
