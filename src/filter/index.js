import Vue from 'vue';
import * as config from '@/config/index.js';

Vue.filter('dateFormat', function(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    return Vue.prototype.$dayjs(date).format(fmt);
});

Vue.filter('mSrc', function(value, def, q = 75) {
    if (value) {
        if (Number(value) > 0) {
            return Vue.prototype.$state().config.url + Vue.prototype.$state().config.SPLIT_IMG_PATH + `${value}/${q}`;
        } else {
            return value;
        }
    } else if (def) {
        return Vue.filter('oss')(def);
    }
});

Vue.filter('thumb', function(value, w = 200, h = 200) {
    if (value) {
        if (Number(value) > 0) {
            return `${Vue.prototype.$state().config.url}${Vue.prototype.$state().config.SPLIT_IMG_PATH}${value}/${w}/${h}`;
        }
        return Vue.filter('oss')(value);
    }
    return value;
});
Vue.filter('imageUrl', function(url, chat) {
    if (url === 'dev') {
        chat = `https://ruoshibao.dev.cn/upload/img${url}`;
    } else if (url === 'test') {
        chat = `https://ruoshibao.test.cn/upload/img${url}`;
    } else {
        chat = `https://ruoshibao.cn/upload/img${url}`;
    }
    return;
});
/**
 *
 * 12345 => $12,345.00
 *
 * @param {String} sign
 * @param {Number} decimals Decimal places
 */
Vue.filter('currency', function(value, currency, decimals) {
    var digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? currency : '￥';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

Vue.filter('fen2yuan', function(value) {
    if (!value) {
        return 0;
    }
    return +new Vue.prototype.$big(value).div(100);
});

Vue.filter('yuan2fen', function(value) {
    if (!value) {
        return 0;
    }
    return +new Vue.prototype.$big(value).mul(100);
});

Vue.filter('getName', function(value, arr, key = 'name', val = 'value') {
    if (value === undefined || value === null || !arr || arr.length < 1) {
        return;
    }
    const obj = arr.find(item => {
        return item[val] == value;
    });
    if (obj && obj[key]) {
        return obj[key];
    }
});

Vue.filter('hasData', function(value, arr, val = 'value') {
    if (value === undefined || value === null || !arr || arr.length < 1) {
        return;
    }
    const obj = arr.find(item => {
        return item[val] == value;
    });
    if (obj) {
        return true;
    } else {
        return false;
    }
});

Vue.filter('verifyPhone', function(val) {
    var regPhone = /^1\d{10}$/;
    return regPhone.test(val);
});

Vue.filter('oss', function(value) {
    /* eslint-disable */
    // #ifdef H5
    return '/static/h5/oss/' + value;
    // #endif
    return config[process.env.VUE_APP_ENV || 'dev'].OSS_IMG_PATH + value;
    /* eslint-enable */
});

Vue.filter('couponDate', function(date) {
    var text = '';
    if (!date) {
        return;
    }
    var rules = [];
    if (date.startTimeRule) {
        rules[0] = date.startTimeRule;
        rules[1] = date.endTimeRule;
    } else {
        return;
    }
    if (rules[0] == 1 && rules[1] == 1) {
        text = '不限时长';
    } else {
        if (rules[0] == 1) {
            if (date.startDate) {
                text += Vue.prototype.$dayjs(date.startDate).format('YYYY-MM-DD');
            } else {
                text += '购买日期';
            }
        } else if (rules[0] == 2) {
            if (date.startDate) {
                text += Vue.prototype.$dayjs(date.startDate).format('YYYY-MM-DD');
            } else {
                text += '首次使用时间';
            }
        } else if (rules[0] == 3) {
            text += Vue.prototype.$dayjs(date.startDate).format('YYYY-MM-DD');
        } else {
            text += Vue.prototype.$dayjs(date.startDate).format('YYYY-MM-DD');
        }
        // text +=' 至 '
        if (rules[1] == 1) {
            text += ' 后生效';
        } else if (rules[1] == 2) {
            if (date.endDate) {
                text += ' 至 ' + Vue.prototype.$dayjs(date.endDate).format('YYYY-MM-DD');
            } else if (date.endTimeAmount) {
                text += ' 起 ' + date.endTimeAmount;
                if (date.endTimeUnit == 1) {
                    text += '年';
                } else if (date.endTimeUnit == 2) {
                    text += '月';
                } else if (date.endTimeUnit == 3) {
                    text += '日';
                }
                text += '内有效';
            } else {
                text += '???';
            }
        } else if (rules[1] == 3) {
            text += ' 至 ' + Vue.prototype.$dayjs(date.endDate).format('YYYY-MM-DD');
        } else {
            text += ' 至 ' + Vue.prototype.$dayjs(date.endDate).format('YYYY-MM-DD');
        }
    }
    return text;
});

// 分转万
Vue.filter('fen2wan', function(value, desc, currency, decimals) {
    if (!value) {
        return Vue.filter('currency')(value, currency, decimals);
    };
    let val = Number(value);
    let des = desc || 'w';
    if (val >= 1000000) {
        let price = Vue.prototype.$big(val).div(10000);
        return Vue.filter('currency')(+new Vue.prototype.$big(price).div(100), currency, decimals) + des;
    } else {
        let price = Vue.filter('fen2yuan')(val);
        return Vue.filter('currency')(price, currency, decimals);
    }
});

// 折扣
Vue.filter('discount', value => {
    if (value) {
        return +new Vue.prototype.$big(value).div(10);
    }
    return 0;
});
