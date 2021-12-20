'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Icon = require('./Icon-dc7b693f.js');
var config = require('./config-2c63be1d.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');

var script = {
    name: 'BButton',
    components: {
        [Icon.script.name]: Icon.script
    },
    inheritAttrs: false,
    props: {
        type: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
            type: Boolean,
            default: () => {
                return config.config.defaultButtonRounded
            }
        },
        loading: Boolean,
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
            type: String,
            default: 'button',
            validator: (value) => {
                return [
                    'button',
                    'submit',
                    'reset'
                ].indexOf(value) >= 0
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator: (value) => {
                return config.config.defaultLinkTags.indexOf(value) >= 0
            }
        }
    },
    computed: {
        computedTag() {
            if (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false) {
                return 'button'
            }
            return this.tag
        },
        iconSize() {
            if (!this.size || this.size === 'is-medium') {
                return 'is-small'
            } else if (this.size === 'is-large') {
                return 'is-medium'
            }
            return this.size
        }
    }
};

const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 2 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.computedTag), vue.mergeProps({ class: "button" }, _ctx.$attrs, {
    type: $props.nativeType,
    class: [$props.size, $props.type, {
            'is-rounded': $props.rounded,
            'is-loading': $props.loading,
            'is-outlined': $props.outlined,
            'is-fullwidth': $props.expanded,
            'is-inverted': $props.inverted,
            'is-focused': $props.focused,
            'is-active': $props.active,
            'is-hovered': $props.hovered,
            'is-selected': $props.selected
        }]
  }), {
    default: vue.withCtx(() => [
      ($props.iconLeft)
        ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            pack: $props.iconPack,
            icon: $props.iconLeft,
            size: $options.iconSize
          }, null, 8 /* PROPS */, ["pack", "icon", "size"]))
        : vue.createCommentVNode("v-if", true),
      ($props.label)
        ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString($props.label), 1 /* TEXT */))
        : (_ctx.$slots.default)
          ? (vue.openBlock(), vue.createBlock("span", _hoisted_2, [
              vue.renderSlot(_ctx.$slots, "default")
            ]))
          : vue.createCommentVNode("v-if", true),
      ($props.iconRight)
        ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            pack: $props.iconPack,
            icon: $props.iconRight,
            size: $options.iconSize
          }, null, 8 /* PROPS */, ["pack", "icon", "size"]))
        : vue.createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["type", "class"]))
}

script.render = render;
script.__file = "src/components/button/Button.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BButton = script;
exports["default"] = Plugin;
