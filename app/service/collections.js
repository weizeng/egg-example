module.exports = app => {
    class CollectionsService extends app.Service {
        * index() {
            
            let allCollections = yield this.ctx.model.Collections.find({});
            this.result(true, 0 , allCollections);
        }

        * show() {
            let news = yield this.ctx.model.Collections.find({
                collectionid: params.id
            });
            this.result(true, 0 , news);
        }

        // 创建用户自己的收藏
        * create() {

            if (!this.ctx.request.body) {
                return this.result(false, 101);
            };

            let doc = yield this.ctx.model.Idg.findOneAndUpdate({
                myModelName: "collectionCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });

            this.ctx.request.body.collectionid = doc.uid;
            let res = yield ctx.model.Collections.create(this.ctx.request.body);

            this.result(true, 0 , res);
        }

        // 删除用户收藏
        * deleteCollection() {
            if (!this.ctx.headers.uid) {
                return this.result(false, 101);
            };
            let res = yield this.ctx.model.Collections.remove({
                "collectionid": {
                    $in: this.ctx.params.id.split(',')
                }
            });
            this.result(true, 0 , res);
        }

        // * update(ctx, params) {
        //     let result = yield this.ctx.model.Collections.findAndModify({
        //         query:{"uid" : params.uid, "collectionid": params.collectionid},
        //         update:{
        //             $setOnInsert:{"commented" : params.commented,"liked" : params.liked}
        //         }, 

        //         new: true,
        //         upsert: true 
        //     });
        //     return result;
        // }

        * updateCollectionByUidAndOther() {
            let uid = this.ctx.headers.uid;
            let collectionid = this.ctx.params.collectionid;
            if(!uid || !collectionid) {
                this.result(false, 101);
            }
            let modify = {};
            if(this.ctx.params.liked) {
                modify.liked = this.ctx.params.liked;
            }
            if(this.ctx.params.collected) {
                modify.collected = this.ctx.params.collected;
            }
            if(this.ctx.params.wishWell) {
                modify.wishWell = this.ctx.params.wishWell;
            }
            // let modify = {"liked" : ctx.params.commented,"liked" : params.liked};
             let res = yield this.ctx.model.Collections.findOneAndUpdate(
                {"uid" : uid, "collectionid": collectionid},
                {
                    $set:{"liked":this.ctx.params.liked, "collected":this.ctx.params.collected, "wishWell":this.ctx.params.wishWell}
                }
            );
            this.result(true, 0, res);
        }
        
        * findCollectionByUidAndOther() {
            let uid = this.ctx.headers.uid;
            if(!uid) {
                this.result(false, 101);
            }
            let queryArray = [];
            let queryOr = {};
            // if(this.ctx.params.liked == 1){
                queryArray.push({"liked":this.ctx.params.liked });
            // }
            // if(this.ctx.params.wishWell == 1){
                queryArray.push({"wishWell":this.ctx.params.wishWell });
            // }
            // if(this.ctx.params.collected == 1){
                queryArray.push({"collected":this.ctx.params.collected });
            // }
            if(queryArray.length > 0) {
                queryOr = {
                        "$or": queryArray
                    };
            }

            let allCollections = yield this.ctx.model.Collections.find({
                "$and": [{
                        "uid": uid
                    },queryOr   
                ]
            });
           this.result(true, 0, allCollections);
        }
    }
    return CollectionsService;
}