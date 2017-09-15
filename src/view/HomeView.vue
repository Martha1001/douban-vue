<template>
  <div class="home">
    <quick-nav></quick-nav>
    <div>
      <home-list></home-list>
      <!-- <buffer></buffer> -->
    </div>
  </div>
</template>

<script>
  import QuickNav from '../components/QuickNav.vue'
  import HomeList from '../components/HomeList.vue'
  import Buffer from '../components/Buffer.vue'
  export default {
    name: 'home',
    components: {
      QuickNav,
      HomeList,
      Buffer
    }
  }

</script>

<style scoped>
  .home {
    margin: 0 14px;
  }
</style>