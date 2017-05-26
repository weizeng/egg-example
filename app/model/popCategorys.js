module.exports = app => {
  const mongoose = app.mongoose;
  const CategorySchema = new mongoose.Schema({
        categoryId : {type : Number, default: 0},
        category : {type : String},
    });
    return mongoose.model('PopCategorys', CategorySchema);
}