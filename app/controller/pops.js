'use strict';

// 显示店铺列表
exports.index = function* (ctx) {
  const result = yield this.service.pops.index(ctx, this.params);
  
  this.status = 200;
  this.body = result;
};

// 创建单店
exports.create = function*(ctx) {
    const result = yield this.service.pops.create(ctx, this.request.body);
    console.log("###############", result);
    
    this.status = 201;
    this.body = result;
}

// 显示单店
exports.show = function* (ctx) {
    // console.log(ctx);
    // this.body = ` show : ${ctx.params.id}`;
    const result = yield this.service.pops.show(ctx, ctx.params);
    this.status = 200;
    this.body = result;
};

// 编辑单店
exports.edit = function* (ctx) {

};

// 更新单店
exports.update = function* (ctx) {

};

// 删除单店
exports.destroy = function* (ctx) {
    const result = yield this.service.pops.destroy(ctx, ctx.params);
    // 设置响应体和状态码
    this.body = result;
    this.status = 204;
};

// 获取最新创建的单店
exports.new = function*(ctx) {
    
}

