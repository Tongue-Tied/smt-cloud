import request from './request.js';
export default {
    getTicketDetail(ticketNo) {
        return request.get(`/api/cloudLiteTicket/getTicketDetail/${ticketNo}`);
    },
    getUsedTicketList(data) {
        return request.post('/api/cloudLiteTicket/getUsedTicketList', data);
    },
    verifyTicketInstance(data) {
        return request.post('/api/cloudLiteTicket/verityCloudLiteTicket', data);
    },
    reissueTicketMessage(mobile) {
        return request.put(`/api/cloudLiteTicket/reissueTicketMessage/${mobile}`);
    },
    delay(id, endTime) {
        return request.put(`/api/ticketInstance/delay/${id}/${endTime}`);
    },
    getStaffList(positionStatus) {
        return request.get(`/api/cloudLiteEmployee/list/${positionStatus}`);
    },
    refund(data) {
        return request.post('/api/platformOrder/refundByMerchant', data);
    }
};
