import { s as script$1 } from './Icon-fefef9ed.js';
import { s as script$2 } from './Input-82ba71aa.js';
import { F as FormElementMixin } from './FormElementMixin-55920052.js';
import { resolveComponent, openBlock, createBlock, Fragment, renderList, createVNode, withModifiers, mergeProps } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './config-1ce4c54c.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';

var script = {
    name: 'BNumberinput',
    components: {
        [script$1.name]: script$1,
        [script$2.name]: script$2
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    inject: {
        field: {
            from: 'BField',
            default: false
        }
    },
    props: {
        modelValue: Number,
        min: {
            type: [Number, String]
        },
        max: [Number, String],
        step: [Number, String],
        minStep: [Number, String],
        exponential: [Boolean, Number],
        disabled: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        editable: {
            type: Boolean,
            default: true
        },
        controls: {
            type: Boolean,
            default: true
        },
        controlsAlignment: {
            type: String,
            default: 'center',
            validator: (value) => {
                return [
                    'left',
                    'right',
                    'center'
                ].indexOf(value) >= 0
            }
        },
        controlsRounded: {
            type: Boolean,
            default: false
        },
        controlsPosition: String,
        placeholder: [Number, String],
        ariaMinusLabel: String,
        ariaPlusLabel: String
    },
    emits: ['blur', 'focus', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            newStep: this.step || 1,
            newMinStep: this.minStep,
            timesPressed: 1,
            _elementRef: 'input'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                let newValue = value;
                if (value === '' || value === undefined || value === null) {
                    if (this.minNumber !== undefined) {
                        newValue = this.minNumber;
                    } else {
                        newValue = null;
                    }
                }
                this.newValue = newValue;
                if (!isNaN(newValue) && newValue !== null && newValue !== '-0') {
                    this.$emit('update:modelValue', Number(newValue));
                }
                !this.isValid && this.$refs.input.checkHtml5Validity();
            }
        },
        controlsLeft() {
            if (this.controls && this.controlsAlignment !== 'right') {
                return this.controlsAlignment === 'left' ? ['minus', 'plus'] : ['minus']
            }
            return []
        },
        controlsRight() {
            if (this.controls && this.controlsAlignment !== 'left') {
                return this.controlsAlignment === 'right' ? ['minus', 'plus'] : ['plus']
            }
            return []
        },
        fieldClasses() {
            return [
                { 'has-addons': this.controlsPosition === 'compact' },
                { 'is-grouped': this.controlsPosition !== 'compact' },
                { 'is-expanded': this.expanded }
            ]
        },
        buttonClasses() {
            return [this.type, this.size, { 'is-rounded': this.controlsRounded }]
        },
        minNumber() {
            return typeof this.min === 'string' ? parseFloat(this.min) : this.min
        },
        maxNumber() {
            return typeof this.max === 'string' ? parseFloat(this.max) : this.max
        },
        stepNumber() {
            return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep
        },
        minStepNumber() {
            const step = typeof this.newMinStep !== 'undefined' ? this.newMinStep : this.newStep;
            return typeof step === 'string' ? parseFloat(step) : step
        },
        disabledMin() {
            return this.computedValue - this.stepNumber < this.minNumber
        },
        disabledMax() {
            return this.computedValue + this.stepNumber > this.maxNumber
        },
        stepDecimals() {
            const step = this.minStepNumber.toString();
            const index = step.indexOf('.');
            if (index >= 0) {
                return step.substring(index + 1).length
            }
            return 0
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
        modelValue: {
            immediate: true,
            handler(value) {
                this.newValue = value;
            }
        },
        step(value) {
            this.newStep = value;
        },
        minStep(value) {
            this.newMinStep = value;
        }
    },
    methods: {
        isDisabled(control) {
            return this.disabled || (control === 'plus' ? this.disabledMax : this.disabledMin)
        },
        decrement() {
            if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
                if (this.computedValue === null || typeof this.computedValue === 'undefined') {
                    if (this.maxNumber) {
                        this.computedValue = this.maxNumber;
                        return
                    }
                    this.computedValue = 0;
                }
                const value = this.computedValue - this.stepNumber;
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
        },
        increment() {
            if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
                if (this.computedValue === null || typeof this.computedValue === 'undefined') {
                    if (this.minNumber) {
                        this.computedValue = this.minNumber;
                        return
                    }
                    this.computedValue = 0;
                }
                const value = this.computedValue + this.stepNumber;
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
        },
        onControlClick(event, inc) {
            // IE 11 -> filter click event
            if (event.detail !== 0 || event.type !== 'click') return
            if (inc) this.increment();
            else this.decrement();
        },
        longPressTick(inc) {
            if (inc) this.increment();
            else this.decrement();

            this._$intervalRef = setTimeout(() => {
                this.longPressTick(inc);
            }, this.exponential ? (250 / (this.exponential * this.timesPressed++)) : 250);
        },
        onStartLongPress(event, inc) {
            if (event.button !== 0 && event.type !== 'touchstart') return
            clearTimeout(this._$intervalRef);
            this.longPressTick(inc);
        },
        onStopLongPress() {
            if (!this._$intervalRef) return
            this.timesPressed = 1;
            clearTimeout(this._$intervalRef);
            this._$intervalRef = null;
        }
    },
    mounted() {
        // tells the field that it is wrapping a number input
        // if the field is the direct parent.
        if (this.field === this.$parent) {
            this.$parent.wrapNumberinput({
                controlsPosition: this.controlsPosition,
                size: this.size
            });
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");

  return (openBlock(), createBlock("div", {
    class: ["b-numberinput field", $options.fieldClasses]
  }, [
    (openBlock(true), createBlock(Fragment, null, renderList($options.controlsLeft, (control) => {
      return (openBlock(), createBlock("p", {
        key: control,
        class: ['control', control],
        onMouseup: _cache[1] || (_cache[1] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchend: _cache[3] || (_cache[3] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchcancel: _cache[4] || (_cache[4] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args)))
      }, [
        createVNode("button", {
          type: "button",
          class: ["button", $options.buttonClasses],
          disabled: $options.isDisabled(control) || undefined,
          "aria-label": control === 'plus' ? $props.ariaPlusLabel : $props.ariaMinusLabel,
          onMousedown: $event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ),
          onTouchstart: withModifiers($event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ), ["prevent"]),
          onClick: $event => (
                    !$options.isDisabled(control) && $options.onControlClick($event, control === 'plus')
                )
        }, [
          createVNode(_component_b_icon, {
            both: "",
            icon: control,
            pack: _ctx.iconPack,
            size: _ctx.iconSize
          }, null, 8 /* PROPS */, ["icon", "pack", "size"])
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"])
      ], 34 /* CLASS, HYDRATE_EVENTS */))
    }), 128 /* KEYED_FRAGMENT */)),
    createVNode(_component_b_input, mergeProps({
      type: "number",
      ref: "input",
      modelValue: $options.computedValue,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ($options.computedValue = $event))
    }, _ctx.$attrs, {
      step: $options.minStepNumber,
      max: $props.max,
      min: $props.min,
      size: _ctx.size,
      disabled: $options.disabledOrUndefined,
      readonly: !$props.editable,
      loading: _ctx.loading,
      rounded: _ctx.rounded,
      icon: _ctx.icon,
      "icon-pack": _ctx.iconPack,
      autocomplete: _ctx.autocomplete,
      expanded: _ctx.expanded,
      placeholder: $props.placeholder,
      "use-html5-validation": _ctx.useHtml5Validation,
      onFocus: _cache[6] || (_cache[6] = $event => (_ctx.$emit('focus', $event))),
      onBlur: _cache[7] || (_cache[7] = $event => (_ctx.$emit('blur', $event)))
    }), null, 16 /* FULL_PROPS */, ["modelValue", "step", "max", "min", "size", "disabled", "readonly", "loading", "rounded", "icon", "icon-pack", "autocomplete", "expanded", "placeholder", "use-html5-validation"]),
    (openBlock(true), createBlock(Fragment, null, renderList($options.controlsRight, (control) => {
      return (openBlock(), createBlock("p", {
        key: control,
        class: ['control', control],
        onMouseup: _cache[8] || (_cache[8] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onMouseleave: _cache[9] || (_cache[9] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchend: _cache[10] || (_cache[10] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchcancel: _cache[11] || (_cache[11] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args)))
      }, [
        createVNode("button", {
          type: "button",
          class: ["button", $options.buttonClasses],
          disabled: $options.isDisabled(control) || undefined,
          "aria-label": control === 'plus' ? $props.ariaPlusLabel : $props.ariaMinusLabel,
          onMousedown: $event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ),
          onTouchstart: withModifiers($event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ), ["prevent"]),
          onClick: $event => (
                    !$options.isDisabled(control) && $options.onControlClick($event, control === 'plus')
                )
        }, [
          createVNode(_component_b_icon, {
            both: "",
            icon: control,
            pack: _ctx.iconPack,
            size: _ctx.iconSize
          }, null, 8 /* PROPS */, ["icon", "pack", "size"])
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"])
      ], 34 /* CLASS, HYDRATE_EVENTS */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/numberinput/Numberinput.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BNumberinput, Plugin as default };
