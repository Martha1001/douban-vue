import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

export default {
  state: {
    skip: 0,
    events: [],
    eventDetail: {}
  },
  mutations: {
    LOAD_MORE(state, load) {
      state.skip += 3
      state.events = state.events.concat(load.data.events)
    },
    // GET_EVENT_DETAIL(state, getevent) {

    // }
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
              data: res.body
            })
          } else {
            console.log(err)
          }
        })
    },
    // getEventDetail({state,commit},) {
    //   superagent
    //     .get
    // }
  }
}