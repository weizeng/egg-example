'use strict';

module.exports = app => {
  class ProductController extends app.Controller {
      // 显示列表
    * createProduct() {
        yield this.service.products.createProduct();
    };

// 创建单品
    * updateProduct () {
        yield this.service.products.updateProduct();
    }

// 显示单品
    * findOneProduct() {
        yield this.service.products.findOneProduct();
    };

// 删除单品
    * findAllProduct() {
        yield this.service.products.findAllProduct();
    };
     * createMonitorData() {
        yield this.service.products.createMonitorData();
    };
  }
  return ProductController;
};