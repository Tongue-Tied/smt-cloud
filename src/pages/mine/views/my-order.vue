<template>
    <div class="my_order" v-if="flag">
        <div class="my_tabs">
            <u-tabs active-color="#ff2724" inactive-color="#333333" :list="list" :is-scroll="false" :current="myCurrent" @change="change"></u-tabs>
        </div>
        <div class="content">
            <div v-for="(item, index) in onwerList" @click="myCurrent ? toOrderDel(item) : false" :key="index" class="co_item">
                <div style="color:#333333;padding:30rpx 30rpx 0 30rpx;margin-bottom:20rpx"  class="u-m-b-20">购买日期: {{item.createTime}}</div>
                <div class="bottom">
                    <div>
                        <image style="width:160rpx;height:160rpx;border-radius:20rpx" :src="item.img"></image>
                    </div>
                    <div class="right">
                        <div class="right_top">
                            <div class="rt_left">
                                <div class="title" :style="{width: myCurrent ? '90%' : '100%'}">{{item.title}}</div>
                                <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx">
                                    <span>颜色分类: {{item.productType}}</span>
                                </div>
                                <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx">
                                    <span>尺码: {{item.productSize}}</span>
                                </div>
                            </div>
                            <div class="rt_right">
                                <div>¥{{item.price}}</div>
                                <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx">¥{{item.origPrice}}</div>
                                <div class="u-m-t-10" style="margin-top:10rpx">x{{item.number}}</div>
                            </div>
                        </div>
                        <div class="right_bottom" v-if="myCurrent">
                            <span>总价¥{{item.origPrice * item.number}}</span>
                            <span>优惠¥{{$big(item.origPrice * item.number).minus($big(item.price * item.number))}}</span>
                            <span>实付款¥{{item.price * item.number}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <u-empty v-if="!onwerList.length" text="暂时没有数据哦" margin-top="40" mode="list"></u-empty>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            list: [
                {
                    name: '课程'
                },
                {
                    name: '商品'
                }
            ],
            myCurrent: 0,
            page: 0,
            pageSize: 10,
            onwerList: [],
            flag: false
        };
    },
    mounted() {
        this.getGoodsList();
    },
    onLoad(e) {
        if (e.current) {
            this.myCurrent = Number(e.current);
        }
    },
    created() {
        // this.change(this.myCurrent);
    },
    onReachBottom() {
        this.getGoodsList();
    },
    methods: {
        change(e) {
            this.myCurrent = e;
            this.page = 0;
            this.onwerList = [];
            this.getGoodsList();
        },
        getGoodsList() {
            this.$loading.open();
            this.page++;
            let data = {
                type: this.myCurrent == 0 ? 1 : 2,
                page: this.page,
                pageSize: this.pageSize
            };
            api.getOrderList(data).then(
                res => {
                    if (res.retObj.items.length) {
                        this.onwerList = this.onwerList.concat(res.retObj.items);
                    }
                    if (this.myCurrent == 0) {
                        for (let i = 0; i < this.onwerList.length; i++) {
                            switch (this.onwerList[i].title) {
                                case '周卡':
                                    this.onwerList[i].img = require('@/static/imgs/score/zhou.png');
                                    break;
                                case '月卡':
                                    this.onwerList[i].img = require('@/static/imgs/score/yue.png');
                                    break;
                                case '季卡':
                                    this.onwerList[i].img = require('@/static/imgs/score/ji.png');
                                    break;
                                case '半年卡':
                                    this.onwerList[i].img = require('@/static/imgs/score/ban.png');
                                    break;
                                case '年卡':
                                    this.onwerList[i].img = require('@/static/imgs/score/nian.png');
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    this.$loading.close();
                    this.flag = true;
                },
                err => {
                    this.$loading.close();
                }
            );
        },
        toOrderDel(item) {
            uni.navigateTo({ url: `/pages/mine/views/order-details?id=${item.orderId}` });
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
.my_order{
    .my_tabs{
        background: #ffffff;
    }
    .content{
        padding:0 40rpx;
        .co_item{
            width: 100%;
            margin: 0 auto;
            background: #ffffff;
            // padding: 20rpx;
            margin-top: 30rpx;
            border-radius: 40rpx;
            .bottom{
                display: flex;
                padding-top: 20rpx;
                padding: 30rpx;
                .right{
                    flex: 1;
                    margin-left: 20rpx;
                    .right_top{
                        display: flex;
                        justify-content: space-between;
                        .rt_left{
                            color: #999999;
                            font-size: 24rpx;
                            .title{
                                width: 90%;
                                color: #333333;
                                overflow: hidden;
                            }
                        }
                        .rt_right{
                            text-align: right;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            :nth-child(1){
                                font-size: 26rpx;
                            }
                            :nth-child(2){
                                font-size: 24rpx;
                                color: #999999;
                                text-decoration: line-through;
                            }
                            :nth-child(3){
                                color: #999999;
                            }
                        }
                    }
                    .right_bottom{
                        margin-top: 40rpx;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        span{
                            font-size: 24rpx !important;
                        }
                    }
                }
            }
        }
    }
}
</style>
