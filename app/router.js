'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/get', 'get');
  app.resources('users', '/api/users', app.controller.users);
  app.resources('pops', '/api/pops', app.controller.pops);
  app.resources('brands', '/api/brands', app.controller.brands);
  app.resources('activitys', '/api/activitys', app.controller.activitys);
  app.get('/api/collections/:collected/:liked/:wishWell', app.controller.collections.findCollectionByUidAndOther);
  app.post('/api/collections', app.controller.collections.create);
  app.put('/api/collections/:collectionid/:collected/:liked/:wishWell', app.controller.collections.updateCollectionByUidAndOther);

  app.post('/api/rules/createRedpacketRules', app.controller.rules.createRedpacketRules);
  app.post('/api/rules/createTradeInRules', app.controller.rules.createTradeInRules);
  app.post('/api/rules/createIntegrationRules', app.controller.rules.createIntegrationRules);
  app.post('/api/rules/createPromotionRules', app.controller.rules.createPromotionRules);
  // 查找超市对应类型的活动有哪些
  app.get('/api/popAct/redPacketAct/:id', app.controller.popProAct.findRedPacketByPopid);
  app.get('/api/popAct/promotionAct/:id', app.controller.popProAct.findPromotionByPopid);
  app.get('/api/popAct/integrationAct/:id', app.controller.popProAct.findIntegrationByPopid);
  // 根据产品id 更新用户的积分和换购
  app.post('/api/popAct/integrationAct', app.controller.popProAct.updateIntegrationByProid);
  // 查找用户的换购记录
  app.get('/api/popAct/tradeIn/:uid', app.controller.popProAct.findTradeRecordByuid);

  app.get('/api/popAct/products', app.controller.popProAct.findProductsByid);

};
