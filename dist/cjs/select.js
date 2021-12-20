'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Select = require('./Select-a6108835.js');
var plugins = require('./plugins-82c06644.js');
require('./Icon-dc7b693f.js');
require('./config-2c63be1d.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');
require('./FormElementMixin-1ac87810.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Select.script);
  }
};
plugins.use(Plugin);

exports.BSelect = Select.script;
exports["default"] = Plugin;
