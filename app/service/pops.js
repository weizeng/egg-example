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
            if(!this.ctx.params.lonlat) {
                return this.result(false, 100);
            }
            // 116.481488,39.990464 
            // 根据经纬度搜索附近兴趣点,搜索出来的结果插入数据库, 并且返回客户端
            // 纬度在前，经度在后
            let types = "060100|060200|060400";
            // 一页10条
            let offset = 10;
            let key = "9f6f8d47a20046831364c8afcd16df59";
            let url = "http://restapi.amap.com/v3/place/around?key="+key+"&location="+this.ctx.params.lonlat+"&types="+types+"&radius=1000&offset="+offset+"&page="+this.ctx.params.startPage+"&extensions=all";
            const rr = yield app.curl(url, {
                method: 'GET',
                dataType: 'json',
            });

            if(rr.data && rr.data.status == '1') {
                let pois = [];
                // 查找到附近的所有店信息，自动更新到pops
                // 记录用户查询日志

                for(let i = 0; i<rr.data.pois.length;i++) {
                    // 设置upsert,当记录不存在的时候插入
                    yield this.ctx.model.Pops.update(
                        {id:rr.data.pois[i].id}, {$set: rr.data.pois[i]}, {upsert:true});
                    pois.push(rr.data.pois[i].id);
                }
                // 添加到查询记录表中 
                yield this.ctx.model.PopSearchRecords.create({uid:this.ctx.headers.uid, popids:pois, location:this.ctx.params.lonlat, startPage: this.ctx.params.startPage, offSet: offset});
            }
            
            this.result(true, 0, rr.data);
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
                return this.result(false, 100);
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