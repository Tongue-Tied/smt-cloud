<template>
    <div class="login-panel">
        <!-- <m-navbar></m-navbar> -->
        <div class="login_head">
            <div class="login_logo">
                <image :src="logoImage" alt="" />
            </div>
            <div class="login_title">弱视训练宝</div>
            <div class="login_sub">Amblyopia Training</div>
        </div>
        <u-tabs
            :list="list"
            active-color="rgb(255, 39, 66)"
            bar-width="180"
            :is-scroll="false"
            :current="current"
            @change="change"
        ></u-tabs>

        <div v-show="current === 0">
            <u-field
                v-model="form.phone"
                label-width="0"
                type="number"
                class="my_input"
                icon="account"
                @blur="authCaptcha"
                placeholder="请输入手机号/用户名"
            >
            </u-field>
            <div v-if="loginType == 1">
                <u-field
                    v-model="form.password"
                    class="my_input"
                    label-width="0"
                    type="password"
                    icon="lock"
                    placeholder="请输入密码"
                >
                </u-field>
                <!-- <u-field v-model="form.passwordImgValue"
                         label-width="0"
                         placeholder="请输入图形验证码"
                         v-if="passwordImg">
                    <div slot="right"
                         class="ll-img-code"
                         @click="getCode(false)">
                        <img :src="passwordImg"
                             alt=""
                             mode="heightFix"
                             style="height: 100%;">
                    </div>
                </u-field> -->
            </div>
            <view v-if="loginType == 2" class="">
                <u-field
                    v-model="form.codeImgValue"
                    label-width="0"
                    placeholder="请输入图形验证码"
                    v-if="codeImg"
                >
                    <div
                        slot="right"
                        class="ll-img-code"
                        @click="getCode(false)"
                    >
                        <img
                            :src="codeImg"
                            alt=""
                            mode="heightFix"
                            style="height: 100%;"
                        />
                    </div>
                </u-field>
                <view class="u-flex u-p-r-30">
                    <u-field
                        v-model="form.code"
                        label-width="0"
                        type="number"
                        class="u-flex-1"
                        placeholder="请输入验证码"
                    >
                    </u-field>
                    <div class="ll-code">
                        <u-button
                            type="primary"
                            size="medium"
                            @click="getCode"
                            >{{ tips }}</u-button
                        >
                    </div>
                </view>
            </view>
            <view v-if="loginType == 3" class="">
                <u-field
                    v-model="form.forgetImgValue"
                    label-width="0"
                    placeholder="请输入图形验证码"
                    v-if="forgetImg"
                >
                    <div
                        slot="right"
                        class="ll-img-code"
                        @click="getCode(false)"
                    >
                        <img
                            :src="forgetImg"
                            alt=""
                            mode="heightFix"
                            style="height: 100%;"
                        />
                    </div>
                </u-field>
                <view class="u-flex u-p-r-30">
                    <u-field
                        v-model="form.forgetCode"
                        label-width="0"
                        type="number"
                        class="u-flex-1"
                        placeholder="请输入验证码"
                    >
                    </u-field>
                    <div class="ll-code">
                        <u-button
                            type="primary"
                            size="medium"
                            @click="getCode"
                            >{{ tips }}</u-button
                        >
                    </div>
                </view>
                <u-field
                    v-model="form.newPassword"
                    label-width="0"
                    type="password"
                    placeholder="请输入新密码"
                >
                </u-field>
                <u-field
                    v-model="form.newPassword2"
                    label-width="0"
                    type="password"
                    placeholder="请再次输入新密码"
                >
                </u-field>
            </view>
        </div>
        <div v-show="current === 1">
            <!-- <div style="padding:0;background:black">
                <minput></minput>
            </div> -->
            <u-field
                v-model="form.password"
                class="my_input"
                label-width="0"
                type="number"
                icon="account"
                placeholder="请输入手机号"
            >
            </u-field>
            <u-field
                v-model="form.password"
                class="my_input"
                label-width="0"
                type="password"
                icon="lock"
                placeholder="请输入密码"
            >
            </u-field>
            <view>
                <view class="u-flex u-p-r-30">
                    <u-field
                        v-model="form.code"
                        label-width="0"
                        type="number"
                        class="u-flex-1"
                        placeholder="请输入验证码"
                    >
                    </u-field>
                    <div class="ll-code">
                        <u-button
                            type="primary"
                            size="medium"
                            @click="getCode"
                            >{{ tips }}</u-button
                        >
                    </div>
                </view>
            </view>
        </div>
        <!-- <div class="ll-btns">
            <div class="u-font-24 u-flex llb-cont">
                <template v-if="ptype != 1">
                    <div class="u-type-extra-primary"
                         @click="changeType(2)"
                         v-if="loginType == 1">
                        使用验证码登录
                    </div>
                    <div class="u-type-extra-primary"
                         @click="changeType(1)"
                         v-else>
                        使用密码登录
                    </div>
                </template>
                <div class="u-flex-1"></div>
                <div v-if="loginType == 1"
                     class="u-type-extra-primary"
                     @click="changeType(3)">忘记密码？</div>
                <div v-else
                     class="u-type-extra-primary"
                     @click="voiceClick">使用语音验证码</div>
            </div>
            <u-button type="primary"
                      size="large"
                      @click="loginClick"
                      :loading="loading"
                      v-if="loginType == 1 || loginType == 2">登录</u-button>
            <u-button type="primary"
                      size="large"
                      @click="savePassword"
                      :loading="loading"
                      v-else>确认修改</u-button>
        </div> -->
        <u-button
            type="primary"
            style="margin-top:20rpx;font-size:15px"
            size="large"
            @click="loginClick"
            :loading="loading"
            >登录</u-button
        >
        <!-- <u-button
            type="primary"
            style="margin-top:20rpx;font-size:15px"
            size="large"
            @click="test"
            :loading="loading"
            >test</u-button -->
    </div>
