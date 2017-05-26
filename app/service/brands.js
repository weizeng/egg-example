module.exports = app => {
    class BrandsService extends app.Service {
        * index(ctx, params) {
            
            let users = yield ctx.model.Brands.find(params);
            let result = {};
            result.meta = {
                total: users.length
            };
            result.data = users;
            return result;
        }

        * show(ctx, params) {
            let news =  yield this.ctx.model.Brands.find({brandid:params.id});
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
                myModelName: "brandCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            request.brandid = doc.uid;
            console.log("###############222",request);
            let result = yield ctx.model.Brands.create(request);
            
            return result;
        }

        * destroy(ctx, params) {
            let result = this.ctx.model.Brands.remove({"brandid":{ $in:params.id.split(',')}});
            return result;
        }
        
    }
    return BrandsService;
}