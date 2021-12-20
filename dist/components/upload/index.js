/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Upload = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var config = {
      defaultContainerElement: null,
      defaultIconPack: 'mdi',
      defaultIconComponent: null,
      defaultIconPrev: 'chevron-left',
      defaultIconNext: 'chevron-right',
      defaultLocale: undefined,
      defaultDialogConfirmText: null,
      defaultDialogCancelText: null,
      defaultSnackbarDuration: 3500,
      defaultSnackbarPosition: null,
      defaultToastDuration: 2000,
      defaultToastPosition: null,
      defaultNotificationDuration: 2000,
      defaultNotificationPosition: null,
      defaultTooltipType: 'is-primary',
      defaultTooltipDelay: null,
      defaultInputAutocomplete: 'on',
      defaultDateFormatter: null,
      defaultDateParser: null,
      defaultDateCreator: null,
      defaultTimeCreator: null,
      defaultDayNames: null,
      defaultMonthNames: null,
      defaultFirstDayOfWeek: null,
      defaultUnselectableDaysOfWeek: null,
      defaultTimeFormatter: null,
      defaultTimeParser: null,
      defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
      defaultModalScroll: null,
      defaultDatepickerMobileNative: true,
      defaultTimepickerMobileNative: true,
      defaultNoticeQueue: true,
      defaultInputHasCounter: true,
      defaultTaginputHasCounter: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultFieldLabelPosition: null,
      defaultDatepickerYearsRange: [-100, 10],
      defaultDatepickerNearbyMonthDays: true,
      defaultDatepickerNearbySelectableMonthDays: false,
      defaultDatepickerShowWeekNumber: false,
      defaultDatepickerWeekNumberClickable: false,
      defaultDatepickerMobileModal: true,
      defaultTrapFocus: true,
      defaultAutoFocus: true,
      defaultButtonRounded: false,
      defaultSwitchRounded: true,
      defaultCarouselInterval: 3500,
      defaultTabsExpanded: false,
      defaultTabsAnimated: true,
      defaultTabsType: null,
      defaultStatusIcon: true,
      defaultProgrammaticPromise: false,
      defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
      defaultImageWebpFallback: null,
      defaultImageLazy: true,
      defaultImageResponsive: true,
      defaultImageRatio: null,
      defaultImageSrcsetFormatter: null,
      customIconPacks: null
    };

    var FormElementMixin = {
      props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        icon: String,
        iconPack: String,
        // Native options to use in HTML5 validation
        autocomplete: String,
        maxlength: [Number, String],
        useHtml5Validation: {
          type: Boolean,
          default: function _default() {
            return config.defaultUseHtml5Validation;
          }
        },
        validationMessage: String,
        locale: {
          type: [String, Array],
          default: function _default() {
            return config.defaultLocale;
          }
        },
        statusIcon: {
          type: Boolean,
          default: function _default() {
            return config.defaultStatusIcon;
          }
        }
      },
      emits: ['blur', 'focus'],
      data: function data() {
        return {
          isValid: true,
          isFocused: false,
          newIconPack: this.iconPack || config.defaultIconPack
        };
      },
      computed: {
        /**
         * Find parent Field, max 3 levels deep.
         */
        parentField: function parentField() {
          var parent = this.$parent;

          for (var i = 0; i < 3; i++) {
            if (parent && !parent.$data._isField) {
              parent = parent.$parent;
            }
          }

          return parent;
        },

        /**
         * Get the type prop from parent if it's a Field.
         */
        statusType: function statusType() {
          var _ref = this.parentField || {},
              newType = _ref.newType;

          if (!newType) return;

          if (typeof newType === 'string') {
            return newType;
          } else {
            for (var key in newType) {
              if (newType[key]) {
                return key;
              }
            }
          }
        },

        /**
         * Get the message prop from parent if it's a Field.
         */
        statusMessage: function statusMessage() {
          if (!this.parentField) return;
          return this.parentField.newMessage || this.parentField.$slots.message;
        },

        /**
         * Fix icon size for inputs, large was too big
         */
        iconSize: function iconSize() {
          switch (this.size) {
            case 'is-small':
              return this.size;

            case 'is-medium':
              return;

            case 'is-large':
              return this.newIconPack === 'mdi' ? 'is-medium' : '';
          }
        }
      },
      methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus: function focus() {
          var el = this.getElement();
          if (el === undefined) return;
          this.$nextTick(function () {
            if (el) el.focus();
          });
        },
        onBlur: function onBlur($event) {
          this.isFocused = false;
          this.$emit('blur', $event);
          this.checkHtml5Validity();
        },
        onFocus: function onFocus($event) {
          this.isFocused = true;
          this.$emit('focus', $event);
        },
        getElement: function getElement() {
          var el = this.$refs[this.$data._elementRef];

          while (el != null && '$refs' in el) {
            el = el.$refs[el.$data._elementRef];
          }

          return el;
        },
        setInvalid: function setInvalid() {
          var type = 'is-danger';
          var message = this.validationMessage || this.getElement().validationMessage;
          this.setValidity(type, message);
        },
        setValidity: function setValidity(type, message) {
          var _this = this;

          this.$nextTick(function () {
            if (_this.parentField) {
              // Set type only if not defined
              if (!_this.parentField.type) {
                _this.parentField.newType = type;
              } // Set message only if not defined


              if (!_this.parentField.message) {
                _this.parentField.newMessage = message;
              }
            }
          });
        },

        /**
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity: function checkHtml5Validity() {
          if (!this.useHtml5Validation) return;
          var el = this.getElement();
          if (el == null) return;

          if (!el.checkValidity()) {
            this.setInvalid();
            this.isValid = false;
          } else {
            this.setValidity(null, null);
            this.isValid = true;
          }

          return this.isValid;
        }
      }
    };

    // Polyfills for SSR
    var isSSR = typeof window === 'undefined';
    var File = isSSR ? Object : window.File;

    var script = {
        name: 'BUpload',
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            modelValue: {
                type: [Object, Function, File, Array]
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
        registerComponent(Vue, script);
      }
    };
    use(Plugin);

    exports.BUpload = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
