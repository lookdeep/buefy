import { m as merge, x as getComponentFromVNode, _ as _defineProperty } from './helpers-2263d431.js';
import { createApp, h } from 'vue';
import { s as script } from './Modal-5ebd467f.js';
export { s as BModal } from './Modal-5ebd467f.js';
import { u as use, a as registerComponent, r as registerComponentProgrammatic } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';
import './trapFocus-d876d41a.js';
import './config-1ce4c54c.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ModalProgrammatic = {
  // component specified to the `component` option cannot resolve components
  // registered to the caller app, because `open` creates a brand-new app
  // by the `createApp` API.
  // so the component specified to the `component` option has to explicitly
  // reference components that it depends on.
  // see /docs/pages/components/modal/examples/ExProgrammatic for an example.
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        content: params
      };
    }

    var defaultParam = {
      programmatic: true
    };

    if (params.parent) {
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.content)) {
      slot = params.content;
      delete params.content;
    }

    var propsData = merge(defaultParam, params);
    var container = document.createElement('div'); // I could not figure out how to extend an existing app to create a new
    // Vue instance on Vue 3.

    var vueInstance = createApp({
      data: function data() {
        return {
          modalVNode: null
        };
      },
      methods: {
        close: function close() {
          var modal = getComponentFromVNode(this.modalVNode);

          if (modal) {
            modal.close();
          }
        }
      },
      render: function render() {
        this.modalVNode = h(script, _objectSpread(_objectSpread({}, propsData), {}, {
          onClose: function onClose() {
            vueInstance.unmount();
          }
        }), slot ? {
          default: function _default() {
            return slot;
          }
        } : undefined);
        return this.modalVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
    registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
  }
};
use(Plugin);

export { ModalProgrammatic, Plugin as default };
