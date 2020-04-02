<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
      <!-- https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=1888 -->
      <div v-if="centerUserBase && centerUserBase.id && !centerUserBase.adminCenterUser" class="handle-button" style="top:200px;background-color:#F56C6C" @click="drawer_vip=true">
        <svg-icon icon-class="vip1"/>
      </div>
      <!-- <div v-if="centerUserBase && centerUserBase.id && !centerUserBase.adminCenterUser" class="handle-button" style="top:250px;background-color:#F56C6C" @click="drawer_vip=true">
        <svg-icon icon-class="vip2"/>
      </div> -->
      <div v-if="centerUserBase && centerUserBase.id && !centerUserBase.adminCenterUser" class="handle-button" style="top:250px;background-color:#F56C6C" @click="drawer_spread=true">
        <svg-icon icon-class="caiwu"/>
      </div>
      <el-drawer
        :wrapper-closable="false"
        title="尊享会员服务"
        :visible.sync="drawer_vip"
        direction="rtl">
        <div style="padding:0 0 0 20px;">
          <el-form label-position="left" label-width="100px">
            <el-form-item label="当前会员" >
              <el-tag v-if="centerUserBase.vipLevel == 0" type="info">免费会员</el-tag>
              <el-tag v-if="centerUserBase.vipLevel == 1" type="success">专业版</el-tag>
              <el-tag v-if="centerUserBase.vipLevel == 2" type="danger">增值版</el-tag>
            </el-form-item>
            <el-form-item v-if="centerUserBase.vipLevel > 0" label="到期时间" >
              {{ centerUserBase.dateVipEnd }}
            </el-form-item>
            <el-form-item label="会员权益" >
              <ol v-if="centerUserBase.vipLevel == 0" style="color:gray;line-height:30px;padding:0 0 0 20px;">
                <li>仅限学习和测试使用；</li>
                <li>免费100MB图片空间；</li>
                <li>10QPS，大约5~10人同时在线；</li>
                <li>正式商用请购买会员；</li>
              </ol>
              <ol v-if="centerUserBase.vipLevel == 1" style="color:green;line-height:30px;padding:0 0 0 20px;">
                <li>正式商业授权，1000QPS（大约500~1000人同时在线）；</li>
                <li>可使用除<el-link type="danger" href="/#/user/pluginInfo/list"> 「插件」 </el-link>以外的所有功能；</li>
                <li>全面开放后台api接口文档；</li>
                <li>免费500MB图片空间，支持更大容量扩容；</li>
              </ol>              
              <ol v-if="centerUserBase.vipLevel == 2" style="color:#F56C6C;line-height:30px;padding:0 0 0 20px;">
                <li>正式商业授权，50000QPS（大约5万人同时在线）；</li>
                <li>可使用后台所有功能；</li>
                <li>全面开放后台api接口文档；</li>
                <li>免费500MB图片空间，支持更大容量扩容；</li>
              </ol>              
            </el-form-item>
          </el-form>
          <div v-if="centerUserBase.vipLevel == 1" style="text-align:center;">
            <el-button type="success" size="medium" round @click="getVIPPayData(1)">专业版会员续费</el-button>
          </div>
          <div v-if="centerUserBase.vipLevel == 2" style="text-align:center;">
            <el-button type="danger" size="medium" round @click="getVIPPayData(2)">增值业版会员续费</el-button>
          </div>
          <el-divider v-if="centerUserBase.vipLevel == 0"><svg-icon icon-class="vip1" style="color:green;font-size:28px;" /><font style="color:green;">专业版</font></el-divider>
          <ol v-if="centerUserBase.vipLevel == 0" style="line-height:30px;color:green;">
            <li>正式商业授权，1000QPS（大约500~1000人同时在线）；</li>
            <li>可使用除<el-link type="danger" href="/#/user/pluginInfo/list"> 「插件」 </el-link>以外的所有功能；</li>
            <li>全面开放后台api接口文档；</li>
            <li>免费500MB图片空间，支持更大容量扩容；</li>
            <li>现在抢购，仅需 <font style="color:#F56C6C;font-size:30px;">299</font> 元 / 年；</li>
            <li>一次性开通2年及以上会员，第二年半价；</li>
          </ol>
          <div v-if="centerUserBase.vipLevel == 0" style="text-align:center;">
            <el-button type="success" size="medium" round @click="getVIPPayData(1)">立即开通专业版会员</el-button>
          </div>
          <div style="height:20px;"></div>
          <el-divider v-if="centerUserBase.vipLevel == 0 || centerUserBase.vipLevel == 1"><svg-icon icon-class="vip2" style="color:#F56C6C;font-size:28px;" /><font style="color:#F56C6C;">增值版</font></el-divider>
          <ol v-if="centerUserBase.vipLevel == 0 || centerUserBase.vipLevel == 1" style="line-height:30px;color:#F56C6C;">
            <li>包含专业版所有的功能，50000QPS（大约5万人同时在线）；</li>
            <li>可免费使用所有的<el-link type="danger" href="/#/user/pluginInfo/list" style="color:green;"> 「插件」 </el-link> 功能，营销更给力；</li>
            <li>现在抢购，仅需 <font style="color:#F56C6C;font-size:30px;">888</font> 元 / 年；</li>
            <li>免费提供本后台前端界面的html源码，您可以自行修改界面并部署；</li>
            <li>一次性开通2年及以上会员，第二年半价；</li>
          </ol>
          <div v-if="centerUserBase.vipLevel == 0 || centerUserBase.vipLevel == 1" style="text-align:center;">
            <el-button type="danger" size="medium" round @click="getVIPPayData(2)">立即开通增值业版会员</el-button>
          </div>
        </div>
      </el-drawer>
      <el-drawer
        title="确认付款信息"
        :visible.sync="drawer_vip1_buy"
        direction="rtl">
        <div style="padding:0 0 0 20px;">
          <form v-if="alipayPostData && alipayPostData.params" :action="alipayPostData.gateway" method="POST" target="_blank">
            <input type="hidden" v-for="(v, k) in alipayPostData.params" v-bind:key="k" :name="k" :value="v" />
            <div style="line-height:30px;margin-bottom:10px;">
              <div><b>订单号:</b> {{ alipayPostData.params.out_trade_no }}</div>
              <div><b>付款信息:</b> {{ alipayPostData.params.subject }}</div>
              <div><b>金额:</b> {{ alipayPostData.params.total_fee }}</div>
              <div style="margin-top:10px;color:red;text-align:center;"><b>支付完成后，请退出后台重新登录</b></div>
            </div>
            <div style="text-align:center;">
              <el-button type="success" native-type="submit" round>立即前往支付宝支付</el-button>
            </div>
          </form>
        </div>
      </el-drawer>
      <el-drawer
        title="推广赚钱"
        :visible.sync="drawer_spread"
        direction="rtl">
        <div style="padding:0 0 0 20px;">
          <p>推荐用户来使用”api工厂“，以后该用户开通会员、续费会员，您都可以获得高额返佣，实时到账，随时可提现！</p>
          <el-divider>推广规则</el-divider>
          <ol style="line-height:30px;">
            <li>新用户注册，填写您的邀请码；</li>
            <li>用户点击你的推广链接后进行注册；</li>
            <li>通过上述任一途径推广注册的用户，即为有效推广用户；</li>
          </ol>
          <div style="color:#666;font-size:12px;line-height:20px;">*用户点击你的推广链接后，你的推广码将会记录在用户的浏览器，用户在之后的半年内完成注册，都算是你的有效推广用户。</div>          
          <el-divider>三级返佣比例</el-divider>
          <ol style="line-height:30px;">
            <li>直接推荐用户，您可获得 <font style="color:red;font-weight:bold;">15%</font> 的会费费用奖励；</li>
            <li>您的直属团队推荐用户，您可获得 <font style="color:red;font-weight:bold;">10%</font> 的会员费用奖励；</li>
            <li>您的下级团队推荐用户，您可获得 <font style="color:red;font-weight:bold;">5%</font> 的会员费用奖励；</li>
          </ol>
          <el-divider><font style="color:#F56C6C;">你的推广信息</font></el-divider>
          <el-form label-position="left" label-width="100px">
            <el-form-item label="邀请码" >
              {{centerUserBase.id}}
            </el-form-item>
            <el-form-item label="推广链接" >
              https://admin.it120.cc/#/?referrer={{centerUserBase.id}}
            </el-form-item>            
          </el-form>
          <div style="text-align:center;">
            <el-button type="danger" size="medium" round @click="goSpreadTeams">我的团队</el-button>
            <el-button type="danger" size="medium" round @click="goSpread">我的收入</el-button>
          </div>
        </div>        
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { remindCurIndex, remindReadNext } from '@/api/remind'
import { mapGetters } from 'vuex'
import { getVIPPayData } from '@/api/centerUser'

