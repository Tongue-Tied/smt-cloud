<template>
    <div class="score_shop" v-if="flag">
        <div class="info_box" :style="'background-image:url(https://img.ruoshixunlianbao.com/bgMy_02.png)'">
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
                </div>
            </div>
            <div class="score_box">
            <div class="score_num">
                <div style="font-size:64rpx">{{$state().user.shopScore}}</div>
                <div class="score_num_bottom">
                    <div>积分</div>
                </div>
            </div>
            <div class="uib_bottom_right">
                    <div class="ubr_right" @click="goScoreRecord">
                        <image :src="require('@/static/imgs/index/icon1.png')" alt="">
                        <span>积分记录</span>
                    </div>
                    <div class="ubr_left" @click="goStrategy">
                        <image :src="require('@/static/imgs/index/icon2.png')" alt="">
                        <span>积分攻略</span>
                    </div>
                </div>
            <div></div>
        </div>
        </div>
        <div class="tabs">
            <u-tabs :list="list" active-color="#ff2724" :bar-style="{background:'#ff2724'}" inactive-color="#333333" :is-scroll="false" bg-color="#f7f7f7" :current="current" @change="change"></u-tabs>
        </div>
        <div class="container">
            <p class="reminder">温馨提示：兑换后，课程即时添加，请注意核对有效期增加哦！</p>
            <div class="card_list" v-show="current===0">
                <div class="card_item" v-for="(item, index) in cardList" :key="index">
                    <div class="card_img">
                        <image :src="item.img"></image>
                    </div>
                    <div class="card_box">
                        <div style="font-size:30rpx;color:#333333">{{item.name}}</div>
                        <div class="my_score">
                            <div>
                                <image style="width:30rpx;height:30rpx" :src="coinIcon"></image>
                            </div>
                            <div class="score_num"><span>{{item.cardScore}}积分</span><span>{{item.price}}元</span></div>
                        </div>
                        <div class="redeem_now" @click="popupShow = true,goodsItem = item">
                            <div>立即兑换</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card_list" v-show="current===1" v-if="goodsList">
                <div class="card_item" v-for="(item, index) in goodsList" :key="index">
                    <div class="card_img">
                        <image :src="item.img"></image>
                    </div>
                    <div class="card_box">
                        <div style="font-size:30rpx;color:#333333">{{item.title}}</div>
                        <div class="my_score">
                            <div>
                                <image style="width:30rpx;height:30rpx" :src="coinIcon"></image>
                            </div>
                            <div class="score_num"><span>{{item.goodsScore}}积分</span><span>{{item.origPrice}}元</span></div>
                        </div>
                        <div class="redeem_now">
                            <div class="redeem_num">还剩{{item.number}}份</div>
                            <div class="redeem_btn" @click="goodsItem = item,popupShow = true">立即兑换</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <u-popup class="my_popup" v-model="popupShow" mode="center" v-if="goodsItem">
            <div class="top_img">
                <image style="width:200rpx;height:200rpx" :src="require('@/static/imgs/score/tanTop.png')"></image>
            </div>
            <div class="pop_container">
                <div class="pc_top" :style="{backgroundImage:`url(${require('@/static/imgs/score/cloud.png')})`}">
                </div>
                <div class="pc_middle">
                    <div>兑换确认</div>
                    <div>确认用 <span>{{goodsItem.goodsScore || goodsItem.cardScore}}</span>积分兑换{{goodsItem.title || goodsItem.name}}吗?</div>
                    <div>
                        <image v-if="goodsItem" style="width:225rpx;height:225rpx;" :src="goodsItem.img"></image>
                    </div>
                </div>
                <div class="pc_address">
                    <div class="address">
                        <div class="address_icon">
                            <u-icon name="map-fill" color="#EB4F62"></u-icon>
                        </div>
                        <div class="address_name">
                            <span>{{$state().user.shName}}</span>
                            <span>{{$state().user.shPhone}}</span>
                        </div>
                    </div>
                    <div class="address_city">
                        {{$state().user.shArea}}{{$state().user.shAddress}}
                    </div>
                    <div class="address_modify" @click="toModifyAddress">
                        修改收货地址
                    </div>
                </div>
                <div class="pc_foot">
                    <div class="pc_foot_box">
                        <div @click="popupShow = false">再想想</div>
                        <div @click="redeemGoods">立即兑换</div>
                    </div>
                </div>
                <div class="close_icon" @click="popupShow = false">
                    <u-icon color="#9F9396" size="50" name="close-circle"></u-icon>
                </div>
            </div>
        </u-popup>
    </div>
