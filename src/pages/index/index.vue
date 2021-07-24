<template>
    <view v-if="flag" class="index-panel">
        <view class="" v-if="indexData.bannerList">
            <!-- swiper轮播图 -->

                <swiper
                    class="swiper-box"
                    :autoplay="true"
                    circular="true"
                    indicatorDots="true"
                    indicator-active-color="#fcf6f3"
                >
                    <swiper-item
                        v-for="(item, index) in indexData.bannerList"
                        :key="index"
                    >
                        <view class="swiper-item">
                            <image
                                :src="item.img"
                                class="swiper-item_img"
                                mode="aspectFill"
                                @click="swiperClick(item)"
                            />
                        </view>
                    </swiper-item>
                </swiper>
        </view>
        <view class="user-info-box">
            <div class="uib_top">
                <div class="u_top_headimg">
                    <image :src="$state().user.headImg" alt="">
                </div>
                <div class="u_top_info">
                    <div>{{$state().user.userNick}}</div>
                    <div>
                        <image style="width:24rpx;height:24rpx" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                        <span>{{$state().user.vipTime}}会员到期</span>
                    </div>
                    <div>立即续费</div>
                </div>
                <div class="u_top_start">开始训练</div>
            </div>
            <div class="uib_bottom">
                <div class="uib_bottom_left">
                    <span>{{$state().user.shopScore || 0}}</span>
                    <span>积分</span>
                </div>
                <div class="uib_bottom_right">
                    <div class="ubr_right" @click="jumpToScore">
                        <image :src="require('@/static/imgs/index/icon1.png')" alt="">
                        <span>积分记录</span>
                    </div>
                    <div class="ubr_left" @click="jumpStrategy">
                        <image :src="require('@/static/imgs/index/icon2.png')" alt="">
                        <span>积分攻略</span>
                    </div>
                </div>
            </div>
        </view>
        <view class="notice_bar">
            <div><u-icon class="u-left-icon" name="volume-fill" color="#FF5177"></u-icon></div>
            <div style="width:80%;height:40rpx">
                <swiper
                    class="notice-box"
                    :autoplay="true"
                    :circular="false"
                    :indicatorDots="false"
                    :vertical="true"
                    :interval="3000"
                    :duration="1000"
                    :disable-touch="true"
                >
                    <swiper-item
                        v-for="(item, index) in indexData.msgList"
                        :key="index"
                    >
                        <view class="swiper-item">
                            {{item.content}}
                        </view>
                    </swiper-item>
                </swiper>
            </div>
        </view>
        <view class="card-list">
            <view class="card-list-container" @click="listCilck(index)" v-for="(item,index) in indexData.mainBannerList" :key="index">
                <image :src="item.img"></image>
            </view>
        </view>
        <!-- <view class="index-head">
            <view :style="{height: Number(navbarHeight) + systemInfo.statusBarHeight + 'px' }"></view>
            <view class="index-nav"
                  :class="{'u-border-bottom': bgOpacity == 1}"
                  :style="[navbarInnerStyle]">
                <view :style="{height: systemInfo.statusBarHeight + 'px'}"></view>
                <view class="index-nav-cont u-flex u-col-center u-row-center"
                      :style="{height: navbarHeight + 'px'}">
                    <span>12312321</span>
                </view>
            </view>
            <view class="index-top u-flex u-font-12 u-m-b-30 u-m-t-10 u-flex-nowrap">
            </view>
            <view class="index-card">
            </view>
        </view> -->
        <!-- <m-search v-model="searchVisible"
                  :title="searchTitle"
                  @close="searchClose"
                  @search="search"
                  @custom="search"
                  @clear="search"
                  :keyword.sync="serachQuery.keyword">
            <view class="u-p-40 u-text-center"
                  v-if="searchLoading">
                <u-loading mode="circle"></u-loading>
            </view>
            <view class=""
                  v-else-if="customerList.length">
                <view class=""
                      v-for="(item, index) in customerList"
                      :key="index"
                      @click="customerClick(item)">
                    <customer-cell :value="item"></customer-cell>
                </view>
            </view>
            <view v-else
                  class="u-p-t-30 u-p-b-30">
                <u-empty text="暂无数据"
                         color="#9AA5B1"
                         icon-color="rgb(154 165 177 / 50%)"
                         src="error-circle-fill"></u-empty>
            </view>
        </m-search> -->
    </view>
    <view v-else>

    </view>
