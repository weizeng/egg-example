module.exports = app => {
    class PopsService extends app.Service {
        * findPopsAll() {
            
            let users = yield this.ctx.model.Pops.find({});
             
            this.result(true, 0, users);
        }

        * findPopWithPopid() {
            let result =  yield this.ctx.model.Pops.findOne({popid:this.ctx.params.popid});
            if(result) {
                this.result(true, 0, result);
            } else {
                this.result(false, 200, "没有pop信息");
            }   
        }

        * findPopsNearBy() {
            if(!this.ctx.params.lat || !this.ctx.params.lon) {
                return this.result(false, 101);
            }
            // findPopsAll 先用这个替代所有附近的超市信息
            let users = yield this.ctx.model.Pops.find({});
            
            this.result(true, 0, users);
        }

        * createPop() {

            if (!this.ctx.request.body) {
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
            
            this.ctx.request.body.popid = doc.uid;
            let result = yield ctx.model.Pops.create(this.ctx.request.body);
            
            return result;
        }

        * updatePop() {
            if(!this.ctx.params.popid) {
                return this.result(false, 101);
            }
            let result = yield this.ctx.model.Pops.findOneAndUpdate(
                {"popid" : this.ctx.params.popid},
                {
                    $set:this.ctx.request.body
                },
                {returnNewDocument:true}
            );
            let re = (result!=null);

            this.result(re, re ? 0:104, result);
        }

        * destroy() {
            let result = this.ctx.model.Pops.remove({"popid":{ $in:this.ctx.params.popid.split(',')}});
            return result;
        }
        
    }
    return PopsService;
}