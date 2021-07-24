import request from './request.js';
// import Mock from 'mockjs';
export default {
    // 会员列表
    getList(data) {
        return request.post('/api/cloudLiteMember/search', data);
    },
    // 会员详情
    getDetail(id) {
        return request(`/api/cloudLiteMember/${id}`);
    },
    // 会员数据统计
    dataStatistics(memberId) {
        return request(`/api/cloudLiteMember/dataStatistics/${memberId}`);
    },
    // 等级列表
    getGradeList() {
        return request('/api/cloudLiteMember/gradeRuleList');
    },
    // 项目、券列表
    getcardAndPresent(data) {
        return request.post('/api/member/list/cardAndPresent', data);
    },
    // 卡列表
    getCardList(data) {
        return request.post('/api/cloudLiteCardInstance/search', data);
    },
    // 顾客消费列表
    getConsumeList(data) {
        return request.post('/api/cloudLiteMember/search/consumeRecord', data);
    },
    // 新建顾客
    newMemberInfo(data) {
        return request.post('/api/cloudLiteMember', data);
    },
    // 会员补录
    memberRepair(data) {
        return request.post('/api/cloudLiteMember/remakeCard', data);
    },
    // 编辑顾客信息
    editMemberInfo(data) {
        return request.put('/api/cloudLiteMember', data);
    },
    // 来源渠道列表
    getSourcesList() {
        return request('/api/cloudLiteSource/getAllSource');
    },
    // 券详情
    getTicketDetail(ticketId) {
        return request(`/api/cloudLiteMemberAsset/ticketDetails/${ticketId}`);
    },
    // 退券
    refundTicket(ticketId) {
        return request.put(`/api/cloudLiteMemberAsset/refundTicket/${ticketId}`);
    },
    // 券延期
    delayTicket(ticketId, endDate) {
        return request.put(`/api/ticketInstance/delay/${ticketId}/${endDate}`);
    },
    // 赠送项目
    sentItems(data) {
        return request.post('/api/cloudLiteServiceItem/presents', data);
    },
    // 修改项目
    editItems(data) {
        return request.put('/api/cardPresent/modify/validTime', data);
    },
    // 卡详情
    getCardDetail(cardInstanceId) {
        return request.get(`/api/cloudLiteCardInstance/${cardInstanceId}`);
    },
    // 储值卡折扣范围
    cardDiscount(data) {
        return request.post('/api/payRule/search', data);
    },
    // 卡消费记录
    cardConsumeRecord(data) {
        return request.post('/api/cloudLiteMember/search/cardConsumeRecord', data);
    },
    // 卡操作记录
    cardOperateRecord(data) {
        return request.post('/api/cardInstance/tradeRecords', data);
    },
    // 发送券码到顾客手机
    sendTickedCode(ticketInstanceId) {
        return request.put(`/api/ticketInstance/reissue/ticketNo/${ticketInstanceId}`);
    }
};
