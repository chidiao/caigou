<template>
  <view class="container">
    <view class="user-section">
      <image class="bg" src="/static/user-bg.jpg"></image>
      <view class="user-info-box">
        <view class="portrait-box">
          <image class="portrait" :src="userInfo.avatar ? userInfo.avatar : '/static/missing-face.png'"></image>
        </view>
        <view class="info-box">
          <text class="username">{{ userInfo.username || '游客' }}</text>
        </view>
      </view>
      <view class="vip-card-box">
        <image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
        <!-- <view class="b-btn">
					立即开通
				</view> -->
        <view class="tit">
          <text class="yticon icon-iLinkapp-"></text>
          喂喂会员
        </view>
        <text class="e-m">uniShop</text>
        <!-- <text class="e-b">开通会员开发无bug 一测就上线</text> -->
      </view>
    </view>

    <view
      class="cover-container"
      :style="[
        {
          transform: coverTransform,
          transition: coverTransition
        }
      ]"
      @touchstart="coverTouchstart"
      @touchmove="coverTouchmove"
      @touchend="coverTouchend"
    >
      <image class="arc" src="/static/arc.png"></image>

      <!-- 订单 -->
      <view class="order-header" v-if="role == 1">
        <view class="title">我的订单</view>
        <view class="item" @click="$api.navTo('/pages/order/order?state=0')"
          >查看全部订单
          <text class="yticon right icon-you"></text>
        </view>
      </view>

      <view class="order-section" v-if="role == 1">
  <!--      <view
          class="order-item"
          @click="$api.navTo('/pages/order/order?state=1')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-daifukuan"></text>
          <text class="num" v-if="orderNum.unpaid > 0">{{ orderNum.unpaid }}</text>
          <text>待付款</text>
        </view> -->
        <view
          class="order-item"
          @click="$api.navTo('/pages/order/order?state=1')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-daifahuo"></text>
          <text class="num" v-if="orderNum.undelivered > 0">{{ orderNum.undelivered }}</text>
          <text>待配货</text>
        </view>
        <view
          class="order-item"
          @click="$api.navTo('/pages/order/order?state=3')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-daishouhuo"></text>
          <text class="num" v-if="orderNum.unreceived > 0">{{ orderNum.unreceived }}</text>
          <text>待接单</text>
        </view>
        <view
          class="order-item"
          @click="$api.navTo('/pages/order/order?state=4')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-pingjia"></text>
          <text class="num" v-if="orderNum.uncomment > 0">{{ orderNum.uncomment }}</text>
          <text>完成</text>
        </view>
       <!-- <view
          class="order-item"
          @click="$api.navTo('/pages/order/order?state=5')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-shouhou"></text>
          <text class="num" v-if="orderNum.refund > 0">{{ orderNum.refund }}</text>
          <text>退款/售后</text>
        </view> -->
      </view>

      <!-- 浏览历史 -->
      <view class="history-section icon">
        <!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view> -->
        <!-- <scroll-view scroll-x class="h-list">
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode="aspectFill"></image>
				</scroll-view> -->
        <!-- <list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="我的钱包" tips="您的会员还有3天过期"></list-cell> -->
        <list-cell
          icon="icon-dizhi"
          iconColor="#5fcda2"
          title="地址管理"
          v-if="role == 1"
          @eventClick="$api.navTo('/pages/address/address')"
        ></list-cell>
        <!-- <list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell> -->
        <!-- <list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell> -->
        <list-cell
          icon="icon-shoucang-setting"
          iconColor="#54b4ef"
          title="我的收藏"
          v-if="role == 1"
          @eventClick="$api.navTo('/pages/favorite/favorite')"
        ></list-cell>
        <list-cell
          icon="icon-setting"
          iconColor="#e07472"
          title="设置"
          border=""
          @eventClick="$api.navTo('/pages/set/set')"
        ></list-cell>
      </view>
    </view>

    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script>
import listCell from '@/components/mix-list-cell'
import { mapState } from 'vuex'
let startY = 0,
  moveY = 0,
  pageAtTop = true
