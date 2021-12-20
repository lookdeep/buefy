import { c as config } from './config-1ce4c54c.js';
import { s as script$1 } from './Icon-fefef9ed.js';
import { resolveComponent, openBlock, createBlock, Fragment, renderList, withModifiers, createVNode, createCommentVNode, toDisplayString } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';

var script = {
    name: 'BRate',
    components: {
        [script$1.name]: script$1
    },
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 5
        },
        icon: {
            type: String,
            default: 'star'
        },
        iconPack: String,
        size: String,
        spaced: Boolean,
        rtl: Boolean,
        disabled: Boolean,
        showScore: Boolean,
        showText: Boolean,
        customText: String,
        texts: Array,
        locale: {
            type: [String, Array],
            default: () => {
                return config.defaultLocale
            }
        }
    },
    emits: ['change', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            hoverValue: 0
        }
    },
    computed: {
        halfStyle() {
            return `width:${this.valueDecimal}%`
        },
        showMe() {
            let result = '';
            if (this.showScore) {
                result = this.disabled ? this.modelValue : this.newValue;
                if (result === 0) {
                    result = '';
                } else {
                    result = new Intl.NumberFormat(this.locale).format(this.modelValue);
                }
            } else if (this.showText) {
                result = this.texts[Math.ceil(this.newValue) - 1];
            }
            return result
        },
        valueDecimal() {
            return this.modelValue * 100 - Math.floor(this.modelValue) * 100
        }
    },
    watch: {
        // When v-model is changed set the new value.
        modelValue(value) {
            this.newValue = value;
        }
    },
    methods: {
        resetNewValue() {
            if (this.disabled) return
            this.hoverValue = 0;
        },
        previewRate(index, event) {
            if (this.disabled) return
            this.hoverValue = index;
            event.stopPropagation();
        },
        confirmValue(index) {
            if (this.disabled) return
            this.newValue = index;
            this.$emit('change', this.newValue);
            this.$emit('update:modelValue', this.newValue);
        },
        checkHalf(index) {
            const showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
            index - 1 < this.modelValue && index > this.modelValue;
            return showWhenDisabled
        },
        rateClass(index) {
            let output = '';
            const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;
            if (index <= currentValue) {
                output = 'set-on';
            } else if (this.disabled && (Math.ceil(this.modelValue) === index)) {
                output = 'set-half';
            }
            return output
        }
    }
};

const _hoisted_1 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["rate", { 'is-disabled': $props.disabled, 'is-spaced': $props.spaced, 'is-rtl': $props.rtl }]
  }, [
    (openBlock(true), createBlock(Fragment, null, renderList($props.max, (item, index) => {
      return (openBlock(), createBlock("div", {
        class: ["rate-item", $options.rateClass(item)],
        key: index,
        onMousemove: $event => ($options.previewRate(item, $event)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => ($options.resetNewValue && $options.resetNewValue(...args))),
        onClick: withModifiers($event => ($options.confirmValue(item)), ["prevent"])
      }, [
        createVNode(_component_b_icon, {
          pack: $props.iconPack,
          icon: $props.icon,
          size: $props.size
        }, null, 8 /* PROPS */, ["pack", "icon", "size"]),
        ($options.checkHalf(item))
          ? (openBlock(), createBlock(_component_b_icon, {
              key: 0,
              class: "is-half",
              pack: $props.iconPack,
              icon: $props.icon,
              size: $props.size,
              style: $options.halfStyle
            }, null, 8 /* PROPS */, ["pack", "icon", "size", "style"]))
          : createCommentVNode("v-if", true)
      ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onMousemove", "onClick"]))
    }), 128 /* KEYED_FRAGMENT */)),
    ($props.showText || $props.showScore || $props.customText)
      ? (openBlock(), createBlock("div", {
          key: 0,
          class: ["rate-text", $props.size]
        }, [
          createVNode("span", null, toDisplayString($options.showMe), 1 /* TEXT */),
          ($props.customText && !$props.showText)
            ? (openBlock(), createBlock("span", _hoisted_1, toDisplayString($props.customText), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/rate/Rate.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BRate, Plugin as default };
