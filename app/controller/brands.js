'use strict';

// 显示列表
exports.index = function* (ctx) {
  const result = yield this.service.brands.index(ctx, this.params);
  
  this.status = 200;
  this.body = result;
};

// 创建单品
exports.create = function*(ctx) {
    const result = yield this.service.brands.create(ctx, this.request.body);
    
    this.status = 201;
    this.body = result;
}

// 显示单品
exports.show = function* (ctx) {
    const result = yield this.service.brands.show(ctx, ctx.params);
    this.status = 200;
    this.body = result;
};

// 编辑单品
exports.edit = function* (ctx) {

};

// 更新单店
exports.update = function* (ctx) {

};

// 删除单品
exports.destroy = function* (ctx) {
    const result = yield this.service.brands.destroy(ctx, ctx.params);
    // 设置响应体和状态码
    this.body = result;
    this.status = 204;
};

// 获取最新创建的单品
exports.new = function*(ctx) {
    
}

