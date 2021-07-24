<template>
    <div class="shop_detail">
        <div class="navbar">
            <div class="navbar_left" @click="back">
                <u-icon color="#ffffff" name="arrow-left"></u-icon>
            </div>
            <div class="navbar_right">
                <div class="car" @click="toShoppingCar">
                    <u-icon color="#ffffff" name="shopping-cart"></u-icon>
                </div>
                <div>
                    <u-icon color="#ffffff" name="zhuanfa"></u-icon>
                </div>
            </div>
        </div>
        <div class="swiper">
            <swiper
                class="swiper-box"
                :autoplay="false"
                circular="true"
                indicatorDots="true"
                indicator-active-color="#fcf6f3"
            >
                <swiper-item>
                    <view class="swiper-item">
                        <image
                            :src="info.img"
                            class="swiper-item_img"
                            mode="aspectFill"
                            @click="swiperClick(item)"
                        />
                    </view>
                </swiper-item>
            </swiper>
        </div>
        <div class="shop_introduce">
            <div class="introduce_title">
                <div>{{ info.title }}</div>
                <div>{{ info.des }}</div>
            </div>
            <div class="introduce_subtitle">
                <div class="introduce_price">
                    <div class="my_price">
                        优惠价¥<span>{{ info.price }}</span>
                    </div>
                    <div>¥{{ info.origPrice }}</div>
                </div>
                <div class="introduce_num">
                    <span>已售</span><span>{{ info.sellNumber }}</span>
                </div>
            </div>
        </div>
        <div class="shop_chose">
            <!-- <u-cell-item title="选择">

            </u-cell-item> -->
            <div class="sc_cell" @tap="show = true">
                <div class="sc_cell_left">
                    <div>选择</div>
                    <div>颜色分类,尺码</div>
                </div>
                <div class="sc_cell_right">
                    <u-icon name="arrow-right" color="#999999"></u-icon>
                </div>
            </div>
            <div class="sc_cell_img" @tap="show = true">
                <div class="img_box">
                    <div
                        v-for="(item, index) in info.goodsClassifyList"
                        :key="index"
                    >
                        <image :src="item.img"></image>
                    </div>
                </div>
                <div class="sc_cell_classify">
                    共{{ info.goodsClassifyList.length }}种颜色分类可选
                </div>
            </div>
            <div class="sc_cell" @click="paramShow = true">
                <div class="sc_cell_left">
                    <div>参数</div>
                    <div>品牌,适用年龄</div>
                </div>
                <div class="sc_cell_right">
                    <u-icon name="arrow-right" color="#999999"></u-icon>
                </div>
            </div>
        </div>
        <div class="shop_container">
            <div>商品详情</div>
            <div class="content" v-html="info.content">
            </div>
        </div>
        <u-popup :safe-area-inset-bottom="true" class="my_popup" :border-radius="40" v-model="show" mode="bottom">
            <view class="shop_popup">
                <div class="sp_title">
                    <div class="spt_left">
                        <image :src="info.img"></image>
                    </div>
                    <div class="spt_right">
                        <div class="spt_right_info">{{info.title}}</div>
                        <div class="spt_right_price">
                            <span>优惠价¥</span><span>{{classifyActive === -1 ? info.price : titleInfo.classifyPrice}}</span><span>¥{{classifyActive === -1 ? info.origPrice : titleInfo.classifyPriceTemp}}</span>
                        </div>
                        <div class="spt_right_num">剩余{{classifyActive === -1 ? info.number : titleInfo.number}}件</div>
                    </div>
                </div>
                <div class="classify">
                    <div class="classify_title">颜色分类</div>
                    <div class="classify_container">
                        <div class="classify_item" :class="classifyActive === index ? 'active' : ''" @click="choseClassify(item, index)" v-for="(item, index) in info.goodsClassifyList" :key="index">
                            <div class="item_img">
                                <image :src="item.img" alt="">
                            </div>
                            <div class="item_words">{{item.color}}</div>
                        </div>
                    </div>
                </div>
                <div class="classify">
                    <div class="classify_title">尺码</div>
                    <div class="classify_container">
                        <template v-for="(item, index) in info.goodsClassifyList">
                            <div v-if="index === classifyActive || (classifyActive === -1 && index === 0)" class="classify_item" :class="sizeActive === index ? 'active' : ''"  @click="choseSize(item, index)" :key="index">
                                <div class="item_words">{{item.size}}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="buy_num">
                    <div >购买数量</div>
                    <div><u-number-box :min="1" v-model="buyNum"></u-number-box></div>
                </div>
            </view>
            <div class="sure_btn" @click="buyNow">
                <div>确定</div>
            </div>
        </u-popup>
        <u-popup :safe-area-inset-bottom="true" class="parameter" :border-radius="40" v-model="paramShow" mode="bottom">
            <div class="title">
                产品参数
            </div>
            <div style="padding:40rpx 20rpx 0 20rpx;height:300rpx" v-html="info.parameter">
            </div>
            <div class="sure_btn">
                <div>确定</div>
            </div>
        </u-popup>
        <div class="foot">
            <div class="foot_item1">
                <div>
                    <u-icon size="40" color="#ff2724" name="kefu-ermai"></u-icon>
                </div>
                <div>客服</div>
            </div>
            <div class="foot_item2" @click="show=true,addCar=true">
                加入购物车
            </div>
            <div @click="show=true" class="foot_item3">
                立即购买
            </div>
        </div>
    </div>
