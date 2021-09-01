<template>
    <div class="vision_test">
        <template v-if="!nextShow">
            <div class="title">
                <div>请保持<span style="color:#ff2724">3</span>米距离</div>
                <div>每4秒钟，换一张E字</div>
            </div>
            <div class="swipe_box">
                <div class="top">
                    <image mode="widthFix" :src="topImg"></image>
                    <div>第{{num}}张</div>
                </div>
                <swiper
                    class="swiper-box"
                    :autoplay="true"
                    circular="true"
                    @change="change"
                    :disable-touch="false"
                    duration="1000"
                >
                    <template v-for="(item, index) in list">
                        <swiper-item
                            :key="index"
                        >
                            <view class="swiper-item">
                                <image
                                    :src="item.img"
                                    class="swiper-item_img"
                                    mode="scaleToFill"
                                    @click="swiperClick(item)"
                                />
                            </view>
                            <div class="item_bottom">
                                <div>{{item.du}}</div>
                            </div>
                        </swiper-item>
                    </template>
                </swiper>
            </div>
            <div class="footer">
                <div>当你看不清楚E字方向的时候，请点击下方按钮</div>
                <div @click="next">测试结束，点击进入下一步</div>
            </div>
        </template>
        <template v-else>
            <div class="next_box">
                <div>请用手遮住右眼</div>
                <div>即将进行下一步检测...</div>
                <div>{{countDown}}</div>
            </div>
        </template>
    </div>
</template>
<script>
import api from '@/services/api.training.js';
export default {
    data() {
        return {
            topImg: require('@/static/imgs/training/top.png'),
            list: [],
            num: 1,
            isRight: true,
            rightVision: '',
            leftVision: '',
            nextShow: false,
            countDown: 5,
            timer: null,
            age: '',
            isGrass: ''
        };
    },
    created() {
        api.getVisionEList().then(
            res => {
                this.list = res.retArr.reverse();
            }
        );
    },
    onLoad(e) {
        this.isGrass = e.isGrass;
        this.age = e.age;
    },
    methods: {
        change(e) {
            this.num = e.target.current + 1;
        },
        next() {
            let vision = this.list[this.num - 1].number;
            if (this.isRight) {
                this.rightVision = vision;
                uni.setNavigationBarTitle({
                    title: '进入下一步'
                });
                this.isRight = false;
                this.nextShow = true;
                this.timer = setInterval(() => {
                    if (this.countDown > 1) {
                        this.countDown -= 1;
                    } else {
                        clearInterval(this.timer);
                        this.nextShow = false;
                        uni.setNavigationBarTitle({
                            title: '正在测试左眼视力'
                        });
                    }
                }, 1000);
                return;
            }
            if (!this.isRight) {
                this.leftVision = vision;
                console.log(this.leftVision);
                console.log(this.rightVision);
                uni.navigateTo({ url: `/pages/training/views/vision-result?left=${this.leftVision}&right=${this.rightVision}&isGrass=${this.isGrass}&age=${this.age}` });
                return;
            }
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.vision_test{
    .title{
        padding: 30rpx;
        text-align: center;
        :nth-child(1){
            color: #333333;
            font-size: 38rpx;
        }
        :nth-child(2){
            color: #999999;
            font-size: 26rpx;
        }
    }
    .swipe_box{
        background: #ffffff;
        .top{
            width: 180rpx;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            image{
                width: 100%;
            }
            div{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                font-size: 28rpx;
                color: #ffffff;
            }
        }
        .swiper-box{
            height: 650rpx;
            padding: 30rpx 0;
            .swiper-item{
                width: 100%;
                height: 560rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                .swiper-item_img{
                    width: 75%;
                    height: 100%;
                }
            }
            .item_bottom{
                display: flex;
                justify-content: flex-end;
                margin-top: 20rpx;
                height: 70rpx;
                div{
                    background: #ff6e26;
                    padding: 0 40rpx;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    border-radius: 50rpx 0 0 0 ;
                    color: #ffffff;
                }
            }
        }
    }
    .footer{
        text-align: center;
        :nth-child(1){
            color: #666666;
            padding: 35rpx 0;
            font-size: 28rpx;
        }
        :nth-child(2){
            width: 75%;
            margin: 0 auto;
            height: 80rpx;
            background: #ff2724;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100rpx;
        }
    }
    .next_box{
        text-align: center;
        padding-top: 60rpx;
        :nth-child(1){
            color: #333333;
            font-size: 48rpx;
        }
        :nth-child(2){
            padding-top: 60rpx;
            color: #ff2724;
            font-size: 26rpx;
        }
        :nth-child(3){
            padding-top: 60rpx;
            font-size: 220rpx;
            color: #ff2724;
        }
    }
}
</style>
