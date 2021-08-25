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
    },
    wxLogin(data) {
        return request.post('/api/wxLogin', data);
    },
    threeLogin(data) {
        return request.post('/api/threeLogin', data);
    },
    updateUserInfo(data) {
        return request.post('/api/updateUserInfo', data);
    },
    sendCode(data) {
        return request.post('/api/sendCode', data);
    },
    register(data) {
        return request.post('/api/register', data);
    }
};
