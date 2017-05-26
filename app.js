module.exports = app => {
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
        notFound(msg) {
            msg = msg || 'not found';
            this.ctx.throw(404, msg);
        }
    }
    app.Controller = CustomController;

    app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
        
  });
}