export default {
  components: {
    listCell
  },
  data() {
    return {
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
      orderNum: {
        unpaid: 0,
        undelivered: 0,
        unreceived: 0,
        uncomment: 0,
        refund: 0
      }
    }
  },
  onLoad() {},
  onShow() {
    if (this.hasLogin) {
      this.getOrderNum()
    }
  },
  // #ifndef MP
  onNavigationBarButtonTap(e) {
    const index = e.index
    if (index === 0) {
      this.navTo('/pages/set/set')
    } else if (index === 1) {
      // #ifdef APP-PLUS
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const currentWebview = page.$getAppWebview()
      currentWebview.hideTitleNViewButtonRedDot({
        index
      })
      // #endif
      uni.navigateTo({
        url: '/pages/notice/notice'
      })
    }
  },
  // #endif
  computed: {
    ...mapState(['hasLogin', 'userInfo', 'role'])
  },
  methods: {
    /**
     *  会员卡下拉和回弹
     *  1.关闭bounce避免ios端下拉冲突
     *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
     *    transition设置0.1秒延迟，让css来过渡这段空窗期
     *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
     */
    coverTouchstart(e) {
      if (pageAtTop === false) {
        return
      }
      this.coverTransition = 'transform .1s linear'
      startY = e.touches[0].clientY
    },
    coverTouchmove(e) {
      moveY = e.touches[0].clientY
      let moveDistance = moveY - startY
      if (moveDistance < 0) {
        this.moving = false
        return
      }
      this.moving = true
      if (moveDistance >= 80 && moveDistance < 100) {
        moveDistance = 80
      }

      if (moveDistance > 0 && moveDistance <= 80) {
        this.coverTransform = `translateY(${moveDistance}px)`
      }
    },
    coverTouchend() {
      if (this.moving === false) {
        return
      }
      this.moving = false
      this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
      this.coverTransform = 'translateY(0px)'
    },
    // 获取订单数量
    async getOrderNum() {
      let data = await this.$api.request('/order/count')
      if (data) {
        this.orderNum = {
          unpaid: data.unpaid ? data.unpaid : 0,
          undelivered: data.undelivered ? data.undelivered : 0,
          unreceived: data.unreceived ? data.unreceived : 0,
          uncomment: data.uncomment ? data.uncomment : 0,
          refund: data.refund ? data.refund : 0
        }
      }
    }
  }
}
</script>
<style lang="scss">
page {
  background: #f5f5f5;
}
%flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
%section {
  display: flex;
  justify-content: space-around;
  align-content: center;
  background: #fff;
  border-radius: 10upx;
}

.user-section {
  height: 520upx;
  padding: 100upx 30upx 0;
  position: relative;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(1px);
    opacity: 0.7;
  }
}
.user-info-box {
  height: 180upx;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  .portrait {
    width: 130upx;
    height: 130upx;
    border-radius: 50%;
  }
  .username {
    font-size: $font-lg + 6upx;
    color: $font-color-dark;
    margin-left: 20upx;
  }
}

.vip-card-box {
  display: flex;
  flex-direction: column;
  color: #f7d680;
  height: 240upx;
  background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  border-radius: 16upx 16upx 0 0;
  overflow: hidden;
  position: relative;
  padding: 20upx 24upx;
  .card-bg {
    position: absolute;
    top: 20upx;
    right: 0;
    width: 380upx;
    height: 260upx;
  }
  .b-btn {
    position: absolute;
    right: 20upx;
    top: 16upx;
    width: 132upx;
    height: 40upx;
    text-align: center;
    line-height: 40upx;
    font-size: 22upx;
    color: #36343c;
    border-radius: 20px;
    background: linear-gradient(left, #f9e6af, #ffd465);
    z-index: 1;
  }
  .tit {
    font-size: $font-base + 2upx;
    color: #f7d680;
    margin-bottom: 28upx;
    .yticon {
      color: #f6e5a3;
      margin-right: 16upx;
    }
  }
  .e-b {
    font-size: $font-sm;
    color: #d8cba9;
    margin-top: 10upx;
  }
}
.cover-container {
  margin-top: -150upx;
  padding: 0 30upx;
  position: relative;
  background: #f5f5f5;
  padding-bottom: 20upx;
  .arc {
    position: absolute;
    left: 0;
    top: -34upx;
    width: 100%;
    height: 36upx;
  }
}
.tj-sction {
  @extend %section;
  .tj-item {
    @extend %flex-center;
    flex-direction: column;
    height: 140upx;
    font-size: $font-sm;
    color: #75787d;
  }
  .num {
    font-size: $font-lg;
    color: $font-color-dark;
    margin-bottom: 8upx;
  }
}
.order-header {
  @extend %section;
  padding: 28upx 0 0;
  border-radius: 10upx 10upx 0 0;
  margin-top: 20upx;
  font-size: $font-base;
  .title {
    width: 50%;
    color: $font-color-dark;
    margin-left: 30upx;
  }
  .item {
    width: 50%;
    color: $font-color-base;
    text-align: right;
    margin-right: 8upx;
  }
}
.order-section {
  @extend %section;
  border-radius: 0 0 10upx 10upx;
  padding: 28upx 0;
  .order-item {
    @extend %flex-center;
    width: 120upx;
    height: 120upx;
    border-radius: 10upx;
    font-size: $font-sm;
    color: $font-color-dark;
    position: relative;
    .num {
      border: 4rpx solid #fa436a;
      width: 40rpx;
      height: 40rpx;
      color: #fa436a;
      text-align: center;
      border-radius: 40rpx;
      position: absolute;
      background: #ffffff;
      top: 0;
      right: 18rpx;
    }
  }
  .yticon {
    font-size: 48upx;
    margin-bottom: 18upx;
    color: #fa436a;
  }
  .icon-shouhoutuikuan {
    font-size: 44upx;
  }
}
.history-section {
  padding: 0;
  margin-top: 20upx;
  background: #fff;
  border-radius: 10upx;
  .sec-header {
    display: flex;
    align-items: center;
    font-size: $font-base;
    color: $font-color-dark;
    line-height: 40upx;
    margin-left: 30upx;
    .yticon {
      font-size: 44upx;
      color: #5eba8f;
      margin-right: 16upx;
      line-height: 40upx;
    }
  }
  .h-list {
    white-space: nowrap;
    padding: 30upx 30upx 0;
    image {
      display: inline-block;
      width: 160upx;
      height: 160upx;
      margin-right: 20upx;
      border-radius: 10upx;
    }
  }
}
</style>
