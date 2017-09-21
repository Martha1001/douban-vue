<template>
  <div class="activity">
    <ad-banner></ad-banner>
    <loading></loading>
    <div class="info">
      <h2>{{eventDetail.title}}</h2>
      <div><img :src="eventDetail.image" alt=""></div>
      <ul>
        <li><span>时间：{{eventDetail.time_str}}</span></li>
        <li><span>地点：{{eventDetail.address}}</span></li>
        <li><span>费用：{{eventDetail.fee_str}}</span></li>
        <li><span>类型：{{eventDetail.category_name}}</span></li>
        <li><span>起始时间：{{eventDetail.begin_time}}</span></li>
      </ul>
    </div>
    <div>
      <p>{{}}人感兴趣，{{}}人要参加</p>
      <div><span>感兴趣</span><span>要参加</span></div>
    </div>
    <div>
      <p>活动详情</p>
      <div>{{eventDetail.content}}</div>
    </div>
    <div>
      <p>温馨提示</p>
      <div>本活动信息由发起人自行发布，仅代表其个人意志，与豆瓣网无关，且活动的后续事项由发起人独立安排及负责。豆瓣网仅提供信息展示空间。不能保证活动的真实性、有效性、安全性，请在参加活动前与发起人具体确认核实相关情况，注意人身安全与财产安全。</div>
    </div>
    <down-app></down-app>
  </div>
</template>

<script>
import { smapState} from 'vuex'

import AdBanner from '../components/AdBanner'
import DownApp from '../components/DownApp'
import Loading from '../components/Loading'

export default {
  components:{
    AdBanner,
    DownApp,
    Loading
  }
}
</script>

<style scoped>

</style>