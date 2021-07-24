<template>
    <view class="m-nav-bar"
          :class="{'m-nav-bar-shadow': shadow}"></view>
</template>
<script>
export default {
    name: 'mnavbar',
    mixins: [],
    props: {
        shadow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    components: {},
    computed: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
.m-nav-bar {
    position: fixed;
    left: 0;
    top: -10rpx;
    right: 0;
    z-index: 1;
    height: 10rpx;
    /* #ifndef MP-WEIXIN */
    top: 78rpx;
    /* #endif */
    &-shadow {
        box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    }
}
</style>
