import request from './request.js';

export default {
    getPromotions(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        list: [
                            {
                                allBuyCount: null,
                                bargainRule: null,
                                barrage: null,
                                barrageList: null,
                                bottomPrice: 200,
                                businessId: null,
                                businessSource: null,
                                butterflyRule: null,
                                buyCount: 0,
                                carouselImageList: null,
                                carouselImageRatio: 1,
                                carouselVideoStatus: 1,
                                channel: 1,
                                combinationRule: null,
                                communityGroupRule: null,
                                conceal: null,
                                contentNotesList: null,
                                couponEndDate: null,
                                couponStartDate: '2021-04-21 00:30:30',
                                createEmployeeId: 6609864276410468,
                                createEmployeeName: '哈脸皮',
                                createFinish: 0,
                                createSource: 1,
                                createTime: '2021-04-22 13:10:45',
                                createTimestamp: 1619068245007,
                                currentStep: null,
                                cygnetRule: null,
                                describeList: null,
                                description: '拉新有利活动内容测试',
                                differentIndustry: 0,
                                differentIndustryDate: null,
                                effectDate: null,
                                endDate: '2021-05-31 23:59:59',
                                featrueDescription: null,
                                htmlContent: null,
                                id: 2117543590474550,
                                jsonContent: null,
                                lastUpdateTime: '2021-04-22 14:34:13',
                                lastUpdateTimestamp: 1619073254610,
                                mallShowStatus: false,
                                merchantCode: null,
                                merchantContact: null,
                                merchantId: 1203373229891119,
                                merchantName: null,
                                merchantPhone: null,
                                mpChannel: null,
                                normalDate: null,
                                operator: '哈脸皮',
                                operatorId: 6609864276410468,
                                originalMoney: 0,
                                originalPrice: 0,
                                platformShortLink: null,
                                pointsRuleBindingList: null,
                                promoitonCoverImageId: 2117543393440773,
                                promoitonLogoImageId: 2117543393440773,
                                promotionDetailInfo: null,
                                promotionImage: 2116404746708311,
                                promotionInstanceSharingDesc: null,
                                promotionRuleBigWheel: null,
                                promotionRuleGroup: null,
                                promotionRuleOneToN: null,
                                promotionRuleRedEnvelope: null,
                                promotionTemplateId: 100000003,
                                promotionUrl: null,
                                promotionVideoVOList: null,
                                reason: null,
                                receiveTicketSetup: null,
                                redpackFissionGroupRule: null,
                                searchStatus: null,
                                seckillRule: null,
                                sellPrice: 200,
                                serviceContentList: null,
                                shareCount: 0,
                                shortLink: 'https://s.dev.mei1.info/7xujZF9sZ',
                                source: 'saas',
                                startDate: '2021-04-22 00:00:00',
                                status: 'prepare',
                                storeIds: '1203373529866090',
                                storePhone: null,
                                submitAuditDate: null,
                                title: '拉新有利活动内容测试',
                                totalIncome: 0,
                                type: 'at_butterfly',
                                usedTicketTotalFee: null,
                                uuid: '4693b96c63e442e494ce00dbefe2fd6c',
                                validTime: null,
                                virtualSaleCount: null,
                                visitCount: 0
                            }
                        ]
                    }
                });
            }, 800);
        });
        // return request.post('/api/promotions/listmypromotion', data);
    },
    queryExistBuy(promotionId) {
        return request.get(`/api/promotionRecordBuy/promotion/existBuy/${promotionId}`);
    }
};
