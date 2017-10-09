<template>
  <div class="subject-boxc">
    <div>
      <ad-banner v-if="!detail.author" title="聊聊你的观影感受"></ad-banner>
      <ad-banner v-else title="聊聊你的阅读感受"></ad-banner>
    </div>
    <div class="subject f-ct">
      <h3 class="title f-tof">{{detail.title}}</h3>
      <div class="meta-box f-cl">
        <div class="l">
          <div class="rating-box">
            <rating :rating="detail.rating"></rating>
            <span>{{detail.ratings_count}}人评论</span>
          </div>
          <div class="meta">{{getMeta}}</div>
        </div>
        <div class="r"><img :src="detail.images.medium" alt=""></div>
      </div>
      <a v-if="!detail.author" class="btn-app" href="#">用APP查看影人资料</a>
      <div>
        <div v-if="!detail.author" class="wish-box">
          <a href="#">想看</a>
          <a href="#">看过</a>
        </div>
        <div v-else class="wish-box wish-box-book">
          <a href="#">想读</a>
          <a href="#">在读</a>
          <a href="#">读过</a>
        </div>
      </div>
      <div class="summary">
        <p v-if="!detail.author" class="tit">{{detail.title}}的剧情简介</p>
        <p v-else class="tit">{{detail.title}}的内容简介</p>
        <div>{{detail.summary}}</div>
      </div>
      <div v-if="!detail.author" class="casts">
        <p class="tit">影人</p>
        <ul class="casts-list">
          <li v-for="item in detail.directors">
            <img :src="item.avatars.medium" alt="">
            <p>{{item.name}}</p>
            <span>导演</span>
          </li>
          <li v-for="item in detail.casts">
            <img :src="item.avatars.medium" alt="">
            <p>{{item.name}}</p>
            <span>演员</span>
          </li>
        </ul>
      </div>
      <tags title="查看更多豆瓣高分电影" :items="getTag"></tags>
    </div>
    <scroller title="推荐的豆列" type="findList" :items="findThing"></scroller>
    <types title="了解更多电影信息" :items="movieType"></types>
    <down-app></down-app>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  import AdBanner from '../components/AdBanner.vue'
  import Rating from '../components/Rating.vue'
  import Tags from '../components/Tags.vue'
  import Scroller from '../components/Scroller.vue'
  import Types from '../components/Types.vue'
  import DownApp from '../components/DownApp.vue'


  export default {
    computed: {
      ...mapState({
        detail: state => state.subject.detail,
        movieType: state => state.movie.movieType,
        findThing: state => state.movie.findThing,
      }),
      ...mapGetters({
        getMeta: 'getMeta',
        getTag: 'getTag'
      })
    },
    components: {
      AdBanner,
      Rating,
      Tags,
      Scroller,
      Types,
      DownApp,
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
  .title {
    margin: 20px 0 10px;
    font-size: 24px;
  }

  .tit {
    margin-bottom: 10px;
    font-size: 15px;
    color: #999;
  }

  .meta-box {
    margin-bottom: 10px;
  }

  .meta-box .l {
    float: left;
    width: 64%;
    font-size: 14px;
  }

  .meta-box .r {
    position: relative;
    float: right;
    width: 32%;
    padding-top: 47.36%;
  }

  .meta-box .r img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .rating-box .rating {
    display: inline-block;
    margin-right: 10px;
  }

  .rating-box .rating .start {
    width: 15px;
    height: 15px;
  }

  .rating-box span {
    color: #999;
  }

  .meta {
    margin: 10px 0;
  }

  .btn-app {
    color: #42bd56;
    font-size: 14px;
  }

  .wish-box {
    display: flex;
    margin: 20px 0 25px;
    justify-content: space-between;
  }

  .wish-box a {
    display: inline-block;
    width: 48%;
    padding: 5px 0;
    color: #ffb712;
    font-size: 14px;
    text-align: center;
    border: 1px solid #ffb712;
    border-radius: 4px;
  }

  .wish-box-book a {
    width: 31%;
  }

  .summary {
    margin-bottom: 30px;
    font-size: 14px;
  }

  .casts {
    margin-bottom: 20px;
  }

  .casts-list {
    white-space: nowrap;
    overflow-x: auto;
  }

  .casts-list li {
    display: inline-block;
    width: 100px;
    margin-left: 10px;
    font-size: 14px;
    text-align: center;
  }

  .casts-list li:first-child {
    margin-left: 0;
  }

  .casts-list li img {
    width: 100%;
    height: 143px;
  }

  .casts-list li p {
    color: #333;
  }

  .casts-list li span {
    color: #999;
  }
</style>