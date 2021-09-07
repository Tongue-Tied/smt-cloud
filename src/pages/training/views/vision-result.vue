<template>
    <div class="vision_result">
        <div class="top" :style="{backgroundImage:`url(${bgImg})`}">
            <div class="userimg_box">
                <image :src="$state().user.headImg" style="width:160rpx;height:160rpx;border-radius:100%"></image>
            </div>
            <div class="user_name_box">
                {{$state().user ? $state().user.userNick : ''}}
            </div>
            <div class="user_info_box">
                <div class="user_info_item">
                    <span>孩子年龄:</span>
                    <span>{{result.visionScope.age}}岁</span>
                </div>
                <div class="user_info_item">
                    <span>是否戴镜:</span>
                    <span>{{result.visionScope.isGrass === 1 ? '是' : '否'}}</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_item">
                <div class="title">孩子现在的视力情况</div>
                <div class="u-p-t-20 u-p-l-20">
                    <span>右眼视力:&nbsp;&nbsp;{{result.right}}</span>
                    <span v-if="result.rightStatus===2">偏低</span>
                    <span v-else style="background-color:#ff2724">正常</span>
                </div>
                <div class="u-p-t-20 u-p-l-20">
                    <span>左眼视力:&nbsp;&nbsp;{{result.left}}</span>
                    <span v-if="result.leftStatus===2">偏低</span>
                    <span v-else style="background-color:#ff2724">正常</span>
                </div>
            </div>
            <div class="bottom_item u-m-t-40" style="margin-top:40rpx">
                <div class="title">孩子现在的视力正常应为</div>
                <div class="u-p-t-20 u-p-l-20">
                    <span>右眼视力:&nbsp;&nbsp;{{result.visionScope.rightMin}}~{{result.visionScope.rightMax}}</span>
                </div>
                <div class="u-p-t-20 u-p-l-20">
                    <span>左眼视力:&nbsp;&nbsp;{{result.visionScope.leftMin}}~{{result.visionScope.leftMax}}</span>
                </div>
            </div>
            <div class="btn_box" @click="toTutor">
                看不明白？马上咨询辅导老师
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.training.js';
export default {
    data() {
        return {
            parmas: {
                age: '',
                isGrass: '',
                left: '',
                right: ''
            },
            result: null,
            bgImg: 'https://img.ruoshixunlianbao.com/bgMy_02.png'
        };
    },
    onLoad(e) {
        this.parmas = e;
    },
    beforeDestroy(e) {
        uni.switchTab({ url: '/pages/index/index' });
        // uni.navigateTo({ url: '/pages/training/views/' });
    },
    async mounted() {
        let res = await api.getVisualResult(this.parmas);
        try {
            if (res.code === 1) {
                this.result = res.retObj;
            }
        } catch (error) {

        }
    },
    methods: {
        toTutor() {
            uni.navigateTo({ url: '/pages/mine/views/tutor' });
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.vision_result{
    .top{
        width: 100%;
        height: 330rpx;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding-top: 40rpx;
        .userimg_box{
            width: 180rpx;
            height: 180rpx;
            background: #ffffff;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
        }
        .user_name_box{
            color: #ffffff;
            font-weight: 600;
            text-align: center;
            font-size: 34rpx;
            padding-top: 20rpx;
        }
        .user_info_box{
            width: 55%;
            height: 60rpx;
            margin: 0 auto;
            background: rgba(153, 0, 25,0.3);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 40rpx;
            padding: 0 60rpx;
            color: #ffffff;
            font-size: 24rpx;
            .user_info_item{
                :nth-child(2){
                    color: #ffff00;
                    padding-left: 15rpx;
                }
            }
        }
    }
    .bottom{
        padding: 40rpx;
        .bottom_item{
            background: #ffffff;
            border-radius: 40rpx;
            overflow: hidden;
            padding-bottom: 30rpx;
            div{
                display: flex;
                align-items: center;
                margin-top: 20rpx;
                margin-left: 20rpx;
                width: 100%;
                font-size: 26rpx;
                :nth-child(2){
                    margin-left: 20rpx;
                    display: flex;
                    width: 60rpx;
                    height: 40rpx;
                    background: #999999;
                    border-radius: 50rpx;
                    align-items: center;
                    justify-content: center;
                    padding: 5rpx 20rpx;
                    color: #ffffff;
                }
            }
            .title{
                width: 100%;
                background: #ffd9df;
                height: 80rpx;
                font-size: 32rpx;
                text-indent: 20rpx;
                color: #801a2a;
                margin-top: 0rpx;
                margin-left: 0rpx;
            }
        }
    }
    .btn_box{
        padding: 0 40rpx;
        height: 80rpx;
        margin: 0 auto;
        background: #ff2724;
        border-radius: 80rpx;
        color: #ffffff;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80rpx;
    }
}
</style>
