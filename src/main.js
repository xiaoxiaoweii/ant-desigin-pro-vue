import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Antd from 'ant-design-vue' // 引入ant-design所有组件
// import 'ant-design-vue/dist/antd.less'; // 引入ant-design所有样式文件
// import  Button  from 'ant-design-vue/lib/button'; // 引入ant-design中的button组件
import "ant-design-vue/lib/button/style"; // 引入ant-design所有样式文件
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input
} from "ant-design-vue"; // 引入ant-design中的button组件
import Authorized from "../src/components/Authorized.vue";
import Auth from "../src/directives/auth";

Vue.config.productionTip = false;

Vue.use(Button); //全局注册button组件
Vue.use(Layout); //全局注册Layout组件
Vue.use(Icon); //全局注册Icon组件
Vue.use(Drawer); //全局注册Drawer组件
Vue.use(Radio); //全局注册Radio组件
Vue.use(Menu); //全局注册Menu组件
Vue.use(Form); //全局注册Form组件
Vue.use(Input); //全局注册Input组件
Vue.component("Authority", Authorized); //全局注册用户权限组件
Vue.use(Auth); // 全局注册权限指令

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
