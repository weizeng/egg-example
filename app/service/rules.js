'use strict';

module.exports = app => {
    class RulesService extends app.Service {
        * index() {
            let users = yield this.ctx.model.users.find({});
            return this.result(true, 0, users);
        }

        * createRedpacketRules() {
            if (!this.ctx.request.body) {
                return this.result(false, 100);
            };
            if (!this.ctx.request.body.questionsPage) {
                return this.result(false, 401);
            };
            if (!this.ctx.request.body.reward) {
                return this.result(false, 402);
            };
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "redpacketCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.redpacketid = doc.uid;
            let res = yield this.ctx.model.RedpacketRules.create(this.ctx.request.body);
            this.result(true, 0, res);
        }

          * createTradeInRules() {
            if (!this.ctx.request.body) {
                return this.result(false, 100);
            };
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "tradeInCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.tradeInid = doc.uid;
            let res = yield this.ctx.model.TradeInRules.create(this.ctx.request.body);
            this.result(true, 0, res);
        }

        * createIntegrationRules() {
            if (!this.ctx.request.body) {
                return this.result(false, 100);
            };
            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "integrationCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.integrationid = doc.uid;
            let res = yield this.ctx.model.IntegrationRules.create(this.ctx.request.body);
            this.result(true, 0, res);
        }

        * createPromotionRules() {
            if (!this.ctx.request.body) {
                return this.result(false, 100);
            };
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "promotionCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.promotionid = doc.uid;
            let res = yield this.ctx.model.PromotionRules.create(this.ctx.request.body);
            this.result(true, 0, res);
        }
    }
    return RulesService;
}