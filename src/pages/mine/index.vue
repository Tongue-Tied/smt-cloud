<template>
    <div class="mine_container" v-if="flag">
        <div class="mine_container_box">
            <div class="mc_top" :style="userInfo?'padding-bottom:0':''" style="background-image:url(https://img.ruoshixunlianbao.com/bgMy_02.png);">
                <div class="mc_top_info">
                    <div class="mc_top_info_img">
                        <!-- <image v-if="userInfo" :src="userInfo.headImg"></image> -->
                        <u-avatar size="150" :src="userInfo ? userInfo.headImg : ''"></u-avatar>
                    </div>
                    <div v-if="userInfo" class="mc_top_info_title">
                        <div>{{userInfo.userNick || ''}}</div>
                        <div>
                            <image style="width:24rpx;height:24rpx" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                            <span v-if="userInfo" style="padding-left:22rpx">{{userInfo.vipTime || ''}}会员到期</span>
                        </div>
                        <div class="renew" @click="toRenew">立即续费</div>
                    </div>
                    <div class="mc_top_info_title" v-else>
                        <div class="login_now">
                            <WeixinLogin @upDate="upDate" class="weixin_login" />
                        </div>
                    </div>
                </div>
                <div class="mc_top_score" v-if="userInfo">
                    <div>
                        <image style="width:36rpx;height:36rpx" :src="require('@/static/imgs/my/coin.png')"></image>
                    </div>
                    <div>当前积分</div>
                    <div v-if="userInfo">{{userInfo.shopScore || 0}}</div>
                    <div @click="toScoreShop">去兑换</div>
                </div>
            </div>
            <div class="mc_middle_container">
                <div class="type">
                    <div class="mc_middle">
                        <div class="mc_middle_item" v-for="(item, index) in topList" :key="index" @click="topJump(index)">
                            <div>
                                <image style="width:80rpx;height:80rpx" :src="item.url"></image>
                            </div>
                            <div>{{item.title}}</div>
                        </div>
                </div>
                </div>
                <div class="mc_list_box">
                    <div class="mc_list_container">
                        <div class="mlc_item" v-for="(item, index) in bottomList" :key="index">
                            <!-- {{item.text}} -->
                            <u-cell-item @click="btClick(index)" arrow-direction="right" :border-bottom="(index+1) !== bottomList.length" >
                                <!-- <div slot="icon"></div> -->
                                <div slot="icon" class="cell_left">
                                    <div><image style="width:38rpx;height:38rpx" :src="item.icon"></image></div>
                                    <div class="cell_text">{{item.text}}</div>
                                </div>
                            </u-cell-item>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="logout">
                <div @click="show = true">退出登录</div>
            </div> -->
        </div>
        <div class="msg_box" @click="toMsg">
            <u-icon name="email" color="#ffffff" size="50"></u-icon>
            <div class="msg_num" v-if="msgLength">{{msgLength || ''}}</div>
        </div>
        <u-modal v-model="show" content="确认退出登录吗？" :show-cancel-button="true" @confirm="confirm" ref="uModal" :async-close="true"></u-modal>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.public.js';
