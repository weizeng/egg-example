module.exports = app => {
  const mongoose = app.mongoose;
  // 我的收藏，许原单，喜欢，购物车
  const CollectionSchema = new mongoose.Schema({
    collectionid:{ type : Number, unique : true},
    proid: { type : Number },
    uid: { type : Number },
    productName: { type : String },
    collected:{type : Number},// 是否收藏 1 已经收藏
    liked:{type : Number},// 是否收藏
    wishWell:{type : Number},// 许愿车
    commented:{type : Number, 'default' : false},// 评论
    createDate:{type : Date, 'default' : Date.now }
  });

  return mongoose.model('Collections', CollectionSchema);
}