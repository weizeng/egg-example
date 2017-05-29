'use strict';

// 产品, 超市，活动的逻辑处理
// 根据uid，和其他附带信息查找用户收藏的东西


module.exports = app => {
  class CollectionController extends app.Controller {
      // 显示列表,
        * index () {
            yield this.service.collections.index();
        };

        // 创建单品, 
        * create() {
            yield this.service.collections.create();
        }

        // 显示单品
        * show () {
            yield this.service.collections.show();
        };

        * findCollectionByUidAndOther(){
            yield this.service.collections.findCollectionByUidAndOther();
        };

        * updateCollectionByUidAndOther(){
            yield this.service.collections.updateCollectionByUidAndOther();
        };

        // 删除单品
        * deleteCollection () {
            yield this.service.collections.deleteCollection();
        };
  }
  return CollectionController;
};

 