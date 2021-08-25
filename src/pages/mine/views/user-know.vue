<template>
    <div class="user_know" v-if="flag">
        <div class="user_tabs">
            <u-tabs :list="list" :is-scroll="false"  active-color="#ff2724" :current="current" @change="change"></u-tabs>
        </div>
        <div class="title">弱视训练宝{{obj.title}}</div>
        <div class="insert_box" v-html="obj.content"></div>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            list: [
                {
                    name: '隐私协议'
                },
                {
                    name: '平台协议'
                },
                {
                    name: '平台简介'
                }
            ],
            current: 0,
            obj: null,
            flag: false
        };
    },
    created() {
        this.getData(1);
    },
    methods: {
        change(e) {
            this.current = e;
            switch (e) {
                case 0:
                    this.getData(1);
                    break;
                case 1:
                    this.getData(36);
                    break;
                case 2:
                    this.getData(35);
                    break;
                default:
                    break;
            }
        },
        getData(type) {
            let data = {
                type: type
            };
            api.getContent(data).then(
                res => {
                    this.obj = res.retObj;
                    this.flag = true;
                }
            );
        }
    }
};
</script>
<style lang="less">
.user_know{
    .user_tabs{
        .u-tab-item{
            color: #333333 !important;
        }
    }
    .title{
        color: #333333;
        text-align: center;
        padding: 40rpx 0;
        font-size: 40rpx;
        font-weight: 500;
    }
    .insert_box{
        width: 83%;
        margin: 0 auto;
    }
}
</style>
