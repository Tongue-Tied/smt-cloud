<script>
export default {
    onLaunch() {
        // if (!uni.getStorageSync('token')) {

        // }
        try {
            uni.getStorageSync('token');
        } catch (error) {
            uni.navigateTo('/pages/login/login');
        }
    },
    onLoad() {

    },
    onShow() {
    },
    onBackPress(e) {
        console.log(e);
    },
    onHide() {}
};
</script>
<style lang="scss">
/*每个页面公共css */
/* #ifndef APP-PLUS-NVUE */
@import 'uview-ui/index.scss';
/* #endif */
</style>
<style lang="less">

*{
    font-size:28rpx
}
@import '~@/styles/style.less';
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
</style>
