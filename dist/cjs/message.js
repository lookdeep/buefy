'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MessageMixin = require('./MessageMixin-9077cd6c.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('./Icon-dc7b693f.js');
require('./config-2c63be1d.js');

var script = {
    name: 'BMessage',
    mixins: [MessageMixin.MessageMixin],
    props: {
        ariaCloseLabel: String
    },
    data() {
        return {
            newIconSize: this.iconSize || this.size || 'is-large'
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "message-header"
};
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 1,
  class: "message-body"
};
const _hoisted_5 = { class: "media" };
const _hoisted_6 = {
  key: 0,
  class: "media-left"
};
const _hoisted_7 = { class: "media-content" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock(vue.Transition, { name: "fade" }, {
    default: vue.withCtx(() => [
      (_ctx.isActive)
        ? (vue.openBlock(), vue.createBlock("article", {
            key: 0,
            class: ["message", [_ctx.type, _ctx.size]]
          }, [
            (_ctx.$slots.header || _ctx.title)
              ? (vue.openBlock(), vue.createBlock("header", _hoisted_1, [
                  (_ctx.$slots.header)
                    ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
                        vue.renderSlot(_ctx.$slots, "header")
                      ]))
                    : (_ctx.title)
                      ? (vue.openBlock(), vue.createBlock("p", _hoisted_3, vue.toDisplayString(_ctx.title), 1 /* TEXT */))
                      : vue.createCommentVNode("v-if", true),
                  (_ctx.closable)
                    ? (vue.openBlock(), vue.createBlock("button", {
                        key: 2,
                        type: "button",
                        class: "delete",
                        onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args))),
                        "aria-label": $props.ariaCloseLabel
                      }, null, 8 /* PROPS */, ["aria-label"]))
                    : vue.createCommentVNode("v-if", true)
                ]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.$slots.default)
              ? (vue.openBlock(), vue.createBlock("section", _hoisted_4, [
                  vue.createVNode("div", _hoisted_5, [
                    (_ctx.computedIcon && _ctx.hasIcon)
                      ? (vue.openBlock(), vue.createBlock("div", _hoisted_6, [
                          vue.createVNode(_component_b_icon, {
                            icon: _ctx.computedIcon,
                            pack: _ctx.iconPack,
                            class: _ctx.type,
                            both: "",
                            size: $data.newIconSize
                          }, null, 8 /* PROPS */, ["icon", "pack", "class", "size"])
                        ]))
                      : vue.createCommentVNode("v-if", true),
                    vue.createVNode("div", _hoisted_7, [
                      vue.renderSlot(_ctx.$slots, "default")
                    ])
                  ])
                ]))
              : vue.createCommentVNode("v-if", true)
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "src/components/message/Message.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BMessage = script;
exports["default"] = Plugin;
