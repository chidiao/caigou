<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<!-- <text v-if="item.is_default" class="tag">默认</text> -->
					<text class="address">{{item.title+' '+item.address}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.mobile}}</text>
					<text class="mobile">{{item.company}}</text>
				</view>
			</view>
			<!-- <text class="yticon icon-bianji" @click.stop="addAddress('edit', item.id)"></text -->>

			<!-- <text class="yticon icon-lajitong" @click.stop="deleteAddress(item.id,index)"></text> -->
		</view>

		<!-- <button class="add-btn" @click="addAddress('add')">新增地址</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option) {
			console.log(option.source);
			this.source = option.source;
		},
		onShow() {
			this.getList();
		},
		methods: {
			//获取我的收货地址
			async getList() {
				let list = await this.$api.request('/customer/all', 'POST', {
					page: 1,
					pagesize: 50
				});
				if (list) {
					this.addressList = list;
				}
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					console.log('选中客户',item)
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, id = 0) {
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&id=${id}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type) {
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);

				console.log(data, type);
			},
			async deleteAddress(id, index) {
				let [error, res] = await uni.showModal({
					title: '确定删除地址？',
					content: this.addressList[index].address
				})

				if (res.confirm) {
					let data = await this.$api.request('/address/delete?id=' + id);
					if (data) {
						if (this.$api.prePage().addressData && this.$api.prePage().addressData.id) {
							if (this.$api.prePage().addressData.id == this.addressList[index].id) {
								this.$api.prePage().addressData = {};
							}
						}
						
						this.addressList.splice(index, 1);
					}
				}

			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-box {
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			font-size: 30upx;
			color: $font-color-dark;
		}
	}

	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;

		.name {
			margin-right: 30upx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.icon-lajitong {
		color: $font-color-light;
		padding-left: 25rpx;
	}


	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
