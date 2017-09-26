<template>
  <div class="subject-boxc">
    <ad-banner title="聊聊你的观影感受"></ad-banner>
    <div class="subject f-ct">
      <h3 class="title f-tof">{{detail.title}}</h3>
      <div class="ct f-cl">
        <div class="meta-box">
          <div class="rating-box">
            <rating :rating="detail.rating"></rating>
            <span>{{detail.ratings_count}}人评价</span>
          </div>
          <div class="meta">资料资料资料资料资料资料资料资料资料资料资料资料资料资料资料</div>
        </div>
        <div class="img-box"><img :src="detail.images.large" alt=""></div>
      </div>
      <a class="btn-app" href="#">用APP查看影人资料</a>
      <div class="look-interst">
        <p class="show"><span>{{detail.wish_count}}</span>人想看，<span>{{detail.collect_count}}</span>人收藏</p>
        <div class="btn">
          <span>想看</span>
          <span>收藏</span>
        </div>
      </div>
      <div>
        <p>{{detail.title}}的剧情简介</p>
        <div>{{detail.summary}}</div>
      </div>
      <div>
        <p>影人</p>
      </div>
    </div>
    <tags title="查看更多豆瓣高分电影"></tags>
    <types title="了解更多电影信息"></types>
    <down-app></down-app>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import AdBanner from '../components/AdBanner.vue'
  import Tags from '../components/Tags.vue'
  import Types from '../components/Types.vue'
  import DownApp from '../components/DownApp.vue'
  import Rating from '../components/Rating.vue'

  export default {
    components: {
      AdBanner,
      Tags,
      Types,
      DownApp,
      Rating
    },
    computed: {
      ...mapState({
        detail: state => state.subject.detail
      })
    },
    created() {
      const id = this.$route.params.subjectId
      const classify = this.$route.params.classify
      this.$store.dispatch({
        type: 'getSubject',
        id: id,
        classify: classify
      })
    }
  }
</script>

<style scoped>
  .title{
    margin: 20px 0 10px;
    font-size: 24px;
  }
  .ct{
    margin-bottom: 15px;
  }
  .rating-box{
    margin-bottom: 10px;
    color: #999;  
    font-size: 14px;
  }
  .rating-box .rating{
    display: inline-block;
    margin-right: 10px; 
  }
  .meta-box{
    display: inline-block;
    width: 63%;
    margin-right: 4%;
    color: #666;
    font-size: 14px;
  }
  .img-box{
    float: right;
    position: relative;
    width: 33%;
    padding-top: 49.5%; 

  }
  .img-box img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .btn-app{

    color: #42bd56;
    font-size: 14px;
  }
</style>