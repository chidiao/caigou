<template>
  <view class="content">
    <scroll-view scroll-y class="left-aside">
      <view
        v-for="item in flist"
        :key="item.id"
        class="f-item b-b"
        :class="{ active: item.id === currentId }"
        @click="tabtap(item)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
      <view v-for="item in flist" :key="item.id" class="s-list" :id="'main-' + item.id">
        <text class="s-item">{{ item.name }}</text>
        <view class="t-list">
          <view
            @click="navToList(item.id, sitem.id)"
            v-if="sitem.pid === item.id"
            class="t-item"
            v-for="sitem in slist"
            :key="sitem.id"
          >
            <image :src="sitem.image"></image>
            <text>{{ sitem.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sizeCalcState: false,
      tabScrollTop: 0,
      currentId: 0,
      flist: [],
      slist: []
    }
  },
  computed: {},
  onShareAppMessage(e) {},
  onLoad() {
    this.loadData()
  },
  methods: {
    async loadData() {
      var that = this
      //let list = await this.$api.json('cateList');
      let list = await this.$api.request('/category/all')
      if (list) {
        uni.stopPullDownRefresh()
        list.forEach((item) => {
          if (item.pid == 0) {
            if (that.currentId == 0) {
              that.currentId = item.id
            }
            this.flist.push(item) //pid为父级id, 没有pid或者pid=0是一级分类
          } else {
            this.slist.push(item) //没有图的是2级分类
          }
        })
      }
    },
    //一级分类点击
    tabtap(item) {
      if (!this.sizeCalcState) {
        this.calcSize()
      }

      this.currentId = item.id
      let index = this.flist.findIndex((fitem) => fitem.id === item.id)
      this.tabScrollTop = this.flist[index].top
    },
    //右侧栏滚动
    asideScroll(e) {
      if (!this.sizeCalcState) {
        this.calcSize()
      }
      let scrollTop = e.detail.scrollTop
      let tabs = this.flist.filter((item) => item.top <= scrollTop).reverse()
      if (tabs.length > 0) {
        this.currentId = tabs[0].id
      }
    },
    //计算右侧栏每个tab的高度等信息
    calcSize() {
      let h = 0
      this.flist.forEach((item) => {
        let view = uni.createSelectorQuery().select('#main-' + item.id)
        view
          .fields(
            {
              size: true
            },
            (data) => {
              item.top = h
              h += data.height
              item.bottom = h
            }
          )
          .exec()
      })
      this.sizeCalcState = true
    },
    navToList(fid, sid) {
      uni.navigateTo({
        url: `/pages/product/list?fid=${fid}&sid=${sid}`
      })
    }
  },
  onPullDownRefresh() {
    this.flist = []
    this.slist = []
    this.sizeCalcState = false
    this.loadData()
  }
}
</script>

<style lang="scss">
page,
.content {
  height: 100%;
  background-color: #f8f8f8;
}

.content {
  display: flex;
}
.left-aside {
  flex-shrink: 0;
  width: 200upx;
  height: 100%;
  background-color: #fff;
}
.f-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100upx;
  font-size: 28upx;
  color: $font-color-base;
  position: relative;
  &.active {
    color: $base-color;
    background: #f8f8f8;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 36upx;
      width: 8upx;
      background-color: $base-color;
      border-radius: 0 4px 4px 0;
      opacity: 0.8;
    }
  }
}

.right-aside {
  flex: 1;
  overflow: hidden;
  padding-left: 20upx;
}
.s-item {
  display: flex;
  align-items: center;
  height: 70upx;
  padding-top: 8upx;
  font-size: 28upx;
  color: $font-color-dark;
}
.t-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #fff;
  padding-top: 12upx;
  &:after {
    content: '';
    flex: 99;
    height: 0;
  }
}
.t-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 176upx;
  font-size: 26upx;
  color: #666;
  padding-bottom: 20upx;

  image {
    width: 140upx;
    height: 140upx;
  }
}
</style>
