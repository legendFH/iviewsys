// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI);
import i18n from '../locale'
import config from '../config'
import importDirective from '../directive'
import installPlugin from '../plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

import global_ from './Base.vue'
Vue.prototype.$axios = axios;
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = global_.BASE_URL;

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// 实际打包时应该不引入mock
Vue.use(Vuetify)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
