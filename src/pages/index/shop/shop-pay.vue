<template>
    <div class="shopping_pay">
        <div class="address">
            <div class="address_top">
                <div class="at_left">
                    <u-icon name="map-fill" color="#EB5164" size="38"></u-icon>
                </div>
                <div class="at_right">
                    <div class="at_right_person">
                        <span>{{shName}}</span>
                        <span>{{shPhone}}</span>
                    </div>
                    <div class="at_address">
                        {{address}}
                    </div>
                </div>
            </div>
            <div class="modify_address" @click="modifyAddress">修改收货地址</div>
        </div>
        <div
            class="pay_order_info"
        >
            <div class="poi_item1" v-for="(item, index) in order"
            :key="index">
                <div class="poi_item1_img">
                    <image mode="widthFix" :src="item.classify.goodsImg"></image>
                </div>
                <div class="poi_item1_main">
                    <div class="poi_item1_main_top flex">
                        <div>{{ item.goodsInfo.title }}</div>
                        <div>¥{{ item.classify.price }}</div>
                    </div>
                    <div class="poi_item1_main_middle flex">
                        <div>颜色分类: &nbsp;{{ item.classify.goodsColor }}</div>
                        <div>¥{{ item.classify.origPrice }}</div>
                    </div>
                    <div class="poi_item1_main_bottom flex">
                        <div>尺码: &nbsp;{{ item.classify.goodsSize }}</div>
                        <div>x{{ item.classify.count || 1 }}</div>
                    </div>
                </div>
            </div>
            <div class="poi_item2 flex color_999">
                <div>总价</div>
                <div>¥{{totalOriginPrice}}</div>
            </div>
            <div class="poi_item3 flex color_999">
                <div>优惠</div>
                <div>¥{{ totalPrice }}</div>
            </div>
            <div class="poi_item4 flex">
                <div>实付款</div>
                <div style="font-size:28rpx;color:#ff2724">¥{{ truePrice }}</div>
            </div>
        </div>
        <!-- <div class="pay_order_type">
            <div>支付方式</div>
            <div class="zhifubao" @click="payType = 1">
                <div class="pay_type">
                    <u-icon class="my_icon" name="zhifubao" color="#ffffff" size="60"></u-icon
                    ><span>支付宝</span>
                </div>
                <div>
                    <u-radio-group v-model="payType" @change="radioChange">
                        <u-radio active-color="#ff2724" :name="1"> </u-radio>
                    </u-radio-group>
                </div>
            </div>
            <div class="weixin" @click="payType = 2">
                <div class="pay_type">
                    <u-icon
                        name="weixin-fill"
                        color="#86CC5A"
                        size="60"
                    ></u-icon
                    ><span>微信</span>
                </div>
                <div>
                    <u-radio-group v-model="payType" @change="radioChange">
                        <u-radio active-color="#ff2724" :name="2"> </u-radio>
                    </u-radio-group>
                </div>
            </div>
        </div> -->
        <div class="foot_bar">
            <div class="fb_price">
                <div>合计</div>
                <div class="my_price"><span>¥{{truePrice}}</span></div>
            </div>
            <div class="fb_btn" @click="toPay">确认订单</div>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.shop.js';
export default {
    data() {
        return {
            order: null,
            payType: 0,
            totalPrice: 0,
            totalOriginPrice: 0,
            truePrice: 0,
            shName: this.$state().user.shName,
            shPhone: this.$state().user.shPhone,
            address: this.$state().user.shArea + ' ' + this.$state().user.shAddress,
            form: false
        };
    },
    onLoad(e) {
        if (e.form === 'car') {
            this.form = true;
        }
    },
    created() {
        // uni.login({
        //     success: function(res) {
        //         console.log(res);
        //         uni.request({});
        //     }
        // });
        if (uni.getStorageSync('order')) {
            this.order = uni.getStorageSync('order');
            let price = 0;
            for (let i = 0; i < this.order.length; i++) {
                this.totalOriginPrice = this.$big(this.totalOriginPrice).add(this.order[i].classify.origPrice * (this.order[i].classify.count || 1)).toNumber(2);
                price = this.$big(price).add(this.order[i].classify.price * (this.order[i].classify.count || 1)).toNumber(2);
                this.totalPrice = this.$big(this.totalOriginPrice).minus(price).toNumber(2).toFixed(2);
                this.truePrice = price.toFixed(2);
                // this.$big(this.totalOriginPrice).add(this.carList[i].origPrice).toNumber()
            }
            console.log(price);
            // this.truePrice = price;
        }
    },
    onShow() {
        this.shName = this.$state().user.shName;
        this.shPhone = this.$state().user.shPhone;
        this.address = this.$state().user.shArea + ' ' + this.$state().user.shAddress;
    },
    methods: {
        radioChange(e) {
            this.payType = e;
        },
        modifyAddress() {
            uni.navigateTo({ url: '/pages/index/address/address' });
        },
        toPay() {
            let data = {};
            if (!this.form) {
                data = {
                    carIds: '',
                    classifyId: this.order[0].classify.carId,
                    goodsId: this.order[0].classify.goodsId,
                    number: this.order[0].classify.count,
                    redId: 0
                };
                // console.log('直接下单');
            } else {
                let arr = [];
                for (let i = 0; i < this.order.length; i++) {
                    arr.push(this.order[i].classify.carId);
                }
                data = {
                    carIds: arr.join(','),
                    classifyId: 0,
                    goodsId: 0,
                    number: 0,
                    redId: 0
                };
                console.log('购物车下单');
            }
            console.log(data);
            // let data = {
            //     carIds: '',
            //     classifyId: '',
            //     goodsId: '',
            //     number: '',
            //     redId: 0
            // };
            api.operGoodsOrder(data).then(
                res => {
                    if (res.code === 1) {
                        let order = {
                            orderId: res.retObj.id,
                            orderType: 2,
                            payType: 3
                        };
                        api.payOrder(order).then(
                            res => {
                                console.log(JSON.parse(res.retObj.no_use));
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
                                        console.log('success:' + JSON.stringify(res));
                                        that.$toast('购买成功，即将到跳转我的订单');
                                        setTimeout(() => {
                                            uni.navigateTo({ url: '/pages/mine/views/my-order?current=1' });
                                        }, 3000);
                                    },
                                    fail: function(err) {
                                        console.log('fail:' + JSON.stringify(err));
                                        that.$toast('支付失败');
                                    }
                                });
                            }
                        );
                    } else {
                        this.$toast(res.msg || '未知错误');
                    }
                    console.log(res);
                },
                err => {
                    this.$toast(err.msg || '未知错误');
                }
            );
            // uni.requestPayment({
            //     provider: 'wxpay',
            //     timeStamp: String(Date.now()),
            //     nonceStr: 'A1B2C3D4E5',
            //     package: 'prepay_id=wx20180101abcdefg',
            //     signType: 'MD5',
            //     paySign: '',
            //     success: function(res) {
            //         console.log('success:' + JSON.stringify(res));
            //     },
            //     fail: function(err) {
            //         console.log('fail:' + JSON.stringify(err));
            //     }
            // });
        }
    }
};
</script>

