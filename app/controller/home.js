'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.success("ff");
      // this.ctx.body = 'hi, egg22';
    }

    
  }
  return HomeController;
};
