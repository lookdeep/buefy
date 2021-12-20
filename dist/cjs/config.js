'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-2c63be1d.js');
var helpers = require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('vue');

var ConfigComponent = {
  getOptions: function getOptions() {
    return config.config;
  },
  setOptions: function setOptions(options) {
    config.setOptions(helpers.merge(config.config, options, true));
  }
};

exports["default"] = ConfigComponent;
