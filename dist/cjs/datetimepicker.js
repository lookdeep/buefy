'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var FormElementMixin = require('./FormElementMixin-1ac87810.js');
var helpers = require('./helpers-0d6e2444.js');
var config = require('./config-2c63be1d.js');
var Datepicker = require('./Datepicker-343cb887.js');
var Timepicker = require('./Timepicker-d6f257f4.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');
require('./DropdownItem-e39207cf.js');
require('./trapFocus-c795a1dd.js');
require('./InjectedChildMixin-d2127742.js');
require('./Input-554891c1.js');
require('./Icon-dc7b693f.js');
require('./Field-0c66b159.js');
require('./Select-a6108835.js');
require('./TimepickerMixin-3bcb5c80.js');

const AM = 'AM';
const PM = 'PM';
var script = {
    name: 'BDatetimepicker',
    components: {
        [Datepicker.script.name]: Datepicker.script,
        [Timepicker.script.name]: Timepicker.script
    },
    mixins: [FormElementMixin.FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Date
        },
        editable: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        horizontalTimePicker: Boolean,
        disabled: Boolean,
        icon: String,
        iconPack: String,
        inline: Boolean,
        openOnFocus: Boolean,
        position: String,
        mobileNative: {
            type: Boolean,
            default: true
        },
        minDatetime: Date,
        maxDatetime: Date,
        datetimeFormatter: {
            type: Function
        },
        datetimeParser: {
            type: Function
        },
        datetimeCreator: {
            type: Function,
            default: (date) => {
                if (typeof config.config.defaultDatetimeCreator === 'function') {
                    return config.config.defaultDatetimeCreator(date)
                } else {
                    return date
                }
            }
        },
        datepicker: Object,
        timepicker: Object,
        tzOffset: {
            type: Number,
            default: 0
        },
        focusable: {
            type: Boolean,
            default: true
        },
        appendToBody: Boolean
    },
    emits: [
        'change-month',
        'change-year',
        'update:modelValue'
    ],
    data() {
        return {
            newValue: this.adjustValue(this.modelValue)
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                if (value) {
                    let val = new Date(value.getTime());
                    if (this.newValue) {
                        // restore time part
                        if ((value.getDate() !== this.newValue.getDate() ||
                            value.getMonth() !== this.newValue.getMonth() ||
                            value.getFullYear() !== this.newValue.getFullYear()) &&
                            value.getHours() === 0 &&
                            value.getMinutes() === 0 &&
                            value.getSeconds() === 0) {
                            val.setHours(this.newValue.getHours(),
                                this.newValue.getMinutes(),
                                this.newValue.getSeconds(), 0);
                        }
                    } else {
                        val = this.datetimeCreator(value);
                    }
                    // check min and max range
                    if (this.minDatetime && val < this.adjustValue(this.minDatetime)) {
                        val = this.adjustValue(this.minDatetime);
                    } else if (this.maxDatetime && val > this.adjustValue(this.maxDatetime)) {
                        val = this.adjustValue(this.maxDatetime);
                    }
                    this.newValue = new Date(val.getTime());
                } else {
                    this.newValue = this.adjustValue(value);
                }
                const adjustedValue = this.adjustValue(this.newValue, true); // reverse adjust
                this.$emit('update:modelValue', adjustedValue);
            }
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: this.enableSeconds() ? 'numeric' : undefined
            }).resolvedOptions()
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale, {
                year: this.localeOptions.year || 'numeric',
                month: this.localeOptions.month || 'numeric',
                day: this.localeOptions.day || 'numeric',
                hour: this.localeOptions.hour || 'numeric',
                minute: this.localeOptions.minute || 'numeric',
                second: this.enableSeconds() ? this.localeOptions.second || 'numeric' : undefined,
                hour12: !this.isHourFormat24()
            })
        },
        isMobileNative() {
            return this.mobileNative && this.tzOffset === 0
        },
        isMobile() {
            return this.isMobileNative && helpers.isMobile.any()
        },
        minDate() {
            if (!this.minDatetime) {
                return this.datepicker ? this.adjustValue(this.datepicker.minDate) : null
            }
            const adjMinDatetime = this.adjustValue(this.minDatetime);
            return new Date(adjMinDatetime.getFullYear(),
                adjMinDatetime.getMonth(),
                adjMinDatetime.getDate(), 0, 0, 0, 0)
        },
        maxDate() {
            if (!this.maxDatetime) {
                return this.datepicker ? this.adjustValue(this.datepicker.maxDate) : null
            }
            const adjMaxDatetime = this.adjustValue(this.maxDatetime);
            return new Date(adjMaxDatetime.getFullYear(),
                adjMaxDatetime.getMonth(),
                adjMaxDatetime.getDate(), 0, 0, 0, 0)
        },
        minTime() {
            if (!this.minDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.adjustValue(this.timepicker.minTime) : null
            }
            const adjMinDatetime = this.adjustValue(this.minDatetime);
            if (adjMinDatetime.getFullYear() === this.newValue.getFullYear() &&
                adjMinDatetime.getMonth() === this.newValue.getMonth() &&
                adjMinDatetime.getDate() === this.newValue.getDate()) {
                return adjMinDatetime
            }
            return undefined
        },
        maxTime() {
            if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.adjustValue(this.timepicker.maxTime) : null
            }
            const adjMaxDatetime = this.adjustValue(this.maxDatetime);
            if (adjMaxDatetime.getFullYear() === this.newValue.getFullYear() &&
                adjMaxDatetime.getMonth() === this.newValue.getMonth() &&
                adjMaxDatetime.getDate() === this.newValue.getDate()) {
                return adjMaxDatetime
            }
            return undefined
        },
        datepickerSize() {
            return this.datepicker && this.datepicker.size
                ? this.datepicker.size
                : this.size
        },
        timepickerSize() {
            return this.timepicker && this.timepicker.size
                ? this.timepicker.size
                : this.size
        },
        timepickerDisabled() {
            return this.timepicker && this.timepicker.disabled
                ? this.timepicker.disabled
                : this.disabled
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        modelValue() {
            this.newValue = this.adjustValue(this.modelValue);
        },
        tzOffset() {
            this.newValue = this.adjustValue(this.modelValue);
        }
    },
    methods: {
        enableSeconds() {
            if (this.$refs.timepicker) {
                return this.$refs.timepicker.enableSeconds
            }
            return false
        },
        isHourFormat24() {
            if (this.$refs.timepicker) {
                return this.$refs.timepicker.isHourFormat24
            }
            return !this.localeOptions.hour12
        },
        adjustValue(value, reverse = false) {
            if (!value) return value
            if (reverse) {
                return new Date(value.getTime() - this.tzOffset * 60000)
            } else {
                return new Date(value.getTime() + this.tzOffset * 60000)
            }
        },
        defaultDatetimeParser(date) {
            if (typeof this.datetimeParser === 'function') {
                return this.datetimeParser(date)
            } else if (typeof config.config.defaultDatetimeParser === 'function') {
                return config.config.defaultDatetimeParser(date)
            } else {
                if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                    const dayPeriods = [AM, PM, AM.toLowerCase(), PM.toLowerCase()];
                    if (this.$refs.timepicker) {
                        dayPeriods.push(this.$refs.timepicker.amString);
                        dayPeriods.push(this.$refs.timepicker.pmString);
                    }
                    const parts = this.dtf.formatToParts(new Date());
                    const formatRegex = parts.map((part, idx) => {
                        if (part.type === 'literal') {
                            if (idx + 1 < parts.length && parts[idx + 1].type === 'hour') {
                                return '[^\\d]+'
                            }
                            return part.value.replace(/ /g, '\\s?')
                        } else if (part.type === 'dayPeriod') {
                            return `((?!=<${part.type}>)(${dayPeriods.join('|')})?)`
                        }
                        return `((?!=<${part.type}>)\\d+)`
                    }).join('');
                    const datetimeGroups = helpers.matchWithGroups(formatRegex, date);

                    // We do a simple validation for the group.
                    // If it is not valid, it will fallback to Date.parse below
                    if (
                        datetimeGroups.year &&
                        datetimeGroups.year.length === 4 &&
                        datetimeGroups.month &&
                        datetimeGroups.month <= 12 &&
                        datetimeGroups.day &&
                        datetimeGroups.day <= 31 &&
                        datetimeGroups.hour &&
                        datetimeGroups.hour >= 0 &&
                        datetimeGroups.hour < 24 &&
                        datetimeGroups.minute &&
                        datetimeGroups.minute >= 0 &&
                        datetimeGroups.minute < 59
                    ) {
                        const d = new Date(
                            datetimeGroups.year,
                            datetimeGroups.month - 1,
                            datetimeGroups.day,
                            datetimeGroups.hour,
                            datetimeGroups.minute,
                            datetimeGroups.second || 0);
                        return d
                    }
                }

                return new Date(Date.parse(date))
            }
        },
        defaultDatetimeFormatter(date) {
            if (typeof this.datetimeFormatter === 'function') {
                return this.datetimeFormatter(date)
            } else if (typeof config.config.defaultDatetimeFormatter === 'function') {
                return config.config.defaultDatetimeFormatter(date)
            } else {
                return this.dtf.format(date)
            }
        },
        /*
        * Parse date from string
        */
        onChangeNativePicker(event) {
            const date = event.target.value;
            const s = date ? date.split(/\D/) : [];
            if (s.length >= 5) {
                const year = parseInt(s[0], 10);
                const month = parseInt(s[1], 10) - 1;
                const day = parseInt(s[2], 10);
                const hours = parseInt(s[3], 10);
                const minutes = parseInt(s[4], 10);
                // Seconds are omitted intentionally; they are unsupported by input
                // type=datetime-local and cause the control to fail native validation
                this.computedValue = new Date(year, month, day, hours, minutes);
            } else {
                this.computedValue = null;
            }
        },
        formatNative(value) {
            const date = new Date(value);
            if (value && !isNaN(date)) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day) + 'T' +
                    ((hours < 10 ? '0' : '') + hours) + ':' +
                    ((minutes < 10 ? '0' : '') + minutes) + ':' +
                    ((seconds < 10 ? '0' : '') + seconds)
            }
            return ''
        },
        toggle() {
            this.$refs.datepicker.toggle();
        }
    },
    mounted() {
        if (!this.isMobile || this.inline) {
            // $refs attached, it's time to refresh datepicker (input)
            if (this.newValue) {
                this.$refs.datepicker.$forceUpdate();
            }
        }
    }
};

