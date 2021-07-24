<template>
    <div class="mine_container" v-if="flag">
        <div class="mine_container_box">
            <div class="mc_top" :style="'background-image:url('+ require('@/static/imgs/training/bgMy_02.png') +')'">
                <div class="mc_top_info">
                    <div class="mc_top_info_img">
                        <image :src="userInfo.headImg"></image>
                    </div>
                    <div class="mc_top_info_title">
                        <div>{{userInfo.userNick}}</div>
                        <div>
                            <image style="width:24rpx;height:24rpx" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                            <span>{{userInfo.vipTime}}会员到期</span>
                        </div>
                        <div>立即续费</div>
                    </div>
                </div>
                <div class="mc_top_score">
                    <div>
                        <image style="width:36rpx;height:36rpx" :src="require('@/static/imgs/my/coin.png')"></image>
                    </div>
                    <div>当前积分</div>
                    <div>{{userInfo.shopScore}}</div>
                    <div>去兑换</div>
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
                            <u-cell-item arrow-direction="right" :border-bottom="(index+1) !== bottomList.length" >
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
            <div class="logout">
                <div @click="show = true">退出登录</div>
            </div>
        </div>
        <u-modal v-model="show" content="确认退出登录吗？" :show-cancel-button="true" @confirm="confirm" ref="uModal" :async-close="true"></u-modal>
    </div>
    <div v-else></div>
</template>
<script>
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
            flag: false
        };
    },
    onShow() {
        this.$loading.open();
        this.$store.dispatch('loadUser').then(
            res => {
                if (res) {
                    this.flag = true;
                    this.$loading.close();
                    this.userInfo = this.$state().user;
                }
            }
        );
    },
    methods: {
        topJump(index) {
            switch (index) {
                case 0:
                    console.log(0);
                    break;
                case 1:
                    console.log(1);
                    break;
                case 2:
                    uni.navigateTo({ url: '/pages/index/shopping-car/shopping-car' });
                    break;
                case 3:
                    console.log(3);
                    break;
                default:
                    break;
            }
        },
        confirm() {
            uni.clearStorageSync();
            uni.reLaunch({ url: '/pages/login/login' });
        }
    }
};
</script>

<style lang="less">
page{
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
}
.mine_container{
    .mine_container_box{
        .mc_top{
            width: 100%;
            height: 476rpx;
            background-size: contain;
            background-repeat: no-repeat;
            padding: 0 30rpx 0 30rpx;
            .mc_top_info{
                display: flex;
                // #ifndef MP-WEIXIN
                padding-top: 200rpx;
                // #endif
                padding-top: calc(100rpx + env(safe-area-inset-top));
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
                    :nth-child(1){
                        font-size: 40rpx;
                    }
                    :nth-child(3){
                        width: 140rpx;
                        border: 1rpx solid #ffffff;
                        padding: 4rpx 0;
                        display: flex;
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
                margin-top: 100rpx;
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
            height: 80rpx;
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
}
</style>
