<template>
    <div class="training_box" v-if="flag">
        <div class="info_box">
            <div class="info_center">
                <div class="avatar">
                    <div style="width:170rpx;height:170rpx;background:#ffffff;display:flex;align-items: center;justify-content: center;border-radius: 100%;">
                        <u-avatar size="150" :src="$state().user.headImg"></u-avatar>
                    </div>
                </div>
                <div class="user_info" style="color:#ffffff">
                    <div class="user_info_top">
                        <div>{{$state().user.userNick}}</div>
                        <div>
                            <image style="width:24rpx;height:24rpx" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                            <span style="padding-left:20rpx;color:#ffffff;font-size:24rpx">{{$state().user.vipTime}}会员到期</span>
                        </div>
                    </div>
                    <div class="user_info_bottom">
                        <div>训练日志</div>
                        <div>弱视必看</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="score_box">
            <div class="score_num">
                <div>{{$state().user.shopScore}}</div>
                <div class="score_num_bottom">
                    <div>积分</div>
                    <div>去兑换</div>
                </div>
            </div>
            <div class="uib_bottom_right">
                    <div class="ubr_right" @click="goScoreRecord">
                        <image :src="require('@/static/imgs/index/icon1.png')" alt="">
                        <span>积分记录</span>
                    </div>
                    <div class="ubr_left">
                        <image :src="require('@/static/imgs/index/icon2.png')" alt="">
                        <span>积分攻略</span>
                    </div>
                </div>
            <div></div>
        </div>
        <div class="count_down_box">
            <!-- <div>第一组训练</div> -->
        </div>
        <div class="game_list">
            <template v-for="(item,index) in gameList">
                <div class="game_item" v-if="item.type === 1" :key="index">
                    <div>
                        <image style="width:160rpx;height:160rpx" :src="item.logo"></image>
                    </div>
                    <div class="game_item_middle">
                        <div>{{item.name}}</div>
                        <div>{{item.des}}</div>
                    </div>
                    <div class="game_item_right">
                        <div class="game_item_right_container">
                            <div >{{item.isFin === 0 ? '未开始' : item.isFin === 1 ? '已完成' : item.isFin === 2 ? '未完成' : '继续挑战'}}</div>
                            <div>分享赚积分</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="my_coll" @click="collChange">
            <div class="coll_title">
                <div>以下项目为选做 每天坚持效果更好哦</div>
                <div v-if="!collShow">
                    <span style="font-size:24rpx;color:#999999;padding-right:5rpx">隐藏</span>
                    <u-icon size="18" color="#999999" name="arrow-up"></u-icon>
                </div>
                <div v-else>
                    <span style="font-size:24rpx;color:#999999;padding-right:5rpx">隐藏</span>
                    <u-icon size="18" color="#999999" name="arrow-down"></u-icon>
                </div>
            </div>
        </div>
        <div class="game_list d_type" v-show="collShow">
            <template v-for="(item,index) in gameList">
                <div class="game_item" v-if="item.type === 2" :key="index">
                    <div>
                        <image style="width:160rpx;height:160rpx" :src="item.logo"></image>
                    </div>
                    <div class="game_item_middle">
                        <div>{{item.name}}</div>
                        <div>{{item.des}}</div>
                    </div>
                    <div class="game_item_right">
                        <div class="game_item_right_container">
                            <div >{{item.isFin === 0 ? '未开始' : item.isFin === 1 ? '已完成' : item.isFin === 2 ? '未完成' : '继续挑战'}}</div>
                            <div>分享赚积分</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.training.js';
export default {
    data() {
        return {
            gameList: null,
            icon1: require('@/static/imgs/index/icon1.png'),
            icon2: require('@/static/imgs/index/icon2.png'),
            collShow: false,
            flag: false
        };
    },
    created() {
        let data = {
            requestType: 'web'
        };
        api.getGamesList(data).then(
            res => {
                this.gameList = res.retObj.gameList;
            }
        );
    },
    onShow() {
        this.$loading.open();
        this.$store.dispatch('loadUser').then(
            res => {
                if (res) {
                    this.flag = true;
                    this.$loading.close();
                }
            }
        );
    },
    methods: {
        collChange(e) {
            this.collShow = !this.collShow;
        },
        goScoreRecord() {
            uni.navigateTo({ url: '/pages/score/score-record' });
        }
    }
};
</script>

