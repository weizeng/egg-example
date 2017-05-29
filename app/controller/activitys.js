'use strict';

module.exports = app => {
  class ActivityController extends app.Controller {
    // 显示列表
    * index () {
        yield this.service.activitys.index();
    };

    // 创建单品
    * create () {
        yield this.service.activitys.create();
    }

    // 显示单品
    * show () {
        yield this.service.activitys.show();
    };

    // 编辑单品
    * edit () {

    };

    // 更新单店
    * update () {

    };

    // 删除单品
    * destroy () {
        yield this.service.activitys.destroy();
    };

  }
  return ActivityController;
};

