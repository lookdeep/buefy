'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var config = require('./config-2c63be1d.js');
var NoticeMixin = require('./NoticeMixin-67cbde57.js');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');

var script = {
    name: 'BToast',
    mixins: [NoticeMixin.NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.config.defaultToastDuration
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        class: ["toast", [_ctx.type, _ctx.position]],
        "aria-hidden": !_ctx.isActive,
        role: "alert"
      }, [
        (_ctx.$slots.default)
          ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
          : (vue.openBlock(), vue.createBlock("div", {
              key: 1,
              innerHTML: _ctx.message
            }, null, 8 /* PROPS */, ["innerHTML"]))
      ], 10 /* CLASS, PROPS */, ["aria-hidden"]), [
        [vue.vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["enter-active-class", "leave-active-class"]))
}

script.render = render;
script.__file = "src/components/toast/Toast.vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { helpers._defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ToastProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      position: config.config.defaultToastPosition || 'is-top'
    };

    if (params.parent) {
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    }

    var propsData = helpers.merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = vue.createApp({
      data: function data() {
        return {
          toastVNode: null
        };
      },
      methods: {
        close: function close() {
          var toast = helpers.getComponentFromVNode(this.toastVNode);

          if (toast) {
            toast.close();
          }
        }
      },
      render: function render() {
        this.toastVNode = vue.h(script, _objectSpread(_objectSpread({}, propsData), {}, {
          // On Vue 3, $destroy is no longer available.
          // A toast has to be unmounted manually.
          onClose: function onClose() {
            if (typeof propsData.onClose === 'function') {
              propsData.onClose();
            } // timeout for the animation complete
            // before unmounting


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }), slot != null ? {
          default: function _default() {
            return slot;
          }
        } : undefined); // we are interested in `toastVNode.component` but
        // at this point `toastVNode.component` should be null

        return this.toastVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin = {
  install: function install(Vue) {
    plugins.registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic);
  }
};
plugins.use(Plugin);

exports.BToast = script;
exports.ToastProgrammatic = ToastProgrammatic;
exports["default"] = Plugin;
