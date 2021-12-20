import { s as script$1 } from './Icon-fefef9ed.js';
import { c as config } from './config-1ce4c54c.js';
import { resolveComponent, openBlock, createBlock, resolveDynamicComponent, mergeProps, withCtx, createCommentVNode, toDisplayString, renderSlot } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';

var script = {
    name: 'BButton',
    components: {
        [script$1.name]: script$1
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
                return config.defaultButtonRounded
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
                return config.defaultLinkTags.indexOf(value) >= 0
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
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock(resolveDynamicComponent($options.computedTag), mergeProps({ class: "button" }, _ctx.$attrs, {
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
    default: withCtx(() => [
      ($props.iconLeft)
        ? (openBlock(), createBlock(_component_b_icon, {
            key: 0,
            pack: $props.iconPack,
            icon: $props.iconLeft,
            size: $options.iconSize
          }, null, 8 /* PROPS */, ["pack", "icon", "size"]))
        : createCommentVNode("v-if", true),
      ($props.label)
        ? (openBlock(), createBlock("span", _hoisted_1, toDisplayString($props.label), 1 /* TEXT */))
        : (_ctx.$slots.default)
          ? (openBlock(), createBlock("span", _hoisted_2, [
              renderSlot(_ctx.$slots, "default")
            ]))
          : createCommentVNode("v-if", true),
      ($props.iconRight)
        ? (openBlock(), createBlock(_component_b_icon, {
            key: 3,
            pack: $props.iconPack,
            icon: $props.iconRight,
            size: $options.iconSize
          }, null, 8 /* PROPS */, ["pack", "icon", "size"]))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["type", "class"]))
}

script.render = render;
script.__file = "src/components/button/Button.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BButton, Plugin as default };
