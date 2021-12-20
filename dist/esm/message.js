import { M as MessageMixin } from './MessageMixin-335a0a64.js';
import { resolveComponent, openBlock, createBlock, Transition, withCtx, renderSlot, toDisplayString, createCommentVNode, createVNode } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import './Icon-fefef9ed.js';
import './config-1ce4c54c.js';

var script = {
    name: 'BMessage',
    mixins: [MessageMixin],
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
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      (_ctx.isActive)
        ? (openBlock(), createBlock("article", {
            key: 0,
            class: ["message", [_ctx.type, _ctx.size]]
          }, [
            (_ctx.$slots.header || _ctx.title)
              ? (openBlock(), createBlock("header", _hoisted_1, [
                  (_ctx.$slots.header)
                    ? (openBlock(), createBlock("div", _hoisted_2, [
                        renderSlot(_ctx.$slots, "header")
                      ]))
                    : (_ctx.title)
                      ? (openBlock(), createBlock("p", _hoisted_3, toDisplayString(_ctx.title), 1 /* TEXT */))
                      : createCommentVNode("v-if", true),
                  (_ctx.closable)
                    ? (openBlock(), createBlock("button", {
                        key: 2,
                        type: "button",
                        class: "delete",
                        onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args))),
                        "aria-label": $props.ariaCloseLabel
                      }, null, 8 /* PROPS */, ["aria-label"]))
                    : createCommentVNode("v-if", true)
                ]))
              : createCommentVNode("v-if", true),
            (_ctx.$slots.default)
              ? (openBlock(), createBlock("section", _hoisted_4, [
                  createVNode("div", _hoisted_5, [
                    (_ctx.computedIcon && _ctx.hasIcon)
                      ? (openBlock(), createBlock("div", _hoisted_6, [
                          createVNode(_component_b_icon, {
                            icon: _ctx.computedIcon,
                            pack: _ctx.iconPack,
                            class: _ctx.type,
                            both: "",
                            size: $data.newIconSize
                          }, null, 8 /* PROPS */, ["icon", "pack", "class", "size"])
                        ]))
                      : createCommentVNode("v-if", true),
                    createVNode("div", _hoisted_7, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ])
                ]))
              : createCommentVNode("v-if", true)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "src/components/message/Message.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BMessage, Plugin as default };
