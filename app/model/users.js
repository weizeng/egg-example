module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    uid:{ type : Number, unique : true},
    userName: { type : String },
    password: { type : String },
    nickName: { type : String },
    sex: { type : Number ,'default' : 0},// 0 男 1女
    headerImg : { type : String},
    birthday:{ type: Date, 'default' : Date.now },
    area:{ type : String},
    mobile : { type : Number},
    wexinToken : {type : String}, // 微信 Token
    xcxToken : { type : String}, // 小程序 Token
    qqToken : {type : String}, // qqToken
    vip : { type : Number},
    popIntegration : { type : Number},// 商户积分
    guangIntegration : { type : Number},// 逛逛平台积分
    lastUpdate:{ type: Date, 'default' : Date.now },
    createDate:{ type: Date, 'default' : Date.now }
  });

  return mongoose.model('Users', UserSchema);
}