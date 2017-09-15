<template>
  <div class="dialog-nav">
    <ul class="unlogin">
      <li class="f-cl">
        <router-link to="/register">注册帐号</router-link>
        <router-link to="/login">登录豆瓣</router-link>
      </li>
      <li class="f-cl">
        <router-link to="#">使用桌面版</router-link>
        <router-link to="#">使用豆瓣APP</router-link>
      </li>
    </ul>
    <ul class="login"></ul>
  </div>
</template>

<script>

</script>

<style scoped>
  .dialog-nav{
    border-top: 1px solid #eee;
  }
  .dialog-nav li {
    border-bottom: 1px solid #eee;
  }

  .dialog-nav a {
    float: left;
    width: 49%;
    margin: 12px 0;
    color: #42bd56;
    font-size: 14px;
    text-align: center;
  }
  .dialog-nav a:first-child{
    border-right: 1px solid #eee;
  }
</style>