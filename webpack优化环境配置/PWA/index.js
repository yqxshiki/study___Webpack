/**
 * 注册serviceceworder
 * 处理兼容性问题
 *
 * package.json中配置
 *  "eslintConfig": {
 *  "env": {
 *    "browser": true
 *   }
 *  },
 *  sw 代码必须运行在服务器上
 */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("sw 注册成功了");
      })
      .catch(() => {
        console.log("sw 注册失败了");
      });
  });
}
