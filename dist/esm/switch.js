import { c as config } from './config-1ce4c54c.js';
import { openBlock, createBlock, withKeys, withModifiers, withDirectives, createVNode, vModelCheckbox, renderSlot } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';

var script = {
    name: 'BSwitch',
    props: {
        modelValue: [String, Number, Boolean, Function, Object, Array, Date],
        nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
        disabled: Boolean,
        type: String,
        passiveType: String,
        name: String,
        required: Boolean,
        size: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: false
        },
        rounded: {
            type: Boolean,
            default: () => {
                return config.defaultSwitchRounded
            }
        },
        outlined: {
            type: Boolean,
            default: false
        },
        leftLabel: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            isMouseDown: false
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value;
                this.$emit('update:modelValue', value);
            }
        },
        newClass() {
            return [
                this.size,
                {
                    'is-disabled': this.disabled,
                    'is-rounded': this.rounded,
                    'is-outlined': this.outlined,
                    'has-left-label': this.leftLabel
                }
            ]
        },
        checkClasses() {
            return [
                { 'is-elastic': this.isMouseDown && !this.disabled },
                (this.passiveType && `${this.passiveType}-passive`),
                this.type
            ]
        },
        disabledOrUndefined() {
            // On Vue 3, setting boolean attribute `false` does not remove it.
            // To do so, `null` or `undefined` has to be specified instead.
            // Setting `disabled="false"` ends up with a grayed out switch.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        modelValue(value) {
            this.newValue = value;
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus();
        }
    }
};

const _hoisted_1 = { class: "control-label" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: ["switch", $options.newClass],
    ref: "label",
    disabled: $options.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => ($options.focus && $options.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"])),
    onMousedown: _cache[5] || (_cache[5] = $event => ($data.isMouseDown = true)),
    onMouseup: _cache[6] || (_cache[6] = $event => ($data.isMouseDown = false)),
    onMouseout: _cache[7] || (_cache[7] = $event => ($data.isMouseDown = false)),
    onBlur: _cache[8] || (_cache[8] = $event => ($data.isMouseDown = false))
  }, [
    withDirectives(createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
      type: "checkbox",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      disabled: $options.disabledOrUndefined,
      name: $props.name,
      required: $props.required,
      value: $props.nativeValue,
      "true-value": $props.trueValue,
      "false-value": $props.falseValue
    }, null, 8 /* PROPS */, ["disabled", "name", "required", "value", "true-value", "false-value"]), [
      [vModelCheckbox, $options.computedValue]
    ]),
    createVNode("span", {
      class: ["check", $options.checkClasses]
    }, null, 2 /* CLASS */),
    createVNode("span", _hoisted_1, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script.render = render;
script.__file = "src/components/switch/Switch.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BSwitch, Plugin as default };
