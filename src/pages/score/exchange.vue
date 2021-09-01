<template>
    <div class="exchange_box" v-if="flag">
        <div class="header">
            <u-tabs :list="list" active-color="#ff2724" inactive-color="#333333" :is-scroll="false" :current="current" @change="change"></u-tabs>
        </div>
        <div class="container">
            <div v-for="(item, index) in cardList" :key="index" class="container_item">
                <div>兑换日期: {{item.createTime}}</div>
                <div class="info">
                    <div>
                        <image style="width:160rpx;height:160rpx;border-radius: 10rpx;" :src="item.img"></image>
                    </div>
                    <div class="right">
                        <div class="title">{{item.title}}</div>
                        <div class="content">
                            <image style="width:30rpx;height:30rpx" :src="icon"></image>
                            <span v-if="item.type === 5">{{ item.price / 10}}积分</span>
                            <span v-if="item.type === 4">{{ item.price }}积分</span>
                            <span>¥{{item.origPrice}}</span>
                            <div v-if="item.type === 4" @click="logistics(item)">查看物流</div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <u-empty v-if="!cardList.length" text="暂时没有数据哦" margin-top="40" mode="list"></u-empty>
        </div>
        <u-popup mode="center" v-model="show">
            <div class="my_popup" v-if="orderInfo">
                <div class="top">
                    <div class="top_item1">
                        <u-icon name="map-fill" size="40" color="#FF5979"></u-icon>
                    </div>
                    <div class="top_item2">
                        <div>
                            <span style="color:#333333;font-weight:500">{{orderInfo.order.shName}}</span>
                            <span style="color:#999999;padding-left:10rpx">{{orderInfo.order.phone}}</span>
                        </div>
                        <div style="margin-top:10rpx">{{orderInfo.order.address}}</div>
                    </div>
                </div>
                <div class="middle"></div>
                <div class="footer">
                    <div>
                        <span>订单编号</span>
                        <span>{{orderInfo.order.no}}</span>
                        <span @click="copy(orderInfo.order.no)">复制</span>
                    </div>
                    <div>
                        <span>发货时间</span>
                        <span>{{orderInfo.order.sendTime || '暂时没有物流信息'}}</span>
                        <span></span>
                    </div>
                    <div v-if="orderInfo.order.sendTime">
                        <span>发货单号</span>
                        <span>{{orderInfo.order.logistics || '暂时没有物流信息'}}</span>
                        <span @click="copy(orderInfo.order.logistics)">复制</span>
                    </div>
                </div>
            </div>
        </u-popup>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            list: [
                {
                    name: '课程兑换'
                },
                {
                    name: '商品兑换'
                }
            ],
            current: 0,
            cardList: [],
            goodsList: [],
            icon: require('@/static/imgs/my/coin.png'),
            flag: false,
            orderInfo: null,
            show: false
        };
    },
    created() {
        this.getList(0);
    },
    methods: {
        change(e) {
            this.current = e;
            this.getList(e);
        },
        getList(e) {
            this.$loading.open();
            let data = {
                page: 1,
                pageSize: 100,
                type: e === 0 ? 5 : 4
            };
            api.getOrderList(data).then(
                res => {
                    if (res.retObj.items) {
                        this.cardList = res.retObj.items;
                    }
                    if (e === 0) {
                        for (let i = 0; i < this.cardList.length; i++) {
                            switch (this.cardList[i].title) {
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
                    }
                    this.$loading.close();
                    this.flag = true;
                }
            );
        },
        logistics(item) {
            let data = {
                orderId: item.orderId
            };
            api.getOrderinfo(data).then(
                res => {
                    console.log(res);
                    if (res.code === 1) {
                        if (res.retObj) {
                            this.orderInfo = res.retObj;
                            this.show = true;
                        }
                    }
                }
            );
        },
        copy(value) {
            let that = this;
            uni.setClipboardData({
                data: value, // 要被复制的内容
                success: function() {
                    // 重点~做笔记
                    // 在success中加入uni.hideToast()可以解决
                    that.$toast('复制成功');
                    // 以下就可自定义操作了~
                },
                fail: function(err) {
                    that.$toast('复制失败');
                }
            });
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
}
div,span{
    font-size: 26rpx;
}
.exchange_box{
    .container{
        .container_item{
            width: 90%;
            background: #ffffff;
            margin: 30rpx auto;
            padding: 30rpx;
            border-radius: 40rpx;
            div{
                font-size: 28rpx;
            }
            .info{
                display: flex;
                margin-top: 30rpx;
                // align-items:;
                .right{
                    margin-left: 30rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .title{
                        font-size: 28rpx;
                        color: #333333;
                    }
                    .content{
                        display: flex;
                        align-items: center;
                        :nth-child(2){
                            color: #ff2724;
                            padding-left: 20rpx;
                        }
                        :nth-child(3){
                            color: #999999;
                            padding-left: 20rpx;
                            text-decoration: line-through;
                        }
                        div{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 40rpx;
                            padding: 5rpx 20rpx;
                            margin-left: 30rpx;
                            color: #ff2724;
                            border: 2rpx solid #ff2724;
                        }
                    }
                }
            }
        }
    }
    .my_popup{
        width: 640rpx;
        height: 600rpx;
        background: #ffffff;
        border-radius: 40rpx;
        .top{
            padding: 30rpx;
            display: flex;
            .top_item1{
                width: 40rpx;
            }
            .top_item2{
                flex: 1;
                padding-left: 10rpx;
            }
        }
        .middle{
            width: 640rpx;
            height: 10rpx;
            background: #f5f5f5;
        }
        .footer{
            padding: 30rpx;
            div{
                padding-bottom: 40rpx;
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                justify-content: space-between;
                :nth-child(2){
                    color: #333333;
                    word-break: break-all;
                    flex: 1;
                    padding: 0 20rpx;
                }
                :nth-child(3){
                    color:#ff2724;
                }
            }
        }
    }
}
</style>
