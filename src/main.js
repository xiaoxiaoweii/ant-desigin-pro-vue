import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Antd from 'ant-design-vue' // 引入ant-design所有组件
// import 'ant-design-vue/dist/antd.less'; // 引入ant-design所有样式文件
// import  Button  from 'ant-design-vue/lib/button'; // 引入ant-design中的button组件
import "ant-design-vue/lib/button/style"; // 引入ant-design所有样式文件
import { Button } from "ant-design-vue"; // 引入ant-design中的button组件

Vue.config.productionTip = false;

Vue.use(Button); //全局注册ant组件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
