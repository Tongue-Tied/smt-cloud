
<template>
    <div class="redeem_box">
        <div class="input_box">
            <input placeholder="请输入兑换码" v-model="code" type="text">
        </div>
        <div class="sure_btn" @click="redeem">立即兑换</div>
        <div class="img_box">
            <image :src="left" mode="widthFix"></image>
            <div>兑换说明</div>
            <image :src="right" mode="widthFix"></image>
        </div>
        <div class="tips" v-html="content">
        </div>
        <mPopup
            :show="show"
            :bgUrl="img"
            :headerBg="false"
            :btnText="'知道了'"
            @updateUser="show = false"
            @closePopup="show = false"
        >
        <div class="container">
            <div style="font-size:34rpx;color:#ff2724;padding-top:30rpx">{{success ? '兑换成功' : '兑换失败'}}</div>
            <div style="font-size:26rpx;color:#999999;padding:20rpx" v-if="success">课程已自动添加到您的账号</div>
            <div style="font-size:26rpx;color:#999999" v-else>不是有效的兑换码</div>
        </div>
        </mPopup>
    </div>
</template>
<script>
import api from '@/services/api.public.js';
import mPopup from '@/components/m-popup';
export default {
    components: {
        mPopup
    },
    data() {
        return {
            code: '',
            content: '',
            show: false,
            img: require('@/static/imgs/my/tan_03.png'),
            success: true,
            left: require('@/static/imgs/my/zhuangshi.png'),
            right: require('@/static/imgs/my/zhuangshi1.png')
        };
    },
    created() {
        let data = {
            type: 27
        };
        api.getContent(data).then(
            res => {
                this.content = res.retObj.content;
            }
        );
    },
    methods: {
        redeem() {
            if (this.code) {
                let data = {
                    code: this.code
                };
                api.exchangeCode(data).then(
                    res => {
                        if (res.code === 1) {
                            this.success = true;
                            this.show = true;
                            this.img = require('@/static/imgs/my/tan_03.png');
                        } else {
                            this.success = false;
                            this.show = true;
                            this.img = require('@/static/imgs/my/tan_05.png');
                        }
                    },
                    err => {
                        this.$toast('兑换失败');
                    }
                );
            }
            console.log(123);
        }
    }
};
</script>

<style lang="less">
page{
    background: #ffffff;
}
.redeem_box{
    padding: 60rpx;
    .container{
        width: 600rpx;
        text-align: center;
        background: #ffffff;
    }
    .input_box{
        width: 100%;
        height: 80rpx;
        border-radius: 50rpx;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        input{
            border-radius: 50rpx;
            width: 100%;
            padding-left: 20rpx;
            font-size: 28rpx;
        }
    }
    .sure_btn{
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        background: #ff2724;
        border-radius: 50rpx;
        margin-top: 40rpx;
    }
    .img_box{
        color: #ff2724;
        width: 100%;
        font-weight: 600;
        font-size: 30rpx;
        margin-top: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        image{
            width: 20rpx;
        }
    }
    .tips{
        color: #333333;
        margin-top: 20rpx;
        font-size: 24rpx;
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
}
</style>