<style lang="less">
page{
    background: #f5f5f5;
}
.shopping_pay {
    div,span{
        font-size: 28rpx;
    }
    .color_999 {
        color: #999999;
        font-size: 24rpx;
    }
    padding-bottom: 160rpx;
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .address {
        padding: 0 0 40rpx 20rpx;
        margin-top: 4rpx;
        background: #ffffff;
        .address_top {
            display: flex;
            align-items: center;
            .at_right {
                // padding-left: 20rpx;
                padding: 40rpx 20rpx 0 20rpx;
                .at_right_person {
                    :nth-child(1) {
                        font-size: 28rpx;
                        color: #333333;
                    }
                    :nth-child(2) {
                        color: #999999;
                        padding-left: 20rpx;
                    }
                }
                .at_address {
                    padding: 30rpx 0 30rpx 0;
                }
            }
        }
        .modify_address {
            width: 200rpx;
            height: 50rpx;
            border: 1rpx solid #ff2742;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff2742;
            border-radius: 30rpx;
            font-size: 24rpx;
        }
    }
    .pay_order_info {
        margin-top: 20rpx;
        background: #ffffff;
        .poi_item1 {
            display: flex;
            padding: 30rpx;
            justify-content: space-between;
            .poi_item1_img {
                width: 180rpx;
                height: 180rpx;
                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 30rpx;
                }
            }
            .poi_item1_main {
                flex: 1;
                padding-left: 40rpx;
                color: #999999;
                font-size: 24rpx;
                .poi_item1_main_top {
                    font-size: 26rpx;
                    color: #333333;
                    align-items: flex-start;
                }
                .poi_item1_main_middle {
                    padding: 10rpx 0;
                    :nth-child(2) {
                        text-decoration: line-through;
                    }
                }
            }
        }
        .poi_item2 {
            padding: 0 30rpx;
        }
        .poi_item3 {
            padding: 10rpx 30rpx;
        }
        .poi_item4 {
            padding: 10rpx 30rpx;
        }
    }
    .pay_order_type {
        padding: 30rpx 30rpx 20rpx 30rpx;
        background: #ffffff;
        margin-top: 20rpx;
        .pay_type {
            display: flex;
            align-items: center;
        }
        .zhifubao {
            margin-top: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .my_icon{
                .u-icon {
                    background: #489ff1;
                    border-radius: 8rpx;
                }
            }
            span {
                padding-left: 20rpx;
                color: #333333;
            }
        }
        .weixin {
            margin-top: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                color: #333333;
                padding-left: 20rpx;
            }
        }
    }
    .foot_bar{
        position: fixed;
        width: 100%;
        height: 110rpx;
        bottom: 0;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fb_price{
            display: flex;
            align-items: center;
            :nth-child(1){
                font-size: 26rpx;
                color: #333333;
                padding-left: 40rpx;
            }
            .my_price{
                :nth-child(1){
                    color: #ff2742;
                    font-size: 26rpx;
                    padding-left: 20rpx;
                }
                :nth-child(2){
                    color: #999999;
                    font-size: 26rpx;
                    text-decoration: line-through;
                    padding-left: 20rpx;
                }
            }
        }
        .fb_btn{
            width: 200rpx;
            height: 60%;
            background: #ff2742;
            border-radius: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            margin-right: 40rpx;
        }
    }
}
</style>
