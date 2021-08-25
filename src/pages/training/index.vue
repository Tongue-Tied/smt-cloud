<template>
    <div class="training_box" v-if="flag">
        <div class="info_box" :style="'background-image:url('+ bgImg + ')'">
            <div class="info_center">
                <div class="avatar">
                    <div style="width:170rpx;height:170rpx;background:#ffffff;display:flex;align-items: center;justify-content: center;border-radius: 100%;">
                        <u-avatar class="my_avatar" size="150" :src="$state().user.headImg"></u-avatar>
                    </div>
                </div>
                <div class="user_info" style="color:#ffffff" v-if="show">
                    <div class="user_info_top" v-if="show">
                        <!-- <div class="nick_name">{{$state().user.userNick || ''}}</div> -->
                        <div v-if="vipTimeShow">
                            <image style="width:24rpx;height:24rpx" :src="require('@/static/imgs/index/会员icon.png')" alt="">
                            <span style="padding-left:20rpx;color:#ffffff;font-size:24rpx">{{$state().user.vipTime || ''}}会员到期</span>
                        </div>
                    </div>
                    <div class="user_info_top" v-else>
                    </div>
                    <div class="user_info_bottom" v-if="show">
                        <div @click="toLog">训练日志</div>
                        <div @click="ruoshiClick">弱视必看</div>
                    </div>
                </div>
                <div class="login_box" v-if="!show">
                    <WeixinLogin @upDate="upDate" class="weixin_login" />
                </div>
            </div>
        </div>
        <div class="score_box">
            <div class="score_num">
                <div class="red_num">{{$state().user ? $state().user.shopScore : 0}}</div>
                <div class="score_num_bottom">
                    <div>积分</div>
                    <div @click="goScoreShop">去兑换</div>
                </div>
            </div>
            <div class="uib_bottom_right">
                    <div class="ubr_right" @click="goScoreRecord">
                        <image :src="require('@/static/imgs/index/icon1.png')" alt="">
                        <span>积分记录</span>
                    </div>
                    <div class="ubr_left" @click="goIntroduction">
                        <image :src="require('@/static/imgs/index/icon2.png')" alt="">
                        <span>积分攻略</span>
                    </div>
                </div>
            <div></div>
        </div>
        <div class="count_down_box">
            <div class="content_box" style="padding-top:20rpx">
                <u-collapse v-show="gameData && gameData.type === 0">
                    <u-collapse-item @change="collapseChange" :open="true" :body-style="{height:'100rpx !important'}" :title="'训练须知'">
                        <div class="content" v-html="knowsTips.content"></div>
                        <div slot="title-all" class="coolapse_title">
                            <div>训练须知</div>
                            <div>
                                <span class="u-p-r-10">隐藏</span>
                                <u-icon name="arrow-down" v-if="!collapseValue" color="#cc7a85"></u-icon>
                                <u-icon name="arrow-up" v-else color="#cc7a85"></u-icon>
                            </div>
                        </div>
                    </u-collapse-item>
                </u-collapse>
            </div>
        </div>
        <div class="count_down_box" v-if="gameData && gameData.type === 1">
            <div class="cdb_title">第{{gameData.group}}组训练进行中</div>
            <div class="cdb_box">
                <span>已训练</span>
                <span style="color:#ff2724">{{gameData.trainNumber}}</span>
                <span>次</span>
                <span>&nbsp;还需训练</span>
                <span style="color:#ff2724">{{gameData.syTrainNumber}}</span>
                <span>次</span>
                <span>请于</span>
                <div>
                    <u-count-down @end="countEnd" font-size="25" color="#ff2724" bg-color="#ffffff00" :timestamp="gameData.endtime"></u-count-down>
                </div>
                <span>内完成本组训练</span>
            </div>
        </div>
        <div class="count_down_box" v-if="gameData && gameData.type === 2">
            <div class="cdb_title">今日已进行 1 组训练</div>
            <div class="cdb_box">
                <span>下一组训练即将开始 倒计时</span>
                <div>
                    <u-count-down font-size="25" color="#ff2724" @end="countEnd" bg-color="#ffffff00" :timestamp="gameData.endtime"></u-count-down>
                </div>
            </div>
        </div>
        <div class="count_down_box" v-if="gameData && gameData.type === 3">
            <div class="cdb_title">今日训练已全部完成</div>
            <div class="cdb_box">
                <span>你很棒，请坚持下去！</span>
            </div>
        </div>
        <div class="game_list">
            <template v-for="(item,index) in gameList">
                <div class="game_item" v-if="item.type === 1" :key="index">
                    <div>
                        <image style="width:160rpx;height:160rpx" :src="item.logo"></image>
                    </div>
                    <div class="game_item_middle">
                        <div>{{item.name}}</div>
                        <div>{{item.des}}</div>
                    </div>
                    <div class="game_item_right">
                        <div class="game_item_right_container">
                            <div :style="item.isFin === 0 ? '' : item.isFin === 1 ? '' : 'background:#ff2724;color:#ffffff'"
                                 @click="cellClick(item)">
                                 {{item.isFin === 0 ? '未开始' : item.isFin === 1 ? '已完成' : item.isFin === 2 ? '去挑战' : '继续挑战'}}
                            </div>
                            <label @click="share(item)" name="share_btn">
                                <button :data-item="item" id="share_btn" v-if="show" v-show="false" open-type="share"></button>
                                <button v-else v-show="false"></button>
                                <div>分享赚积分</div>
                            </label>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="my_coll" @click="collChange">
            <div class="coll_title">
                <div>以下项目为选做 每天坚持效果更好哦</div>
                <div v-if="!collShow">
                    <span style="font-size:24rpx;color:#999999;padding-right:5rpx">隐藏</span>
                    <u-icon size="18" color="#999999" name="arrow-up"></u-icon>
                </div>
                <div v-else>
                    <span style="font-size:24rpx;color:#999999;padding-right:5rpx">隐藏</span>
                    <u-icon size="18" color="#999999" name="arrow-down"></u-icon>
                </div>
            </div>
        </div>
        <div class="game_list d_type" v-show="collShow">
            <template v-for="(item,index) in gameList">
                <div class="game_item" v-if="item.type === 2" :key="index">
                    <div>
                        <image style="width:160rpx;height:160rpx" :src="item.logo"></image>
                    </div>
                    <div class="game_item_middle">
                        <div>{{item.name}}</div>
                        <div>{{item.des}}</div>
                    </div>
                    <div class="game_item_right">
                        <div class="game_item_right_container">
                            <div :style="item.isFin === 0 ? '' : item.isFin === 1 ? '' : 'background:#ff2724;color:#ffffff'"
                                 @click="cellClick(item)">
                                 {{item.isFin === 0 ? '未开始' : item.isFin === 1 ? '已完成' : item.isFin === 2 ? '去挑战' : '继续挑战'}}
                            </div>
                            <label @click="share(item)" name="share_btn1">
                                <button :data-item="item" id="share_btn1" v-show="false" open-type="share"></button>
                                <div>分享赚积分</div>
                            </label>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <mPopup :show="ruoshiShow" :myStyle="'padding-top:30rpx'" :title="'弱视必看'" @updateUser="closePopup" @closePopup="closePopup">
            <div class="ruoshi_box" v-html="ruoshiContent"></div>
        </mPopup>
        <mPopup :show="testShow" :top="'12%'" :title="'儿童对数视力表'" @updateUser="goTest" @closePopup="testShow = false" :subTitle="'请坐在距离视力表 3 米处'">
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
                    <p class="tishi-p" style="display:flex">
                        <span style="padding-right: 5px;height:100%;display:flex">•</span
                        >本功能测出的视力，仅供参考，如果你想了解更准确的视力数据，请带孩子去医院做散瞳检测
                    </p>
                    <p class="tishi-p" style="display:flex">
                        <span style="margin-right: 5px;height:100%;display:flex">•</span
                        >如果孩子眼睛弱视，请一定要<span>戴镜检测</span>
                    </p>
                </div>
                <div></div>
                <div></div>
            </div>
            <u-select v-model="selectShow" :default-value="[parmasAge - 3]" @confirm="selectConfirm" :list="ageList"></u-select>
        </mPopup>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.training.js';
