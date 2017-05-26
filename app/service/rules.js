module.exports = app => {
    class RulesService extends app.Service {
        * index(params) {
            let users = yield this.ctx.model.users.find(params);
            let result = {};
            result.meta = {
                total: users.length
            };
            result.data = users;
            return result;
        }

        * createRedpacketRules(ctx, request) {
            if (!request) {
                return
            };
            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "redpacketCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.redpacketid = doc.uid;
            let result = yield ctx.model.RedpacketRules.create(request);
            console.log(result);
            return result;
        }

          * createTradeInRules(ctx, request) {
            if (!request) {
                return
            };
            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "tradeInCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.tradeInid = doc.uid;
            let result = yield ctx.model.TradeInRules.create(request);
            console.log(result);
            return result;
        }

        * createIntegrationRules(ctx, request) {
            if (!request) {
                return
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
            
            request.integrationid = doc.uid;
            let result = yield ctx.model.IntegrationRules.create(request);
            console.log(result);
            return result;
        }

        * createPromotionRules(ctx, request) {
            if (!request) {
                return
            };
            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "promotionCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.promotionid = doc.uid;
            let result = yield ctx.model.PromotionRules.create(request);
            console.log(result);
            return result;
        }
    }
    return RulesService;
}