import request from './request.js';

export default {
    // 服务小计列表
    getServiceList(data) {
        return request.post('/api/messageSubtotal/search', data);
    },
    // 服务小计详情
    getServiceRecord(serviceId) {
        return request.get(`/api/messageSubtotal/${serviceId}`);
    },
    // 新增服务小计
    addService(data) {
        return request.post('/api/messageSubtotal', data);
    },
    // 修改服务小计
    editService(data) {
        return request.put('/api/messageSubtotal', data);
    },
    // 当前登录人能看到的员工列表
    getcloudLiteEmployee(status) {
        return request(`/api/cloudLiteEmployee/getEmployeeListByRole/${status}`);
    }
};
