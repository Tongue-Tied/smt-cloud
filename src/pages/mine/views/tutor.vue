<template>
    <div class="tutor" v-if="flag">
        <div class="top_back" :style="{backgroundImage:'url('+backGroundUrl+')'}"></div>
        <div class="top_img">
            <image style="width:240rpx;height:240rpx;border-radius:50%" :src="teacherInfo.img"></image>
        </div>
        <div class="inset_box">
            <div class="inset_item1" style="color:#333333;font-size:40rpx">{{teacherInfo.userName}}</div>
            <div class="inset_item2" style="color:#999999">{{teacherInfo.des}}</div>
            <div class="inset_item3" style="color:#333333;margin-top:20rpx">微信扫码</div>
            <div class="inset_item4" style="color:#333333">开始与辅导老师对话</div>
            <div class="inset_item5">
                <image :src="teacherInfo.qrCode"></image>
            </div>
            <div class="inset_item6">
                <span>微信号: &nbsp;{{teacherInfo.wx}}</span><span @click="copy">复制</span>
            </div>
        </div>
        <div class="tutor_footer" style="background: #ffffff;width:100%">
            <div @click="openMsg">
                <image style="width:120rpx;height:120rpx;padding-bottom:10rpx" :src="msgIcon"></image>
                <div style="font-size:32rpx">在线留言</div>
                <div class="phone_num">{{obj.content}}</div>
            </div>
            <div @click="phoneCall">
                <image style="width:120rpx;height:120rpx;padding-bottom:10rpx" :src="telIcon"></image>
                <div style="font-size:32rpx">热线电话</div>
                <div style="text-decoration: underline;" class="phone_num">{{teacherInfo.phone}}</div>
            </div>
        </div>
        <mMsg @success="success" @closeMsg="closeMsg" :show="show" />
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.public.js';
import mMsg from '@/components/m-msg';
export default {
    components: {
        mMsg
    },
    data() {
        return {
            logo: require('@/static/imgs/my/about_logo.png'),
            obj: null,
            telIcon: require('@/static/imgs/my/icon2.59784eaa.png'),
            msgIcon: require('@/static/imgs/my/icon1.3ed2f30d.png'),
            backGroundUrl: 'https://img.ruoshixunlianbao.com/bgMy_02.png',
            teacherInfo: null,
            flag: false,
            show: false
        };
    },
    created() {
        let data = {
            type: 9
        };
        api.getContent(data).then(
            res => {
                this.obj = res.retObj;
            }
        );
        api.teacher(data).then(
            res => {
                this.teacherInfo = res.retObj;
                this.flag = true;
            }
        );
    },
    methods: {
        phoneCall() {
            uni.makePhoneCall({
                phoneNumber: this.teacherInfo.phone // 仅为示例
            });
        },
        closeMsg() {
            this.show = false;
        },
        openMsg() {
            if (!uni.getStorageSync('token')) {
                this.$toast('您还未登陆,请先登陆');
                setTimeout(() => {
                    uni.switchTab({ url: '/pages/index/index' });
                }, 2000);
            } else {
                this.show = true;
            }
        },
        copy() {
            let that = this;
            uni.setClipboardData({
                data: this.teacherInfo.wx, // 要被复制的内容
                success: function(res) {
                    // 重点~做笔记
                    // 在success中加入uni.hideToast()可以解决
                    that.$toast('复制成功');
                    // 以下就可自定义操作了~
                },
                fail: function(err) {
                    that.$toast('复制失败');
                }
            });
        },
        success() {
            this.show = false;
        }
    }
};
</script>
<style lang="less">
page{
    padding-bottom: calc(env(safe-area-inset-bottom));
    div{
        font-size: 28rpx;
    }
}
.tutor{
    // text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-x: hidden;
    .top_back{
        width: 100%;
        height: 220rpx;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .top_img{
        width: 280rpx;
        height: 280rpx;
        background: #f5f5f5;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(0,-50%);
    }
    .inset_box{
        width: 100%;
        transform: translate(0,-110rpx);
        text-align: left;
        padding: 60rpx 60rpx;
        background: #ffffff;
        text-align: center;
        .inset_item5{
            width: 400rpx;
            height: 400rpx;
            background: #FFC3CE;
            display: flex;
            margin: 0 auto;
            align-items: center;
            justify-content: center;
            border-radius: 40rpx;
            margin-top: 40rpx;
            image{
                width: 380rpx;
                height: 380rpx;
                border-radius: 30rpx;
            }
        }
        .inset_item6{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 40rpx;
            :nth-child(1) {
                color: #333333;
            }
            :nth-child(2) {
                color: #ff2724;
                padding-left: 20rpx;
            }
        }
    }
    .phone_num{
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ff2724;
        border-radius: 100rpx;
        margin-top: 10rpx;
    }
    .tutor_footer{
        transform: translate(0,-100rpx);
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 40rpx;
        border-top: 10rpx solid #f5f5f5;
    }
}
.h-popup /deep/ .u-drawer{
            overflow: visible!important;
            .u-drawer-content{
                overflow: visible!important;
                display: flex;
                .u-mode-center-box{
                    background-color: #99999900!important;
                    overflow: visible!important;
                }
                .uni-scroll-view{
                    overflow: visible!important;
                }
            }
    }
</style>
