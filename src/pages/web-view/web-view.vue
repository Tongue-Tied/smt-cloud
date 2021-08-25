<template>
    <div>
        <web-view :src="path"></web-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            path: ''
        };
    },
    onLoad(e) {
        if (e) {
            this.path = e.path + `?uid=${e.uid}&token=${e.token}&appid=${e.appid}&platform=wxMiniApp`;
            console.log(e);
        }
    }
};
</script>
<style lang="less">

</style>
