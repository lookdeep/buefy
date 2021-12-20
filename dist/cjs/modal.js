'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var Modal = require('./Modal-85555d92.js');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');
require('./trapFocus-c795a1dd.js');
require('./config-2c63be1d.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { helpers._defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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

    var propsData = helpers.merge(defaultParam, params);
    var container = document.createElement('div'); // I could not figure out how to extend an existing app to create a new
    // Vue instance on Vue 3.

    var vueInstance = vue.createApp({
      data: function data() {
        return {
          modalVNode: null
        };
      },
      methods: {
        close: function close() {
          var modal = helpers.getComponentFromVNode(this.modalVNode);

          if (modal) {
            modal.close();
          }
        }
      },
      render: function render() {
        this.modalVNode = vue.h(Modal.script, _objectSpread(_objectSpread({}, propsData), {}, {
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
    plugins.registerComponent(Vue, Modal.script);
    plugins.registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
  }
};
plugins.use(Plugin);

exports.BModal = Modal.script;
exports.ModalProgrammatic = ModalProgrammatic;
exports["default"] = Plugin;
