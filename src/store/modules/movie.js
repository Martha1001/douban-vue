import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

export default {
  state: {
    hotMovie: [],
    topMovie: [],
    newMovie: [],
    movieDetail:[],
    findThing: [
      {
        title: '同时入选IMDB250和豆瓣电影250的电影',
        href: 'https://m.douban.com/doulist/968362/',
        color: '#FFAC2D'
      },
      {
        title: '带你进入不正常的世界',
        href: 'https://m.douban.com/doulist/16002',
        color: '#FF4055'
      },
      {
        title: '用电【影】来祭奠逝去的岁月',
        href: 'https://m.douban.com/doulist/190343',
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
        title: '科幻是未来的钥匙——科幻启示录【科幻题材】',
        href: 'https://m.douban.com/doulist/4253902',
        color: '#2384E8'
      },
      {
        title: '美国生活面面观',
        href: 'https://m.douban.com/doulist/121326',
        color: '#3BA94D'
      },
      {
        title: '2015终极期待',
        href: 'https://m.douban.com/doulist/37479562',
        color: '#42BD56'
      },
      {
        title: '经典韩国电影——收集100部',
        href: 'https://m.douban.com/doulist/458087',
        color: '#CC3344'
      }
    ],
    movieType: [
      {
        title: '经典',
        href: 'movie/classic'
      },
      {
        title: '冷门佳片',
        href: 'movie/underrated'
      },
      {
        title: '豆瓣高分',
        href: 'movie/doubantop'
      },
      {
        title: '动作',
        href: 'movie/action'
      },
      {
        title: '喜剧',
        href: 'movie/comedy'
      },
      {
        title: '爱情',
        href: 'movie/love'
      },
      {
        title: '悬疑',
        href: 'movie/mystery'
      },
      {
        title: '恐怖',
        href: 'movie/horror'
      },
      {
        title: '科幻',
        href: 'movie/scifi'
      },
      {
        title: '治愈',
        href: 'movie/sweet'
      },
      {
        title: '文艺',
        href: 'movie/artfilm'
      },
      {
        title: '成长',
        href: 'movie/youth'
      },
      {
        title: '动画',
        href: 'movie/animation'
      },
      {
        title: '华语',
        href: 'movie/chinese'
      },
      {
        title: '欧美',
        href: 'movie/western'
      },
      {
        title: '韩国',
        href: 'movie/korean'
      },
      {
        title: '日本',
        href: 'movie/japanese'
      }
    ]
  },
  mutations: {
    GET_MOVIE(state, movie) {
      switch (movie.tag) {
        case 'hotMovie':
          state.hotMovie = movie.data1
          break
        case 'topMovie':
          state.topMovie = movie.data1
          break
        case 'newMovie':
          state.newMovie = movie.data1
          break
        default:
          state.hotMoviev = movie.data1
      }
    },
    GET_MOVIE_DETAIL(state,detail){
      // state.movieDetail = detail.data2
    }
  },
  actions: {
    getMovie({ commit }) {
      superagent
        .get('http://api.douban.com/v2/movie/in_theaters?city=上海&count=2')
        .use(jsonp)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'GET_MOVIE',
              tag: 'hotMovie',
              data1: res.body.subjects
            })
          }
        })
      superagent
        .get('http://api.douban.com/v2/movie/top250?count=2')
        .use(jsonp)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'GET_MOVIE',
              tag: 'topMovie',
              data1: res.body.subjects
            })
          }
        })
      superagent
        .get('http://api.douban.com/v2/movie/coming_soon?count=2')
        .use(jsonp)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'GET_MOVIE',
              tag: 'newMovie',
              data1: res.body.subjects
            })
          }
        })
    },
    getMovieDetail({commit},detail){
      return new Promise((resolve,reject)=>{
        superagent
          .get('http://api.douban.com/v2/movie/subject/'+detail.movieDetailId)
          .use(jsonp)
          .end((err,res)=>{
            if(!err){
              commit({
                type:'GET_MOVIE_DETAIL',
                data2:res.body
              })
            }
            resolve(res)
          })
      })
    }
  }
}