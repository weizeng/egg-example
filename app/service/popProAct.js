
module.exports = app => {
    class PopProActService extends app.Service {
        
        * findRedPacketByPopid() {
            if (!this.ctx.params.id) {
                return this.result(false, 100, "缺少popid");
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
                return this.result(redpackets.length > 0, redpackets.length > 0? 0:201, result);
            }
            return this.result(false, 201);
        }

        // 查找促销活动
        * findPromotionByPopid() {
            if (!this.ctx.params.id) {
                return this.result(false, 100, "缺少popid");
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
                return this.result(redpackets.length > 0, redpackets.length > 0? 0:201, result);
            }
            return this.result(false, 201);
        }
        
        // 查找积分活动
        * findIntegrationByPopid(ctx, params) {
            
            if (!this.ctx.params.id) {
                return this.result(false, 100, "缺少popid");
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
                return this.result(redpackets.length > 0, redpackets.length > 0? 0:201, result);
            }
            return this.result(false, 201);
        }

        // 查找对应产品的所有有效的活动
        * findProductsByProid() {   
            if (!this.ctx.params.proid) {
                return this.result(false, 100, "缺少proid");
            };
            
            let theProduct = yield this.ctx.model.Products.findOne({"proid":this.ctx.params.proid, "valid":true});
            if(theProduct && !theProduct.errors) {
                theProduct._doc.activityDetailList = [];
                for(var j=0; j<theProduct.activity.length; j++){ 
                    // 查找所有有效的活动
                    let dataList = yield this.ctx.model.Activitys.find({"valid":true, "activityid":theProduct.activity[j]});
                    // 找到所有关于这件产品的活动（可能有红包，有积分的，有促销的）
                    if(dataList && dataList.length > 0){
                        theProduct._doc.activityDetailList.push(dataList);
                    }
                }
                return this.result(true, 0, theProduct);
            }
            return this.result(false, 201);
            
        }
        // 找到所有的产品，包含产品的所有活动信息
        * findProductsWithAcitivty() {

            // 查找所有有效的产品
            let allProduct = yield this.ctx.model.Products.find({"valid":true});
            for(var i=0; i<allProduct.length; i++){ 
                // let result = allProduct[i];
                if(!allProduct[i].errors) {
                    allProduct[i]._doc.activityDetailList = [];
                    for(var j=0; j<allProduct[i].activity.length; j++){ 
                        // 查找所有有效的活动
                        let dataList = yield this.ctx.model.Activitys.find({"valid":true, "activityid":allProduct[i].activity[j]});
                        // 找到所有关于这件产品的活动（可能有红包，有积分的，有促销的）
                        if(dataList && dataList.length > 0){
                            allProduct[i]._doc.activityDetailList.push(dataList);
                        }
                    }
                }
            }
            return this.result(true, 0, allProduct);
        }

        // 查找用户换购记录
        * findTradeRecordByuid(){
            let allTradeIn = yield this.ctx.model.ScanProRecords.find({"uid":this.ctx.params.uid});
            this.result(true, 0, allTradeIn);
        }

        // 根据扫描的产品，更新用户的扫描记录和积分（商家给积分，平台给积分）
        * updateIntegrationByProid(){
            if (!this.ctx.request.body) {
                return this.result(false, 100);
            };
            
            let uid = this.ctx.headers.uid;
            let proid = this.ctx.request.body.proid;
            let activityid = this.ctx.request.body.activityid;
            // 换购的规则
            let tradeInid = this.ctx.request.body.tradeInid;
            // 累计积分规则
            let integerationid = this.ctx.request.body.integerationid;
            if(!uid || !proid || !activityid || !integerationid) {
                return this.result(false, 100, "缺少请求参数");
            }
            let scanedProduct = yield this.ctx.model.Products.findOne({"proid":proid, "valid":true});
            // 判断有无此产品
            if(scanedProduct && !scanedProduct.errors) {
                // 判断有无此活动
                 let activity = yield this.ctx.model.Activitys.findOne({"valid":true, "activityid":activityid, "type":"integration"});
                 
                 if(activity && activity.detailRef.length > 0 ) {
                     let hasRef = false;
                     // 当前的活动是否包含扫描提交上来的tradeInid
                     for(var j=0; j < activity.detailRef.length; j++){ 
                        if(activity.detailRef[j] == tradeInid) {
                            hasRef = true;
                            break;
                        }
                     }
                    if(!hasRef) {
                        return this.result(false, 301);
                    }
                    // 查找换购规则累积积分规则，换购规则valid，则加积分，和 ScanProRecords的增加
                    let tradeInProduct = yield this.ctx.model.TradeInRules.findOne({"tradeInid":tradeInid});

                    if(tradeInProduct && tradeInProduct.valid) {
                        // 查找已经扫描获取到的数量
                        let count = yield this.ctx.model.ScanProRecords.count({"uid":uid, "ruleid":tradeInid});
                        if(count < tradeInProduct.collectionCount) {
                                                    
                            let tradeIn = yield this.ctx.model.Idg.findOneAndUpdate({
                                    myModelName: "tradeInCounter"
                                }, {
                                    $inc: {
                                        'uid': 1
                                    }
                                }, {
                                    new: true
                                });

                              // 查询积分的规则
                            let integrationProduct = yield this.ctx.model.IntegrationRules.findOne({"integrationid":integerationid});    

                            if(integrationProduct && !integrationProduct.errors) {
                                 // 根据换购规则，支持换购，就添加到扫描产品的记录表中
                                let ss = yield this.ctx.model.ScanProRecords.create({
                                    "recordid":tradeIn.uid,
                                    "uid":uid,
                                    "proid":proid,
                                    "tradeInid":tradeInid,
                                    "proName":scanedProduct.productName,
                                    "brandid":tradeInProduct.brandid,
                                    "brand":tradeInProduct.brand,
                                    "guangIntegration":integrationProduct.guangIntegration,
                                    "popIntegration":integrationProduct.popIntegration }); 
                                return this.result(true, 0, ss);
                            } else {
                                return this.result(false, 302);
                            }
                           
                        } else {
                            return this.result(false, 304);
                        }
                    } 
                 } else {
                     return this.result(false, 302);
                 }
            }
            this.result(false, 303);

        }
    }
    return PopProActService;
}