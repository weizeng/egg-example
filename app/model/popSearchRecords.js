// 用户定位后查询结果记录，便于后期找问题

module.exports = app => {
  const mongoose = app.mongoose;
  const PopRecordSchema = new mongoose.Schema({
    // popid:{ type : Number, unique : true}, // 系统定义的popid
    uid:{ type:Number },
    popids: { type : Array},// 查询出来的结果集关联pop表的id
    startPage:{type : Number},
    offSet:{type : Number},
    location: { type : String },
    createDate:{ type: Date, 'default' : Date.now }
  });

  return mongoose.model('PopSearchRecords', PopRecordSchema);
}