module.exports = app => {
  const mongoose = app.mongoose;
  const PopSchema = new mongoose.Schema({
    popid:{ type : Number, unique : true},
    popName: { type : String },
    address: { type : String },
    lon: { type : Number },
    lat: { type : Number },
    category: { type : String },
    popHotImg : { type : String},
    popImgs : { type : Array},
    lastUpdate:{ type: Date, 'default' : Date.now },
    createDate:{ type: Date, 'default' : Date.now }
  });

  return mongoose.model('Pops', PopSchema);
}