</template>

<script>
import api from '@/services/api.index';
export default {
    data() {
        return {
            list: [
                {
                    name: '课程兑换'
                },
                {
                    name: '实物兑换'
                }
            ],
            current: 0,
            cardList: [],
            coinIcon: require('@/static/imgs/my/coin.png'),
            flag: false,
            goodsList: [],
            goodsItem: null,
            popupShow: false
        };
    },
    created() {
        console.log(this.$state().user);
        if (this.current === 1) {
            this.getGoods();
        } else {
            this.getCards();
        }
    },
    methods: {
        change(e) {
            this.current = e;
            if (e === 1 && !this.goodsList.length) {
                this.getGoods();
            } else if (e === 0 && !this.cardList.length) {
                this.getCards();
            }
        },
        getGoods() {
            let data = {
                scoreType: 2,
                page: 1,
                pageSize: 100
            };
            api.getGoodsListShare(data).then(
                res => {
                    this.goodsList = res.retObj.items;
                    this.flag = true;
                    console.log(this.goodsList);
                }
            );
        },
        getCards() {
            api.cardList().then(
                res => {
                    this.cardList = res.retArr;
                    for (let i = 0; i < this.cardList.length; i++) {
                        switch (this.cardList[i].name) {
                            case '周卡':
                                this.cardList[i].img = require('@/static/imgs/score/zhou.png');
                                break;
                            case '月卡':
                                this.cardList[i].img = require('@/static/imgs/score/yue.png');
                                break;
                            case '季卡':
                                this.cardList[i].img = require('@/static/imgs/score/ji.png');
                                break;
                            case '半年卡':
                                this.cardList[i].img = require('@/static/imgs/score/ban.png');
                                break;
                            case '年卡':
                                this.cardList[i].img = require('@/static/imgs/score/nian.png');
                                break;
                            default:
                                break;
                        }
                    }
                    this.flag = true;
                }
            );
        },
        redeemGoods() {
            this.$loading.open();
            let data = {
                classifyId: this.goodsItem.id,
                number: 1,
                exchangeType: this.current === 0 ? 2 : 1
            };
            api.operScoreShopOrder(data).then(
                res => {
                    if (res.code === 1) {
                        this.$store.dispatch('loadUser').then(
                            res => {
                                if (res) {
                                    this.popupShow = false;
                                    this.$loading.close();
                                    this.$toast('积分兑换成功');
                                }
                            }
                        );
                    } else {
                        this.$loading.close();
                        this.$toast(res.msg);
                    }
                },
                err => {
                    this.$loading.close();
                    this.$toast(err.msg);
                }
            );
            console.log(this.goodsItem);
        },
        toModifyAddress() {
            uni.navigateTo({ url: '/pages/index/address/address' });
        },
        goScoreRecord() {
            uni.navigateTo({ url: '/pages/score/score-record' });
        },
        goStrategy() {
            uni.navigateTo({ url: '/pages/score/score-strategy' });
        }
    }
};
</script>

