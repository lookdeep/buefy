'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Pagination = require('./Pagination-f02c5b87.js');
var plugins = require('./plugins-82c06644.js');
require('./config-2c63be1d.js');
require('vue');
require('./Icon-dc7b693f.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Pagination.script);
    plugins.registerComponent(Vue, Pagination.script$1);
  }
};
plugins.use(Plugin);

exports.BPagination = Pagination.script;
exports.BPaginationButton = Pagination.script$1;
exports["default"] = Plugin;
