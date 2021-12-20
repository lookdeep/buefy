'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Checkbox = require('./Checkbox-c83a3715.js');
var CheckRadioMixin = require('./CheckRadioMixin-6055e755.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');

var script = {
    name: 'BCheckboxButton',
    mixins: [CheckRadioMixin.CheckRadioMixin],
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
        checked() {
            if (Array.isArray(this.newValue)) {
                return this.newValue.indexOf(this.nativeValue) >= 0
            }
            return this.newValue === this.nativeValue
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", {
    class: ["control", { 'is-expanded': $props.expanded }]
  }, [
    vue.createVNode("label", {
      class: ["b-checkbox checkbox button", [$options.checked ? $props.type : null, _ctx.size, {
                'is-disabled': _ctx.disabled,
                'is-focused': $data.isFocused
            }]],
      ref: "label",
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.focus && _ctx.focus(...args))),
      onKeydown: _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.withDirectives(vue.createVNode("input", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
        type: "checkbox",
        ref: "input",
        onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"])),
        disabled: _ctx.disabledOrUndefined,
        required: _ctx.requiredOrUndefined,
        name: _ctx.name,
        value: _ctx.nativeValue,
        onFocus: _cache[3] || (_cache[3] = $event => ($data.isFocused = true)),
        onBlur: _cache[4] || (_cache[4] = $event => ($data.isFocused = false))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "required", "name", "value"]), [
        [vue.vModelCheckbox, _ctx.computedValue]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/checkbox/CheckboxButton.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Checkbox.script);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BCheckbox = Checkbox.script;
exports.BCheckboxButton = script;
exports["default"] = Plugin;
