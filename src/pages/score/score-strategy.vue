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
                for (let i = 0; i < this.arr.length; i++) {
                    // eslint-disable-next-line no-useless-escape
                    this.arr[i].content = this.arr[i].content.replace(/\<img/gi, '<img class="rich-img"');
                }
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
    rich-text .rich-img {
        width: 100% !important;
        height: auto ;
    }
}
</style>
