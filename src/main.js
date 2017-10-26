// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import store from './store/store'
import './assets/js/bootstrap.min'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
    el: '#container',
    router,
    store,
    template: '<App/>',
    components: { App }
})