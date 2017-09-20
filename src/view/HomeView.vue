<template>
  <div class="home">
    <quick-nav></quick-nav>
    <home-list :items="events"></home-list>
    <infinite-loading :on-insinite="onInfinite" ref="infiniteLoading">
      <Loading slot="spinner"></Loading>
    </infinite-loading>
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
      onInfinite(){
        this.loadMore()
        setTimeout(function(){
          this.$refs.infiniteLoading.$emit('$infiniteLoading:loaded')
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