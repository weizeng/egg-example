'use strict';

// 产品, 超市，活动的逻辑处理
// 根据popid查找红包
exports.findRedPacketByPopid = function*(ctx) {
    const result = yield this.service.popProAct.findRedPacketByPopid(ctx, ctx.params);
    this.status = 201;
    if(result) {
        this.body = result;
    } else {
        this.body = {"data":{}};
    }
    
}

// 根据popid查找促销活动
exports.findPromotionByPopid = function* (ctx) {
    const result = yield this.service.popProAct.findPromotionByPopid(ctx, ctx.params);
    this.status = 200;
    this.body = result;
}
 
// 根据popid查找积分活动
exports.findIntegrationByPopid = function* (ctx) {
    const result = yield this.service.popProAct.findIntegrationByPopid(ctx, ctx.params);
    this.status = 200;
    this.body = result;
}

// 查找扫描后的产品列表，带有活动属性
exports.findProductsByid = function* (ctx) {
    const result = yield this.service.popProAct.findProductsByid(ctx, ctx.params);
    
    this.status = 200;
    this.body = result;
}

// 根据proid查找积分活动，并且给用户一次积分和加一次换购
exports.updateIntegrationByProid = function* (ctx) {
    const result = yield this.service.popProAct.updateIntegrationByProid(ctx);
    
    this.status = 200;
    this.body = result;
}

exports.findTradeRecordByuid = function* (ctx) {
    const result = yield this.service.popProAct.findTradeRecordByuid(ctx);
    
    this.status = 200;
    this.body = result;
}