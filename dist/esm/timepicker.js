import { s as script } from './Timepicker-d2192189.js';
export { s as BTimepicker } from './Timepicker-d2192189.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './TimepickerMixin-885a12ae.js';
import './FormElementMixin-55920052.js';
import './config-1ce4c54c.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import 'vue';
import './DropdownItem-2d055f53.js';
import './trapFocus-d876d41a.js';
import './InjectedChildMixin-eb1af2ee.js';
import './Input-82ba71aa.js';
import './Icon-fefef9ed.js';
import './Field-bdc7266c.js';
import './Select-2621b3e3.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { Plugin as default };
