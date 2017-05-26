'use strict';

// 产品, 超市，活动的逻辑处理
// 根据uid，和其他附带信息查找用户收藏的东西

// 显示列表,
exports.index = function* (ctx) {
  const result = yield this.service.collections.index(ctx, this.params);
  
  this.status = 200;
  this.body = result;
};

// 创建单品, 
exports.create = function*(ctx) {
    const result = yield this.service.collections.create(ctx, this.request.body);
    
    this.status = 201;
    this.body = result;
}

// 显示单品
exports.show = function* (ctx) {
    const result = yield this.service.collections.show(ctx, ctx.params);
    this.status = 200;
    this.body = result;
};

// 编辑单品
exports.edit = function* (ctx) {

};

exports.findCollectionByUidAndOther = function* (ctx){
    const result = yield this.service.collections.findCollectionByUidAndOther(ctx);
    this.status = 201;
    this.body = result;
};

exports.updateCollectionByUidAndOther = function* (ctx){
    const result = yield this.service.collections.updateCollectionByUidAndOther(ctx);
    this.status = 201;
    this.body = result;
};

// 删除单品
exports.destroy = function* (ctx) {
    const result = yield this.service.collections.destroy(ctx, ctx.params);
    // 设置响应体和状态码
    this.body = result;
    this.status = 204;
};

// 获取最新创建的单品
exports.new = function*(ctx) {
    
}

