import request from './request.js';
export default {
    auth(data) {
        return request.post('/api/login', data);
    },
    getUserInfo(data) {
        return request.post('/api/getUserInfo', data);
    },
    getBindWxOpenid(data) {
        return request.post('/api/getBindWxOpenid', data);
    }
};
