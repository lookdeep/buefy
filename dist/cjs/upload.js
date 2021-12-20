'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var FormElementMixin = require('./FormElementMixin-1ac87810.js');
var ssr = require('./ssr-95fd856b.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./config-2c63be1d.js');

var script = {
    name: 'BUpload',
    mixins: [FormElementMixin.FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [Object, Function, ssr.File, Array]
        },
        multiple: Boolean,
        disabled: Boolean,
        accept: String,
        dragDrop: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        native: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        }
    },
    emits: ['invalid', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            dragDropFocus: false,
            _elementRef: 'input'
        }
    },
    computed: {
        classAndStyle() {
            return {
                class: this.$attrs.class,
                style: this.$attrs.style
            }
        },
        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `true` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
         *   When v-model is changed:
         *   1. Set internal value.
         *   2. Reset interna input file value
         *   3. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value;
            if (!value || (Array.isArray(value) && value.length === 0)) {
                this.$refs.input.value = null;
            }
            !this.isValid && !this.dragDrop && this.checkHtml5Validity();
        }
    },
    methods: {
        /**
        * Listen change event on input type 'file',
        * emit 'input' event and validate
        */
        onFileChange(event) {
            if (this.disabled || this.loading) return
            if (this.dragDrop) this.updateDragDropFocus(false);
            const value = event.target.files || event.dataTransfer.files;
            if (value.length === 0) {
                if (!this.newValue) return
                if (this.native) this.newValue = null;
            } else if (!this.multiple) {
                // only one element in case drag drop mode and isn't multiple
                if (this.dragDrop && value.length !== 1) return
                else {
                    const file = value[0];
                    if (this.checkType(file)) this.newValue = file;
                    else if (this.newValue) this.newValue = null;
                    else return
                }
            } else {
                // always new values if native or undefined local
                let newValues = false;
                if (this.native || !this.newValue) {
                    this.newValue = [];
                    newValues = true;
                }
                for (let i = 0; i < value.length; i++) {
                    const file = value[i];
                    if (this.checkType(file)) {
                        this.newValue.push(file);
                        newValues = true;
                    }
                }
                if (!newValues) return
            }
            this.$emit('update:modelValue', this.newValue);
            !this.dragDrop && this.checkHtml5Validity();
        },

        /**
        * Listen drag-drop to update internal variable
        */
        updateDragDropFocus(focus) {
            if (!this.disabled && !this.loading) {
                this.dragDropFocus = focus;
            }
        },

        /**
        * Check mime type of file
        */
        checkType(file) {
            if (!this.accept) return true
            const types = this.accept.split(',');
            if (types.length === 0) return true
            let valid = false;
            for (let i = 0; i < types.length && !valid; i++) {
                const type = types[i].trim();
                if (type) {
                    if (type.substring(0, 1) === '.') {
                        // check extension
                        const extIndex = file.name.lastIndexOf('.');
                        const extension = extIndex >= 0
                            ? file.name.substring(extIndex)
                            : '';
                        if (extension.toLowerCase() === type.toLowerCase()) {
                            valid = true;
                        }
                    } else {
                        // check mime type
                        if (file.type.match(type)) {
                            valid = true;
                        }
                    }
                }
            }
            if (!valid) this.$emit('invalid');
            return valid
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("label", vue.mergeProps({ class: "upload control" }, $options.classAndStyle, {
    class: [{'is-expanded' : $props.expanded, 'is-rounded' : $props.rounded}]
  }), [
    (!$props.dragDrop)
      ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
      : (vue.openBlock(), vue.createBlock("div", {
          key: 1,
          class: ["upload-draggable", [$props.type, {
                'is-loading': _ctx.loading,
                'is-disabled': $props.disabled,
                'is-hovered': $data.dragDropFocus,
                'is-expanded': $props.expanded,
            }]],
          onDragover: _cache[1] || (_cache[1] = vue.withModifiers($event => ($options.updateDragDropFocus(true)), ["prevent"])),
          onDragleave: _cache[2] || (_cache[2] = vue.withModifiers($event => ($options.updateDragDropFocus(false)), ["prevent"])),
          onDragenter: _cache[3] || (_cache[3] = vue.withModifiers($event => ($options.updateDragDropFocus(true)), ["prevent"])),
          onDrop: _cache[4] || (_cache[4] = vue.withModifiers((...args) => ($options.onFileChange && $options.onFileChange(...args)), ["prevent"]))
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 34 /* CLASS, HYDRATE_EVENTS */)),
    vue.createVNode("input", vue.mergeProps({
      ref: "input",
      type: "file"
    }, _ctx.$attrs, {
      multiple: $props.multiple,
      accept: $props.accept,
      disabled: $options.disabledOrUndefined,
      onChange: _cache[5] || (_cache[5] = (...args) => ($options.onFileChange && $options.onFileChange(...args)))
    }), null, 16 /* FULL_PROPS */, ["multiple", "accept", "disabled"])
  ], 16 /* FULL_PROPS */))
}

script.render = render;
script.__file = "src/components/upload/Upload.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BUpload = script;
exports["default"] = Plugin;
