<template>
    <div class="account_box">
        <div class="account_container">
            <u-cell-item title="用户名" @click="show = true">
                <div style="color:#333333">{{userInfo.userNick}}</div>
            </u-cell-item>
            <u-cell-item title="重置密码" @click="resetPwd">
            </u-cell-item>
            <u-cell-item title="绑定/更改手机号" @click="bindPhone">
                <div v-if="userInfo.phone" style="color:#333333">{{userInfo.phone | phone}}</div>
            </u-cell-item>
            <!-- <u-cell-item title="绑定微信" :border-bottom="false" :arrow="!userInfo.wxName">
                <div style="color:#ff2724">{{userInfo.wxName || "还未绑定"}}</div>
            </u-cell-item> -->
        </div>
        <div class="btn_cancel" @click="cancellation = true">注销账户</div>
        <mPopup :show="cancellation" @updateUser="logOut" @closePopup="cancellation = false" :title="'注销账号'" :btnText="'知道了,我要注销'">
            <div class="cancel_box">
                <div class="left">
                    <image mode="widthFix" :src="zhuxiaoImg"></image>
                </div>
                <div class="right">确定要注销账号吗？账号注销后，将无法还原</div>
            </div>
        </mPopup>
        <u-popup v-model="show" mode="center" class="my_popup" border-radius="50">
            <div class="popup_container">
                <div class="header" :style="'background-image:url('+ backImg + ')'">
                        修改用户名
                </div>
                <div class="middle">
                    <div class="input_box">
                        <input v-model="userName" type="text">
                    </div>
                    <div class="tips">
                        仅限字母、数字、下划线
                    </div>
                </div>
                <div class="footer">
                    <div @click="updateUserName">确定</div>
                </div>
            </div>
            <div class="icon_box" @click="show=false">
                <u-icon size="60" color="#ffffff" name="close-circle"></u-icon>
            </div>
        </u-popup>
    </div>
</template>
<script>
import mPopup from '@/components/m-popup';
import api from '@/services/api.public.js';
export default {
    components: {
        mPopup
    },
    data() {
        return {
            userInfo: null,
            show: false,
            backImg: require('@/static/imgs/score/cloud.png'),
            userName: '',
            cancellation: false,
            zhuxiaoImg: require('@/static/imgs/my/zhuxiao.png')
        };
    },
    onShow() {
        this.userInfo = this.$state().user;
        this.userName = this.userInfo.userNick;
        this.$forceUpdate();
    },
    methods: {
        updateUserName() {
            if (this.userName === this.userInfo.userNick) {
                this.show = false;
                return;
            }
            this.$loading.open();
            let data = {
                userNick: this.userName
            };
            api.updateUserInfo(data).then(
                res => {
                    if (res.code === 1) {
                        this.$loading.close();
                        this.userInfo.userNick = this.userName;
                        this.show = false;
                    }
                },
                err => {
                    this.$toast(err.msg);
                    this.$loading.close();
                    this.show = false;
                }
            );
        },
        bindPhone() {
            uni.navigateTo({ url: '/pages/mine/views/update-phone' });
        },
        resetPwd() {
            if (this.$state().user.phone) {
                uni.navigateTo({ url: '/pages/mine/views/reset-password' });
            } else {
                return this.$toast('请先去绑定手机号哟');
            }
        },
        logOut() {
            api.cancellationUser().then(
                res => {
                    if (res.code === 1) {
                        this.$toast('注销成功');
                        uni.clearStorageSync();
                        this.$store.commit('updateUser', null);
                        setTimeout(() => {
                            uni.reLaunch({ url: '/pages/index/index' });
                        }, 3000);
                    } else {
                        this.$toast('注销失败');
                    }
                },
                err => {
                    this.$toast('网络连接失败');
                }
            );
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.account_box{
    .my_popup{
        /deep/ .u-drawer-content {
            overflow: visible !important;
            display: flex;
            .u-mode-center-box{
                background-color: #99999900 !important;
                overflow: visible !important;
            }
            .uni-scroll-view{
                overflow: visible !important;
            }
        }
        /deep/ .icon_box{
            position: fixed;
            right: 100rpx;
            top: 25%;
            transform: translate(0%,0);
            z-index: 1000000;
        }
    }
    .account_container{
        width: 90%;
        background: #ffffff;
        margin: 60rpx auto;
        border-radius: 50rpx;
    }
    .popup_container{
        position: relative;
        overflow: unset !important;
        .header{
            height: 200rpx;
            width: 600rpx;
            background-position: top;
            background-size: 100%,50%;
            background-repeat: no-repeat;
            background-color: #ffffff;
            display: flex;
            border-top-left-radius: 70rpx;
            border-top-right-radius: 70rpx;
            justify-content: center;
            align-items: center;
            font-size: 40rpx;
            color: #ffffff;
            font-weight: 500;
            position: relative;
            overflow: visible;
        }
        .middle{
            width: 600rpx;
            background: #ffffff;
            .input_box{
                width: 80%;
                height: 90rpx;
                background: #f5f5f5;
                margin: 0 auto;
                display: flex;
                align-items: center;
                border-radius: 50rpx;
                input{
                    height: 100%;
                    width: 100%;
                    padding-left: 20rpx;
                }
            }
            .tips{
                width: 100%;
                padding-top: 40rpx;
                text-align: center;
            }
        }
        .footer{
            width: 600rpx;
            height: 200rpx;
            background: #ffffff;
            margin: 0 auto;
            border-bottom-left-radius: 70rpx;
            border-bottom-right-radius: 70rpx;
            color: #ffffff;
            font-size: 32rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            div{
                width: 80%;
                height: 100rpx;
                margin: 0 auto;
                background: #ff2724;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50rpx;
            }
        }
    }
    .btn_cancel{
        width: 90%;
        height: 80rpx;
        margin: 0 auto;
        border-radius: 40rpx;
        border: 2rpx solid #ff2724;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: #ff2724;
    }
    .cancel_box{
        display: flex;
        align-items: center;
        width: 85%;
        margin: 0 auto;
        .left{
            padding-right: 20rpx;
            image{
                width: 140rpx;
            }
        }
        .right{
            font-size: 28rpx;
            color: #333333;
        }
    }
}
</style>
