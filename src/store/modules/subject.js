import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

export default {
  state: {
    detail: {},
    classify: '',
    tag: [],
    type: []
  },
  getters: {
    getMeta(state) {
      if (state.classify == 'movie') {
        return state.detail.year + ' / ' +
          state.detail.genres.join(' / ') + ' / ' +
          state.detail.directors.map(idx => idx.name).join('(导演) / ') + ' (导演) / ' +
          state.detail.casts.map(idx => idx.name).join('(主演) / ') + ' (主演) / ' +
          state.detail.countries.join(' / ')
      } else if (state.classify == 'book') {
        return state.detail.author.join(' / ') + ' / / ' +
          state.detail.publisher + ' / ' +
          state.detail.pages + '页 / ' +
          state.detail.binding + ' / ' +
          state.detail.price
      }
    },
    getTag(state) {
      if (state.classify == 'movie') {
        return state.detail.genres
      } else if (state.classify == 'book') {
        return state.detail.tags
      }
    }
  },
  mutations: {
    GET_SUBJECT(state, subject) {
      state.classify = subject.classify
      state.detail = subject.data1
    }
  },
  actions: {
    getSubject({ commit }, subject) {
      return new Promise((resolve, reject) => {
        switch (subject.classify) {
          case 'movie':
            superagent
              .get('https://api.douban.com/v2/' + subject.classify + '/subject/' + subject.id)
              .use(jsonp)
              .end((err, res) => {
                if (!err) {
                  commit({
                    type: 'GET_SUBJECT',
                    classify: subject.classify,
                    data1: res.body
                  })
                  resolve(res)
                }
              })
            break
          case 'book':
            superagent
              .get('https://api.douban.com/v2/' + subject.classify + '/' + subject.id)
              .use(jsonp)
              .end((err, res) => {
                if (!err) {
                  commit({
                    type: 'GET_SUBJECT',
                    classify: subject.classify,
                    data1: res.body
                  })
                  resolve(res)
                }
              })
            break
          default:
            console.log('API is error!')
        }
      })
    }
  }
}