import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Index from './views/Index.vue'
import Blog from './views/Blog.vue'
import Archive from './views/Archive'
import Tag from './views/Tag'

Vue.use(Router)

export default new Router({
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
        },
        {
          path: '/tag',
          name: 'tag',
          component: Tag,
          children: [
            {
              path: ':id',
              component: Tag
            }
          ]
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
