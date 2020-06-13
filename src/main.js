// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import rainville_Strings from "./assets/rainville_strings.json"
Vue.prototype.rainville = rainville_Strings;

import PCorMobile from "./operate/pcormobile.js"
const pc_or_mobile_g = new PCorMobile();
Vue.prototype.pc_or_mobile = pc_or_mobile_g;

import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(VueAxios , axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
