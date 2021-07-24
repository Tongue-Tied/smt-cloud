import request from './request.js';
export default {
    getList(data) {
        return request.post('/api/cloudLiteCardDefine/search', data);
    },
    cloudLiteCardDefine(id) {
        return request.get(`/api/cloudLiteCardDefine/${id}`);
    },
    modifyCard(data) {
        return request.put('/api/cloudLiteCardDefine', data);
    },
    addCard(data) {
        return request.post('/api/cloudLiteCardDefine', data);
    },
    deleteCard(id) {
        return request.delete(`/api/cloudLiteCardDefine/${id}`);
    },
    stopSellCard(id) {
        return request.get(`/api/cardDefine/status/${id}/2`);
    },
    reSellCard(id) {
        return request.get(`/api/cardDefine/status/${id}/1`);
    },
    cloudLiteServiceItem(data) {
        return request.post('/api/cloudLiteServiceItem/search', data);
    },
    serviceItem(data) {
        return request.post('/api/serviceItem/search', data);
    },
    // 员工管理
    staffList(positionStatus) {
        return request.get(`/api/cloudLiteEmployee/list/${positionStatus}`);
    },
    staffDetail(id) {
        return request.get(`/api/cloudLiteEmployee/${id}`);
    },
    modifyStaff(data) {
        return request.put('/api/cloudLiteEmployee', data);
    },
    addStaff(data) {
        return request.post('/api/cloudLiteEmployee', data);
    },
    avatarUpload(data) {
        return request.post('/api/file', data);
    }
};
