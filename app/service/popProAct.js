
module.exports = app => {
    class PopProActService extends app.Service {
        // 根据经纬度查找最近的店，并且显示该店的最新红包活动
        * findPopAndActivityProductNearBy() {
            let types = "060100|060200|060400";
            // 一页10条
            let offset = 1;
            let key = "9f6f8d47a20046831364c8afcd16df59";
            let url = "http://restapi.amap.com/v3/place/around?key="+key+"&location="+this.ctx.params.lonlat+"&types="+types+"&radius=1000&offset="+offset+"&page=1";
            const rr = yield app.curl(url, {
                method: 'GET',
                dataType: 'json',
            });
            let resData = {};
            if(rr.data && rr.data.status == '1') {
                let pois = [];
                resData.pop = rr.data.pois[0];
                // 查找红包
                // 测试只用这家,写死了, 重复代码
                this.ctx.params.id = 'B0FFFDBWFO';
                // 根据popid查找这家店的所有产品的有效产品
                let result = yield this.ctx.model.ProductBatchs.findOne({"popid":this.ctx.params.id, "valid":true});
                if(result) {
                    let redpackets = [];
                    // 根据产品查询对应所参与的活动
                    for(var i=0; i<result.activity.length; i++){ 
                        let data = yield this.ctx.model.Activitys.findOne({activityid:result.activity[i], type:"redpacket"});
                        if(data) {
                            redpackets.push(data);
                        }
                    }

                    result._doc.redpacketDetail = redpackets;
                    resData.activity = result;
                    
                }
                return this.result(true, 0, resData);
            }

        }
        * findProductsByProid() {   
            if (!this.ctx.params.proid) {
                return this.result(false, 100, "缺少proid");
            };
            
            let theProduct = yield this.ctx.model.ProductBatchs.findOne({"proid":this.ctx.params.proid, "valid":true});
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

        // 查找活动,根据提交的popid和活动类型判断
        * findActivityByPopidAndType() {
            if (!this.ctx.params.id) {
                return this.result(false, 100, "缺少popid");
            };
            if (!this.ctx.params.type || (this.ctx.params.type != 'promotion' && this.ctx.params.type != 'integration' && this.ctx.params.type != 'redpacket' && this.ctx.params.type != "tradeIn")) {
                return this.result(false, 100, "缺少搜索类型,或者不支持搜索类型");
            };
            // 测试只用这家,写死了
            this.ctx.params.id = 'B0FFFDBWFO';
            // 查找这家店关于促销的的有效活动
             let result = yield this.ctx.model.ProductBatchs.findOne({"popid":this.ctx.params.id, "valid":true});
            if(result) {
                let redpackets = [];
                for(var i=0; i<result.activity.length; i++){ 
                    let data = yield this.ctx.model.Activitys.findOne({activityid:result.activity[i], type:this.ctx.params.type});
                    if(data) {
                        redpackets.push(data);
                    }
                }

                result._doc.activityDetail = redpackets;
                return this.result(redpackets.length > 0, redpackets.length > 0? 0:201, result);
            }
            return this.result(false, 201);
        }
        
        // 找到所有的产品，包含产品的所有活动信息
        * findProductsWithAcitivty() {
            // 查找所有有效的产品
            let allProduct = yield this.ctx.model.ProductBatchs.find({"valid":true});
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
            
            let uid = parseInt(this.ctx.headers.uid);
            let proid = parseInt(this.ctx.request.body.proid);
            let activityid = parseInt(this.ctx.request.body.activityid);
            // 换购的规则 && 累计积分规则，动态配置，可以只做换购，或者只做积分累积
            let tradeInid = parseInt(this.ctx.request.body.tradeInid);
            let integerationid = parseInt(this.ctx.request.body.integerationid);
            if(!uid) {
                return this.result(false, 601);
            }
            if(!uid || !activityid) {
                return this.result(false, 100, "缺少请求参数");
            }
            if(!tradeInid && !integerationid) {
                return this.result(false, 100, "没有 换购/积分 规则");
            }
            let exist = this.ctx.model.Users.findOne({uid:uid});
            if(!exist) {
                return this.result(false, 100, "用户不存在");
            }

            console.log("uid:"+uid, "proid:"+proid, "activityid:"+activityid, "tradeInid:"+tradeInid, "integerationid:"+integerationid);
            // 暂时不针对popid
            let scanedProductBatch = yield this.ctx.model.ProductBatchs.find({"proid":proid, "valid":true, "activity":{"$in":[activityid]}}).limit(1);
            // 判断有无此产品
            if(scanedProductBatch && scanedProductBatch.length > 0 && !scanedProductBatch.errors) {
                // 判断有无此活动
                let activityObj, tradeObj;
                let integrationRules;
                let tradeInRules;
                let popIntegrat = 100;
                let guangIntegrat = 50;
                let scanRecords = [];
                if(integerationid) {
                    activityObj = yield this.ctx.model.Activitys.findOne({"valid":true, "activityid":activityid, "type":"integration"});
                    integrationRules = yield this.ctx.model.IntegrationRules.findOne({integrationid:integerationid});
                    if(!activityObj) {
                        return this.result(false, 302, "没有对应的积分活动");
                    }
                    if(integrationRules) {
                        popIntegrat = integrationRules.popIntegration;
                        guangIntegrat = integrationRules.guangIntegration;
                    } else {
                        return this.result(false, 302, "没有对应的积分规则");
                    }
                    scanRecords.push({
                        type:"integration",
                        guangIntegration:guangIntegrat,
                        popIntegration:popIntegrat,
                        ruleid:integerationid
                    });
                }
                if(tradeInid) {
                    tradeObj = yield this.ctx.model.Activitys.findOne({"valid":true, "activityid":activityid, "type":"tradeIn"});
                    tradeInRules = yield this.ctx.model.TradeInRules.findOne({tradeInid : tradeInid});                    
                    if(!tradeInRules) {
                        return this.result(false, 0, "没有对应的换购规则");
                    }
                    scanRecords.push({
                        type:"tradeIn",
                        ruleid:tradeInid
                    });
                }
                
                if(tradeInRules) {
                    let proRecords = yield this.ctx.model.ScanProRecords.find({"uid":uid, "proid":proid});
                    let count = 0;
                    for(var i = 0; proRecords && i <  proRecords.length; i++){
                        for(var j = 0; j <  proRecords[i].records.length; j++){
                            if(proRecords[i].records[j].type == "tradeIn") {
                                count ++;
                            }
                        }
                    }
                    // 换购检查
                    if(count >= tradeInRules.collectionCount) {
                        // 换购已满
                        return this.result(false, 304);
                    }
                }
                let scanedProduct = yield this.ctx.model.Products.findOne({proid:scanedProductBatch[0].proid});
                
                
                let tradeInCounter = yield this.ctx.model.Idg.findOneAndUpdate({myModelName: "tradeInCounter"}, {$inc: {'uid': 1}}, {new: true});
                //  记录到scanProRecords
                let ss = yield this.ctx.model.ScanProRecords.create({
                                recordid:tradeInCounter.uid,
                                uid:uid,
                                proid:proid,
                                proName:scanedProduct.proName,
                                brandid:scanedProduct.brandid,
                                brand:scanedProduct.brandName,
                                records:scanRecords });
                
                
                let brandTradeIn = yield this.ctx.model.BrandTradeIn.findOne({uid: uid, brandid: scanedProduct.brandid});
                let hasTrade = false;
                let newCount=1;
                for(var i = 0; brandTradeIn && i < brandTradeIn.productTradeRecord.length; i++) {
                    if(brandTradeIn.productTradeRecord[i].proid == proid){
                        newCount = brandTradeIn.productTradeRecord[i].tradeCurrent + 1;
                        hasTrade = true;
                        break;
                    }
                }
                if(tradeInid) {
                    if(hasTrade) {
                        yield this.ctx.model.BrandTradeIn.findOneAndUpdate({uid:uid, brandid:scanedProduct.brandid, "productTradeRecord.proid":proid}, {$inc: {'brandIntegration': popIntegrat}, $set:{"productTradeRecord.0.tradeCurrent":newCount}},{new:true});//
                    } else {
                        // create
                        let dd = [{proid:proid, brandid:scanedProduct.brandid, proName:scanedProduct.proName, pic:scanedProduct.pic[0], tradeTotal:tradeInRules.collectionCount, tradeCurrent:1, ruleid:tradeInid, type:"tradeIn"}];
                        yield this.ctx.model.BrandTradeIn.create({brandIntegration:popIntegrat, uid:uid, brandid:scanedProduct.brandid, brandName: scanedProduct.brandName, level:"白金", productTradeRecord:dd});
                    }
                    
                }
                
                // 更新或者创建用户积分表
                yield this.ctx.model.Users.update(
                        {uid:uid}, {$inc:{guangIntegration: guangIntegrat}}, {upsert:true});

                this.result(true, 0, ss);
            } else {
                this.result(false, 302, "产品已经失效了");
            }

        }
    }
    return PopProActService;
}