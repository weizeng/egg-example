'use strict';

exports.index = function* () {
  const result = yield this.service.users.index(this.params);
  this.body = result;
  this.status = 200;
};

exports.doCreate = function*(ctx) {
    // const result = yield this.curl('https://httpbin.org/get?foo=bar');
    
    // this.body = yield ctx.model.User.find({});
    // console.log(ctx.model);
    const result = yield this.service.users.create(ctx, this.request.body);
    // console.log("enter .....");
    // this.status = result.status;
    // this.set(result.headers);
    // this.body = result.data;
    console.log("###############", result);
    this.body = result;
    this.status = 201;
}