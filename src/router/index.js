import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/indexPage'
import searchItem from '../components/searchItem'
import Vuex from 'vuex'
Vue.use(Router)
Vue.use(Vuex)
/* eslint-disable */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: indexPage
    },
    {
    	path: '/searchItem',
    	name: 'searchItem',
    	component: searchItem
    }
  ]
})
