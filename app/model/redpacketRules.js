module.exports = app => {
  const mongoose = app.mongoose;
  // 红包
  const RedpacketRuleSchema = new mongoose.Schema({
        redpacketid : {type : Number, default: 0},
        name : {type : String},
        intro : { type : String},
        brandid : { type : Number},
        condition : { type : String},//{"questionsPage":10}
        // condit : {type : String}, // 活动达成条件, 以json形式动态处理 {"questionsPage":10} / {"tradeIn" : {"brand":"芬达", "complete":10}}
        reward : { type : Number}, // 奖励 10
        
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('RedpacketRules', RedpacketRuleSchema);
}