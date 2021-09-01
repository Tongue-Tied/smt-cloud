<template>
    <div class="group_result" v-if="flag">
        <div class="header">
            <div class="status" v-if="info.groupType === 1">
                拼团成功
            </div>
            <div class="status" v-if="info.groupType === 2">
                拼团失败,已退款
            </div>
            <div class="status" v-if="info.groupType === 3">
                还差<span style="color:#ff2724">{{info.chaNumber}}人</span>成团
            </div>
            <div class="time">
                <template v-if="info.groupType === 1">
                    已于 {{$dayjs(info.endTime).format('YYYY-MM-DD')}} 拼成
                </template>
                <template v-if="info.groupType === 3">
                    剩余时间&nbsp;<u-count-down font-size="25" color="#333333" bg-color="#ffffff00" :timestamp="info.cha"></u-count-down>
                </template>
            </div>
            <div class="headimg">
                <div v-for="(item, index) in info.groupUserList" :key="index">
                    <image @error="imageError(item)" :src="item.headImg"></image>
                    <image mode="widthFix" class="lianjie" v-if="index === 0 && info.groupType === 1 && info.groupUserList.length > 1" :src="lianjie"></image>
                    <image class="default" :src="defaultUrl" mode="heightFix" v-if="info.groupType === 3"></image>
                </div>
                <!-- <div class="default">
                    <image :src="src"></image>
                </div> -->
            </div>
            <label name="btn">
                <div class="check_order" v-if="info.groupType === 1">
                    查看订单
                    <button id="btn" v-show="false" @click="goOrder"><span style="color:#ffffff"></span></button>
                </div>
            </label>
            <label name="btn1">
                <div class="check_order" v-if="info.groupType === 3">
                    邀请好友参团
                    <button id="btn1" v-show="false" open-type="share"><span></span></button>
                </div>
            </label>
            <!-- <div class="check_order" v-if="info.groupType === 3" @click="invite">
                <button open-type="share"><span>邀请好友参团</span></button>
            </div> -->
        </div>
        <div class="main">
            <div class="img_box">
                <image :src="info.groupLogo"></image>
            </div>
            <div class="bottom_info">
                <div class="title">{{info.title}}</div>
                <div class="subtitle">{{info.subtitle}}</div>
                <div class="orgin_price">原价¥{{info.origPrice}}</div>
                <div class="tuan">
                    <div>¥{{info.price}}</div>
                    <div>{{info.groupNumber}}人团</div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="title">
                <image :src="left" mode="widthFix"></image>
                <div>拼团玩法</div>
                <image :src="right" mode="widthFix"></image>
            </div>
            <div class="img">
                <image mode="widthFix" :src="play"></image>
            </div>
            <div class="list">
                <div v-for="(item, index) in content" :key="index">
                    {{item.content}}
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.group.js';
export default {
    data() {
        return {
            id: '',
            info: null,
            lianjie: require('@/static/imgs/group/lianjie.png'),
            play: require('@/static/imgs/group/my_group.png'),
            content: null,
            defaultUrl: require('@/static/imgs/group/group_one.png'),
            flag: false,
            left: require('@/static/imgs/my/zhuangshi.png'),
            right: require('@/static/imgs/my/zhuangshi1.png')
        };
    },
    onLoad(e) {
        if (e) {
            this.id = e.id;
        }
    },
    mounted() {
        let data = {
            id: this.id
        };
        api.getMyGroupInfo(data).then(
            res => {
                if (res.code === 1) {
                    this.info = res.retObj;
                    let par = {
                        pid: 8
                    };
                    api.getSocreStrategy(par).then(
                        res => {
                            if (res.code === 1) {
                                this.content = res.retArr;
                                this.flag = true;
                            }
                        }
                    );
                }
            }
        );
    },
    methods: {
        imageError(e) {
            console.log(e.headImg.substr(0, 1));
            if (e.headImg.substr(0, 1) === '/') {
                e.headImg = require('@/static/imgs/group/cat.png');
            }
        },
        invite() {
            console.log(1111);
        },
        goOrder() {
            uni.navigateTo({ url: `/pages/group/group-order?id=${this.id}` });
        }
    },
    onShareAppMessage: function(res) {
        console.log(res);
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            path: `/pages/group/detail?id=${this.info.groupId}`
        };
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.group_result{
    div,span{
        font-size: 28rpx;
    }
    .header{
        text-align: center;
        background: #ffffff;
        padding-top: 50rpx;
        padding-bottom: 70rpx;
        .status{
            font-size: 46rpx;
            color: #333333;
            font-weight: 500;
            span{
                font-size: 46rpx;
                font-weight: 500;
            }
        }
        .time{
            color: #333333;
        }
        .headimg{
            padding-top: 60rpx;
            padding-bottom: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            image{
                width: 120rpx;
                height: 120rpx;
                border-radius: 100%;
            }
            .lianjie{
                width: 60rpx;
                border-radius: 0;
                margin: 0 10rpx;
            }
            .default{
                border-radius: 0;
                height: 120rpx;
            }
            div{
                display: flex;
                align-items: center;
            }
        }
        .check_order{
            width: 80%;
            height: 80rpx;
            margin: 0 auto;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 80rpx;
            font-size: 28rpx;
            background: #ff2724;
            button{
                height: 100%;
                width: 100%;
                border: none;
                color: #ffffff !important;
                border-radius: 80rpx;
            }
            button::after{
                border: none;
                background: #ff2724;
                color: #ffffff !important;
                font-size: 28rpx;
            }
        }
    }
    .main{
        display: flex;
        background: #ffffff;
        margin-top: 15rpx;
        padding: 40rpx 30rpx;
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
            padding-left: 40rpx;
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
                    padding-right: 30rpx;
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
    .footer{
        background: #ffffff;
        margin-top: 15rpx;
        .title{
            text-align: center;
            color: #ff2724;
            font-size: 32rpx;
            font-weight: 600;
            padding: 30rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            image{
                width: 20rpx;
            }
        }
        .img{
            display: flex;
            justify-content: center;
            image{
                width: 70%;
                margin: 0 auto;
            }
        }
        .list{
            padding: 30rpx;
            div{
                display: flex;
                align-items: center;
                padding-top: 20rpx;
                color: #333333;
                font-size: 26rpx;
            }
            div::before{
                width: 7rpx;
                height: 7rpx;
                content: "";
                border-radius: 100%;
                background: #ff2724;
                margin-right: 10rpx;
            }
        }
    }
}
</style>
