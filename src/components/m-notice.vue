<template>
    <div>
        <view class="notice_bar" :style="myStyle">
            <div><u-icon class="u-left-icon" name="volume-fill" color="#FF5177"></u-icon></div>
            <div style="width:80%;height:40rpx;">
                <swiper
                    class="notice-box"
                    :autoplay="true"
                    :circular="false"
                    :indicatorDots="false"
                    :vertical="true"
                    :interval="3000"
                    :duration="1000"
                    :disable-touch="true"
                >
                    <swiper-item
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <view class="swiper-item" :style="{color: color}">
                            {{item.content}}
                        </view>
                    </swiper-item>
                </swiper>
            </div>
        </view>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    props: {
        list: null,
        index: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: '#333333'
        },
        myStyle: {
            type: Object,
            default: null
        }
    }
};
</script>
<style lang="less">
.notice_bar{
        display: flex;
        align-items: center;
        vertical-align: middle;
        width: 90%;
        margin: 0 auto;
        height: 40rpx;
        transform: translate(0,-100rpx);
        padding-top: 60rpx;
        .u-left-icon{
            margin-right: 20rpx;
        }
    }
    .notice-box{
        height: 100%;
        .swiper-item{
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 24rpx;
            color: #666666;
        }
    }
</style>
