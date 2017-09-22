<template>
  <div class="activity">
    <ad-banner></ad-banner>
    <div class="info f-ct" v-if="!showLoading">
      <h2 class="title">{{eventDetail.title}}<span>{{eventDetail.loc_name}}</span></h2>
      <div class="img"><img :src="eventDetail.image" alt="eventDetail.alt"></div>
      <ul class="list">
        <li class="f-cl">
          <span class="label">时间：</span>
          <span class="txt">{{eventDetail.time_str}}</span>
        </li>
        <li class="f-cl">
          <span class="label">地点：</span>
          <span class="txt">{{eventDetail.address}}</span>
        </li>
        <li class="f-cl">
          <span class="label">费用：</span>
          <span class="txt">{{eventDetail.fee_str}}</span>
        </li>
        <li class="f-cl">
          <span class="label">类型：</span>
          <span class="txt">{{eventDetail.category_name}}</span>
        </li>
        <li class="f-cl">
          <span class="label">起始时间：</span>
          <span class="txt">{{eventDetail.begin_time}}</span>
        </li>
      </ul>
      <div class="look-interst">
        <p class="show"><span>{{Alook}}</span>人感兴趣，<span>{{Ainterst}}</span>人要参加</p>
        <div class="btn">
          <span @click="AddAlook">感兴趣</span>
          <span @click="AddAinterst">要参加</span>
        </div>
      </div>
      <div class="detail">
        <p class="tit">活动详情</p>
        <div v-if="eventDetail.content" v-html="content"></div>
        <div v-else>此活动还没有添加详情哦！</div>
      </div>
      <tags v-if="eventDetail.tags" :items="eventDetail.tags | toArray"></tags>
      <div class="tip">
        <p class="tit">温馨提示</p>
        <div>本活动信息由发起人自行发布，仅代表其个人意志，与豆瓣网无关，且活动的后续事项由发起人独立安排及负责。豆瓣网仅提供信息展示空间。不能保证活动的真实性、有效性、安全性，请在参加活动前与发起人具体确认核实相关情况，注意人身安全与财产安全。</div>
      </div>
      <loading v-show="showLoading"></loading>
      <down-app></down-app>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import AdBanner from '../components/AdBanner'
  import DownApp from '../components/DownApp'
  import Loading from '../components/Loading'
  import Tags from '../components/Tags'

  export default {
    data() {
      return {
        showLoading: true,
        imgurl: ''
      }
    },
    components: {
      AdBanner,
      DownApp,
      Loading,
      Tags
    },
    created() {
      const id = this.$route.params.id
      this.$store.dispatch({
        type: 'getEventDetail',
        eventId: id
      }).then((res) => {
        this.showLoading = false
      })
    },
    computed: {
      content() {
        return this.eventDetail.content.replace(/<img.+?>/ig, '').replace(/<br\s*\/?>/g, '')
      },
      ...mapState({
        eventDetail: state => state.activity.eventDetail,
        Alook: state => state.activity.Alook,
        Ainterst: state => state.activity.Ainterst
      })
    },
    filters: {
      toArray(val) {
        return val.split(',')
      }
    },
    methods: {
      ...mapActions([
        'AddAlook', 'AddAinterst'
      ])
    }
  }

</script>

<style scoped>
  .activity {
    line-height: 22px;
  }

  .title {
    margin: 15px 0;
    font-size: 16px;
  }

  .tit span {
    position: relative;
    top: -1px;
    margin-left: 10px;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    background: #ff8263;
    border-radius: 2px;
  }

  .img {
    position: relative;
    width: 70%;
    height: 0;
    margin: 0 auto;
    padding-top: 104%;
  }

  .img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .list {
    display: table;
    margin: 15px 0;
    font-size: 13px;
  }
  .list span {
    display: table-cell;
  }

  .list .label {
    min-width: 36px;
    color: #666;
  }

  .look-interst .show {
    margin-bottom: 6px;
    color: #666;
  }

  .look-interst .show span {
    margin: 0 2px;
    color: #333;
    font-weight: 700;
  }

  .look-interst .btn span {
    margin-right: 6px;
    padding: 3px 5px;
    color: #ee6363;
    font-size: 12px;
    background: #ffe4e1;
    border: 1px solid #ff7676;
    border-radius: 3px;
  }

  .detail {
    margin: 15px 0;
  }

  .detail .tit,
  .tip .tit {
    margin-bottom: 6px;
    color: #072;
    font-size: 14px;
  }
</style>