<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
}
.score_shop{
    div,span{
        font-size: 28rpx;
    }
    .info_box{
        width: 100%;
        height: 356rpx;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        position: relative;
        .info_center{
            width: 100%;
            padding-left: 30rpx;
            display: flex;
            padding-top: 60rpx;
            // align-items: center;
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
        .score_box{
            width: 94%;
            height: 160rpx;
            // transform: translate(0,-80rpx);
            position: absolute;
            bottom: -80rpx;
            left: 50%;
            transform: translate(-50%,0);
            z-index: 1000;
            margin: 0 auto;
            background: rgb(255, 255, 255);
            border-radius: 80rpx;
            justify-content: space-between;
            display: flex;
            .score_num{
                color: #ff2724;
                font-size: 64rpx;
                padding: 10rpx 56rpx;
                .score_num_bottom{
                    display: flex;
                    justify-content: center;
                    padding-top: 8rpx;
                }
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
    }
    .tabs{
        padding-top: 80rpx;
        background: #f7f7f7;
    }
    .container{
        .reminder{
            padding:20rpx 40rpx 0 40rpx;
            color: #999999;
            font-size: 24rpx;
        }
        .card_list{
            padding:0 40rpx;
            .card_item{
                display: flex;
                background: #ffffff;
                padding: 30rpx;
                margin-top: 30rpx;
                border-radius: 60rpx;
                box-shadow: 0 3.5rpx 3.5rpx rgba(182, 182, 182, 0.75);
                .card_img{
                    image{
                        width: 260rpx;
                        height: 260rpx;
                        border-radius: 30rpx;
                    }
                }
                .card_box{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 40rpx;
                    height: 260rpx;
                    .my_score{
                        display: flex;
                        align-items: center;
                        padding: 10rpx 0;
                        .score_num{
                            font-size: 26rpx;
                            :nth-child(1){
                                color: #ff2724;
                                padding: 0 12rpx;
                            }
                            :nth-child(2){
                                color: #999999;
                                text-decoration: line-through;
                            }
                        }
                        div{
                            display: flex;
                            align-items: center;
                        }
                    }
                    .redeem_now{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-top: 20rpx;
                        div{
                            background: #ff2724;
                            font-size: 26rpx;
                            color: #ffffff;
                            padding:5rpx 20rpx;
                            border-radius: 100rpx;
                        }
                        .redeem_num{
                            background: none;
                            color: #999999;
                            padding: 0;
                            flex: 1;
                        }
                    }
                }
            }
        }
    }
    .pop_container{
        width: 600rpx;
        background: rgba(226, 223, 223, 0);
        .pc_top{
            width: 100%;
            height: 180rpx;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: #99999900;
            border-top-right-radius: 60rpx;
            border-top-left-radius: 60rpx;
        }
        .pc_middle{
            width: 100%;
            background: #ffffff;
            text-align: center;
            padding-top: 60rpx;
            image{
                border-radius: 20rpx;
            }
            :nth-child(1){
                width: 100%;
                color: #ff4060;
                font-size: 38rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            :nth-child(2){
                color: #333333;
                text-align: center;
                padding: 20rpx 0;
                :nth-child(1){
                    display: inline;
                    color: #ff2724;
                    font-size: 28rpx;
                }
            }
            :nth-child(3){
                display: flex;
                padding-top: 10rpx;
                padding-bottom: 30rpx;
                justify-content: center;
            }
        }
        .pc_address{
            width: 100%;
            background: rgb(236, 236, 236);
            padding-bottom: 20rpx;
            .address{
                display: flex;
                padding: 20rpx 30rpx;
                .address_icon{
                    padding-right: 20rpx;
                }
                .address_name{
                    :nth-child(1){
                        padding-right: 20rpx;
                        color: #333333;
                        font-size: 30rpx;
                        font-weight: 500;
                    }
                    :nth-child(2){
                        font-size: 26rpx;
                        color: #999999;
                    }
                }
            }
            .address_city{
                color: #333333;
                font-size: 24rpx;
                padding: 10rpx 34rpx 34rpx 76rpx;
            }
            .address_modify{
                margin-left: 30rpx;
                width: 200rpx;
                padding: 10rpx 0;
                font-size: 24rpx;
                color: #ff2724;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 30rpx;
                border: 2rpx solid #ff2724;
            }
        }
        .pc_foot{
            width: 100%;
            height: 160rpx;
            background: #ffffff;
            display: flex;
            align-items: center;
            border-bottom-right-radius: 60rpx;
            border-bottom-left-radius: 60rpx;
            .pc_foot_box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 80%;
                margin: 0 auto;
                div{
                    width: 180rpx;
                    height: 70rpx;
                    border-radius: 40rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                }
                :nth-child(1){
                    background: #ff7f90;
                }
                :nth-child(2){
                    background: #ff2724;
                }
            }
        }
        .close_icon{
            position: absolute;
            right: 20rpx;
            top: -80rpx;
        }
    }
    .top_img{
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(0,46%);
        padding-left: 30rpx;
        image{
            // z-index: 1000000000000000;
        }
    }
    .my_popup{
        /deep/ .u-drawer-content {
            display: flex;
            .u-mode-center-box{
                background-color: #99999900!important;
            }
            .uni-scroll-view{
                overflow: visible!important;
            }
        }
    }
}
</style>
