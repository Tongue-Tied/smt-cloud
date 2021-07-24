import request from './request.js';
export default {
    // 查询项目列表
    getItemsList(data) {
        return request.post('/api/serviceItem/search', data);
    },
    // 项目列表(树形结构)查询
    getCloudLiteServiceItem(data) {
        return request.post('/api/cloudLiteServiceItem/search', data);
    },
    // 查询项目详情
    getItemsDetail(id) {
        return request.get(`/api/cloudLiteServiceItem/${id}`);
    },
    // 停售项目
    changeItemsStatus(itemId, status) {
        return request.get(`/api/serviceItem/status/${itemId}/${status}`);
    },
    // 删除项目
    deleteServiceItem(itemId) {
        return request.delete(`/api/cloudLiteServiceItem/${itemId}`);
    },
    // 更新项目
    updateItems(data) {
        if (data && data.id) {
            return request.put('/api/cloudLiteServiceItem', data);
        } else {
            return request.post('/api/cloudLiteServiceItem', data);
        }
    },
    // 查询分类列表
    getCategoryList(data) {
        return request.post('/api/cloudLiteServiceItemCategory/search', data);
    },
    // 查询分类详情
    getCategoryDetail(id) {
        return request.get(`/api/serviceItemCategory/${id}`);
    },
    // 添加更新分类
    updateCategoryDetail(data) {
        if (data && data.id) {
            return request.put('/api/cloudLiteServiceItemCategory', data);
        } else {
            return request.post('/api/cloudLiteServiceItemCategory', data);
        }
    },
    // 删除分类
    deleteCategoryDetail(id) {
        return request.delete(`/api/cloudLiteServiceItemCategory/${id}`);
    },
    // 查询券列表
    getTicketList(data) {
        return request.post('/api/ticketDefine/searchTicketDefines', data);
    },
    // 查询券详情
    getTicketDetail(id) {
        return request.get(`/api/cloudLiteTicketDefine/${id}`);
    },
    // 保存券
    updateTicket(data) {
        let url = '/api/cloudLiteTicketDefine';
        if (data.id) {
            return request.put(url, data);
        } else {
            return request.post(url, data);
        }
    },
    changeTicketStatus(id, status) {
        return request.get(`/api/ticketDefine/status/${id}/${status}`);
    },
    // 查询所有的员工列表
    getcloudLiteEmployee(positionStatus) {
        return request.get(`/api/cloudLiteEmployee/list/${positionStatus}`);
    },
    // 店铺资料详情
    getStoreDetail() {
        return request.get('/api/cloudLiteStore/getStoreInfo');
    },
    // 更新店铺资料
    updataStore(data) {
        return request.put('/api/cloudLiteStore/update', data);
    },
    // 微信收款账户详情
    getBankAccountDetail() {
        return request.get('/api/cloudLiteBankAccount/getBankAccountDetail');
    },
    // 意见反馈
    feedback(data) {
        return request.post('/api/wechatBusinessMarketing/feedBack', data);
    },
    // 获取省份
    loadProvince(data) {
        return request.get('/api/systemArea/bankProvince');
    },
    loadCity(data) {
        return request.post('/api/richArea/searchCity', data);
    },
    // 修改微信收款账户详情
    modifyBankAccount(data) {
        return request.put('/api/cloudLiteBankAccount/updateBankAccount', data);
    },
    // 发送验证码
    sendCaptcha(merchantId, merchantPhone) {
        return request.get(`/api/employee/captcha/${merchantId}/${merchantPhone}`);
    },
    // 系统更新记录
    systemUpdateLog(data) {
        return request.post('/api/updateLog/cloudLite/list', data);
        // return request.get(`/api/employee/captcha/${merchantId}/${merchantPhone}`);
    },
    // 验证手机验证码
    verifyCode(data) {
        return request.post('/api/verifications/validate', data);
    },
    // 获取支付方式列表
    getPayList() {
        return request.get('/api/cloudLiteSystemPayMethod/list');
    },
    // 修改支付方式
    modifyPayStatus(id, status) {
        return request.get(`/api/systemPayMethod/changeStatus/${id}/${status}`);
    }
};
