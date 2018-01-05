import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

export default {
  state: {
    skip: 0,
    events: [],
    eventDetail: [],
    Alook:0,
    Ainterst:0
  },
  mutations: {
    LOAD_MORE(state, load) {
      state.skip += 3
      state.events = state.events.concat(load.data1)
    },
    GET_EVENT_DETAIL(state, getEvent) {
      state.eventDetail = getEvent.data2
    },
    ADD_ALOOK(state) {
      state.Alook++
    },
    ADD_AINTERST(state) {
      state.Ainterst++
    }
  },
  actions: {
    loadMore({ state, commit }) {
      superagent
        .get('https://api.douban.com/v2/event/list?loc=108296&start='
        + state.skip + '&count=3')
        .use(jsonp)
        .end(function (err, res) {
          if (!err) {
            commit({
              type: 'LOAD_MORE',
              data1: res.body.events
            })
            console.log('http')
          }
        })
    },
    getEventDetail({ state, commit }, getEvent) {
      return new Promise((resolve, reject) => {
        superagent
          .get('https://api.douban.com/v2/event/' + getEvent.activityId)
          .use(jsonp)
          .end(function (err, res) {
            if (!err) {
              commit({
                type: 'GET_EVENT_DETAIL',
                data2: res.body
              })
              console.log('http')
            }
            resolve(res)
          })
      })
    },
    AddAlook({commit}){
      commit({
        type:'ADD_ALOOK'
      })
    },
    AddAinterst({commit}){
      commit({
        type:'ADD_AINTERST'
      })
    }
  }
}