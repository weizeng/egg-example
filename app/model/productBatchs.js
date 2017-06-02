// 产品批次
module.exports = app => {
  const mongoose = app.mongoose;
  const productBatchsSchema = new mongoose.Schema({
        proBatchid : {type : Number, default: 0, unique:true},
        batchid : { type:Number, default: 0}, // 产品进来的批次
        proid : {type : Number}, // 产品详细id, 可以相等
        desc : { type : String}, // 产品批次的说明
        comment:{ type:Array}, // 产品批次的评论
        store : { type:Number}, // 库存多少
        tag:{ type: Array}, // 这个产品批次的特征，如顺滑，口感好
        popid : { type:String, default: 0}, // 归属于哪一个店
        activity : { type : Array}, // 产品参与各种活动（比如有积分活动，促销活动，红包活动）,放id即可
        valid :{ type : Boolean, 'default' : true },
        lastUpdate:{ type: Date, 'default' : Date.now },
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('ProductBatchs', productBatchsSchema);
}