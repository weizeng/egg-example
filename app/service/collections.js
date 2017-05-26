module.exports = app => {
    class CollectionsService extends app.Service {
        * index(ctx, params) {
            
            let allCollections = yield ctx.model.Collections.find({});
            let result = {};
            result.meta = {
                total: allCollections.length
            };
            result.data = allCollections;
            return result;
        }

        * show(ctx, params) {
            let news = yield this.ctx.model.Collections.find({
                collectionid: params.id
            });
            let result = {};
            result.meta = {
                total: news.length
            };
            result.data = news;
            return result;
        }

        // 创建用户自己的收藏
        * create(ctx, request) {

            if (!request) {
                return
            };

            let doc = yield ctx.model.Idg.findOneAndUpdate({
                myModelName: "collectionCounter"
            }, {
                $inc: {
                    'uid': 1
                }
            }, {
                new: true
            });

            request.collectionid = doc.uid;
            let result = yield ctx.model.Collections.create(request);

            return result;
        }

        // 删除用户收藏
        * destroy(ctx, params) {
            let result = ctx.model.Collections.remove({
                "collectionid": {
                    $in: params.id.split(',')
                }
            });
            return result;
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

        * updateCollectionByUidAndOther(ctx) {
            let uid = ctx.headers.uid;
            let collectionid = ctx.params.collectionid;
            if(!uid || !collectionid) {
                return;
            }
            let modify = {};
            if(ctx.params.liked) {
                modify.liked = ctx.params.liked;
            }
            if(ctx.params.collected) {
                modify.collected = ctx.params.collected;
            }
            
            // let modify = {"liked" : ctx.params.commented,"liked" : params.liked};
             let result = yield ctx.model.Collections.findOneAndUpdate(
                {"uid" : uid, "collectionid": collectionid},
                {
                    $set:{"liked":ctx.params.liked, "collected":ctx.params.collected}
                }
            );
            return result;
        }
        
        * findCollectionByUidAndOther(ctx) {
            let uid = ctx.headers.uid;
            if(!uid) {
                return;
            }
            let queryArray = [];
            let queryOr = {};
            if(ctx.params.liked == 1){
                queryArray.push({"liked":ctx.params.liked });
            }
            if(ctx.params.wishWell == 1){
                queryArray.push({"wishWell":ctx.params.wishWell });
            }
            if(ctx.params.collected == 1){
                queryArray.push({"collected":ctx.params.collected });
            }
            if(queryArray.length > 0) {
                queryOr = {
                        "$or": queryArray
                    };
            }

            let allCollections = yield ctx.model.Collections.find({
                "$and": [{
                        "uid": uid
                    },queryOr
                    
                ]
            });
            return allCollections;
        }
    }
    return CollectionsService;
}