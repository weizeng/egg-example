module.exports = app => {
    class ActivitysService extends app.Service {
        * index(ctx, params) {
            
            let users = yield ctx.model.Activitys.find(params);
            let result = {};
            result.meta = {
                total: users.length
            };
            result.data = users;
            return result;
        }

        * show(ctx, params) {
            let news =  yield this.ctx.model.Activitys.find({activityid:params.id});
            let result = {};
            result.meta = {total: news.length };
            result.data = news;
            return result;
        }

        * create(ctx, request) {

            if (!request) {
                return
            };
            
            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "activityCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.activityid = doc.uid;
            console.log("###############222",request);
            let result = yield ctx.model.Activitys.create(request);
            
            return result;
        }

        * destroy(ctx, params) {
            let result = this.ctx.model.Activitys.remove({"activityid":{ $in:params.id.split(',')}});
            return result;
        }
        
    }
    return ActivitysService;
}