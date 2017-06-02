// 品牌，以及基础属性
module.exports = app => {
  const mongoose = app.mongoose;
  const productsSchema = new mongoose.Schema({
        proid : {type : Number, default: 0},
        proName:{type: String},
        brandid : {type : Number},// 大品牌的id
        brandName : {type : String},// 大品牌 比如可口可乐
        subBrand:{ type:String},// 子品牌 比如子品牌
        brandNameEn : {type : String},
        spec:{ type: String}, // 产品规格
        weight:{ type:Number},// 产品的重量
        unit:{type:String},// 罐,箱
        pic:{type:Array},// 图片
        comment:{ type:Array},// 产品评论
        tag:{ type: Array}, // 产品有标签，如顺滑，口感好
        valid:{ type: Boolean, 'default':true}, // 产品有标签，如顺滑，口感好
        lastUpdateDate:{ type: Date, 'default' : Date.now },
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('Products', productsSchema);
}