<template>
    <div class="register-panel">
        <!-- <m-navbar></m-navbar> -->
        <div class="login_head">
            <div class="login_logo">
                <image :src="logoImage" alt="" />
            </div>
            <div class="login_title">弱视训练宝</div>
            <div class="login_sub">Amblyopia Training</div>
        </div>
        <div >
            <div class="code_input">
                <div class="type_icon">
                    <u-icon name="phone"></u-icon>
                    <div class="type_box" @click="selectShow = !selectShow">
                        <span class="type_num">+{{myValue}}</span>
                        <u-icon name="arrow-down-fill" color="#DDDFE0" size="16"></u-icon>
                    </div>
                    <div class="fixed_box" v-if="selectShow">
                        <div class="s_item" @click="cellClick(index,item)"
                                            v-for="(item, index) in typeList"
                                            :key="index">
                            <span :style="!item.checked || 'color:#ff2724'">{{item.name}}</span>
                            <u-icon v-if="item.checked" color="#ff2724" size="30" name="checkbox-mark"></u-icon>
                        </div>
                    </div>
                </div>
                <u-input placeholder-style="color:grey" v-model="form.phone" type="number" placeholder="请输入手机号"  />
            </div>
            <div>
                <div style="position:relative">
                    <u-field
                        v-model="form.code"
                        class="my_input u-flex-1"
                        label-width="0"
                        type="number"
                        :border-bottom="false"
                        icon="lock"
                        :clearable="false"
                        placeholder="请输入验证码"
                    ></u-field>
                    <div class="code_box">
                        <u-button
                        type="primary"
                        size="medium"
                        @click="getCode"
                        >{{ tips }}</u-button
                    >
                    </div>
                </div>
            </div>
            <u-verification-code
                :seconds="seconds"
                ref="uCode"
                @change="codeChange">
            </u-verification-code>
            <div>
                <u-field
                    v-model="form.password"
                    class="my_input"
                    label-width="0"
                    type="password"
                    icon="lock"
                    placeholder="请输入密码(6位以上)"
                >
                </u-field>
            </div>
        </div>
        <div class="register_btn">
            <u-button
            type="primary"
            style="margin-top:20rpx;font-size:15px"
            size="large"
            @click="register"
            :loading="loading"
            >注册</u-button
        >
        </div>
    </div>
