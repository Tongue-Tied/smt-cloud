<template>
    <div class="score_strategy">
        <div v-html="item.content" v-for="(item, index) in arr" :key="index"></div>
    </div>
</template>

<script>
import api from '@/services/api.index.js';
export default {
    data() {
        return {
            arr: []
        };
    },
    created() {
        let data = {
            pid: 4
        };
        api.getSocreStrategy(data).then(
            res => {
                this.arr = res.retArr;
            }
        );
    }
};
</script>
<style lang="less">
page{
    background: #ffffff;
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
}
.score_strategy{
    width: 90%;
    margin: 0 auto;
    font-size: 24rpx !important;
    color: #333333 !important;
    /deep/ p{
        padding-top: 10rpx !important;
    }
    div{
        width: 100%;
    }
    /deep/ img{
        width: 100%;
    }
}
</style>
