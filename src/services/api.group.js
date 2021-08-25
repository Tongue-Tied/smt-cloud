import request from './request.js';
export default {
    getGroupList(data) {
        return request.post('/api/getGroupList', data);
    },
    getGroupInfo(data) {
        return request.post('/api/getGroupInfo', data);
    },
    operGroupOrder(data) {
        return request.post('/api/operGroupOrder', data);
    },
    payOrder(data) {
        return request.post('/api/payOrder', data);
    },
    getMyGroupList(data) {
        return request.post('/api/getMyGroupList', data);
    },
    getMyGroupInfo(data) {
        return request.post('/api/getMyGroupInfo', data);
    },
    getSocreStrategy(data) {
        return request.post('/api/getSocreStrategy', data);
    },
    getContent(data) {
        return request.post('/api/getContent', data);
    }
};
