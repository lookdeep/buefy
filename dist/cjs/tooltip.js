'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Tooltip = require('./Tooltip-9e182773.js');
var plugins = require('./plugins-82c06644.js');
require('./config-2c63be1d.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Tooltip.script);
  }
};
plugins.use(Plugin);

exports.BTooltip = Tooltip.script;
exports["default"] = Plugin;
