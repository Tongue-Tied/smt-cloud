import request from './request.js';

export default {
    // 获取内容
    getContent(data) {
        return request.post('/api/getContent', data);
    },
    getHelp(data) {
        return request.post('/api/getHelp', data);
    },
    updateUserInfo(data) {
        return request.post('/api/updateUserInfo', data);
    },
    teacher(data) {
        return request.post('/api/teacher', data);
    },
    uploadImg(data) {
        return request.post('/api/uploadImg', data);
    },
    getOrderList(data) {
        return request.post('/api/getOrderList', data);
    },
    getOrderinfo(data) {
        return request.post('/api/getOrderinfo', data);
    },
    exchangeCode(data) {
        return request.post('/api/getOrderinfo', data);
    },
    addLeaveMsg(data) {
        return request.post('/api/addLeaveMsg', data);
    },
    sendCode(data, p) {
        return request.post('/api/sendCode', data, p);
    },
    selectUserByPhone(data) {
        return request.post('/api/selectUserByPhone', data);
    },
    updatePhone(data) {
        return request.post('/api/updatePhone', data);
    },
    zhPassword_check(data) {
        return request.post('/api/zhPassword_check', data);
    },
    updatePwd(data) {
        return request.post('/api/updatePwd', data);
    },
    getGameCalendar(data) {
        return request.post('/api/getGameCalendar', data);
    },
    getGameLog(data) {
        return request.post('/api/getGameLog', data);
    },
    getSocreStrategy(data) {
        return request.post('/api/getSocreStrategy', data);
    },
    bindPhone(data) {
        return request.post('/api/bindPhone', data);
    },
    cardList(data) {
        return request.post('/api/cardList', data);
    },
    operCardOrder(data) {
        return request.post('/api/operCardOrder', data);
    },
    payOrder(data) {
        return request.post('/api/payOrder', data);
    },
    getMsgList(data) {
        return request.post('/api/getMsgList', data);
    },
    getMsgInfo(data) {
        return request.post('/api/getMsgInfo', data);
    },
    cancellationUser(data) {
        return request.post('/api/cancellationUser', data);
    },
    zhPassword(data) {
        return request.post('/api/zhPassword', data);
    },
    shareConfigData(data) {
        return request.post('/api/shareConfigData', data);
    }
};
