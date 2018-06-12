import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Index from './views/Index.vue'
import New from './views/New.vue'
import Blog from './views/Blog.vue'
import Archive from './views/Archive'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {
          name: 'home',
          component: Home,
          path: 'home'
        },
        {
          name: 'new',
          component: New,
          path: 'new'
        },
        {
          name: 'blog',
          path: 'blog',
          component: Blog,
          children: [
            {
              path: ':id',
              component: Blog
            }
          ]
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/archive',
          name: 'archive',
          component: Archive
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  } 
})
