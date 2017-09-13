import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Movie from '@/view/movie'
import Book from '@/view/book'
import Status from '@/view/status'
import Group from '@/view/group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'All',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/status',
      name: 'Status',
      component: Status
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    }
  ]
})
