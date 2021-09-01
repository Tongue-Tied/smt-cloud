<template>
    <view v-if="flag" class="index-panel" @click="indexClick">
        <view class="head" v-if="indexData.bannerList">
            <!-- swiper轮播图 -->

                <swiper
                    class="swiper-box"
                    :autoplay="true"
                    circular="true"
                    :indicator-dots="indicatorDots"
                    indicator-active-color="#fcf6f3"
                    @change="swiperChange"
                >
                    <swiper-item
                        v-for="(item, index) in indexData.bannerList"
                        :key="index"
                    >
                        <view class="swiper-item">
                            <image
                                :src="item.img"
                                class="swiper-item_img"
                                mode="aspectFill"
                                @click="swiperClick(item)"
                            />
                        </view>
                    </swiper-item>
                </swiper>
                <div class="dot">
                    <div v-for="(item, index) in indexData.bannerList"
                        :style="index === current ? 'background:#ff2724':''"
                        :key="index"></div>
                </div>
        </view>
        <view class="user-info-box">
            <div class="uib_top">
                <div class="u_top_headimg">
                    <!-- <image :src="$state().user.headImg" alt=""> -->
                    <u-avatar size="150" :src="$state().user ? $state().user.headImg : ''"></u-avatar>
                </div>
                <div class="u_top_info" v-if="$state().user ? $state().user.userNick : false">
                    <div class="info_usernick">{{$state().user.userNick || ''}}</div>
                    <div>
                        <image style="width:24rpx;height:24rpx" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                        <span>{{$state().user.vipTime}}会员到期</span>
                    </div>
                    <div @click="toRenew">立即续费</div>
                </div>
                <div class="u_top_info" v-else>
                    <WeixinLogin class="weixin_login" />
                </div>
                <div class="u_top_start" @click="startTraining">开始训练</div>
            </div>
            <div class="uib_bottom">
                <div class="uib_bottom_left">
                    <span v-if="show">{{$state().user.shopScore}}</span>
                    <span v-else>0</span>
                    <span>积分</span>
                </div>
                <div class="uib_bottom_right">
                    <div class="ubr_right" @click="jumpToScore">
                        <image :src="icon1" alt="">
                        <span>积分记录</span>
                    </div>
                    <div class="ubr_left" @click="jumpStrategy">
                        <image :src="icon2" alt="">
                        <span>积分攻略</span>
                    </div>
                </div>
            </div>
        </view>
        <mNotice :list="indexData.msgList" />
        <view class="card-list">
            <view class="card-list-container" @click="listCilck(index)" v-for="(item,index) in indexData.mainBannerList" :key="index">
                <image :src="item.img"></image>
            </view>
        </view>
        <mPopup :show="testShow" :contentStyle="'padding-top:calc(20rpx + env(safe-area-inset-bottom))'" :top="'12%'" :title="'儿童对数视力表'" @updateUser="goTest" @closePopup="testShow = false" :subTitle="'请坐在距离视力表 3 米处'">
            <div class="test_box">
                <div class="age_box">
                    <span>孩子年龄:</span>
                    <input v-model="testAge" @click="selectShow = true" type="text" placeholder="请选择年龄" :disabled="true">
                </div>
                <div class="age_box">
                    <span>是否戴镜:</span>
                    <u-radio-group size="26" active-color="#ff2724" v-model="isGrass">
                        <u-radio
                            label-size="28"
                            @change="radioChange"
                            :name="1"
                        >是</u-radio>
                        <u-radio
                            label-size="28"
                            @change="radioChange"
                            :name="2"
                        >否</u-radio>
                    </u-radio-group>
                </div>
                <div class="hand_shelter">
                    请用手遮住左眼
                </div>
                <div class="wenxin_tips">温馨提示</div>
                <div class="tips">
                    <div class="tishi-p" style="display:flex">
                        <span style="padding-right: 5px;height:100%;display:flex">•</span>
                        <div>本功能测出的视力，仅供参考，如果你想了解更准确的视力数据，请带孩子去医院做散瞳检测</div>
                    </div>
                    <div class="tishi-p" style="display:flex">
                        <span style="margin-right: 5px;height:100%;display:flex">•</span>
                        <div>
                            如果孩子眼睛弱视，请一定要<span>戴镜检测</span>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
            <u-select v-model="selectShow" :default-value="[parmasAge - 3]" @confirm="selectConfirm" :list="ageList"></u-select>
        </mPopup>
        <mPopup v-if="diaLog" :show="diaLog.gongGao" :top="'25%'" :btnText="'知道了'" title="公告" @updateUser="noticeShow = false" @closePopup="noticeShow = false">
            <div class="notice_box" v-if="diaLog">{{diaLog.gongGao}}</div>
        </mPopup>
        <mPopup :show="countDown" :top="'25%'" :btnText="'去续费'" title="会员即将到期" @updateUser="toRenew" @closePopup="countDown = false">
            <div class="notice_box" v-if="diaLog">{{diaLog.title}}</div>
            <div class="notice_box" v-if="diaLog">{{diaLog.content}}</div>
        </mPopup>
        <mPopup :show="isNew" :top="'25%'" :btnText="'知道了'" title="见面礼" @updateUser="knowTabs" @closePopup="isNew = false">
            <div class="notice_box" v-if="diaLog">{{diaLog.title}}</div>
            <div class="notice_box" v-if="diaLog">{{diaLog.content}}</div>
        </mPopup>
        <mPopup :show="tutorShow"
                :imgUrl="teacher.img"
                :imgStyle="'border-radius:100%;width:180rpx'"
                :myStyle="'padding-top:100rpx;font-size:32rpx'"
                :top="'25%'"
                :btnText="'知道了'"
                :title="'辅导老师： '+ teacher.userName"
                @updateUser="tutorShow = false"
                @closePopup="tutorShow = false">
            <div class="teacher_box">
                <div>加辅导老师微信</div>
                <div style="padding-top:10rpx">拉你进入弱视训练指导群</div>
                <div style="padding:20rpx">
                    <image mode="widthFix" style="width:180rpx" :src="teacher.qrCode"></image>
                </div>
                <div>
                    <span>微信号：</span>
                    <span style="padding-right:10rpx">{{teacher.wx}}</span>
                    <span @click="copy" style="color:#ff2724">复制</span>
                </div>
            </div>
        </mPopup>
    </view>
    <view v-else>
    </view>
