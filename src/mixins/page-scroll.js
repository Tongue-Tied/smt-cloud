export default {
    data() {
        return {
            mPageScrollTop: 0
        };
    },
    onPageScroll(e) {
        this.mPageScrollTop = e.scrollTop;
    }
};
