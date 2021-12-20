import { m as merge, x as getComponentFromVNode, _ as _defineProperty } from './helpers-2263d431.js';
import { openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, renderSlot, toDisplayString, createCommentVNode, vShow, createApp, h } from 'vue';
import { c as config } from './config-1ce4c54c.js';
import { N as NoticeMixin } from './NoticeMixin-66c3d0b2.js';
import { u as use, r as registerComponentProgrammatic } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';

var script = {
    name: 'BSnackbar',
    mixins: [NoticeMixin],
    props: {
        actionText: {
            type: String,
            default: 'OK'
        },
        onAction: {
            type: Function,
            default: () => {}
        },
        cancelText: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            newDuration: this.duration || config.defaultSnackbarDuration
        }
    },
    methods: {
        /**
        * Click listener.
        * Call action prop before closing (from Mixin).
        */
        action() {
            this.onAction();
            this.close();
        }
    }
};

const _hoisted_1 = { class: "button" };
const _hoisted_2 = { class: "button" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave
  }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        class: ["snackbar", [_ctx.type,_ctx.position]],
        role: $props.actionText ? 'alertdialog' : 'alert'
      }, [
        (_ctx.$slots.default)
          ? renderSlot(_ctx.$slots, "default", { key: 0 })
          : (openBlock(), createBlock("div", {
              key: 1,
              class: "text",
              innerHTML: _ctx.message
            }, null, 8 /* PROPS */, ["innerHTML"])),
        ($props.cancelText)
          ? (openBlock(), createBlock("div", {
              key: 2,
              class: "action is-light is-cancel",
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args)))
            }, [
              createVNode("button", _hoisted_1, toDisplayString($props.cancelText), 1 /* TEXT */)
            ]))
          : createCommentVNode("v-if", true),
        ($props.actionText)
          ? (openBlock(), createBlock("div", {
              key: 3,
              class: ["action", _ctx.type],
              onClick: _cache[2] || (_cache[2] = (...args) => ($options.action && $options.action(...args)))
            }, [
              createVNode("button", _hoisted_2, toDisplayString($props.actionText), 1 /* TEXT */)
            ], 2 /* CLASS */))
          : createCommentVNode("v-if", true)
      ], 10 /* CLASS, PROPS */, ["role"]), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["enter-active-class", "leave-active-class"]))
}

script.render = render;
script.__file = "src/components/snackbar/Snackbar.vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SnackbarProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      type: 'is-success',
      position: config.defaultSnackbarPosition || 'is-bottom-right'
    };

    if (params.parent) {
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    }

    var propsData = merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          snackbarVNode: null
        };
      },
      methods: {
        close: function close() {
          var snackbar = getComponentFromVNode(this.snackbarVNode);

          if (snackbar) {
            snackbar.close();
          }
        }
      },
      render: function render() {
        this.snackbarVNode = h(script, _objectSpread(_objectSpread({}, propsData), {}, {
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
        } : undefined);
        return this.snackbarVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin = {
  install: function install(Vue) {
    registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
  }
};
use(Plugin);

export { script as BSnackbar, SnackbarProgrammatic, Plugin as default };
