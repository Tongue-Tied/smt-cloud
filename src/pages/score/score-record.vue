<template>
    <div class="score_record">
        <div class="score_info" :style="'background-image:url(https://img.ruoshixunlianbao.com/bgMy_02.png)'">
            <div class="uib_top">
                <div class="u_top_headimg">
                    <image :src="$state().user.headImg" alt="">
                </div>
                <div class="u_top_info">
                    <div>{{$state().user.userNick}}</div>
                    <div>
                        <image style="width:24rpx;height:24rpx;margin-right:10rpx;" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                        <span>{{$state().user.vipTime}}会员到期</span>
                    </div>
                </div>
            </div>
            <div class="fixed_box">
                <div class="fixed_left">
                    <div>{{userInfo.shopScore || 0}}</div>
                    <div>积分</div>
                    <div @click="toScoreShop">去兑换</div>
                </div>
                <div class="fixed_right" @click="toStrategy">
                    <image style="width:50rpx;height:50rpx" :src="require('@/static/imgs/index/icon2.png')" alt="">
                    <span>积分攻略</span>
                </div>
            </div>
        </div>
        <div class="score_img">
            <div class="score_img_box">
                <img style="width:auto;height:72rpx" :src="require('@/static/imgs/score/jilu.png')" />
            </div>
        </div>
        <div class="score_list">
            <u-cell-item :arrow="false" class="score_list_item" v-for="(item,index) in scoreList" :key="index">
                <div slot="icon" class="score_list_item_left">
                    <div class="time">
                        <div>{{$dayjs(item.createTime).format('MM-DD')}}</div>
                        <div>{{$dayjs(item.createTime).format('HH:ss')}}</div>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                </div>
                <div slot="right-icon" class="right_score">
                    <div>{{item.type === 1 ? '+' : (item.score > 0) ? '-' : ''}}{{item.score}}</div>
                </div>
            </u-cell-item>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.index';
export default {
    data() {
        return {
            userInfo: null,
            scoreList: []
        };
    },
    onShow() {
        this.userInfo = this.$state().user;
    },
    created() {
        this.getList();
    },
    async onPullDownRefresh() {
        await this.$store.dispatch('loadUser');
        await this.getList();
        uni.stopPullDownRefresh();
    },
    methods: {
        getList() {
            api.getMyScoreList().then(
                res => {
                    this.scoreList = res.retArr;
                    console.log(res);
                }
            );
        },
        toScoreShop() {
            uni.navigateTo({ url: '/pages/score/score-shop' });
        },
        toStrategy() {
            uni.navigateTo({ url: '/pages/score/score-strategy' });
        }
    }
};
</script>
<style lang="less">
page{
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
    background-color: #ffffff;
}
.score_record{
    .score_info{
        width: 100%;
        height: 300rpx;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        .uib_top{
            height: 50%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding:50rpx 20rpx 0 40rpx;
            position: relative;
            .u_top_headimg{
                width:160rpx;
                height: 160rpx;
                margin-right: 20rpx;
                background: #ffffff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                image{
                    width:140rpx;
                    height: 140rpx;
                    border-radius: 50%;
                }
            }
            .u_top_info{
                flex: 50%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                :nth-child(1){
                    font-size: 40rpx;
                    color: #ffffff;
                    overflow: hidden;
                    font-weight: 600;
                }
                :nth-child(2){
                    font-size: 24rpx;
                    color: #ffffff;
                    padding-top: 10rpx;
                }
            }
        }
        .fixed_box{
            width: 90%;
            height: 90rpx;
            background: rgb(255, 255, 255);
            box-shadow: 10rpx 10rpx 20rpx 0 #e2dfdf;
            position: absolute;
            bottom: -50rpx;
            left: 50%;
            transform: translate(-50%,0);
            border-radius: 100rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .fixed_left{
                display: flex;
                align-items: center;
                :nth-child(1){
                    color: #ff2724;
                    font-size: 48rpx;
                    font-weight: 500;
                    margin:0 20rpx 0 40rpx;
                }
                :nth-child(2){
                    color: #333333;
                    font-size: 24rpx;
                    margin-right: 20rpx;
                }
                :nth-child(3){
                    color: #ff2724;
                    font-size: 24rpx;
                    background-color: #ffe0e4;
                    padding: 5rpx 18rpx;
                    border-radius: 50rpx;
                }
            }
            .fixed_right{
                display: flex;
                align-items: center;
                padding-right: 40rpx;
                span{
                    padding-left: 20rpx;
                    color: #333333;
                    font-size: 24rpx;
                }
            }
        }
    }
    .score_img{
        padding-top: 100rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .score_list{
        height: auto;
        .score_list_item{
            .score_list_item_left{
                display: flex;
                align-items: center;
                .time{
                    width: 100rpx;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #999999;
                    font-size: 24rpx;
                    div{
                        height: 40rpx;
                    }
                }
                .content{
                    flex: 1;
                    padding: 0 30rpx 0 20rpx;
                    display: flex;
                    // align-items: center;
                    justify-content: center;
                }
            }
            .right_score{
                color: #ff2724;
                font-size: 36rpx;
                display: flex;
                justify-content: flex-start;
            }
        }
    }
}
</style>
