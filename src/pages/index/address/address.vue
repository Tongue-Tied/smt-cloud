<template>
    <div class="address">
        <div class="address_container">
            <u-cell-item class="address_item" title="收货人" :arrow="false" hover-class="none">
                <div class="my_input"><u-input :clearable="false" placeholder="请输入收货人姓名" v-model="name" type="text" /></div>
                <u-icon @click="clearName" slot="right-icon" color="#AAAAAA" size="45" name="close-circle"></u-icon>
            </u-cell-item>
            <u-cell-item class="address_item" title="手机号码" :arrow="false" hover-class="none">
                <div class="my_input"><u-input :clearable="false" placeholder="请输入收货人手机号码" v-model="phoneNumber" type="number" /></div>
                <div slot="right-icon" class="number" @click="chooseContact" v-show="!isH5">
                    <u-icon color="#ff2724" size="20" name="plus"></u-icon>
                    <span style="font-size:26rpx;color:#ff2724">通讯录</span>
                </div>
            </u-cell-item>
            <u-cell-item class="address_item" title="所在地区" @click="areaShow = true" :arrow="false" hover-class="none">
                <div class="my_input area">
                    <u-icon class="area_icon" size="30" name="map-fill"></u-icon>
                    <div style="font-size:26rpx;color:#333333">{{shArea ? shArea : ''}}</div>
                </div>
            </u-cell-item>
            <u-cell-item class="address_item" title="详细地址" :arrow="false" hover-class="none">
                <div class="my_input"><u-input :auto-height="true" :height="100" :clearable="false" placeholder="例如：某某小区3号楼1单元201" v-model="shAddress" type="text" /></div>
            </u-cell-item>
        </div>
        <div class="sure_btn" @click="sure">
            <span>确定</span>
        </div>
        <u-picker mode="region" @confirm="areaChange" v-model="areaShow" :area-code='["11", "1101", "110101"]'></u-picker>
    </div>
</template>

<script>
import apiAddress from '@/services/api.shop.js';
export default {
    data() {
        return {
            value: '',
            name: this.$state().user.shName,
            phoneNumber: this.$state().user.shPhone,
            isH5: false,
            shArea: this.$state().user.shArea,
            shAddress: this.$state().user.shAddress,
            areaShow: false
        };
    },
    created() {
        // #if H5
        this.isH5 = true;
        // #endif
    },
    methods: {
        chooseContact() {
            // #if MP-WEIXIN
            try {
                // eslint-disable-next-line no-undef
                console.log(wx);
                let that = this;
                // eslint-disable-next-line no-undef
                wx.chooseContact({
                    success: function(res) {
                        if (res.errMsg === 'chooseContact:ok') {
                            if (that.name === '') {
                                that.name = res.displayName;
                            }
                            that.phoneNumber = res.phoneNumber;
                        }
                        console.log(res, '成功回调');
                    },
                    fail(res) {
                        console.log(res, '错误回调');
                    },
                    complete(res) {
                        console.log(res, '结束回调');
                    }
                });
            } catch (e) {
                // TODO handle the exception
            }
            // uni.chooseContact(
            //     res => {
            //         console.log(res);
            //     }
            // );
            // #endif

            // #if H5
            console.log(111);
            // #endif
        },
        clearName() {
            this.name = '';
        },
        areaChange(e) {
            let arr = [];
            for (const key in e) {
                arr.push(e[key].label);
            }
            this.shArea = arr.join(' ');
        },
        sure() {
            let data = {
                address: this.shAddress,
                area: this.shArea,
                name: this.name,
                phone: this.phoneNumber,
                sex: 1
            };
            console.log(apiAddress);
            apiAddress.addReceivingAddress(data).then(
                res => {
                    if (res.code === 1) {
                        this.$store.dispatch('loadUser').then(res => {
                            if (res) {
                                uni.navigateBack({ delta: 1 });
                            }
                        });
                    } else {
                        this.$toast(res.msg || '网络出错啦');
                    }
                    // uni.navigateBack({ delta: 1 });
                },
                err => {
                    this.$toast('修改失败');
                }
            );
        }
    }
};
</script>

<style lang="less">
page{
    background: #ffffff;
}
.address{
    .address_container{
        .address_item{
            display: flex;
            justify-content: space-between;
            /deep/ .u-cell_title{
                width: 20% !important;
            }
            .my_input{
                padding: 0 30rpx 0 30rpx;
                flex: 1;
            }
            .area{
                display: flex;
                .area_icon{
                    padding-right: 10rpx;
                }
            }
        }
        .number{
            display: flex;
            align-items: center;
            span{
                padding-left: 10rpx;
                font-weight: 500;
            }
        }
    }
    .sure_btn{
        width: 95%;
        margin: 70rpx auto;
        height: 80rpx;
        border-radius: 40rpx;
        background: #ff2724;
        display: flex;
        align-items: center;
        color: #ffffff;
        justify-content: center;
    }
}
</style>
