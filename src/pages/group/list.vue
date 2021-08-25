<template>
    <div class="group-list" v-if="flag">
        <div class="top">
            <div class="image_box">
                <image :src="titleImg"></image>
            </div>
            <div class="notice_box">
                <mNotice :list="group.msgList"
                :myStyle="{
                    transform: 'translate(0,0)',
                    paddingTop: '0',
                    background:'rgba(0, 0, 0, 0.3)',
                    padding:'25rpx 0 25rpx 25rpx',
                    borderRadius:'25rpx'
                }"
                :color="'#ffffff'" />
            </div>
        </div>
        <div class="middle">
            <div class="group_box" v-for="(item, index) in group.groupList" :key="index">
                <div class="group_item">
                    <div class="item_image">
                        <image style="width:240rpx;height:240rpx;border-radius:45rpx" :src="item.img"></image>
                    </div>
                    <div class="item_info">
                        <div class="info_title">{{item.title}}</div>
                        <div>{{item.subtitle}}</div>
                        <div class="num">已拼{{item.sellNumber}}件</div>
                        <div class="price">
                            <div class="fuhao">¥</div>
                            <div> <span>{{item.price}}</span> </div>
                            <div><span>¥{{item.origPrice}}</span></div>
                            <div>
                                <div @click="toDes(item.id)">立即拼团</div>
                            </div>
                        </div>
                        <div class="fixed_group_num">{{item.tuanNumber}}人团</div>
                    </div>
                </div>
                <div class="item_count">
                    <div class="count_title">距拼团结束还剩 </div>
                    <div>
                        <u-count-down :timestamp="item.cha" separator-color="#ff2724" :color="'#ff2724'" :show-days="true" :show-hours="true" separator="zh"></u-count-down>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="title">拼团说明</div>
            <div class="bottom_item" v-for="(item, index) in content" :key="index">
                {{item.content}}
            </div>
            <div class="my_group" @click="toMyGroup">
                <image :src="userImg"></image>
                <span>查看我的拼团</span>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>
<script>
import mNotice from '@/components/m-notice';
import api from '@/services/api.group.js';
import apiPublic from '@/services/api.public.js';
export default {
    components: {
        mNotice
    },
    data() {
        return {
            titleImg: 'https://img.ruoshixunlianbao.com/bgPintuan.png',
            userImg: require('@/static/imgs/group/xiaR.png'),
            group: null,
            content: null,
            flag: false,
            shareConfig: null
        };
    },
    async created() {
        let data = {
            page: 1,
            pageSize: 100
        };
        let res = await api.getGroupList(data);
        try {
            if (res.code === 1) {
                this.group = res.retObj;
                this.flag = true;
            }
        } catch (error) {

        }
        apiPublic.getSocreStrategy({ pid: 8 }).then(
            res => {
                if (res.code === 1) {
                    this.content = res.retArr;
                }
            }
        );
        apiPublic.shareConfigData({ type: 2 }).then(
            res => {
                if (res.code === 1) {
                    this.shareConfig = res.retObj;
                }
                console.log(res);
            }
        );
    },
    methods: {
        toDes(id) {
            uni.navigateTo({ url: `/pages/group/detail?id=${id}` });
        },
        toMyGroup() {
            uni.navigateTo({ url: '/pages/group/my-group' });
        }
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: this.shareConfig.title,
            imageUrl: this.shareConfig.logo,
            path: '/pages/group/list'
        };
        // shareSuccess
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(400rpx + env(safe-area-inset-bottom));
}
.group-list{
    .top{
        position: relative;
        .image_box{
            width: 100%;
            height: 300rpx;
            image{
                width: 100%;
                height: 100%;
            }
        }
        .notice_box{
            position: absolute;
            width: 62%;
            left: 20rpx;
            top: calc(50rpx + env(safe-area-inset-top));
            z-index: 28;
            color: #ffffff !important;
        }
    }
    .middle{
        padding: 30rpx;
        .group_box{
            background: #ffffff;
            margin-bottom: 30rpx;
            border-radius: 60rpx;
            .item_count{
                display: flex;
                margin: 0 auto;
                padding-bottom: 30rpx;
                align-items: center;
                justify-content: center;
                .count_title{
                    color: #333333;
                    font-size: 24rpx;
                    padding-right: 10rpx;
                }
            }
        }
        .group_item{
            display: flex;
            background: #ffffff;
            padding: 30rpx;
            margin-bottom: 30rpx;
            overflow: hidden;
            border-radius: 60rpx;
            .item_info{
                padding-left: 40rpx;
                flex: .95;
                position: relative;
                .fixed_group_num{
                    position: absolute;
                    right: -69rpx;
                    top: 35rpx;
                    padding: 0 60rpx;
                    transform: rotate(36deg);
                    transform-origin: right bottom;
                    background: #ffe5ea;
                    font-size: 26rpx;
                    color: #ff2742;
                }
                .info_title{
                    font-size: 26rpx;
                    color: #333333;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: keep-all;
                    width: 320rpx;
                }
                :nth-child(2){
                    color: #999999;
                    font-size: 24rpx;
                    padding-bottom: 30rpx;
                }
                .num{
                    width: auto;
                    display: inline-block;
                    padding: 3rpx 40rpx;
                    justify-content: center;
                    border: 2rpx solid #ff2724;
                    border-radius: 30rpx;
                    color: #ff2724;
                    font-size: 24rpx;
                }
                .price{
                    display: flex;
                    flex: 1;
                    align-items: flex-end;
                    justify-content: space-between;
                    margin-top: 40rpx;
                    .fuhao{
                        font-size: 20rpx;
                        color: #ff2724;
                    }
                    :nth-child(2){
                        font-size: 30rpx !important;
                        font-weight: 500;
                        color: #ff2724;
                        padding: 0;
                        display: flex;
                        align-items: flex-end;
                    }
                    :nth-child(3){
                        color: #999999;
                        font-size: 24rpx !important;
                        text-decoration: line-through;
                        margin-left: 10rpx;
                    }
                    :nth-child(4){
                        display: flex;
                        flex: 1;
                        justify-content: flex-end;
                        color: #ffffff;
                        font-size: 26rpx;
                        div{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 6rpx 30rpx;
                            background: #ff2724;
                            border-radius: 40rpx;
                            color: #ffffff;
                        }
                        // margin-left: 20rpx;
                    }
                }
            }
        }
    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        background: #f5f5f5;
        padding-top: 30rpx;
        .title{
            color: #ff2724;
            font-size: 36rpx;
            font-weight: 500;
            text-align: center;
        }
        .bottom_item{
            position: relative;
            padding:30rpx 50rpx;
            font-size: 28rpx;
        }
        .bottom_item::before{
                width: 10rpx;
                height: 10rpx;
                border-radius: 100%;
                background: #ff2724;
                position: absolute;
                left: 30rpx;
                top: 50%;
                transform: translate(0,-50%);
                content: "";
        }
        .my_group{
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            height: 80rpx;
            color: #ff2724;
            padding-bottom: calc(env(safe-area-inset-bottom));
            image{
                width: 35rpx;
                height: 35rpx;
                padding-right: 20rpx;
            }
        }
    }
}
</style>
