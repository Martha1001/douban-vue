<template>
  <div class="home">
    <quick-nav></quick-nav>
    <home-list :items="events"></home-list>
    <Loading></Loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  import QuickNav from '../components/QuickNav.vue'
  import HomeList from '../components/HomeList.vue'
  import Loading from '../components/Loading.vue'

  export default {
    name: 'home',
    components: {
      QuickNav,
      HomeList,
      Loading
    },
    computed: {
      // Getting Vuex State from store/modules/activities
      ...mapState({
        events: state => state.activities.events
      })
    },
    methods: {
    // Dispatching Actions
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