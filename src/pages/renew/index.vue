<template>
    <div class="renew">
        <div class="top" style="background-image:url(https://img.ruoshixunlianbao.com/bgMy_02.png)">
            <div class="avatar">
                <image :src="$state().user.headImg"></image>
            </div>
            <div class="user_name">
                <div class="name">{{$state().user.userNick}}</div>
                <div class="vip_time">
                    <image :src="corwn" v-if="$state().user.isVip === 1"></image>
                    <span v-if="$state().user.isVip === 1">{{$state().user.vipTime}}会员到期</span>
                    <span v-else>您还未开通vip</span>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="m_item" :class="index === myIndex ? 'active' : ''" @click="cellClick(item,index)" v-for="(item, index) in cardList" :key="index" :style="'background-image:url('+item.img+');'">
                <div>{{item.name}}</div>
                <div :class="item.id===15?'z':item.id===11?'y':item.id===12?'j':item.id===13?'b':'n'">{{item.pjPrice}}元/月</div>
                <div :class="item.id===15?'z1':item.id===11?'y1':item.id===12?'j1':item.id===13?'b1':'n1'"><span style="font-size:26rpx;padding-right:5rpx">¥</span>{{item.price}}</div>
            </div>
        </div>
        <div class="bottom">
            <div class="b_left">
                <span>合计</span>
                <span>¥{{cardList[myIndex].price}}</span>
            </div>
            <div class="b_right" @click="pay">去支付</div>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            corwn: require('@/static/imgs/index/会员icon.png'),
            cardList: [],
            flag: false,
            myIndex: 0
        };
    },
    created() {
        console.log(this.$state().user);
        api.cardList().then(
            res => {
                if (res.code === 1) {
                    this.cardList = res.retArr;
                    for (let i = 0; i < this.cardList.length; i++) {
                        switch (this.cardList[i].name) {
                            case '周卡':
                                this.cardList[i].img = require('@/static/imgs/score/zhou01.png');
                                break;
                            case '月卡':
                                this.cardList[i].img = require('@/static/imgs/score/yue01.png');
                                break;
                            case '季卡':
                                this.cardList[i].img = require('@/static/imgs/score/ji01.png');
                                break;
                            case '半年卡':
                                this.cardList[i].img = require('@/static/imgs/score/ban01.png');
                                break;
                            case '年卡':
                                this.cardList[i].img = require('@/static/imgs/score/nian01.png');
                                break;
                            default:
                                break;
                        }
                    }
                    this.flag = true;
                }
            }
        );
    },
    methods: {
        cellClick(item, index) {
            this.myIndex = index;
        },
        pay() {
            let data = {
                redId: 0,
                cardId: this.cardList[this.myIndex].id
            };
            api.operCardOrder(data).then(
                res => {
                    console.log(res);
                    if (res.code === 1) {
                        let par = {
                            orderId: res.retObj.id,
                            orderType: 1,
                            payType: 3
                        };
                        api.payOrder(par).then(
                            res => {
                                console.log(res);
                                if (res.code === 1) {
                                    let config = JSON.parse(res.retObj.no_use);
                                    let that = this;
                                    uni.requestPayment({
                                        provider: 'wxpay',
                                        timeStamp: config.timeStamp,
                                        nonceStr: config.nonceStr,
                                        package: config.package,
                                        signType: 'MD5',
                                        paySign: config.paySign,
                                        success: function(res) {
                                            uni.navigateTo({ url: '/pages/mine/views/my-order?current=0' });
                                        },
                                        fail: function(err) {
                                            that.$toast('支付失败');
                                            console.log('fail:' + JSON.stringify(err));
                                        }
                                    });
                                } else {
                                    this.$toast(res.msg);
                                }
                            }
                        );
                    }
                }
            );
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.renew{
    div,span{
        font-size: 28rpx;
    }
    .top{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height:280rpx;
        display: flex;
        align-items: center;
        .avatar{
            width: 160rpx;
            height: 160rpx;
            background: #ffffff;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 40rpx;
            image{
                height: 140rpx;
                width: 140rpx;
                border-radius: 100%;
            }
        }
        .user_name{
            padding-left: 30rpx;
            color: #ffffff;
            .name{
                font-size: 44rpx;
                font-weight: 500;
            }
            .vip_time{
                image{
                    width: 20rpx;
                    height: 20rpx;
                    margin-right: 10rpx;
                }
            }
        }
    }
    .middle{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 20rpx;
        background: #ffffff;
        .m_item{
            width: 46%;
            border-radius: 30rpx;
            height: 200rpx;
            margin-top: 20rpx;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            overflow: hidden;
            padding-left: 20rpx;
            :nth-child(1) {
                margin-top: 20rpx;
                color: #333333;
                font-size: 30rpx;
            }
            :nth-child(2) {
                color: #fcfcfc;
            }
            :nth-child(3){
                font-size: 40rpx;
                padding-top: 20rpx;
            }
            .z{
                color: #749eda;
            }
            .y{
                color: #5c998f;
            }
            .j{
                color: #70995c;
            }
            .b{
                color: #995c5c;
            }
            .n{
                color: #99805c;
            }
            .z1{
                color: #6699cc;
                span{
                    color: #6699cc;
                }
            }
            .y1{
                color: #009980;
                span{
                    color: #009980;
                }
            }
            .j1{
                color: #339900;
                span{
                    color: #339900;
                }
            }
            .b1{
                color: #e52e2e;
                span{
                    color: #e52e2e;
                }
            }
            .n1{
                color: #ff7f00;
                span{
                    color: #ff7f00;
                }
            }
        }
        .active{
            border: 4rpx dashed #ff2724;
        }
    }
    .bottom{
        width: 100%;
        height: 90rpx;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: calc(env(safe-area-inset-bottom));
        background: #ffffff;
        .b_left{
            padding-left: 20rpx;
            :nth-child(1){
                color: #333333;
                font-size: 24rpx;
                padding-right: 25rpx;
            }
            :nth-child(2) {
                color: #ff2724;
                font-weight: 500;
                font-size: 34rpx;
            }
        }
        .b_right{
            width: 200rpx;
            height: 60rpx;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ff2724;
            border-radius: 40rpx;
            margin-right: 20rpx;
        }
    }
}
</style>
