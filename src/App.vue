<template>
  <div id="app">
    <header-bar></header-bar>
  </div>
</template>

<script>
  import HeaderBar from './components/headerbar'

  export default {
    name: 'app',
    components: {
      HeaderBar
    }
  }

</script>

<style>
@import './assets/style.css';
</style>