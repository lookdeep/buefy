/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Taginput = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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
   * Get value of an object property/path even if it's nested
   */

  function getValueByPath(obj, path) {
    return path.split('.').reduce(function (o, i) {
      return o ? o[i] : null;
    }, obj);
  }
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
  function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
      el.remove();
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }
  function createAbsoluteElement(el) {
    var root = document.createElement('div');
    root.style.position = 'absolute';
    root.style.left = '0px';
    root.style.top = '0px';
    root.style.width = '100%';
    var wrapper = document.createElement('div');
    root.appendChild(wrapper);
    wrapper.appendChild(el);
    document.body.appendChild(root);
    return root;
  }
  function toCssWidth(width) {
    return width === undefined ? null : isNaN(width) ? width : width + 'px';
  }
  function isCustomElement(vm) {
    return 'shadowRoot' in vm.$root.$options;
  }

  var script$4 = {
      name: 'BTag',
      props: {
          attached: Boolean,
          closable: Boolean,
          type: String,
          size: String,
          rounded: Boolean,
          disabled: Boolean,
          ellipsis: Boolean,
          tabstop: {
              type: Boolean,
              default: true
          },
          ariaCloseLabel: String,
          closeType: String,
          closeIcon: String,
          closeIconPack: String,
          closeIconType: String
      },
      emits: ['close'],
      computed: {
          // setting a boolean attribute `false` does not remove it on Vue 3.
          // `null` or `undefined` has to be given to remove it.
          disabledOrUndefined() {
              return this.disabled || undefined
          }
      },
      methods: {
          /**
          * Emit close event when delete button is clicked
          * or delete key is pressed.
          */
          close(event) {
              if (this.disabled) return

              this.$emit('close', event);
          }
      }
  };

  const _hoisted_1$2 = {
    key: 0,
    class: "tags has-addons"
  };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_icon = vue.resolveComponent("b-icon");

    return ($props.attached && $props.closable)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$2, [
          vue.createVNode("span", {
            class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
          }, [
            vue.createVNode("span", {
              class: { 'has-ellipsis': $props.ellipsis }
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 2 /* CLASS */)
          ], 2 /* CLASS */),
          vue.createVNode("a", {
            class: ["tag", [$props.size,
                       $props.closeType,
                       {'is-rounded': $props.rounded},
                       $props.closeIcon ? 'has-delete-icon' : 'is-delete']],
            role: "button",
            "aria-label": $props.ariaCloseLabel,
            tabindex: $props.tabstop ? 0 : false,
            disabled: $options.disabledOrUndefined,
            onClick: _cache[1] || (_cache[1] = (...args) => ($options.close && $options.close(...args))),
            onKeyup: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
          }, [
            ($props.closeIcon)
              ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                  key: 0,
                  "custom-class": "",
                  icon: $props.closeIcon,
                  size: $props.size,
                  type: $props.closeIconType,
                  pack: $props.closeIconPack
                }, null, 8 /* PROPS */, ["icon", "size", "type", "pack"]))
              : vue.createCommentVNode("v-if", true)
          ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "tabindex", "disabled"])
        ]))
      : (vue.openBlock(), vue.createBlock("span", {
          key: 1,
          class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
        }, [
          vue.createVNode("span", {
            class: { 'has-ellipsis': $props.ellipsis }
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */),
          ($props.closable)
            ? (vue.openBlock(), vue.createBlock("a", {
                key: 0,
                role: "button",
                "aria-label": $props.ariaCloseLabel,
                class: ["delete is-small", $props.closeType],
                disabled: $options.disabledOrUndefined,
                tabindex: $props.tabstop ? 0 : false,
                onClick: _cache[3] || (_cache[3] = (...args) => ($options.close && $options.close(...args))),
                onKeyup: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
              }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "disabled", "tabindex"]))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
  }

  script$4.render = render$4;
  script$4.__file = "src/components/tag/Tag.vue";

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

  var script$3 = {
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

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
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

  script$3.render = render$3;
  script$3.__file = "src/components/icon/Icon.vue";

  var script$2 = {
      name: 'BInput',
      components: {
          [script$3.name]: script$3
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

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
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

  script$2.render = render$2;
  script$2.__file = "src/components/input/Input.vue";

  var script$1 = {
      name: 'BAutocomplete',
      components: {
          [script$2.name]: script$2
      },
      mixins: [FormElementMixin],
      inheritAttrs: false,
      props: {
          modelValue: [Number, String],
          data: {
              type: Array,
              default: () => []
          },
          field: {
              type: String,
              default: 'value'
          },
          keepFirst: Boolean,
          clearOnSelect: Boolean,
          openOnFocus: Boolean,
          customFormatter: Function,
          checkInfiniteScroll: Boolean,
          keepOpen: Boolean,
          clearable: Boolean,
          maxHeight: [String, Number],
          dropdownPosition: {
              type: String,
              default: 'auto'
          },
          groupField: String,
          groupOptions: String,
          iconRight: String,
          iconRightClickable: Boolean,
          appendToBody: Boolean,
          confirmKeys: {
              type: Array,
              default: () => ['Tab', 'Enter']
          }
      },
      emits: [
          'blur',
          'focus',
          'icon-click',
          'icon-right-click',
          'infinite-scroll',
          'select',
          'typing',
          'update:modelValue'
      ],
      data() {
          return {
              selected: null,
              hovered: null,
              isActive: false,
              newValue: this.modelValue,
              newAutocomplete: this.autocomplete || 'off',
              isListInViewportVertically: true,
              hasFocus: false,
              style: {},
              _isAutocomplete: true,
              _elementRef: 'input',
              _bodyEl: undefined // Used to append to body
          }
      },
      computed: {
          computedData() {
              if (this.groupField) {
                  if (this.groupOptions) {
                      const newData = [];
                      this.data.forEach((option) => {
                          const group = getValueByPath(option, this.groupField);
                          const items = getValueByPath(option, this.groupOptions);
                          newData.push({ group, items });
                      });
                      return newData
                  } else {
                      const tmp = {};
                      this.data.forEach((option) => {
                          const group = getValueByPath(option, this.groupField);
                          if (!tmp[group]) tmp[group] = [];
                          tmp[group].push(option);
                      });
                      const newData = [];
                      Object.keys(tmp).forEach((group) => {
                          newData.push({ group, items: tmp[group] });
                      });
                      return newData
                  }
              }
              return [{ items: this.data }]
          },
          isEmpty() {
              if (!this.computedData) return true
              return !this.computedData.some((element) => element.items && element.items.length)
          },
          /**
           * White-listed items to not close when clicked.
           * Add input, dropdown and all children.
           */
          whiteList() {
              const whiteList = [];
              whiteList.push(this.$refs.input.$el.querySelector('input'));
              whiteList.push(this.$refs.dropdown);
              // Add all children from dropdown
              if (this.$refs.dropdown != null) {
                  const children = this.$refs.dropdown.querySelectorAll('*');
                  for (const child of children) {
                      whiteList.push(child);
                  }
              }
              if (this.$parent.$data._isTaginput) {
                  // Add taginput container
                  whiteList.push(this.$parent.$el);
                  // Add .tag and .delete
                  const tagInputChildren = this.$parent.$el.querySelectorAll('*');
                  for (const tagInputChild of tagInputChildren) {
                      whiteList.push(tagInputChild);
                  }
              }

              return whiteList
          },

          /**
           * Check if exists default slot
           */
          hasDefaultSlot() {
              return !!this.$slots.default
          },

          /**
           * Check if exists group slot
           */
          hasGroupSlot() {
              return !!this.$slots.group
          },

          /**
           * Check if exists "empty" slot
           */
          hasEmptySlot() {
              return !!this.$slots.empty
          },

          /**
           * Check if exists "header" slot
           */
          hasHeaderSlot() {
              return !!this.$slots.header
          },

          /**
           * Check if exists "footer" slot
           */
          hasFooterSlot() {
              return !!this.$slots.footer
          },

          /**
           * Apply dropdownPosition property
           */
          isOpenedTop() {
              return (
                  this.dropdownPosition === 'top' ||
                      (this.dropdownPosition === 'auto' && !this.isListInViewportVertically)
              )
          },

          newIconRight() {
              if (this.clearable && this.newValue) {
                  return 'close-circle'
              }
              return this.iconRight
          },

          newIconRightClickable() {
              if (this.clearable) {
                  return true
              }
              return this.iconRightClickable
          },

          contentStyle() {
              return {
                  maxHeight: toCssWidth(this.maxHeight)
              }
          }
      },
      watch: {
          /**
           * When dropdown is toggled, check the visibility to know when
           * to open upwards.
           */
          isActive(active) {
              if (this.dropdownPosition === 'auto') {
                  if (active) {
                      this.calcDropdownInViewportVertical();
                  } else {
                      // Timeout to wait for the animation to finish before recalculating
                      setTimeout(() => {
                          this.calcDropdownInViewportVertical();
                      }, 100);
                  }
              }
          },

          /**
           * When updating input's value
           *   1. Emit changes
           *   2. If value isn't the same as selected, set null
           *   3. Close dropdown if value is clear or else open it
           */
          newValue(value) {
              this.$emit('update:modelValue', value);
              // Check if selected is invalid
              const currentValue = this.getValue(this.selected);
              if (currentValue && currentValue !== value) {
                  this.setSelected(null, false);
              }
              // Close dropdown if input is clear or else open it
              if (this.hasFocus && (!this.openOnFocus || value)) {
                  this.isActive = !!value;
              }
          },

          /**
           * When v-model is changed:
           *   1. Update internal value.
           *   2. If it's invalid, validate again.
           */
          modelValue(value) {
              this.newValue = value;
          },

          /**
           * Select first option if "keep-first
           */
          data() {
              // Keep first option always pre-selected
              if (this.keepFirst) {
                  this.$nextTick(() => {
                      if (this.isActive) {
                          this.selectFirstOption(this.computedData);
                      }
                  });
              }
          }
      },
      methods: {
          /**
           * Set which option is currently hovered.
           */
          setHovered(option) {
              if (option === undefined) return

              this.hovered = option;
          },

          /**
           * Set which option is currently selected, update v-model,
           * update input value and close dropdown.
           */
          setSelected(option, closeDropdown = true, event = undefined) {
              if (option === undefined) return

              this.selected = option;
              this.$emit('select', this.selected, event);
              if (this.selected !== null) {
                  this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
                  this.setHovered(null);
              }
              closeDropdown && this.$nextTick(() => {
                  this.isActive = false;
              });
              this.checkValidity();
          },

          /**
           * Select first option
           */
          selectFirstOption(element) {
              this.$nextTick(() => {
                  if (element.length) {
                      // If has visible data or open on focus, keep updating the hovered
                      const option = element[0].items[0];
                      if (this.openOnFocus || (this.newValue !== '' && this.hovered !== option)) {
                          this.setHovered(option);
                      }
                  } else {
                      this.setHovered(null);
                  }
              });
          },

          keydown(event) {
              const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
              // prevent emit submit event
              if (key === 'Enter') event.preventDefault();
              // Close dropdown on Tab & no hovered
              this.isActive = key !== 'Tab';
              if (this.hovered === null) return
              if (this.confirmKeys.indexOf(key) >= 0) {
                  // If adding by comma, don't add the comma to the input
                  if (key === ',') event.preventDefault();

                  // Close dropdown on select by Tab
                  const closeDropdown = !this.keepOpen || key === 'Tab';
                  this.setSelected(this.hovered, closeDropdown, event);
              }
          },

          /**
           * Close dropdown if clicked outside.
           */
          clickedOutside(event) {
              const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
              if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
                  if (this.keepFirst && this.hovered) {
                      this.setSelected(this.hovered, true);
                  } else {
                      this.isActive = false;
                  }
              }
          },

          /**
           * Return display text for the input.
           * If object, get value from path, or else just the value.
           */
          getValue(option) {
              if (option === null) return

              if (typeof this.customFormatter !== 'undefined') {
                  return this.customFormatter(option)
              }
              return typeof option === 'object' ? getValueByPath(option, this.field) : option
          },

          /**
           * Check if the scroll list inside the dropdown
           * reached it's end.
           */
          checkIfReachedTheEndOfScroll(list) {
              if (list.clientHeight !== list.scrollHeight &&
                  list.scrollTop + list.clientHeight >= list.scrollHeight
              ) {
                  this.$emit('infinite-scroll');
              }
          },

          /**
           * Calculate if the dropdown is vertically visible when activated,
           * otherwise it is openened upwards.
           */
          calcDropdownInViewportVertical() {
              this.$nextTick(() => {
                  /**
                   * this.$refs.dropdown may be undefined
                   * when Autocomplete is conditional rendered
                   */
                  if (this.$refs.dropdown == null) return

                  const rect = this.$refs.dropdown.getBoundingClientRect();

                  this.isListInViewportVertically = rect.top >= 0 &&
                      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                  if (this.appendToBody) {
                      this.updateAppendToBody();
                  }
              });
          },

          /**
           * Arrows keys listener.
           * If dropdown is active, set hovered option, or else just open.
           */
          keyArrows(direction) {
              const sum = direction === 'down' ? 1 : -1;
              if (this.isActive) {
                  const data = this.computedData.map(
                      (d) => d.items).reduce((a, b) => ([...a, ...b]), []);
                  let index = data.indexOf(this.hovered) + sum;
                  index = index > data.length - 1 ? data.length - 1 : index;
                  index = index < 0 ? 0 : index;

                  this.setHovered(data[index]);

                  const list = this.$refs.dropdown.querySelector('.dropdown-content');
                  const element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index];

                  if (!element) return

                  const visMin = list.scrollTop;
                  const visMax = list.scrollTop + list.clientHeight - element.clientHeight;

                  if (element.offsetTop < visMin) {
                      list.scrollTop = element.offsetTop;
                  } else if (element.offsetTop >= visMax) {
                      list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
                  }
              } else {
                  this.isActive = true;
              }
          },

          /**
           * Focus listener.
           * If value is the same as selected, select all text.
           */
          focused(event) {
              if (this.getValue(this.selected) === this.newValue) {
                  this.$el.querySelector('input').select();
              }
              if (this.openOnFocus) {
                  this.isActive = true;
                  if (this.keepFirst) {
                      this.selectFirstOption(this.computedData);
                  }
              }
              this.hasFocus = true;
              this.$emit('focus', event);
          },

          /**
           * Blur listener.
           */
          onBlur(event) {
              this.hasFocus = false;
              this.$emit('blur', event);
          },
          onInput(event) {
              const currentValue = this.getValue(this.selected);
              if (currentValue && currentValue === this.newValue) return
              this.$emit('typing', this.newValue);
              this.checkValidity();
          },
          rightIconClick(event) {
              if (this.clearable) {
                  this.newValue = '';
                  this.setSelected(null, false);
                  if (this.openOnFocus) {
                      this.$refs.input.$el.focus();
                  }
              } else {
                  this.$emit('icon-right-click', event);
              }
          },
          checkValidity() {
              if (this.useHtml5Validation) {
                  this.$nextTick(() => {
                      this.checkHtml5Validity();
                  });
              }
          },
          updateAppendToBody() {
              const dropdownMenu = this.$refs.dropdown;
              const trigger = this.$refs.input.$el;
              if (dropdownMenu && trigger) {
                  // update wrapper dropdown
                  const root = this.$data._bodyEl;
                  root.classList.forEach((item) => root.classList.remove(item));
                  root.classList.add('autocomplete');
                  root.classList.add('control');
                  if (this.expandend) {
                      root.classList.add('is-expandend');
                  }
                  const rect = trigger.getBoundingClientRect();
                  let top = rect.top + window.scrollY;
                  const left = rect.left + window.scrollX;
                  if (!this.isOpenedTop) {
                      top += trigger.clientHeight;
                  } else {
                      top -= dropdownMenu.clientHeight;
                  }
                  this.style = {
                      position: 'absolute',
                      top: `${top}px`,
                      left: `${left}px`,
                      width: `${trigger.clientWidth}px`,
                      maxWidth: `${trigger.clientWidth}px`,
                      zIndex: '99'
                  };
              }
          }
      },
      created() {
          if (typeof window !== 'undefined') {
              document.addEventListener('click', this.clickedOutside);
              if (this.dropdownPosition === 'auto') { window.addEventListener('resize', this.calcDropdownInViewportVertical); }
          }
      },
      mounted() {
          if (this.checkInfiniteScroll &&
              this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
          ) {
              const list = this.$refs.dropdown.querySelector('.dropdown-content');
              list.addEventListener('scroll', () => this.checkIfReachedTheEndOfScroll(list));
          }
          if (this.appendToBody) {
              this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdown);
              this.updateAppendToBody();
          }
      },
      beforeUnmount() {
          if (typeof window !== 'undefined') {
              document.removeEventListener('click', this.clickedOutside);
              if (this.dropdownPosition === 'auto') { window.removeEventListener('resize', this.calcDropdownInViewportVertical); }
          }
          if (this.checkInfiniteScroll &&
              this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
          ) {
              const list = this.$refs.dropdown.querySelector('.dropdown-content');
              list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
          }
          if (this.appendToBody) {
              removeElement(this.$data._bodyEl);
          }
      }
  };

  const _hoisted_1$1 = {
    key: 0,
    class: "dropdown-item"
  };
  const _hoisted_2 = {
    key: 1,
    class: "has-text-weight-bold"
  };
  const _hoisted_3 = { key: 1 };
  const _hoisted_4 = {
    key: 1,
    class: "dropdown-item is-disabled"
  };
  const _hoisted_5 = {
    key: 2,
    class: "dropdown-item"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_input = vue.resolveComponent("b-input");

    return (vue.openBlock(), vue.createBlock("div", {
      class: ["autocomplete control", { 'is-expanded': _ctx.expanded }]
    }, [
      vue.createVNode(_component_b_input, vue.mergeProps({
        modelValue: $data.newValue,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.newValue = $event)),
        ref: "input",
        type: "text",
        size: _ctx.size,
        loading: _ctx.loading,
        rounded: _ctx.rounded,
        icon: _ctx.icon,
        "icon-right": $options.newIconRight,
        "icon-right-clickable": $options.newIconRightClickable,
        "icon-pack": _ctx.iconPack,
        maxlength: _ctx.maxlength,
        autocomplete: $data.newAutocomplete,
        "use-html5-validation": false
      }, _ctx.$attrs, {
        "onUpdate:modelValue": $options.onInput,
        onFocus: $options.focused,
        onBlur: $options.onBlur,
        onKeyup: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers($event => ($data.isActive = false), ["prevent"]), ["esc"])),
        onKeydown: [
          $options.keydown,
          _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers($event => ($options.keyArrows('up')), ["prevent"]), ["up"])),
          _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers($event => ($options.keyArrows('down')), ["prevent"]), ["down"]))
        ],
        onIconRightClick: $options.rightIconClick,
        onIconClick: _cache[5] || (_cache[5] = (event) => _ctx.$emit('icon-click', event))
      }), null, 16 /* FULL_PROPS */, ["modelValue", "size", "loading", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown", "onIconRightClick"]),
      vue.createVNode(vue.Transition, { name: "fade" }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createVNode("div", {
            class: ["dropdown-menu", { 'is-opened-top': $options.isOpenedTop && !$props.appendToBody }],
            style: $data.style,
            ref: "dropdown"
          }, [
            vue.withDirectives(vue.createVNode("div", {
              class: "dropdown-content",
              style: $options.contentStyle
            }, [
              ($options.hasHeaderSlot)
                ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
                    vue.renderSlot(_ctx.$slots, "header")
                  ]))
                : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.computedData, (element, groupindex) => {
                return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
                  (element.group)
                    ? (vue.openBlock(), vue.createBlock("div", {
                        key: groupindex + 'group',
                        class: "dropdown-item"
                      }, [
                        ($options.hasGroupSlot)
                          ? vue.renderSlot(_ctx.$slots, "group", {
                              key: 0,
                              group: element.group,
                              index: groupindex
                            })
                          : (vue.openBlock(), vue.createBlock("span", _hoisted_2, vue.toDisplayString(element.group), 1 /* TEXT */))
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(element.items, (option, index) => {
                    return (vue.openBlock(), vue.createBlock("a", {
                      key: groupindex + ':' + index,
                      class: ["dropdown-item", { 'is-hovered': option === $data.hovered }],
                      onClick: $event => ($options.setSelected(option, undefined, $event))
                    }, [
                      ($options.hasDefaultSlot)
                        ? vue.renderSlot(_ctx.$slots, "default", {
                            key: 0,
                            option: option,
                            index: index
                          })
                        : (vue.openBlock(), vue.createBlock("span", _hoisted_3, vue.toDisplayString($options.getValue(option, true)), 1 /* TEXT */))
                    ], 10 /* CLASS, PROPS */, ["onClick"]))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 64 /* STABLE_FRAGMENT */))
              }), 256 /* UNKEYED_FRAGMENT */)),
              ($options.isEmpty && $options.hasEmptySlot)
                ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, [
                    vue.renderSlot(_ctx.$slots, "empty")
                  ]))
                : vue.createCommentVNode("v-if", true),
              ($options.hasFooterSlot)
                ? (vue.openBlock(), vue.createBlock("div", _hoisted_5, [
                    vue.renderSlot(_ctx.$slots, "footer")
                  ]))
                : vue.createCommentVNode("v-if", true)
            ], 4 /* STYLE */), [
              [vue.vShow, $data.isActive]
            ])
          ], 6 /* CLASS, STYLE */), [
            [vue.vShow, $data.isActive && (!$options.isEmpty || $options.hasEmptySlot || $options.hasHeaderSlot)]
          ])
        ]),
        _: 3 /* FORWARDED */
      })
    ], 2 /* CLASS */))
  }

  script$1.render = render$1;
  script$1.__file = "src/components/autocomplete/Autocomplete.vue";

  var script = {
      name: 'BTaginput',
      components: {
          [script$1.name]: script$1,
          [script$4.name]: script$4
      },
      mixins: [FormElementMixin],
      inheritAttrs: false,
      props: {
          modelValue: {
              type: Array,
              default: () => []
          },
          data: {
              type: Array,
              default: () => []
          },
          type: String,
          closeType: String,
          rounded: {
              type: Boolean,
              default: false
          },
          attached: {
              type: Boolean,
              default: false
          },
          maxtags: {
              type: [Number, String],
              required: false
          },
          hasCounter: {
              type: Boolean,
              default: () => config.defaultTaginputHasCounter
          },
          field: {
              type: String,
              default: 'value'
          },
          autocomplete: Boolean,
          groupField: String,
          groupOptions: String,
          nativeAutocomplete: String,
          openOnFocus: Boolean,
          disabled: Boolean,
          ellipsis: Boolean,
          closable: {
              type: Boolean,
              default: true
          },
          ariaCloseLabel: String,
          confirmKeys: {
              type: Array,
              default: () => [',', 'Tab', 'Enter']
          },
          removeOnKeys: {
              type: Array,
              default: () => ['Backspace']
          },
          allowNew: Boolean,
          onPasteSeparators: {
              type: Array,
              default: () => [',']
          },
          beforeAdding: {
              type: Function,
              default: () => true
          },
          allowDuplicates: {
              type: Boolean,
              default: false
          },
          checkInfiniteScroll: {
              type: Boolean,
              default: false
          },
          createTag: {
              type: Function,
              default: (tag) => tag
          },
          appendToBody: Boolean
      },
      emits: [
          'add',
          'infinite-scroll',
          'remove',
          'typing',
          'update:modelValue'
      ],
      data() {
          return {
              tags: Array.isArray(this.modelValue)
                  ? this.modelValue.slice(0)
                  : (this.modelValue || []),
              newTag: '',
              isComposing: false,
              _elementRef: 'autocomplete',
              _isTaginput: true
          }
      },
      computed: {
          rootClasses() {
              return {
                  'is-expanded': this.expanded
              }
          },

          containerClasses() {
              return {
                  'is-focused': this.isFocused,
                  'is-focusable': this.hasInput
              }
          },

          valueLength() {
              return this.newTag.trim().length
          },

          hasDefaultSlot() {
              return !!this.$slots.default
          },

          hasEmptySlot() {
              return !!this.$slots.empty
          },

          hasHeaderSlot() {
              return !!this.$slots.header
          },

          hasFooterSlot() {
              return !!this.$slots.footer
          },

          /**
           * Show the input field if a maxtags hasn't been set or reached.
           */
          hasInput() {
              return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags
          },

          tagsLength() {
              return this.tags.length
          },

          /**
           * If Taginput has onPasteSeparators prop,
           * returning new RegExp used to split pasted string.
           */
          separatorsAsRegExp() {
              const sep = this.onPasteSeparators;

              return sep.length
                  ? new RegExp(sep.map((s) => {
                      return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null
                  }).join('|'), 'g')
                  : null
          },

          disabledOrUndefined() {
              // On Vue 3, setting a boolean attribute `false` does not remove it.
              // `null` or `undefined` has to be given to remove it.
              return this.disabled || undefined
          }
      },
      watch: {
          /**
           * When v-model is changed set internal value.
           */
          modelValue(value) {
              this.tags = Array.isArray(value) ? value.slice(0) : (value || []);
          },

          hasInput() {
              if (!this.hasInput) this.onBlur();
          }
      },
      methods: {
          addTag(tag) {
              const tagToAdd = tag || this.newTag.trim();

              if (tagToAdd) {
                  if (!this.autocomplete) {
                      const reg = this.separatorsAsRegExp;
                      if (reg && tagToAdd.match(reg)) {
                          tagToAdd.split(reg)
                              .map((t) => t.trim())
                              .filter((t) => t.length !== 0)
                              .map(this.addTag);
                          return
                      }
                  }
                  // Add the tag input if it is not blank
                  // or previously added (if not allowDuplicates).
                  const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
                  if (add && this.beforeAdding(tagToAdd)) {
                      if (this.maxtags === 1) {
                          this.tags = []; // replace existing tag if only 1 is allowed
                      }
                      this.tags.push(this.createTag(tagToAdd));
                      this.$emit('update:modelValue', this.tags);
                      this.$emit('add', tagToAdd);
                  }
              }

              this.newTag = '';
          },

          getNormalizedTagText(tag) {
              if (typeof tag === 'object') {
                  tag = getValueByPath(tag, this.field);
              }

              return `${tag}`
          },

          customOnBlur(event) {
              // Add tag on-blur if not select only
              if (!this.autocomplete) this.addTag();

              this.onBlur(event);
          },

          onSelect(option) {
              if (!option) return

              this.addTag(option);
              this.$nextTick(() => {
                  this.newTag = '';
              });
          },

          removeTag(index, event) {
              const tag = this.tags.splice(index, 1)[0];
              this.$emit('update:modelValue', this.tags);
              this.$emit('remove', tag);
              if (event) event.stopPropagation();
              if (this.openOnFocus && this.$refs.autocomplete) {
                  this.$refs.autocomplete.focus();
              }
              return tag
          },

          removeLastTag() {
              if (this.tagsLength > 0) {
                  this.removeTag(this.tagsLength - 1);
              }
          },

          keydown(event) {
              const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
              if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
                  this.removeLastTag();
              }
              // Stop if is to accept select only
              if (this.autocomplete && !this.allowNew) return

              if (this.confirmKeys.indexOf(key) >= 0) {
                  // Allow Tab to advance to next field regardless
                  if (key !== 'Tab') event.preventDefault();
                  if (key === 'Enter' && this.isComposing) return
                  this.addTag();
              }
          },

          onTyping(event) {
              this.$emit('typing', event.trim());
          },

          emitInfiniteScroll() {
              this.$emit('infinite-scroll');
          }
      }
  };

  const _hoisted_1 = {
    key: 0,
    class: "help counter"
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_tag = vue.resolveComponent("b-tag");
    const _component_b_autocomplete = vue.resolveComponent("b-autocomplete");

    return (vue.openBlock(), vue.createBlock("div", {
      class: ["taginput control", $options.rootClasses]
    }, [
      vue.createVNode("div", {
        class: ["taginput-container", [_ctx.statusType, _ctx.size, $options.containerClasses]],
        disabled: $options.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = $event => ($options.hasInput && _ctx.focus($event)))
      }, [
        vue.renderSlot(_ctx.$slots, "selected", { tags: $data.tags }, () => [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.tags, (tag, index) => {
            return (vue.openBlock(), vue.createBlock(_component_b_tag, {
              key: $options.getNormalizedTagText(tag) + index,
              type: $props.type,
              "close-type": $props.closeType,
              size: _ctx.size,
              rounded: $props.rounded,
              attached: $props.attached,
              tabstop: false,
              disabled: $options.disabledOrUndefined,
              ellipsis: $props.ellipsis,
              closable: $props.closable,
              "aria-close-label": $props.ariaCloseLabel,
              title: $props.ellipsis && $options.getNormalizedTagText(tag),
              onClose: $event => ($options.removeTag(index, $event))
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "tag", { tag: tag }, () => [
                  vue.createTextVNode(vue.toDisplayString($options.getNormalizedTagText(tag)), 1 /* TEXT */)
                ])
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "close-type", "size", "rounded", "attached", "disabled", "ellipsis", "closable", "aria-close-label", "title", "onClose"]))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        ($options.hasInput)
          ? (vue.openBlock(), vue.createBlock(_component_b_autocomplete, vue.mergeProps({
              key: 0,
              ref: "autocomplete",
              modelValue: $data.newTag,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.newTag = $event))
            }, _ctx.$attrs, {
              data: $props.data,
              field: $props.field,
              icon: _ctx.icon,
              "icon-pack": _ctx.iconPack,
              maxlength: _ctx.maxlength,
              "has-counter": false,
              size: _ctx.size,
              disabled: $options.disabledOrUndefined,
              loading: _ctx.loading,
              autocomplete: $props.nativeAutocomplete,
              "open-on-focus": $props.openOnFocus,
              "keep-open": $props.openOnFocus,
              "group-field": $props.groupField,
              "group-options": $props.groupOptions,
              "use-html5-validation": _ctx.useHtml5Validation,
              "check-infinite-scroll": $props.checkInfiniteScroll,
              "append-to-body": $props.appendToBody,
              "confirm-keys": $props.confirmKeys,
              onTyping: $options.onTyping,
              onFocus: _ctx.onFocus,
              onBlur: $options.customOnBlur,
              onKeydown: $options.keydown,
              onCompositionstart: _cache[2] || (_cache[2] = $event => ($data.isComposing = true)),
              onCompositionend: _cache[3] || (_cache[3] = $event => ($data.isComposing = false)),
              onSelect: $options.onSelect,
              onInfiniteScroll: $options.emitInfiniteScroll
            }), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
              ($options.hasHeaderSlot)
                ? {
                    name: "header",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "header")
                    ])
                  }
                : undefined,
              ($options.hasDefaultSlot)
                ? {
                    name: "default",
                    fn: vue.withCtx((props) => [
                      vue.renderSlot(_ctx.$slots, "default", {
                        option: props.option,
                        index: props.index
                      })
                    ])
                  }
                : undefined,
              ($options.hasEmptySlot)
                ? {
                    name: "empty",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "empty")
                    ])
                  }
                : undefined,
              ($options.hasFooterSlot)
                ? {
                    name: "footer",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "footer")
                    ])
                  }
                : undefined
            ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "loading", "autocomplete", "open-on-focus", "keep-open", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onKeydown", "onSelect", "onInfiniteScroll"]))
          : vue.createCommentVNode("v-if", true)
      ], 10 /* CLASS, PROPS */, ["disabled"]),
      ($props.hasCounter && ($props.maxtags || _ctx.maxlength))
        ? (vue.openBlock(), vue.createBlock("small", _hoisted_1, [
            (_ctx.maxlength && $options.valueLength > 0)
              ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                  vue.createTextVNode(vue.toDisplayString($options.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength), 1 /* TEXT */)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              : ($props.maxtags)
                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                    vue.createTextVNode(vue.toDisplayString($options.tagsLength) + " / " + vue.toDisplayString($props.maxtags), 1 /* TEXT */)
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                : vue.createCommentVNode("v-if", true)
          ]))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */))
  }

  script.render = render;
  script.__file = "src/components/taginput/Taginput.vue";

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

  exports.BTaginput = script;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
