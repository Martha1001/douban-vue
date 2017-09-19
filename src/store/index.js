import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import activity from './modules/activity'


var store = new Vuex.Store({
  modules:{
    activity,
  }
})