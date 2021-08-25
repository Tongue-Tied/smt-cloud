<template>
    <div class="my_group">
        <div class="group_item" @click="goDetails(item.id)" v-for="(item, index) in myList" :key="index">
            <div class="top">
                <div class="top_left" v-if="item.cha">
                    <div>剩余时间</div>
                    <div>
                        <u-count-down font-size="25" color="#333333" bg-color="#ffffff00" :timestamp="item.cha"></u-count-down>
                    </div>
                </div>
                <div class="top_right" v-if="item.groupType === 3">
                    待分享，差{{item.chaNumber}}人
                </div>
                <div class="top_right" style="color:#ff9933" v-if="item.groupType === 1">
                    拼团成功
                </div>
                <div class="top_right" v-if="item.groupType === 2 ">
                    拼团失败,已退款
                </div>
            </div>
            <div class="bottom">
                <div class="img_box">
                    <image :src="item.groupLogo"></image>
                </div>
                <div class="bottom_info">
                    <div class="title">{{item.title}}</div>
                    <div class="subtitle">{{item.subtitle}}</div>
                    <div class="orgin_price">原价¥{{item.origPrice}}</div>
                    <div class="tuan">
                        <div>¥{{item.price}}</div>
                        <div>{{item.groupNumber}}人团</div>
                    </div>
                </div>
            </div>
        </div>
        <u-empty text="还没有拼团哦" mode="list" margin-top="20" v-if="!myList.length"></u-empty>
     </div>
</template>
<script>
import api from '@/services/api.group.js';
export default {
    data() {
        return {
            myList: []
        };
    },
    created() {
        let data = {
            page: 1,
            pageSize: 100
        };
        api.getMyGroupList(data).then(
            res => {
                if (res.code === 1) {
                    this.myList = res.retArr;
                }
            }
        );
    },
    methods: {
        goDetails(id) {
            uni.navigateTo({ url: `/pages/group/group-result?id=${id}` });
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.my_group{
    font-size: 28rpx;
    padding: 0 30rpx;
    .group_item{
        background: #ffffff;
        padding:30rpx 40rpx;
        border-radius: 60rpx;
        box-shadow: 0 0 20rpx 10rpx #eeeeee;
        margin-top: 40rpx;
        .top{
            display: flex;
            justify-content: space-between;
            .top_right{
                color: #ff2724;
                flex: 1;
                display: flex;
                justify-content: flex-end;
            }
        }
        .bottom{
            display: flex;
            .img_box{
                width: 180rpx;
                height: 180rpx;
                image{
                    width: 100%;
                    height: 100%;
                    border-radius: 40rpx;
                }
            }
            .bottom_info{
                padding-left: 80rpx;
                .title{
                    font-size: 28rpx;
                    color: #333333;
                }
                .subtitle{
                    color: #999999;
                }
                .orgin_price{
                    color: #999999;
                    padding-top: 25rpx;
                    text-decoration: line-through;
                }
                .tuan{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10rpx;
                    :nth-child(1){
                        color: #ff2724;
                        font-size: 28rpx;
                    }
                    :nth-child(2){
                        display: flex;
                        padding: 5rpx 20rpx;
                        background: #FFE0E7;
                        border-radius: 40rpx;
                        color: #ff2724;
                        font-size: 22rpx;
                    }
                }
            }
        }
    }
}
</style>
