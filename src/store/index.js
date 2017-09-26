import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import activity from './modules/activity'
import movie from './modules/movie'
import book from './modules/book'
import subject from './modules/subject'


export default new Vuex.Store({
  modules:{
    activity,
    movie,
    book,
    subject,
  }
})