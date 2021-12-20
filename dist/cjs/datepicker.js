'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Datepicker = require('./Datepicker-343cb887.js');
var plugins = require('./plugins-82c06644.js');
require('./FormElementMixin-1ac87810.js');
require('./config-2c63be1d.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');
require('./DropdownItem-e39207cf.js');
require('./trapFocus-c795a1dd.js');
require('./InjectedChildMixin-d2127742.js');
require('./Input-554891c1.js');
require('./Icon-dc7b693f.js');
require('./Field-0c66b159.js');
require('./Select-a6108835.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Datepicker.script);
  }
};
plugins.use(Plugin);

exports.BDatepicker = Datepicker.script;
exports["default"] = Plugin;
