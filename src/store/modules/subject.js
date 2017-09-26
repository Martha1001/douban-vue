import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

export default {
  state: {
    detail: [],
    classify: '',
    type: [],
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
              .get('https://api.douban.com/v2/')
              .use(jsonp)
              .end((err, res) => {
                if (!err) {
                  commit({
                    type: 'GET_SUBJECT',
                    classify: subject2.classify,
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