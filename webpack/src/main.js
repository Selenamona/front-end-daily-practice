import Vue from 'vue';
import VueRouter from 'vue-router'
import test from './routers/index'
console.log("test", test)

import Home from './home.vue';

console.log('hello webpack');

const routes = [{ path: '/', component: Home }];

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
});

new Vue({
  router,
}).$mount('#app');
