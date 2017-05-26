module.exports = app => {
  const mongoose = app.mongoose;
  const IdgSchema = new mongoose.Schema({
        myModelName : { type : String },
        uid : {type : Number, default: 0},
        // activityid : {type : Number, default: 0},
        // popid : {type : Number, default: 0},
        // proid : {type : Number, default: 0},
        // brandid: {type : Number, default: 0},
    });
    return mongoose.model('Idg', IdgSchema);
}