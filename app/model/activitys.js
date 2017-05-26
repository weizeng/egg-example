module.exports = app => {
  const mongoose = app.mongoose;
  const ActivitySchema = new mongoose.Schema({
        activityid : {type : Number, default: 0},
        activityName : {type : String},
        address : { type : String},
        startDate : { type: Date, 'default' : Date.now },
        endDate : { type: Date, 'default' : Date.now },
        intro : { type : String},
        detailRef : { type : Array}, //  比如 超市平台（沃尔玛）发起红包问答，附带多种品牌的红包规则id
        platform : {type : String}, // 活动发起平台方面 官方－official, 超市- supermasket 厂家－factory
        type : {type : String}, // 活动类型，红包活动-redpacket，促销-promotion，积分活动-integration
        valid : {type: Boolean}, // 活动是否有效
        popid : {type : Number}, //  超市／便利店
        
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('Activitys', ActivitySchema);
}