<template>
    <div class="my_order" v-if="flag">
        <div class="my_tabs">
            <u-tabs active-color="#ff2724" inactive-color="#333333" :list="list" :is-scroll="false" :current="myCurrent" @change="change"></u-tabs>
        </div>
        <div class="content" v-if="myCurrent === 1">
            <div v-for="(item, index) in onwerList" @click="myCurrent ? toOrderDel(item) : false" :key="index" class="co_item">
                <div style="color:#333333;padding:30rpx 30rpx 0 30rpx;margin-bottom:20rpx"  class="u-m-b-20">购买日期: {{item.createTime}}</div>
                <template v-if="item.goodsClassifyList.length > 0">
                    <div class="bottom" v-for="(goods,kIndex) in item.goodsClassifyList" :key="kIndex">
                        <div>
                            <image style="width:160rpx;height:160rpx;border-radius:20rpx" :src="goods.img"></image>
                        </div>
                        <div class="right">
                            <div class="right_top">
                                <div class="rt_left">
                                    <div class="title" :style="{width: myCurrent ? '90%' : '100%'}">{{goods.title}}</div>
                                    <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">
                                        <span style="font-size:26rpx">颜色分类: {{goods.color}}</span>
                                    </div>
                                    <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">
                                        <span style="font-size:26rpx">尺码: {{goods.size}}</span>
                                    </div>
                                </div>
                                <div class="rt_right">
                                    <div>¥{{goods.classifyPrice}}</div>
                                    <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">¥{{goods.classifyPriceTemp}}</div>
                                    <div class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">x{{goods.count}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="item.goodsClassifyList.length === 0">
                    <div class="bottom">
                        <div>
                            <image style="width:160rpx;height:160rpx;border-radius:20rpx" :src="item.img"></image>
                        </div>
                        <div class="right">
                            <div class="right_top">
                                <div class="rt_left">
                                    <div class="title" :style="{width: myCurrent ? '90%' : '100%'}">{{item.title}}</div>
                                    <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx;">
                                        <span style="font-size:26rpx">颜色分类: {{item.productType}}</span>
                                    </div>
                                    <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">
                                        <span style="font-size:26rpx">尺码: {{item.productSize}}</span>
                                    </div>
                                </div>
                                <div class="rt_right">
                                    <div>¥{{item.price}}</div>
                                    <div v-if="myCurrent" class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">¥{{item.origPrice}}</div>
                                    <div class="u-m-t-10" style="margin-top:10rpx;font-size:26rpx">x{{item.number}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="right_bottom" v-if="myCurrent">
                    <span>总价¥{{item.totalPrice}}</span>
                    <span>优惠¥{{$big(item.totalPrice).minus($big(item.price))}}</span>
                    <span>实付款¥{{item.price}}</span>
                </div>
            </div>
        </div>
        <div v-if="myCurrent === 0" class="content myclass">
            <div v-for="(item, index) in onwerList" @click="myCurrent ? toOrderDel(item) : false" :key="index" class="co_item">
                <div style="color:#333333;padding:30rpx 30rpx 0 30rpx;margin-bottom:20rpx;font-size:26rpx"  class="u-m-b-20">购买日期: {{item.createTime}}</div>
                <div class="bottom">
                    <div>
                        <image style="width:160rpx;height:160rpx;border-radius:20rpx" :src="item.img"></image>
                    </div>
                    <div class="right">
                        <div class="right_top">
                            <div class="rt_left">
                                <div class="title" :style="{width: myCurrent ? '90%' : '100%'}">{{item.title}}</div>
                            </div>
                            <div class="rt_right">
                                <div>¥{{item.price}}</div>
                                <div class="u-m-t-10" style="margin-top:10rpx;text-decoration: unset;">x{{item.number}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <u-empty v-if="!onwerList.length" text="暂时没有数据哦" margin-top="40" mode="list"></u-empty>
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
            flag: false,
            isPay: false
        };
    },
    mounted() {
        this.getGoodsList();
    },
    onLoad(e) {
        if (e.current) {
            this.myCurrent = Number(e.current);
        }
        // eslint-disable-next-line no-undef
        let pages = getCurrentPages();
        let prevpage = pages[pages.length - 2];
        console.log(prevpage.route);
        if (prevpage.route === 'pages/index/shop/shop-pay' || prevpage.route === 'pages/renew/index') {
            this.isPay = true;
        }
    },
    onUnload() {
        if (this.isPay) {
            uni.switchTab({ url: '/pages/mine/index' });
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
                        for (let i = 0; i < this.onwerList.length; i++) {
                            console.log(this.onwerList[i]);
                            if (this.onwerList[i].goodsClassifyList.length) {
                                let totalPrice = 0;
                                for (let j = 0; j < this.onwerList[i].goodsClassifyList.length; j++) {
                                    let item = this.onwerList[i].goodsClassifyList[j];
                                    totalPrice = totalPrice + (item.classifyPriceTemp * item.count);
                                    console.log(totalPrice);
                                    console.log(item);
                                }
                                this.onwerList[i].totalPrice = totalPrice;
                            } else {
                                this.onwerList[i].totalPrice = this.$big(this.onwerList[i].origPrice).times(this.onwerList[i].number);
                            }
                        }
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
            let par = item.$orig.goodsClassifyList.length ? item.$orig.goodsClassifyList : [item.$orig];
            par = JSON.stringify(par);
            console.log(par);
            // console.log(item.$orig.goodsClassifyList.length ? item.$orig.goodsClassifyList : [item.$orig]);
            uni.navigateTo({ url: `/pages/mine/views/order-details?id=${item.$orig.orderId}&list=${par}&price=${item.$orig.price}&discount=${this.$big(item.$orig.totalPrice).minus(this.$big(item.$orig.price))}&totalPrice=${item.$orig.totalPrice}` });
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
    div,span{
        font-size: 28rpx;
    }
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
                }
            }
        }
        .right_bottom{
            // margin-top: 20rpx;
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            padding: 0 30rpx 30rpx 30rpx;
            span{
                font-size: 24rpx !important;
                padding-right: 20rpx;
            }
        }
    }
    .myclass{
        .right{
            display: flex;
            align-items: center;
            .right_top{
                flex: 1;
                .rt_right{
                    :nth-child(2){
                        text-decoration: unset;
                    }
                }
            }
        }
    }
}
</style>
