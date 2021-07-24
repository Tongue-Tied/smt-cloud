import request from './request.js';
export default {
    getGoodsList(data) {
        return request.post('/api/getGoodsList', data);
    },
    getGoodsInfo(data) {
        return request.post('/api/getGoodsInfo', data);
    },
    carList(data) {
        return request.post('/api/carList', data);
    },
    delCar(data) {
        return request.post('/api/delCar', data);
    },
    addReceivingAddress(data) {
        return request.post('/api/addReceivingAddress', data);
    },
    operGoodsOrder(data) {
        return request.post('/api/operGoodsOrder', data);
    },
    payOrder(data) {
        return request.post('/api/payOrder', data);
    },
    joinCar(data) {
        return request.post('/api/joinCar', data);
    }
};
