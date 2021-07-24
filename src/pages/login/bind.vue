<template>
    <div class="login-panel">
        <m-navbar></m-navbar>
        <div class="login-logo">
            <img class="ll-img"
                 mode="widthFix"
                 :src="'logo.png' | oss"
                 alt="">
        </div>
        <div>
            <u-field v-model="form.phone"
                     label-width="0"
                     type="number"
                     placeholder="请输入手机号">
            </u-field>
            <view class="">
                <u-field v-model="form.codeImgValue"
                         label-width="0"
                         placeholder="请输入图形验证码"
                         v-if="codeImg">
                    <div slot="right"
                         class="ll-img-code"
                         @click="getCode(false)">
                        <img :src="codeImg"
                             alt=""
                             mode="heightFix"
                             style="height: 100%;">
                    </div>
                </u-field>
                <view class="u-flex u-p-r-30">
                    <u-field v-model="form.code"
                             label-width="0"
                             type="number"
                             class="u-flex-1"
                             placeholder="请输入验证码">
                    </u-field>
                    <div class="ll-code">
                        <u-button type="primary"
                                  size="medium"
                                  @click="getCode">{{tips}}</u-button>
                    </div>
                </view>
            </view>
        </div>
        <div class="ll-btns">
            <div class="u-font-24 u-flex llb-cont">
                <div class="u-type-extra-primary"
                     @click="voiceClick">使用语音验证码</div>
            </div>
            <u-button type="primary"
                      size="large"
                      @click="loginClick"
                      :loading="loading">绑定</u-button>
        </div>
        <div class="ll-footer">
            <u-divider color="#9aa5b180">让美业生意更简单</u-divider>
            <div class="u-m-t-25 u-tips-color u-m-b-30">客服热线：<span @click="call">400-006-2020</span></div>
            <view class="ll-bottom"></view>
        </div>
        <u-verification-code :seconds="seconds"
                             ref="uCode"
                             @change="codeChange"></u-verification-code>
    </div>
