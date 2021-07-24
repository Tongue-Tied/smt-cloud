<template>
	<view class="cut_con">
		<view v-show="cutShow">
			<tui-cropper-app ref="cutImage" :scaleRatio="scaleRatio" lockRatio :width="width" :height="height" :imageUrl="cutImage" @cancle="cancleCut"
			 @cropper="cropper">
			</tui-cropper-app>
		</view>
	</view>
</template>
<script>
	import tuiCropperApp from "./tui-image-cropper/tui-image-cropper.vue";
	export default {
		components: {
			tuiCropperApp,
		},
		props: {
            scaleRatio: {
                type: Number,
                default: 2,
			},
			// 默认4.3  1.1
			ratio: {
				type: Object,
                default: function() {
                    return { w: 1, h: 1 };
                }
			},
		},
		mounted() {

		},
		data() {
			return {
				// 裁剪显示
				cutShow: false,
				// 裁剪图片
				cutImage: '',
				// 添加图片区域
				addStatus: false,
				// 上传完成key
				uploadKey: [],
				// 裁剪框宽px
				width: 280,
				// 裁剪框高px
				height: 280,
			};
		},
		watch: {
			ratio: {
				deep: true,
				immediate: true,
				handler(n, o) {
                    this.width = 280;
                    this.height = this.width * (n.h / (n.w));
				}
			}
		},
		methods: {
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: (e) => {
						var image = e.tempFilePaths[0];
						this.cutImage = image;
						this.cutShow = true;
					},
				});
			},
			// 取消
			cancleCut() {
				this.cutShow = false;
			},
			// 完成裁切
			cropper(e) {
                uni.showLoading();
                this.$emit("uploadComplete", e);
                setTimeout(_ => {
                    this.cutShow = false;
                    uni.hideLoading()
				}, 100);
			}
		},
	};
</script>
<style scoped>
	.add {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #eee;
		background: #f4f5f6;
		font-size: 30rpx;
		width: 200rpx;
		height: 200rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.image_con {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.image_item {
		width: 200rpx;
		height: 200rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.image_item image {
		border-radius: 10rpx;
		width: 100%;
		height: 100%;
	}

	.del {
		position: absolute;
		top: 0;
		right: 0;
		width: 50rpx;
		height: 50rpx;
		background: red;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		align-items: center;
		cursor: pointer;
	}

	.cut_pix {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 80rpx;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.pix_item {
		width: 180rpx;
		height: 60rpx;
		background: orange;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
		color: #ffffff;
		font-size: 28rpx;
	}

	.cut_con {
		position: relative;
	}
</style>
