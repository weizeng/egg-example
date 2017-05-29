
module.exports = app => {
    class ProductService extends app.Service {
        
        * createProduct() {
            if (!this.ctx.request.body) {
                return this.result(fales, 100);
            };
             if (!this.ctx.request.body.productName) {
                return this.result(fales, 308);
            };
            if (!this.ctx.request.body.brand) {
                return this.result(fales, 305);
            };
            if(!this.ctx.request.body.activity) {
                return this.result(fales, 306);
            }
             
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "productCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.proid = doc.uid;

            let res = yield this.ctx.model.Activitys.create(this.ctx.request.body);
            
            this.result(true, 0, res);
        }

                
        * updateProduct() {
            if(!this.ctx.params.proid) {
                return this.result(false, 100);
            }
            //
            if (!this.ctx.request.body.productName) {
                return this.result(false, 100);
            };
            let result = yield this.ctx.model.Products.findOneAndUpdate(
                {"proid" : this.ctx.params.proid},
                {
                    $set:this.ctx.request.body
                },
                {returnNewDocument:true}
            );
            let re = (result!=null);

            this.result(re, re ? 0:104, result);
        }

        * findOneProduct(){
            if(!this.ctx.params.proid) {
                return this.result(false, 100);
            }
            let res = yield this.ctx.model.Products.findOne({proid:this.ctx.params.proid});
            this.result(true, 0, res);
        }

        * findAllProduct() {
            let res = yield this.ctx.model.Products.find({});
            this.result(true, 0, res);
        }
    }
    return ProductService;
}