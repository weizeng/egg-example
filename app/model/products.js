module.exports = app => {
  const mongoose = app.mongoose;
  const ProductSchema = new mongoose.Schema({
        proid : {type : Number, default: 0},
        batchid : {type : Number, default: 0},// 进货批次区分同一个产品在不同的店铺
        productName : {type : String},
        brand : { type : String},
        subBrand : { type : String},
        proHotImg : {type : String},
        proImgs : { type : Array},
        intro : { type : String},
        price : { type : Number},
        tag:{ type: Array}, // 产品有标签，如顺滑，口感好
        activity : { type : Array}, // 产品参与各种活动（比如有积分活动，促销活动，红包活动）,放id即可
        valid :{ type : Boolean, 'default' : true },
        lastUpdate:{ type: Date, 'default' : Date.now },
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('Products', ProductSchema);
}