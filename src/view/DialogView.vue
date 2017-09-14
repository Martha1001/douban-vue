<template>
  <div class="dialog-box">
    <div class="header">
      <span class="close-btn" @click="CloseDialog">关闭</span>
      <form>
        <input type="text">
      </form>
    </div>
    <div class="menu-list">
      <ul class="f-cl">
        <li><a href="#" style="color: rgb(35, 132, 232);">电影<span>影院热映</span></a></li>
        <li><a href="#" style="color: rgb(122, 106, 219);">电视<span>正在热播</span></a></li>
        <li><a href="#" style="color: rgb(159, 120, 96);">图书<span>畅销排行</span></a></li>
        <li><a href="#" style="color: rgb(230, 70, 126);">同城<span>周末活动</span></a></li>
        <li><a href="#" style="color: rgb(42, 184, 204);">小组<span>志趣相投</span></a></li>
        <li><a href="#" style="color: rgb(244, 143, 46);">音乐<span>新碟榜</span></a></li>
        <li><a href="#" style="color: rgb(159, 120, 96);">阅读<span>电子书</span></a></li>
        <li><a href="#" style="color: rgb(87, 116, 197);">游戏<span>虚拟世界</span></a></li>
        <li><a href="#" style="color: rgb(89, 108, 221);">应用<span>玩手机</span></a></li>
        <li><a href="#" style="color: rgb(225, 100, 77);">东西<span>心爱之物</span></a></li>
        <li><a href="#" style="color: rgb(64, 207, 169);">FM<span>红心歌单</span></a></li>
        <li><a href="#" style="color: rgb(66, 189, 86);">市集<span>购买原创</span></a></li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'dialog',
    methods: {
      CloseDialog() {
        this.$emit('Close')
      }
    }
  }

</script>

<style scoped>
  .dialog-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: #fff;
  }
  .header {
    position: relative;
  }
  .header .close-btn{
    float: left;
    line-height: 50px;
    margin-left: 20px;
    color: #42bd56;
    font-size: 14px;
  }
  .header form{
    padding: 10px 20px 10px 60px;
  }
  .header form input{
    height: 30px;
    width:100%;
    background: #eee;
    border: none;
    border-radius: 4px;
  }

  .menu-list{
    margin-top: 25px;
  }
  .menu-list li {
    float: left;
    width: 33.333%;
    margin-bottom: 25px;
    text-align: center;
  }
  .menu-list li a{
    line-height: 30px;
    font-size: 24px;
  }
  .menu-list li span {
    display: block;
    line-height: 14px;
    color: #999;
    font-size: 12px;
  }
</style>