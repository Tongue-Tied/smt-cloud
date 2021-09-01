<template>
    <view class="wx_login">
        <label for="btn">
            <!-- <div>立即登录</div> -->
            <div>
                <button id="btn"
                    @tap="getUserProfile"
                    @getphonenumber="getPhoneNumber"
                    v-show="true"
                    open-type="getPhoneNumber">
                    立即登录
                </button>
            </div>
        </label>
    </view>
</template>
<script>
import apiLogin from '@/services/api.login.js';
export default {
    data() {
        return {
            userInfo: null
        };
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
                    that.userInfo = res.userInfo;
                    // that.weChatLogin(res.userInfo);
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
        },
        getPhoneNumber(e) {
            console.log(e);
            if (e) {
                this.weChatLogin(this.userInfo);
            }
        }
    }
};
</script>
<style lang="less">
.wx_login{
    div{
        font-size: 28rpx;
        button::after {
            border: none;
            border-radius:0!important;
            background-color: none!important;
            position:relative;
            display:unset!important;
            margin-left:0!important;
            margin-right:0!important;
            padding-left:0!important;
            padding-right:0!important;
            box-sizing:border-box;
            font-size:28rpx!important;
            text-align:center;
            text-decoration:none;
            line-height:unset!important;
            border-radius:0!important;
            -webkit-tap-highlight-color:transparent;
            overflow:hidden;
            color:unset!important;
            background-color:unset!important;
        }
        button{
            font-size: 28rpx!important;
            border-radius:0!important;
            background-color: none!important;
            position:relative;
            display:unset!important;
            margin-left:0!important;
            margin-right:0!important;
            padding-left:0!important;
            padding-right:0!important;
            box-sizing:border-box;
            font-size:28rpx!important;
            text-align:center;
            text-decoration:none;
            line-height:unset!important;
            border-radius:0!important;
            -webkit-tap-highlight-color:transparent;
            overflow:hidden;
            color:unset!important;
            background-color:unset!important;
        }
  }
}
</style>
