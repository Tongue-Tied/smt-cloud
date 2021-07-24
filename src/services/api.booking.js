import request from './request.js';

export default {
    // 查询项目列表
    async getBookingTable(data) {
        return request.post('/api/cloudLiteAppointment/searchTimeSheet', data);
    },
    // 上次预约
    memberLastConsume(memberId) {
        return request.get(`/api/member/detail/${memberId}`);
    },
    // 会员详情
    cloudLiteMemberDetail(memberId) {
        return request.get(`/api/cloudLiteMember/${memberId}`);
    },
    // 预约列表
    getBookingList(data) {
        return request.post('/api/cloudLiteAppointment/search', data);
    },
    // 预约详情
    getBookingDetail(id) {
        return request.get(`/api/cloudLiteAppointment/${id}`);
    },
    // 预约
    cloudLiteAppointment(data) {
        let url = '/api/cloudLiteAppointment';
        if (data.appointmentId) {
            return request.put(url, data);
        } else {
            return request.post(url, data);
        }
    },
    // 判断员工指定时间是否可预约
    checkAppointment(data) {
        return request.post('/api/cloudLiteAppointment/batchEmployeeOccupy', data);
    },
    // 渠道列表
    getSources(status) {
        var url = `/api/cloudLiteSource/getSourceListByStatus/${status}`;
        return request.get(url);
    },
    // 取消预约
    cancelAppointment(appointmentId) {
        var url = `/api/cloudLiteAppointment/cancelAppointment/${appointmentId}`;
        return request.put(url);
    },
    // 已到店
    arrivedStore(appointmentId) {
        var url = `/api/cloudLiteAppointment/arrivedStore/${appointmentId}`;
        return request.put(url);
    }
};
