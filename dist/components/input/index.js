/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Input = {}, global.Vue));
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

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    /**
     * Merge function to replace Object.assign with deep merging possibility
     */

    var isObject = function isObject(item) {
      return _typeof(item) === 'object' && !Array.isArray(item);
    };

    var mergeFn = function mergeFn(target, source) {
      var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (deep || !Object.assign) {
        var isDeep = function isDeep(prop) {
          return isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);
        };

        var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
          return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
        }).reduce(function (a, b) {
          return _objectSpread(_objectSpread({}, a), b);
        }, {});
        return _objectSpread(_objectSpread({}, target), replaced);
      } else {
        return Object.assign(target, source);
      }
    };

    var merge = mergeFn;

    var mdiIcons = {
      sizes: {
        default: 'mdi-24px',
        'is-small': null,
        'is-medium': 'mdi-36px',
        'is-large': 'mdi-48px'
      },
      iconPrefix: 'mdi-'
    };

    var faIcons = function faIcons() {
      var faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-';
      return {
        sizes: {
          default: null,
          'is-small': null,
          'is-medium': faIconPrefix + 'lg',
          'is-large': faIconPrefix + '2x'
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
          information: 'info-circle',
          alert: 'exclamation-triangle',
          'alert-circle': 'exclamation-circle',
          'chevron-right': 'angle-right',
          'chevron-left': 'angle-left',
          'chevron-down': 'angle-down',
          'eye-off': 'eye-slash',
          'menu-down': 'caret-down',
          'menu-up': 'caret-up',
          'close-circle': 'times-circle'
        }
      };
    };

    var getIcons = function getIcons() {
      var icons = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons()
      };

      if (config && config.customIconPacks) {
        icons = merge(icons, config.customIconPacks, true);
      }

      return icons;
    };

    var getIcons$1 = getIcons;

    var script$1 = {
        name: 'BIcon',
        props: {
            type: [String, Object],
            component: String,
            pack: String,
            icon: String,
            size: String,
            customSize: String,
            customClass: String,
            both: Boolean // This is used internally to show both MDI and FA icon
        },
        computed: {
            iconConfig() {
                const allIcons = getIcons$1();
                return allIcons[this.newPack]
            },
            iconPrefix() {
                if (this.iconConfig && this.iconConfig.iconPrefix) {
                    return this.iconConfig.iconPrefix
                }
                return ''
            },
            /**
            * Internal icon name based on the pack.
            * If pack is 'fa', gets the equivalent FA icon name of the MDI,
            * internal icons are always MDI.
            */
            newIcon() {
                return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
            },
            newPack() {
                return this.pack || config.defaultIconPack
            },
            newType() {
                if (!this.type) return

                let splitType = [];
                if (typeof this.type === 'string') {
                    splitType = this.type.split('-');
                } else {
                    for (const key in this.type) {
                        if (this.type[key]) {
                            splitType = key.split('-');
                            break
                        }
                    }
                }
                if (splitType.length <= 1) return

                const [, ...type] = splitType;
                return `has-text-${type.join('-')}`
            },
            newCustomSize() {
                return this.customSize || this.customSizeByPack
            },
            customSizeByPack() {
                if (this.iconConfig && this.iconConfig.sizes) {
                    if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
                        return this.iconConfig.sizes[this.size]
                    } else if (this.iconConfig.sizes.default) {
                        return this.iconConfig.sizes.default
                    }
                }
                return null
            },
            useIconComponent() {
                return this.component || config.defaultIconComponent
            }
        },
        methods: {
            /**
            * Equivalent icon name of the MDI.
            */
            getEquivalentIconOf(value) {
                // Only transform the class if the both prop is set to true
                if (!this.both) {
                    return value
                }

                if (this.iconConfig &&
                    this.iconConfig.internalIcons &&
                    this.iconConfig.internalIcons[value]) {
                    return this.iconConfig.internalIcons[value]
                }
                return value
            }
        }
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("span", {
        class: ["icon", [$options.newType, $props.size]]
      }, [
        (!$options.useIconComponent)
          ? (vue.openBlock(), vue.createBlock("i", {
              key: 0,
              class: [$options.newPack, $options.newIcon, $options.newCustomSize, $props.customClass]
            }, null, 2 /* CLASS */))
          : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.useIconComponent), {
              key: 1,
              icon: [$options.newPack, $options.newIcon],
              size: $options.newCustomSize,
              class: [$props.customClass]
            }, null, 8 /* PROPS */, ["icon", "size", "class"]))
      ], 2 /* CLASS */))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/icon/Icon.vue";

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

    var script = {
        name: 'BInput',
        components: {
            [script$1.name]: script$1
        },
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            modelValue: [Number, String],
            type: {
                type: String,
                default: 'text'
            },
            lazy: {
                type: Boolean,
                default: false
            },
            passwordReveal: Boolean,
            iconClickable: Boolean,
            hasCounter: {
                type: Boolean,
                default: () => config.defaultInputHasCounter
            },
            customClass: {
                type: String,
                default: ''
            },
            iconRight: String,
            iconRightClickable: Boolean,
            iconRightType: String
        },
        emits: [
            'icon-click',
            'icon-right-click',
            'update:modelValue'
        ],
        data() {
            return {
                newValue: this.modelValue,
                newType: this.type,
                newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
                isPasswordVisible: false,
                _elementRef: this.type === 'textarea'
                    ? 'textarea'
                    : 'input'
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
            rootClasses() {
                return [
                    this.iconPosition,
                    this.size,
                    {
                        'is-expanded': this.expanded,
                        'is-loading': this.loading,
                        'is-clearfix': !this.hasMessage
                    }
                ]
            },
            inputClasses() {
                return [
                    this.statusType,
                    this.size,
                    { 'is-rounded': this.rounded }
                ]
            },
            hasIconRight() {
                return this.passwordReveal ||
                    this.loading || (this.statusIcon && this.statusTypeIcon) || this.iconRight
            },
            rightIcon() {
                if (this.passwordReveal) {
                    return this.passwordVisibleIcon
                } else if (this.iconRight) {
                    return this.iconRight
                }
                return this.statusTypeIcon
            },
            rightIconType() {
                if (this.passwordReveal) {
                    return 'is-primary'
                } else if (this.iconRight) {
                    return this.iconRightType || null
                }
                return this.statusType
            },

            /**
            * Position of the icon or if it's both sides.
            */
            iconPosition() {
                let iconClasses = '';

                if (this.icon) {
                    iconClasses += 'has-icons-left ';
                }

                if (this.hasIconRight) {
                    iconClasses += 'has-icons-right';
                }

                return iconClasses
            },

            /**
            * Icon name (MDI) based on the type.
            */
            statusTypeIcon() {
                switch (this.statusType) {
                    case 'is-success': return 'check'
                    case 'is-danger': return 'alert-circle'
                    case 'is-info': return 'information'
                    case 'is-warning': return 'alert'
                    default: return undefined
                }
            },

            /**
            * Check if have any message prop from parent if it's a Field.
            */
            hasMessage() {
                return !!this.statusMessage
            },

            /**
            * Current password-reveal icon name.
            */
            passwordVisibleIcon() {
                return !this.isPasswordVisible ? 'eye' : 'eye-off'
            },
            /**
            * Get value length
            */
            valueLength() {
                if (typeof this.computedValue === 'string') {
                    return this.computedValue.length
                } else if (typeof this.computedValue === 'number') {
                    return this.computedValue.toString().length
                }
                return 0
            }
        },
        watch: {
            /**
            * When v-model is changed:
            *   1. Set internal value.
            */
            modelValue(value) {
                this.newValue = value;
            }
        },
        methods: {
            /**
            * Toggle the visibility of a password-reveal input
            * by changing the type and focus the input right away.
            */
            togglePasswordVisibility() {
                this.isPasswordVisible = !this.isPasswordVisible;
                this.newType = this.isPasswordVisible ? 'text' : 'password';

                this.$nextTick(() => {
                    this.focus();
                });
            },

            iconClick(emit, event) {
                this.$emit(emit, event);
                this.$nextTick(() => {
                    this.focus();
                });
            },

            rightIconClick(event) {
                if (this.passwordReveal) {
                    this.togglePasswordVisibility();
                } else if (this.iconRightClickable) {
                    this.iconClick('icon-right-click', event);
                }
            },

            onInput(event) {
                if (!this.lazy) {
                    const value = event.target.value;
                    this.updateValue(value);
                }
            },

            onChange(event) {
                if (this.lazy) {
                    const value = event.target.value;
                    this.updateValue(value);
                }
            },

            updateValue(value) {
                this.computedValue = value;
                !this.isValid && this.checkHtml5Validity();
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["control", $options.rootClasses]
      }, [
        ($props.type !== 'textarea')
          ? (vue.openBlock(), vue.createBlock("input", vue.mergeProps({
              key: 0,
              ref: "input",
              class: ["input", [$options.inputClasses, $props.customClass]],
              type: $data.newType,
              autocomplete: $data.newAutocomplete,
              maxlength: _ctx.maxlength,
              value: $options.computedValue
            }, _ctx.$attrs, {
              onInput: _cache[1] || (_cache[1] = (...args) => ($options.onInput && $options.onInput(...args))),
              onChange: _cache[2] || (_cache[2] = (...args) => ($options.onChange && $options.onChange(...args))),
              onBlur: _cache[3] || (_cache[3] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
              onFocus: _cache[4] || (_cache[4] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args)))
            }), null, 16 /* FULL_PROPS */, ["type", "autocomplete", "maxlength", "value"]))
          : (vue.openBlock(), vue.createBlock("textarea", vue.mergeProps({
              key: 1,
              ref: "textarea",
              class: ["textarea", [$options.inputClasses, $props.customClass]],
              maxlength: _ctx.maxlength,
              value: $options.computedValue
            }, _ctx.$attrs, {
              onInput: _cache[5] || (_cache[5] = (...args) => ($options.onInput && $options.onInput(...args))),
              onChange: _cache[6] || (_cache[6] = (...args) => ($options.onChange && $options.onChange(...args))),
              onBlur: _cache[7] || (_cache[7] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
              onFocus: _cache[8] || (_cache[8] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args)))
            }), null, 16 /* FULL_PROPS */, ["maxlength", "value"])),
        (_ctx.icon)
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 2,
              class: ["is-left", {'is-clickable': $props.iconClickable}],
              icon: _ctx.icon,
              pack: _ctx.iconPack,
              size: _ctx.iconSize,
              onClick: _cache[9] || (_cache[9] = $event => ($options.iconClick('icon-click', $event)))
            }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"]))
          : vue.createCommentVNode("v-if", true),
        (!_ctx.loading && $options.hasIconRight)
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 3,
              class: ["is-right", { 'is-clickable': $props.passwordReveal || $props.iconRightClickable }],
              icon: $options.rightIcon,
              pack: _ctx.iconPack,
              size: _ctx.iconSize,
              type: $options.rightIconType,
              both: "",
              onClick: $options.rightIconClick
            }, null, 8 /* PROPS */, ["class", "icon", "pack", "size", "type", "onClick"]))
          : vue.createCommentVNode("v-if", true),
        (_ctx.maxlength && $props.hasCounter && $props.type !== 'number')
          ? (vue.openBlock(), vue.createBlock("small", {
              key: 4,
              class: ["help counter", { 'is-invisible': !_ctx.isFocused }]
            }, vue.toDisplayString($options.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength), 3 /* TEXT, CLASS */))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    }

    script.render = render;
    script.__file = "src/components/input/Input.vue";

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

    exports.BInput = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));