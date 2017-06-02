module.exports = app => {
  const mongoose = app.mongoose;
  // 有奖红包问卷
  const RedpacketRuleSchema = new mongoose.Schema({
        redpacketid : {type : Number, default: 0},
        name : {type : String},
        intro : { type : String},
        questionsPage : { type : Number},
        questionsUrl: { type : String},// 静态的网站地址
        reward : { type : Number}, // 奖励 10
        
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('RedpacketRules', RedpacketRuleSchema);
}