'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-2c63be1d.js');
var Icon = require('./Icon-dc7b693f.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');

var script = {
    name: 'BRate',
    components: {
        [Icon.script.name]: Icon.script
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
                return config.config.defaultLocale
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
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["rate", { 'is-disabled': $props.disabled, 'is-spaced': $props.spaced, 'is-rtl': $props.rtl }]
  }, [
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.max, (item, index) => {
      return (vue.openBlock(), vue.createBlock("div", {
        class: ["rate-item", $options.rateClass(item)],
        key: index,
        onMousemove: $event => ($options.previewRate(item, $event)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => ($options.resetNewValue && $options.resetNewValue(...args))),
        onClick: vue.withModifiers($event => ($options.confirmValue(item)), ["prevent"])
      }, [
        vue.createVNode(_component_b_icon, {
          pack: $props.iconPack,
          icon: $props.icon,
          size: $props.size
        }, null, 8 /* PROPS */, ["pack", "icon", "size"]),
        ($options.checkHalf(item))
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 0,
              class: "is-half",
              pack: $props.iconPack,
              icon: $props.icon,
              size: $props.size,
              style: $options.halfStyle
            }, null, 8 /* PROPS */, ["pack", "icon", "size", "style"]))
          : vue.createCommentVNode("v-if", true)
      ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onMousemove", "onClick"]))
    }), 128 /* KEYED_FRAGMENT */)),
    ($props.showText || $props.showScore || $props.customText)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: ["rate-text", $props.size]
        }, [
          vue.createVNode("span", null, vue.toDisplayString($options.showMe), 1 /* TEXT */),
          ($props.customText && !$props.showText)
            ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString($props.customText), 1 /* TEXT */))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/rate/Rate.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BRate = script;
exports["default"] = Plugin;
