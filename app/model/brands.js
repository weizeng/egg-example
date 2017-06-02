// 品牌，以及基础属性
module.exports = app => {
  const mongoose = app.mongoose;
  const brandsSchema = new mongoose.Schema({
        brandid : {type : Number, default: 0},
        brandName : {type : String},// 大品牌 比如可口可乐
        subBrand:{ type:String},// 子品牌 比如子品牌
        subName : {type : String},

        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('Brands', brandsSchema);
}