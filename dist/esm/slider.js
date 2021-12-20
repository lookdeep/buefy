import { s as script$3 } from './Tooltip-a7cfc6f7.js';
import { c as config } from './config-1ce4c54c.js';
import { resolveComponent, openBlock, createBlock, createVNode, withCtx, mergeProps, withKeys, withModifiers, toDisplayString, createCommentVNode, renderSlot, Fragment, renderList } from 'vue';
import { b as bound } from './helpers-2263d431.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';

var script$2 = {
    name: 'BSliderThumb',
    components: {
        [script$3.name]: script$3
    },
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: ''
        },
        tooltip: {
            type: Boolean,
            default: true
        },
        indicator: {
            type: Boolean,
            default: false
        },
        customFormatter: Function,
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
        locale: {
            type: [String, Array],
            default: () => {
                return config.defaultLocale
            }
        },
        tooltipAlways: {
            type: Boolean,
            default: false
        }
    },
    emits: ['dragend', 'dragstart', 'update:modelValue'],
    data() {
        return {
            isFocused: false,
            dragging: false,
            startX: 0,
            startPosition: 0,
            newPosition: null,
            oldValue: this.modelValue
        }
    },
    computed: {
        disabled() {
            return this.$parent.disabled
        },
        max() {
            return this.$parent.max
        },
        min() {
            return this.$parent.min
        },
        step() {
            return this.$parent.step
        },
        precision() {
            return this.$parent.precision
        },
        currentPosition() {
            return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`
        },
        wrapperStyle() {
            return { left: this.currentPosition }
        },
        formattedValue() {
            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(this.modelValue)
            }

            if (this.format === 'percent') {
                return new Intl.NumberFormat(
                    this.locale,
                    {
                        style: 'percent'
                    }
                ).format(((this.modelValue - this.min)) / (this.max - this.min))
            }

            return new Intl.NumberFormat(this.locale).format(this.modelValue)
        }
    },
    methods: {
        onFocus() {
            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;
        },
        onButtonDown(event) {
            if (this.disabled) return
            event.preventDefault();
            this.onDragStart(event);
            if (typeof window !== 'undefined') {
                document.addEventListener('mousemove', this.onDragging);
                document.addEventListener('touchmove', this.onDragging);
                document.addEventListener('mouseup', this.onDragEnd);
                document.addEventListener('touchend', this.onDragEnd);
                document.addEventListener('contextmenu', this.onDragEnd);
            }
        },
        onLeftKeyDown() {
            if (this.disabled || this.modelValue === this.min) return
            this.newPosition = parseFloat(this.currentPosition) -
                this.step / (this.max - this.min) * 100;
            this.setPosition(this.newPosition);
            this.$parent.emitValue('change');
        },
        onRightKeyDown() {
            if (this.disabled || this.modelValue === this.max) return
            this.newPosition = parseFloat(this.currentPosition) +
                this.step / (this.max - this.min) * 100;
            this.setPosition(this.newPosition);
            this.$parent.emitValue('change');
        },
        onHomeKeyDown() {
            if (this.disabled || this.modelValue === this.min) return
            this.newPosition = 0;
            this.setPosition(this.newPosition);
            this.$parent.emitValue('change');
        },
        onEndKeyDown() {
            if (this.disabled || this.modelValue === this.max) return
            this.newPosition = 100;
            this.setPosition(this.newPosition);
            this.$parent.emitValue('change');
        },
        onDragStart(event) {
            this.dragging = true;
            this.$emit('dragstart');
            if (event.type === 'touchstart') {
                event.clientX = event.touches[0].clientX;
            }
            this.startX = event.clientX;
            this.startPosition = parseFloat(this.currentPosition);
            this.newPosition = this.startPosition;
        },
        onDragging(event) {
            if (this.dragging) {
                if (event.type === 'touchmove') {
                    event.clientX = event.touches[0].clientX;
                }
                const diff = (event.clientX - this.startX) / this.$parent.sliderSize() * 100;
                this.newPosition = this.startPosition + diff;
                this.setPosition(this.newPosition);
            }
        },
        onDragEnd() {
            this.dragging = false;
            this.$emit('dragend');
            if (this.modelValue !== this.oldValue) {
                this.$parent.emitValue('change');
            }
            this.setPosition(this.newPosition);
            if (typeof window !== 'undefined') {
                document.removeEventListener('mousemove', this.onDragging);
                document.removeEventListener('touchmove', this.onDragging);
                document.removeEventListener('mouseup', this.onDragEnd);
                document.removeEventListener('touchend', this.onDragEnd);
                document.removeEventListener('contextmenu', this.onDragEnd);
            }
        },
        setPosition(percent) {
            if (percent === null || isNaN(percent)) return
            if (percent < 0) {
                percent = 0;
            } else if (percent > 100) {
                percent = 100;
            }
            const stepLength = 100 / ((this.max - this.min) / this.step);
            const steps = Math.round(percent / stepLength);
            let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
            value = parseFloat(value.toFixed(this.precision));
            this.$emit('update:modelValue', value);
            if (!this.dragging && value !== this.oldValue) {
                this.oldValue = value;
            }
        }
    }
};

const _hoisted_1$2 = { key: 0 };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tooltip = resolveComponent("b-tooltip");

  return (openBlock(), createBlock("div", {
    class: ["b-slider-thumb-wrapper", { 'is-dragging': $data.dragging, 'has-indicator': $props.indicator}],
    style: $options.wrapperStyle
  }, [
    createVNode(_component_b_tooltip, {
      label: $options.formattedValue,
      type: $props.type,
      always: $data.dragging || $data.isFocused || $props.tooltipAlways,
      active: !$options.disabled && $props.tooltip
    }, {
      default: withCtx(() => [
        createVNode("div", mergeProps({
          class: "b-slider-thumb",
          tabindex: $options.disabled ? false : 0
        }, _ctx.$attrs, {
          onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.onButtonDown && $options.onButtonDown(...args))),
          onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.onButtonDown && $options.onButtonDown(...args))),
          onFocus: _cache[3] || (_cache[3] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          onBlur: _cache[4] || (_cache[4] = (...args) => ($options.onBlur && $options.onBlur(...args))),
          onKeydown: [
            _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => ($options.onLeftKeyDown && $options.onLeftKeyDown(...args)), ["prevent"]), ["left"])),
            _cache[6] || (_cache[6] = withKeys(withModifiers((...args) => ($options.onRightKeyDown && $options.onRightKeyDown(...args)), ["prevent"]), ["right"])),
            _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => ($options.onLeftKeyDown && $options.onLeftKeyDown(...args)), ["prevent"]), ["down"])),
            _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => ($options.onRightKeyDown && $options.onRightKeyDown(...args)), ["prevent"]), ["up"])),
            _cache[9] || (_cache[9] = withKeys(withModifiers((...args) => ($options.onHomeKeyDown && $options.onHomeKeyDown(...args)), ["prevent"]), ["home"])),
            _cache[10] || (_cache[10] = withKeys(withModifiers((...args) => ($options.onEndKeyDown && $options.onEndKeyDown(...args)), ["prevent"]), ["end"]))
          ]
        }), [
          ($props.indicator)
            ? (openBlock(), createBlock("span", _hoisted_1$2, toDisplayString($options.formattedValue), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ], 16 /* FULL_PROPS */, ["tabindex"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["label", "type", "always", "active"])
  ], 6 /* CLASS, STYLE */))
}

script$2.render = render$2;
script$2.__file = "src/components/slider/SliderThumb.vue";

var script$1 = {
    name: 'BSliderTick',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        position() {
            const pos = (this.value - this.$parent.min) /
                (this.$parent.max - this.$parent.min) * 100;
            return (pos >= 0 && pos <= 100) ? pos : 0
        },
        hidden() {
            return this.value === this.$parent.min || this.value === this.$parent.max
        }
    },
    methods: {
        getTickStyle(position) {
            return { left: position + '%' }
        }
    },
    created() {
        if (!this.$parent.$data._isSlider) {
            throw new Error('You should wrap bSliderTick on a bSlider')
        }
    }
};

const _hoisted_1$1 = {
  key: 0,
  class: "b-slider-tick-label"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["b-slider-tick", { 'is-tick-hidden': $options.hidden }],
    style: $options.getTickStyle($options.position)
  }, [
    (_ctx.$slots.default)
      ? (openBlock(), createBlock("span", _hoisted_1$1, [
          renderSlot(_ctx.$slots, "default")
        ]))
      : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

script$1.render = render$1;
script$1.__file = "src/components/slider/SliderTick.vue";

var script = {
    name: 'BSlider',
    components: {
        [script$2.name]: script$2,
        [script$1.name]: script$1
    },
    props: {
        modelValue: {
            type: [Number, Array],
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: 'is-primary'
        },
        size: String,
        ticks: {
            type: Boolean,
            default: false
        },
        tooltip: {
            type: Boolean,
            default: true
        },
        tooltipType: String,
        rounded: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: false
        },
        customFormatter: Function,
        ariaLabel: [String, Array],
        biggerSliderFocus: {
            type: Boolean,
            default: false
        },
        indicator: {
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
        locale: {
            type: [String, Array],
            default: () => {
                return config.defaultLocale
            }
        },
        tooltipAlways: {
            type: Boolean,
            default: false
        }
    },
    emits: ['change', 'dragend', 'dragging', 'dragstart', 'update:modelValue'],
    data() {
        return {
            value1: null,
            value2: null,
            // internal is used to update value1 and value2 with a single shot.
            // internal is also used to stop unnecessary propagation of update.
            internal: {
                value1: null,
                value2: null
            },
            dragging: false,
            isRange: false,
            _isSlider: true // Used by Thumb and Tick
        }
    },
    computed: {
        newTooltipType() {
            return this.tooltipType ? this.tooltipType : this.type
        },
        tickValues() {
            if (!this.ticks || this.min > this.max || this.step === 0) return []
            const result = [];
            for (let i = this.min + this.step; i < this.max; i = i + this.step) {
                result.push(i);
            }
            return result
        },
        minValue() {
            return Math.min(this.value1, this.value2)
        },
        maxValue() {
            return Math.max(this.value1, this.value2)
        },
        barSize() {
            return this.isRange
                ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
                : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`
        },
        barStart() {
            return this.isRange
                ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
                : '0%'
        },
        precision() {
            const precisions = [this.min, this.max, this.step].map((item) => {
                const decimal = ('' + item).split('.')[1];
                return decimal ? decimal.length : 0
            });
            return Math.max(...precisions)
        },
        barStyle() {
            return {
                width: this.barSize,
                left: this.barStart
            }
        },
        rootClasses() {
            return {
                'is-rounded': this.rounded,
                'is-dragging': this.dragging,
                'is-disabled': this.disabled,
                'slider-focus': this.biggerSliderFocus
            }
        }
    },
    watch: {
        /**
        * When v-model is changed set the new active step.
        */
        modelValue(value) {
            this.setValues(value);
        },
        internal({ value1, value2 }) {
            this.value1 = value1;
            this.value2 = value2;
        },
        value1(newValue) {
            if (this.internal.value1 !== newValue) {
                this.onInternalValueUpdate();
            }
        },
        value2(newValue) {
            if (this.internal.value2 !== newValue) {
                this.onInternalValueUpdate();
            }
        },
        min() {
            this.setValues(this.modelValue);
        },
        max() {
            this.setValues(this.modelValue);
        }
    },
    methods: {
        setValues(newValue) {
            if (this.min > this.max) {
                return
            }
            if (Array.isArray(newValue)) {
                this.isRange = true;
                const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                    ? this.min
                    : bound(newValue[0], this.min, this.max);
                const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                    ? this.max
                    : bound(newValue[1], this.min, this.max);
                // premature update will be triggered and end up with circular
                // update, if value1 and value2 are updated one by one
                this.internal = {
                    value1: this.isThumbReversed ? largeValue : smallValue,
                    value2: this.isThumbReversed ? smallValue : largeValue
                };
            } else {
                this.isRange = false;
                this.internal = {
                    value1: isNaN(newValue)
                        ? this.min
                        : bound(newValue, this.min, this.max),
                    value2: null
                };
            }
        },
        onInternalValueUpdate() {
            if (this.isRange) {
                this.isThumbReversed = this.value1 > this.value2;
            }
            if (!this.lazy || !this.dragging) {
                this.emitValue('update:modelValue');
            }
            if (this.dragging) {
                this.emitValue('dragging');
            }
        },
        sliderSize() {
            return this.$refs.slider.getBoundingClientRect().width
        },
        onSliderClick(event) {
            if (this.disabled || this.isTrackClickDisabled) return
            const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
            const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
            const targetValue = this.min + percent * (this.max - this.min) / 100;
            const diffFirst = Math.abs(targetValue - this.value1);
            if (!this.isRange) {
                if (diffFirst < this.step / 2) return
                this.$refs.button1.setPosition(percent);
            } else {
                const diffSecond = Math.abs(targetValue - this.value2);
                if (diffFirst <= diffSecond) {
                    if (diffFirst < this.step / 2) return
                    this.$refs.button1.setPosition(percent);
                } else {
                    if (diffSecond < this.step / 2) return
                    this.$refs.button2.setPosition(percent);
                }
            }
            this.emitValue('change');
        },
        onDragStart() {
            this.dragging = true;
            this.$emit('dragstart');
        },
        onDragEnd() {
            this.isTrackClickDisabled = true;
            setTimeout(() => {
                // avoid triggering onSliderClick after dragend
                this.isTrackClickDisabled = false;
            }, 0);
            this.dragging = false;
            this.$emit('dragend');
            if (this.lazy) {
                this.emitValue('update:modelValue');
            }
        },
        emitValue(type) {
            this.$emit(type, this.isRange
                ? [this.minValue, this.maxValue]
                : this.value1);
        }
    },
    created() {
        this.isThumbReversed = false;
        this.isTrackClickDisabled = false;
        this.setValues(this.modelValue);
    }
};

