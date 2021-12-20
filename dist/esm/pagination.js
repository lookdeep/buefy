import { s as script, a as script$1 } from './Pagination-aa3b2cba.js';
export { s as BPagination, a as BPaginationButton } from './Pagination-aa3b2cba.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './config-1ce4c54c.js';
import 'vue';
import './Icon-fefef9ed.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
    registerComponent(Vue, script$1);
  }
};
use(Plugin);

export { Plugin as default };
