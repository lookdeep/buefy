'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-2c63be1d.js');
var InjectedChildMixin = require('./InjectedChildMixin-d2127742.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');

var script$1 = {
    name: 'BProgress',
    mixins: [InjectedChildMixin.ProviderParentMixin('progress')],
    props: {
        type: {
            type: [String, Object],
            default: 'is-darkgrey'
        },
        size: String,
        value: {
            type: Number,
            default: undefined
        },
        max: {
            type: Number,
            default: 100
        },
        showValue: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'raw',
            validator: (value) => {
                return [
                    'raw',
                    'percent'
                ].indexOf(value) >= 0
            }
        },
        precision: {
            type: Number,
            default: 2
        },
        keepTrailingZeroes: {
            type: Boolean,
            default: false
        },
        locale: {
            type: [String, Array],
            default: () => {
                return config.config.defaultLocale
            }
        }
    },
    computed: {
        isIndeterminate() {
            return this.value === undefined || this.value === null
        },
        newType() {
            return [
                this.size,
                this.type,
                {
                    'is-more-than-half': this.value && this.value > this.max / 2
                }
            ]
        },
        newValue() {
            return this.calculateValue(this.value)
        },
        isNative() {
            return this.$slots.bar === undefined
        },
        wrapperClasses() {
            return {
                'is-not-native': !this.isNative,
                [this.size]: !this.isNative
            }
        }
    },
    watch: {
        /**
         * When value is changed back to undefined, value of native progress get reset to 0.
         * Need to add and remove the value attribute to have the indeterminate or not.
         */
        isIndeterminate(indeterminate) {
            this.$nextTick(() => {
                if (this.$refs.progress) {
                    if (indeterminate) {
                        this.$refs.progress.removeAttribute('value');
                    } else {
                        this.$refs.progress.setAttribute('value', this.value);
                    }
                }
            });
        }
    },
    methods: {
        calculateValue(value) {
            if (value === undefined || value === null || isNaN(value)) {
                return undefined
            }

            const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
            const maximumFractionDigits = this.precision;
            if (this.format === 'percent') {
                return new Intl.NumberFormat(
                    this.locale,
                    {
                        style: 'percent',
                        minimumFractionDigits: minimumFractionDigits,
                        maximumFractionDigits: maximumFractionDigits
                    }
                ).format(value / this.max)
            }

            return new Intl.NumberFormat(
                this.locale,
                {
                    minimumFractionDigits: minimumFractionDigits,
                    maximumFractionDigits: maximumFractionDigits
                }
            ).format(value)
        }
    }
};

const _hoisted_1$1 = {
  key: 2,
  class: "progress-value"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", {
    class: ["progress-wrapper", $options.wrapperClasses]
  }, [
    ($options.isNative)
      ? (vue.openBlock(), vue.createBlock("progress", {
          key: 0,
          ref: "progress",
          class: ["progress", $options.newType],
          max: $props.max,
          value: $props.value
        }, vue.toDisplayString($options.newValue), 11 /* TEXT, CLASS, PROPS */, ["max", "value"]))
      : vue.renderSlot(_ctx.$slots, "bar", { key: 1 }),
    ($options.isNative && $props.showValue)
      ? (vue.openBlock(), vue.createBlock("p", _hoisted_1$1, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString($options.newValue), 1 /* TEXT */)
          ])
        ]))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "src/components/progress/Progress.vue";

var script = {
    name: 'BProgressBar',
    mixins: [InjectedChildMixin.InjectedChildMixin('progress')],
    props: {
        type: {
            type: [String, Object],
            default: undefined
        },
        value: {
            type: Number,
            default: undefined
        },
        showValue: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        newType() {
            return [
                this.parent.size,
                this.type || this.parent.type
            ]
        },
        newShowValue() {
            return this.showValue || this.parent.showValue
        },
        newValue() {
            return this.parent.calculateValue(this.value)
        },
        barWidth() {
            return `${this.value * 100 / this.parent.max}%`
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "progress-value"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", {
    class: ["progress-bar", $options.newType],
    role: "progressbar",
    "aria-valuenow": $props.value,
    "aria-valuemax": _ctx.parent.max,
    "aria-valuemin": "0",
    style: {width: $options.barWidth}
  }, [
    ($options.newShowValue)
      ? (vue.openBlock(), vue.createBlock("p", _hoisted_1, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString($options.newValue), 1 /* TEXT */)
          ])
        ]))
      : vue.createCommentVNode("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["aria-valuenow", "aria-valuemax"]))
}

script.render = render;
script.__file = "src/components/progress/ProgressBar.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script$1);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BProgress = script$1;
exports.BProgressBar = script;
exports["default"] = Plugin;
