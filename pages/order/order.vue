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
          <view
            v-for="(item, index) in tabItem.orderList"
            :key="index"
            class="order-item"
            @click="navTo('/pages/order/orderDetail?order_id=' + item.order_id)"
          >
            <view class="i-top b-b">
              <text class="time">{{ item.createtime }}</text>
              <text class="state" :style="{ color: item.stateTipColor }"
                >{{ item.stateTip + (item.refund_status_text ? ':' + item.refund_status_text : '') }}
              </text>
              <text
                v-if="item.state === 9"
                class="del-btn yticon icon-lajitong"
                @click.stop="deleteOrder(index)"
              ></text>
            </view>

            <view class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.products" :key="goodsIndex">
              <image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
              <view class="right">
                <text class="refund" v-if="goodsItem.refund">退款成功</text>
                <text class="title clamp">{{ goodsItem.title }}</text>
                <text class="attr-box">{{ goodsItem.spec }} x {{ goodsItem.number }}</text>
                <text class="price">{{ goodsItem.price }}</text>
                <button
                  class="action-btn"
                  v-if="item.have_received != 0 && goodsItem.evaluate == false && goodsItem.refund == false"
                  @click.stop="
                    button('evaluate', {
                      order_id: item.order_id,
                      id: goodsItem.id,
                      image: goodsItem.image,
                      title: goodsItem.title,
                      spec: goodsItem.spec
                    })
                  "
                >
                  评价
                </button>
              </view>
            </view>

            <view class="price-box">
              共
              <text class="num">{{ quantity(item.products) }}</text>
              件商品 合计
              <text class="price">{{ item.total_price }}</text>

              <text v-if="item.discount_price > 0">(已优惠￥{{ item.discount_price }})</text>
              <text v-if="item.delivery_price > 0">(含运费￥{{ item.delivery_price }})</text>
            </view>
            <view class="action-box b-t" v-if="item.state != 9">
              <button class="action-btn" v-if="item.state == 1" @click.stop="button('cancel', item)">取消订单</button>
              <button class="action-btn recom" v-if="item.have_paid == 0" @click.stop="button('pay', item)">
                立即支付
              </button>
              <!-- <button class="action-btn" v-if="item.have_paid != 0 && item.have_delivered == 0">提醒发货</button> -->
              <button
                class="action-btn"
                v-if="item.have_paid != 0 && item.extend.express_number != ''"
                @click.stop="button('delivery', item)"
              >
                查看物流
              </button>
              <!-- 	<button class="action-btn" v-if="item.have_paid != 0 && item.have_received == 0" @click.stop="button('recerved',item)">确认收货</button> -->
              <!-- <button class="action-btn" v-if="item.have_received != 0 && item.have_commented != 0">追加评价</button> -->
              <!-- <button class="action-btn" v-if="item.have_paid != 0" @click.stop="button('refund', item)">申请售后</button> -->
            </view>
            <view class="action-box b-t" v-if="item.state == 9 && item.status == -1">
              <button class="action-btn" v-if="item.have_paid != 0" @click.stop="button('refund', item)">
                查看售后
              </button>
            </view>
          </view>
          <uni-load-more :status="tabItem.loadingType"></uni-load-more>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import empty from '@/components/empty'
export default {
  components: {
    uniLoadMore,
    empty
  },
  data() {
    return {
      tabCurrentIndex: 0,
      navList: [
        {
          state: 0,
          text: '全部',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        // {
        // 	state: 1,
        // 	text: '待付款',
        // 	loadingType: 'more',
        // 	orderList: [],
        // 	page: 1
        // },
        {
          state: 2,
          text: '待配货',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        {
          state: 3,
          text: '待接单',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        {
          state: 4,
          text: '评价',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        // {
        //   state: 5,
        //   text: '售后',
        //   loadingType: 'more',
        //   orderList: [],
        //   page: 1
        // }
      ],
      pageSize: 10
    }
  },
  onLoad(options) {
    /**
     * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
     * 替换onLoad下代码即可
     */
    this.tabCurrentIndex = +options.state
    // #ifndef MP
    this.loadData()
    // #endif
    // #ifdef MP
    if (options.state == 0) {
      this.loadData()
    }
    // #endif
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

      let result = await this.$api.request('/order/getOrders', 'GET', {
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
      this.navList = [
        {
          state: 0,
          text: '全部',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        // {
        // 	state: 1,
        // 	text: '待付款',
        // 	loadingType: 'more',
        // 	orderList: [],
        // 	page: 1
        // },
        {
          state: 2,
          text: '待发货',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        {
          state: 3,
          text: '待收货',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        {
          state: 4,
          text: '评价',
          loadingType: 'more',
          orderList: [],
          page: 1
        },
        {
          state: 5,
          text: '售后',
          loadingType: 'more',
          orderList: [],
          page: 1
        }
      ]
      this.loadData()
    }
  }
}
</script>

<style lang="scss">
@import './order.scss';
</style>
