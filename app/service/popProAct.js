
module.exports = app => {
    class PopProActService extends app.Service {
        
        * findRedPacketByPopid(ctx, params) {
            
            if (!params) {
                return;
            };
            // 查找这家店关于红包的的有效活动
            let result = yield this.ctx.model.Activitys.findOne({"popid":params.id, "type":"redpacket", "valid":true});
            if(result) {
                let redpackets = [];
                for(var i=0; i<result.detailRef.length; i++){ 
                    let data = yield this.ctx.model.RedpacketRules.findOne({"redpacketid":result.detailRef[i]});
                    if(data) {
                        redpackets.push(data);
                    }
                }
                result._doc.redpackets = redpackets;
            }
            return result;
        }

        // 查找促销活动
        * findPromotionByPopid(ctx, params) {
            
            if (!params) {
                return;
            };
            // 查找这家店关于红包的的有效活动
            let result = yield this.ctx.model.Activitys.findOne({"popid":params.id, "type":"promotion", "valid":true});
            if(result) {
                let redpackets = [];
                for(var i=0; i<result.detailRef.length; i++){ 
                    let data = yield this.ctx.model.PromotionRules.findOne({"promotionid":result.detailRef[i]});
                    if(data) {
                        redpackets.push(data);
                    }
                }
                result._doc.redpackets = redpackets;
            }
            return result;
        }
        
        // 查找积分活动
        * findIntegrationByPopid(ctx, params) {
            
            if (!params) {
                return;
            };
            // 查找这家店关于红包的的有效活动
            let result = yield this.ctx.model.Activitys.findOne({"popid":params.id, "type":"integration", "valid":true});
            if(result) {
                let redpackets = [];
                for(var i=0; i<result.detailRef.length; i++){ 
                    let data = yield this.ctx.model.IntegrationRules.findOne({"integrationid":result.detailRef[i]});
                    if(data) {
                        redpackets.push(data);
                    }
                }
                result._doc.redpackets = redpackets;
            }
            return result;
        }

        * findProductsByid(ctx, params) {
            if (!params) {
                return;
            };

            // 查找每一个产品对应参与的活动
            let allProduct = yield this.ctx.model.Products.find({"valid":true});
            for(var i=0; i<allProduct.length; i++){ 
                // let result = allProduct[i];

                if(!allProduct[i].errors) {
                    allProduct[i]._doc.activityDetailList = [];
                    for(var j=0; j<allProduct[i].activity.length; j++){ 
                        let dataList = yield this.ctx.model.Activitys.find({"activityid":allProduct[i].activity[j]});
                        // 找到所有关于这件产品的活动（可能有红包，有积分的，有促销的）
                        if(dataList && dataList.length > 0){
                            allProduct[i]._doc.activityDetailList.push(dataList);
                        }
                    }
                }
            }
            return allProduct;
        }

        // 查找用户换购记录
        * findTradeRecordByuid(ctx){
            let allTradeIn = yield ctx.model.ScanProRecords.find({"uid":ctx.params.uid});
            return allTradeIn;
        }

        // 根据扫描的产品，更新用户的扫描记录和积分（商家给积分，平台给积分）
        * updateIntegrationByProid(ctx){
            if (!ctx.request.body) {
                return;
            };   
            
            let uid = ctx.headers.uid;
            let proid = ctx.request.body.proid;
            let activityid = ctx.request.body.activityid;
            // 换购的规则
            let ruleid = ctx.request.body.ruleid;
            // 累计积分规则
            let integerationid = ctx.request.body.integerationid;
            if(!uid || !proid || !activityid || !integerationid) {
                return "参数不正确";
            }
            let scanedProduct = yield ctx.model.Products.findOne({"proid":proid, "valid":true});
            // 判断有无此产品
            if(scanedProduct) {
                // 判断有无此活动
                 let activity = yield ctx.model.Activitys.findOne({"activityid":activityid,"type":"integration"});
                 
                 if(activity && activity.detailRef.length > 0 ) {
                     let hasRef = false;
                     for(var j=0; j<activity.detailRef.length; j++){ 
                        if(activity.detailRef[j] == ruleid) {
                            hasRef = true;
                            break;
                        }
                     }
                    if(!hasRef) {
                        return;
                    }
                    // 查找换购规则累积积分规则，换购规则valid，则加积分，和 ScanProRecords的增加
                    let tradeInProduct = yield ctx.model.TradeInRules.findOne({"tradeInid":ruleid});

                    if(tradeInProduct && tradeInProduct.valid) {

                        let count = yield ctx.model.ScanProRecords.count({"uid":uid,"ruleid":ruleid});
                        if(count < tradeInProduct.collectionCount) {
                                                    
                            let tradeIn = yield ctx.model.Idg.findOneAndUpdate({
                                    myModelName: "tradeInCounter"
                                }, {
                                    $inc: {
                                        'uid': 1
                                    }
                                }, {
                                    new: true
                                });

                              // 查询积分的规则
                            let integrationProduct = yield ctx.model.IntegrationRules.findOne({"integrationid":integerationid});    

                            // 根据换购规则，支持换购，就添加到扫描产品的记录表中
                            let ss = yield ctx.model.ScanProRecords.create({
                                "recordid":tradeIn.uid,
                                "uid":uid,
                                "proid":proid,
                                "ruleid":ruleid,
                                "proName":scanedProduct.productName,
                                "brandid":tradeInProduct.brandid,
                                "brand":tradeInProduct.brand,
                                "guangIntegration":integrationProduct.guangIntegration,
                                "popIntegration":integrationProduct.popIntegration }); 
                            return ss;
                        } else {
                            return "nono";
                        }
                    } 
                 }
            }

        }
    }
    return PopProActService;
}