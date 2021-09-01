<template>
  <div class="message">
    <div class="m_item" v-for="(news,index) in news" :key="index" @click="noticeDes(news.id)">
        <div class="top">
            <div class="top_left">{{news.createTime}}</div>
            <div class="top_right">
                <u-icon name="arrow-right" color="#9E9E9E" size="30"></u-icon>
            </div>
        </div>
        <div class="bottom">
            <div class="b_left">
                <image mode="widthFix" :src="url"></image>
            </div>
            <div class="b_right">
                <div class="br_top">
                    <span>{{news.title}}</span>
                    <span v-if="news.isRead===1">new</span>
                </div>
                <div class="br_bottom">{{news.content}} </div>
            </div>
        </div>
    </div>
    <u-empty margin-top="40" v-if="!news.length" text="消息列表为空" mode="message"></u-empty>
  </div>
</template>

<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            news: [],
            url: require('@/static/imgs/my/tz.png')
        };
    },
    onShow() {
        this.tongzhiData();
    },
    methods: {
        async tongzhiData() {
            const res = await api.getMsgList({
                page: 1,
                pageSize: 100
            });
            this.news = res.retObj.items;
        },
        noticeDes(id) {
            // uni.navigateTo({ url: '/pages/index/address/address' });
            uni.navigateTo({ url: `/pages/mine/views/msg-detail?id=${id}` });
        }
    }
};
</script>

<style lang="less">
page{
    background: #f5f5f5;
}
.message{
    div,span{
        font-size: 28rpx;
    }
    padding: 0 30rpx;
    .m_item{
        background: #ffffff;
        border-radius: 30rpx;
        margin-top: 30rpx;
        padding: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 0 10rpx 5rpx #eeeeee;
        .top{
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
        .bottom{
            display: flex;
            padding-top: 40rpx;
            .b_left{
                padding-right: 30rpx;
                image{
                    width: 70rpx;
                }
            }
            .b_right{
                .br_top{
                    display: flex;
                    :nth-child(1){
                        font-size: 30rpx;
                        color: #333333;
                        padding-right: 20rpx;
                    }
                    :nth-child(2){
                        display: flex;
                        height: 36rpx;
                        padding: 0 20rpx;
                        background: #ff2742;
                        border-radius: 40rpx;
                        color: #ffffff;
                        font-size: 20rpx !important;
                    }
                }
                .br_bottom{
                    margin-top: 10rpx;
                    font-size: 26rpx !important;
                }
            }
        }
    }
}
</style>
