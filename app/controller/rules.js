'use strict';

exports.index = function* () {
  const result = yield this.service.rules.index(this.params);
  this.body = result;
  this.status = 200;
};

// 创建红包的规则
exports.createRedpacketRules = function*(ctx) {
    const result = yield this.service.rules.createRedpacketRules(ctx, this.request.body);
    this.body = result;
    this.status = 201;
}

// 创建换购的规则
exports.createTradeInRules = function*(ctx) {
    const result = yield this.service.rules.createTradeInRules(ctx, this.request.body);
    this.body = result;
    this.status = 201;
}

// 创建积分获取的规则
exports.createIntegrationRules = function*(ctx) {
    const result = yield this.service.rules.createIntegrationRules(ctx, this.request.body);
    this.body = result;
    this.status = 201;
}

// 创建促销的活动规则
exports.createPromotionRules = function*(ctx) {
    const result = yield this.service.rules.createPromotionRules(ctx, this.request.body);
    this.body = result;
    this.status = 201;
}