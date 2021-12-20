'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CheckRadioMixin = require('./CheckRadioMixin-6055e755.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');

var script$1 = {
    name: 'BRadio',
    mixins: [CheckRadioMixin.CheckRadioMixin]
};

const _hoisted_1 = { class: "control-label" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("label", {
    class: ["b-radio radio", [_ctx.size, { 'is-disabled': _ctx.disabled }]],
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.focus && _ctx.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
  }, [
    vue.withDirectives(vue.createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
      type: "radio",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 8 /* PROPS */, ["disabled", "required", "name", "value"]), [
      [vue.vModelRadio, _ctx.computedValue]
    ]),
    vue.createVNode("span", {
      class: ["check", _ctx.type]
    }, null, 2 /* CLASS */),
    vue.createVNode("span", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script$1.render = render$1;
script$1.__file = "src/components/radio/Radio.vue";

var script = {
    name: 'BRadioButton',
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
  return (vue.openBlock(), vue.createBlock("div", {
    class: ["control", { 'is-expanded': $props.expanded }]
  }, [
    vue.createVNode("label", {
      class: ["b-radio radio button", $options.labelClass],
      ref: "label",
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.focus && _ctx.focus(...args))),
      onKeydown: _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.withDirectives(vue.createVNode("input", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
        type: "radio",
        ref: "input",
        onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"])),
        disabled: _ctx.disabledOrUndefined,
        required: _ctx.requiredOrUndefined,
        name: _ctx.name,
        value: _ctx.nativeValue,
        onFocus: _cache[3] || (_cache[3] = $event => ($data.isFocused = true)),
        onBlur: _cache[4] || (_cache[4] = $event => ($data.isFocused = false))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "required", "name", "value"]), [
        [vue.vModelRadio, _ctx.computedValue]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/radio/RadioButton.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script$1);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BRadio = script$1;
exports.BRadioButton = script;
exports["default"] = Plugin;
