// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // api代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            // 分割字符 重组api请求mock名称
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            // 寻找mock文件
            const mock = require(`./mock/${name}`);
            // 找到方法对应的mock数据
            const result = mock(req.method);
            // 清理上次的数据缓存 保证每次拿到的数据都是最新的
            delete require.cache[require.resolve(`./mock/${name}`)];
            // 将找到的数据返回
            return res.send(result);
          }
        }
      }
    }
  }
};
