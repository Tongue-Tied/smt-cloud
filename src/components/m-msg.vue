<template>
    <mPopup class="m-msg" :show="show" @closePopup="closePopup" @updateUser="updateMsg" :title="'在线留言'">
        <div class="fk_box">
            <div class="input_box">
                <input v-model="name" placeholder="姓名" type="text">
            </div>
            <div class="input_box">
                <input v-model="phone" placeholder="电话" type="text">
            </div>
            <div class="input_box text_area" style="margin:0 auto">
                <u-field
                    label-width="0"
                    v-model="msg"
                    :field-style="{
                        width:'420rpx'
                    }"
                    placeholder="留言"
                    type="textarea"
                    :maxlength="50"
                    :clearable="false"
                    placeholder-style="font-size:26rpx"
                >
                </u-field>
                <!-- <textarea maxlength="50" v-model="msg" placeholder-style="color:#333333;" placeholder="留言"></textarea> -->
                <div style="padding-right:20rpx">{{msg.length || 0}}/50</div>
            </div>
        </div>
    </mPopup>
</template>
<script>
import api from '@/services/api.public.js';
import mPopup from '@/components/m-popup';
export default {
    name: 'm-msg',
    components: {
        mPopup
    },
    data() {
        return {
            name: '',
            phone: '',
            content: '',
            msg: ''
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    created() {
        if (this.show) {
            if (!uni.getStorageSync('token')) {
                this.$toast('您还未登陆，请先登陆');
                // this.show = false;
                this.$emit('success', true);
                return;
            }
        }
    },
    methods: {
        closePopup(e) {
            // console.log(e);
            this.show = false;
            // this.$emit('closeMsg', true);
        },
        updateMsg(e) {
            if (this.name === '') {
                this.$toast('姓名不能为空');
            } else if (this.phone === '') {
                this.$toast('手机号码不能为空');
            } else if (this.msg === '') {
                this.$toast('内容不能为空');
            }
            if (e) {
                let data = {
                    name: this.name,
                    phone: this.phone,
                    content: this.msg
                };
                api.addLeaveMsg(data).then(
                    res => {
                        if (res.code === 1) {
                            this.$emit('success', true);
                            this.name = '';
                            this.phone = '';
                            this.msg = '';
                        }
                        this.$toast(res.msg);
                    },
                    err => {
                        this.$toast(err.msg || '留言失败，请重试');
                    }
                );
            }
        }
    }
};
</script>
<style lang="less">
.m-msg{
    width: 100%;
    .fk_box{
        background: #ffffff;
        width: 600rpx;
        height: 600rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 30rpx;
        margin: 0 auto;
        .input_box{
            width: 80%;
            background: #f3f3f3;
            border-radius: 40rpx;
            height: 80rpx;
            margin: 0 auto;
            margin-bottom: 30rpx;
            input{
                padding-left: 20rpx;
                width: 100%;
                height: 100%;
            }
        }
        .text_area{
            height: 240rpx;
            position: relative;
            font-size: 28rpx!important;
            /deep/ u-field{
                width: 100%;
                height: 100%;
                .u-field{
                    width: 100%;
                    height: 100%;
                    .fild-page.data-v-578c626d{
                        width: 100%;
                        height: 100%;
                        .u-flex.data-v-568c626d{
                            width: 100%!important;
                            height: 100%;
                        }
                    }
                }
            }
            div{
                position: absolute;
                bottom: 20rpx;
                right: 0;
            }
        }
    }
}
    /deep/ .icon_box{
        top: 12% !important;
    }
</style>
