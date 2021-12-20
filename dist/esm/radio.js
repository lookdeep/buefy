import { C as CheckRadioMixin } from './CheckRadioMixin-43df7c28.js';
import { openBlock, createBlock, withKeys, withModifiers, withDirectives, createVNode, vModelRadio, renderSlot } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';

var script$1 = {
    name: 'BRadio',
    mixins: [CheckRadioMixin]
};

const _hoisted_1 = { class: "control-label" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: ["b-radio radio", [_ctx.size, { 'is-disabled': _ctx.disabled }]],
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.focus && _ctx.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
  }, [
    withDirectives(createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
      type: "radio",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 8 /* PROPS */, ["disabled", "required", "name", "value"]), [
      [vModelRadio, _ctx.computedValue]
    ]),
    createVNode("span", {
      class: ["check", _ctx.type]
    }, null, 2 /* CLASS */),
    createVNode("span", _hoisted_1, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script$1.render = render$1;
script$1.__file = "src/components/radio/Radio.vue";

var script = {
    name: 'BRadioButton',
    mixins: [CheckRadioMixin],
    props: {
        type: {
            type: String,
            default: 'is-primary'
        },
        expanded: Boolean
    },
    data() {
        return {
            isFocused: false
        }
    },
    computed: {
        isSelected() {
            return this.newValue === this.nativeValue
        },
        labelClass() {
            return [
                this.isSelected ? this.type : null,
                this.size,
                {
                    'is-selected': this.isSelected,
                    'is-disabled': this.disabled,
                    'is-focused': this.isFocused
                }
            ]
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["control", { 'is-expanded': $props.expanded }]
  }, [
    createVNode("label", {
      class: ["b-radio radio button", $options.labelClass],
      ref: "label",
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.focus && _ctx.focus(...args))),
      onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
    }, [
      renderSlot(_ctx.$slots, "default"),
      withDirectives(createVNode("input", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
        type: "radio",
        ref: "input",
        onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
        disabled: _ctx.disabledOrUndefined,
        required: _ctx.requiredOrUndefined,
        name: _ctx.name,
        value: _ctx.nativeValue,
        onFocus: _cache[3] || (_cache[3] = $event => ($data.isFocused = true)),
        onBlur: _cache[4] || (_cache[4] = $event => ($data.isFocused = false))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "required", "name", "value"]), [
        [vModelRadio, _ctx.computedValue]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/radio/RadioButton.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script$1);
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script$1 as BRadio, script as BRadioButton, Plugin as default };
