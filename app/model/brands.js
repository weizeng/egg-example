module.exports = app => {
  const mongoose = app.mongoose;
  const brandSchema = new mongoose.Schema({
        brandid : {type : Number, default: 0},
        brandName : {type : String},
        brandNameEn : {type : String},
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('Brand', brandSchema);
}