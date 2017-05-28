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

        * create() {
            if (!this.ctx.request.body || !this.ctx.request.body.userName) {
                return this.result(false, 100);
            };
            let user = yield this.ctx.model.Users.findOne({"userName":this.ctx.request.body.userName});
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
            if (!this.ctx.request.body || !this.ctx.request.body.userName || !this.ctx.request.body.password) {
                return this.result(false, 100);
            };
            
            let user = yield this.ctx.model.Users.findOne({"userName":this.ctx.request.body.userName, "password":this.ctx.request.body.password},{"password":0});
            if(user) {
                return this.result(true, 0, user);
            } else {
                return this.result(false, 103);
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

    }
    return UsersService;
}