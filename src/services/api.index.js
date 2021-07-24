import request from './request.js';
export default {
    index(data) {
        return request.post('/api/index', data);
    },
    getMyScoreList(data) {
        return request.post('/api/getMyScoreList', data);
    },
    getSocreStrategy(data) {
        return request.post('/api/getSocreStrategy', data);
    },
    cardList(data) {
        return request.post('/api/cardList', data);
    },
    getGoodsListShare(data) {
        return request.post('/api/getGoodsListShare', data);
    },
    operScoreShopOrder(data) {
        return request.post('/api/operScoreShopOrder', data);
    }
};
