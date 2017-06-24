'use strict';

// had enabled by egg
// exports.static = true;
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.proxyworker = {
  enable: true,
  package: 'egg-development-proxyworker',
};

// exports.view = {
//   enable: false,
//   package: 'egg-view-react',
// };

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};