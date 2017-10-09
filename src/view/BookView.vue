<template>
    <div class="movie">
      <scroller title="最受关注图书|虚构类" type="imgList" :items="imaginaryBook"></scroller>
      <scroller title="最受关注图书|非虚构类" type="imgList" :items="unimaginaryBook"></scroller>
      <scroller title="发现图书" type="findList" :items="findThing"></scroller>
      <types :items="bookType" title="分类浏览"></types>
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
          imaginaryBook: state => state.book.imaginaryBook,
          unimaginaryBook: state => state.book.unimaginaryBook,
          findThing: state => state.book.findThing,
          bookType: state => state.book.bookType
        })
      },
      methods:{
        ...mapActions([
          'getBook'
        ])
      },
      created(){
        this.getBook()
      }
    }
  </script>
  
  <style scoped>
  
  </style>