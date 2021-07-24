import request from './request.js';

export default {
    getGamesList(data) {
        return request.post('/api/getGamesList', data);
    }
};
