
<template>
    <div class="redeem_box">
        <div class="input_box">
            <input placeholder="请输入兑换码" v-model="code" type="text">
        </div>
        <div class="sure_btn" @click="redeem">立即兑换</div>
        <div class="img_box">
            兑换说明
        </div>
        <div class="tips" v-html="content">
        </div>
    </div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            code: '',
            content: ''
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
                        console.log(res);
                        if (res.code === 1) {
                            this.$toast('兑换成功');
                            setTimeout(() => {
                                uni.navigateBack({ delta: 1 });
                            }, 2000);
                        } else {
                            this.$toast('兑换失败');
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
    }
    .tips{
        color: #333333;
        margin-top: 20rpx;
    }
}
</style>
