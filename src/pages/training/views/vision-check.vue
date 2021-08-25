<template>
    <div class="vision-check">
        <div class="vc_item">
            <div class="title">孩子年龄:</div>
            <div class="input_box">
                <input type="text" v-model="testAge" @click="selectShow = true" placeholder="请选择年龄" :disabled="true">
                <u-icon class="icon_box" size="20" name="arrow-down-fill"></u-icon>
            </div>
        </div>
        <div class="vc_item">
            <div class="title">是否戴镜:</div>
            <div>
                 <u-radio-group size="26" active-color="#ff2724" v-model="isGrass">
                    <u-radio
                        label-size="28"
                        @change="radioChange"
                        :name="1"
                    >是</u-radio>
                    <u-radio
                        label-size="28"
                        @change="radioChange"
                        :name="2"
                    >否</u-radio>
                </u-radio-group>
            </div>
        </div>
        <div class="vc_item">
            <div class="title">右眼视力:</div>
            <div class="input_box">
                <input v-model="rightValue.label" type="text" @click="degreesShow=true,isRight=true" placeholder="请选择视力数值" :disabled="true">
                <u-icon class="icon_box" size="20" name="arrow-down-fill"></u-icon>
            </div>
        </div>
        <div class="vc_item">
            <div class="title">左眼视力:</div>
            <div class="input_box">
                <input v-model="leftValue.label" type="text" @click="degreesShow=true,isRight=false" placeholder="请选择视力数值" :disabled="true">
                <u-icon class="icon_box" size="20" name="arrow-down-fill"></u-icon>
            </div>
        </div>
        <div class="btn_box" @click="sure">
            <div>点击查看 孩子视力是否正常</div>
        </div>
        <u-select v-model="selectShow" :default-value="[parmasAge - 3]" @confirm="selectConfirm" :list="ageList"></u-select>
        <u-select v-model="degreesShow" @confirm="degreesConfirm" :list="degreesList"></u-select>
    </div>
</template>
<script>
import api from '@/services/api.training.js';
export default {
    data() {
        return {
            isGrass: 1,
            ageList: [
                { label: '3岁', value: 3 },
                { label: '4岁', value: 4 },
                { label: '5岁', value: 5 },
                { label: '6岁', value: 6 },
                { label: '7岁', value: 7 },
                { label: '8岁', value: 8 },
                { label: '9岁', value: 9 },
                { label: '10岁', value: 10 },
                { label: '11岁', value: 11 },
                { label: '12岁', value: 12 },
                { label: '13岁', value: 13 },
                { label: '14岁', value: 14 },
                { label: '15岁', value: 15 },
                { label: '16岁', value: 16 },
                { label: '17岁', value: 17 },
                { label: '18岁', value: 18 },
                { label: '18岁以上', value: 19 }
            ],
            selectShow: false,
            testAge: '',
            parmasAge: '',
            degreesList: [],
            degreesShow: false,
            isRight: true,
            rightValue: '',
            leftValue: ''
        };
    },
    created() {
        api.getVisionEDu().then(
            res => {
                if (res.code === 1) {
                    for (let i = 0; i < res.retArr.length; i++) {
                        this.degreesList.push(
                            {
                                label: res.retArr[i].du,
                                value: res.retArr[i].number
                            }
                        );
                    }
                }
            }
        );
    },
    methods: {
        radioChange(e) {
            console.log(e);
        },
        selectConfirm(e) {
            this.testAge = e[0].label;
            this.parmasAge = e[0].value;
        },
        degreesConfirm(e) {
            if (this.isRight) {
                this.rightValue = e[0];
            } else {
                this.leftValue = e[0];
            }
        },
        sure() {
            if (this.parmasAge && this.isGrass && this.rightValue && this.leftValue) {
                uni.navigateTo({ url: `/pages/training/views/vision-result?isGrass=${this.isGrass}&age=${this.parmasAge}&left=${this.leftValue.value}&right=${this.rightValue.value}` });
            } else {
                this.$toast('请完善信息');
            }
        }
    }
};
</script>
<style lang="less">
page{
    background: #ffffff;
}
.vision-check{
    padding: 40rpx;
    border-top: 2rpx solid #f5f5f5;
    .vc_item{
        padding: 0 20rpx;
        display: flex;
        align-items: center;
        padding-bottom: 30rpx;
        margin: 0 auto;
        .title{
            padding-right: 20rpx;
            color: #333333;
            font-size: 28rpx;
        }
        .input_box{
            display: flex;
            align-items: center;
            flex: 1;
            position: relative;
            input{
                flex: 1;
                font-size: 26rpx;
                background: #f5f5f5;
                padding: 10rpx 20rpx;
                border-radius: 15rpx;
            }
            .icon_box{
                position: absolute;
                right: 20rpx;
                top:50%;
                transform: translate(0,-50%);
            }
        }
        .u-radio{
            .u-radio__icon-wrap{
                display: flex;
                align-items: center;
                justify-content: center;
                u-icon{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
    .btn_box{
        padding: 0 20rpx;
        background: #ff2724;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 50rpx;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60rpx;
    }
}
</style>
