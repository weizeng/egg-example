'use strict';
module.exports = app => {
  class PopController extends app.Controller {
   // 显示所有店铺列表
    * findPopsAll () {
        yield this.service.pops.findPopsAll();
    };

    * createPop () {
        yield this.service.pops.createPop();
    }

    * findPopsNearBy() {
         yield this.service.pops.findPopsNearBy();
    }

    // 显示单店
    * findPopWithPopid() {
        yield this.service.pops.findPopWithPopid();
    };

    // 编辑单店
    * updatePop() {
        yield this.service.pops.updatePop();
    };
 
    // 删除单店
    * deletePop() {
          yield this.service.pops.deletePop();
    };
    
  }
  return PopController;
};

 

