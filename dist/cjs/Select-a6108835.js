'use strict';

var Icon = require('./Icon-dc7b693f.js');
var FormElementMixin = require('./FormElementMixin-1ac87810.js');
var vue = require('vue');

var script = {
    name: 'BSelect',
    components: {
        [Icon.script.name]: Icon.script
    },
    mixins: [FormElementMixin.FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array, Function, Date],
            default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
    },
    emits: ['blur', 'focus', 'update:modelValue'],
    data() {
        return {
            selected: this.modelValue,
            _elementRef: 'select'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.selected
            },
            set(value) {
                this.selected = value;
                this.$emit('update:modelValue', value);
                !this.isValid && this.checkHtml5Validity();
            }
        },
        spanClasses() {
            return [this.size, this.statusType, {
                'is-fullwidth': this.expanded,
                'is-loading': this.loading,
                'is-multiple': this.multiple,
                'is-rounded': this.rounded,
                'is-empty': this.selected === null
            }]
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
            this.selected = value;
            !this.isValid && this.checkHtml5Validity();
        }
    }
};

const _hoisted_1 = {
  key: 0,
  value: null,
  disabled: "",
  hidden: ""
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["control", { 'is-expanded': _ctx.expanded, 'has-icons-left': _ctx.icon }]
  }, [
    vue.createVNode("span", {
      class: ["select", $options.spanClasses]
    }, [
      vue.withDirectives(vue.createVNode("select", vue.mergeProps({
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
        ref: "select",
        multiple: $props.multiple,
        size: $props.nativeSize
      }, _ctx.$attrs, {
        onBlur: _cache[2] || (_cache[2] = $event => (_ctx.$emit('blur', $event) && _ctx.checkHtml5Validity())),
        onFocus: _cache[3] || (_cache[3] = $event => (_ctx.$emit('focus', $event)))
      }), [
        ($props.placeholder)
          ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
              ($options.computedValue == null)
                ? (vue.openBlock(), vue.createBlock("option", _hoisted_1, vue.toDisplayString($props.placeholder), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true)
            ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
          : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default")
      ], 16 /* FULL_PROPS */, ["multiple", "size"]), [
        [vue.vModelSelect, $options.computedValue]
      ])
    ], 2 /* CLASS */),
    (_ctx.icon)
      ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
          key: 0,
          class: "is-left",
          icon: _ctx.icon,
          pack: _ctx.iconPack,
          size: _ctx.iconSize
        }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/select/Select.vue";

exports.script = script;
