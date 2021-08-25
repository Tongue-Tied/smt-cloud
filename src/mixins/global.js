// 预约状态
export const BOOKING_STATUS = [
    { name: '生效中', value: 2 },
    { name: '已到店', value: 7 },
    { name: '已完成', value: 3 },
    { name: '已失效', value: 5 },
    { name: '已失效', value: 4 }
];
export default {
    verify(data) {
        var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        return reg_tel.test(data);
    }
};
// 卡类型
export const CARD_TYPE = [
    { name: '储值卡', value: 2 },
    { name: '总次卡', value: 4 },
    { name: '分次卡', value: 5 }
];
// 券类型
export const TICKET_TYPE = [
    { name: '现金券', value: 1 },
    { name: '总次券', value: 2 },
    { name: '分次券', value: 3 },
    { name: '折扣券', value: 4 }
];
// 券状态
export const TICKET_STATUS = [
    { name: '可用', value: 1 },
    { name: '不可用', value: 2 },
    { name: '过期', value: 3 },
    { name: '已使用', value: 4 }
];
// 订单状态
export const ORDER_STATUS = [
    { name: '草稿', value: 11 },
    { name: '已付款', value: 20 },
    { name: '挂账', value: 30 },
    { name: '尾款', value: 40 },
    { name: '已取消', value: 50 },
    { name: '退款', value: 61 },
    { name: '退卡', value: 62 },
    { name: '退款中', value: 69 },
    { name: '补卡', value: 70 }
];