</template>
<script>
import apiInfo from '@/services/api.shop.js';
export default {
    data() {
        return {
            id: '',
            info: null,
            show: false,
            classifyActive: -1,
            sizeActive: -1,
            buyNum: 1,
            titleInfo: null,
            paramShow: false,
            addCar: false
        };
    },
    onLoad(option) {
        if (option.id) {
            this.id = JSON.parse(option.id);
        }
    },
    async mounted() {
        let data = {
            id: this.id
        };
        let res;
        try {
            console.log(data);
            res = await apiInfo.getGoodsInfo(data);
        } catch (e) {
            // TODO handle the exception
        }
        if (res) {
            this.info = res.retObj;
            if (this.info.goodsClassifyList.length) {
                this.titleInfo = this.info.goodsClassifyList[0];
            }
        }
    },
    methods: {
        back() {
            uni.navigateBack({ delta: 1 });
        },
        choseClassify(item, index) {
            this.classifyActive = index;
            this.sizeActive = -1;
            this.titleInfo = item;
        },
        choseSize(item, index) {
            this.sizeActive = index;
        },
        toShoppingCar() {
            // uni.setStorageSync('order',)
            uni.navigateTo({ url: '/pages/index/shopping-car/shopping-car' });
        },
        buyNow() {
            if (this.classifyActive === -1) {
                return this.$toast('请选择分类');
            }
            if (this.sizeActive === -1) {
                return this.$toast('请选择尺码');
            }
            console.log(this.addCar);
            if (this.addCar) {
                let info = this.info.goodsClassifyList[this.classifyActive];
                console.log(this.info.goodsClassifyList[this.classifyActive]);
                let shopInfo = {
                    classifyId: info.id,
                    goodsId: info.goodsId,
                    number: this.buyNum
                };
                apiInfo.joinCar(shopInfo).then(
                    res => {
                        this.$toast(res.msg);
                        this.show = false;
                    }
                );
                return;
            }
            // eslint-disable-next-line no-unreachable
            let info = this.info.goodsClassifyList[this.classifyActive];
            console.log(this.info.goodsClassifyList[this.classifyActive]);
            uni.setStorageSync('order',
                [
                    {
                        goodsInfo: {
                            title: this.info.title
                        },
                        classify: {
                            carId: info.id,
                            origPrice: info.classifyPriceTemp,
                            price: info.classifyPrice,
                            goodsSize: info.size,
                            goodsImg: info.img,
                            count: this.buyNum,
                            goodsColor: info.color,
                            goodsId: info.goodsId

                        }
                    }
                ]
            );
            uni.navigateTo({ url: '/pages/index/shop/shop-pay' });
        }
    }
};
</script>
<style lang="less">
page {
    background: #f3f3f3;
}
.shop_detail {
    .swiper-box {
        width: 100%;
        height: 750rpx;
        .swiper-item {
            width: 100%;
            .swiper-item_img {
                width: 100%;
                height: 750rpx;
                div {
                    height: 100%;
                }
                image {
                    height: 100%;
                }
            }
        }
        /deep/ .uni-swiper-dots-horizontal {
            position: absolute;
            bottom: 25%;
        }
    }
    .shop_introduce {
        background: #ffffff;
        padding: 30rpx 20rpx 30rpx 20rpx;
        margin: 0 auto;
        .introduce_title {
            :nth-child(1) {
                font-size: 30rpx;
                color: #333333;
            }
            :nth-child(2) {
                font-size: 24rpx;
                color: #999999;
            }
        }
        .introduce_subtitle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20rpx;
            .introduce_price {
                display: flex;
                align-items: center;
                .my_price {
                    color: #ff2742;
                    :nth-child(1) {
                        font-size: 36rpx;
                    }
                }
                :nth-child(2) {
                    text-decoration: line-through;
                    color: #999999;
                    padding-left: 20rpx;
                }
            }
            .introduce_num {
                color: #999999;
            }
        }
    }
    .shop_chose {
        background: #ffffff;
        margin-top: 20rpx;
        padding: 30rpx 20rpx 30rpx 20rpx;
        .sc_cell {
            display: flex;
            justify-content: space-between;
            .sc_cell_left {
                width: 40%;
                display: flex;
                font-size: 26rpx;
                justify-content: space-between;
                :nth-child(1) {
                    color: #999999;
                }
                :nth-child(2) {
                    color: #333333;
                }
            }
        }
        .sc_cell_img {
            display: flex;
            align-items: center;
            height: 60rpx;
            justify-content: center;
            margin: 40rpx 0 40rpx 0;
            .img_box {
                display: flex;
                div {
                    width: 60rpx;
                    height: 60rpx;
                    padding-right: 10rpx;
                    image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .sc_cell_classify {
                width: 38%;
                height: 100%;
                color: #999999;
                background-color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6rpx;
                padding: 5rpx 0 5rpx 0;
            }
        }
    }
    .shop_container {
        background: #ffffff;
        margin-top: 20rpx;
        padding: 30rpx 20rpx 30rpx 20rpx;
        .content{
            width: 100%;
            /deep/ img{
                width: 100% !important;
            }
        }
    }
    .navbar{
        position: fixed;
        width: 100%;
        height: 100rpx;
        left: 0;
        top: 0;
        z-index: 11111;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .navbar_left{
            background: rgba(0, 0, 0, 0.438);
            width: 40rpx;
            height: 40rpx;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 20rpx;
        }
        .navbar_right{
            display: flex;
            align-items: center;
            padding-right: 40rpx;
            .car{
                background: #EE828F !important;
                margin-right: 40rpx;
            }
            div{
                background: rgba(0, 0, 0, 0.438);
                width: 40rpx;
                height: 40rpx;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    .my_popup{
        .shop_popup{
            padding: 20rpx 30rpx;
            min-height: 600rpx !important;
            .sp_title{
                font-size: 30rpx;
                display: flex;
                height: 180rpx;
                padding-bottom: 20rpx;
                align-items: flex-end;
                border-bottom: 1px solid rgb(235, 235, 235);
                .spt_left{
                    width: 160rpx;
                    height: 160rpx;
                    padding-right: 20rpx;
                    image{
                        width: 100%;
                        height: 100%;
                    }
                }
                .spt_right{
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    .spt_right_info{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        font-size: 28rpx;
                        color: #000000;
                    }
                    .spt_right_price{
                        padding-bottom: 10rpx;
                        :nth-child(1){
                            color: #ff2742;
                            font-size: 24rpx;
                        }
                        :nth-child(2){
                            font-size: 36rpx;
                            color: #ff2742;
                            padding-left: 10rpx;
                        }
                        :nth-child(3){
                            color: #999999;
                            padding-left: 15rpx;
                            text-decoration: line-through;
                        }
                    }
                    .spt_right_num{
                        color: #969799;
                        font-size: 24rpx;
                    }
                }
            }
            .classify{
                padding-top: 30rpx;
                border-bottom: 1px solid rgb(235, 235, 235);
                padding-bottom: 20rpx;
                font-size: 30rpx;
                .active{
                    background: #ffd9df !important;
                    color: #ff2742;
                }
                .classify_container{
                    display: flex;
                    flex-wrap: wrap;
                    padding-top: 30rpx;
                    .classify_item{
                        display: flex;
                        // height: 60rpx;
                        margin-right: 20rpx;
                        margin-top: 20rpx;
                        align-items: center;
                        justify-content: center;
                        padding: 10rpx 30rpx;
                        background: #F5F5F5;
                        border-radius: 10rpx;
                        font-size: 24rpx;
                        .item_img{
                            width: 44rpx;
                            height: 44rpx;
                            padding-right: 20rpx;
                            image{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .buy_num{
                font-size: 30rpx;
                padding-top: 30rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        min-height: 600rpx !important;
    }
    .parameter{
        .title{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 20rpx;
            color: #323233;
            font-size: 32rpx;
            font-weight: 500;
        }
    }
    .sure_btn{
        margin-top: 20rpx;
        width: 100%;
        background: #ff2742;
        color: #ffffff;
        font-weight: 500;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 40rpx;
        div{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .foot{
        position: fixed;
        width: 100%;
        height: 100rpx;
        display: flex;
        align-items: center;
        left: 0;
        bottom:  env(safe-area-inset-bottom);
        right:0;
        background: #ffffff;
        .foot_item1{
            text-align: center;
            padding:0 40rpx 0 20rpx;
            color: #ff2742;
            font-size: 24rpx;
        }
        .foot_item2{
            width: 200rpx;
            background: #ff7f90;
            color: #ffffff;
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 40rpx;
            margin-right: 15rpx;
            flex: 1;
        }
        .foot_item3{
            flex: 1;
            width: 200rpx;
            background: #ff2724;
            color: #ffffff;
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 40rpx;
            border-radius: 40rpx;
        }
    }
}
</style>
