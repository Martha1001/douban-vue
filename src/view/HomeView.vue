<template>
  <div class="home">
    <quick-nav></quick-nav>
    <span @click="loadMore">loadMore</span>    
    <home-list :items="events"></home-list>
    <!-- <infinite-loading @infinite="infiniteHandler">
      <loading slot="spinner"></loading>
    </infinite-loading> -->
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  import QuickNav from '../components/QuickNav.vue'
  import HomeList from '../components/HomeList.vue'
  import Loading from '../components/Loading.vue'

  export default {
    name: 'home',
    data(){
      return{}
    },
    components: {
      QuickNav,
      HomeList,
      Loading,
      InfiniteLoading
    },
    computed: {
      ...mapState({
        events: state => state.activity.events
      })
    },
    methods: {
      infiniteHandler($state){
        setTimeout(()=>{
          this.loadMore()
          $state.loaded();
        },1000)
      },
      ...mapActions([
        'loadMore'
      ])
    }
  }

</script>

<style scoped>
  .home {
    margin: 0 14px;
  }
</style>