</template>
<script>
import launch from '@/mixins/launch.js';
// import { mapGetters } from 'vuex';
import apiIndex from '@/services/api.index.js';
// import apiMember from '@/services/api.member.js';
// import customerCell from '@/pages/index/customer-cell.vue';
export default {
    name: 'index',
    mixins: [launch],
    components: {
        // customerCell
    },
    // computed: {
    //     isManager() {
    //         // 是否管理员店长
    //         return this.$store.getters.isAdmin || this.$store.getters.isManager;
    //     },
    //     dateTitle() {
    //         const item = this.dateList.find(val => val.value == this.serachQuery.dateType);
    //         return item.title + '数据';
    //     },
    //     currentMenus() {
    //         return this.menus
    //             .map(list => {
    //                 return list.filter(val => {
    //                     try {
    //                         return !val.code || val.code.indexOf(this.$store.state.user.merchantRole.code) != -1;
    //                     } catch (e) {
    //                         return false;
    //                     }
    //                 });
    //             })
    //             .filter(list => list.length);
    //     },
    //     searchTitle() {
    //         // #ifdef H5
    //         return '';
    //         // #endif
    //         // eslint-disable-next-line
    //         return '美问轻店';
    //     },
    //     navColor() {
    //         const num = ((1 - this.bgOpacity) * 255).toFixed(0);
    //         return `rgb(${num} ${num} ${num})`;
    //     },
    //     navbarHeight() {
    //         // #ifdef APP-PLUS || H5
    //         return 44;
    //         // #endif
    //         // #ifdef MP
    //         // eslint-disable-next-line
    //         return this.systemInfo.platform == 'ios' ? 44 : 48;
    //         // #endif
    //     },
    //     navbarInnerStyle() {
    //         return {
    //             height: this.navbarHeight + this.systemInfo.statusBarHeight + 'px',
    //             'background-color': `rgba(255, 255, 255, ${this.bgOpacity})`,
    //             color: this.navColor
    //         };
    //     },
    //     ...mapGetters(['isLogin', 'user'])
    // },
    data() {
        return {
            serachQuery: {
                page: 1,
                size: 10,
                dateType: 1,
                keyword: ''
            },
            dateVisible: false,
            bgOpacity: 0,
            searchVisible: false,
            searchLoading: false,
            sumData: {},
            customerList: [],
            isInit: false,
            indexData: null,
            list: [],
            flag: false
        };
    },
    created() {
        // #if MP-WEIXIN
        // eslint-disable-next-line no-undef
        console.log(wx);
        // wx.cloud.init({
        //     traceUser: true,
        //     env: 'ruoshibao-9gied7f3a7fe35ad'
        // });
        // eslint-disable-next-line no-undef
        // console.log(wx.cloud.CloudID());
        // eslint-disable-next-line no-undef
        // wx.getUserInfo({
        //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        //     success: (res) => {
        //         uni.setStorageSync('weChatUserInfo', res.userInfo);
        //         console.log(res.userInfo);
        //     }
        // });
        // wx.login({
        //     success(res) {
        //         if (res.code) {
        //             // 发起网络请求
        //             // eslint-disable-next-line no-undef
        //             wx.request({
        //                 url: 'https://app.ruoshixunlianbao.com',
        //                 data: {
        //                     code: res.code
        //                 }
        //             });
        //         } else {
        //             console.log('登录失败！' + res.errMsg);
        //         }
        //     }
        // });
        // wx.cloud.callFunction({
        //     name: 'getOpenId'
        // }).then(
        //     res => {
        //         uni.setStorageSync('openId', res.result.openid);
        //         console.log(res.result.openid);
        //     }
        // );
        // #endif
    },
    async onShow() {
        this.$store.dispatch('loadUser').then(res => {
            console.log(res);
            if (res) {
                this.flag = true;
            }
        });
        // console.log(this.$store.dispatch('loadUser'));
        // this.flag = true;
        let res = await apiIndex.index();
        if (res) {
            // let arr = [];
            // for (let i = 0; i < res.retObj.bannerList.length; i++) {
            //     arr.push();
            // }
            this.indexData = res.retObj;
        }
    },
    methods: {
        listCilck(index) {
            console.log(index);
            switch (index) {
                case 4:
                    uni.navigateTo({
                        url: '/pages/index/shop/shop-list'
                    });
                    break;
                case 5:
                    uni.navigateTo({
                        url: '/pages/score/score-shop'
                    });
                    break;
                default:
                    break;
            }
        },
        jumpToScore() {
            uni.navigateTo({ url: '/pages/score/score-record' });
        },
        jumpStrategy() {
            uni.navigateTo({ url: '/pages/score/score-strategy' });
        }
    },
    onPageScroll(e) {
        // const top = this.systemInfo.safeArea.top + 44;
        // if (e.scrollTop < top) {
        //     this.bgOpacity = e.scrollTop / top;
        // } else {
        //     this.bgOpacity = 1;
        // }
    },
    async onPullDownRefresh() {
        await this.$store.dispatch('loadUser');
        uni.stopPullDownRefresh();
        // if (this.isLogin) {
        //     this.loadData(false);
        // } else {
        //     uni.stopPullDownRefresh();
        // }
    }
};
</script>
<style lang="less">
page {
    background-color: #f5f5f5;
}
.index-panel {
    padding-bottom: 30rpx;
    .swiper-box{
        width: 100%;
        height: 540rpx;
        .swiper-item{
            width: 100%;
            .swiper-item_img{
                width: 100%;
                height: 540rpx;
                div{
                    height: 100%;
                }
                img{
                    height: 100%;
                }
            }
        }
        /deep/ .uni-swiper-dots-horizontal{
            position: absolute;
            bottom: 25%;
        }
    }
    .user-info-box{
        width: 90%;
        border-radius: 60rpx;
        height: 370rpx;
        margin: 0 auto;
        background: #ffffff;
        box-shadow: 0 0 10rpx 5rpx #e2dfdf;
        transform: translate(0,-100rpx);
        .uib_top{
            height: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:30rpx 20rpx 0 20rpx;
            .u_top_headimg{
                width:140rpx;
                height: 140rpx;
                margin-right: 20rpx;
                image{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .u_top_info{
                flex: 50%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                :nth-child(1){
                    font-size: 32rpx;
                    color: #333333;
                    overflow: hidden;
                }
                :nth-child(2){
                    font-size: 24rpx;
                    color: #999999;
                    padding-top: 10rpx;
                }
                :nth-child(3){
                    font-size: 24rpx;
                    color: #ff2742;
                    width: 120rpx;
                    border: 1rpx solid #ff2742;
                    display: flex;
                    padding: 5rpx 0 5rpx 0;
                    align-items: center;
                    justify-content: center;
                    margin-top: 10rpx;
                    border-radius: 18rpx;
                }
            }
            .u_top_start{
                width: 140rpx;
                color: #ffffff;
                background: #ff2742;
                height: 65rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 40rpx;
                font-size: 28rpx;
            }
        }
        .uib_bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24rpx;
            color: #333333;
            padding: 0 20rpx 30rpx 20rpx;
            .uib_bottom_left{
                display: flex;
                flex-direction: column;
                align-items: center;
                :nth-child(1){
                    font-size: 64rpx;
                    color: #ff2742;
                    font-weight: bold;
                }
            }
            .uib_bottom_right{
                display: flex;
                padding-top: 15rpx;
                .ubr_right{
                    padding-right: 120rpx;
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
    .notice_bar{
        display: flex;
        align-items: center;
        vertical-align: middle;
        width: 90%;
        margin: 0 auto;
        height: 40rpx;
        transform: translate(0,-100rpx);
        padding-top: 60rpx;
    }
    .notice-box{
        height: 100%;
        .swiper-item{
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 24rpx;
            color: #666666;
        }
    }
    .card-list{
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between  ;
        transform: translate(0,-50rpx);
        .card-list-container{
            width: 48%;
            height: 200rpx;
            margin-bottom: 20rpx;
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
    .index-head {
        position: relative;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 20%;
            background: linear-gradient(270deg, #e056e0 0%, #b44dce 100%);
            border-bottom-left-radius: 5%;
            border-bottom-right-radius: 5%;
        }
        padding-left: 30rpx;
        padding-right: 30rpx;
        .index-nav {
            margin-bottom: 10rpx;
            left: 0;
            right: 0;
            position: fixed;
            z-index: 3;
            top: 0;
            &.u-border-bottom {
                box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.05);
            }
            .index-nav-cont {
                text-align: center;
                font-size: 34rpx;
                font-weight: 500;
            }
        }
        .index-color-white {
            color: white;
        }
        .index-sign-btn {
            width: 220rpx;
            border-radius: 16rpx;
            overflow: hidden;
            margin: 0 auto;
        }
        .index-top,
        .index-card,
        .index-sign-btn {
            position: relative;
            z-index: 2;
        }
        .index-card {
            .m-card-panel {
                position: relative;
                overflow: hidden;
            }
        }
        .index-card-def {
            position: relative;
            padding-top: 50rpx;
            padding-bottom: 50rpx;
        }
        .index-card-img {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .index-search {
        padding: 40rpx 50rpx;
    }
    .index-body {
        padding: 0 30rpx;
        .m-card-panel {
            padding: 0;
        }
        + .index-body {
            margin-top: 30rpx;
        }
    }
}
</style>
<style scoped>
.card-list .card-list-container :nth-child(2n+1){
        margin-right: 5%;
}
</style>
