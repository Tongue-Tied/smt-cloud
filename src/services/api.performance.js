import request from './request.js';

export default {
    getList(data) {
        return request.post('/api/cloudLiteReport/show', data);
    },
    getDetailInfo(data) {
        return request.post('/api/cloudLiteEmployeePerformance', data);
    }
};
