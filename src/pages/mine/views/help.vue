<template>
    <div class="help">
        <div class="help_header">
            <div class="head_item1" @click="show=true">
                <image style="width:100rpx;height:100rpx" :src="lineIcon"></image>
                <div>在线留言</div>
                <div>{{obj.leaveTime}}</div>
            </div>
            <div class="head_item2">
                <image style="width:100rpx;height:100rpx" :src="phoneIcon"></image>
                <div>热线电话</div>
                <div @click="phoneCall">{{obj.linePhone}}</div>
            </div>
        </div>
        <div class="problem_box">
            <image style="width:240rpx;height:40rpx" :src="problemIcon"></image>
        </div>
        <div class="help_footer">
            <u-cell-item @click="cellClick(item)" v-for="(item, index) in obj.list" :key="index" :border-bottom="(obj.list.length - 1) !== index">
                <div slot="title">
                    <span style="white-space: pre-wrap;">{{item.title}}&nbsp;&nbsp;({{item.content}})</span>
                </div>
            </u-cell-item>
        </div>
        <mMsg @success="success" @closeMsg="closeMsg" :show="show" />
    </div>
</template>
<script>
import mMsg from '@/components/m-msg';
import api from '@/services/api.public.js';
export default {
    components: {
        mMsg
    },
    data() {
        return {
            obj: null,
            lineIcon: require('@/static/imgs/my/icon1.3ed2f30d.png'),
            phoneIcon: require('@/static/imgs/my/icon2.59784eaa.png'),
            problemIcon: require('@/static/imgs/my/download.png'),
            show: false
        };
    },
    created() {
        let data = {
            pid: 0
        };
        api.getHelp(data).then(
            res => {
                this.obj = res.retObj;
            }
        );
    },
    methods: {
        cellClick(item) {
            console.log(item.id);
            uni.navigateTo({ url: `/pages/mine/views/problem?id=${JSON.stringify(item.id)}` });
        },
        phoneCall() {
            uni.makePhoneCall({
                phoneNumber: this.obj.linePhone // 仅为示例
            });
        },
        success() {
            this.show = false;
        },
        closeMsg() {
            this.show = false;
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.h-popup /deep/ .u-drawer{
    overflow: visible!important;
    .u-drawer-content{
        overflow: visible!important;
        display: flex;
        .u-mode-center-box{
            background-color: #99999900!important;
            overflow: visible!important;
        }
        .uni-scroll-view{
            overflow: visible!important;
        }
    }
}
.help{
    .help_header{
        // width: 100%;
        align-items: center;
        justify-content: space-around;
        display: flex;
        text-align: center;
        background: #ffffff;
        padding: 30rpx;
        font-size: 24rpx;
        color: #ff2724;
        .head_item1{
            padding-right: 100rpx;
            :nth-child(2){
                color: #333333;
                font-size: 30rpx;
            }
        }
        .head_item2{
            :nth-child(2){
                color: #333333;
                font-size: 30rpx;
            }
            :nth-child(3){
                text-decoration: underline;
            }
        }
    }
    .problem_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30rpx 0;
    }
    .help_footer{
        width: 90%;
        background: #ffffff;
        margin: 0 auto;
        border-radius: 50rpx;
    }
}
</style>