</template>
<script>
import launch from '@/mixins/launch.js';
import apiIndex from '@/services/api.index.js';
import mPopup from '@/components/m-popup';
import mNotice from '@/components/m-notice';
import WeixinLogin from '@/components/wxLogin';
import apiPublic from '@/services/api.public';
export default {
    name: 'index',
    mixins: [launch],
    components: {
        mPopup,
        mNotice,
        WeixinLogin
    },
    data() {
        return {
            serachQuery: {
                page: 1,
                size: 10,
                dateType: 1,
                keyword: ''
            },
            dateVisible: false,
            bgOpacity: 0,
            searchVisible: false,
            searchLoading: false,
            sumData: {},
            customerList: [],
            isInit: false,
            indexData: null,
            list: [],
            flag: false,
            isGrass: '',
            age: '',
            testShow: false,
            testAge: '',
            selectShow: false,
            ageList: [
                { label: '3岁', value: 3 },
                { label: '4岁', value: 4 },
                { label: '5岁', value: 5 },
                { label: '6岁', value: 6 },
                { label: '7岁', value: 7 },
                { label: '8岁', value: 8 },
                { label: '9岁', value: 9 },
                { label: '10岁', value: 10 },
                { label: '11岁', value: 11 },
                { label: '12岁', value: 12 },
                { label: '13岁', value: 13 },
                { label: '14岁', value: 14 },
                { label: '15岁', value: 15 },
                { label: '16岁', value: 16 },
                { label: '17岁', value: 17 },
                { label: '18岁', value: 18 },
                { label: '18岁以上', value: 19 }
            ],
            parmasAge: '',
            noticeShow: true,
            diaLog: null,
            countDown: false,
            isNew: false,
            current: 0,
            icon1: require('@/static/imgs/index/icon1.png'),
            icon2: require('@/static/imgs/index/icon2.png'),
            show: true,
            tutorShow: false,
            teacher: null
        };
    },
    created() {
        apiPublic.teacher({ type: 9 }).then(
            res => {
                this.teacher = res.retObj;
                console.log(res);
            }
        );
    },
    async onShow() {
        // xcxIndex
        this.tutorShow = false;
        this.testShow = false;
        // this.$loading.open();
        if (uni.getStorageSync('token')) {
            this.show = true;
            this.$store.dispatch('loadUser');
            let res = await apiIndex.index();
            if (res.code === 1) {
                this.indexData = res.retObj;
            // this.$loading.close();
            }
            let res1 = await apiIndex.showDialog();
            try {
                if (res1.code === 1) {
                    this.diaLog = res1.retObj;
                    this.flag = true;
                    console.log(res1);
                    if (res1.retObj.type === 3 || res1.retObj.type === 2) {
                        this.countDown = true;
                    } else {
                        this.countDown = false;
                    }
                }
            } catch (error) {

            }
        } else {
            this.show = false;
            let res = await apiIndex.xcxIndex();
            if (res.code === 1) {
                this.indexData = res.retObj;
                this.flag = true;
            }
            this.diaLog = null;
        }
        // this.$store.dispatch('loadUser');
        // let res = await apiIndex.index();
        // if (res.code === 1) {
        //     this.indexData = res.retObj;
        //     // this.$loading.close();
        // }
        // let res1 = await apiIndex.showDialog();
        // try {
        //     if (res1.code === 1) {
        //         this.diaLog = res1.retObj;
        //         this.flag = true;
        //         console.log(res1);
        //         if (res1.retObj.type === 3 || res1.retObj.type === 2) {
        //             this.countDown = true;
        //         } else {
        //             this.countDown = false;
        //         }
        //     }
        // } catch (error) {

        // }
    },
    methods: {
        isLogin() {
            if (!uni.getStorageSync('token')) {
                return false;
            } else {
                return true;
            }
        },
        swiperChange(e) {
            this.current = e.detail.current;
        },
        indexClick(e) {
            if (!uni.getStorageSync('token')) {
                // uni.navigateTo({ url: '/pages/login/login' });
                e.stopPropagation();
                return false;
            }
        },
        listCilck(index) {
            switch (index) {
                case 0:
                    this.testShow = true;
                    break;
                case 1:
                    this.tutorShow = true;
                    break;
                case 2:
                    uni.navigateTo({
                        url: '/pages/training/views/vision-check'
                    });
                    break;
                case 3:
                    this.isLogin() ? uni.navigateTo({
                        url: '/pages/group/list'
                    }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 4:
                    this.isLogin() ? uni.navigateTo({
                        url: '/pages/index/shop/shop-list'
                    }) : this.$toast('您还未登陆，请先登陆');
                    break;
                case 5:
                    this.isLogin() ? uni.navigateTo({
                        url: '/pages/score/score-shop'
                    }) : this.$toast('您还未登陆，请先登陆');
                    break;
                default:
                    break;
            }
        },
        jumpToScore() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/score/score-record' }) : this.$toast('您还未登陆，请先登陆');
        },
        jumpStrategy() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/score/score-strategy' }) : this.$toast('您还未登陆，请先登陆');
        },
        goTest() {
            if (this.testAge && this.isGrass) {
                uni.navigateTo({ url: `/pages/training/views/vision-test?isGrass=${this.isGrass}&age=${this.parmasAge}` });
            } else {
                this.$toast('请完善信息');
            }
        },
        selectConfirm(e) {
            this.testAge = e[0].label;
            this.parmasAge = e[0].value;
        },
        radioChange(e) {
            this.isGrass = e;
        },
        startTraining() {
            uni.switchTab({ url: '/pages/training/index' });
        },
        toRenew() {
            uni.navigateTo({ url: '/pages/renew/index' });
        },
        swiperClick(e) {
            console.log(e);
            switch (e.type) {
                case 0:
                    uni.navigateTo({ url: `/pages/web-view/web-view?path=${e.fkId}` });
                    break;
                case 1:
                    uni.navigateTo({ url: `/pages/group/detail?id=${e.fkId}` });
                    break;
                case 2:
                    uni.navigateTo({ url: `/pages/index/shop/shop-detail?id=${e.fkId}` });
                    break;
                case 3:
                    uni.navigateTo({ url: `/pages/score/score-shop?id=${e.fkId}` });
                    break;
                default:
                    break;
            }
        },
        knowTabs() {
            apiIndex.getPrize().then(
                res => {
                    if (res.code === 1) {
                        this.isNew = false;
                    } else {
                        this.$toast(res.msg);
                    }
                    console.log(res);
                },
                err => {
                    this.$toast('网络连接失败');
                }
            );
        },
        copy() {
            let that = this;
            uni.setClipboardData({
                data: this.teacher.wx, // 要被复制的内容
                success: function(res) {
                    // 重点~做笔记
                    // 在success中加入uni.hideToast()可以解决
                    that.$toast('复制成功');
                    // 以下就可自定义操作了~
                },
                fail: function(err) {
                    that.$toast('复制失败');
                }
            });
        }
    },
    onPageScroll(e) {
        // const top = this.systemInfo.safeArea.top + 44;
        // if (e.scrollTop < top) {
        //     this.bgOpacity = e.scrollTop / top;
        // } else {
        //     this.bgOpacity = 1;
        // }
    },
    async onPullDownRefresh() {
        this.$loading.open();
        let res = await this.$store.dispatch('loadUser');
        try {
            if (res.code === 1) {
                this.$loading.close();
                uni.stopPullDownRefresh();
            } else {
                this.$loading.close();
                uni.stopPullDownRefresh();
            }
        } catch (error) {
            this.$loading.close();
            uni.stopPullDownRefresh();
        }
        // if (this.isLogin) {
        //     this.loadData(false);
        // } else {
        //     uni.stopPullDownRefresh();
        // }
    }
};
</script>
<style lang="less">
page {
    background-color: #f5f5f5;
}
.index-panel {
    // /deep/ .icon_box{
    //     top: 15%;
    // }
    .tutorImage{
        position: relative;
        left: 50%;
        top: -220rpx;
        background: #333333;
        z-index: 10000000000000!important;
    }
    .head{
        position: relative;
        .dot{
            position: absolute;
            left: 50%;
            bottom: 120rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transform: translate(-50%,0);
            div{
                width: 15rpx;
                height: 15rpx;
                border-radius: 100%;
                background: #ffffff;
                margin-right: 10rpx;
            }
        }
    }
    padding-bottom: 30rpx;
    .swiper-box{
        width: 100%;
        height: 540rpx;
        .swiper-item{
            width: 100%;
            .swiper-item_img{
                width: 100%;
                height: 540rpx;
                div{
                    height: 100%;
                }
                img{
                    height: 100%;
                }
            }
        }
        /deep/ .uni-swiper-dots-horizontal{
            position: absolute;
            bottom: 25%;
        }
    }
    .user-info-box{
        width: 90%;
        border-radius: 60rpx;
        height: 370rpx;
        margin: 0 auto;
        background: #ffffff;
        box-shadow: 0 0 10rpx 5rpx #e2dfdf;
        transform: translate(0,-100rpx);
        .uib_top{
            height: 50%;
            display: flex;
            // justify-content: space-around;
            align-items: center;
            padding:30rpx 20rpx 0 20rpx;
            .u_top_headimg{
                width:140rpx;
                height: 140rpx;
                margin-right: 40rpx;
                image{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .u_top_info{
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                .info_usernick{
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .weixin_login /deep/ div{
                    font-size: 28rpx !important;
                    // padding: 5rpx 20rpx;
                    width: 160rpx;
                    height: 55rpx;
                    border: 2rpx solid #ff2724;
                    color: #ff2724;
                    border-radius: 40rpx;
                    margin-left: 20rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                :nth-child(1){
                    font-size: 32rpx;
                    color: #333333;
                    overflow: hidden;
                }
                :nth-child(2){
                    font-size: 24rpx;
                    color: #999999;
                    padding-top: 10rpx;
                }
                :nth-child(3){
                    font-size: 24rpx;
                    color: #ff2742;
                    width: 120rpx;
                    border: 1rpx solid #ff2742;
                    display: flex;
                    padding: 5rpx 10rpx 5rpx 10rpx;
                    align-items: center;
                    justify-content: center;
                    margin-top: 10rpx;
                    border-radius: 40rpx;
                }
            }
            .u_top_start{
                width: 160rpx;
                color: #ffffff;
                background: #ff2742;
                height: 55rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 40rpx;
                font-size: 28rpx;
                margin-left: 40rpx;
            }
        }
        .uib_bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24rpx;
            color: #333333;
            padding: 20rpx 20rpx 30rpx 20rpx;
            .uib_bottom_left{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 48rpx;
                // margin-right: 64rpx;
                :nth-child(1){
                    font-size: 64rpx;
                    color: #ff2742;
                    font-weight: bold;
                }
            }
            .uib_bottom_right{
                display: flex;
                padding-top: 15rpx;
                padding-right: 48rpx;
                .ubr_right{
                    padding-right: 120rpx;
                }
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                image{
                    width: 60rpx;
                    height: 60rpx;
                }
                span{
                    margin-top: 20rpx;
                }
            }
        }
    }
    .card-list{
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between  ;
        transform: translate(0,-50rpx);
        .card-list-container{
            width: 48%;
            height: 200rpx;
            margin-bottom: 20rpx;
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
    .index-head {
        position: relative;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 20%;
            background: linear-gradient(270deg, #e056e0 0%, #b44dce 100%);
            border-bottom-left-radius: 5%;
            border-bottom-right-radius: 5%;
        }
        padding-left: 30rpx;
        padding-right: 30rpx;
        .index-nav {
            margin-bottom: 10rpx;
            left: 0;
            right: 0;
            position: fixed;
            z-index: 3;
            top: 0;
            &.u-border-bottom {
                box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.05);
            }
            .index-nav-cont {
                text-align: center;
                font-size: 34rpx;
                font-weight: 500;
            }
        }
        .index-color-white {
            color: white;
        }
        .index-sign-btn {
            width: 220rpx;
            border-radius: 16rpx;
            overflow: hidden;
            margin: 0 auto;
        }
        .index-top,
        .index-card,
        .index-sign-btn {
            position: relative;
            z-index: 2;
        }
        .index-card {
            .m-card-panel {
                position: relative;
                overflow: hidden;
            }
        }
        .index-card-def {
            position: relative;
            padding-top: 50rpx;
            padding-bottom: 50rpx;
        }
        .index-card-img {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .index-search {
        padding: 40rpx 50rpx;
    }
    .index-body {
        padding: 0 30rpx;
        .m-card-panel {
            padding: 0;
        }
        + .index-body {
            margin-top: 30rpx;
        }
    }
    .test_box{
        width: 600rpx;
        padding: 40rpx;
        .age_box{
            display: flex;
            align-items: center;
            padding-bottom: 20rpx;
            span{
                margin-right: 20rpx;
            }
            input{
                font-size: 28rpx;
                background: #f5f5f5;
                flex: 1;
                padding: 10rpx;
                border-radius: 10rpx;
            }
        }
        .hand_shelter{
            width: 60%;
            height: 100rpx;
            background: #FBEAEC;
            margin: 20rpx auto;
            color: #ff2724;
            font-size: 26rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20rpx;
        }
        .tips{
            .tishi-p {
                width: 90%;
                margin: auto;
                color: #333333;
                font-size: 12px;
                letter-spacing: 1px;
                padding-top: 8px;
            }
            .tishi-p span {
                color: #ff2742;
            }
        }
        .wenxin_tips{
            text-align: center;
            color: #ff2724;
            font-weight: 600;
            font-size: 30rpx;
        }
    }
    .notice_box{
        color: #ff2724;
        font-size: 26rpx;
        text-align: center;
        padding: 20rpx;
        word-break: break-all;
    }
    .teacher_box{
        color: #333333;
        font-size: 26rpx;
        text-align: center;
    }
}
</style>
<style scoped>
.card-list .card-list-container :nth-child(2n+1){
        margin-right: 5%;
}
</style>
