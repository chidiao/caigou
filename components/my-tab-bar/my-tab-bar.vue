<template>
  <view class="custom-tabbar">
    <view class="tabbar-main">
      <view
        v-for="item in tabList"
        :key="item.text"
        class="tab-item"
        :class="{ active: item.pagePath == route }"
        @click="switchTab(item)"
      >
        <image
          v-if="item.icon"
          class="tab-icon"
          :src="item.pagePath === route ? item.selectedIcon : item.icon"
          mode="widthFix"
        />
        <text class="tab-text">{{ item.text }}</text>
      </view>
    </view>

    <view class="safe-area-placeholder"></view>
  </view>
</template>

<script>
import store from '@/store'

const list = [
  {
    text: '分类',
    pagePath: 'pages/category/category',
    icon: '/static/tab-cate.png',
    selectedIcon: '/static/tab-cate-current.png',
    group: [1]
  },
  {
    text: '购物车',
    pagePath: 'pages/cart/cart',
    icon: '/static/tab-cart.png',
    selectedIcon: '/static/tab-cart-current.png',
    group: [1]
  },
  {
    text: '订单',
    pagePath: 'pages/order/peihuo',
    icon: '/static/tab-cate.png',
    selectedIcon: '/static/tab-cate-current.png',
    group: [2]
  },
  {
    text: '订单',
    pagePath: 'pages/order/driver',
    icon: '/static/tab-cate.png',
    selectedIcon: '/static/tab-cate-current.png',
    group: [3]
  },
  {
    text: '我的',
    pagePath: 'pages/user/user',
    icon: '/static/tab-my.png',
    selectedIcon: '/static/tab-my-current.png',
    group: [1, 2, 3]
  }
]

export default {
  props: {
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list,
      route: ''
    }
  },
  computed: {
    tabList() {
      const groupId = store.state.userInfo.group_id || 1

      return this.list.filter((item) => item.group.includes(groupId))
    }
  },
  created() {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let route = currentPage.route
    this.route = route
  },
  methods: {
    switchTab(item) {
      uni.switchTab({ url: '/' + item.pagePath })
    }
  }
}
</script>

<style>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

/* 安全区域占位 */
.safe-area-placeholder {
  width: 100%;
  height: var(--safe-bottom);
  background: transparent;
}

.tabbar-main {
  display: flex;
  height: 120rpx; /* 增加高度容纳图标 */
  padding-top: 10rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tab-icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 6rpx;
}

.tab-text {
  font-size: 24rpx;
  color: #666;
}

.tab-item.active .tab-text {
  color: #fa436a;
  font-weight: bold;
}
</style>
