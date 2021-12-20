import { s as script } from './Tooltip-a7cfc6f7.js';
export { s as BTooltip } from './Tooltip-a7cfc6f7.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './config-1ce4c54c.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import 'vue';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { Plugin as default };
