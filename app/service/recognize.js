const fs = require('fs');
const path = require('path');
var sd = require('silly-datetime');

module.exports = app => {
    class RecognizeService extends app.Service {
        * recognizeProduct() {
            // 获取提交上来的文件流
            const stream = yield this.ctx.getFileStream();
            var fileName = "/data/" + sd.format(new Date(), 'YYYY-MM-DD_HH-mm-ss') + ".jpg";
            
            console.log("图片保存路径是：" + fileName);
            // 保存图片到本地
            const ws = fs.createWriteStream(fileName);
            stream.pipe(ws);
 
            // pipe 保存图片到指定路径, 然后curl一个请求
            let recoUrl = "http://111.230.129.130:8081"
            const rr = yield app.curl(recoUrl, {
                method: 'GET',
                dataType: 'text',
                headers:{
                    "fileName":fileName //"a.jpg"
                }
            });
            console.log("222",rr.data);
            if(rr && rr.data && rr.status == 200 && rr.data.indexOf("@@") > 0) {
                let recognizeStr = rr.data.split("@@");
                let recognizeFileName = recognizeStr[0].trim();
                let recognizeProid = recognizeStr[1].trim();
                console.log("识别出来产品id：" + recognizeProid);
            
                // 重复代码！    
                let theProduct = yield this.ctx.model.ProductBatchs.findOne({"proid":recognizeProid, "valid":true});
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
            
            this.result(false, 301,"抱歉，未能识别");
        }

    }
    return RecognizeService;
}