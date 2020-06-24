import Vue from "vue";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets，重置浏览器默认样式

import App from "@/App";
import router from "@/router/index";
import store from "@/store/index";

import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
import "@/styles/element-variables.scss";
import enLang from "element-ui/lib/locale/lang/en"; // 如果使用中文语言包，无需额外引入，请删除该依赖

import "@/icons"; // icon
import "@/router/permission"; // permission control

import "@/styles/index.scss"; // global css

// 设置ElementUI语言为英文
Vue.use(ElementUI, {
  // 如果使用中文，无需设置，请删除
  locale: enLang
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