const _hoisted_1 = {
  class: "b-slider-track",
  ref: "slider"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slider_tick = resolveComponent("b-slider-tick");
  const _component_b_slider_thumb = resolveComponent("b-slider-thumb");

  return (openBlock(), createBlock("div", {
    class: ["b-slider", [$props.size, $props.type, $options.rootClasses ]],
    onClick: _cache[3] || (_cache[3] = (...args) => ($options.onSliderClick && $options.onSliderClick(...args)))
  }, [
    createVNode("div", _hoisted_1, [
      createVNode("div", {
        class: "b-slider-fill",
        style: $options.barStyle
      }, null, 4 /* STYLE */),
      ($props.ticks)
        ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList($options.tickValues, (val, key) => {
            return (openBlock(), createBlock(_component_b_slider_tick, {
              key: key,
              value: val
            }, null, 8 /* PROPS */, ["value"]))
          }), 128 /* KEYED_FRAGMENT */))
        : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_b_slider_thumb, {
        "tooltip-always": $props.tooltipAlways,
        modelValue: $data.value1,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.value1 = $event)),
        type: $options.newTooltipType,
        tooltip: $props.tooltip,
        "custom-formatter": $props.customFormatter,
        indicator: $props.indicator,
        format: $props.format,
        locale: $props.locale,
        ref: "button1",
        role: "slider",
        "aria-valuenow": $data.value1,
        "aria-valuemin": $props.min,
        "aria-valuemax": $props.max,
        "aria-orientation": "horizontal",
        "aria-label": Array.isArray($props.ariaLabel) ? $props.ariaLabel[0] : $props.ariaLabel,
        "aria-disabled": $props.disabled,
        onDragstart: $options.onDragStart,
        onDragend: $options.onDragEnd
      }, null, 8 /* PROPS */, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]),
      ($data.isRange)
        ? (openBlock(), createBlock(_component_b_slider_thumb, {
            key: 1,
            "tooltip-always": $props.tooltipAlways,
            modelValue: $data.value2,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.value2 = $event)),
            type: $options.newTooltipType,
            tooltip: $props.tooltip,
            "custom-formatter": $props.customFormatter,
            indicator: $props.indicator,
            format: $props.format,
            locale: $props.locale,
            ref: "button2",
            role: "slider",
            "aria-valuenow": $data.value2,
            "aria-valuemin": $props.min,
            "aria-valuemax": $props.max,
            "aria-orientation": "horizontal",
            "aria-label": Array.isArray($props.ariaLabel) ? $props.ariaLabel[1] : '',
            "aria-disabled": $props.disabled,
            onDragstart: $options.onDragStart,
            onDragend: $options.onDragEnd
          }, null, 8 /* PROPS */, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]))
        : createCommentVNode("v-if", true)
    ], 512 /* NEED_PATCH */)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/slider/Slider.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
    registerComponent(Vue, script$1);
  }
};
use(Plugin);

export { script as BSlider, script$1 as BSliderTick, Plugin as default };
