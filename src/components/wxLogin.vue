<template>
    <view class="wx_login">
        <label for="" @tap="getUserProfile">
            <div>立即登录</div>
        </label>
    </view>
</template>
<script>
import apiLogin from '@/services/api.login.js';
export default {
    data() {
        return {};
    },
    name: 'WeixinLogin',
    methods: {
        getUserProfile() {
            // eslint-disable-next-line no-undef
            let weixin = wx;
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
        },
        weChatLogin(userInfo) {
            // eslint-disable-next-line no-undef
            let weixin = wx;
            let that = this;
            that.$loading.open();
            weixin.login({
                success: function(res) {
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
                                                that.$forceUpdate();
                                                that.$emit('upDate', true);
                                                that.$loading.close();
                                                console.log(res);
                                            }
                                        );
                                    } else if (!res.retObj.phone) {
                                        that.$loading.close();
                                        console.log(111);
                                        // that.$store.dispatch('loadUser');
                                        that.$forceUpdate();
                                        uni.reLaunch({ url: '/pages/mine/views/update-phone?isBind=1' });
                                    } else {
                                        that.$loading.close();
                                        that.$store.dispatch('loadUser');
                                        that.$emit('upDate', true);
                                        that.$forceUpdate();
                                    }
                                }
                            }
                        );
                    }
                }
            });
        }
    }
};
</script>
<style lang="less">
.wx_login{
    div{
        font-size: 28rpx;
    }
}
</style>
