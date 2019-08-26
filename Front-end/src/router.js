import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index'
    },
    {
      path: '/city/:area/:target/:date_S/:date_E',
      name: 'city',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/City.vue')
    },
    {
      path: '/package/:city/:target/:date_S/:date_E',
      name: 'package',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Package.vue')
    },
    {
      path: '/stroke/:strokeDate',
      name: 'stroke',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Stroke.vue')
    }
  ]
})
