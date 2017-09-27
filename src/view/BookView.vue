<template>
    <div class="movie">
      <scroller title="影院热映" type="imgList" :items="hotMovie"></scroller>
      <scroller title="TOP250" type="imgList" :items="topMovie"></scroller>
      <scroller title="即将上映" type="imgList" :items="newMovie"></scroller>
      <scroller title="发现好电影" type="findList" :items="findThing"></scroller>
      <types :items="movieType" title="分类浏览"></types>
      <down-app></down-app>
    </div>
  </template>
  
  <script>
    import { mapState, mapActions } from 'vuex'
  
    import Scroller from '../components/Scroller.vue'
    import Types from '../components/Types.vue'
    import DownApp from '../components/DownApp.vue'
  
    export default {
      data(){
        return{}
      },
      components:{
        Scroller,
        Types,
        DownApp
      },
      computed:{
        ...mapState({
          hotMovie: state => state.movie.hotMovie,
          topMovie: state => state.movie.topMovie,
          newMovie: state => state.movie.newMovie,
          findThing: state => state.movie.findThing,
          movieType: state => state.movie.movieType
        })
      },
      methods:{
        ...mapActions([
          'getMovie'
        ])
      },
      created(){
        this.getMovie()
      }
    }
  </script>
  
  <style scoped>
  
  </style>