const _hoisted_1 = { class: "level is-mobile" };
const _hoisted_2 = {
  key: 0,
  class: "level-item has-text-centered"
};
const _hoisted_3 = { class: "level-item has-text-centered" };
const _hoisted_4 = {
  key: 1,
  class: "level-item has-text-centered"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_timepicker = vue.resolveComponent("b-timepicker");
  const _component_b_datepicker = vue.resolveComponent("b-datepicker");
  const _component_b_input = vue.resolveComponent("b-input");

  return (!$options.isMobile || $props.inline)
    ? (vue.openBlock(), vue.createBlock(_component_b_datepicker, vue.mergeProps({
        key: 0,
        ref: "datepicker",
        modelValue: $options.computedValue,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($options.computedValue = $event))
      }, $props.datepicker, {
        rounded: _ctx.rounded,
        "open-on-focus": $props.openOnFocus,
        position: $props.position,
        loading: _ctx.loading,
        inline: $props.inline,
        editable: $props.editable,
        expanded: _ctx.expanded,
        "close-on-click": false,
        "date-formatter": $options.defaultDatetimeFormatter,
        "date-parser": $options.defaultDatetimeParser,
        "min-date": $options.minDate,
        "max-date": $options.maxDate,
        icon: $props.icon,
        "icon-pack": $props.iconPack,
        size: $options.datepickerSize,
        placeholder: $props.placeholder,
        "horizontal-time-picker": $props.horizontalTimePicker,
        range: false,
        disabled: $options.disabledOrUndefined,
        "mobile-native": $options.isMobileNative,
        locale: _ctx.locale,
        focusable: $props.focusable,
        "append-to-body": $props.appendToBody,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.onBlur,
        onChangeMonth: _cache[3] || (_cache[3] = $event => (_ctx.$emit('change-month', $event))),
        onChangeYear: _cache[4] || (_cache[4] = $event => (_ctx.$emit('change-year', $event)))
      }), {
        default: vue.withCtx(() => [
          vue.createVNode("nav", _hoisted_1, [
            (_ctx.$slots.left !== undefined)
              ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
                  vue.renderSlot(_ctx.$slots, "left")
                ]))
              : vue.createCommentVNode("v-if", true),
            vue.createVNode("div", _hoisted_3, [
              vue.createVNode(_component_b_timepicker, vue.mergeProps({ ref: "timepicker" }, $props.timepicker, {
                modelValue: $options.computedValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
                inline: "",
                editable: $props.editable,
                "min-time": $options.minTime,
                "max-time": $options.maxTime,
                size: $options.timepickerSize,
                disabled: $options.timepickerDisabled || undefined,
                focusable: $props.focusable,
                "mobile-native": $options.isMobileNative,
                locale: _ctx.locale
              }), null, 16 /* FULL_PROPS */, ["modelValue", "editable", "min-time", "max-time", "size", "disabled", "focusable", "mobile-native", "locale"])
            ]),
            (_ctx.$slots.right !== undefined)
              ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, [
                  vue.renderSlot(_ctx.$slots, "right")
                ]))
              : vue.createCommentVNode("v-if", true)
          ])
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["modelValue", "rounded", "open-on-focus", "position", "loading", "inline", "editable", "expanded", "date-formatter", "date-parser", "min-date", "max-date", "icon", "icon-pack", "size", "placeholder", "horizontal-time-picker", "disabled", "mobile-native", "locale", "focusable", "append-to-body", "onFocus", "onBlur"]))
    : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
        key: 1,
        ref: "input",
        type: "datetime-local",
        autocomplete: "off",
        "model-value": $options.formatNative($options.computedValue),
        placeholder: $props.placeholder,
        size: _ctx.size,
        icon: $props.icon,
        "icon-pack": $props.iconPack,
        rounded: _ctx.rounded,
        loading: _ctx.loading,
        max: $options.formatNative($options.maxDate),
        min: $options.formatNative($options.minDate),
        disabled: $options.disabledOrUndefined,
        readonly: false
      }, _ctx.$attrs, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onChange: $options.onChangeNativePicker,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.onBlur
      }), null, 16 /* FULL_PROPS */, ["model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus", "onBlur"]))
}

script.render = render;
script.__file = "src/components/datetimepicker/Datetimepicker.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BDatetimepicker = script;
exports["default"] = Plugin;
