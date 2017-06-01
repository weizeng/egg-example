'use strict';

module.exports = app => {
  app.get('/home', 'home.index');
  app.get('/get', 'get');
  app.resources('users', '/api/users', app.controller.users);
  app.post('/api/users/login', app.controller.users.login);
  app.post('/api/users/updateUser', app.controller.users.updateUser);
  // 发送短信验证码
  app.post('/api/users/sendSmsCode', app.controller.users.sendSmsCode);
  // 通过手机号码创建用户
  app.post('/api/users/createByMobile', app.controller.users.createByMobile);
  
  app.resources('brands', '/api/brands', app.controller.brands);
  app.resources('activitys', '/api/activitys', app.controller.activitys);

  // 产品相关
  app.post('/api/product/create', app.controller.products.createProduct);  
  app.put('/api/product/update', app.controller.products.updateProduct);  
  app.get('/api/product/:proid', app.controller.products.findOneProduct);  
  app.get('/api/product', app.controller.products.findAllProduct);  
  


  // 店铺
  app.get('/api/pops', app.controller.pops.findPopsAll);  
  app.post('/api/pops', app.controller.pops.createPop);
  app.put('/api/pops', app.controller.pops.updatePop);
  app.delete('/api/pops/:popid', app.controller.pops.deletePop);
  app.get('/api/pops/nearby/:lonlat/:startPage', app.controller.pops.findPopsNearBy);
  app.get('/api/pops/:popid', app.controller.pops.findPopWithPopid);
  
  // 收藏相关
  app.get('/api/collections/:collected/:liked/:wishWell', app.controller.collections.findCollectionByUidAndOther);
  app.post('/api/collections', app.controller.collections.create);
  app.delete('/api/collections/:id', app.controller.collections.deleteCollection);
  app.put('/api/collections/:collectionid/:collected/:liked/:wishWell', app.controller.collections.updateCollectionByUidAndOther);

  // 创建红包规则的玩法
  app.post('/api/rules/createRedpacketRules', app.controller.rules.createRedpacketRules);
  // 创建换购规则的玩法
  app.post('/api/rules/createTradeInRules', app.controller.rules.createTradeInRules);
  // 创建积分规则的玩法
  app.post('/api/rules/createIntegrationRules', app.controller.rules.createIntegrationRules);
  // 创建促销规则的玩法
  app.post('/api/rules/createPromotionRules', app.controller.rules.createPromotionRules);
  // 查找超市对应的红包活动
  app.get('/api/popAct/redPacketAct/:id', app.controller.popProAct.findRedPacketByPopid);
  // 查找超市对应的促销活动
  app.get('/api/popAct/promotionAct/:id', app.controller.popProAct.findPromotionByPopid);
  // 查找超市对应的积分活动
  app.get('/api/popAct/integrationAct/:id', app.controller.popProAct.findIntegrationByPopid);
  // 根据产品id,更新用户的积分和换购
  app.post('/api/popAct/integrationAct', app.controller.popProAct.updateIntegrationByProid);
  // 查找用户的换购记录
  app.get('/api/popAct/tradeIn/:uid', app.controller.popProAct.findTradeRecordByuid);
  // 找到所有产品的所有活动
  app.get('/api/popAct/products', app.controller.popProAct.findProductsWithAcitivty);
  // 找到指定产品的所有活动(用于扫描)
  app.get('/api/popAct/products/:proid', app.controller.popProAct.findProductsByProid);

};
