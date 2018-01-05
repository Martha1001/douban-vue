import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Page from '@/view/PageFrame'
import Home from '@/view/HomeView'
import Activity from '@/view/ActivityView'
import Movie from '@/view/MovieView'
import Subject from '@/view/SubjectView'

import Book from '@/view/BookView'

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      // name: 'all',
      component: Page,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/activity/:eventId',
          name: 'Activity',
          component: Activity
        },
        {
          path: '/movie',
          name: 'Movie',
          component: Movie
        },
        {
          path: 'book',
          name: 'Book',
          component: Book
        },
        {
          path: '/:classify/subject/:subjectId',
          name: 'Subject',
          component: Subject
        }
      ]
    }

  ]
})
