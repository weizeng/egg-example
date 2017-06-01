module.exports = app => {
  const mongoose = app.mongoose;
  const PopSchema = new mongoose.Schema({
    popid: { type : Number, unique : true},// 系统定义的popid
    id: { type : String, unique : true},// 高德给的poi 的id，如“B02500S5AY”
    name: { type : String },
    tag:{ type : Array},
    type: { type : String },
    typecode: { type : String },
    address: { type : String },
    location: { type : String },
    tel: { type : String },
    postcode: { type : Array },
    website: { type : Array },
    email: { type : Array },
    pcode: { type : String },
    pname: { type : String },
    citycode: { type : String },
    cityname: { type : String },
    adcode: { type : String },
    adname: { type : String },
    importance: { type : Array },
    shopid: { type : Array },
    shopinfo: { type : String },
    poiweight: { type : Array },
    gridcode: { type : String },
    distance: { type : String },
    navi_poiid: { type : String },
    entr_location: { type : Array },
    business_area: { type : String },
    exit_location: { type : Array },
    match: { type : String },
    recommend: { type : String },
    timestamp: { type : Array },// 存放json字符串
    alias: { type : Array },// 存放json字符串
    indoor_map: { type : String }, 
    indoor_data:{ type : Array },// 存放json字符串
    groupbuy_num: { type : String },
    discount_num: { type : String },
    biz_ext: { type : Array },// 存放json字符串
    event: { type : Array },
    children: { type : Array },
    photos: { type : Array },// 存放json字符串
    createDate:{ type: Date, 'default' : Date.now }
  });

  return mongoose.model('Pops', PopSchema);
}