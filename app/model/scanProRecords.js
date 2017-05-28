module.exports = app => {
  const mongoose = app.mongoose;
  const recordSchema = new mongoose.Schema({
        recordid : {type : Number, default: 1},
        uid : {type : String},
        proid : {type : Number}, // 产品id
        proName : {type : String}, // 产品名字
        brandid : { type: Number},
        brand : { type: String},
        tradeInid: { type: Number},// 对应积分规则表
        discount : { type : Number},
        type : {type : Number}, // 活动类型， 0 红包活动 1 积分活动
        popid : {type : Number}, // 活动提供的 商家
        condit : {type : String}, // 活动达成条件, 以json形式动态处理 {"questionsPage":1, "tradeIn" : {"brand":"芬达", "complete":10}}
        guangIntegration : { type : Number},// 逛逛平台积分
        popIntegration : { type : Number},// 商家赠予积分
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('ScanProRecords', recordSchema);
}