'use strict';
var YUNPIAN = require('yunpian-sdk');
 

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      // this.success("ff");
            
      const sms = new YUNPIAN.SMS({
        apikey: 'e71179c31ed9930b44c3ec08c49f5bb7'
      });

      (async() => {
        console.log(await sms.singleSend({
          mobile: '13666007202',
          text: '【逛逛网】654321(#有惊喜#手机验证码，请完成验证)，如非本人操作，请忽略本短信'
        }));
      })();
      this.ctx.body = 'hi, egg22';
    }

    
  }
  return HomeController;
};
