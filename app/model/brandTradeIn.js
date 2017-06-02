// 用户和品牌的换购表
module.exports = app => {
  const mongoose = app.mongoose;
  const brandTradeInSchema = new mongoose.Schema({
        uid:{type:Number},
        brandid : {type : Number, default: 0},
        brandName : {type : String}, // 大品牌 比如可口可乐
        level:{type:String}, // 白金
        brandIntegration:{type:Number}, // 品牌积分
        // [{"proid":1, "proName":"可口可乐", "pic":"","tradeTotal":20, "tradeCurrent":10, "ruleid":1, "type":"tradeIn"}]
        productTradeRecord:{type:Array}, // 具体产品细节
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('BrandTradeIn', brandTradeInSchema);
}