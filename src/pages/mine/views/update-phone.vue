<template>
    <div class="update-phone" v-if="show">
        <div class="bind_phone_box" v-if="$state().user">
            当前绑定手机号: {{$state().user ? $state().user.phone : ''}}
        </div>
        <div class="code_box">
            <div class="code_left">
                <u-icon size="40" name="phone" color="#848484"></u-icon>
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
            <u-field :border-bottom="false" v-model="phone" label-width="0" placeholder="请输入新手机号">
                <!-- <u-button
                    size="mini"
                    slot="right"
                    type="success"
                    @click="getCode"
                    >{{ codeText }}</u-button
                > -->
            </u-field>
        </div>
        <div class="code_box">
            <div class="code_left">
                <u-icon size="40" name="email" color="#848484"></u-icon>
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
        <div class="sure" @click="updatePhone">立即绑定</div>
    </div>
    <div v-else class="success_box update-phone">
        <image :src="successImg" mode="widthFix"></image>
        <div class="s_title">您已成功更换手机号</div>
        <div class="sure" @click="turnback">返回</div>
    </div>
</template>
<script>
import mixins from '@/mixins/global.js';
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            mobile: '',
            code: '',
            phone: '',
            codeText: '获取验证码',
            myValue: 86,
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
            isUpdate: true,
            isBind: false,
            show: true,
            successImg: require('@/static/imgs/my/genghuan.png')
        };
    },
    created() {
        if (this.isBind) {
            this.isUpdate = false;
            uni.setNavigationBarTitle({
                title: '绑定手机号'
            });
            return;
        }
        if (!this.$state().user.phone) {
            this.isUpdate = false;
            uni.setNavigationBarTitle({
                title: '绑定手机号'
            });
        } else {
            this.isUpdate = true;
        }
    },
    onLoad(e) {
        if (e.isBind) {
            this.isBind = true;
        }
    },
    methods: {
        turnback() {
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
        updatePhone() {
            if (!this.phone) {
                return this.$toast('请输入正确的手机号');
            };
            if (!this.code) {
                return this.$toast('请输入验证码');
            }
            if (this.isUpdate) {
                let data = {
                    code: this.code,
                    phone: this.phone,
                    type: this.myValue
                };
                api.selectUserByPhone({ phone: this.phone }).then(
                    res => {
                        if (res.code === 1 && res.retObj.no_use == 2) {
                            api.updatePhone(data).then(
                                res => {
                                    if (res.code === 1) {
                                        this.show = false;
                                        // this.$toast('手机号更新成功');
                                        // setTimeout(() => {
                                        //     uni.navigateBack({ delta: 1 });
                                        // }, 2000);
                                    } else {
                                        this.$toast(res.msg);
                                    }
                                }
                            );
                        }
                    }
                );
            } else {
                let data = {
                    code: this.code,
                    phone: this.phone,
                    phoneType: this.myValue,
                    type: 2
                };
                api.selectUserByPhone({ phone: this.phone }).then(
                    res => {
                        if (res.code === 1 && res.retObj.no_use == 1) {
                            api.bindPhone(data).then(
                                res => {
                                    if (res.code === 1) {
                                        // this.$toast('手机号绑定成功');
                                        this.show = false;
                                        // setTimeout(() => {
                                        //     uni.navigateBack({ delta: 1 });
                                        // }, 2000);
                                    } else {
                                        this.$toast(res.msg);
                                    }
                                }
                            );
                        }
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
.update-phone{
    div,span{
        font-size: 28rpx;
    }
    .bind_phone_box{
        width: 100%;
        text-align: center;
        padding: 30rpx 0;
        border-top: 2rpx solid #e0e0e0;
        font-size: 26rpx;
        color: #848484;
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
.success_box{
    text-align: center;
    image{
        padding-top: 40rpx;
        width: 200rpx;
    }
    .s_title{
        padding-top: 40rpx;
        color: #999999;
    }
}
</style>
