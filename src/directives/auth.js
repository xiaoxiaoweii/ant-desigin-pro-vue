import { check } from "../utils/auth";

// 直接全局注册Vue组件 权限指令
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}
export default { install };
