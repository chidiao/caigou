<template>
  <view>
    <router-view />
    <CustomTabBar v-if="$store.state.role" />
  </view>
</template>
<script>
/**
 * vuex管理登陆状态，具体可以参考官方登陆模板示例
 */
import { mapMutations, mapState } from 'vuex'
export default {
  methods: {
    ...mapMutations(['logout', 'setUserInfo']),

    checkLogin() {
      return new Promise(async (resolve, reject) => {
        let user = uni.getStorageSync('userInfo')
        if (user) {
          this.$store.dispatch('userLogin', user)
        }
        let result = await this.$api.request('/user/status')
        if (!result) {
          this.logout()
          resolve(false)
        }

        resolve(true)
      })
    }
  },
  onLaunch: function () {
    // 锁定屏幕竖向
    // #ifdef APP-PLUS
    plus.screen.lockOrientation('portrait-primary')
    // #endif
    // 根据用户角色动态设置tabBar
  },
  async onShow() {
    const isLogin = await this.checkLogin()

    if (!isLogin) {
      // #ifdef MP-WEIXIN
      this.$wechatMiniLogin()
      // #endif
    }
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
page {
  --safe-bottom: constant(safe-area-inset-bottom);
  --safe-bottom: env(safe-area-inset-bottom);
}

/* project id 1729059 */
@font-face {
  font-family: 'unishop';
  font-weight: normal;
  font-style: normal;
  src: url('https://at.alicdn.com/t/font_1729059_llr8d2acjac.ttf') format('truetype');
}

.yticon {
  font-family: 'unishop' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shouhuodizhi:before {
  content: '\e6b5';
}

.icon-xuanzhong:before {
  content: '\e64c';
}

.icon-fenlei:before {
  content: '\e71b';
}

.icon-bianji:before {
  content: '\e77d';
}

.icon-jiahao:before {
  content: '\e616';
}

.icon-jianhao:before {
  content: '\e617';
}

.icon-wxpay:before {
  content: '\e607';
}

.icon-pay:before {
  content: '\e624';
}

.icon-alipay:before {
  content: '\e60b';
}

.icon-you:before {
  content: '\e65f';
}

.icon-huoche:before {
  content: '\e6f0';
}

.icon-shoucang:before {
  content: '\e60a';
}

.icon-gouwuche:before {
  content: '\e60e';
}

.icon-fangzi:before {
  content: '\e657';
}

.icon-daifukuan:before {
  content: '\e601';
}

.icon-daifahuo:before {
  content: '\e704';
}

.icon-daishouhuo:before {
  content: '\e62f';
}

.icon-pingjia:before {
  content: '\e61d';
}

.icon-shouhou:before {
  content: '\e610';
}

.icon-shoucang-setting:before {
  content: '\e612';
}

.icon-setting:before {
  content: '\e62b';
}

.icon-dizhi:before {
  content: '\e67c';
}

.icon-lajitong:before {
  content: '\e615';
}

view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
  box-sizing: border-box;
}
/* 骨架屏替代方案 */
.Skeleton {
  background: #f3f3f3;
  padding: 20upx 0;
  border-radius: 8upx;
}

/* 图片载入替代方案 */
.image-wrapper {
  font-size: 0;
  background: #f3f3f3;
  border-radius: 4px;

  image {
    width: 100%;
    height: 100%;
    transition: 0.6s;
    opacity: 0;

    &.loaded {
      opacity: 1;
    }
  }
}

.clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.common-hover {
  background: #f5f5f5;
}

/*边框*/
.b-b:after,
.b-t:after {
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  height: 0;
  content: '';
  transform: scaleY(0.5);
  border-bottom: 1px solid $border-color-base;
}

.b-b:after {
  bottom: 0;
}

.b-t:after {
  top: 0;
}

/* button样式改写 */
uni-button,
button {
  height: 80upx;
  line-height: 80upx;
  font-size: $font-lg + 2upx;
  font-weight: normal;

  &.no-border:before,
  &.no-border:after {
    border: 0;
  }
}

uni-button[type='default'],
button[type='default'] {
  color: $font-color-dark;
}

/* input 样式 */
.input-placeholder {
  color: #999999;
}

.placeholder {
  color: #999999;
}
</style>
