<template>
  <div class="message_detail">
    <div class="m_item">
        <div class="top">
            <div>{{info.title}}</div>
            <div>{{info.createTime}}</div>
        </div>
        <div class="bottom">
            {{info.content}}
        </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            id: '',
            activeName: 'a',
            news: [],
            newTs: [],
            url: require('@/static/imgs/my/tz.png'),
            info: null
        };
    },
    mounted() {
        this.getData();
    },
    onLoad(e) {
        if (e.id) {
            this.id = e.id;
        }
        console.log(e);
    },
    methods: {
        async getData() {
            const res = await api.getMsgInfo({
                id: this.id
            });
            console.log(res);
            try {
                if (res.code === 1) {
                    this.info = res.retObj;
                }
            } catch (error) {

            }
        }
        // noticeDes(id) {
        //     uni.navigateTo({ url: `/pages/mine/views/msg-detail?id=${id}` });
        // }
    }
};
</script>

<style lang="less">
page{
    background: #f5f5f5;
}
.message_detail{
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
            width: 100%;
            padding-bottom: 20rpx;
            border-bottom: 2rpx solid #e9e9e9;
            :nth-child(1){
                color: #333333;
                font-size: 30rpx;
            }
            :nth-child(2){
                padding-top: 20rpx;
                color: #999999;
            }
        }
        .bottom{
            display: flex;
            padding-top: 40rpx;
            color: #333333;
            font-size: 28rpx;
        }
    }
}
</style>
