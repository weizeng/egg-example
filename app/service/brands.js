module.exports = app => {
    class BrandsService extends app.Service {
        * index() {
            
            let users = yield this.ctx.model.Brands.find(params);
            this.result(true, 0, users);
        }

        * show() {
            let news =  yield this.ctx.model.Brands.find({brandid:this.ctx.params.id});
            this.result(true, 0, news);
        }

        * create() {

            if (!this.ctx.request.body) {
                return this.result(false, 100);
            };
            
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "brandCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.brandid = doc.uid;
            let res = yield ctx.model.Brands.create(this.request.body);
            this.result(true, 0 , res);
        }

        * destroy(ctx, params) {
            let res = this.ctx.model.Brands.remove({"brandid":{ $in:this.ctx.params.id.split(',')}});
            this.result(true, 0 , res);
        }
        
    }
    return BrandsService;
}