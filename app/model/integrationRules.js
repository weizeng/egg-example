module.exports = app => {
  const mongoose = app.mongoose;
  const integrationsSchema = new mongoose.Schema({
        integrationid : { type : Number },
        name : {type : String},
        intro : { type : String},
        brandid : {type : Number}, // 品牌id
        brandName : {type : String}, // 品牌
        integrateCount:{type: Number},// 本次活动可以累积多少次
        guangIntegration : {type : Number, default: 0},// 逛逛积分多少
        popIntegration : {type : Number, default: 0},// 商家的积分多少
        valid : {type : Boolean, 'default' : true},
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('IntegrationRules', integrationsSchema);
}