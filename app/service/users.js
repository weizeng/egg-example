module.exports = app => {
    class UsersService extends app.Service {
        * index(params) {
            let users = yield this.ctx.model.users.find(params);
            let result = {};
            result.meta = {
                total: users.length
            };
            result.data = users;
            return result;
        }

        * create(ctx, request) {
            if (!request) {
                return
            };
            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "counter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.uid = doc.uid;
            let result = yield ctx.model.Users.create(request);
            console.log(result);
            return result;
        }
    }
    return UsersService;
}