<template>
    <div class="shop_list">
        <div>
            <u-navbar :is-back="false">
                <view class="nav_container">
                    <view class="nav_back" @click="back">
                        <u-icon
                            color="#C0BFC0"
                            size="46"
                            name="arrow-left"
                        ></u-icon>
                    </view>
                    <view class="nav_title">
                        弱视用品商城
                    </view>
                    <view class="nav_icon">
                        <div @click="toCarList">
                            <u-icon size="44" name="shopping-cart"></u-icon>
                        </div>
                        <div>
                            <u-icon size="44" name="zhuanfa"></u-icon>
                        </div>
                    </view>
                </view>
            </u-navbar>
        </div>
        <div class="goods_list">
            <div
                class="goods_item"
                v-for="(item, index) in goodsList"
                :key="index"
                @click="goToDetails(item)"
            >
                <div class="item_img">
                    <image :src="item.img"></image>
                </div>
                <div class="item_title">
                    <div>{{ item.title }}</div>
                    <div>{{ item.des }}</div>
                </div>
                <div class="item_price">
                    <div class="specail">
                        优惠价<span>¥{{ item.price }}</span>
                    </div>
                    <div>¥{{ item.origPrice }}</div>
                </div>
            </div>
        </div>
        <u-loadmore style="padding-top:20rpx" :status="status" :icon-type="iconType" :load-text="loadText" />
    </div>
</template>

<script>
import apiShop from '@/services/api.shop.js';
export default {
    data() {
        return {
            goodsList: [],
            page: 0,
            pageSize: 6,
            status: 'loadmore',
            iconType: 'flower',
            loadText: {
                loadmore: '轻轻上拉',
                loading: '努力加载中',
                nomore: '没有更多了'
            }
        };
    },
    onShow() {
        this.getGoodsList();
    },
    methods: {
        back() {
            uni.navigateBack({
                delta: 1
            });
            // uni.navigateTo({ url: '/pages/index/shop/shop-list' });
        },
        getGoodsList() {
            this.page += 1;
            this.$loading.open();
            const data = {
                page: this.page,
                pageSize: this.pageSize,
                scoreType: 1
            };
            apiShop.getGoodsList(data).then(
                res => {
                    if (res.retObj.totalNum === this.goodsList.length) {
                        this.status = 'nomore';
                        this.$loading.close();
                        return;
                    }
                    if (this.goodsList.length === 0) {
                        this.status = 'nomore';
                    }
                    this.goodsList = this.goodsList.concat(res.retObj.items);
                    this.$loading.close();
                },
                err => {
                    this.page -= 1;
                    this.$loading.close();
                }
            );
        },
        goToDetails(item) {
            uni.navigateTo({ url: `/pages/index/shop/shop-detail?id=${JSON.stringify(item.id)}` });
        },
        toCarList() {
            uni.navigateTo({ url: '/pages/index/shopping-car/shopping-car' });
        }
    },
    async onPullDownRefresh() {
        // await this.$store.dispatch('loadUser');
        this.page = 0;
        this.goodsList = [];
        this.getGoodsList();
        setTimeout(function() { uni.stopPullDownRefresh(); }, 100);
        // if (this.isLogin) {
        //     this.loadData(false);
        // } else {
        //     uni.stopPullDownRefresh();
        // }
    },
    onReachBottom() {
        this.getGoodsList();
    }
};
</script>

<style lang="less">
page {
    background: #ffe0e6;
}
.shop_list {
    .nav_container {
        width: 100%;
        display: flex;
        position: relative;
        .nav_back {
            padding-left: 10rpx;
        }
        .nav_title {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #323233;
            font-size: 32rpx;
            font-weight: 500;
        }
        .nav_icon {
            display: flex;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            div {
                padding-right: 20rpx;
            }
        }
    }
    .goods_list {
        width: 94%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goods_item {
            margin-top: 30rpx;
            width: 48%;
            height: 480rpx;
            background: #ffffff;
            border-radius: 40rpx;
            border: 1rpx solid #ff99aa;
            .item_img {
                width: 90%;
                height: 60%;
                display: flex;
                justify-content: center;
                margin: 20rpx auto;
                image {
                    width: 100%;
                    height: 100%;
                    margin: 0 auto;
                    border-radius: 30rpx;
                }
            }
            .item_title {
                width: 90%;
                height: 15%;
                margin: 0 auto;
                :nth-child(1) {
                    font-size: 26rpx;
                    color: #333333;
                }
                :nth-child(2) {
                    font-size: 24rpx;
                    color: #999999;
                }
                div {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .item_price {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 90%;
                margin: 0 auto;
                .specail {
                    display: flex;
                    align-items: center;
                    font-size: 24rpx;
                    color: #ff4060;
                    :nth-child(1) {
                        font-size: 36rpx;
                        padding-left: 15rpx;
                    }
                }
                :nth-child(2) {
                    font-size: 24rpx;
                    color: #999999;
                    padding-right: 20rpx;
                    text-decoration: line-through;
                }
            }
        }
    }
}
</style>