</template>
<script>
import apiLogin from '@/services/api.login.js';
import apiPublic from '@/services/api.public.js';
export default {
    data() {
        return {
            loading: false,
            loginType: 1,
            tips: '获取验证码',
            seconds: 60,
            passwordImg: '',
            codeImg: '',
            forgetImg: '',
            roleVisible: false,
            form: {
                phone: '',
                password: '',
                code: ''
            },
            list: [
                {
                    name: '账号密码登录'
                },
                {
                    name: '短信快捷登录'
                }
            ],
            current: 0,
            roles: [],
            checkRole: undefined,
            logoImage: require('@/static/imgs/login/logo.png'),
            typeList: [
                {
                    value: 86,
                    name: '中国大陆+86',
                    checked: true
                },
                {
                    value: 852,
                    name: '中国香港+852',
                    checked: false
                },
                {
                    value: 853,
                    name: '中国澳门+853',
                    checked: false
                },
                {
                    value: 886,
                    name: '中国台湾+886',
                    checked: false
                }
            ],
            selectShow: false,
            myValue: 86
        };
    },
    onLoad(options) {
    },
    created() {
        // this.weChatLogin();
    },
    onShow() {
        if (uni.getStorageSync('token')) {
            return uni.switchTab({
                url: '/pages/index/index'
            });
        }
    },
    methods: {
        async getCode() {
            if (this.form.phone === '') {
                return this.$toast('请输入正确的手机号');
            }
            if (this.$refs.uCode.canGetCode) {
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码'
                });
                let data = {
                    phone: this.form.phone,
                    type: this.myValue
                };
                apiPublic.selectUserByPhone({ phone: data.phone }).then(
                    res => {
                        if (res.code === 1 && res.retObj.no_use == 1) {
                            apiLogin.sendCode(data, true).then(
                                res => {
                                    if (res.code === 1) {
                                        uni.hideLoading();
                                        // 通知验证码组件内部开始倒计时
                                        this.$refs.uCode.start();
                                    } else {
                                        uni.hideLoading();
                                        this.$toast('获取验证码失败');
                                        this.$refs.uCode.reset();
                                    }
                                    console.log(res);
                                }
                            );
                        } else {
                            uni.hideLoading();
                            this.$refs.uCode.reset();
                            this.$toast('该手机号已被注册');
                        }
                    },
                    err => {
                        uni.hideLoading();
                        this.$refs.uCode.reset();
                        this.$toast('网络连接错误');
                    }
                );
            } else {
                this.$u.toast('倒计时结束后再发送');
            }
        },
        register() {
            if (!this.form.phone) {
                return this.$toast('请输入手机号');
            }
            if (!this.form.code) {
                return this.$toast('请输入验证码');
            }
            if (!this.form.password || this.form.password.length < 6) {
                return this.$toast('请输入正确的密码');
            }
            let data = {
                code: this.form.code,
                phone: this.form.phone,
                pwd: this.form.password,
                type: this.myValue
            };
            apiLogin.register(data).then(
                res => {
                    if (res.code === 1) {
                        this.$toast('注册成功');
                        setTimeout(() => {
                            uni.navigateBack({ delta: 1 });
                        }, 2000);
                    } else {
                        this.$toast('注册失败');
                    }
                    console.log(res);
                },
                err => {
                    this.$toast('注册失败');
                }
            );
        },
        codeChange(text) {
            this.tips = text;
        }
    }
};
</script>
<style lang="less">
page {
    background-color: white;
}
.register-panel {
    // padding-top: 300rpx;
    min-height: calc(100vh - var(--window-top));
    background-color: white;
    .register_btn button{
        width: 86%;
        margin: 0 auto;
        height: 110rpx;
        border-radius: 100rpx;
    }
    .login_head {
        text-align: center;
        padding-bottom: 100rpx;
        .login_logo {
            width: 130rpx;
            height: 130rpx;
            margin: 0 auto;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .login_title {
            font-size: 15px;
            font-weight: bold;
            font-family: Source Han Sans CN;
        }
        .login_sub {
            font-size: 12px;
            color: #333333;
        }
    }
    .wechat_icon{
        padding-top: 40rpx;
        display: flex;
        justify-content: center;
        width: 100%;
        text-align: center;
        color: #333333;
        // font-size: 24rpx;
    }
    .my_input {
        width: 570rpx;
        margin: 0 auto;
        border-radius: 60rpx;
        // padding: 10rpx;
        margin-top: 10rpx;
        background: #f5f5f5;
        margin-top: 20rpx;
        .u-field{
            width: 610rpx;
            margin: 20rpx auto;
            background: #f5f5f5;
            border-radius: 60rpx;
            position: unset;
        }
    }
    .u-border,
    .u-border-bottom,
    .u-border-left,
    .u-border-right,
    .u-border-top,
    .u-border-top-bottom {
        position: unset;
    }
    .login-logo {
        width: 280rpx;
        margin: 0 auto;
        .ll-img {
            width: 100%;
        }
    }
    input {
        font-size: 28rpx;
    }
    .code_box{
        position: absolute;
        right: 120rpx;
        top: 50%;
        transform: translate(0,-50%);
        z-index: 1000;
        button{
            width: auto !important;
            height: 56rpx !important;
            padding: 0 20rpx;
        }
    }
    .forget_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 570rpx;
        margin: 0 auto;
        padding-top: 20rpx;
        .forget{
            font-size: 24rpx;
        }
        .register{
            span{
                font-size: 24rpx;
            }
            :nth-child(2){
                color: #ff2724;
                border-bottom:2rpx solid #ff2724;
                padding-bottom: 2rpx;
            }
        }
    }
    .code_input{
        position: relative;
        width: 610rpx;
        margin: 0 auto;
        border-radius: 60rpx;
        // padding: 10rpx;
        margin-top: 10rpx;
        background: #f5f5f5;
        margin-top: 20rpx;
        font-size: 28rpx;
        padding: 20rpx 28rpx;
        text-align: left;
        position: relative;
        color: #5c636a;
        display: flex;
        align-items: center;
        .type_icon{
            // position: absolute;
            // left: 30rpx;
            // top: 50%;
            // transform: translate(0,-50%);
            height: 30rpx;
            display: flex;
            align-items: center;
            position: relative;
            .type_box{
                padding: 0 10rpx;
            }
            .fixed_box{
                position: absolute;
                width: 300rpx;
                top: 50rpx;
                left: 30rpx;
                background: #ffffff;
                transition-duration: 0.2s;
                box-shadow: 0 0 70rpx 5rpx #eeeeee;
                z-index: 1000000;
                padding: 0 30rpx;
                .s_item{
                    display: flex;
                    height: 100rpx;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 2rpx solid #eeeeee;
                }
            }
        }
    }
}
</style>
