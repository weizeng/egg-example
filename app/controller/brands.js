'use strict';

module.exports = app => {
  class BrandController extends app.Controller {
      // 显示列表
    * index() {
        yield this.service.brands.index(ctx, this.params);
    };

// 创建单品
    * create () {
        yield this.service.brands.create(ctx, this.request.body);
    }

// 显示单品
    * show() {
        yield this.service.brands.show(ctx, ctx.params);
    };

// 删除单品
    * destroy() {
        yield this.service.brands.destroy(ctx, ctx.params);
    };
  }
  return BrandController;
};