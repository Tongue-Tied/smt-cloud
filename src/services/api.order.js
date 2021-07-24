import request from './request.js';
export default {
    getCategoryList(data) {
        return request.post('/api/cloudLiteServiceItemCategory/search', data);
    },
    getItemList(data, memberId) {
        return request.post(`/api/cloudLiteServiceItem/search/${memberId}`, data);
    },
    getEmployeeList(status) {
        return request(`/api/cloudLiteEmployee/list/${status}`);
    },
    recommendPayMethod(data) {
        return request.post('/api/cloudLiteOrder/recommendPayMethod', data);
    },
    calculation(data) {
        return request.post('/api/cloudLiteOrder/calculation', data);
    },
    getPaymentList(data) {
        return request.post('/api/cloudLiteOrder/list/payMethod', data);
    },
    setSignature(data) {
        return request.post('/api/cloudLiteOrder/addOrderPaySignatureAndEvaluation', data);
    },
    pay(data) {
        return request.post('/api/cloudLiteOrder/pay', data);
    },
    update(data) {
        return request.post('/api/cloudLiteOrder/update', data);
    },
    getOrder(orderId) {
        return request(`/api/cloudLiteOrder/orderDetail/${orderId}`);
    },
    save(data) {
        return request.post('/api/cloudLiteOrder/save', data);
    },
    getMember(memberId) {
        return request(`/api/cloudLiteMember/${memberId}`);
    },
    getCardList(data) {
        return request.post('/api/cloudLiteCardDefine/search', data);
    },
    getCard(cardId) {
        return request(`/api/cloudLiteCardDefine/${cardId}`);
    },
    getPayInfo(orderId) {
        return request(`/api/cloudLiteOrder/orderPayDetail/${orderId}`);
    },
    getList(data) {
        return request.post('/api/cloudLiteOrder/getList', data);
    },
    getListTotal(data) {
        return request.post('/api/cloudLiteOrder/getListTotal', data);
    },
    returnOrder(data) {
        return request.post('/api/cloudLiteOrder/returnOrder', data);
    },
    getPayList(status = 1) {
        return request(`/api/cloudLiteSystemPayMethod/list/${status}`);
    },
    cancelOrder(orderId) {
        return request.put(`/api/cloudLiteOrder/cancel/${orderId}`);
    },
    revokeReturnOrder(orderId) {
        return request.put(`/api/cloudLiteOrder/revokeReturnOrder/${orderId}`);
    },
    getBooking(bookingId) {
        return request(`/api/cloudLiteAppointment/${bookingId}`);
    },
    updateOrderDate(data) {
        return request.put('/api/cloudLiteOrder/updateOrderDate', data);
    },
    getCardInstance(cardInstanceId) {
        return request(`/api/cloudLiteCardInstance/${cardInstanceId}`);
    }
};
