import { c as config, s as setOptions } from './config-1ce4c54c.js';
import { m as merge } from './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import 'vue';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export { ConfigComponent as default };
