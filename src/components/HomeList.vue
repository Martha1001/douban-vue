<template>
  <div class="home-list">
    <ul>
      <li>
        <router-link to="/">
          <div class="ct f-cl">
            <div class="img-wrap">
              <img src="../assets/avatar.png" alt="">
            </div>
            <h3>等待一年，终于有这部高分剧陪我一起丧了</h3>
            <p>下班之后，睡觉以前，让好电影与你相伴。新一季的《马男波杰克》依旧丧出天际。最值得推荐的影视内容，都在这里！</p>
          </div>
          <div class="feed">
            <span class="author">by.豆瓣电影</span>
            <span class="from">from.今晚我有空</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

</template>
<script>
export default {

}
</script>

<style scoped>
  .home-list li{
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
  .ct{
    margin-bottom: 8px;
  }
  .ct h3{
    font-size: 16px;
    margin-bottom: 8px;
  }
  .ct p{
    color: #999;
    font-size: 12px;  
  }
  .img-wrap{
    position: relative;
    float: right;
    width: 25%;
    height: 0;
    margin-left: 20px;
    padding-bottom: 25%;
  }
  .img-wrap img{
    position: absolute;
    top:0;
    width: 100%;
    height: 100%;
  }
  .feed{
    color: #aaa;
    font-size: 12px;
  }
  .author,.from{
    display: inline-block;
    width: 49%;
    max-width: 49%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .from{
    text-align: right;
  }
</style>