// vue.config.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 按需加载
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  // svgLoader
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
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
            // 判断是否为no mock模式
          } else if (process.env.MOCK !== "none") {
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