</template>
<script>
import apiLogin from '@/services/api.login.js';
export default {
    name: 'login',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            url: undefined,
            loading: false,
            loginType: 1,
            tips: '',
            seconds: 60,
            passwordImg: '',
            codeImg: '',
            forgetImg: '',
            roleVisible: false,
            form: {
                phone: '',
                openid: undefined,
                password: '',
                passwordImgValue: '',
                codeImgValue: '',
                forgetImgValue: '',
                code: '',
                forgetCode: '',
                newPassword: '',
                newPassword2: '',
                authPhoneCaptchaDetailId: undefined
            },
            roles: [],
            checkRole: undefined
        };
    },
    onLoad(options) {
        this.form.openid = options.openid;
    },
    methods: {
        async loginClick() {
            const msg = this.verify();
            if (msg) {
                this.$toast(msg);
                return;
            }
            // 登录
            const data = {
                openid: this.form.openid,
                mobile: this.form.phone,
                captcha: this.form.code
            };
            this.loading = true;
            apiLogin.bind(data).then(
                res => {
                    this.loading = false;
                    uni.showModal({
                        title: '绑定成功',
                        showCancel: false,
                        success: res => {
                            if (res.confirm) {
                                try {
                                    /* eslint-disable */
                                    WeixinJSBridge.call('closeWindow');
                                    wx.closeWindow();
                                    /* eslint-enable */
                                } catch (e) {}
                            }
                        }
                    });
                },
                err => {
                    this.loading = false;
                    this.$toast(err.message || '绑定失败，请稍后再试');
                }
            );
        },
        async login() {
            this.$loading.open();
            try {
                await apiLogin.bindUser(this.checkRole.id);
            } catch (e) {
                console.error(e);
                this.$toast(e.message || '登录失败，请稍后再试');
                this.$loading.close();
                return;
            }
            this.roleVisible = false;
            this.$store.dispatch('loadUser');
            this.$loading.close();
            if (this.url) {
                uni.reLaunch({
                    url: decodeURIComponent(this.url)
                });
            } else {
                // #ifdef H5
                uni.reLaunch({ url: '/pages/index/index' });
                // #endif
                // #ifndef H5
                uni.navigateBack();
                // #endif
            }
        },
        checkRes(res, showMsg) {
            // 处理返回结果
            const data = res.data;
            if (data.type == 2 || data.type == 3) {
                this.codeImg = data.value;
                if (showMsg) {
                    if (data.type == 2) {
                        this.$toast('请输入图形验证码');
                    } else if (data.type == 3) {
                        this.$toast('图形验证码错误');
                    }
                } else {
                    this.$loading.close();
                }
                this.form.authPhoneCaptchaDetailId = data.authPhoneCaptchaDetailId;
                return true;
            } else if (data.type == 4) {
                this.$loading.close();
                return true;
            }
            this.passwordImg = '';
            this.codeImg = '';
            this.forgetImg = '';
            this.form.authPhoneCaptchaDetailId = '';
            this.$loading.close();
        },
        codeChange(text) {
            this.tips = text;
        },
        async getCode(showMsg = true) {
            if (!this.$u.test.mobile(this.form.phone)) {
                return this.$toast('请输入正确的手机号');
            }
            if (showMsg) {
                if (this.codeImg && !this.form.codeImgValue) {
                    return this.$toast('请输入图形验证码');
                }
            }
            if (this.$refs.uCode.canGetCode) {
                this.$loading.open();
                // 获取验证码
                const data = this.dataFormat();
                try {
                    var res = await apiLogin.getCode(data);
                } catch (e) {
                    if (e.message) {
                        this.$toast(e.message);
                    }
                    return;
                }
                if (this.checkRes(res, showMsg)) {
                    return;
                }
                this.$refs.uCode.start();
            }
        },
        voiceClick() {
            // 发送语音验证码
            if (!this.$u.test.mobile(this.form.phone)) {
                return this.$toast('请输入正确的手机号');
            }
            if (this.codeImg && !this.form.codeImgValue) {
                return this.$toast('请输入图形验证码');
            }
            uni.showModal({
                title: '确认发送语音验证码',
                success: async () => {
                    const data = this.dataFormat();
                    data.yzType = 1;
                    try {
                        var res = await apiLogin.getCode(data);
                    } catch (e) {
                        if (e.message) {
                            this.$toast(e.message);
                        }
                        return;
                    }
                    if (this.checkRes(res, true)) {
                        return;
                    }
                    this.$refs.uCode.start();
                }
            });
        },
        dataFormat() {
            const data = {
                phone: this.form.phone,
                purpose: 3,
                merchantId: -1,
                shapedCode: this.form.codeImgValue,
                yzType: 0,
                authPhoneCaptchaDetailId: this.form.authPhoneCaptchaDetailId
            };
            return data;
        },
        verify() {
            if (!this.$u.test.mobile(this.form.phone)) {
                return '请输入正确的手机号';
            }
            if (!this.form.code) {
                return '请输入验证码';
            }
        },
        call() {
            uni.makePhoneCall({
                phoneNumber: '400-006-2020'
            });
        }
    }
};
</script>
<style lang="less">
page {
    background-color: white;
}
.login-panel {
    // #ifdef H5
    min-height: calc(100vh - var(--window-top));
    background-color: white;
    // #endif
    .login-logo {
        width: 280rpx;
        margin: 0 auto;
        padding-top: 60rpx;
        padding-bottom: 40rpx;
        .ll-img {
            width: 100%;
        }
    }
    .ll-img-code {
        width: 160rpx;
        height: 50rpx;
    }
    .ll-code {
        width: 25%;
        .u-btn {
            width: 100%;
        }
    }
    .ll-btns {
        padding: 40rpx 30rpx 0 30rpx;
    }
    .llb-cont {
        margin-bottom: 70rpx;
    }
    .ll-btn .u-btn {
        height: 100rpx;
        border-radius: 20rpx;
    }
    .ll-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
    .ll-bottom {
        margin-bottom: env(safe-area-inset-bottom);
    }
    input {
        font-size: 28rpx;
    }
}
</style>
