<template>
    <div class="order_details" v-if="flag">
        <div class="order_header">
            <div class="address_box">
                <div>
                    <u-icon name="map-fill" color="#FF2250" size="46"></u-icon>
                </div>
                <div style="padding-left:10rpx">
                    <div>
                        <span class="" style="font-weight:500;color:#333333">{{result.order.shName}}</span>
                        <span style="color:#999999;font-size:26rpx;padding-left:10rpx">{{result.order.phone}}</span>
                    </div>
                    <div style="color:#333333;padding:30rpx 0 20rpx 0">
                        {{result.order.address}}
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="c_top u-flex" v-for="(goodsLists,index) in options.list" :key="index">
                <!-- <div v-for="(goodsLists,goodsIndex) in item.goodsClassifyList" :key="goodsIndex" class="c_top_item"> -->
                    <div>
                        <image mode="widthFix" style="width:160rpx;height:160rpx;border-radius:30rpx" :src="goodsLists.img"></image>
                    </div>
                    <div class="u-flex c_top_right">
                        <div class="u-p-r-30" style="padding-right:30rpx">
                            <div class="title" style="font-size:24rpx;color:#333333">{{goodsLists.title || goodsLists.productType}}</div>
                            <div style="font-size:24rpx;color:#999999;padding-top:10rpx">颜色分类: {{goodsLists.color}}</div>
                            <div style="font-size:24rpx;color:#999999;padding-top:10rpx">尺码: {{goodsLists.size || goodsLists.productSize}}</div>
                        </div>
                        <div class="price_box">
                            <div style="font-size:24rpx;">¥{{goodsLists.classifyPrice || goodsLists.price}}</div>
                            <div style="font-size:24rpx;padding-top:10rpx" class="u-p-t-10">¥{{goodsLists.classifyPriceTemp || goodsLists.origPrice}}</div>
                            <div style="font-size:24rpx;padding-top:10rpx" class="u-p-t-10">x{{goodsLists.count || goodsLists.number}}</div>
                        </div>
                    </div>
                <!-- </div> -->
            </div>
            <div class="flex-between u-p-t-10" style="color:#999999;padding-top:10rpx">
                <span>总价</span>
                <span>¥{{options.totalPrice}}</span>
            </div>
            <div style="color:#999999;padding-top:10rpx" class="u-p-t-10 flex-between">
                <span>优惠</span>
                <span>¥{{options.discount}}</span>
            </div>
            <div class="flex-between u-p-t-10" style="padding-top:10rpx">
                <span style="color:#333333">实付款</span>
                <span style="color:#ff2724">¥{{options.price}}</span>
            </div>
            <div class="order_info u-p-t-60" style="padding-top:60rpx">
                <div class="order_item u-p-t-20" style="padding-top:20rpx">
                    <span>订单编号</span>
                    <span>{{result.order.no}}</span>
                    <span @click="copy(result.order.no)">复制</span>
                </div>
                <div class="order_item u-p-t-20" style="padding-top:20rpx">
                    <span>购买时间</span>
                    <span>{{result.order.createTime}}</span>
                </div>
                <div class="order_item u-p-t-20" style="padding-top:20rpx">
                    <span>发货单号</span>
                    <span>{{result.order.logistics || ''}}</span>
                    <span @click="copy(result.order.logistics)">复制</span>
                </div>
            </div>
            <div class="footer">
                <div class="foot_item" @click="show = true">
                    <image style="width:60rpx;height:60rpx;" :src="msgIcon"></image>
                    <div class="u-p-l-10" style="padding-left:10rpx">
                        <div>在线留言</div>
                        <div class="u-p-t-5" style="padding-top:5rpx">{{onlineMsg.content}}</div>
                    </div>
                </div>
                <div class="foot_item">
                    <image style="width:60rpx;height:60rpx;" :src="phoneIcon"></image>
                    <div class="u-p-l-10" style="padding-left:10rpx">
                        <div>热线电话</div>
                        <div @click="tel(hotLine.content)" style="padding-top:5rpx" class="u-p-t-5 hotline">{{hotLine.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <mPopup :show="show" @closePopup="closePopup" @updateUser="updateMsg" :title="'在线留言'">
            <div class="fk_box">
                <div class="input_box">
                    <input v-model="name" placeholder="姓名" type="text">
                </div>
                <div class="input_box">
                    <input v-model="phone" placeholder="电话" type="text">
                </div>
                <div class="input_box text_area" style="margin:0 auto">
                    <textarea maxlength="50" v-model="msg" placeholder-style="color:#333333;" placeholder="留言"></textarea>
                    <div>{{msg.length || 0}}/50</div>
                </div>
            </div>
        </mPopup> -->
        <mMsg @success="show = false" @closeMsg="show = false" :show="show" />
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.public.js';
import mMsg from '@/components/m-msg';
export default {
    data() {
        return {
            id: '',
            result: null,
            msgIcon: require('@/static/imgs/my/icon1.3ed2f30d.png'),
            phoneIcon: require('@/static/imgs/my/icon2.59784eaa.png'),
            hotLine: null,
            onlineMsg: null,
            name: '',
            phone: '',
            msg: '',
            show: false,
            flag: false,
            goodsLists: [],
            options: null
        };
    },
    components: {
        mMsg
    },
    onLoad(e) {
        if (e) {
            this.id = e.id;
            this.options = e;
            this.options.list = JSON.parse(this.options.list);
            console.log(this.options);
        }
    },
    mounted() {
        let data = {
            orderId: this.id
        };
        api.getOrderinfo(data).then(
            res => {
                this.result = res.retObj;
                this.goodsLists = res.retObj.goodsLists;
                let arr = [];
                for (let i = 0; i < this.goodsLists.length; i++) {
                    console.log(arr.indexOf(this.goodsLists[i].id));
                    if (arr.indexOf(this.goodsLists[i].id) < 0) {
                        arr.push(this.goodsLists[i].id);
                    } else {
                        this.goodsLists.splice(i, 1);
                    }
                }
                console.log(this.goodsLists);
                this.flag = true;
            }
        );
        this.getContent(12);
        this.getContent(9);
    },
    methods: {
        getContent(type) {
            api.getContent({ type: type }).then(
                res => {
                    if (type === 12) {
                        this.hotLine = res.retObj;
                    } else if (type === 9) {
                        this.onlineMsg = res.retObj;
                    }
                }
            );
        },
        success() {
            this.show = false;
        },
        tel(e) {
            uni.makePhoneCall({
                phoneNumber: e // 仅为示例
            });
        },
        copy(e) {
            let that = this;
            uni.setClipboardData({
                data: e, // 要被复制的内容
                success: function() {
                    // 重点~做笔记
                    // 在success中加入uni.hideToast()可以解决
                    that.$toast('复制成功');
                    // 以下就可自定义操作了~
                },
                fail: function(err) {
                    that.$toast('复制失败');
                }
            });
        },
        updateMsg(e) {
            if (e) {
                let data = {
                    name: this.name,
                    phone: this.phone,
                    content: this.msg
                };
                api.addLeaveMsg(data).then(
                    res => {
                        if (res.code === 1) {
                            this.show = false;
                            this.name = '';
                            this.phone = '';
                            this.msg = '';
                        }
                        this.$toast(res.msg);
                    },
                    err => {
                        this.$toast(err.msg || '留言失败，请重试');
                    }
                );
            }
        },
        closePopup(e) {
            console.log(e);
            this.show = false;
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.order_details{
    div,span{
        font-size: 28rpx;
    }
    .order_header{
        padding: 40rpx;
        border-top: 2rpx solid #f5f5f5;
        border-bottom: 14rpx solid #f5f5f5;
        background: #ffffff;
        .address_box{
            display: flex;
        }
    }
    .content{
        background: #ffffff;
        padding: 30rpx 40rpx;
        .c_top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20rpx;
            .c_top_item{
                display: flex;
                flex-wrap: nowrap;
                padding-bottom: 20rpx;
            }
            .c_top_right{
                padding-left: 20rpx;
                display: flex;
                flex: 1;
                justify-content: space-between;
                align-items: flex-start;
                .price_box{
                    text-align: right;
                    :nth-child(1){
                        color: #333333;
                    }
                    :nth-child(2){
                        color: #999999;
                        text-decoration: line-through;
                    }
                    :nth-child(3){
                        color: #999999;
                    }
                }
                .title{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
        .flex-between{
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .order_item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333333;
            :nth-child(3){
                color: #ff2724;
            }
            :nth-child(2){
                flex: 1;
                padding-left: 20rpx;
            }
        }
        .footer{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333333;
            margin-top: 60rpx;
            .foot_item{
                width: 45%;
                background: #f5f5f5;
                border-radius: 20rpx;
                padding: 30rpx 0rpx 30rpx 40rpx;
                display: flex;
                align-items: center;
                margin-right: 20rpx;
                .hotline{
                    text-decoration: underline;
                }
            }
        }
    }
    .fk_box{
        background: #ffffff;
        padding-top: 30rpx;
        .input_box{
            width: 80%;
            background: #f3f3f3;
            border-radius: 40rpx;
            height: 80rpx;
            margin: 0 auto;
            margin-bottom: 30rpx;
            input{
                padding-left: 20rpx;
                width: 100%;
                height: 100%;
            }
            textarea{
                padding: 20rpx;
                width: 90%;
                overflow: hidden;
            }
        }
        .text_area{
            height: 240rpx;
            position: relative;
            font-size: 28rpx;
            div{
                position: absolute;
                bottom: 20rpx;
                right: 0;
            }
        }
    }
    /deep/ .icon_box{
        top: 12% !important;
    }
    .h-popup /deep/ .u-drawer{
            overflow: visible!important;
            .u-drawer-content{
                overflow: visible!important;
                display: flex;
                .u-mode-center-box{
                    background-color: #99999900!important;
                    overflow: visible!important;
                }
                .uni-scroll-view{
                    overflow: visible!important;
                }
            }
    }
}
</style>
