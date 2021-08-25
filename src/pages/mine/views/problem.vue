<template>
    <div class="problem_box">
        <div class="box_item" v-for="(item, index) in list" :key="index">
            <div class="box_item_qestion">
                <image style="width:40rpx;height:40rpx" :src="questionIcon"></image>
                <div>{{item.title}}</div>
            </div>
            <div class="box_item_answer">
                <image style="width:40rpx;height:40rpx" :src="answerIcon"></image>
                <div v-html="item.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            questionIcon: require('@/static/imgs/my/download-1.png'),
            answerIcon: require('@/static/imgs/my/download-2.png'),
            list: []
        };
    },
    onLoad(e) {
        if (e.id) {
            let data = {
                pid: e.id
            };
            api.getHelp(data).then(
                res => {
                    this.list = res.retObj.list;
                }
            );
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.problem_box{
    .box_item{
        background: #ffffff;
        // margin: 30rpx;
        width: 90%;
        margin: 30rpx auto;
        padding: 25rpx;
        border-radius: 30rpx;
        .box_item_qestion{
            display: flex;
            font-size: 26rpx;
            color: #333333;
            align-items: center;
            padding-bottom: 30rpx;
            border-bottom: 2rpx solid #f5f5f5;
        }
        .box_item_answer{
            display: flex;
            padding-top: 30rpx;
            div{
                flex: 1;
                color: #999999;
                font-size: 24rpx;
                word-break: break-all;
            }
        }
        image{
            padding-right: 20rpx;
        }
    }
}
</style>
