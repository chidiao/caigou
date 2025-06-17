<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentIndex === index }"
        @click="tabClick(index)"
      >
        {{ item.text }}
      </view>
    </view>

    <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
      <swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
        <scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
          <!-- 空白页 -->
          <empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

          <!-- 订单列表 -->
          <my-order v-for="(item, index) in tabItem.orderList" :key="index" :item="item">
            <button class="action-btn recom" @click.stop="">修改数量</button>
          </my-order>

          <uni-load-more :status="tabItem.loadingType"></uni-load-more>

          <!-- 占位 -->
          <view style="height: calc(100rpx + var(--safe-bottom))"> </view>
        </scroll-view>
      </swiper-item>
    </swiper>

    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import empty from '@/components/empty'
const navList = [
  {
    state: 2,
    text: '待送货',
    loadingType: 'more',
    orderList: [],
    page: 1
  },
  {
    state: 3,
    text: '送货中',
    loadingType: 'more',
    orderList: [],
    page: 1
  },
  {
    state: 4,
    text: '送货完成',
    loadingType: 'more',
    orderList: [],
    page: 1
  }
]
const orderApi = '/order/sj_list'

export default {
  components: {
    uniLoadMore,
    empty
  },
  data() {
    return {
      tabCurrentIndex: 0,
      navList,
      pageSize: 10
    }
  },
  onLoad(options) {
    this.loadData()
  },
  onPullDownRefresh() {
    this.pullDownRefresh()
  },
  methods: {
    //获取订单列表
    async loadData(source) {
      //这里是将订单挂载到tab列表下
      let index = this.tabCurrentIndex
      let navItem = this.navList[index]
      let state = navItem.state

      if (source === 'tabChange' && navItem.loaded === true) {
        //tab切换只有第一次需要加载数据
        return
      }
      if (navItem.loadingType === 'loading') {
        //防止重复加载
        return
      }
      if (navItem.loadingType == 'noMore') {
        //没有更多数据
        return
      }

      navItem.loadingType = 'loading'

      let result = await this.$api.request(orderApi, 'GET', {
        type: state,
        page: navItem.page,
        pagesize: this.pageSize
      })
      uni.stopPullDownRefresh()
      if (!result) {
        navItem.loadingType = 'more'
      } else {
        //console.log(result)
        if (result.length >= this.pageSize) {
          //判断是否还有数据， 有改为 more， 没有改为noMore
          navItem.loadingType = 'more'
        } else {
          navItem.loadingType = 'noMore'
        }
        // 页数加一
        navItem.page++
        result.forEach((item) => {
          item = Object.assign(item, this.orderStateExp(item.state))
          navItem.orderList.push(item)
        })
        //loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
        this.$set(navItem, 'loaded', true)
      }
    },

    //swiper 切换
    changeTab(e) {
      this.tabCurrentIndex = e.target.current
      this.loadData('tabChange')
    },
    //顶部tab点击
    tabClick(index) {
      this.tabCurrentIndex = index
    },
    //删除订单
    async deleteOrder(index) {
      let [error, res] = await uni.showModal({
        title: '确认删除订单'
      })
      if (res.confirm) {
        let order_id = this.navList[this.tabCurrentIndex].orderList[index].order_id
        let result = await this.$api.request('/order/delete?order_id=' + order_id)
        if (result) {
          this.navList[this.tabCurrentIndex].orderList.splice(index, 1)
        }
      }
    },
    //取消订单
    async cancelOrder(item) {
      let that = this
      let [error, res] = await uni.showModal({
        title: '确认取消订单',
        content: '取消之后不可恢复'
      })
      if (res.confirm) {
        let result = await that.$api.request('/order/cancel?order_id=' + item.order_id)
        if (result) {
          let { stateTip, stateTipColor } = that.orderStateExp(9)
          item = Object.assign(item, {
            state: 9,
            stateTip,
            stateTipColor
          })
          // 更新全部订单里面的状态
          let position = that.navList[0].orderList.findIndex((val) => val.order_id === item.order_id)
          if (position !== -1) {
            that.navList[0].orderList[position] = item
          }

          //取消订单后删除待付款中该项
          let list = that.navList[1].orderList
          let index = list.findIndex((val) => val.order_id === item.order_id)
          index !== -1 && list.splice(index, 1)
        }
        return true
      }
      //this.$api.msg('取消失败');
      return false
    },
    // 收货
    async receivedOrder(item) {
      let that = this
      let [error, res] = await uni.showModal({
        title: '确认收货'
      })
      if (res.confirm == true) {
        let res = await that.$api.request('/order/received', 'GET', {
          order_id: item.order_id
        })
        if (res) {
          // 已确认收货

          let { stateTip, stateTipColor } = that.orderStateExp(4)

          // 更新全部订单里面的状态
          let position = that.navList[0].orderList.findIndex((val) => val.order_id === item.order_id)
          if (position !== -1) {
            let item = that.navList[0].orderList[position]
            console.log(item)
            that.navList[0].orderList[position] = Object.assign(item, {
              state: 4,
              stateTip,
              stateTipColor,
              have_received: 1
            })
          }

          //收货订单后删除待收货中该项
          let list = that.navList[3].orderList
          let index = list.findIndex((val) => val.order_id === item.order_id)
          index !== -1 && list.splice(index, 1)
        }
        return true
      }
      this.$api.msg('收货失败')
      return false
    },
    // 订单状态文字和颜色
    orderStateExp(state) {
      let stateTip = '',
        stateTipColor = '#fa436a'
      switch (+state) {
        case 0:
          stateTip = '交易成功'
          break
        case 1:
          stateTip = '待付款'
          break
        case 2:
          stateTip = '待发货'
          break
        case 3:
          stateTip = '待收货'
          break
        case 4:
          stateTip = '待评价'
          break
        case 5:
          stateTip = '售后'
          break
        case 6:
          stateTip = '拒绝退款'
          break
        case 9:
          stateTip = '订单已关闭'
          stateTipColor = '#909399'
          break

        //更多自定义
      }
      return {
        stateTip,
        stateTipColor
      }
    },
    // 计算当前订单有多少个商品
    quantity(products) {
      let number = 0
      for (let i in products) {
        number += parseInt(products[i].number)
      }
      return number
    },
    navTo(url) {
      this.$api.navTo(url)
    },
    // 下面的一排按钮
    button(action, item) {
      switch (action) {
        case 'cancel':
          this.cancelOrder(item)
          break
        case 'pay':
          this.navTo('/pages/money/pay?order_id=' + item.order_id + '&total=' + item.total_price)
          break
        case 'delivery':
          this.navTo(
            '/pages/order/express?expresssn=' + item.extend.express_number + '&express=' + item.extend.express_company
          )
          break
        case 'recerved':
          this.receivedOrder(item)
          break
        case 'evaluate':
          this.$api.navTo(
            '/pages/order/evaluate?product_id=' +
              item.id +
              '&order_id=' +
              item.order_id +
              '&image=' +
              item.image +
              '&title=' +
              item.title +
              '&spec=' +
              item.spec
          )
          break
        case 'refund':
          this.$api.navTo('/pages/order/refund?order_id=' + item.order_id)
          break
      }
    },
    pullDownRefresh() {
      this.navList = []
      this.navList = navList
      this.loadData()
    }
  }
}
</script>

<style lang="scss">
@import './order.scss';
</style>
