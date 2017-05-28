'use strict';

// 产品, 超市，活动的逻辑处理

module.exports = app => {
    class PoProActService extends app.Service {
        // 根据popid查找红包        
        * findRedPacketByPopid() {
            yield this.service.popProAct.findRedPacketByPopid();
        }

        // 根据popid查找促销活动
        * findPromotionByPopid () {
            yield this.service.popProAct.findPromotionByPopid();
        }
        
        // 根据popid查找积分活动
        * findIntegrationByPopid(){
            yield this.service.popProAct.findIntegrationByPopid();
        }

        // 查找扫描后的产品列表，带有活动属性
        * findProductsWithAcitivty(){
            yield this.service.popProAct.findProductsWithAcitivty();
        }
        * findProductsByProid(){
            yield this.service.popProAct.findProductsByProid();
        }

        // 根据proid查找积分活动，并且给用户一次积分和加一次换购(扫码积分使用)
        * updateIntegrationByProid() {
            yield this.service.popProAct.updateIntegrationByProid();
        }

        // 查找用户的换购记录
        * findTradeRecordByuid () {
            yield this.service.popProAct.findTradeRecordByuid();
        }
    }
    return PoProActService;
};
