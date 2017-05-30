module.exports = app => {
  const mongoose = app.mongoose;
  const smsCodeSchema = new mongoose.Schema({
        code : {type : String},
        mobile : {type : String},
        createDate:{ type: Date, 'default' : Date.now }
    });
    return mongoose.model('SmsCodes', smsCodeSchema);
}