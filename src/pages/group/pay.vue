<template>
    <div class="group_pay_box">
        <div class="top">
            <div class="price">¥{{groupInfo.price}}</div>
            <div class="buy_title">购买内容: {{groupInfo.title}}</div>
        </div>
        <div class="content">
            <div class="u-font-32">
                确认收货地址
            </div>
            <div style="padding-top:30rpx" class="u-padding-top-30">
                <div>
                    <span style="color:#333333;padding-right:20rpx">{{userInfo.shName || ''}}</span>
                    <span style="color:#999999;font-size:24rpx">{{userInfo.shPhone || ''}}</span>
                </div>
                <div style="color:#333333;padding-top:10rpx;font-size:28rpx">
                    <span>{{userInfo.shArea || ''}}</span>
                    <span style="padding-left:20rpx">{{userInfo.shAddress || ''}}</span>
                </div>
            </div>
            <div class="modify_address">
                <div @click="toModifyAddress">
                    修改收货地址
                </div>
            </div>
        </div>
        <div class="pay_now">
            <div @click="pay">立即支付</div>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.group.js';
export default {
    data() {
        return {
            groupInfo: null,
            userInfo: null
        };
    },
    onLoad(e) {
        if (e) {
            this.groupInfo = e;
        }
    },
    onShow() {
        this.userInfo = this.$state().user;
        console.log(this.userInfo);
    },
    created() {
        this.userInfo = this.$state().user;
    },
    methods: {
        toModifyAddress() {
            uni.navigateTo({ url: '/pages/index/address/address' });
        },
        pay() {
            let data = {
                groupId: this.groupInfo.groupId,
                number: this.groupInfo.number,
                orderId: this.groupInfo.orderId,
                type: this.groupInfo.type
            };
            api.operGroupOrder(data).then(
                res => {
                    if (res.code === 1) {
                        let order = {
                            orderId: res.retObj.id,
                            orderType: 3,
                            payType: 3
                        };
                        api.payOrder(order).then(
                            res => {
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
                                        if (res.errMsg === 'requestPayment:ok') {
                                            that.$toast('购买成功，即将到跳转我的拼团');
                                            setTimeout(() => {
                                                uni.navigateTo({ url: '/pages/group/my-group' });
                                            }, 3000);
                                        }
                                        console.log('success:' + JSON.stringify(res));
                                    },
                                    fail: function(err) {
                                        that.$toast('支付失败');
                                        console.log('fail:' + JSON.stringify(err));
                                    }
                                });
                            }
                        );
                    } else {
                        this.$toast(res.msg);
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
.group_pay_box{
    div,span{
        font-size: 28rpx;
    }
    .top{
        text-align: center;
        width: 100%;
        border-top: 3rpx solid #f5f5f5;
        padding: 40rpx 0;
        background: #ffffff;
        .price{
            font-size: 50rpx;
            color: #ff2724;
        }
        .buy_title{
            padding: 30rpx 40rpx 0 40rpx;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap

        }
    }
    .content{
        background: #ffffff;
        margin-top: 20rpx;
        padding: 40rpx;
        .modify_address{
            margin-top: 30rpx;
            display: flex;
            div {
                border: 3rpx solid #ff2724;
                border-radius: 100rpx;
                color: #ff2724;
                font-size: 24rpx;
                padding: 10rpx 20rpx;
            }
        }
    }
    .pay_now{
        position: fixed;
        left: 0;
        bottom: calc(20rpx + env(safe-area-inset-bottom));
        width: 100%;
        div {
            width: 90%;
            margin: 0 auto;
            height: 80rpx;
            border-radius: 80rpx;
            background: #ff2724;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 500;
        }
    }
}
</style>
