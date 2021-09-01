<template>
    <div class="shopping_car">
        <div class="all_chose" v-if="noGoods">
            <u-checkbox
                v-model="checked"
                shape="circle"
                @change="allChose"
            >全选</u-checkbox>
            <div @click="deleteItem" class="delete">删除</div>
        </div>
        <div v-for="(item, index) in carList" :key="index" class="car_item">
            <div class="car_item_checkbox">
                <u-checkbox
                    v-model="item.isChose"
                    shape="circle"
                    @change="itemChange(item)"
                ></u-checkbox>
            </div>
            <div class="car_item_img">
                <image :src="item.goodsImg"></image>
            </div>
            <div class="car_item_info">
                <div class="cii_top">
                    <div>{{item.goodsName}}</div>
                    <div>颜色分类: &nbsp;{{item.goodsColor}}</div>
                    <div>尺码: &nbsp;{{item.goodsSize}}</div>
                </div>
                <div class="cii_bottom">
                    <div class="cb_price">
                        <span>¥{{item.price}}</span>
                        <span>¥{{item.origPrice}}</span>
                    </div>
                    <div class="cb_num">
                        <u-number-box
                            :min="1"
                            v-model="item.carNumber"
                            @plus="numberChange(index,$event)"
                            @minus="numberChange(index,$event)"
                            @change="valChange(index, $event)">
                        </u-number-box>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot_bar">
            <div class="fb_price">
                <div>合计</div>
                <div class="my_price"><span>¥{{totalPrice}}</span><span>¥{{totalOriginPrice}}</span></div>
            </div>
            <div class="fb_btn" @click="toPay">去支付</div>
        </div>
        <u-empty mode="car" margin-top="40" v-if="!noGoods"></u-empty>
    </div>
</template>

<script>
import apiCar from '@/services/api.shop.js';
export default {
    data() {
        return {
            carList: [],
            checked: false,
            totalPrice: 0,
            totalOriginPrice: 0,
            noGoods: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            let res;
            try {
                res = await apiCar.carList();
            } catch (e) {
            // TODO handle the exception
            }
            if (res) {
                for (let i = 0; i < res.retArr.length; i++) {
                    res.retArr[i].isChose = false;
                }
                this.carList = res.retArr;
                if (this.carList.length === 0) {
                    this.noGoods = false;
                } else {
                    this.noGoods = true;
                }
                this.totalPrice = 0;
                this.totalOriginPrice = 0;
                setTimeout(function() { uni.stopPullDownRefresh(); }, 100);
            }
        },
        allChose() {
            if (this.checked) {
                for (let i = 0; i < this.carList.length; i++) {
                    this.carList[i].isChose = false;
                    this.totalPrice = 0;
                    this.totalOriginPrice = 0;
                }
            } else {
                for (let i = 0; i < this.carList.length; i++) {
                    this.carList[i].isChose = true;
                    this.totalPrice = this.$big(this.totalPrice).add(this.carList[i].price * (this.carList[i].count || 1)).toNumber(2).toFixed(2);
                    this.totalOriginPrice = this.$big(this.totalOriginPrice).add(this.carList[i].origPrice * (this.carList[i].count || 1)).toNumber(2).toFixed(2);
                }
            }
        },
        itemChange(item) {
            const found = this.carList.find(e => e.isChose === true);
            console.log(found);
            if (!found) {
                this.checked = false;
            } else {
                this.checked = true;
            }
            if (!item.isChose) {
                this.totalPrice = this.$big(this.totalPrice).add(item.price * (item.count || 1)).toNumber(2).toFixed(2);
                this.totalOriginPrice = this.$big(this.totalOriginPrice).add(item.origPrice * (item.count || 1)).toNumber(2).toFixed(2);
            } else {
                this.checked = false;
                this.totalPrice = this.$big(this.totalPrice).minus(item.price * (item.count || 1)).toNumber(2).toFixed(2);
                this.totalOriginPrice = this.$big(this.totalOriginPrice).minus(item.origPrice * (item.count || 1)).toNumber(2).toFixed(2);
            }
            this.$forceUpdate();
        },
        toPay() {
            if (this.totalPrice === 0) {
                return this.$toast('还没有选择商品哟');
            }
            let arr = [];
            for (let i = 0; i < this.carList.length; i++) {
                if (this.carList[i].isChose) {
                    console.log(this.carList[i]);
                    arr.push({
                        goodsInfo: {
                            title: this.carList[i].goodsName
                        },
                        classify: this.carList[i]
                    });
                }
            }
            uni.setStorageSync('order', arr);
            // {
            //             goodsInfo: {
            //                 title: this.info.title
            //             },
            //             classifyList: [this.info.goodsClassifyList[this.classifyActive]]
            //         }
            uni.navigateTo({ url: '/pages/index/shop/shop-pay?form=car' });
        },
        valChange(index, e) {
            if (this.carList[index].isChose) {
                if (e.value - this.carList[index].count === -1) {
                    this.totalPrice = this.$big(this.totalPrice).minus(this.carList[index].price).toNumber(2).toFixed(2);
                    this.totalOriginPrice = this.$big(this.totalOriginPrice).minus(this.carList[index].origPrice).toNumber(2).toFixed(2);
                } else {
                    this.totalPrice = this.$big(this.totalPrice).add(this.carList[index].price).toNumber(2).toFixed(2);
                    this.totalOriginPrice = this.$big(this.totalOriginPrice).add(this.carList[index].origPrice).toNumber(2).toFixed(2);
                }
            }
            console.log(this.carList[index]);
            // let data = {
            //     carId: this.carList[index].carId,
            //     number: this.carList[index].count
            // };
            // let res = await apiCar.updateCarNunber(data);
            // console.log(res);
            this.carList[index].count = e.value;
        },
        async numberChange(index, e) {
            let data = {
                carId: this.carList[index].carId,
                number: e.value
            };
            let res = await apiCar.updateCarNunber(data);
            console.log(res);
        },
        deleteItem() {
            if (this.totalPrice === 0) {
                return this.$toast('请选择要删除的商品');
            }
            let arr = [];
            for (let i = 0; i < this.carList.length; i++) {
                if (this.carList[i].isChose) {
                    arr.push(this.carList[i].carId);
                }
            }
            let data = {
                carIds: arr.join(',')
            };
            apiCar.delCar(data).then(
                res => {
                    if (res.code === 1) {
                        this.getList();
                    }
                }
            );
        }
    },
    onPullDownRefresh() {
        this.getList();
    }
};
</script>

