<template>
    <div class="update-phone" v-if="show">
        <div class="bind_phone_box">
            您可以通过绑定的手机重置密码
        </div>
        <div class="code_box" v-if="!pwdShow">
            <div class="code_left">
                <u-icon size="30" name="phone"></u-icon>
                <div class="select">
                    <div :style="selectShow ? 'color:#ff2724' : 'color:#333333'" class="icon_box" @click="selectShow = !selectShow">
                        <span>+</span><span>{{myValue}}</span>
                        <u-icon size="20" v-if="!selectShow" name="arrow-down"></u-icon>
                        <u-icon size="20" v-else name="arrow-up"></u-icon>
                    </div>
                    <div class="fixed_box" v-if="selectShow">
                        <div class="s_item" @click="cellClick(index,item)" v-for="(item, index) in list" :key="index">
                            <span :style="!item.checked || 'color:#ff2724'">{{item.name}}</span>
                            <u-icon v-if="item.checked" color="#ff2724" size="30" name="checkbox-mark"></u-icon>
                        </div>
                    </div>
                </div>
            </div>
            <u-field :border-bottom="false" v-model="phone" label-width="0" placeholder="请输入手机号">
                <!-- <u-button
                    size="mini"
                    slot="right"
                    type="success"
                    @click="getCode"
                    >{{ codeText }}</u-button
                > -->
            </u-field>
        </div>
        <div class="code_box" v-if="!pwdShow">
            <div class="code_left">
                <u-icon size="30" name="email"></u-icon>
                <div class="select">
                    <div class="icon_box">
                    </div>
                </div>
            </div>
            <u-field :border-bottom="false" v-model="code" label-width="0" placeholder="请输入验证码">
                <u-button
                    size="mini"
                    slot="right"
                    type="success"
                    hover-class="none"
                    @click="getCode"
                    >{{ codeText }}</u-button
                >
            </u-field>
            <u-verification-code
                ref="uCode"
                @change="codeChange"
            ></u-verification-code>
        </div>
        <div class="code_box" v-if="pwdShow">
            <div class="code_left">
                <u-icon size="40" name="lock"></u-icon>
                <div class="select">
                    <div class="icon_box">
                    </div>
                </div>
            </div>
            <u-field :border-bottom="false" type="password" v-model="password" label-width="0" placeholder="请输入新密码(6位以上)">
            </u-field>
            <u-verification-code
                ref="uCode"
                @change="codeChange"
            ></u-verification-code>
        </div>
        <div class="sure" @click="updatePwd">{{pwdShow ? '确定' : '立即更换'}}</div>
    </div>
    <div v-else class="update-phone success">
        <image :src="successImg" mode="widthFix"></image>
        <div class="reset_title">您已成功重置密码</div>
        <div class="sure" @click="turnBack">返回</div>
    </div>
</template>
<script>
import mixins from '@/mixins/global.js';
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            successImg: require('@/static/imgs/my/lock.png'),
            mobile: '',
            code: '',
            phone: this.$state().user.phone,
            password: '',
            codeText: '获取验证码',
            myValue: 86,
            pwdShow: false,
            list: [
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
            fromLogin: false,
            show: true
        };
    },
    created() {
    },
    onLoad(e) {
        if (e.fromLogin) {
            this.fromLogin = true;
        }
    },
    methods: {
        turnBack() {
            uni.navigateBack({ delta: 1 });
        },
        getCode() {
            if (!mixins.verify(this.phone)) {
                return this.$toast('请输入正确的手机号');
            };
            if (this.$refs.uCode.canGetCode) {
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码'
                });
                let data = {
                    phone: this.phone,
                    type: this.myValue
                };
                api.selectUserByPhone({ phone: this.phone }).then(
                    res => {
                        if (res.code === 1 && res.retObj.no_use == 2) {
                            api.sendCode(data, true).then(
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
                            this.$toast('该手机号还没有注册,请先去注册');
                        }
                    },
                    err => {
                        uni.hideLoading();
                        this.$refs.uCode.reset();
                        this.$toast('网络连接失败');
                    }
                );
            } else {
                this.$u.toast('倒计时结束后再发送');
            }
        },
        codeChange(text) {
            this.codeText = text;
        },
        cellClick(index, item) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].checked = false;
            }
            this.list[index].checked = !this.list[index].checked;
            this.myValue = item.value;
            this.selectShow = false;
        },
        updatePwd() {
            if (!this.phone) {
                return this.$toast('请输入正确的手机号');
            };
            if (!this.code) {
                return this.$toast('请输入验证码');
            }
            let data = {
                code: this.code,
                phone: this.phone,
                type: this.myValue
            };
            if (!this.pwdShow) {
                api.zhPassword_check(data).then(
                    res => {
                        if (res.code === 1) {
                            this.pwdShow = true;
                        } else {
                            this.$toast(res.msg);
                        }
                    },
                    err => {
                        this.$toast('网络连接错误');
                    }
                );
            } else {
                delete data.code;
                data.password = this.password;
                if (this.fromLogin) {
                    console.log(data);
                    api.zhPassword(data).then(
                        res => {
                            if (res.code === 1) {
                                // this.$toast('密码修改成功');
                                this.show = false;
                                // setTimeout(() => {
                                //     uni.navigateBack({ delta: 1 });
                                // }, 3000);
                            }
                            console.log(res);
                        }
                    );
                    return;
                }
                delete data.phone;
                api.updatePwd(data).then(
                    res => {
                        if (res.code === 1) {
                            // this.$toast('密码修改成功');
                            this.show = false;
                            // setTimeout(() => {
                            //     uni.navigateBack({ delta: 1 });
                            // }, 3000);
                        }
                        console.log(res);
                    }
                );
            }
        }
    }
};
</script>
<style lang="less">
page{
    background: #ffffff;
}
*{
    font-size: 28rpx;
}
input{
    font-size: 28rpx;
}
.success{
    text-align: center;
}
.update-phone{
    div,span{
        font-size: 28rpx;
    }
    image{
        width: 200rpx;
        margin: 0 auto;
        padding-top: 60rpx;
    }
    .reset_title{
        margin: 0 auto;
        color: #999999;
        padding-top: 40rpx;
        text-align: center;
    }
    .bind_phone_box{
        width: 100%;
        text-align: center;
        padding: 30rpx 0;
        font-size: 28rpx;
        border-top: 2rpx solid #e0e0e0;
    }
    .code_box{
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #e0e0e0;
        // justify-content: space-between;
        /deep/ .u-size-mini{
            background: #FFE0E7;
            color: #ff2724;
            border-radius: 40rpx;
        }
        .code_left{
            display: flex;
            align-items: center;
            .select{
                position: relative;
                padding: 0 10rpx;
                .fixed_box{
                    position: absolute;
                    width: 300rpx;
                    top: 60rpx;
                    left: 0;
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
                .icon_box{
                    display: flex;
                    font-size: 28rpx;
                    align-items: center;

                }
            }
        }
        .u-field{
            padding-left: 0;
        }
    }
    .sure{
        width: 90%;
        margin: 0 auto;
        height: 80rpx;
        background: #ff2724;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        border-radius: 40rpx;
        margin-top: 80rpx;
    }
}
</style>
