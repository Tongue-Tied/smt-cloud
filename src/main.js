import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import Big from 'big.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import store from '@/store';
import 'dayjs/locale/zh-cn';
import '@/filter/index.js';
Vue.use(uView);
dayjs.locale('zh-cn');
dayjs.extend(objectSupport);
Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$big = Big;
Vue.prototype.$state = () => store.state;
Vue.prototype.$toast = message => uni.showToast({ title: String(message), icon: 'none', duration: 3000 });
Vue.prototype.$loading = {
    open: () => uni.showLoading({ mask: true }),
    close: () => uni.hideLoading()
};
App.mpType = 'app';
const app = new Vue({
    ...App,
    store
});
// #ifdef H5
// import excludeRoutes from '@/mixins/exclude-routes.js';
async function init() {
    // try {
    //     await store.dispatch('loadUser');
    // } catch (e) {
    //     if (excludeRoutes.indexOf(window.location.hash.split('?')[0]) == -1) {
    //         uni.reLaunch({ url: '/pages/login/login' });
    //     }
    //     console.error(e);
    // }
    app.$mount();
}
init();
// #endif
// #ifndef H5
app.$mount();
// #endif
