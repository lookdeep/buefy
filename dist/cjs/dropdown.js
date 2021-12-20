'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var DropdownItem = require('./DropdownItem-e39207cf.js');
var plugins = require('./plugins-82c06644.js');
require('./trapFocus-c795a1dd.js');
require('./config-2c63be1d.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');
require('./InjectedChildMixin-d2127742.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, DropdownItem.script);
    plugins.registerComponent(Vue, DropdownItem.script$1);
  }
};
plugins.use(Plugin);

exports.BDropdown = DropdownItem.script;
exports.BDropdownItem = DropdownItem.script$1;
exports["default"] = Plugin;
