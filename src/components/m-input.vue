<template>
    <div class="m-input">
        <div id="select">
            <span>+86</span>
            <img :src="require('@/static/imgs/login/xiala.png')" alt="">
        </div>
        <div class="m-input-container">
            <u-field
                v-model="phone"
                label-width="0"
                type="number"
                @blur="authCaptcha"
                placeholder="请输入手机号"
            ></u-field>
        </div>
        <u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
    </div>
</template>

<script>
export default {
    name: 'minput',
    data() {
        return {
            phone: '',
            value: '',
            type: 'select',
            show: true,
            border: true,
            actionSheetList: [
                {
                    text: '男'
                },
                {
                    text: '女'
                },
                {
                    text: '保密'
                }
            ]
        };
    }
};
</script>

<style lang="less">
.m-input {
    position: relative;
    #select {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 15rpx;
        }
        // select{
        //     border: none;
        //     appearance: none;
        //     -moz-appearance: none;
        //     -webkit-appearance: none;
        //     background: url('../static/imgs/login/xiala.png') no-repeat scroll -386rpx center transparent;
        //     overflow: visible;
        // }
    }
    .m-input-container{
        padding-left: 30rpx;
    }
}
</style>
