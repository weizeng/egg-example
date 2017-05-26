module.exports = app => {
    class PopsService extends app.Service {
        * index(ctx, params) {
            
            let users = yield ctx.model.Pops.find(params);
            let result = {};
            result.meta = {
                total: users.length
            };
            result.data = users;
            return result;
        }

        * show(ctx, params) {
            let news =  yield this.ctx.model.Pops.find({popid:params.id});
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
                myModelName: "popCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.popid = doc.uid;
            console.log("###############222",request);
            let result = yield ctx.model.Pops.create(request);
            
            return result;
        }

        * destroy(ctx, params) {
            let result = this.ctx.model.Pops.remove({"popid":{ $in:params.id.split(',')}});
            return result;
        }
        
    }
    return PopsService;
}