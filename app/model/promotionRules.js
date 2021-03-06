module.exports = app => {
  const mongoose = app.mongoose;
  // 促销
  const PromotionSchema = new mongoose.Schema({
        promotionid : {type : Number, default: 0},
        name : {type : String},
        intro : { type : String},// 规则说明
        brandid : { type : Number},// 品牌id
        store : { type : Number},// 促销库存
        skuPrice : { type : Number},// 促销单价
        skuCount : { type : Number},// 促销多瓶 如两瓶
        totalPrice : { type : Number},// 促销多瓶的价格 如9.9
        reward : { type : String}, // 奖励 积分？ 
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('PromotionRules', PromotionSchema);
}