import apiPublic from '@/services/api.public.js';
import mPopup from '@/components/m-popup';
import WeixinLogin from '@/components/wxLogin';
export default {
    components: {
        mPopup,
        WeixinLogin
    },
    data() {
        return {
            gameList: null,
            icon1: require('@/static/imgs/index/icon1.png'),
            icon2: require('@/static/imgs/index/icon2.png'),
            bgImg: 'https://img.ruoshixunlianbao.com/bgMy_02.png',
            collShow: true,
            flag: false,
            ruoshiShow: false,
            ruoshiContent: '',
            testShow: false,
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
            timestamp: 86400,
            gameData: null,
            knowsTips: null,
            collapseValue: false,
            selectShow: false,
            testAge: '',
            parmasAge: '',
            isGrass: this.show ? this.$state().user.isGrass : '',
            shareInfo: '',
            show: false,
            vipTimeShow: false
        };
    },
    created() {
        this.getData();
    },
    onShow() {
        let tmp = this.$state().user;
        if (tmp) {
            this.show = true;
            this.vipTimeShow = true;
        } else {
            this.vipTimeShow = true;
            this.show = false;
        }
        if (uni.getStorageSync('token')) {
            this.flag = false;
            this.$loading.open();
            this.$store.dispatch('loadUser').then(
                res => {
                    if (res) {
                        this.getData();
                        this.$loading.close();
                    } else {
                        this.getData();
                    }
                },
                err => {
                    this.getData();
                    console.log(err);
                }
            );
        } else {
            this.flag = false;
            this.$store.commit('updateUser', null);
            this.getData();
            setTimeout(() => {
                this.flag = true;
            }, 10);
        }
    },
    methods: {
        upDate() {
            this.flag = false;
            this.getData();
        },
        countEnd() {
            this.getData();
        },
        goIntroduction() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/score/score-strategy' }) : this.$toast('您还未登陆，请先登陆');
        },
        isLogin() {
            if (!uni.getStorageSync('token')) {
                return false;
            } else {
                return true;
            }
        },
        async getData() {
            let data = {
                requestType: 'web'
            };
            apiPublic.getContent({ type: 23 }).then(
                res => {
                    if (res.code === 1) {
                        this.knowsTips = res.retObj;
                    }
                    console.log(res);
                }
            );
            let res;
            if (!uni.getStorageSync('token')) {
                res = await api.xcxGetGamesList();
                try {
                    if (res.code === 1) {
                        this.gameList = res.retObj.gameList;
                        this.$loading.close();
                        this.$forceUpdate();
                    }
                } catch (error) {

                }
                return;
            } else {
                res = await api.getGamesList(data);
                try {
                    if (res.code === 1) {
                        this.gameList = res.retObj.gameList;
                    }
                } catch (error) {

                }
            }
            api.getGameData({}).then(
                res => {
                    if (res.code === 1) {
                        this.gameData = res.retObj;
                        this.flag = true;
                        this.$forceUpdate();
                    }
                }
            );
        },
        collChange(e) {
            this.collShow = !this.collShow;
        },
        goScoreRecord() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/score/score-record' }) : this.$toast('您还未登陆，请先登陆');
        },
        toLog() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/training/views/training-log' }) : this.$toast('您还未登陆，请先登陆');
        },
        ruoshiClick() {
            apiPublic.getContent({ type: 30 }).then(
                res => {
                    if (res.code === 1) {
                        this.ruoshiShow = true;
                        this.ruoshiContent = res.retObj.content;
                    } else {
                        this.$toast(res.msg);
                    }
                }
            );
        },
        closePopup() {
            this.ruoshiShow = false;
        },
        goScoreShop() {
            this.isLogin() ? uni.navigateTo({ url: '/pages/score/score-shop' }) : this.$toast('您还未登陆，请先登陆');
        },
        cellClick(item) {
            if (item.isFin === 0) {
                return;
            }
            if (item.type === 1) {
                // window.location.href = item.gameUrl + '&platform=vue';
                let str = item.gameUrl.split('?')[1];
                // console.log(st);
                // str.split('=');
                uni.navigateTo({ url: `/pages/web-view/web-view?${str}&path=${item.gameUrl.split('?')[0]}` });
                return;
            }
            switch (item.id) {
                case 5:
                    uni.navigateTo({ url: '/pages/training/views/eyes-training' });
                    break;
                case 8:
                    uni.navigateTo({ url: '/pages/training/views/three-dimensional' });
                    break;
                case 6:
                    this.testShow = true;
                    // uni.navigateTo({ url: '/pages/training/views/three-dimensional' });
                    break;
                default:
                    break;
            }
            // uni.navigateTo({ url: `/pages/web-view/web-view?path=${item.gameUrl}&platform=vue` });
        },
        collapseChange(e) {
            console.log(e);
            this.collapseValue = e.show;
        },
        selectConfirm(e) {
            this.testAge = e[0].label;
            this.parmasAge = e[0].value;
        },
        radioChange(e) {
            console.log(e);
            this.isGrass = e;
        },
        goTest() {
            if (this.testAge && this.isGrass) {
                uni.navigateTo({ url: `/pages/training/views/vision-test?isGrass=${this.isGrass}&age=${this.parmasAge}` });
            } else {
                this.$toast('请完善信息');
            }
        },
        share(e) {
            !this.isLogin() ? this.$toast('您还未登陆，请先登陆') : console.log();
        }
    },
    async onPullDownRefresh() {
        this.$loading.open();
        let res = await this.$store.dispatch('loadUser');
        try {
            if (res) {
                this.$loading.close();
                uni.stopPullDownRefresh();
            } else {
                this.$loading.close();
            }
        } catch (error) {
            this.$loading.close();
        }
        this.getData();
        // if (this.isLogin) {
        //     this.loadData(false);
        // } else {
        //     uni.stopPullDownRefresh();
        // }
    },
    onShareAppMessage: function(res) {
        let data = {
            gameId: res.target.dataset.item.id
        };
        api.shareSuccess(data).then(
            res1 => {
                console.log(res1);
            }
        );
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: `来自您好友${this.$state().user.userNick}的分享！摆脱弱视，从这里开始`,
            imageUrl: res.target.dataset.item.logo,
            path: '/pages/training/index'
        };
        // shareSuccess
    }
};
</script>

