<template>
  <view class="tabbar-container">
    <view 
      v-for="(item, index) in currentTabs"
      :key="index"
      @click="switchTab(item)"
      class="tab-item">
      <image :src="isActive(item) ? item.selectedIcon : item.icon"/>
      <text :class="{active: isActive(item)}">{{item.text}}</text>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data(){
		return {
			currentTabs:[
				{pagePath: "pages/category/category", text: "分类", icon: "static/tab-cate.png", selectedIcon: "static/tab-cate-current.png"},
				{pagePath: "pages/cart/cart", text: "购物车", icon: "static/tab-cart.png", selectedIcon: "static/tab-cart-current.png"}
				
			]
		}
		
		
	},
	
	
	onLaunch() {
		console.log('当前角色',$this.store.state.role);
		console.log('当前菜单',$this.store.getters.currentTabs);
	},
  computed: {
    ...mapGetters(['currentTabs'])
  },
  methods: {
    isActive(item) {
      return getCurrentPages().pop().route === item.pagePath.substring(1)
    },
    switchTab(item) {
      uni.redirectTo({ url: item.pagePath })
    }
  }
}
</script>

<style>
.tabbar-container {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100rpx;
  background: #fff;
  border-top: 1px solid #eee;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tab-item image {
  width: 48rpx;
  height: 48rpx;
}
.active {
  color: #21A78A;
}
</style>
