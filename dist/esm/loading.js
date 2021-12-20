import { m as merge, x as getComponentFromVNode, _ as _defineProperty } from './helpers-2263d431.js';
import { createApp, h } from 'vue';
import { s as script } from './Loading-9476d683.js';
export { s as BLoading } from './Loading-9476d683.js';
import { u as use, a as registerComponent, r as registerComponentProgrammatic } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';
import './ssr-44a76b0e.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          loadingVNode: null
        };
      },
      methods: {
        close: function close() {
          // TODO: too much dependence on Vue's internal structure?
          var loading = getComponentFromVNode(this.loadingVNode);

          if (loading) {
            loading.close();
          }
        }
      },
      render: function render() {
        this.loadingVNode = h(script, _objectSpread(_objectSpread({}, propsData), {}, {
          onClose: function onClose() {
            if (propsData.onClose) {
              propsData.onClose.apply(propsData, arguments);
            } // timeout for the animation complete before destroying


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }));
        return this.loadingVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
    registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
use(Plugin);

export { LoadingProgrammatic, Plugin as default };
