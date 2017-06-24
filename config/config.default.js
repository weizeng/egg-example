'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1495266928795_3116';

  // add your config here
  config.mongoose = {
    url: 'mongodb://111.230.129.130:27017/pop-egg',
    options: {}
  };
  // config.security = {
  //   ignore: '/api/',
  //   csrf: {
  //     ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  //   },
  // };
  config.security = {
      csrf : false,
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  return config;
};