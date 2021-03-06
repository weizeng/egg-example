
module.exports = app => {
    class ProductService extends app.Service {
        
        * createProduct() {
            if (!this.ctx.request.body) {
                return this.result(fales, 100);
            };
             if (!this.ctx.request.body.productName) {
                return this.result(fales, 308);
            };
            if (!this.ctx.request.body.brand) {
                return this.result(fales, 305);
            };
            if(!this.ctx.request.body.activity) {
                return this.result(fales, 306);
            }
             
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "productCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.proid = doc.uid;

            let res = yield this.ctx.model.Activitys.create(this.ctx.request.body);
            
            this.result(true, 0, res);
        }

                
        * updateProduct() {
            if(!this.ctx.params.proid) {
                return this.result(false, 100);
            }
            //
            if (!this.ctx.request.body.productName) {
                return this.result(false, 100);
            };
            let result = yield this.ctx.model.Products.findOneAndUpdate(
                {"proid" : this.ctx.params.proid},
                {
                    $set:this.ctx.request.body
                },
                {new:true}
            );
            let re = (result!=null);

            this.result(re, re ? 0:104, result);
        }

        * findOneProduct(){
            if(!this.ctx.params.proid) {
                return this.result(false, 100);
            }
            let res = yield this.ctx.model.Products.findOne({proid:this.ctx.params.proid});
            this.result(true, 0, res);
        }

        * findAllProduct() {
            let res = yield this.ctx.model.Products.find({});
            this.result(true, 0, res);
        }
        
        // 判断次序：活动规则表(换购规则，红包规则，积分规则)，活动表，产品表(批次)，最后关联到对应pop店
        * createMonitorData(){
            let exist = yield this.ctx.model.Idg.find({uid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.Idg.collection.drop();
            }
            yield this.ctx.model.Idg.create({myModelName:"activityCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"brandCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"collectionCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"userCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"redpacketCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"tradeInCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"integrationCounter", uid:1});
            yield this.ctx.model.Idg.create({myModelName:"promotionCounter", uid:1});
            
            // 增加三个产品
            exist = yield this.ctx.model.Brands.find({brandid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.Brands.collection.drop();
            }
             yield this.ctx.model.Brands.create({brandid:0, brandName:"百威啤酒"});
             yield this.ctx.model.Brands.create({brandid:1, brandName:"可口可乐"});
             yield this.ctx.model.Brands.create({brandid:2, brandName:"脉动"});
             yield this.ctx.model.Brands.create({brandid:3, brandName:"雀巢即饮"});
             yield this.ctx.model.Brands.create({brandid:4, brandName:"农夫"});
             yield this.ctx.model.Brands.create({brandid:5, brandName:"优诺"});
             yield this.ctx.model.Brands.create({brandid:6, brandName:"王老吉"});

            // 增加三个产品
            exist = yield this.ctx.model.Products.find({proid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.Products.collection.drop();
            } 

            yield this.ctx.model.Products.update(
                    {proid:0}, {$set: 
                        {  brandid:0, proName:"Budweiser/百威啤酒经典醇正500ml*18听 整箱拉罐",brandName:"百威啤酒", subBrand:"雀巢咖啡", spec:"268ml", weight:500, unit:"箱", 
                        pic:["https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/TB14vTYOpXXXXaVaXXXXXXXXXXX_!!0-item_pic.jpg_360x360Q90.jpg"], tag:["提神啊"]}, "valid":true}, {upsert:true});
                        
            yield this.ctx.model.Products.update(
                    {proid:1}, {$set: 
                        { brandid:1, proName:"可口可乐 樱桃口味 汽水355ml*6罐",brandName:"可口可乐", subBrand:"可口可乐", spec:"500ml", weight:500, unit:"箱", 
                        pic:["https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i3/1680305013431805350/TB2Zq8YfmFjpuFjSspbXXXagVXa_!!0-saturn_solar.jpg_360x360Q90.jpg"], tag:["冰了喝"]}, "valid":true}, {upsert:true});                           
            yield this.ctx.model.Products.update(
                    {proid:2}, {$set: 
                        { brandid:2, proName:"脉动",brandName:"脉动", subBrand:"脉动", spec:"500ml", weight:500, unit:"箱", 
                        pic:["https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/TB18.9iQpXXXXcFaXXXXXXXXXXX_!!0-item_pic.jpg_360x360Q90.jpg"], tag:["冰了喝"]}, "valid":true}, {upsert:true});

            yield this.ctx.model.Products.update(
                    {proid:3}, {$set: 
                        {  brandid:3, proName:"雀巢即饮咖啡丝滑拿铁268ml*15整箱 ",brandName:"雀巢", subBrand:"雀巢", spec:"135g", weight:500, unit:"瓶", 
                        pic:["https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/TB1s5LWRXXXXXXhXFXXXXXXXXXX_!!0-item_pic.jpg_360x360Q90.jpg"], tag:["加能量"]}, "valid":true}, {upsert:true});                            

            yield this.ctx.model.Products.update(
                    {proid:4}, {$set: 
                        {  brandid:4, proName:"农夫",brandName:"农夫", subBrand:"农夫", spec:"135g", weight:500, unit:"瓶", 
                        pic:["http://img0.imgtn.bdimg.com/it/u=3358639597,3248190429&fm=26&gp=0.jpg"], tag:["加能量"]}, "valid":true}, {upsert:true});

            yield this.ctx.model.Products.update(
                    {proid:5}, {$set: 
                        {  brandid:5, proName:"优诺蓝莓",brandName:"优诺", subBrand:"优诺", spec:"规格不大", weight:500, unit:"瓶", 
                        pic:["http://tse1.mm.bing.net/th?id=OIP.pguCdlQ06zItB0MPve8McQEsEs&w=214&h=203&c=7&qlt=90&o=4&dpr=2&pid=1.7"], tag:["提神啊"]}, "valid":true}, {upsert:true});
                    
            yield this.ctx.model.Products.update(
                    {proid:6}, {$set: 
                        {  brandid:6, proName:"王老吉",brandName:"王老吉", subBrand:"王老吉", spec:"500ml*24瓶", weight:500, unit:"瓶", 
                        pic:["http://img5.imgtn.bdimg.com/it/u=3447214318,1201584431&fm=26&gp=0.jpg"], tag:["提神啊"]}, "valid":true}, {upsert:true});

           
            exist = yield this.ctx.model.RedpacketRules.find({redpacketid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.RedpacketRules.collection.drop();
            }
            

            exist = yield this.ctx.model.PromotionRules.find({promotionid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.PromotionRules.collection.drop();
            }
            exist = yield this.ctx.model.TradeInRules.find({tradeInid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.TradeInRules.collection.drop();
            }
            
            exist = yield this.ctx.model.IntegrationRules.find({integrationid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.IntegrationRules.collection.drop();
            }

            // 增加三个活动规则, 促销，积分，换购，红包
            yield this.ctx.model.RedpacketRules.create({redpacketid:1, name:"红包问答", intro:"有奖问答", questionsPage:10, questionsUrl:"https://wj.qq.com/s/1406878/a44d", reward:10});
            yield this.ctx.model.PromotionRules.create({promotionid:1, name:"两瓶9元", intro:"新品促销"});
            yield this.ctx.model.TradeInRules.create({tradeInid:1, name:"积分换购", intro:"换购换购", collectionCount:10});
            yield this.ctx.model.IntegrationRules.create({integrationid:1, name:"扫码累积积分", integrateCount:100, popIntegration:200, guangIntegration:150});
        
            exist = yield this.ctx.model.Activitys.find({activityid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.Activitys.collection.drop();
            }
            
            // 将规则增加到活动表中
            yield this.ctx.model.Activitys.create({valid:true, activityid:1, activityName:"红包活动", tag:"红包", url:"https://wj.qq.com/s/1406878/a44d",ruleid:1, platform:"official", type:"redpacket"});
            yield this.ctx.model.Activitys.create({valid:true, activityid:2, activityName:"促销活动", tag:"积分换购",url:"https://wj.qq.com/s/1406878/a44d",ruleid:1, platform:"official", type:"promotion"});
            // 换购自动触发
            yield this.ctx.model.Activitys.create({valid:true, activityid:3, activityName:"换购活动", tag:"＋4元换购l",url:"https://wj.qq.com/s/1406878/a44d",ruleid:1, platform:"official", type:"tradeIn"});
            yield this.ctx.model.Activitys.create({valid:true, activityid:4, activityName:"积分活动", tag:"荐",url:"https://wj.qq.com/s/1406878/a44d",ruleid:1, platform:"official", type:"integration"});

            exist = yield this.ctx.model.ProductBatchs.find({proBatchid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.ProductBatchs.collection.drop();
            }
            // 将proid，popid，activity的id增加到productBatchs

            yield this.ctx.model.ProductBatchs.create({proBatchid:1, batchid:1, desc:"Nestle/雀巢即饮咖啡丝滑拿铁", proid:3, store:100, tag:["顺滑","口感好"], 
            popid:"B0FFFDBWFO", activity:[1,2,3,4]});
            yield this.ctx.model.ProductBatchs.create({proBatchid:2, batchid:2, desc:"优诺原味", proid:5, store:100, tag:["顺滑","口感好"], 
            popid:"B0FFFDBWFO", activity:[1,2,3,4]});
            yield this.ctx.model.ProductBatchs.create({proBatchid:3, batchid:3, desc:"百威啤酒经典醇正", proid:0, store:100, tag:["顺滑","口感好"], 
            popid:"B0FFFDBWFO", activity:[1,2,3,4]});
            yield this.ctx.model.ProductBatchs.create({proBatchid:6, batchid:6, desc:"MIZONE/脉动维生素饮料青柠味 ", proid:2, store:100, tag:["顺滑","口感好"], 
            popid:"B0FFFDBWFO", activity:[1,2,3,4]});
            yield this.ctx.model.ProductBatchs.create({proBatchid:7, batchid:7, desc:"农夫山泉", proid:4, store:100, tag:["顺滑","口感好"], 
            popid:"B0FFFDBWFO", activity:[1,2,3,4]});
            yield this.ctx.model.ProductBatchs.create({proBatchid:8, batchid:8, desc:"王老吉", proid:6, store:120, tag:["顺滑2","口感好2"], 
            popid:"B0FFFDBWFO", activity:[1,3,4]});
            yield this.ctx.model.ProductBatchs.create({proBatchid:9, batchid:9, desc:"美国进口「可口可乐」樱桃口味 汽水", proid:1, store:120, tag:["顺滑2","口感好2"], 
            popid:"B0FFFDBWFO", activity:[1,2,4]});
            
            exist = yield this.ctx.model.ScanProRecords.find({uid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.ScanProRecords.collection.drop();
            }

            exist = yield this.ctx.model.BrandTradeIn.find({uid:{$exists:true}});
            if(exist && exist.length > 0) {
                yield this.ctx.model.BrandTradeIn.collection.drop();
            }
            this.ctx.body="complete";
        }
    }
    return ProductService;
}