<style lang="less">
page{
    // transform: translate(0,160rpx);
}
// bgMy_02.png
.training_box{
    .info_box{
        width: 100%;
        height: 476rpx;
        background-image: url('@/static/imgs/training/bgMy_02.png');
        background-size: contain;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        .info_center{
            width: 100%;
            padding-left: 30rpx;
            display: flex;
            align-items: center;
            .user_info{
                flex: 1;
                padding: 0 40rpx;
                .user_info_top{
                    color: #ffffff;
                    font-size: 40rpx;
                    font-weight: 500;
                }
                .user_info_bottom{
                    display: flex;
                    width: 80%;
                    font-size: 24rpx;
                    justify-content: space-between;
                    padding-top: 10rpx;
                    div{
                        width: 140rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 5rpx 0;
                        border-radius: 40rpx;
                        border: 1rpx solid #ffffff;
                    }
                }
            }
        }
    }
    .score_box{
        width: 94%;
        height: 160rpx;
        // transform: translate(0,-80rpx);
        position: relative;
        top: -80rpx;
        z-index: 1000;
        position: relative;
        margin: 0 auto;
        background: rgb(255, 255, 255);
        border-radius: 80rpx;
        display: flex;
        .score_num{
            color: #ff2724;
            font-size: 64rpx;
            padding: 10rpx 56rpx;
            :nth-child(2){
                font-size: 24rpx;
                display: flex;
                align-items: center;
                :nth-child(1){
                    color: #333333;
                    padding-right: 10rpx;
                }
                :nth-child(2){
                    width: 110rpx;
                    border: 1rpx solid #ff2724;
                    display: flex;
                    align-items: center;
                    padding: 5rpx 0;
                    border-radius: 30rpx;
                    justify-content: center;
                }
            }
        }
        .uib_bottom_right{
            color: #333333;
            font-size: 24rpx;
            display: flex;
            align-items: center;
            padding-top: 15rpx;
            z-index: 1000;
            position: relative;
            .ubr_left{
                margin-left: 10rpx;
            }
            .ubr_right{
                padding-right: 100rpx;
                padding-left: 40rpx;
            }
            div{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            image{
                width: 60rpx;
                height: 60rpx;
            }
            span{
                margin-top: 20rpx;
            }
        }
    }
    .count_down_box{
        background: #F9DDDD;
        height: 260rpx;
        width: 100%;
        z-index: -1;
        transform: translate(0,-160rpx);
    }
    .game_list{
        transform: translate(0,-160rpx);
        padding-top: 30rpx;
        background: #ffffff;
        .game_item{
            width: 90%;
            height: 200rpx;
            margin: 0 auto;
            margin-top: 5rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .game_item_middle{
                // padding-right: 2;
                padding-left: 20rpx;
                :nth-child(2){
                    color: #999999;
                    font-size: 24rpx;
                }
            }
            .game_item_right{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
                text-align: center;
                .game_item_right_container{
                    :nth-child(1){
                        width: 100%;
                        background: #BFBFBF;
                        color: #ffffff;
                        font-size: 28rpx;
                        border-radius: 30rpx;
                        padding: 5rpx 2rpx;
                        margin-bottom: 5rpx;
                    }
                    :nth-child(2){
                        color: #333333;
                        font-size: 24rpx;
                    }
                }
            }
        }
    }
    .my_coll{
        transform: translate(0, -160rpx);
        width: 90%;
        margin: 20rpx auto;
        .coll_title{
            display: flex;
            width: 100%;
            // padding: 0 40rpx;
            justify-content: space-between;
        }
    }
    .d_type{
        padding-top: 0;
    }
}
</style>
