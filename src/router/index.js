import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/view/PageFrame'
import Home from '@/view/HomeView'
import Movie from '@/view/MovieView'
import Book from '@/view/BookView'
import Status from '@/view/StatusView'
import Group from '@/view/GroupView'
import Login from '@/view/LoginView'
import Register from '@/view/RegisterView'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'all',
      component: Page,
      children:[
        {
          path: '/',
          name: 'Home',
          component: Home 
        },
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/movie',
          name: 'Movie',
          component: Movie
        },
        // {
        //   path: 'book',
        //   name: 'Book',
        //   component: Book
        // },
        // {
        //   path: 'status',
        //   name: 'Status',
        //   component: Status
        // },
        // {
        //   path: 'group',
        //   name: 'Group',
        //   component: Group
        // }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
    
  ]
})
