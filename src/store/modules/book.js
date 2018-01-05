import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

export default {
  state: {
    imaginaryBook: [],
    unimaginaryBook: [],
    bookDetail: [],
    findThing: [
      {
        title: '小波看书',
        href: 'https://m.douban.com/doulist/10372/',
        color: '#FFAC2D'
      },
      {
        title: '村上春树周边',
        href: 'https://m.douban.com/doulist/105583/',
        color: '#FF4055'
      },
      {
        title: '我凭名字认定了你',
        href: 'https://m.douban.com/doulist/99294/',
        color: '#4F9DED'
      },
      {
        title: '女孩们的故事【电影】',
        href: 'https://m.douban.com/doulist/1125971',
        color: '#FFC46C'
      },
      {
        line: true
      },
      {
        title: '爱欲书',
        href: 'https://m.douban.com/doulist/38088147/',
        color: '#3BA94D'
      },
      {
        title: '他们还写侦探小说',
        href: 'https://m.douban.com/doulist/645579/',
        color: '#42BD56'
      },
      {
        title: '人生识字始忧患',
        href: 'https://m.douban.com/doulist/192653/',
        color: '#CC3344'
      },
      {
        title: '不可饶恕的女人们',
        href: 'https://m.douban.com/doulist/35573/',
        color: '#2384E8'
      }
    ],
    bookType: [
      {
        title: '小说',
        href: 'movie/classic'
      },
      {
        title: '爱情',
        href: 'movie/underrated'
      },
      {
        title: '历史',
        href: 'movie/doubantop'
      },
      {
        title: '外国文学',
        href: 'movie/action'
      },
      {
        title: '青春',
        href: 'movie/comedy'
      },
      {
        title: '励志',
        href: 'movie/love'
      },
      {
        title: '随笔',
        href: 'movie/mystery'
      },
      {
        title: '传记',
        href: 'movie/horror'
      },
      {
        title: '推理',
        href: 'movie/scifi'
      },
      {
        title: '旅行',
        href: 'movie/sweet'
      },
      {
        title: '奇幻',
        href: 'movie/artfilm'
      },
      {
        title: '经管',
        href: 'movie/youth'
      }
    ]
  },
  mutations: {
    GET_BOOK(state, books) {
      switch (books.tag) {
        case 'imaginaryBook':
          state.imaginaryBook = books.data1
          break
        case 'unimaginaryBook':
          state.unimaginaryBook = books.data1
          break
        default:
          state.imaginaryBook = books.data1
      }
    },
  },
  actions: {
    getBook({ commit }) {
      superagent
        .get('https://api.douban.com/v2/book/search?q=虚构类&count=2')
        .use(jsonp)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'GET_BOOK',
              tag: 'imaginaryBook',
              data1: res.body.books
            })
            console.log('http')
          }
        })
      superagent
        .get('https://api.douban.com/v2/book/search?q=非虚构类&count=2')
        .use(jsonp)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'GET_BOOK',
              tag: 'unimaginaryBook',
              data1: res.body.books
            })
            console.log('http')
          }
        })
    },
    // getBookDetail({ commit }, detail) {
    //   return new Promise((resolve, reject) => {
    //     superagent
    //       .get('https://api.douban.com/v2/book/' + detail.movieDetailId)
    //       .use(jsonp)
    //       .end((err, res) => {
    //         if (!err) {
    //           commit({
    //             type: 'GET_MOVIE_DETAIL',
    //             data2: res.body
    //           })
    //         }
    //         resolve(res)
    //       })
    //   })
    // }
  }
}