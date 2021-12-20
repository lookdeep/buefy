/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Radio = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var CheckRadioMixin = {
      props: {
        modelValue: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
      },
      emits: ['update:modelValue'],
      data: function data() {
        return {
          newValue: this.modelValue
        };
      },
      computed: {
        computedValue: {
          get: function get() {
            return this.newValue;
          },
          set: function set(value) {
            this.newValue = value;
            this.$emit('update:modelValue', value);
          }
        },
        disabledOrUndefined: function disabledOrUndefined() {
          // On Vue 3, setting a boolean attribute `false` does not remove it.
          // To remove it, `null` or `undefined` has to be given.
          // Setting `false` ends up with a grayed out component.
          return this.disabled || undefined;
        },
        requiredOrUndefined: function requiredOrUndefined() {
          // On Vue 3, setting a boolean attribute `false` does not remove it,
          // `null` or `undefined` has to be given to remove it.
          return this.required || undefined;
        }
      },
      watch: {
        /**
        * When v-model change, set internal value.
        */
        modelValue: function modelValue(value) {
          this.newValue = value;
        }
      },
      methods: {
        focus: function focus() {
          // MacOS FireFox and Safari do not focus when clicked
          this.$refs.input.focus();
        }
      }
    };

    var script$1 = {
        name: 'BRadio',
        mixins: [CheckRadioMixin]
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

    var use = function use(plugin) {
      if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
      }
    };
    var registerComponent = function registerComponent(Vue, component) {
      Vue.component(component.name, component);
    };

    var Plugin = {
      install: function install(Vue) {
        registerComponent(Vue, script$1);
        registerComponent(Vue, script);
      }
    };
    use(Plugin);

    exports.BRadio = script$1;
    exports.BRadioButton = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