import WeixinLogin from '@/components/wxLogin';
export default {
    data() {
        return {
            userInfo: null,
            topList: [
                {
                    url: require('@/static/imgs/my/one.png'),
                    title: '我的订单'
                },
                {
                    url: require('@/static/imgs/my/pintuan.png'),
                    title: '我的拼团'
                },
                {
                    url: require('@/static/imgs/my/gouwuche.png'),
                    title: '购物车'
                },
                {
                    url: require('@/static/imgs/my/hezi.png'),
                    title: '兑换码'
                }
            ],
            bottomList: [
                {
                    icon: require('@/static/imgs/my/icon1.png'),
                    text: '积分兑换订单'
                },
                {
                    icon: require('@/static/imgs/my/icon2.png'),
                    text: '积分记录'
                },
                {
                    icon: require('@/static/imgs/my/icon3.png'),
                    text: '辅导老师'
                },
                {
                    icon: require('@/static/imgs/my/icon4.png'),
                    text: '个人信息'
                },
                {
                    icon: require('@/static/imgs/my/icon5.png'),
                    text: '账号与安全'
                },
                {
                    icon: require('@/static/imgs/my/icon6.png'),
                    text: '客服与帮助'
                },
                {
                    icon: require('@/static/imgs/my/icon7.png'),
                    text: '关于我们'
                },
                {
                    icon: require('@/static/imgs/my/icon8.png'),
                    text: '用户须知'
                }
            ],
            show: false,
            flag: false,
            msgLength: 0
        };
    },
    components: {
        WeixinLogin
    },
    onShow() {
        if (!uni.getStorageSync('token')) {
            return (this.flag = true);
        }
        this.$loading.open();
        this.$store.dispatch('loadUser').then(
            res => {
                if (res) {
                    this.$loading.close();
                    this.userInfo = this.$state().user;
                    this.getData();
                } else {
                    this.$loading.close();
                }
            }
        );
    },
    onPullDownRefresh() {
        if (!uni.getStorageSync('token')) {
            return (this.flag = true);
        }
        this.$store.dispatch('loadUser').then(
            res => {
                if (res) {
                    this.userInfo = this.$state().user;
                    this.getData();
                    uni.stopPullDownRefresh();
                }
            }
        );
    },
    methods: {
        upDate(e) {
            this.flag = false;
            setTimeout(() => {
                this.userInfo = this.$state().user;
                this.getData();
                this.flag = true;
            }, 100);
        },
        isLogin() {
            if (!uni.getStorageSync('token')) {
                return false;
            } else {
                return true;
            }
        },
        async getData() {
            const res = await api.getMsgList({
                page: 1,
                pageSize: 100
            });
            let arr = res.retObj.items;
            try {
                if (res.code === 1) {
                    this.msgLength = 0;
                    for (let i = 0; i < arr.length; i++) {
                        console.log(arr[i]);
                        if (arr[i].isRead === 1) {
                            this.msgLength += 1;
                        }
                    }
                }
            } catch (error) {

            }
            console.log(this.msgLength);
            this.flag = true;
        },
        topJump(index) {
            if (!this.isLogin()) {
                return this.$toast('您还未登陆，请先登陆');
            }
            switch (index) {
                case 0:
                    uni.navigateTo({ url: '/pages/mine/views/my-order' });
                    break;
                case 1:
                    uni.navigateTo({ url: '/pages/group/my-group' });
                    break;
                case 2:
                    console.log(123);
                    uni.navigateTo({ url: '/pages/shopping-car/shopping-car' });
                    break;
                case 3:
                    uni.navigateTo({ url: '/pages/mine/views/redeem' });
                    console.log(3);
                    break;
                default:
                    break;
            }
        },
        confirm() {
            uni.clearStorageSync();
            uni.reLaunch({ url: '/pages/login/login' });
        },
        btClick(index) {
            console.log(index);
            switch (index) {
                case 0:
                    this.isLogin() ? uni.navigateTo({ url: '/pages/score/exchange' }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 1:
                    this.isLogin() ? uni.navigateTo({ url: '/pages/score/score-record' }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 2:
                    uni.navigateTo({ url: '/pages/mine/views/tutor' });
                    break;
                case 3:
                    this.isLogin() ? uni.navigateTo({ url: '/pages/mine/views/information' }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 4:
                    this.isLogin() ? uni.navigateTo({ url: '/pages/mine/views/account' }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 5:
                    this.isLogin() ? uni.navigateTo({ url: '/pages/mine/views/help' }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 6:
                    uni.navigateTo({ url: '/pages/mine/views/about' });
                    break;
                case 7:
                    uni.navigateTo({ url: '/pages/mine/views/user-know' });
                    break;
                default:
                    break;
            }
        },
        toScoreShop() {
            uni.navigateTo({ url: '/pages/score/score-shop' });
        },
        toRenew() {
            uni.navigateTo({ url: '/pages/renew/index' });
        },
        toMsg() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/mine/views/message' }) : this.$toast('您还未登陆，请先登陆');
        }
    }
};
</script>

<style lang="less">
page{
    // padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
}
.mine_container{
    .mine_container_box{
        .mc_top{
            width: 100%;
            // height: 426rpx;
            background-size: contain;
            background-repeat: repeat;
            padding: calc(130rpx + env(safe-area-inset-top)) 30rpx 80rpx 30rpx;
            display: flex;
            // align-items: center;
            flex-direction: column;
            .mc_top_info{
                display: flex;
                // padding-top: calc(130rpx + env(safe-area-inset-top));
                .mc_top_info_img{
                    width: 158rpx;
                    height: 158rpx;
                    image{
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                    }
                }
                .mc_top_info_title{
                    color: #ffffff;
                    margin-left: 28rpx;
                    font-size: 24rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .login_now{
                        display: flex;
                        height: 100%;
                        align-items: center;
                        font-size: 30rpx !important;
                        .weixin_login /deep/ div{
                            font-size: 28rpx !important;
                            padding: 5rpx 20rpx;
                            border: 3rpx solid #ffffff;
                            color: #ffffff;
                            border-radius: 40rpx;
                        }
                    }
                    :nth-child(1){
                        font-size: 40rpx;
                    }
                    :nth-child(3){
                        width: 190rpx;
                        margin-top: 10rpx;
                        border: 1rpx solid #ffffff;
                        padding: 6rpx 0;
                        display: flex;
                        font-size: 29rpx;
                        border-radius: 30rpx;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .mc_top_score{
                color: #ffffff;
                display: flex;
                align-items: center;
                margin-top: 40rpx;
                padding-bottom: 70rpx;
                // transform: translate(0,-50rpx);
                div{
                    padding-right: 10rpx;
                    display: flex;
                    align-items: center;
                }
                :nth-child(3){
                    font-size: 32rpx;
                    color: #ffd400;
                }
                :nth-child(4){
                    font-size: 24rpx;
                    width: 108rpx;
                    justify-content: center;
                    border: 1rpx solid #ffffff;
                    border-radius: 40rpx;
                    padding: 4rpx 0;
                }
            }
        }
        .mc_middle_container{
            background: #ffffff;
            .type{
                width: 100%;
                background: #ffffff;
                transform: translate(0,-50rpx);
                border-radius: 60rpx;
            }
            .mc_list_box{
                .mc_list_container{
                    .mlc_item{
                        .cell_left{
                            display: flex;
                            align-items: center;
                            div{
                                display: flex;
                                align-items: center;
                            }
                            .cell_text{
                                padding-left: 30rpx;
                                color: #333333;
                            }
                        }
                    }
                }
            }
        }
        .mc_middle{
            width: 90%;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
            .mc_middle_item{
                display: flex;
                width: 160rpx;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 50rpx;
            }
        }
        .logout{
            // #if H5
            height: 70rpx;
            // #endif
            // #if MP-WEIXIN
            height: 140rpx;
            // #endif
            background: #ffffff;
            padding: 20rpx 30rpx 40rpx 30rpx;
            div{
                width: 100%;
                height: 100%;
                // margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100rpx;
                border: 1rpx solid #ff2724;
                color: #ff2724;
            }
        }
    }
    .msg_box{
        position: fixed;
        right: 30rpx;
        height: 476rpx;
        top: calc(10rpx + env(safe-area-inset-top));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000000;
        .msg_num{
            position: absolute;
            right: -10rpx;
            top: 50%;
            transform: translate(0,-90%);
            width: 30rpx;
            height: 30rpx;
            background: #FFCE11;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff2742;
        }
    }
}
</style>
