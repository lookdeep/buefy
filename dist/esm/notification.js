import { _ as _defineProperty, m as merge, x as getComponentFromVNode } from './helpers-2263d431.js';
import { resolveComponent, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, createCommentVNode, renderSlot, vShow, mergeProps, createApp, h } from 'vue';
import { M as MessageMixin } from './MessageMixin-335a0a64.js';
import { c as config } from './config-1ce4c54c.js';
import { N as NoticeMixin } from './NoticeMixin-66c3d0b2.js';
import { u as use, a as registerComponent, r as registerComponentProgrammatic } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';
import './Icon-fefef9ed.js';

var script$1 = {
    name: 'BNotification',
    mixins: [MessageMixin],
    props: {
        position: String,
        ariaCloseLabel: String,
        animation: {
            type: String,
            default: 'fade'
        }
    }
};

const _hoisted_1 = {
  key: 1,
  class: "media"
};
const _hoisted_2 = {
  key: 0,
  class: "media-left"
};
const _hoisted_3 = { class: "media-content" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock(Transition, { name: $props.animation }, {
    default: withCtx(() => [
      withDirectives(createVNode("article", {
        class: ["notification", [_ctx.type, $props.position]]
      }, [
        (_ctx.closable)
          ? (openBlock(), createBlock("button", {
              key: 0,
              class: "delete",
              type: "button",
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args))),
              "aria-label": $props.ariaCloseLabel
            }, null, 8 /* PROPS */, ["aria-label"]))
          : createCommentVNode("v-if", true),
        (_ctx.$slots.default || _ctx.message)
          ? (openBlock(), createBlock("div", _hoisted_1, [
              (_ctx.computedIcon && _ctx.hasIcon)
                ? (openBlock(), createBlock("div", _hoisted_2, [
                    createVNode(_component_b_icon, {
                      icon: _ctx.computedIcon,
                      pack: _ctx.iconPack,
                      both: "",
                      size: "is-large",
                      "aria-hidden": ""
                    }, null, 8 /* PROPS */, ["icon", "pack"])
                  ]))
                : createCommentVNode("v-if", true),
              createVNode("div", _hoisted_3, [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", { key: 0 })
                  : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text",
                      innerHTML: _ctx.message
                    }, null, 8 /* PROPS */, ["innerHTML"]))
              ])
            ]))
          : createCommentVNode("v-if", true)
      ], 2 /* CLASS */), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$1.render = render$1;
script$1.__file = "src/components/notification/Notification.vue";

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// - type
// - message
// - duration

var _NoticeMixin$props = NoticeMixin.props,
    queue = _NoticeMixin$props.queue,
    indefinite = _NoticeMixin$props.indefinite,
    position = _NoticeMixin$props.position,
    container = _NoticeMixin$props.container;
var NoticeMixinSubset = _objectSpread$1(_objectSpread$1({}, NoticeMixin), {}, {
  props: {
    queue: queue,
    indefinite: indefinite,
    position: position,
    container: container
  }
});

var script = {
    name: 'BNotificationNotice',
    components: {
        [script$1.name]: script$1
    },
    mixins: [NoticeMixinSubset],
    data() {
        return {
            newDuration: this.duration || config.defaultNotificationDuration
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_notification = resolveComponent("b-notification");

  return (_ctx.$slots.default != null)
    ? (openBlock(), createBlock(_component_b_notification, mergeProps({
        key: 0,
        ref: "notification",
        position: _ctx.position,
        "model-value": _ctx.isActive
      }, _ctx.$attrs, { onClose: _ctx.close }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["position", "model-value", "onClose"]))
    : (openBlock(), createBlock(_component_b_notification, mergeProps({
        key: 1,
        ref: "notification",
        position: _ctx.position,
        "model-value": _ctx.isActive
      }, _ctx.$attrs, { onClose: _ctx.close }), null, 16 /* FULL_PROPS */, ["position", "model-value", "onClose"]))
}

script.render = render;
script.__file = "src/components/notification/NotificationNotice.vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var NotificationProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      position: config.defaultNotificationPosition || 'is-top-right'
    };

    if (params.parent) {
      delete params.parent;
    }

    var _onClose;

    if (typeof params.onClose === 'function') {
      _onClose = params.onClose;
      delete params.onClose;
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
          noticeVNode: null
        };
      },
      methods: {
        close: function close() {
          var notice = getComponentFromVNode(this.noticeVNode);

          if (notice) {
            notice.close();
          }
        }
      },
      render: function render() {
        this.noticeVNode = h(script, _objectSpread(_objectSpread({}, propsData), {}, {
          onClose: function onClose() {
            if (_onClose != null) {
              _onClose();
            } // waits for a while in favor of animation


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }), slot != null ? {
          default: function _default() {
            return slot;
          }
        } : undefined);
        return this.noticeVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script$1);
    registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic);
  }
};
use(Plugin);

export { script$1 as BNotification, NotificationProgrammatic, Plugin as default };
