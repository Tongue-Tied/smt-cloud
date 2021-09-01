<template>
    <div class="group_detail" v-if="flag">
        <div class="swipe_box">
            <swiper
                    class="swiper-box"
                    :autoplay="false"
                    circular="true"
                    indicatorDots="true"
                    indicator-active-color="#fcf6f3"
                >
                    <swiper-item
                        v-for="(item, index) in swiperList"
                        :key="index"
                    >
                        <view class="swiper-item">
                            <image
                                :src="item"
                                class="swiper-item_img"
                                mode="widthFix"
                            />
                        </view>
                    </swiper-item>
                </swiper>
        </div>
        <div class="info_box" :style="'background-image:url('+ ptBg + ')'">
            <div class="info_top">
                <div class="it_left">
                    <span>¥</span>
                    <span>{{details.group.price}}</span>
                    <span>¥{{details.group.origPrice}}</span>
                </div>
                <div class="it_right">
                    <image style="width:30rpx;height:30rpx" :src="timeImg"></image>
                    <span>距离拼团结束还剩:</span>
                </div>
            </div>
            <div class="info_top">
                <div class="it_left">
                    <image class="u-m-r-10" style="width:20rpx;height:20rpx" :src="userImg"></image>
                    <span style="font-size:28rpx">{{details.group.tuanNumber}}人团</span>
                    <span style="text-decoration: none;">已拼{{details.group.sellNumber}}件</span>
                </div>
                <div class="it_right">
                    <u-count-down
                        :timestamp="details.group.cha"
                        :show-days="true"
                        separator="zh"
                        font-size="26"
                        separator-color="#ffffff"
                        bg-color="#00000000"
                        color="#ffffff"
                        :show-hours="true">
                    </u-count-down>
                </div>
            </div>
        </div>
        <div class="title">
            <div>{{details.group.title}}</div>
            <div>{{details.group.subtitle}}</div>
        </div>
        <div class="group_list" v-if="details.group.groupUserList.length">
            <div class="list_title">{{details.group.groupUserList.length}}人开团，可直接参与</div>
            <scroll-view
                scroll-y="true" class="scroll"
            >
                <view v-for="(item, index) in details.group.groupUserList"
                      :key="index"
                      class="scroll-view-item">
                      <div class="left">
                          <image mode="widthFix" :src="item.headImg"></image>
                          <div>
                              {{item.userName}}
                          </div>
                      </div>
                      <div class="right">
                          <div class="time">
                              <div>还差<span style="color:#ff2724">{{item.chaNumber}}人</span>成团</div>
                              <div>
                                  <span>剩余时间</span>
                                  <u-count-down
                                    :timestamp="item.cha"
                                    :show-days="true"
                                    font-size="24"
                                    separator-color="#ff2724"
                                    bg-color="#00000000"
                                    color="#ff2724"
                                    :show-hours="true">
                                </u-count-down>
                              </div>
                          </div>
                          <div class="btn_box" @click="toGroup(item)">去拼团</div>
                      </div>
                </view>
            </scroll-view>
        </div>
        <div class="content">
            <div class="content_title">商品详情</div>
            <div class="content_container" v-html="details.group.content"></div>
        </div>
        <div class="fix_box">
            <div class="solo_pay" @click="toPay(true)">
                <span>¥{{details.group.origPrice}}</span>
                <span>单独支付</span>
            </div>
            <div class="group_pay" @click="toPay(false)">
                <span>¥{{details.group.price}}</span>
                <span>发起拼团</span>
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
            details: null,
            timeImg: require('@/static/imgs/group/time.png'),
            userImg: require('@/static/imgs/group/renshu.png'),
            swiperList: [],
            flag: false,
            ptBg: require('@/static/imgs/group/ptBg.png')
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
        api.getGroupInfo(data).then(
            res => {
                if (res.code === 1) {
                    this.details = res.retObj;
                    this.swiperList = res.retObj.group.imgs.split(',');
                    for (let i = 0; i < this.swiperList.length; i++) {
                        if (!this.swiperList[i]) {
                            this.swiperList.splice(i, 1);
                        }
                    }
                    // eslint-disable-next-line no-useless-escape
                    this.details.group.content = this.details.group.content.replace(/\<img/gi, '<img class="rich-img"');
                    this.flag = true;
                }
                console.log(res);
            }
        );
    },
    methods: {
        toPay(e) {
            let data;
            if (e) {
                data = `?orderId=${0}&groupId=${this.details.group.id}&type=${1}&price=${this.details.group.origPrice}&title=${this.details.group.title}&number=${1}`;
            } else {
                data = `?orderId=${0}&groupId=${this.details.group.id}&type=${2}&price=${this.details.group.price}&title=${this.details.group.title}&number=${1}`;
            }
            uni.navigateTo({ url: `/pages/group/pay${data}` });
        },
        toGroup(e) {
            if (e.uid === uni.getStorageSync('uid')) {
                return this.$toast('不能拼自己的团哟');
            }
            let data = `?orderId=${e.orderId}&groupId=${e.groupId}&type=${3}&price=${e.price}&title=${e.title}&number=${1}`;
            uni.navigateTo({ url: `/pages/group/pay${data}` });
        }
    },
    onShareAppMessage: function(options) {
        var that = this;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            title: that.details.group.title, // 默认是小程序的名称(可以写slogan等)
            path: `/pages/group/detail?id=${that.details.group.id}`, // 默认是当前页面，必须是以‘/’开头的完整路径
            imageUrl: that.details.group.img, // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
            success: function(res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    that.$toast('分享成功');
                }
            },
            fail: function(res) {
                // 转发失败之后的回调
                if (res.errMsg == 'shareAppMessage:fail cancel') {
                    // 用户取消转发
                    that.$toast('取消分享');
                } else if (res.errMsg == 'shareAppMessage:fail') {
                    // 转发失败，其中 detail message 为详细失败信息
                    that.$toast('分享失败');
                }
            }
        };
        return shareObj;
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.group_detail{
    .swipe_box{
        .swiper-box{
            height: 760rpx !important;
            .swiper-item{
                height: 100%;
                .swiper-item_img{
                    width: 100% !important;
                    height: 100% !important;
                }
            }
        }
    }
    .info_box{
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 18rpx;
        color: #ffffff;
        .info_top{
            display: flex;
            justify-content: space-between;
            .it_left{
                :nth-child(2){
                    font-size: 36rpx;
                    padding-right: 20rpx;
                }
                :nth-child(3){
                    font-size: 26rpx;
                    text-decoration: line-through;
                }
            }
            .it_right{
                display: flex;
                font-size: 26rpx;
                align-items: center;
                image{
                    padding-right: 10rpx;
                }
            }
        }
    }
    .title{
        font-size: 30rpx;
        padding: 40rpx 18rpx;
        background: #ffffff;
        :nth-child(2){
            color: #999999;
            font-size: 24rpx;
        }
    }
    .group_list{
        max-height: 480rpx;
        background: #ffffff;
        margin-top: 20rpx;
        padding-bottom: 50rpx;
        .list_title{
            padding: 30rpx 0 10rpx 30rpx;
            font-size: 30rpx;
            color: #333333;
        }
        .scroll{
            max-height: 470rpx;
            background: #ffffff;
            .scroll-view-item{
                display: flex;
                padding:20rpx 30rpx 0 30rpx;
                align-items: center;
                justify-content: space-between;
                .left{
                    display: flex;
                    align-items: center;
                    image{
                        width: 110rpx;
                        border-radius: 100%;
                        margin-right: 20rpx;
                    }
                    div{
                        width: 120rpx;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        // text-emphasis:
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                    .time{
                        margin-right: 20rpx;
                        div,span{
                            font-size: 22rpx;
                        }
                    }
                    .btn_box{
                        background: #ff2724;
                        padding: 10rpx 20rpx;
                        border-radius: 40rpx;
                        font-size: 24rpx;
                        color: #ffffff;
                    }
                }
            }
        }
    }
    .content{
        padding: 30rpx 18rpx;
        background: #ffffff;
        margin-top: 20rpx;
        padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
        /deep/ img{
            width: 100% !important;
        }
        .content_title{
            font-size: 32rpx;
            color: #333333;
            padding-bottom: 35rpx;
        }
        .content_container{
            .rich-img{
                width: 100% !important;
            }
        }
    }
    .fix_box{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100rpx;
        display: flex;
        div{
            flex: 50%;
            color: #ffffff;
            font-size: 28rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .solo_pay{
            background: #FF6F8A;
        }
        .group_pay{
            background: #FF003B;
        }
    }
}
</style>
