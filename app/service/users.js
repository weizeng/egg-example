'use strict';

var YUNPIAN = require('yunpian-sdk');

module.exports = app => {
    class UsersService extends app.Service {
        * index(params) {
            let users = yield this.ctx.model.Users.find(params);
            let result = {};
            result.meta = {
                total: users.length
            };
            result.data = users;
            return result;
        }
        // 发送短信验证码
        * sendSmsCode() {
            // 
            if (!this.ctx.request.body || !this.ctx.request.body.mobile) {
                return this.result(false, 100);
            }
            let existUser = yield this.ctx.model.Users.findOne({mobile:this.ctx.request.body.mobile});
            if(existUser && existUser.mobile) {
                return this.result(false, 105);
            }

            // 使用云片短信
            const sms = new YUNPIAN.SMS({
                apikey: 'e71179c31ed9930b44c3ec08c49f5bb7'
            });
            // 产生随机6位数字
            let randomNum = "";
            for(var i=0;i<6;i++) { 
                randomNum+=Math.floor(Math.random()*10); 
            } 

            this.ctx.model.SmsCodes.create({"mobile":this.ctx.request.body.mobile, "code": randomNum});

            let res = yield sms.singleSend({
                mobile: this.ctx.request.body.mobile,
                text: '【逛逛网】'+randomNum+'(#有惊喜#手机验证码，请完成验证)，如非本人操作，请忽略本短信'
            });
            this.result(res.code == 0, res.code, res.detail);
            
        }

        * createByMobile() {
            // 通过短信验证码注册
            if (!this.ctx.request.body || !this.ctx.request.body.mobile || !this.ctx.request.body.code || !this.ctx.request.body.password) {
                // 电话号码为空，短信验证码为空
                return this.result(false, 100);
            };
            let existUser = yield this.ctx.model.Users.findOne({mobile:this.ctx.request.body.mobile});
            if(existUser && existUser.mobile) {
                return this.result(false, 105);
            }

            // this.ctx.request.body.
            let existSmsCode = yield this.ctx.model.SmsCodes.find({mobile : this.ctx.request.body.mobile}).sort({createDate : -1}).limit(1);
            if(existSmsCode && existSmsCode.length > 0 &&  existSmsCode[0]._doc.code == this.ctx.request.body.code) {
                //  可以注册, 
                let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                    myModelName: "userCounter"
                }, {
                    $inc: {
                        'uid': 1
                    }
                }, {returnNewDocument:true});
                
                this.ctx.request.body.uid = doc.uid;

                let result = yield this.ctx.model.Users.create(this.ctx.request.body);
                return this.result(true, 0, result);
            }
            this.result(false, 100, "验证码不正确");
        }

        * create() {
            // 通过账号密码注册
            if (!this.ctx.request.body || !this.ctx.request.body.userName || !this.ctx.request.body.password) {
                return this.result(false, 100);
            };
            
            let user = yield this.ctx.model.Users.findOne({"mobile":this.ctx.request.body.userName});
            if(user) {
                return this.result(false, 101);
            }
            
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "counter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {returnNewDocument:true});
            
            this.ctx.request.body.uid = doc.uid;

            let result = yield this.ctx.model.Users.create(this.ctx.request.body);
            this.result(true, 0, result);
        }

        * login() {
            if (!this.ctx.request.body || !this.ctx.request.body.mobile || !this.ctx.request.body.password) {
                return this.result(false, 100);
            };
            let user = yield this.ctx.model.Users.findOne({"mobile":this.ctx.request.body.mobile, "password":this.ctx.request.body.password});
            if(user) {
                return this.result(true, 0, user);
            } else {
                let existUser = yield this.ctx.model.Users.findOne({"mobile":this.ctx.request.body.mobile});
                if(existUser) {
                    return this.result(false, 103);
                } else {
                    return this.result(false, 106);
                }
            }
        }

        * updateUser() {
            if (!this.ctx.headers.uid) {
                return this.result(false, 102);
            };
            if (this.ctx.request.body.userName) {
                return this.result(false, 104);
            };
            let result = yield this.ctx.model.Users.findOneAndUpdate(
                {"uid" : this.ctx.headers.uid},
                {
                    $set:this.ctx.request.body
                },
                {returnNewDocument:true}
            );
            let re = (result!=null);

            this.result(re, re ? 0:104, result);
        }

        * findUserIntergation() {
            if (!this.ctx.headers.uid) {
                return this.result(false, 102);
            };
            let result = yield this.ctx.model.BrandTradeIn.find({uid:this.ctx.headers.uid});
            let user = yield this.ctx.model.Users.findOne({uid:this.ctx.header.uid});
            // 逛逛平台积分

            // result._doc.guangIntegration = user.guangIntegration;
            let rr = {brandTrade:result, guangIntegration:user.guangIntegration};

            this.result(true, 0, rr);
        }
    }
    return UsersService;
}