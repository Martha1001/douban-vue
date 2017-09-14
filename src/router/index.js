import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/view/PageFrame'
import Home from '@/view/HomeView'
import Movie from '@/view/MovieView'
import Book from '@/view/BookView'
import Status from '@/view/StatusView'
import Group from '@/view/GroupView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'all',
      component: Page,
      children:[
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'movie',
          name: 'Movie',
          component: Movie
        },
        {
          path: 'book',
          name: 'Book',
          component: Book
        },
        {
          path: 'status',
          name: 'Status',
          component: Status
        },
        {
          path: 'group',
          name: 'Group',
          component: Group
        }
      ]
    }
    
  ]
})
