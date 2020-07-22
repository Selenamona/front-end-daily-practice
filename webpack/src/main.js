import Vue from 'vue';
import VueRouter from 'vue-router'

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
