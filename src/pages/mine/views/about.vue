<template>
    <div class="about">
        <div class="top_back" style="background-image:url(https://img.ruoshixunlianbao.com/bgMy_02.png)"></div>
        <div class="top_img">
            <image style="width:240rpx;height:240rpx" :src="logo"></image>
        </div>
        <div class="inset_box" v-html="obj.content"></div>
        <div>
            <image style="width:120rpx;height:120rpx;padding-bottom:30rpx" :src="telIcon"></image>
            <div>全国客户服务热线</div>
            <div @click="phoneCall" class="phone_num">{{obj.phone}}</div>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            logo: require('@/static/imgs/my/about_logo.png'),
            obj: '',
            telIcon: require('@/static/imgs/my/icon2.59784eaa.png')
        };
    },
    created() {
        let data = {
            type: 2
        };
        api.getContent(data).then(
            res => {
                this.obj = res.retObj;
                // eslint-disable-next-line no-useless-escape
                this.obj.content = this.obj.content.replace(/\<img/gi, '<img class="rich-img"');
                console.log(res);
            }
        );
    },
    methods: {
        phoneCall() {
            uni.makePhoneCall({
                phoneNumber: this.obj.phone // 仅为示例
            });
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
}
.about{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top_back{
        width: 100%;
        height: 220rpx;
        background: #ffffff;
        background-size: cover;
        background-position: center;
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
        transform: translate(0,-110rpx);
        border-radius: 40rpx;
        text-align: left;
        width: 90%;
        padding: 60rpx 60rpx;
        background: #ffffff;
        rich-text .rich-img {
            width: 100% !important;
            height: auto ;
            border-radius: 30rpx;
        }
    }
    .phone_num{
        width: 300rpx;
        height: 80rpx;
        border: 2rpx solid #ff2724;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ff2724;
        border-radius: 100rpx;
        margin-top: 30rpx;
    }
}
</style>
