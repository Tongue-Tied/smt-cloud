<script>
export default {
    onLaunch() {
        // #if MP-WEIXIN
        console.log(2);
        // eslint-disable-next-line no-undef
        wx.cloud.init({
            traceUser: true,
            env: 'ruoshibao-9gied7f3a7fe35ad'
        });
        // eslint-disable-next-line no-undef
        // console.log(wx.cloud.CloudID());
        // eslint-disable-next-line no-undef
        // wx.cloud.callFunction({
        //     name: 'message'
        // }).then(console.log);
        // #endif
    },
    onShow() {
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
@import '~@/styles/style.less';
</style>
