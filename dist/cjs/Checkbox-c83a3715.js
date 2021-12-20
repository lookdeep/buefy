'use strict';

var CheckRadioMixin = require('./CheckRadioMixin-6055e755.js');
var vue = require('vue');

var script = {
    name: 'BCheckbox',
    mixins: [CheckRadioMixin.CheckRadioMixin],
    props: {
        indeterminate: Boolean,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: false
        }
    }
};

const _hoisted_1 = { class: "control-label" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("label", {
    class: ["b-checkbox checkbox", [_ctx.size, { 'is-disabled': _ctx.disabled }]],
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.focus && _ctx.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
  }, [
    vue.withDirectives(vue.createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
      indeterminate: $props.indeterminate,
      type: "checkbox",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue,
      "true-value": $props.trueValue,
      "false-value": $props.falseValue
    }, null, 8 /* PROPS */, ["indeterminate", "disabled", "required", "name", "value", "true-value", "false-value"]), [
      [vue.vModelCheckbox, _ctx.computedValue]
    ]),
    vue.createVNode("span", {
      class: ["check", _ctx.type]
    }, null, 2 /* CLASS */),
    vue.createVNode("span", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script.render = render;
script.__file = "src/components/checkbox/Checkbox.vue";

exports.script = script;
