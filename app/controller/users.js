'use strict';

module.exports = app => {
  class UserController extends app.Controller {
     * index () {
        const result = yield this.service.users.index(this.params);
        if(result) {
          this.success(result);
        } else {
          this.failed();
        }
    };

    * create() {      
      yield this.service.users.create();
    }

    * login() {      
      yield this.service.users.login();
    }

    * updateUser() {
       yield this.service.users.updateUser();
    }
  }
  return UserController;
};
