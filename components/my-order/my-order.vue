<template>
  <view class="order-item" @click="navTo('/pages/order/orderDetail?order_id=' + item.order_id)">
    <view class="i-top b-b">
      <text class="time">{{ item.createtime }}</text>
      <text class="state" :style="{ color: item.stateTipColor }" v-if="showState">
        {{ item.stateTip + (item.refund_status_text ? ':' + item.refund_status_text : '') }}
      </text>
      <!-- <text v-if="item.state === 9" class="del-btn yticon icon-lajitong" @click.stop="deleteOrder(index)"></text> -->
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

      <view
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          opacity: 0.8;
          padding-right: 12px;
        "
        v-if="canEdit && showEdit"
        @click.stop="onEdit(goodsItem)"
      >
        修改数量
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
      <slot></slot>
    </view>

    <view class="action-box b-t" v-if="item.state == 9 && item.status == -1">
      <button class="action-btn" v-if="item.have_paid != 0" @click.stop="button('refund', item)">查看售后</button>
    </view>
  </view>
</template>

<script>
import store from '@/store'
export default {
  props: ['item', 'canEdit'],
  emits: ['click', 'edit'],
  methods: {
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
    onEdit(item) {
      const order = {
        order_id: this.item.order_id,
        products: [item]
      }
      this.$emit('edit', order)
    }
  },
  computed: {
    showState() {
      return store.state.role == 1
    },
    showEdit() {
      return store.state.role == 2
    }
  }
}
</script>

<style lang="scss">
.order-item {
  display: flex;
  flex-direction: column;
  padding-left: 30upx;
  background: #fff;
  margin-top: 16upx;

  .i-top {
    display: flex;
    align-items: center;
    height: 80upx;
    padding-right: 30upx;
    font-size: $font-base;
    color: $font-color-dark;
    position: relative;

    .time {
      flex: 1;
    }

    .state {
      color: $base-color;
    }

    .del-btn {
      padding: 10upx 0 10upx 36upx;
      font-size: $font-lg;
      color: $font-color-light;
      position: relative;

      &:after {
        content: '';
        width: 0;
        height: 30upx;
        border-left: 1px solid $border-color-dark;
        position: absolute;
        left: 20upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  /* 多条商品 */
  .goods-box {
    height: 160upx;
    padding: 20upx 0;
    white-space: nowrap;

    .goods-item {
      width: 120upx;
      height: 120upx;
      display: inline-block;
      margin-right: 24upx;
    }

    .goods-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20upx 0;

    .goods-img {
      display: block;
      width: 120upx;
      height: 120upx;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 30upx 0 24upx;
      overflow: hidden;
      position: relative;
      .title {
        font-size: $font-base + 2upx;
        color: $font-color-dark;
        line-height: 1;
      }

      .attr-box {
        font-size: $font-sm + 2upx;
        color: $font-color-light;
        padding: 10upx 12upx;
      }

      .price {
        font-size: $font-base + 2upx;
        color: $font-color-dark;

        &:before {
          content: '￥';
          font-size: $font-sm;
          margin: 0 2upx 0 8upx;
        }
      }
      .action-btn {
        width: 160rpx;
        height: 60rpx;
        padding: 0;
        text-align: center;
        line-height: 60rpx;
        font-size: 26rpx;
        color: #303133;
        background: #fff;
        border-radius: 100px;
        float: right;
        position: absolute;
        right: 30rpx;
        bottom: 0;
      }
      .refund {
        position: absolute;
        right: 30rpx;
        font-size: 28rpx;
        color: #fa436a;
        top: 35rpx;
      }
    }
  }

  .price-box {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    padding: 20upx 30upx;
    font-size: $font-sm + 2upx;
    color: $font-color-light;

    .num {
      margin: 0 8upx;
      color: $font-color-dark;
    }

    .price {
      font-size: $font-lg;
      color: $font-color-dark;

      &:before {
        content: '￥';
        font-size: $font-sm;
        margin: 0 2upx 0 8upx;
      }
    }
  }

  .action-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100upx;
    position: relative;
    padding-right: 30upx;
  }

  .action-btn {
    width: 160upx;
    height: 60upx;
    margin: 0;
    margin-left: 24upx;
    padding: 0;
    text-align: center;
    line-height: 60upx;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
    background: #fff;
    border-radius: 100px;

    &:after {
      border-radius: 100px;
    }

    &.recom {
      background: #fff9f9;
      color: $base-color;

      &:after {
        border-color: #f7bcc8;
      }
    }
  }
}

/* load-more */
.uni-load-more {
  display: flex;
  flex-direction: row;
  height: 80upx;
  align-items: center;
  justify-content: center;
}

.uni-load-more__text {
  font-size: 28upx;
  color: #999;
}

.uni-load-more__img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.uni-load-more__img > view {
  position: absolute;
}

.uni-load-more__img > view view {
  width: 6px;
  height: 2px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  background: #999;
  position: absolute;
  opacity: 0.2;
  transform-origin: 50%;
  animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
  transform: rotate(90deg);
  top: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
  transform: rotate(180deg);
  top: 11px;
  right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
  transform: rotate(270deg);
  bottom: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
  top: 11px;
  left: 0;
}

.load1,
.load2,
.load3 {
  height: 24px;
  width: 24px;
}

.load2 {
  transform: rotate(30deg);
}

.load3 {
  transform: rotate(60deg);
}

.load1 view:nth-child(1) {
  animation-delay: 0s;
}

.load2 view:nth-child(1) {
  animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
  animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
  animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
  animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
  animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
  animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
  animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
  animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
  animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
  animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
  animation-delay: 1.43s;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
