import request from './request.js';

export default {
    // 未读消息数量统计
    getRemindStatistics() {
        return request.get('/api/cloudLiteMessageRemind/remindStatistics');
    },
    // 清除未读消息
    unreadCloudLiteMessageRemind(messageType) {
        return request.put(`/api/cloudLiteMessageRemind/clear/unread/${messageType}`);
    },
    // 查询订单变更提醒列表
    searchOrderChangeRemind(data) {
        return request.post('/api/cloudLiteOrderChangeRemind/search', data);
    },
    // 查询预约代办提醒
    searchAppointmentRemind(data) {
        return request.post('/api/cloudLiteMessageRemind/search/appointmentRemind', data);
    },
    // 事件消息提醒
    eventMessage(data) {
        return request.post('/api/cloudLiteMessageRemind/search/eventMessage', data);
    }
};
