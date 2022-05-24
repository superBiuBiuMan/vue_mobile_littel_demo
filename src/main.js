import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from "@/router"

import * as api from "@/api/index"

import rem from "@/utils/rem"
Vue.config.productionTip = false

new Vue({
  router,
  beforeCreate(){
    Vue.prototype.$API = api;
  },
  render: h => h(App),
}).$mount('#app')
