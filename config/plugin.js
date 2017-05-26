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