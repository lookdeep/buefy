import { s as script } from './Input-82ba71aa.js';
export { s as BInput } from './Input-82ba71aa.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './Icon-fefef9ed.js';
import './config-1ce4c54c.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import 'vue';
import './FormElementMixin-55920052.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { Plugin as default };
