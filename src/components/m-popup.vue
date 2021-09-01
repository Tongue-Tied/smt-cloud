<template>
        <u-popup v-model="show" negative-top="-40" z-index="1000000" :closeable="true" close-icon-size="60" close-icon="close-circle" close-icon-color="#ffffff" @close="close" class="h-popup" :custom-style="{background:'#99999900'}" mode="center">
            <div class="popup_container" :style="contentStyle">
                <div class="title_img" v-if="imgUrl">
                    <image mode="widthFix" :style="imgStyle" :src="imgUrl"></image>
                </div>
                <div class="header" :style="[{backgroundImage:'url('+ (bgUrl!=='' ? bgUrl : backImg) + ')'},{backgroundColor: headerBg ? '#ffffff' : 'none'}]">
                        <div :style="myStyle ? myStyle : !subTitle ? 'padding-top:50rpx' : 'padding-top:20rpx'">{{title}}</div>
                        <div v-if="subTitle">{{subTitle}}</div>
                </div>
                <div class="middle">
                    <!-- <div class="input_box">
                        <input v-model="userName" type="text">
                    </div>
                    <div class="tips">
                        仅限字母、数字、下划线
                    </div> -->
                    <slot></slot>
                </div>
                <div class="footer">
                    <div @click="updateUser">{{btnText}}</div>
                </div>
            </div>
            <!-- <div class="icon_box" :style="{top: top}" @click="close">
                <u-icon size="60" color="#ffffff" name="close-circle"></u-icon>
            </div> -->
        </u-popup>
</template>
<script>
export default {
    data() {
        return {
            backImg: require('@/static/imgs/score/cloud.png')
        };
    },
    props: {
        show: Boolean,
        title: String,
        subTitle: {
            type: String,
            default: ''
        },
        top: {
            type: String,
            default: '25%'
        },
        btnText: {
            type: String,
            default: '确定'
        },
        myStyle: {
            type: String,
            default: ''
        },
        imgUrl: {
            type: String,
            default: ''
        },
        imgStyle: {
            type: String,
            default: ''
        },
        contentStyle: {
            type: String,
            default: ''
        },
        bgUrl: {
            type: String,
            default: ''
        },
        headerBg: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close() {
            this.$emit('closePopup', false);
        },
        updateUser() {
            this.$emit('updateUser', true);
        }
    }
};
</script>
<style lang="less">
// .u-mode-center-box.data-v-52d4ddd1 {
//   min-width: 100rpx;
//   min-height: 100rpx;
//   display: block;
//   position: relative;
//   background-color: #ffffff;
// }
// /deep/ .u-drawer.data-v-52d4ddd1 {
//             overflow: visible!important;
//             background: chartreuse!important;
//             .u-drawer-content {
//                 overflow: visible!important;
//                 display: flex;
//                 .u-mode-center-box{
//                     background-color: #99999900!important;
//                     overflow: visible!important;
//                 }
//                 .uni-scroll-view{
//                     overflow: visible!important;
//                 }
//             }
//         }
    .h-popup /deep/ .u-drawer{
            overflow: visible!important;
            .u-drawer-content{
                overflow: visible!important;
                display: flex;
                // transform: translate(0,calc(env(safe-area-inset-bottom)));
                .u-mode-center-box{
                    background-color: #99999900!important;
                    overflow: visible!important;
                }
                .uni-scroll-view{
                    overflow: visible!important;
                }
            }
    }
    .popup_container{
        z-index: 1000000000!important;
        overflow: visible !important;
        .title_img{
            width: 600rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate(0,50%);
            z-index: 100000000000000!important;
            image{
                width: 120rpx;
            }
        }
        .header{
            height: 200rpx;
            background-position: top;
            background-size: 100%,50%;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            border-top-left-radius: 70rpx;
            border-top-right-radius: 70rpx;
            justify-content: flex-start;
            align-items: center;
            color: #ffffff;
            font-weight: 500;
            // position: relative;
            overflow: visible;
            :nth-child(1){
                font-size: 40rpx;
                // margin-top: 20rpx;
            }
            :nth-child(2){
                font-size: 26rpx;
                font-weight: normal;
            }
        }
        .middle{
            width: 100%;
            background: #ffffff;
            .input_box{
                width: 80%;
                height: 90rpx;
                background: #f5f5f5;
                margin: 0 auto;
                display: flex;
                align-items: center;
                border-radius: 50rpx;
                input{
                    height: 100%;
                    width: 100%;
                    padding-left: 20rpx;
                }
            }
            .tips{
                width: 100%;
                padding-top: 40rpx;
                text-align: center;
            }
        }
        .footer{
            width: 600rpx;
            height: 200rpx;
            background: #ffffff;
            margin: 0 auto;
            border-bottom-left-radius: 70rpx;
            border-bottom-right-radius: 70rpx;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            div{
                width: 80%;
                font-size: 32rpx;
                height: 100rpx;
                margin: 0 auto;
                background: #ff2724;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50rpx;
            }
        }
    }
</style>
