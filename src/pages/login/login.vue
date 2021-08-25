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
                placeholder="请输入手机号/用户名"
            >
            </u-field>
            <div>
                <u-field
                    v-model="form.password"
                    class="my_input"
                    label-width="0"
                    type="password"
                    icon="lock"
                    placeholder="请输入密码"
                >
                </u-field>
            </div>
        </div>
        <div v-show="current === 1">
            <!-- <div style="padding:0;background:black">
                <minput></minput>
            </div> -->
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
        </div>
        <u-button
            type="primary"
            style="margin-top:20rpx;font-size:15px"
            size="large"
            @click="loginClick"
            :loading="loading"
            >登录</u-button
        >
        <div class="forget_box">
            <div class="forget" @click="toForget">忘记密码</div>
            <div class="register">
                <span>我是新用户，</span><span @click="toRegister">去注册</span>
            </div>
        </div>
        <div class="wechat_icon">
            <label for="" @tap="getUserProfile">
                <u-icon color="#51AA38" name="weixin-circle-fill" size="50"></u-icon>
                <div>微信授权登录</div>
            </label>
        </div>
    </div>
</template>
<script>
import apiLogin from '@/services/api.login.js';
export default {
    name: 'login',
    mixins: [],
    props: {},
    components: { },
    computed: {},
    data() {
        return {
            url: undefined,
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
        change(e) {
            this.current = e;
        },
        toForget() {
            uni.navigateTo({ url: '/pages/mine/views/reset-password?fromLogin=1' });
        },
        toRegister() {
            uni.navigateTo({ url: '/pages/login/views/register' });
        },
        cellClick(index, item) {
            console.log(index);
            console.log(item);
            for (let i = 0; i < this.typeList.length; i++) {
                this.typeList[i].checked = false;
            }
            this.typeList[index].checked = !this.typeList[index].checked;
            this.myValue = item.value;
            this.selectShow = false;
        },
        async loginClick() {
            const msg = this.verify();
            if (msg) {
                this.$toast(msg);
                return;
            }
            this.go();
        },
        weChatLogin(userInfo) {
            // eslint-disable-next-line no-undef
            let weixin = wx;
            let that = this;
            that.$loading.close();
            weixin.login({
                success: function(res) {
                    // var that = this;
                    // var header = {
                    //     'content-type': 'application/x-www-form-urlencoded'
                    // };
                    if (res.code) {
                        console.log(res.code);
                        apiLogin.wxLogin({ code: res.code }).then(
                            res => {
                                if (res.code === 1) {
                                    that.$store.commit('updateToken', res.retObj);
                                    if (!res.retObj.userNick && !res.retObj.headImg) {
                                        let data = {
                                            headImg: userInfo.avatarUrl,
                                            userNick: userInfo.nickName
                                        };
                                        apiLogin.updateUserInfo(data).then(
                                            res => {
                                                that.$store.dispatch('loadUser');
                                                uni.switchTab({
                                                    url: '/pages/index/index'
                                                });
                                                that.$loading.close();
                                                console.log(res);
                                            }
                                        );
                                    } else if (!res.retObj.phone) {
                                        that.$loading.close();
                                        console.log(111);
                                        // that.$store.dispatch('loadUser');
                                        uni.reLaunch({ url: '/pages/mine/views/update-phone' });
                                    } else {
                                        that.$loading.close();
                                        that.$store.dispatch('loadUser');
                                        uni.switchTab({
                                            url: '/pages/index/index'
                                        });
                                    }
                                }
                                // let data = {
                                //     t: 2,
                                //     userName: userInfo.nickName,
                                //     openId: res.retObj.xcxOpenid
                                // };
                                // apiLogin.getBindWxOpenid(data).then(
                                //     res => {
                                //         console.log(res);
                                //     }
                                // );
                                console.log(res);
                            }
                        );
                        // weixin.request({ // getOpenid
                        //     url: 'https://api.weixin.qq.com/sns/jscode2session',
                        //     data: {
                        //         appid: 'wx6db2e40f820b9c1d', // AppID
                        //         secret: '9155061a9b16cd4d4ff6564c15f36fad', // secret密钥
                        //         grant_type: 'authorization_code',
                        //         js_code: res.code
                        //     },
                        //     method: 'GET',
                        //     header: header,
                        //     success: function(res) {
                        //         var openid = res.data.openid;// 登录之后返回的openid
                        //         // this.setData({
                        //         //   openid: res.data.openid
                        //         // });
                        //         that.$loading.open();
                        //         let data = {
                        //             type: 1,
                        //             t: 2,
                        //             openid: openid
                        //         };
                        //         apiLogin.threeLogin(data).then(
                        //             res => {
                        //                 if (res.code === 1) {
                        //                     that.$store.commit('updateToken', res.retObj);
                        //                     that.$store.dispatch('loadUser');
                        //                     uni.switchTab({
                        //                         url: '/pages/index/index'
                        //                     });
                        //                     that.$loading.close();
                        //                 }
                        //             },
                        //             err => {
                        //                 that.$toast(err.msg);
                        //                 that.$loading.close();
                        //             }
                        //         );
                        //         // console.log(openid + '我的openid');
                        //         weixin.setStorageSync('openid', openid);// 储存openid
                        //     },
                        //     fail: function(res) {
                        //         console.info('获取用户openid失败');
                        //         // console.log(error);
                        //     }
                        // });
                    }
                }
            });
        },
        async go() {
            // 登录
            const data = {
                phone: this.form.phone
            };
            if (this.current === 0) {
                data.pwd = this.form.password;
            } else {
                data.code = this.form.code;
            }
            this.loading = true;
            try {
                var res = await apiLogin.auth(data);
            } catch (e) {
                console.log(e);
            }
            if (res.code === 1 && res.msg !== '未设置密码') {
                this.$store.commit('updateToken', res.retObj);
                this.$store.dispatch('loadUser');
                uni.switchTab({
                    url: '/pages/index/index'
                });
            } else if (res.code === 1 && res.msg === '未设置密码') {
                uni.navigateTo({ url: '/pages/mine/views/set-password' });
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
                this.$u.toast('倒计时结束后再发送');
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
        getUserProfile() {
            // #if MP-WEIXIN
        // uni.navigateTo({ url: '/pages/demo/demo' });
            // eslint-disable-next-line no-undef
            let weixin = wx;
            console.log(weixin);
            let that = this;
            weixin.getUserProfile({
                desc: '获取你的昵称、头像、地区及性别',
                success: function(res) {
                    console.log(res);
                    // let userInfo = res.userInfo;
                    that.weChatLogin(res.userInfo);
                },
                fail: function(res) {
                    that.$toast('微信授权失败');
                }
            });
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-undef
        // let that = this;
        // weixin.getUserInfo({
        //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        //     success: (res) => {
        //         console.log(res);
        //         // let userInfo = res.userInfo;
        //         // uni.setStorageSync('weChatUserInfo', res.userInfo);
        //         // weixin.cloud.callFunction({
        //         //     name: 'getOpenId'
        //         // }).then(
        //         //     res => {
        //         //         // uni.setStorageSync('openId', res.result.openid);
        //         //         // let myData = {
        //         //         //     openId: res.result.openid,
        //         //         //     t: 2,
        //         //         //     userName: userInfo.nickName
        //         //         // };
        //         //         // apiLogin.getBindWxOpenid(myData).then(
        //         //         //     res => {
        //         //         //         if (res.code === 2) {
        //         //         //             that.$toast('账号已被绑定');
        //         //         //             return;
        //         //         //         } else {
        //         //         //             that.go();
        //         //         //         }
        //         //         //     },
        //         //         //     err => {
        //         //         //         that.$toast('账号已被绑定');
        //         //         //         return;
        //         //         //     }
        //         //         // );
        //         //     }
        //         // );
        //     }
        // });
        // eslint-disable-next-line no-undef
        // console.log(wx.cloud.CloudID());
        // eslint-disable-next-line no-undef
        // wx.cloud.callFunction({
        //     name: 'message'
        // }).then(console.log);
        // #endif
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
        right: 240rpx;
        top: 50%;
        transform: translate(0,-50%);
        width: 60rpx;
        z-index: 1000;
        button{
            width: auto;
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
