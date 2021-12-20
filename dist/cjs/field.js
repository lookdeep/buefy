'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Field = require('./Field-0c66b159.js');
var plugins = require('./plugins-82c06644.js');
require('./config-2c63be1d.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Field.script);
  }
};
plugins.use(Plugin);

exports.BField = Field.script;
exports["default"] = Plugin;
