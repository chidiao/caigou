<template>
	<view>
		<!-- 地址 -->
		<navigator url="/pages/customer/index?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen" v-if="addressData && addressData.title">
					<view class="top">
						<text class="name">{{addressData.title}}</text>
						<text class="mobile">{{addressData.mobile}}</text>
					</view>
					<text class="address">{{addressData.address}}</text>
				</view>
				<view class="cen" v-else>请选择客户</view>
				<text class="yticon icon-you"></text>
			</view>

			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
		</navigator>
		
		<view class="progress" v-if="progress.number">
			
			<!-- <ProgressBar 
			class="ProgressBar" 
			:Sold="progress.sold" 
			:widthUpx="250"
			:Width="percentage(progress.number, progress.sold)" 
			Type="candy" 
			:Vice="true"></ProgressBar> -->
		</view>

		<view class="goods-section">
			<!-- 第二版本加商户 -->
			<!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">西城小店铺</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item, index) in product" :key="item.id">
				<image :src="item.image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{item.title}}</text>
					<view class="spec">{{item.spec ? "规格:" + item.spec : ""}}  {{progress.number  ? "(秒:"+progress.number+"件,剩:"+(progress.number - progress.sold)+"件)": ""}}</view>
					<view class="price-box">
						<view class="price">￥{{item.sales_price}} <del class="market_price">￥{{item.market_price}}</del></view>
						<!-- <text class="number">x 1</text> -->
						<uni-number-box v-if="progress.number" class="step" :min="1" :max="9999999"  :value="item.number"   :isMax="item.number >= 999999999 ? true : false"
               
						 :isMin="item.number===1" :index="index" @eventChange="numberChange"></uni-number-box>
						 <uni-number-box v-else class="step" :min="1" :max="99999999"    :value="item.number" :isMax="item.number >= 999999999 ? true : false"
						  :isMin="item.number===1" :index="index" @eventChange="numberChange"></uni-number-box>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list" v-if="couponList && couponList.length">
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					{{useCouponIndex !== -1 ? couponList[useCouponIndex].title : '选择优惠券'}}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<!-- 第二版本加多商户 -->
			<!-- <view class="yt-list-cell b-b">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip disabled">暂无可用优惠</text>
			</view> -->
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<view class="cell-tit clamp">总共合计</view>
				<view class="cell-tip">￥{{price}}</view>
			</view>
			<view class="yt-list-cell b-b" v-if="couponList && couponList.length">
				<view class="cell-tit clamp">优惠金额</view>
				<view class="cell-tip red">-￥{{coupon_price}}</view>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-tit clamp"><!-- 配送方式 -->
					<!-- <text style="color:red" @click="deliveryTemplate">（查看详情）</text> -->
				</view>
			<!-- 	<view class="cell-tip" v-if="deliveryList && deliveryList.length > 0">
					<picker @change="deliveryChange" range-key="name" :value="deliveryIndex" :range="deliveryList">
						<view class="uni-input">{{deliveryList[deliveryIndex].name}}</view>
					</picker>
				</view> -->
			</view>
			<!-- <view class="yt-list-cell b-b">
				<view class="cell-tit clamp">运费</view>
				<view class="cell-tip">￥{{deliveryPrice}}</view>
			</view> -->
			<view class="yt-list-cell desc-cell">
				<view class="cell-tit clamp">备注</view>
				<input class="desc" type="text" v-model="remark" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			 <view class="price-content">
				<text></text>
				<text class="price-tip"></text>
				<text class="price"></text>
			</view> 
			<text class="submit" @click="submit">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index" :class="useCouponIndex === index ? 'selectCoupon' : ''">
					<view class="con" v-on:click="useCoupon(index)">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至{{item.endtime_text}}</text>
						</view>
						<view class="right">
							<text class="price">{{item.value}}</text>
							<text>满{{item.least}}可用</text>
						</view>
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限一张使用</text>
				</view>
			</view>
			<button class="btn" @click="toggleMask">收起</button>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box.vue';
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				remark: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [],
				useCouponIndex: -1,
				addressData: {},
				product: [],
				price: 0.00, //商品金额
				coupon_price: 0.00, //优惠券金额
				total: 0.00, //实付金额
				deliveryList: [],
				deliveryIndex: 0,
				deliveryPrice: 0.00,
				cart: [], // 购物车id
				flash_id: 0, // 秒杀id
				progress:{},
				submitLock:false // 提交按钮锁
			}
		},
		onLoad(options) {
			if (options.hasOwnProperty('flash_id')) {
				this.flash_id = options.flash_id;
			}

			if (options.hasOwnProperty('cart')) {
				this.cart = options.cart;
				// 从购物车进入 
				this.getOrderCreate({
					cart: options.cart
				});
			} else {
				// 从商品进入
				this.getOrderCreate({
					id: options.id,
					spec: options.spec,
					flash_id: this.flash_id
				});
			}
		},
		onShow() {
			if (this.addressData.hasOwnProperty('city_id')) {
				// 检查当前地址是否存在于运费模板中
				this.getDelivery();
			}
		},
		methods: {
			// 计算百分比
			percentage(number, sold) {
				if (!sold) {
					return 0;
				}
				return parseInt(sold / number * 100);
			},
			// 获取运费模板
			async getDelivery() {
				let delivery = await this.$api.request('/order/getDelivery?city_id=' + this.addressData.city_id);
				if (delivery) {
					this.deliveryList = delivery;
					this.deliveryIndex = 0;
					this.calcTotal();
				}
			},
			// 选择运费模板
			deliveryChange(e) {
				this.deliveryIndex = e.detail.value;
				this.calcTotal();
			},
			// 使用优惠券
			useCoupon(index) {
				if (this.useCouponIndex !== index) {
					this.useCouponIndex = index;
					//this.coupon_price = this.couponList[index].value;
				} else {
					this.useCouponIndex = -1;
					// this.coupon_price = 0;
				}
				this.calcTotal();
			},
			//获取创建订单信息
			async getOrderCreate(param) {
				let that = this;

				let apiUrl = !param.flash_id || param.flash_id == 0 ? '/order/create' : '/flash/createOrder';
				let data = await this.$api.request(apiUrl, 'POST', param);

				if (data) {
					this.addressData = data.address;
					this.product = data.product;
					this.couponList = data.coupon;
					this.deliveryList = data.delivery;
					this.calcTotal();
					
					if (data.flash) {
						this.progress = data.flash;
					}
				} else {
					setTimeout(function() {
						that.$api.prePage().getDetail(param.id, param.flash_id);
						uni.navigateBack();
					}, 3000)
				}
			},
			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			changePayType(type) {
				this.payType = type;
			},
			async submit() {
				
				// 如果没有地址则提示先加地址
				if (!this.addressData || !this.addressData.hasOwnProperty('id')) {
					this.$api.msg('请选择客户');
					return;
				}

				this.$api.msg('提交中...', 20000);
				let delivery_id = 0;
				if (this.deliveryList && this.deliveryList[this.deliveryIndex] && this.deliveryList[this.deliveryIndex].id) {
					delivery_id = this.deliveryList[this.deliveryIndex].id;
				}
				let coupon_id = 0;
				if (this.couponList && this.couponList[this.useCouponIndex] && this.couponList[this.useCouponIndex].id) {
					coupon_id = this.couponList[this.useCouponIndex].id;
				} 
				let data = {
					city_id: 0,
					customer_id: this.addressData.id,
					delivery_id: delivery_id,
					coupon_id: coupon_id,
					remark: this.remark,
					product_id: [],
					spec: [],
					number: [],
					cart: this.cart,
					flash_id: this.flash_id
				};

				this.product.forEach((item, index) => {
					data.product_id.push(item.id);
					data.spec.push(item.spec.replace(/,/g, '|'));
					data.number.push(item.number);
				});

				if (this.submitLock) {
					return;
				}
				this.submitLock = true; // 提交锁
				let apiUrl = this.flash_id == 0 ? '/order/submit' : '/flash/submitOrder';
				let result = await this.$api.request(apiUrl, 'POST', data);
				if (result) {
					this.submitLock = false; // 解除锁
					this.$api.msg('已提交', 2000); 
					uni.redirectTo({
						// url: `/pages/money/pay?order_id=${result.order_id}&total=${this.total}&out_trade_no=${result.out_trade_no}`
						url: `/pages/money/paySuccess`
					});
				} 
				this.submitLock = false; // 解除锁
			},
			stopPrevent() {},
			//数量
			async numberChange(data) {
				let oldNumber = this.product[data.index].number;
				let newNumber = data.number;
				this.product[data.index].number = newNumber;
				this.calcTotal();

				//判断当前库存
				let stock = this.product[data.index].stock;
				if (newNumber > this.product[data.index].stock) {
				//	this.product[data.index].number = stock;
				}

			},
			// 计算价格
			calcTotal() {
				let price = 0;
				let number = 0; // 产品数量
				let product = this.product;

				product.forEach(item => {
					price = price + parseFloat(item.sales_price) * item.number;
					number = number + item.number;
				});

				this.price = price.toFixed(2);
				let total = price;

				// 检查当前优惠券是否满足使用条件
				this.coupon_price = 0.00;
				if (this.useCouponIndex != -1 && this.couponList && this.couponList[this.useCouponIndex]) {
					this.coupon_price = this.couponList[this.useCouponIndex].value
					if (this.price >= this.couponList[this.useCouponIndex].least) {
						total = total - this.coupon_price;
					} else {
						this.$api.msg('选中的优惠券不满足使用条件', 2000);
						this.useCouponIndex = -1; //取消选中的优惠券
						this.coupon_price = 0; //设置优惠金额为0
						total = total - this.coupon_price;
					}
				}

				// 计算当前运费模板
				// id: 29 运费模板id
				// name: "购买2件以上包邮"  标题
				// type: "quantity"  // 续重类型
				// min: 2  // 至少购买量
				// first: 1  // 首件数量
				// first_fee: "0.00" // 首单价钱
				// additional: 1  // 续件数量
				// additional_fee: "0" // 续件价钱
				let delivery = this.deliveryList[this.deliveryIndex];
				if (delivery) {
					let deliveryPrice = 0;
					if (delivery.hasOwnProperty('id')) {
						if (delivery.min > number) {
						//	this.$api.msg('必须至少购买' + delivery.min + '件商品才能使用此配送方式', 6000)
						}
						// 如何为0就赋值1，不然下面的循环会死循环
						delivery.first = delivery.first == 0 ? 1 : delivery.first;
						delivery.additional = delivery.additional == 0 ? 1 : delivery.additional;
						for (let i = 0; i < number;) {
							if (i === 0) {
								deliveryPrice = deliveryPrice + parseInt(delivery.first_fee);
								i = i + parseInt(delivery.first);
							} else {
								deliveryPrice = deliveryPrice + parseInt(delivery.additional_fee);
								i = i + parseInt(delivery.additional);
							}
						}
					}
					this.deliveryPrice = deliveryPrice.toFixed(2);
					total = total + deliveryPrice;
				}

				this.total = total.toFixed(2);
			},
			// 查看运费模板
			deliveryTemplate() {
				this.$api.navTo('/pages/order/delivery');
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.uni-numbox {
		left: initial !important;
		right: 0 !important;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 160upx;
				height: 160upx;
				border-radius: 4upx;
			}

			.right {
				height: 160upx;
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
				position: relative;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 5px;

				.price {
					margin-bottom: 4upx;
					color: red;
				}

				.market_price {
					font-size: 26upx;
					margin-left: 20upx;
					color: #b2b2b2;
					text-decoration: line-through;
					margin-top: -8rpx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}

				.step {
					left: unset;
					right: 10upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
			picker{
				max-width: 500rpx;
				line-height: 50rpx;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 99;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 100;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
			padding-bottom: 100rpx;
		}

		.btn {
			background: #fa436a;
			position: absolute;
			bottom: 0;
			width: 700rpx;
			margin: 20rpx 25rpx;
			color: #fff;
			border-radius: 40rpx;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 选中的优惠券 */
	.selectCoupon {
		border: 1upx solid red;
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
