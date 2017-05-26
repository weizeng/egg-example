module.exports = app => {
  const mongoose = app.mongoose;
  const tradeInSchema = new mongoose.Schema({
        tradeInid : { type : Number },
        name : {type : String},
        intro : { type : String},
        brandid : {type : Number},
        brand : {type : String},
        valid : {type : Boolean, 'default' : true},
        collectionCount : {type : Number}, // 换购规则，收集多少次才能换购
        reward:{type:Number}, // 获得积分，换购sku
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('TradeInRules', tradeInSchema);
}