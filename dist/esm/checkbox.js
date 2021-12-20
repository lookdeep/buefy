import { s as script$1 } from './Checkbox-a8233508.js';
export { s as BCheckbox } from './Checkbox-a8233508.js';
import { C as CheckRadioMixin } from './CheckRadioMixin-43df7c28.js';
import { openBlock, createBlock, createVNode, withKeys, withModifiers, renderSlot, withDirectives, vModelCheckbox } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';

var script = {
    name: 'BCheckboxButton',
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
        checked() {
            if (Array.isArray(this.newValue)) {
                return this.newValue.indexOf(this.nativeValue) >= 0
            }
            return this.newValue === this.nativeValue
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["control", { 'is-expanded': $props.expanded }]
  }, [
    createVNode("label", {
      class: ["b-checkbox checkbox button", [$options.checked ? $props.type : null, _ctx.size, {
                'is-disabled': _ctx.disabled,
                'is-focused': $data.isFocused
            }]],
      ref: "label",
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.focus && _ctx.focus(...args))),
      onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
    }, [
      renderSlot(_ctx.$slots, "default"),
      withDirectives(createVNode("input", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
        type: "checkbox",
        ref: "input",
        onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
        disabled: _ctx.disabledOrUndefined,
        required: _ctx.requiredOrUndefined,
        name: _ctx.name,
        value: _ctx.nativeValue,
        onFocus: _cache[3] || (_cache[3] = $event => ($data.isFocused = true)),
        onBlur: _cache[4] || (_cache[4] = $event => ($data.isFocused = false))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "required", "name", "value"]), [
        [vModelCheckbox, _ctx.computedValue]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/checkbox/CheckboxButton.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script$1);
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BCheckboxButton, Plugin as default };