<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(80rpx + env(safe-area-inset-bottom));
}
.shopping_car{
    padding-bottom: 160rpx;
    .all_chose{
        width: 92%;
        margin: 0 auto;
        padding: 20rpx 0 0 15rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .delete{
            padding-right: 20rpx;
        }
    }
    .car_item{
        display: flex;
        align-items: center;
        height: 320rpx;
        width: 92%;
        margin: 0 auto;
        border-radius: 40rpx;
        background: #ffffff;
        margin-top: 40rpx;
        .car_item_checkbox{
            padding-left: 15rpx;
        }
        .car_item_img{
            width: 160rpx;
            height: 80%;
            image{
                width: 100%;
                height: 160rpx;
                border-radius: 20rpx;
            }
        }
        .car_item_info{
            flex: 1;
            padding: 0 15rpx 0 30rpx;
            display: flex;
            height: 80%;
            flex-direction: column;
            justify-content: space-between;
            .cii_top{
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                font-size: 24rpx;
                color: #999999;
                :nth-child(1){
                    font-size: 26rpx;
                    color: #333333;
                    padding-bottom: 30rpx;
                }:nth-child(2){
                    margin-bottom: 30rpx;
                }
            }
            .cii_bottom{
                display: flex;
                justify-content: space-between;
                .cb_price{
                    :nth-child(1){
                        color: #ff2742;
                        font-size: 30rpx;
                    }
                    :nth-child(2){
                        color: #999999;
                        font-size: 24rpx;
                        text-decoration: line-through;
                        padding-left: 10rpx;
                    }
                }
            }
        }
    }
    .foot_bar{
        position: fixed;
        width: 100%;
        bottom: 0;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: calc(env(safe-area-inset-bottom));
        padding-top: 40rpx;
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
            height: 60rpx;
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
