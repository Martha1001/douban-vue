<template>
  <div class="home">
    <quick-nav></quick-nav>
    <div>
      <home-list></home-list>
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
  import QuickNav from '../components/QuickNav.vue'
  import HomeList from '../components/HomeList.vue'
  import Loading from '../components/Loading.vue'
  export default {
    name: 'home',
    components: {
      QuickNav,
      HomeList,
      Loading
    }
  }

</script>

<style scoped>
  .home {
    margin: 0 14px;
  }
</style>