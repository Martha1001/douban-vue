<template>
  <ul class="tags f-cl">
    <li v-for="item in items">
      <router-link to="/">{{item}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props:['items']
}
</script>

<style scoped>
  .tags{
    margin-bottom: 15px;
  }
li{
  float: left;
  margin: 0 10px 10px 0;
  padding: 2px 14px;
  color: #666;
  font-size: 13px;
  background: #eee;
  border-radius: 10px;
}
</style>