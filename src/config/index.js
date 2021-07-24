/**
 * 使用 this.$store.state.config 或者 {{$state().config}} 来访问该对象
 */
const base = {
    SPLIT_IMG_PATH: '',
    OSS_IMG_PATH: '',
    // 主题色
    COLOR: '#ffffff',
    LOAD_TEXT: {
        loading: '努力加载中',
        nomore: '我是有底线的',
        loadmore: '上拉加载更多'
    }
};

// dev
export const dev = {
    env: 'dev',
    url: 'https://app.ruoshixunlianbao.com',
    wechatUrl: 'https://assistant.dev.mei1.info',
    kfUrl: 'https://ukefu.test.mei1.info',
    appid: 'wx6db2e40f820b9c1d',
    ...base
};
// test
export const test = {
    env: 'test',
    url: 'https://app.ruoshixunlianbao.com',
    wechatUrl: 'https://assistant.mei1.info',
    kfUrl: 'https://ukefu.test.mei1.info',
    appid: 'wx6db2e40f820b9c1d',
    ...base
};
// prod
export const prod = {
    env: 'prod',
    url: 'https://app.ruoshixunlianbao.com',
    wechatUrl: 'https://wxbus.mei1.com',
    kfUrl: 'https://se.mei1.com',
    appid: 'wx6db2e40f820b9c1d',
    ...base
};
