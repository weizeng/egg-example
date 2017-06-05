'use strict';

// 产品识别接口

module.exports = app => {
    class RecognizeService extends app.Service {
        // 根据popid查找红包        
        * recognizeProduct() {
            yield this.service.recognize.recognizeProduct();
        }

    }
    return RecognizeService;
};
