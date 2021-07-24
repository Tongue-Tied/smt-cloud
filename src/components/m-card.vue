<template>
    <view class="m-card-panel"
          :class="{'mcp-circle': circle}">
        <slot></slot>
    </view>
</template>
<script>
export default {
    props: {
        circle: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
.m-card-panel {
    box-shadow: @m-box-shadow;
    background-color: white;
    padding: 30rpx;
    &.mcp-circle {
        border-radius: 20rpx;
    }
}
</style>
