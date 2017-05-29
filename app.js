module.exports = app => {

    class CustomService extends app.Service {
        get user() {
            return this.ctx.session.user;
        }

        errorDetail(errorCode) {
            if(errorCode == 100) {
                return "请求参数错误";
            } else if(errorCode == 101) {
                return "该用户名已经存在";
            } else if(errorCode == 102) {
                return "缺少uid";
            } else if(errorCode == 103) {
                return "用户/密码错误";
            } else if(errorCode == 104) {
                return "用户名不能更改！";
            } else if(errorCode == 105) {
                return "";
            } else if(errorCode == 201) {
                return "没有对应的数据";
            } else if(errorCode == 301) {
                return "本次活动不包括您的玩法";
            } else if(errorCode == 302) {
                return "没有您要查找的活动哦";
            } else if(errorCode == 303) {
                return "没有您要查找的产品哦";
            } else if(errorCode == 304) {
                return "您已经达到换购条件";
            } else if(errorCode == 305) {
                return "创建活动必须有活动的类型，如redpacket";
            } else if(errorCode == 306) {
                return "创建活动不包含您指定的活动规则类型，输入如redpacket";
            } else if(errorCode == 307) {
                return "创建活动需要知道您是哪个合作方，如official";
            } else if(errorCode == 308) {
                return "创建活动需要指定popid";
            } else if(errorCode == 401) {
                return "有奖红包问卷需要指定questionsPage";
            } else if(errorCode == 402) {
                return "有奖红包问卷需要指定reward";
            } 

            return "未知错误，立即告诉我";
        }
        
        // service 直接返回结果
        result(success, errorCode, data) {
            let resp = errorCode != 0? (data == null?this.errorDetail(errorCode):data):data;
            this.ctx.body = {
                success:success,
                error:errorCode,
                data:resp
            }
        };
    }
    app.Service = CustomService;
    
    // 暂时舍弃不用, 在service层直接返回
    class CustomController extends app.Controller {
        get user() {
            return this.ctx.session.user;
        }
        success(data) {
            this.ctx.body = {
                success: true,
                data,
            };
        }
        failed(msg) {
            msg = msg || 'not found';
            this.ctx.throw(404, msg);
        }
    }
    app.Controller = CustomController;

    app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
        
    });
}