<style lang="less">
page{
    // transform: translate(0,160rpx);
}
// bgMy_02.png
// /deep/ .icon_box{
//     top: 15% !important;
// }
.ruoshi_box{
    padding: 30rpx;
    width: 600rpx;
}
.training_box{
    .info_box{
        width: 100%;
        height: 476rpx;
        background-size: contain;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        .info_center{
            width: 100%;
            padding-left: 30rpx;
            display: flex;
            align-items: center;
            .avatar{
                .my_avatar{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                }
            }
            .user_info{
                flex: 1;
                padding: 0 40rpx;
                .user_info_top{
                    color: #ffffff;
                    font-size: 40rpx ;
                    font-weight: 500;
                    .nick_name{
                        font-size: 40rpx;
                    }
                    .login_now{
                        padding: 30rpx 0;
                    }
                }
                .user_info_bottom{
                    display: flex;
                    width: 80%;
                    font-size: 24rpx;
                    justify-content: space-between;
                    padding-top: 10rpx;
                    div{
                        width: 140rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 10rpx 20rpx;
                        border-radius: 60rpx;
                        border: 1rpx solid #ffffff;
                    }
                }
            }
            .login_box{
                display: flex;
                // flex: 1;
                align-items: center;
                .weixin_login /deep/ div{
                    font-size: 28rpx !important;
                    padding: 5rpx 20rpx;
                    border: 3rpx solid #ffffff;
                    color: #ffffff;
                    border-radius: 40rpx;
                    margin-left: 40rpx;
                }
            }
        }
    }
    .score_box{
        width: 94%;
        height: 160rpx;
        position: relative;
        top: -80rpx;
        z-index: 1000;
        margin: 0 auto;
        background: rgb(255, 255, 255);
        border-radius: 80rpx;
        display: flex;
        .score_num{
            color: #ff2724;
            .red_num {
                font-size: 64rpx !important;
                height: 80rpx;
            }
            padding: 10rpx 56rpx;
            :nth-child(2){
                font-size: 24rpx;
                display: flex;
                align-items: center;
                :nth-child(1){
                    color: #333333;
                    padding-right: 10rpx;
                }
                :nth-child(2){
                    width: 110rpx;
                    border: 1rpx solid #ff2724;
                    display: flex;
                    align-items: center;
                    padding: 5rpx 0;
                    border-radius: 30rpx;
                    justify-content: center;
                }
            }
        }
        .uib_bottom_right{
            color: #333333;
            font-size: 24rpx;
            display: flex;
            align-items: center;
            padding-top: 15rpx;
            z-index: 1000;
            position: relative;
            .ubr_left{
                margin-left: 10rpx;
            }
            .ubr_right{
                padding-right: 100rpx;
                padding-left: 40rpx;
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
    .count_down_box{
        background: #FCF0F2;
        width: 100%;
        z-index: -1;
        transform: translate(0,-160rpx);
        padding-top: 60rpx;
        text-align: center;
        .content_box{
            width: 90%;
            margin: 0 auto;
            padding-bottom: 40rpx;
            .content{
                color: #ff2724;
                font-size: 28rpx;
            }
            .coolapse_title{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                :nth-child(1){
                    color: #990014;
                    font-size: 27rpx;
                }
                div {
                    span{
                        color: #cc7a85 !important;
                    }
                }
            }
        }
        .cdb_title{
            color: #ff2724;
            font-size: 27rpx;
        }
        .cdb_box{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 27rpx;
            color: #333333;
            padding: 30rpx 0;
        }
    }
    .game_list{
        transform: translate(0,-160rpx);
        padding-top: 30rpx;
        background: #ffffff;
        .game_item{
            width: 90%;
            height: 200rpx;
            margin: 0 auto;
            margin-top: 5rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .game_item_middle{
                // padding-right: 2;
                padding-left: 20rpx;
                color: #333333;
                :nth-child(2){
                    color: #999999;
                    font-size: 24rpx;
                    padding-top: 20rpx;
                }
            }
            .game_item_right{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
                text-align: center;
                .game_item_right_container{
                    :nth-child(1){
                        width: 100%;
                        background: #BFBFBF;
                        color: #ffffff;
                        font-size: 28rpx;
                        border-radius: 30rpx;
                        padding: 8rpx 10rpx;
                        margin-bottom: 5rpx;
                    }
                    :nth-child(2){
                        color: #333333;
                        font-size: 24rpx;
                    }
                }
            }
        }
    }
    .my_coll{
        transform: translate(0, -160rpx);
        width: 90%;
        margin: 20rpx auto;
        .coll_title{
            display: flex;
            width: 100%;
            // padding: 0 40rpx;
            justify-content: space-between;
        }
    }
    .d_type{
        padding-top: 0;
    }
    .test_box{
        padding: 40rpx;
        width: 600rpx;
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
}
</style>
