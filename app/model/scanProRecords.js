module.exports = app => {
  const mongoose = app.mongoose;
  const recordSchema = new mongoose.Schema({
        recordid : {type : Number, default: 1},
        uid : {type : Number},
        proid : {type : Number}, // 产品id
        proName : {type : String}, // 产品名字
        brandid : { type: Number},
        brand : { type: String},
        // Array [{"type":"integration", "guangIntegration":100, "popIntegration":50,"ruleid":2}, {"type":"tradeIn", "ruleid":1}]
        records:{ type:Array},
        popid : {type : Number}, // 活动提供的 商家
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('ScanProRecords', recordSchema);
}