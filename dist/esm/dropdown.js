import { s as script, a as script$1 } from './DropdownItem-2d055f53.js';
export { s as BDropdown, a as BDropdownItem } from './DropdownItem-2d055f53.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './trapFocus-d876d41a.js';
import './config-1ce4c54c.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import 'vue';
import './InjectedChildMixin-eb1af2ee.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
    registerComponent(Vue, script$1);
  }
};
use(Plugin);

export { Plugin as default };
