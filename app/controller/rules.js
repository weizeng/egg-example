'use strict';

module.exports = app => {
  class RuleController extends app.Controller {
    * index() {
        yield this.service.rules.index();
    };

// 创建红包的规则
    * createRedpacketRules () {
        yield this.service.rules.createRedpacketRules();
    }

// 创建换购的规则
    * createTradeInRules () {
        yield this.service.rules.createTradeInRules();
    }

// 创建积分获取的规则
    * createIntegrationRules() {
        yield this.service.rules.createIntegrationRules();
    }

// 创建促销的活动规则
    * createPromotionRules() {
        yield this.service.rules.createPromotionRules();
    }
  }
  return RuleController;
};
