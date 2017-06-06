module.exports = app => {
    class ActivitysService extends app.Service {
        * index() {
            let users = yield this.ctx.model.Activitys.find(params);
            this.result(true, 0 , users);
        }

        * show() {
            let news =  yield this.ctx.model.Activitys.find({activityid:this.ctx.params.id});
            this.result(true, 0, news);
        }

        * create() {
            if (!this.ctx.request.body) {
                return this.result(fales, 100);
            };
             if (!this.ctx.request.popid) {
                return this.result(fales, 308);
            };
            if (!this.ctx.request.body.type) {
                return this.result(fales, 305);
            };
            if(!this.ctx.request.body.type == 'redpacket' && !this.ctx.request.body.type == 'promotion' && !this.ctx.request.body.type == 'integration') {
                return this.result(fales, 306);
            }
            if (!this.ctx.request.body.platform) {
                return this.result(fales, 307);
            }; 
            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "activityCounter"
        }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });
            
            this.ctx.request.body.activityid = doc.uid;

            let res = yield this.ctx.model.Activitys.create(this.ctx.request.body);
            
            this.result(true, 0, res);
        }

        * destroy() {
            let res = this.ctx.model.Activitys.remove({"activityid":{ $in:this.ctx.params.id.split(',')}});
            this.result(false, 0, res);
        }
        
    }
    return ActivitysService;
}