</template>
<script>
import apiLogin from '@/services/api.login.js';
// import minput from '@/components/m-input.vue';
/**
 * @query ptype 1 忘记密码
 */
export default {
    name: 'login',
    mixins: [],
    props: {},
    components: { },
    computed: {},
    data() {
        return {
            ptype: undefined,
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
            logoImage: require('@/static/imgs/login/logo.png')
        };
    },
    onLoad(options) {
        // this.url = options.url;
        // this.ptype = options.ptype;
        // if (this.ptype == 1) {
        //     this.changeType(3);
        // }
    },
    onShow() {
        if (uni.getStorageSync('token')) {
            return uni.switchTab({
                url: '/pages/index/index'
            });
        }
    },
    methods: {
        change(e) {
            this.current = e;
        },
        test() {
            // apiLogin.index().then(
            //     res => {
            //         console.log(res);
            //     },
            //     err => {}
            // );
        },
        async loginClick() {
            const msg = this.verify();
            if (msg) {
                this.$toast(msg);
                return;
            }
            this.go();
            // #if MP-WEIXIN
            // eslint-disable-next-line no-undef
            let weixin = wx;
            // let that = this;
            weixin.getUserInfo({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    // let userInfo = res.userInfo;
                    uni.setStorageSync('weChatUserInfo', res.userInfo);
                    weixin.cloud.callFunction({
                        name: 'getOpenId'
                    }).then(
                        res => {
                            uni.setStorageSync('openId', res.result.openid);
                            // let myData = {
                            //     openId: res.result.openid,
                            //     t: 2,
                            //     userName: userInfo.nickName
                            // };
                            // apiLogin.getBindWxOpenid(myData).then(
                            //     res => {
                            //         if (res.code === 2) {
                            //             that.$toast('账号已被绑定');
                            //             return;
                            //         } else {
                            //             that.go();
                            //         }
                            //     },
                            //     err => {
                            //         that.$toast('账号已被绑定');
                            //         return;
                            //     }
                            // );
                        }
                    );
                }
            });
            // #endif
            // #ifndef MP-WEIXIN
            // this.go();
            console.log(1111);
            // #endif
        },
        async go() {
            // 登录
            const data = {
                phone: this.form.phone,
                pwd: this.form.password
            };
            this.loading = true;
            try {
                var res = await apiLogin.auth(data);
            } catch (e) {
                console.log(e);
            }
            if (res.code === 1) {
                console.log(res.retObj.openid);
                this.$store.commit('updateToken', res.retObj);
                this.$store.dispatch('loadUser');
                uni.switchTab({
                    url: '/pages/index/index'
                });
            }
            this.loading = false;
            this.$toast(res.msg);
            return;
        },
        // async login() {
        //     this.$loading.open();
        //     try {
        //         await apiLogin.bindUser(this.checkRole.id);
        //     } catch (e) {
        //         console.error(e);
        //         this.$loading.close();
        //         this.$toast(e.message || '登录失败，请稍后再试');
        //         return;
        //     }
        //     this.roleVisible = false;
        //     await this.$store.dispatch('loadUser', true);
        //     this.$loading.close();
        //     if (this.url) {
        //         uni.redirectTo({
        //             url: decodeURIComponent(this.url)
        //         });
        //     } else {
        //         this.$store.commit('updateBackFlag', true);
        //         // #ifdef H5
        //         uni.reLaunch({ url: '/pages/index/index' });
        //         // #endif
        //         // #ifndef H5
        //         uni.navigateBack();
        //         // #endif
        //     }
        // },
        // checkRes(res, showMsg) {
        //     // 处理返回结果
        //     const data = res.data;
        //     if (data.type == 2 || data.type == 3) {
        //         if (this.loginType == 1) {
        //             this.passwordImg = data.value;
        //         } else if (this.loginType == 2) {
        //             this.codeImg = data.value;
        //         } else if (this.loginType == 3) {
        //             this.forgetImg = data.value;
        //         }
        //         if (showMsg) {
        //             if (data.type == 2) {
        //                 this.$toast('请输入图形验证码');
        //             } else if (data.type == 3) {
        //                 this.$toast('图形验证码错误');
        //             }
        //         } else {
        //             this.$loading.close();
        //         }
        //         this.form.authPhoneCaptchaDetailId =
        //             data.authPhoneCaptchaDetailId;
        //         return true;
        //     } else if (data.type == 4) {
        //         this.$loading.close();
        //         return true;
        //     }
        //     this.passwordImg = '';
        //     this.codeImg = '';
        //     this.forgetImg = '';
        //     this.form.authPhoneCaptchaDetailId = '';
        //     this.$loading.close();
        // },
        // roleClick(item) {
        //     this.checkRole = item;
        // },
        // codeChange(text) {
        //     this.tips = text;
        // },
        async getCode(showMsg = true) {
            if (!this.$u.test.mobile(this.form.phone)) {
                return this.$toast('请输入正确的手机号');
            }
            if (showMsg) {
                if (this.loginType == 2) {
                    if (this.codeImg && !this.form.codeImgValue) {
                        return this.$toast('请输入图形验证码');
                    }
                } else if (this.loginType == 3) {
                    if (this.forgetImg && !this.form.forgetImgValue) {
                        return this.$toast('请输入图形验证码');
                    }
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
        async savePassword() {
            const msg = this.verify();
            if (msg) {
                this.$toast(msg);
                return;
            }
            // 修改密码
            const data = {
                userName: this.form.phone,
                password: this.base64(this.form.newPassword),
                captcha: this.form.forgetCode
            };
            this.loading = true;
            try {
                var res = await apiLogin.updatePassword(data);
            } catch (e) {
                this.loading = false;
                if (e.message) {
                    this.$toast(e.message);
                }
                return;
            }
            if (this.checkRes(res, true)) {
                this.loading = false;
                return;
            }
            this.$toast('密码修改成功，请使用新密码登录');
            this.changeType(1);
            this.$store.commit('signout');
            this.form.forgetCode = '';
            this.form.newPassword = '';
            this.form.newPassword2 = '';
            this.form.password = '';
            this.loading = false;
        },
        voiceClick() {
            // 发送语音验证码
            if (!this.$u.test.mobile(this.form.phone)) {
                return this.$toast('请输入正确的手机号');
            }
            if (this.loginType == 2) {
                if (this.codeImg && !this.form.codeImgValue) {
                    return this.$toast('请输入图形验证码');
                }
            } else if (this.loginType == 3) {
                if (this.forgetImg && !this.form.forgetImgValue) {
                    return this.$toast('请输入图形验证码');
                }
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
            // const data = {
            //     phone: this.form.phone,
            //     purpose: 1,
            //     merchantId: -1,
            //     shapedCode: this.form.codeImgValue,
            //     yzType: 0,
            //     authPhoneCaptchaDetailId: this.form.authPhoneCaptchaDetailId
            // };
            // if (this.loginType == 3) {
            //     data.shapedCode = this.form.forgetImgValue;
            // }
            // return data;
        },
        verify() {
            if (!this.$u.test.mobile(this.form.phone)) {
                return '请输入正确的手机号';
            }
            if (this.loginType == 1) {
                if (!this.form.password) {
                    return '请输入密码';
                }
            } else if (this.loginType == 2) {
                if (!this.form.code) {
                    return '请输入验证码';
                }
            } else if (this.loginType == 3) {
                if (!this.form.forgetCode) {
                    return '请输入验证码';
                }
                if (!this.form.newPassword) {
                    return '请输入密码';
                }
                if (this.form.newPassword.length < 6) {
                    return '密码至少6位';
                }
                if (this.form.newPassword != this.form.newPassword2) {
                    return '新密码两次输入不一致';
                }
            }
        },
        changeType(type) {
            this.loginType = type;
            let title = '';
            switch (type) {
                case 1:
                    title = '登录';
                    this.authCaptcha();
                    break;
                case 2:
                    title = '验证码登录';
                    break;
                case 3:
                    title = '忘记密码';
                    break;
                default:
                    break;
            }
            uni.setNavigationBarTitle({ title });
        },
        call() {
            uni.makePhoneCall({
                phoneNumber: '400-006-2020'
            });
        },
        wxlogin() {
            // return new Promise((resolve, reject) => {
            //     uni.login({
            //         success: res => {
            //             resolve(res.code);
            //         },
            //         fail: err => {
            //             reject(err);
            //         }
            //     });
            // });
        },
        base64(str) {
            var base64EncodeChars =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(
                        ((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)
                    );
                    out += base64EncodeChars.charAt((c2 & 0xf) << 2);
                    out += '=';
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(
                    ((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)
                );
                out += base64EncodeChars.charAt(
                    ((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6)
                );
                out += base64EncodeChars.charAt(c3 & 0x3f);
            }
            return out;
        }
    }
};
</script>
<style lang="less">
page {
    background-color: white;
}
.login-panel {
    // padding-top: 300rpx;
    min-height: calc(100vh - var(--window-top));
    background-color: white;
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
