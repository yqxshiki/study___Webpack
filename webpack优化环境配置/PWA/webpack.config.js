/**
 * PWA:渐进式网络开发应用程序
 * workbox-->workbox-webpack-plugin
 */
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
module.exports = {
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
