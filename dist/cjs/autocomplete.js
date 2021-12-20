'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Autocomplete = require('./Autocomplete-f56bbe04.js');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');
require('./FormElementMixin-1ac87810.js');
require('./config-2c63be1d.js');
require('./Input-554891c1.js');
require('./Icon-dc7b693f.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Autocomplete.script);
  }
};
plugins.use(Plugin);

exports.BAutocomplete = Autocomplete.script;
exports["default"] = Plugin;
