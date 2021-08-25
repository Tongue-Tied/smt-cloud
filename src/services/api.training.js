import request from './request.js';

export default {
    getGamesList(data) {
        return request.post('/api/getGamesList', data);
    },
    getGameEyeList(data) {
        return request.post('/api/getGameEyeList', data);
    },
    getGameData(data) {
        return request.post('/api/getGameData', data);
    },
    getVisionEList() {
        return request.post('/api/getVisionEList');
    },
    getVisualResult(data) {
        return request.post('/api/getVisualResult', data);
    },
    getVisionEDu(data) {
        return request.post('/api/getVisionEDu', data);
    },
    xcxGetGamesList(data) {
        return request.post('/api/xcxGetGamesList', data);
    },
    shareSuccess(data) {
        return request.post('/api/shareSuccess', data);
    }
};
