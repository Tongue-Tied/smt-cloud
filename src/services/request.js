import Vue from 'vue';
function request(method, url, data) {
    // 加密
    return new Promise((resolve, reject) => {
        if (!data) {
            data = {};
        }
        if (uni.getStorageSync('token')) {
            data._token_ = uni.getStorageSync('token');
        }
        if (uni.getStorageSync('uid')) {
            data._uid_ = uni.getStorageSync('uid');
        }
        uni.request({
            // #ifdef H5
            url: url,
            // #endif
            // #ifndef H5
            // eslint-disable-next-line
            url: Vue.prototype.$state().config.url + url,
            // #endif
            header: {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                // _token_: uni.getStorageSync('token') ? ` ${uni.getStorageSync('token')}` : '',
                // _uid_: ''
            },
            data: data,
            method,
            success(res) {
                if (res.data.code !== 44003) {
                    resolve(res.data);
                } else {
                    Vue.prototype.$toast(res.data.msg);
                    setTimeout(function() {
                        uni.clearStorage();
                        uni.reLaunch({
                            url: '/pages/login/login'
                        });
                    }, 3000);
                }
            },
            fail(err) {
                console.log(err);
                reject({});
            }
        });
    });
}
const def = function(url, data) {
    return request('GET', url, data);
};
['GET', 'POST', 'PUT', 'DELETE'].forEach(method => {
    def[method.toLowerCase()] = (url, data) => {
        return request(method, url, data);
    };
});
export default def;