export default {
  name: 'Layout',
  data() {
    return {
      drawer_vip: false, // 是否显示右侧的抽屉
      drawer_vip1_buy: false, // 是否显示右侧的抽屉
      drawer_spread: false, // 是否显示右侧的抽屉
      curIndex:0,

      alipayPostData:{}
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'centerUserBase'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    remindCurIndex().then(res => {
      if (res.code == 0) {
        this.curIndex = res.data
        this.remindReadNext()
      }
    })
    setTimeout(() => {
      if (!this.centerUserBase.adminCenterUser && this.centerUserBase.vipLevel === 0) {
        this.drawer_vip = true
      }
    }, 2000);
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    remindReadNext () {
      remindReadNext(this.curIndex).then(res => {
        if (res.code == 0) {
          this.curIndex = res.data.index
          // 弹出通知
          if (res.data.mod == 'user') {
            let notifyObj = res.data.o
            if (notifyObj.action == 'reg') {
              let msg = ``
              if (notifyObj.nick) {
                msg += ` 昵称:${notifyObj.nick}`
              }
              if (notifyObj.mobile) {
                msg += ` 手机号码:${notifyObj.mobile}`
              }
              this.$notify({
                title: '新用户注册',
                message: msg,
                duration: 0
              });
            }            
          }
          if (res.data.mod == 'order') {
            let notifyObj = res.data.o
            if (notifyObj.action == 'create') {
              let msg = `订单号：${notifyObj.orderNumber}`
              msg += ` 金额:${notifyObj.amountReal}`
              this.$notify({
                title: '新订单',
                message: msg,
                duration: 0
              });
            }            
            if (notifyObj.action == 'pay') {
              let msg = `订单号：${notifyObj.orderNumber}`
              msg += ` 金额:${notifyObj.amountReal}`
              this.$notify({
                title: '订单已支付',
                message: msg,
                duration: 0
              });
            }
            if (notifyObj.action == 'orderRefundApply') {
              let msg = `金额:${notifyObj.amount}`
              msg += ` 原因:${notifyObj.reason}`
              this.$notify({
                title: '有人申请退换货',
                message: msg,
                duration: 0,
                onClick: () => {
                  this.$router.push({ path: '/user/apiExtOrder/list' })
                }
              })
            }
          }
        }
        setTimeout(() => {
          this.remindReadNext()
        }, 1000)
      })
    },
    getVIPPayData(vipLevel) {
      // 前往开通会员
      // this.drawer_vip = false
      // this.$router.push({ path: '/user/pluginInfo/list', query: {type: 2} })
      getVIPPayData(this.centerUserBase.id, vipLevel).then(res => {
        // 弹框点击确定调整支付宝付款
        this.alipayPostData = res.data
        this.drawer_vip1_buy = true
      })
    },
    goSpreadTeams() {
      this.drawer_spread = false
      this.$router.push({ path: '/user/spread/teams' })
    },
    goSpread() {
      this.drawer_spread = false
      this.$router.push({ path: '/user/centerUserCashLog/list' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
  .mobile .fixed-header {
    width: 100%;
  }

.handle-button {
  position: fixed;
  right: 0px;
  border-radius: 6px 0 0 6px !important;
  width: 48px;
  height: 48px;
  pointer-events: auto;
  cursor: pointer;
  pointer-events: auto;
  font-size: 24px;
  text-align: center;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
