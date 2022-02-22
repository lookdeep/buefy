/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Table = {}, global.Vue));
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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  /**
   * Get value of an object property/path even if it's nested
   */

  function getValueByPath(obj, path) {
    return path.split('.').reduce(function (o, i) {
      return o ? o[i] : null;
    }, obj);
  }
  /**
   * Extension of indexOf method by equality function if specified
   */

  function indexOf(array, obj, fn) {
    if (!array) return -1;
    if (!fn || typeof fn !== 'function') return array.indexOf(obj);

    for (var i = 0; i < array.length; i++) {
      if (fn(array[i], obj)) {
        return i;
      }
    }

    return -1;
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
        return _objectSpread$1(_objectSpread$1({}, a), b);
      }, {});
      return _objectSpread$1(_objectSpread$1({}, target), replaced);
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
  function isVueComponent(c) {
    return c && c._isVue;
  }
  /**
   * Escape regex characters
   * http://stackoverflow.com/a/6969486
   */

  function escapeRegExpChars(value) {
    if (!value) return value; // eslint-disable-next-line

    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
  function multiColumnSort(inputArray, sortingPriority) {
    // clone it to prevent the any watchers from triggering every sorting iteration
    var array = JSON.parse(JSON.stringify(inputArray));

    var fieldSorter = function fieldSorter(fields) {
      return function (a, b) {
        return fields.map(function (o) {
          var dir = 1;

          if (o[0] === '-') {
            dir = -1;
            o = o.substring(1);
          }

          var aValue = getValueByPath(a, o);
          var bValue = getValueByPath(b, o);
          return aValue > bValue ? dir : aValue < bValue ? -dir : 0;
        }).reduce(function (p, n) {
          return p || n;
        }, 0);
      };
    };

    return array.sort(fieldSorter(sortingPriority));
  }
  function toCssWidth(width) {
    return width === undefined ? null : isNaN(width) ? width : width + 'px';
  }
  function isFragment(vnode) {
    return vnode.type === vue.Fragment;
  } // TODO: replacement of vnode.tag test

  function debounce (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

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

  var script$a = {
      name: 'BCheckbox',
      mixins: [CheckRadioMixin],
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

  const _hoisted_1$6 = { class: "control-label" };

  function render$9(_ctx, _cache, $props, $setup, $data, $options) {
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
      vue.createVNode("span", _hoisted_1$6, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
  }

  script$a.render = render$9;
  script$a.__file = "src/components/checkbox/Checkbox.vue";

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

  var script$9 = {
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

  function render$8(_ctx, _cache, $props, $setup, $data, $options) {
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

  script$9.render = render$8;
  script$9.__file = "src/components/icon/Icon.vue";

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

  var script$8 = {
      name: 'BInput',
      components: {
          [script$9.name]: script$9
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

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
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

  script$8.render = render$7;
  script$8.__file = "src/components/input/Input.vue";

  // Polyfills for SSR
  var isSSR = typeof window === 'undefined';
  var HTMLElement = isSSR ? Object : window.HTMLElement;

  var script$7 = {
      name: 'BLoading',
      props: {
          modelValue: Boolean,
          programmatic: Boolean,
          container: [Object, Function, HTMLElement],
          isFullPage: {
              type: Boolean,
              default: true
          },
          animation: {
              type: String,
              default: 'fade'
          },
          canCancel: {
              type: Boolean,
              default: false
          },
          onCancel: {
              type: Function,
              default: () => {}
          }
      },
      emits: ['close', 'update:is-full-page', 'update:modelValue'],
      data() {
          return {
              isActive: this.modelValue || false,
              displayInFullPage: this.isFullPage
          }
      },
      watch: {
          modelValue(value) {
              this.isActive = value;
          },
          isFullPage(value) {
              this.displayInFullPage = value;
          }
      },
      methods: {
          /**
          * Close the Modal if canCancel.
          */
          cancel() {
              if (!this.canCancel || !this.isActive) return

              this.close();
          },
          /**
          * Emit events, and destroy modal if it's programmatic.
          */
          close() {
              this.onCancel.apply(null, arguments);
              this.$emit('close');
              this.$emit('update:modelValue', false);

              // Timeout for the animation complete before destroying
              if (this.programmatic) {
                  this.isActive = false;
                  // TODO: should the following happen outside this component;
                  // i.e., in index.js?
                  setTimeout(() => {
                      removeElement(this.$el);
                  }, 150);
              }
          },
          /**
          * Keypress event that is bound to the document.
          */
          keyPress({ key }) {
              if (key === 'Escape' || key === 'Esc') this.cancel();
          }
      },
      created() {
          if (typeof window !== 'undefined') {
              document.addEventListener('keyup', this.keyPress);
          }
      },
      mounted() {
          // Insert the Loading component in body tag
          // only if it's programmatic
          // (moved from beforeMount because $el is not bound during beforeMount)
          // TODO: should this happen outside this component; i.e., in index.js?
          if (this.programmatic) {
              if (!this.container) {
                  document.body.appendChild(this.$el);
              } else {
                  this.displayInFullPage = false;
                  this.$emit('update:is-full-page', false);
                  this.container.appendChild(this.$el);
              }
              this.isActive = true;
          }
      },
      beforeUnmount() {
          if (typeof window !== 'undefined') {
              document.removeEventListener('keyup', this.keyPress);
          }
      }
  };

  const _hoisted_1$5 = /*#__PURE__*/vue.createVNode("div", { class: "loading-icon" }, null, -1 /* HOISTED */);

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.Transition, { name: $props.animation }, {
      default: vue.withCtx(() => [
        ($data.isActive)
          ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: ["loading-overlay is-active", { 'is-full-page': $data.displayInFullPage }]
            }, [
              vue.createVNode("div", {
                class: "loading-background",
                onClick: _cache[1] || (_cache[1] = (...args) => ($options.cancel && $options.cancel(...args)))
              }),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                _hoisted_1$5
              ])
            ], 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"]))
  }

  script$7.render = render$6;
  script$7.__file = "src/components/loading/Loading.vue";

  var SlotComponent = {
    name: 'BSlotComponent',
    props: {
      component: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        default: 'default'
      },
      scoped: {
        type: Boolean
      },
      props: {
        type: Object
      },
      tag: {
        type: String,
        default: 'div'
      },
      event: {
        type: String,
        default: 'hook:updated'
      }
    },
    methods: {
      refresh: function refresh() {
        this.$forceUpdate();
      }
    },
    created: function created() {
      if (isVueComponent(this.component)) {
        this.component.$on(this.event, this.refresh);
      }
    },
    beforeUnmount: function beforeUnmount() {
      if (isVueComponent(this.component)) {
        this.component.$off(this.event, this.refresh);
      }
    },
    render: function render() {
      return vue.h(this.tag, {}, this.scoped ? this.component.$slots[this.name](this.props) : this.component.$slots[this.name]());
    }
  };

  var script$6 = {
      name: 'BSelect',
      components: {
          [script$9.name]: script$9
      },
      mixins: [FormElementMixin],
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

  const _hoisted_1$4 = {
    key: 0,
    value: null,
    disabled: "",
    hidden: ""
  };

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
                  ? (vue.openBlock(), vue.createBlock("option", _hoisted_1$4, vue.toDisplayString($props.placeholder), 1 /* TEXT */))
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

  script$6.render = render$5;
  script$6.__file = "src/components/select/Select.vue";

  var script$5 = {
      name: 'BTableMobileSort',
      components: {
          [script$6.name]: script$6,
          [script$9.name]: script$9
      },
      props: {
          currentSortColumn: Object,
          sortMultipleData: Array,
          isAsc: Boolean,
          columns: Array,
          placeholder: String,
          iconPack: String,
          sortIcon: {
              type: String,
              default: 'arrow-up'
          },
          sortIconSize: {
              type: String,
              default: 'is-small'
          },
          sortMultiple: {
              type: Boolean,
              default: false
          }
      },
      emits: ['removePriority', 'sort'],
      data() {
          return {
              sortMultipleSelect: '',
              sortMultipleSelectIndex: -1,
              mobileSort: this.currentSortColumn,
              mobileSortIndex: this.columns.indexOf(this.currentSortColumn),
              defaultEvent: {
                  shiftKey: true,
                  altKey: true,
                  ctrlKey: true
              },
              ignoreSort: false
          }
      },
      computed: {
          showPlaceholder() {
              return !this.columns || !this.columns.some((column) => column === this.mobileSort)
          }
      },
      watch: {
          sortMultipleSelect(column) {
              if (this.ignoreSort) {
                  this.ignoreSort = false;
              } else {
                  this.$emit('sort', column, this.defaultEvent);
              }
          },
          sortMultipleSelectIndex(index) {
              if (index !== -1) {
                  this.sortMultipleSelect = this.columns[index];
              } else {
                  this.sortMultipleSelect = null;
              }
          },
          mobileSort(column) {
              if (this.currentSortColumn === column) return

              this.$emit('sort', column, this.defaultEvent);
          },
          mobileSortIndex(index) {
              if (index !== -1) {
                  this.mobileSort = this.columns[index];
              } else {
                  this.mobileSort = null;
              }
          },
          currentSortColumn(column) {
              this.mobileSortIndex = this.columns.indexOf(column);
          },
          columns(newColumns) {
              if (this.sortMultiple) {
                  this.sortMultipleSelectIndex = newColumns.indexOf(
                      this.sortMultipleSelect
                  );
              } else {
                  this.mobileSortIndex = newColumns.indexOf(this.mobileSort);
              }
          }
      },
      methods: {
          removePriority() {
              this.$emit('removePriority', this.sortMultipleSelect);
              // ignore the watcher to sort when we just change whats displayed in the select
              // otherwise the direction will be flipped
              // The sort event is already triggered by the emit
              this.ignoreSort = true;
              // Select one of the other options when we reset one
              const remainingFields = this.sortMultipleData.filter((data) =>
                  data.field !== this.sortMultipleSelect.field)
                  .map((data) => data.field);
              this.sortMultipleSelectIndex = this.columns.findIndex((column) =>
                  remainingFields.includes(column.field));
          },
          getSortingObjectOfColumn(column) {
              return this.sortMultipleData.filter((i) =>
                  i.field === column.field)[0]
          },
          columnIsDesc(column) {
              const sortingObject = this.getSortingObjectOfColumn(column);
              if (sortingObject) {
                  return !!(sortingObject.order && sortingObject.order === 'desc')
              }
              return true
          },
          getLabel(column) {
              const sortingObject = this.getSortingObjectOfColumn(column);
              if (sortingObject) {
                  return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')'
              }
              return column.label
          },
          sort() {
              this.$emit('sort', (this.sortMultiple ? this.sortMultipleSelect : this.mobileSort), this.defaultEvent);
          }
      }
  };

  const _hoisted_1$3 = { class: "field table-mobile-sort" };
  const _hoisted_2$3 = { class: "field has-addons" };
  const _hoisted_3$3 = /*#__PURE__*/vue.createTextVNode(" ↓ ");
  const _hoisted_4$3 = /*#__PURE__*/vue.createTextVNode(" ↑ ");
  const _hoisted_5$2 = { class: "control" };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_select = vue.resolveComponent("b-select");
    const _component_b_icon = vue.resolveComponent("b-icon");

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [
      vue.createVNode("div", _hoisted_2$3, [
        ($props.sortMultiple)
          ? (vue.openBlock(), vue.createBlock(_component_b_select, {
              key: 0,
              modelValue: $data.sortMultipleSelectIndex,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.sortMultipleSelectIndex = $event)),
              expanded: ""
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.columns, (column, index) => {
                  return (vue.openBlock(), vue.createBlock(vue.Fragment, { key: index }, [
                    (column.sortable)
                      ? (vue.openBlock(), vue.createBlock("option", {
                          key: 0,
                          value: index
                        }, [
                          vue.createTextVNode(vue.toDisplayString($options.getLabel(column)) + " ", 1 /* TEXT */),
                          ($options.getSortingObjectOfColumn(column))
                            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                ($options.columnIsDesc(column))
                                  ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                      _hoisted_3$3
                                    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                                  : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                                      _hoisted_4$3
                                    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                            : vue.createCommentVNode("v-if", true)
                        ], 8 /* PROPS */, ["value"]))
                      : vue.createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["modelValue"]))
          : (vue.openBlock(), vue.createBlock(_component_b_select, {
              key: 1,
              modelValue: $data.mobileSortIndex,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.mobileSortIndex = $event)),
              expanded: ""
            }, {
              default: vue.withCtx(() => [
                ($props.placeholder)
                  ? vue.withDirectives((vue.openBlock(), vue.createBlock("option", {
                      key: 0,
                      value: {},
                      selected: "",
                      disabled: "",
                      hidden: ""
                    }, vue.toDisplayString($props.placeholder), 513 /* TEXT, NEED_PATCH */)), [
                      [vue.vShow, $options.showPlaceholder]
                    ])
                  : vue.createCommentVNode("v-if", true),
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.columns, (column, index) => {
                  return (vue.openBlock(), vue.createBlock(vue.Fragment, { key: index }, [
                    (column.sortable)
                      ? (vue.openBlock(), vue.createBlock("option", {
                          key: 0,
                          value: index
                        }, vue.toDisplayString(column.label), 9 /* TEXT, PROPS */, ["value"]))
                      : vue.createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["modelValue"])),
        vue.createVNode("div", _hoisted_5$2, [
          ($props.sortMultiple && $props.sortMultipleData.length > 0)
            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                vue.createVNode("button", {
                  class: "button is-primary",
                  onClick: _cache[3] || (_cache[3] = (...args) => ($options.sort && $options.sort(...args)))
                }, [
                  vue.createVNode(_component_b_icon, {
                    class: { 'is-desc': $options.columnIsDesc($data.sortMultipleSelect) },
                    icon: $props.sortIcon,
                    pack: $props.iconPack,
                    size: $props.sortIconSize,
                    both: ""
                  }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"])
                ]),
                vue.createVNode("button", {
                  class: "button is-primary",
                  onClick: _cache[4] || (_cache[4] = (...args) => ($options.removePriority && $options.removePriority(...args)))
                }, [
                  vue.createVNode(_component_b_icon, {
                    icon: "delete",
                    size: $props.sortIconSize,
                    both: ""
                  }, null, 8 /* PROPS */, ["size"])
                ])
              ], 64 /* STABLE_FRAGMENT */))
            : (!$props.sortMultiple)
              ? (vue.openBlock(), vue.createBlock("button", {
                  key: 1,
                  class: "button is-primary",
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.sort && $options.sort(...args)))
                }, [
                  vue.withDirectives(vue.createVNode(_component_b_icon, {
                    class: { 'is-desc': !$props.isAsc },
                    icon: $props.sortIcon,
                    pack: $props.iconPack,
                    size: $props.sortIconSize,
                    both: ""
                  }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"]), [
                    [vue.vShow, $props.currentSortColumn === $data.mobileSort]
                  ])
                ]))
              : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]))
  }

  script$5.render = render$4;
  script$5.__file = "src/components/table/TableMobileSort.vue";

  var script$4 = {
      name: 'BTableColumn',
      inject: {
          $table: { name: '$table', default: false }
      },
      props: {
          label: String,
          customKey: [String, Number],
          field: String,
          meta: [String, Number, Boolean, Function, Object, Array],
          width: [Number, String],
          numeric: Boolean,
          centered: Boolean,
          searchable: Boolean,
          sortable: Boolean,
          visible: {
              type: Boolean,
              default: true
          },
          subheading: [String, Number],
          customSort: Function,
          customSearch: Function,
          sticky: Boolean,
          headerSelectable: Boolean,
          headerClass: String,
          cellClass: String,
          thAttrs: {
              type: Function,
              default: () => ({})
          },
          tdAttrs: {
              type: Function,
              default: () => ({})
          }
      },
      data() {
          return {
              newKey: this.customKey || this.label,
              _isTableColumn: true
          }
      },
      computed: {
          thClasses() {
              const attrs = this.thAttrs(this);
              const classes = [this.headerClass, {
                  'is-sortable': this.sortable,
                  'is-sticky': this.sticky,
                  'is-unselectable': this.isHeaderUnSelectable
              }];
              if (attrs && attrs.class) {
                  classes.push(attrs.class);
              }
              return classes
          },
          thStyle() {
              const attrs = this.thAttrs(this);
              const style = [this.style];
              if (attrs && attrs.style) {
                  style.push(attrs.style);
              }
              return style
          },
          rootClasses() {
              return [this.cellClass, {
                  'has-text-right': this.numeric && !this.centered,
                  'has-text-centered': this.centered,
                  'is-sticky': this.sticky
              }]
          },
          style() {
              return {
                  width: toCssWidth(this.width)
              }
          },
          hasDefaultSlot() {
              return !!this.$slots.default
          },
          /**
           * Return if column header is un-selectable
           */
          isHeaderUnSelectable() {
              return !this.headerSelectable && this.sortable
          }
      },
      methods: {
          getRootClasses(row) {
              const attrs = this.tdAttrs(row, this);
              const classes = [this.rootClasses];
              if (attrs && attrs.class) {
                  classes.push(attrs.class);
              }
              return classes
          },
          getRootStyle(row) {
              const attrs = this.tdAttrs(row, this);
              const style = [];
              if (attrs && attrs.style) {
                  style.push(attrs.style);
              }
              return style
          }
      },
      created() {
          if (!this.$table) {
              throw new Error('You should wrap bTableColumn on a bTable')
          }
          this.$table._registerTableColumn(this);
      },
      beforeUnmount() {
          this.$table._unregisterTableColumn(this);
      },
      render(createElement) {
          // renderless
          return null
      }
  };

  script$4.__file = "src/components/table/TableColumn.vue";

  var script$3 = {
      name: 'BPaginationButton',
      props: {
          page: {
              type: Object,
              required: true
          },
          tag: {
              type: String,
              default: 'a',
              validator: (value) => {
                  return config.defaultLinkTags.indexOf(value) >= 0
              }
          },
          disabled: {
              type: Boolean,
              default: false
          }
      },
      computed: {
          href() {
              if (this.tag === 'a') {
                  return '#'
              } else {
                  return undefined
              }
          },
          isDisabled() {
              return this.disabled || this.page.disabled
          },
          disabledOrUndefined() {
              return this.isDisabled || undefined
          }
      }
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), vue.mergeProps({
      role: "button",
      href: $options.href,
      disabled: $options.disabledOrUndefined,
      class: ["pagination-link", { 'is-current': $props.page.isCurrent, [$props.page.class]: true }]
    }, _ctx.$attrs, {
      onClick: vue.withModifiers($props.page.click, ["prevent"]),
      "aria-label": $props.page['aria-label'],
      "aria-current": $props.page.isCurrent
    }), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createTextVNode(vue.toDisplayString($props.page.number), 1 /* TEXT */)
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]))
  }

  script$3.render = render$3;
  script$3.__file = "src/components/pagination/PaginationButton.vue";

  var script$2 = {
      name: 'BPagination',
      components: {
          [script$9.name]: script$9,
          [script$3.name]: script$3
      },
      props: {
          total: [Number, String],
          perPage: {
              type: [Number, String],
              default: 20
          },
          modelValue: {
              type: [Number, String],
              default: 1
          },
          rangeBefore: {
              type: [Number, String],
              default: 1
          },
          rangeAfter: {
              type: [Number, String],
              default: 1
          },
          size: String,
          simple: Boolean,
          rounded: Boolean,
          order: String,
          iconPack: String,
          iconPrev: {
              type: String,
              default: () => {
                  return config.defaultIconPrev
              }
          },
          iconNext: {
              type: String,
              default: () => {
                  return config.defaultIconNext
              }
          },
          ariaNextLabel: String,
          ariaPreviousLabel: String,
          ariaPageLabel: String,
          ariaCurrentLabel: String
      },
      emits: ['change', 'update:modelValue'],
      computed: {
          rootClasses() {
              return [
                  this.order,
                  this.size,
                  {
                      'is-simple': this.simple,
                      'is-rounded': this.rounded
                  }
              ]
          },

          beforeCurrent() {
              return parseInt(this.rangeBefore)
          },

          afterCurrent() {
              return parseInt(this.rangeAfter)
          },

          /**
          * Total page size (count).
          */
          pageCount() {
              return Math.ceil(this.total / this.perPage)
          },

          /**
          * First item of the page (count).
          */
          firstItem() {
              const firstItem = this.modelValue * this.perPage - this.perPage + 1;
              return firstItem >= 0 ? firstItem : 0
          },

          /**
          * Check if previous button is available.
          */
          hasPrev() {
              return this.modelValue > 1
          },

          /**
          * Check if first page button should be visible.
          */
          hasFirst() {
              return this.modelValue >= (2 + this.beforeCurrent)
          },

          /**
          * Check if first ellipsis should be visible.
          */
          hasFirstEllipsis() {
              return this.modelValue >= (this.beforeCurrent + 4)
          },

          /**
          * Check if last page button should be visible.
          */
          hasLast() {
              return this.modelValue <= this.pageCount - (1 + this.afterCurrent)
          },

          /**
          * Check if last ellipsis should be visible.
          */
          hasLastEllipsis() {
              return this.modelValue < this.pageCount - (2 + this.afterCurrent)
          },

          /**
          * Check if next button is available.
          */
          hasNext() {
              return this.modelValue < this.pageCount
          },

          /**
          * Get near pages, 1 before and 1 after the current.
          * Also add the click event to the array.
          */
          pagesInRange() {
              if (this.simple) return

              let left = Math.max(1, this.modelValue - this.beforeCurrent);
              if (left - 1 === 2) {
                  left--; // Do not show the ellipsis if there is only one to hide
              }
              let right = Math.min(this.modelValue + this.afterCurrent, this.pageCount);
              if (this.pageCount - right === 2) {
                  right++; // Do not show the ellipsis if there is only one to hide
              }

              const pages = [];
              for (let i = left; i <= right; i++) {
                  pages.push(this.getPage(i));
              }
              return pages
          }
      },
      watch: {
          /**
          * If current page is trying to be greater than page count, set to last.
          */
          pageCount(value) {
              if (this.modelValue > value) this.last();
          }
      },
      methods: {
          /**
          * Previous button click listener.
          */
          prev(event) {
              this.changePage(this.modelValue - 1, event);
          },
          /**
          * Next button click listener.
          */
          next(event) {
              this.changePage(this.modelValue + 1, event);
          },
          /**
          * First button click listener.
          */
          first(event) {
              this.changePage(1, event);
          },
          /**
          * Last button click listener.
          */
          last(event) {
              this.changePage(this.pageCount, event);
          },

          changePage(num, event) {
              if (this.modelValue === num || num < 1 || num > this.pageCount) return
              this.$emit('update:modelValue', num);
              this.$emit('change', num);

              // Set focus on element to keep tab order
              if (event && event.target) {
                  this.$nextTick(() => event.target.focus());
              }
          },

          getPage(num, options = {}) {
              return {
                  number: num,
                  isCurrent: this.modelValue === num,
                  click: (event) => this.changePage(num, event),
                  disabled: options.disabled || false,
                  class: options.class || '',
                  'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.modelValue === num)
              }
          },

          /**
          * Get text for aria-label according to page number.
          */
          getAriaPageLabel(pageNumber, isCurrent) {
              if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                  return this.ariaPageLabel + ' ' + pageNumber + '.'
              } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                  return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.'
              }
              return null
          }
      }
  };

  const _hoisted_1$2 = {
    key: 4,
    class: "info"
  };
  const _hoisted_2$2 = {
    key: 5,
    class: "pagination-list"
  };
  const _hoisted_3$2 = { key: 0 };
  const _hoisted_4$2 = { key: 1 };
  const _hoisted_5$1 = /*#__PURE__*/vue.createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
  const _hoisted_6$1 = { key: 2 };
  const _hoisted_7$1 = /*#__PURE__*/vue.createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
  const _hoisted_8$1 = { key: 3 };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_icon = vue.resolveComponent("b-icon");
    const _component_BPaginationButton = vue.resolveComponent("BPaginationButton");

    return (vue.openBlock(), vue.createBlock("nav", {
      class: ["pagination", $options.rootClasses]
    }, [
      (_ctx.$slots.previous)
        ? vue.renderSlot(_ctx.$slots, "previous", {
            key: 0,
            page: $options.getPage($props.modelValue - 1, {
                  disabled: !$options.hasPrev,
                  class: 'pagination-previous',
                  'aria-label': $props.ariaPreviousLabel
              })
          }, () => [
            vue.createVNode(_component_b_icon, {
              icon: $props.iconPrev,
              pack: $props.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8 /* PROPS */, ["icon", "pack"])
          ])
        : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
            key: 1,
            class: "pagination-previous",
            disabled: !$options.hasPrev,
            page: $options.getPage($props.modelValue - 1),
            "aria-label": $props.ariaPreviousLabel
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_b_icon, {
                icon: $props.iconPrev,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["disabled", "page", "aria-label"])),
      (_ctx.$slots.next)
        ? vue.renderSlot(_ctx.$slots, "next", {
            key: 2,
            page: $options.getPage($props.modelValue + 1, {
                  disabled: !$options.hasNext,
                  class: 'pagination-next',
                  'aria-label': $props.ariaNextLabel
              })
          }, () => [
            vue.createVNode(_component_b_icon, {
              icon: $props.iconNext,
              pack: $props.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8 /* PROPS */, ["icon", "pack"])
          ])
        : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
            key: 3,
            class: "pagination-next",
            disabled: !$options.hasNext,
            page: $options.getPage($props.modelValue + 1),
            "aria-label": $props.ariaNextLabel
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_b_icon, {
                icon: $props.iconNext,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["disabled", "page", "aria-label"])),
      ($props.simple)
        ? (vue.openBlock(), vue.createBlock("small", _hoisted_1$2, [
            ($props.perPage == 1)
              ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                  vue.createTextVNode(vue.toDisplayString($options.firstItem) + " / " + vue.toDisplayString($props.total), 1 /* TEXT */)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                  vue.createTextVNode(vue.toDisplayString($options.firstItem) + "-" + vue.toDisplayString(Math.min($props.modelValue * $props.perPage, $props.total)) + " / " + vue.toDisplayString($props.total), 1 /* TEXT */)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
          ]))
        : (vue.openBlock(), vue.createBlock("ul", _hoisted_2$2, [
            vue.createCommentVNode("First"),
            ($options.hasFirst)
              ? (vue.openBlock(), vue.createBlock("li", _hoisted_3$2, [
                  (_ctx.$slots.default)
                    ? vue.renderSlot(_ctx.$slots, "default", {
                        key: 0,
                        page: $options.getPage(1)
                      })
                    : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                        key: 1,
                        page: $options.getPage(1)
                      }, null, 8 /* PROPS */, ["page"]))
                ]))
              : vue.createCommentVNode("v-if", true),
            ($options.hasFirstEllipsis)
              ? (vue.openBlock(), vue.createBlock("li", _hoisted_4$2, [
                  _hoisted_5$1
                ]))
              : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode("Pages"),
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.pagesInRange, (page) => {
              return (vue.openBlock(), vue.createBlock("li", {
                key: page.number
              }, [
                (_ctx.$slots.default)
                  ? vue.renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      page: page
                    })
                  : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                      key: 1,
                      page: page
                    }, null, 8 /* PROPS */, ["page"]))
              ]))
            }), 128 /* KEYED_FRAGMENT */)),
            vue.createCommentVNode("Last"),
            ($options.hasLastEllipsis)
              ? (vue.openBlock(), vue.createBlock("li", _hoisted_6$1, [
                  _hoisted_7$1
                ]))
              : vue.createCommentVNode("v-if", true),
            ($options.hasLast)
              ? (vue.openBlock(), vue.createBlock("li", _hoisted_8$1, [
                  (_ctx.$slots.default)
                    ? vue.renderSlot(_ctx.$slots, "default", {
                        key: 0,
                        page: $options.getPage($options.pageCount)
                      })
                    : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                        key: 1,
                        page: $options.getPage($options.pageCount)
                      }, null, 8 /* PROPS */, ["page"]))
                ]))
              : vue.createCommentVNode("v-if", true)
          ]))
    ], 2 /* CLASS */))
  }

  script$2.render = render$2;
  script$2.__file = "src/components/pagination/Pagination.vue";

  var script$1 = {
      name: 'BTablePagination',
      components: {
          [script$2.name]: script$2
      },
      props: {
          paginated: Boolean,
          total: [Number, String],
          perPage: [Number, String],
          currentPage: [Number, String],
          paginationSimple: Boolean,
          paginationSize: String,
          rounded: Boolean,
          iconPack: String,
          ariaNextLabel: String,
          ariaPreviousLabel: String,
          ariaPageLabel: String,
          ariaCurrentLabel: String
      },
      emits: ['page-change', 'update:currentPage'],
      data() {
          return {
              newCurrentPage: this.currentPage
          }
      },
      watch: {
          currentPage(newVal) {
              this.newCurrentPage = newVal;
          }
      },
      methods: {
          /**
          * Paginator change listener.
          */
          pageChanged(page) {
              this.newCurrentPage = page > 0 ? page : 1;
              this.$emit('update:currentPage', this.newCurrentPage);
              this.$emit('page-change', this.newCurrentPage);
          }
      }
  };

  const _hoisted_1$1 = { class: "top level" };
  const _hoisted_2$1 = { class: "level-left" };
  const _hoisted_3$1 = { class: "level-right" };
  const _hoisted_4$1 = {
    key: 0,
    class: "level-item"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_pagination = vue.resolveComponent("b-pagination");

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
      vue.createVNode("div", _hoisted_2$1, [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      vue.createVNode("div", _hoisted_3$1, [
        ($props.paginated)
          ? (vue.openBlock(), vue.createBlock("div", _hoisted_4$1, [
              vue.createVNode(_component_b_pagination, {
                "icon-pack": $props.iconPack,
                total: $props.total,
                "per-page": $props.perPage,
                simple: $props.paginationSimple,
                size: $props.paginationSize,
                "model-value": $data.newCurrentPage,
                rounded: $props.rounded,
                onChange: $options.pageChanged,
                "aria-next-label": $props.ariaNextLabel,
                "aria-previous-label": $props.ariaPreviousLabel,
                "aria-page-label": $props.ariaPageLabel,
                "aria-current-label": $props.ariaCurrentLabel
              }, null, 8 /* PROPS */, ["icon-pack", "total", "per-page", "simple", "size", "model-value", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
            ]))
          : vue.createCommentVNode("v-if", true)
      ])
    ]))
  }

  script$1.render = render$1;
  script$1.__file = "src/components/table/TablePagination.vue";

  var tinyEmitter = {exports: {}};

  function E () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  tinyEmitter.exports = E;
  tinyEmitter.exports.TinyEmitter = E;

  var Emitter = tinyEmitter.exports;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function mockTableColumn(table, column) {
    var eventEmitter = new Emitter();
    var defaultProps = {
      label: undefined,
      customKey: undefined,
      field: undefined,
      meta: undefined,
      width: undefined,
      numeric: undefined,
      centered: undefined,
      searchable: undefined,
      sortable: undefined,
      visible: true,
      subheading: undefined,
      customSort: undefined,
      customSearch: undefined,
      sticky: undefined,
      headerSelectable: undefined,
      headerClass: undefined,
      thAttrs: function thAttrs() {
        return {};
      },
      tdAttrs: function tdAttrs() {
        return {};
      }
    };
    return _objectSpread(_objectSpread(_objectSpread({}, defaultProps), column), {}, {
      // data
      parent: table,
      newKey: column.customKey || column.label,
      _isTableColumn: true,
      // inject
      $table: table,

      // computed
      get thClasses() {
        var attrs = this.thAttrs(this);
        var classes = [this.headerClass, {
          'is-sortable': this.sortable,
          'is-sticky': this.sticky,
          'is-unselectable': this.isHeaderUnSelectable
        }];

        if (attrs && attrs.class) {
          classes.push(attrs.class);
        }

        return classes;
      },

      get thStyle() {
        var attrs = this.thAttrs(this);
        var style = [this.style];

        if (attrs && attrs.style) {
          style.push(attrs.style);
        }

        return style;
      },

      get rootClasses() {
        return [this.cellClass, {
          'has-text-right': this.numeric && !this.centered,
          'has-text-centered': this.centered,
          'is-sticky': this.sticky
        }];
      },

      get style() {
        return {
          width: toCssWidth(this.width)
        };
      },

      get hasDefaultSlot() {
        return !!this.$scopedSlots.default;
      },

      get isHeaderUnSelectable() {
        return !this.headerSelectable && this.sortable;
      },

      // methods
      getRootClasses: function getRootClasses(row) {
        var attrs = this.tdAttrs(row, this);
        var classes = [this.rootClasses];

        if (attrs && attrs.class) {
          classes.push(attrs.class);
        }

        return classes;
      },
      getRootStyle: function getRootStyle(row) {
        var attrs = this.tdAttrs(row, this);
        var style = [];

        if (attrs && attrs.style) {
          style.push(attrs.style);
        }

        return style;
      },
      $on: function $on() {
        return eventEmitter.on.apply(eventEmitter, arguments);
      },
      $once: function $once() {
        return eventEmitter.once.apply(eventEmitter, arguments);
      },
      $off: function $off() {
        return eventEmitter.off.apply(eventEmitter, arguments);
      },
      $emit: function $emit() {
        return eventEmitter.emit.apply(eventEmitter, arguments);
      },
      // special fields
      _isVue: true,
      $slots: {
        default: function _default(props) {
          var vnode = vue.h('span', {
            innerHTML: getValueByPath(props.row, column.field)
          });
          return [vnode];
        }
      }
    });
  }

  var script = {
      name: 'BTable',
      components: {
          [script$a.name]: script$a,
          [script$9.name]: script$9,
          [script$8.name]: script$8,
          [script$7.name]: script$7,
          [SlotComponent.name]: SlotComponent,
          [script$5.name]: script$5,
          [script$4.name]: script$4,
          [script$1.name]: script$1
      },
      inheritAttrs: false,
      provide() {
          return {
              $table: this
          }
      },
      props: {
          data: {
              type: Array,
              default: () => []
          },
          columns: {
              type: Array,
              default: () => []
          },
          bordered: Boolean,
          striped: Boolean,
          narrowed: Boolean,
          hoverable: Boolean,
          loading: Boolean,
          detailed: Boolean,
          checkable: Boolean,
          headerCheckable: {
              type: Boolean,
              default: true
          },
          checkboxPosition: {
              type: String,
              default: 'left',
              validator: (value) => {
                  return [
                      'left',
                      'right'
                  ].indexOf(value) >= 0
              }
          },
          stickyCheckbox: {
              type: Boolean,
              default: false
          },
          selected: Object,
          isRowSelectable: {
              type: Function,
              default: () => true
          },
          focusable: Boolean,
          customIsChecked: Function,
          isRowCheckable: {
              type: Function,
              default: () => true
          },
          checkedRows: {
              type: Array,
              default: () => []
          },
          mobileCards: {
              type: Boolean,
              default: true
          },
          defaultSort: [String, Array],
          defaultSortDirection: {
              type: String,
              default: 'asc'
          },
          sortIcon: {
              type: String,
              default: 'arrow-up'
          },
          sortIconSize: {
              type: String,
              default: 'is-small'
          },
          sortMultiple: {
              type: Boolean,
              default: false
          },
          sortMultipleData: {
              type: Array,
              default: () => []
          },
          sortMultipleKey: {
              type: String,
              default: null
          },
          paginated: Boolean,
          currentPage: {
              type: Number,
              default: 1
          },
          perPage: {
              type: [Number, String],
              default: 20
          },
          showDetailIcon: {
              type: Boolean,
              default: true
          },
          paginationPosition: {
              type: String,
              default: 'bottom',
              validator: (value) => {
                  return [
                      'bottom',
                      'top',
                      'both'
                  ].indexOf(value) >= 0
              }
          },
          paginationRounded: Boolean,
          backendSorting: Boolean,
          backendFiltering: Boolean,
          rowClass: {
              type: Function,
              default: () => ''
          },
          openedDetailed: {
              type: Array,
              default: () => []
          },
          hasDetailedVisible: {
              type: Function,
              default: () => true
          },
          detailKey: {
              type: String,
              default: ''
          },
          detailTransition: {
              type: String,
              default: ''
          },
          customDetailRow: {
              type: Boolean,
              default: false
          },
          backendPagination: Boolean,
          total: {
              type: [Number, String],
              default: 0
          },
          iconPack: String,
          mobileSortPlaceholder: String,
          customRowKey: String,
          draggable: {
              type: Boolean,
              default: false
          },
          draggableColumn: {
              type: Boolean,
              default: false
          },
          scrollable: Boolean,
          ariaNextLabel: String,
          ariaPreviousLabel: String,
          ariaPageLabel: String,
          ariaCurrentLabel: String,
          stickyHeader: Boolean,
          height: [Number, String],
          filtersEvent: {
              type: String,
              default: ''
          },
          cardLayout: Boolean,
          showHeader: {
              type: Boolean,
              default: true
          },
          debounceSearch: Number
      },
      emits: [
          'cellclick',
          'check',
          'check-all',
          'click',
          'columndragend',
          'columndragleave',
          'columndragover',
          'columndragstart',
          'columndrop',
          'contextmenu',
          'dblclick',
          'details-close',
          'details-open',
          'dragend',
          'dragleave',
          'dragover',
          'dragstart',
          'drop',
          'filters-change',
          'page-change',
          'select',
          'sort',
          'sorting-priority-removed',
          'update:checkedRows',
          'update:currentPage',
          'update:openedDetailed',
          'update:selected'
      ],
      data() {
          return {
              sortMultipleDataLocal: [],
              getValueByPath,
              visibleDetailRows: this.openedDetailed,
              newData: this.data,
              newDataTotal: this.backendPagination ? this.total : this.data.length,
              newCheckedRows: [...this.checkedRows],
              lastCheckedRowIndex: null,
              newCurrentPage: this.currentPage,
              currentSortColumn: {},
              isAsc: true,
              filters: {},
              defaultSlots: [],
              firstTimeSort: true, // Used by first time initSort
              _isTable: true, // Used by TableColumn
              isDraggingRow: false,
              isDraggingColumn: false
          }
      },
      computed: {
          sortMultipleDataComputed() {
              return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
          },
          tableClasses() {
              return {
                  'is-bordered': this.bordered,
                  'is-striped': this.striped,
                  'is-narrow': this.narrowed,
                  'is-hoverable': (
                      (this.hoverable || this.focusable) &&
                      this.visibleData.length
                  )
              }
          },
          tableWrapperClasses() {
              return {
                  'has-mobile-cards': this.mobileCards,
                  'has-sticky-header': this.stickyHeader,
                  'is-card-list': this.cardLayout,
                  'table-container': this.isScrollable
              }
          },
          tableStyle() {
              return {
                  height: toCssWidth(this.height)
              }
          },

          /**
          * Splitted data based on the pagination.
          */
          visibleData() {
              if (!this.paginated) return this.newData

              const currentPage = this.newCurrentPage;
              const perPage = this.perPage;

              if (this.newData.length <= perPage) {
                  return this.newData
              } else {
                  const start = (currentPage - 1) * perPage;
                  const end = parseInt(start, 10) + parseInt(perPage, 10);
                  return this.newData.slice(start, end)
              }
          },

          visibleColumns() {
              if (!this.newColumns) return this.newColumns
              return this.newColumns.filter((column) => {
                  return column.visible || column.visible === undefined
              })
          },

          /**
          * Check if all rows in the page are checked.
          */
          isAllChecked() {
              const validVisibleData = this.visibleData.filter(
                  (row) => this.isRowCheckable(row));
              if (validVisibleData.length === 0) return false
              const isAllChecked = validVisibleData.some((currentVisibleRow) => {
                  return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
              });
              return !isAllChecked
          },

          /**
          * Check if all rows in the page are checkable.
          */
          isAllUncheckable() {
              const validVisibleData = this.visibleData.filter(
                  (row) => this.isRowCheckable(row));
              return validVisibleData.length === 0
          },

          /**
          * Check if has any sortable column.
          */
          hasSortablenewColumns() {
              return this.newColumns.some((column) => {
                  return column.sortable
              })
          },

          /**
          * Check if has any searchable column.
          */
          hasSearchablenewColumns() {
              return this.newColumns.some((column) => {
                  return column.searchable
              })
          },

          /**
          * Check if has any column using subheading.
          */
          hasCustomSubheadings() {
              if (this.$slots && this.$slots.subheading) return true
              return this.newColumns.some((column) => {
                  return column.subheading || column.$slots.subheading
              })
          },

          /**
          * Return total column count based if it's checkable or expanded
          */
          columnCount() {
              let count = this.visibleColumns.length;
              count += this.checkable ? 1 : 0;
              count += (this.detailed && this.showDetailIcon) ? 1 : 0;

              return count
          },

          /**
          * return if detailed row tabled
          * will be with chevron column & icon or not
          */
          showDetailRowIcon() {
              return this.detailed && this.showDetailIcon
          },

          /**
          * return if scrollable table
          */
          isScrollable() {
              if (this.scrollable) return true
              if (!this.newColumns) return false
              return this.newColumns.some((column) => {
                  return column.sticky
              })
          },

          newColumns() {
              if (this.columns && this.columns.length) {
                  return this.columns.map((column) => {
                      return mockTableColumn(this, column)
                  })
              }
              return this.defaultSlots
          },
          canDragRow() {
              return this.draggable && !this.isDraggingColumn
          },
          canDragColumn() {
              return this.draggableColumn && !this.isDraggingRow
          }
      },
      watch: {
          /**
          * When data prop change:
          *   1. Update internal value.
          *   2. Filter data if it's not backend-filtered.
          *   3. Sort again if it's not backend-sorted.
          *   4. Set new total if it's not backend-paginated.
          */
          data(value) {
              this.newData = value;
              if (!this.backendFiltering) {
                  this.newData = value.filter(
                      (row) => this.isRowFiltered(row));
              }
              if (!this.backendSorting) {
                  this.sort(this.currentSortColumn, true);
              }
              if (!this.backendPagination) {
                  this.newDataTotal = this.newData.length;
              }
          },

          /**
          * When Pagination total change, update internal total
          * only if it's backend-paginated.
          */
          total(newTotal) {
              if (!this.backendPagination) return

              this.newDataTotal = newTotal;
          },

          currentPage(newVal) {
              this.newCurrentPage = newVal;
          },

          newCurrentPage(newVal) {
              this.$emit('update:currentPage', newVal);
          },

          /**
          * When checkedRows prop change, update internal value without
          * mutating original data.
          */
          // Using deep watching because in vue3 array mutations doesn't trigger watchers
          checkedRows: {
              handler(rows) {
                  this.newCheckedRows = [...rows];
              },
              deep: true
          },

          /*
          newColumns(value) {
              this.checkSort()
          },
          */

          debounceSearch: {
              handler(value) {
                  this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
              },
              immediate: true
          },

          filters: {
              handler(value) {
                  if (this.debounceSearch) {
                      this.debouncedHandleFiltersChange(value);
                  } else {
                      this.handleFiltersChange(value);
                  }
              },
              deep: true
          },

          /**
          * When the user wants to control the detailed rows via props.
          * Or wants to open the details of certain row with the router for example.
          */
          openedDetailed(expandedRows) {
              this.visibleDetailRows = expandedRows;
          }
      },
      methods: {
          onFiltersEvent(event) {
              this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
          },
          handleFiltersChange(value) {
              if (this.backendFiltering) {
                  this.$emit('filters-change', value);
              } else {
                  this.newData = this.data.filter(
                      (row) => this.isRowFiltered(row));
                  if (!this.backendPagination) {
                      this.newDataTotal = this.newData.length;
                  }
                  if (!this.backendSorting) {
                      if (this.sortMultiple &&
                          this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
                          this.doSortMultiColumn();
                      } else if (Object.keys(this.currentSortColumn).length > 0) {
                          this.doSortSingleColumn(this.currentSortColumn);
                      }
                  }
              }
          },
          findIndexOfSortData(column) {
              const sortObj = this.sortMultipleDataComputed.filter((i) =>
                  i.field === column.field)[0];
              return this.sortMultipleDataComputed.indexOf(sortObj) + 1
          },
          removeSortingPriority(column) {
              if (this.backendSorting) {
                  this.$emit('sorting-priority-removed', column.field);
              } else {
                  this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                      (priority) => priority.field !== column.field);

                  const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                      return (i.order && i.order === 'desc' ? '-' : '') + i.field
                  });
                  this.newData = multiColumnSort(this.newData, formattedSortingPriority);
              }
          },
          resetMultiSorting() {
              this.sortMultipleDataLocal = [];
              this.currentSortColumn = {};
              this.newData = this.data;
          },
          /**
          * Sort an array by key without mutating original data.
          * Call the user sort function if it was passed.
          */
          sortBy(array, key, fn, isAsc) {
              let sorted = [];
              // Sorting without mutating original data
              if (fn && typeof fn === 'function') {
                  sorted = [...array].sort((a, b) => fn(a, b, isAsc));
              } else {
                  sorted = [...array].sort((a, b) => {
                      // Get nested values from objects
                      let newA = getValueByPath(a, key);
                      let newB = getValueByPath(b, key);

                      // sort boolean type
                      if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                          return isAsc ? newA - newB : newB - newA
                      }

                      if (!newA && newA !== 0) return 1
                      if (!newB && newB !== 0) return -1
                      if (newA === newB) return 0

                      newA = (typeof newA === 'string')
                          ? newA.toUpperCase()
                          : newA;
                      newB = (typeof newB === 'string')
                          ? newB.toUpperCase()
                          : newB;

                      return isAsc
                          ? newA > newB ? 1 : -1
                          : newA > newB ? -1 : 1
                  });
              }

              return sorted
          },

          sortMultiColumn(column) {
              this.currentSortColumn = {};
              if (!this.backendSorting) {
                  const existingPriority = this.sortMultipleDataLocal.filter((i) =>
                      i.field === column.field)[0];
                  if (existingPriority) {
                      existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc';
                  } else {
                      this.sortMultipleDataLocal.push(
                          { field: column.field, order: column.isAsc }
                      );
                  }
                  this.doSortMultiColumn();
              }
          },

          doSortMultiColumn() {
              const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                  return (i.order && i.order === 'desc' ? '-' : '') + i.field
              });
              this.newData = multiColumnSort(this.newData, formattedSortingPriority);
          },

          /**
          * Sort the column.
          * Toggle current direction on column if it's sortable
          * and not just updating the prop.
          */
          sort(column, updatingData = false, event = null) {
              if (
                  // if backend sorting is enabled, just emit the sort press like usual
                  // if the correct key combination isnt pressed, sort like usual
                  !this.backendSorting &&
                  this.sortMultiple &&
                  ((this.sortMultipleKey && event[this.sortMultipleKey]) || !this.sortMultipleKey)
              ) {
                  if (updatingData) {
                      this.doSortMultiColumn();
                  } else {
                      this.sortMultiColumn(column);
                  }
              } else {
                  if (!column || !column.sortable) return

                  // sort multiple is enabled but the correct key combination isnt pressed so reset
                  if (this.sortMultiple) {
                      this.sortMultipleDataLocal = [];
                  }

                  if (!updatingData) {
                      this.isAsc = column === this.currentSortColumn
                          ? !this.isAsc
                          : (this.defaultSortDirection.toLowerCase() !== 'desc');
                  }
                  if (!this.firstTimeSort) {
                      this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
                  }
                  if (!this.backendSorting) {
                      this.doSortSingleColumn(column);
                  }
                  this.currentSortColumn = column;
              }
          },

          doSortSingleColumn(column) {
              this.newData = this.sortBy(
                  this.newData,
                  column.field,
                  column.customSort,
                  this.isAsc
              );
          },

          isRowSelected(row, selected) {
              if (!selected) {
                  return false
              }
              if (this.customRowKey) {
                  return row[this.customRowKey] === selected[this.customRowKey]
              }
              return row === selected
          },

          /**
          * Check if the row is checked (is added to the array).
          */
          isRowChecked(row) {
              return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
          },

          /**
          * Remove a checked row from the array.
          */
          removeCheckedRow(row) {
              const index = indexOf(this.newCheckedRows, row, this.customIsChecked);
              if (index >= 0) {
                  this.newCheckedRows.splice(index, 1);
              }
          },

          /**
          * Header checkbox click listener.
          * Add or remove all rows in current page.
          */
          checkAll() {
              const isAllChecked = this.isAllChecked;
              this.visibleData.forEach((currentRow) => {
                  if (this.isRowCheckable(currentRow)) {
                      this.removeCheckedRow(currentRow);
                  }
                  if (!isAllChecked) {
                      if (this.isRowCheckable(currentRow)) {
                          this.newCheckedRows.push(currentRow);
                      }
                  }
              });

              this.$emit('check', this.newCheckedRows);
              this.$emit('check-all', this.newCheckedRows);

              // Emit checked rows to update user variable
              this.$emit('update:checkedRows', this.newCheckedRows);
          },

          /**
          * Row checkbox click listener.
          */
          checkRow(row, index, event) {
              if (!this.isRowCheckable(row)) return
              const lastIndex = this.lastCheckedRowIndex;
              this.lastCheckedRowIndex = index;

              if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
                  this.shiftCheckRow(row, index, lastIndex);
              } else if (!this.isRowChecked(row)) {
                  this.newCheckedRows.push(row);
              } else {
                  this.removeCheckedRow(row);
              }

              this.$emit('check', this.newCheckedRows, row);

              // Emit checked rows to update user variable
              this.$emit('update:checkedRows', this.newCheckedRows);
          },

          /**
           * Check row when shift is pressed.
           */
          shiftCheckRow(row, index, lastCheckedRowIndex) {
              // Get the subset of the list between the two indicies
              const subset = this.visibleData.slice(
                  Math.min(index, lastCheckedRowIndex),
                  Math.max(index, lastCheckedRowIndex) + 1
              );

              // Determine the operation based on the state of the clicked checkbox
              const shouldCheck = !this.isRowChecked(row);

              subset.forEach((item) => {
                  this.removeCheckedRow(item);
                  if (shouldCheck && this.isRowCheckable(item)) {
                      this.newCheckedRows.push(item);
                  }
              });
          },

          /**
          * Row click listener.
          * Emit all necessary events.
          */
          selectRow(row, index) {
              this.$emit('click', row);

              if (this.selected === row) return
              if (!this.isRowSelectable(row)) return

              // Emit new and old row
              this.$emit('select', row, this.selected);

              // Emit new row to update user variable
              this.$emit('update:selected', row);
          },

          /**
          * Toggle to show/hide details slot
          */
          toggleDetails(obj) {
              const found = this.isVisibleDetailRow(obj);

              if (found) {
                  this.closeDetailRow(obj);
                  this.$emit('details-close', obj);
              } else {
                  this.openDetailRow(obj);
                  this.$emit('details-open', obj);
              }

              // Syncs the detailed rows with the parent component
              this.$emit('update:openedDetailed', this.visibleDetailRows);
          },

          openDetailRow(obj) {
              const index = this.handleDetailKey(obj);
              this.visibleDetailRows.push(index);
          },

          closeDetailRow(obj) {
              const index = this.handleDetailKey(obj);
              const i = this.visibleDetailRows.indexOf(index);
              this.visibleDetailRows.splice(i, 1);
          },

          isVisibleDetailRow(obj) {
              const index = this.handleDetailKey(obj);
              const result = this.visibleDetailRows.indexOf(index) >= 0;
              return result
          },

          isActiveDetailRow(row) {
              return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
          },

          isActiveCustomDetailRow(row) {
              return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
          },

          isRowFiltered(row) {
              for (const key in this.filters) {
                  // remove key if empty
                  if (!this.filters[key]) {
                      delete this.filters[key];
                      return true
                  }
                  const input = this.filters[key];
                  const column = this.newColumns.filter((c) => c.field === key)[0];
                  if (column && column.customSearch && typeof column.customSearch === 'function') {
                      return column.customSearch(row, input)
                  } else {
                      const value = this.getValueByPath(row, key);
                      if (value == null) return false
                      if (Number.isInteger(value)) {
                          if (value !== Number(input)) return false
                      } else {
                          const re = new RegExp(escapeRegExpChars(input), 'i');
                          if (!re.test(value)) return false
                      }
                  }
              }
              return true
          },

          /**
          * When the detailKey is defined we use the object[detailKey] as index.
          * If not, use the object reference by default.
          */
          handleDetailKey(index) {
              const key = this.detailKey;
              return !key.length || !index
                  ? index
                  : index[key]
          },

          checkPredefinedDetailedRows() {
              const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
              if (defaultExpandedRowsDefined && !this.detailKey.length) {
                  throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"')
              }
          },

          /**
          * Call initSort only first time (For example async data).
          */
          checkSort() {
              if (this.newColumns.length && this.firstTimeSort) {
                  this.initSort();
                  this.firstTimeSort = false;
              } else if (this.newColumns.length) {
                  if (Object.keys(this.currentSortColumn).length > 0) {
                      for (let i = 0; i < this.newColumns.length; i++) {
                          if (this.newColumns[i].field === this.currentSortColumn.field) {
                              this.currentSortColumn = this.newColumns[i];
                              break
                          }
                      }
                  }
              }
          },

          /**
          * Check if footer slot has custom content.
          *
          * Assumes that `$slots.footer` is specified.
          */
          hasCustomFooterSlot() {
              const footer = this.$slots.footer();
              if (footer.length > 1) return true

              // if a template is specified to `footer`, `footer.length` is 1
              // but should contain multiple elements.
              if (isFragment(footer[0])) return true

              const tag = footer[0].tag;
              if (tag !== 'th' && tag !== 'td') return false

              return true
          },

          /**
          * Check if bottom-left slot exists.
          */
          hasBottomLeftSlot() {
              return typeof this.$slots['bottom-left'] !== 'undefined'
          },

          /**
          * Table arrow keys listener, change selection.
          */
          pressedArrow(pos) {
              if (!this.visibleData.length) return

              let index = this.visibleData.indexOf(this.selected) + pos;

              // Prevent from going up from first and down from last
              index = index < 0
                  ? 0
                  : index > this.visibleData.length - 1
                      ? this.visibleData.length - 1
                      : index;

              const row = this.visibleData[index];

              if (!this.isRowSelectable(row)) {
                  let newIndex = null;
                  if (pos > 0) {
                      for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                          if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
                      }
                  } else {
                      for (let i = index; i >= 0 && newIndex === null; i--) {
                          if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
                      }
                  }
                  if (newIndex >= 0) {
                      this.selectRow(this.visibleData[newIndex]);
                  }
              } else {
                  this.selectRow(row);
              }
          },

          /**
          * Focus table element if has selected prop.
          */
          focus() {
              if (!this.focusable) return

              this.$el.querySelector('table').focus();
          },

          /**
          * Initial sorted column based on the default-sort prop.
          */
          initSort() {
              if (this.sortMultiple && this.sortMultipleData) {
                  this.sortMultipleData.forEach((column) => {
                      this.sortMultiColumn(column);
                  });
              } else {
                  if (!this.defaultSort) return

                  let sortField = '';
                  let sortDirection = this.defaultSortDirection;

                  if (Array.isArray(this.defaultSort)) {
                      sortField = this.defaultSort[0];
                      if (this.defaultSort[1]) {
                          sortDirection = this.defaultSort[1];
                      }
                  } else {
                      sortField = this.defaultSort;
                  }

                  const sortColumn = this.newColumns.filter(
                      (column) => (column.field === sortField))[0];
                  if (sortColumn) {
                      this.isAsc = sortDirection.toLowerCase() !== 'desc';
                      this.sort(sortColumn, true);
                  }
              }
          },
          /**
          * Emits drag start event (row)
          */
          handleDragStart(event, row, index) {
              if (!this.canDragRow) return
              this.isDraggingRow = true;
              this.$emit('dragstart', { event, row, index });
          },
          /**
          * Emits drag leave event (row)
          */
          handleDragEnd(event, row, index) {
              if (!this.canDragRow) return
              this.isDraggingRow = false;
              this.$emit('dragend', { event, row, index });
          },
          /**
          * Emits drop event (row)
          */
          handleDrop(event, row, index) {
              if (!this.canDragRow) return
              this.$emit('drop', { event, row, index });
          },
          /**
          * Emits drag over event (row)
          */
          handleDragOver(event, row, index) {
              if (!this.canDragRow) return
              this.$emit('dragover', { event, row, index });
          },
          /**
          * Emits drag leave event (row)
          */
          handleDragLeave(event, row, index) {
              if (!this.canDragRow) return
              this.$emit('dragleave', { event, row, index });
          },

          emitEventForRow(eventName, event, row) {
              // eventName should not be in `emits` because it is never included
              // in `$attrs` if it is listed in `emits`.
              return this.$attrs[`on${eventName}`] ? this.$emit(eventName, row, event) : null
          },

          /**
          * Emits drag start event (column)
          */
          handleColumnDragStart(event, column, index) {
              if (!this.canDragColumn) return
              this.isDraggingColumn = true;
              this.$emit('columndragstart', { event, column, index });
          },

          /**
          * Emits drag leave event (column)
          */
          handleColumnDragEnd(event, column, index) {
              if (!this.canDragColumn) return
              this.isDraggingColumn = false;
              this.$emit('columndragend', { event, column, index });
          },

          /**
          * Emits drop event (column)
          */
          handleColumnDrop(event, column, index) {
              if (!this.canDragColumn) return
              this.$emit('columndrop', { event, column, index });
          },

          /**
          * Emits drag over event (column)
          */
          handleColumnDragOver(event, column, index) {
              if (!this.canDragColumn) return
              this.$emit('columndragover', { event, column, index });
          },

          /**
          * Emits drag leave event (column)
          */
          handleColumnDragLeave(event, column, index) {
              if (!this.canDragColumn) return
              this.$emit('columndragleave', { event, column, index });
          },

          _registerTableColumn(column) {
              if (column._isTableColumn) {
                  this.defaultSlots.push(column);
              }
          },
          _unregisterTableColumn(column) {
              const index = this.defaultSlots.indexOf(column);
              if (index !== -1) {
                  this.defaultSlots.splice(index, 1);
              }
          }
      },
      mounted() {
          this.checkPredefinedDetailedRows();
          this.checkSort();
      }
  };

  const _hoisted_1 = { class: "b-table" };
  const _hoisted_2 = { key: 0 };
  const _hoisted_3 = {
    key: 0,
    width: "40px"
  };
  const _hoisted_4 = {
    key: 1,
    class: "is-relative"
  };
  const _hoisted_5 = {
    key: 0,
    class: "is-subheading"
  };
  const _hoisted_6 = {
    key: 0,
    width: "40px"
  };
  const _hoisted_7 = { key: 1 };
  const _hoisted_8 = { key: 2 };
  const _hoisted_9 = { key: 1 };
  const _hoisted_10 = {
    key: 0,
    width: "40px"
  };
  const _hoisted_11 = { key: 1 };
  const _hoisted_12 = { class: "th-wrap" };
  const _hoisted_13 = { key: 2 };
  const _hoisted_14 = {
    key: 0,
    class: "chevron-cell"
  };
  const _hoisted_15 = {
    key: 0,
    class: "detail"
  };
  const _hoisted_16 = { class: "detail-container" };
  const _hoisted_17 = {
    key: 0,
    class: "is-empty"
  };
  const _hoisted_18 = { key: 1 };
  const _hoisted_19 = { class: "table-footer" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_table_mobile_sort = vue.resolveComponent("b-table-mobile-sort");
    const _component_b_table_pagination = vue.resolveComponent("b-table-pagination");
    const _component_b_checkbox = vue.resolveComponent("b-checkbox");
    const _component_b_slot_component = vue.resolveComponent("b-slot-component");
    const _component_b_icon = vue.resolveComponent("b-icon");
    const _component_b_input = vue.resolveComponent("b-input");
    const _component_b_loading = vue.resolveComponent("b-loading");

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default"),
      ($props.mobileCards && $options.hasSortablenewColumns)
        ? (vue.openBlock(), vue.createBlock(_component_b_table_mobile_sort, {
            key: 0,
            "current-sort-column": $data.currentSortColumn,
            "sort-multiple": $props.sortMultiple,
            "sort-multiple-data": $options.sortMultipleDataComputed,
            "is-asc": $data.isAsc,
            columns: $options.newColumns,
            placeholder: $props.mobileSortPlaceholder,
            "icon-pack": $props.iconPack,
            "sort-icon": $props.sortIcon,
            "sort-icon-size": $props.sortIconSize,
            onSort: _cache[1] || (_cache[1] = (column, event) => $options.sort(column, null, event)),
            onRemovePriority: _cache[2] || (_cache[2] = (column) => $options.removeSortingPriority(column))
          }, null, 8 /* PROPS */, ["current-sort-column", "sort-multiple", "sort-multiple-data", "is-asc", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size"]))
        : vue.createCommentVNode("v-if", true),
      ($props.paginated && ($props.paginationPosition === 'top' || $props.paginationPosition === 'both'))
        ? vue.renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
            vue.createVNode(_component_b_table_pagination, vue.mergeProps(_ctx.$attrs, {
              "per-page": $props.perPage,
              paginated: $props.paginated,
              rounded: $props.paginationRounded,
              "icon-pack": $props.iconPack,
              total: $data.newDataTotal,
              "current-page": $data.newCurrentPage,
              "onUpdate:current-page": _cache[3] || (_cache[3] = $event => ($data.newCurrentPage = $event)),
              "aria-next-label": $props.ariaNextLabel,
              "aria-previous-label": $props.ariaPreviousLabel,
              "aria-page-label": $props.ariaPageLabel,
              "aria-current-label": $props.ariaCurrentLabel,
              onPageChange: _cache[4] || (_cache[4] = (event) => _ctx.$emit('page-change', event))
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "top-left")
              ]),
              _: 3 /* FORWARDED */
            }, 16 /* FULL_PROPS */, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
          ])
        : vue.createCommentVNode("v-if", true),
      vue.createVNode("div", {
        class: ["table-wrapper", $options.tableWrapperClasses],
        style: $options.tableStyle
      }, [
        vue.createVNode("table", {
          class: ["table", $options.tableClasses],
          tabindex: !$props.focusable ? false : 0,
          onKeydown: [
            _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers($event => ($options.pressedArrow(-1)), ["self","prevent"]), ["up"])),
            _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers($event => ($options.pressedArrow(1)), ["self","prevent"]), ["down"]))
          ]
        }, [
          ($options.newColumns.length && $props.showHeader)
            ? (vue.openBlock(), vue.createBlock("thead", _hoisted_2, [
                vue.createVNode("tr", null, [
                  ($options.showDetailRowIcon)
                    ? (vue.openBlock(), vue.createBlock("th", _hoisted_3))
                    : vue.createCommentVNode("v-if", true),
                  ($props.checkable && $props.checkboxPosition === 'left')
                    ? (vue.openBlock(), vue.createBlock("th", {
                        key: 1,
                        class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                      }, [
                        ($props.headerCheckable)
                          ? (vue.openBlock(), vue.createBlock(_component_b_checkbox, {
                              key: 0,
                              "model-value": $options.isAllChecked,
                              disabled: $options.isAllUncheckable,
                              onChange: $options.checkAll
                            }, null, 8 /* PROPS */, ["model-value", "disabled", "onChange"]))
                          : vue.createCommentVNode("v-if", true)
                      ], 2 /* CLASS */))
                    : vue.createCommentVNode("v-if", true),
                  (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, index) => {
                    return (vue.openBlock(), vue.createBlock("th", vue.mergeProps({
                      key: column.newKey + ':' + index + 'header'
                    }, column.thAttrs(column), {
                      class: [column.thClasses, {
                                  'is-current-sort': !$props.sortMultiple && $data.currentSortColumn === column,
                              }],
                      style: column.thStyle,
                      onClick: vue.withModifiers($event => ($options.sort(column, null, $event)), ["stop"]),
                      draggable: $options.canDragColumn,
                      onDragstart: $event => ($options.handleColumnDragStart($event, column, index)),
                      onDragend: $event => ($options.handleColumnDragEnd($event, column, index)),
                      onDrop: $event => ($options.handleColumnDrop($event, column, index)),
                      onDragover: $event => ($options.handleColumnDragOver($event, column, index)),
                      onDragleave: $event => ($options.handleColumnDragLeave($event, column, index))
                    }), [
                      vue.createVNode("div", {
                        class: ["th-wrap", {
                                      'is-numeric': column.numeric,
                                      'is-centered': column.centered
                                  }]
                      }, [
                        (column.$slots.header)
                          ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                              key: 0,
                              component: column,
                              scoped: "",
                              name: "header",
                              tag: "span",
                              props: { column, index }
                            }, null, 8 /* PROPS */, ["component", "props"]))
                          : (vue.openBlock(), vue.createBlock("span", _hoisted_4, [
                              vue.createTextVNode(vue.toDisplayString(column.label) + " ", 1 /* TEXT */),
                              ($props.sortMultiple &&
                                                  $options.sortMultipleDataComputed &&
                                                  $options.sortMultipleDataComputed.length > 0 &&
                                                  $options.sortMultipleDataComputed.filter(i =>
                                                      i.field === column.field).length > 0)
                                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                    vue.createVNode(_component_b_icon, {
                                      icon: $props.sortIcon,
                                      pack: $props.iconPack,
                                      both: "",
                                      size: $props.sortIconSize,
                                      class: {
                                                      'is-desc': $options.sortMultipleDataComputed
                                                          .filter(i => i.field === column.field)[0]
                                                          .order === 'desc'}
                                    }, null, 8 /* PROPS */, ["icon", "pack", "size", "class"]),
                                    vue.createTextVNode(" " + vue.toDisplayString($options.findIndexOfSortData(column)) + " ", 1 /* TEXT */),
                                    vue.createVNode("button", {
                                      class: "delete is-small multi-sort-cancel-icon",
                                      type: "button",
                                      onClick: vue.withModifiers($event => ($options.removeSortingPriority(column)), ["stop"])
                                    }, null, 8 /* PROPS */, ["onClick"])
                                  ], 64 /* STABLE_FRAGMENT */))
                                : (vue.openBlock(), vue.createBlock(_component_b_icon, {
                                    key: 1,
                                    icon: $props.sortIcon,
                                    pack: $props.iconPack,
                                    both: "",
                                    size: $props.sortIconSize,
                                    class: ["sort-icon", {
                                                  'is-desc': !$data.isAsc,
                                                  'is-invisible': $data.currentSortColumn !== column
                                              }]
                                  }, null, 8 /* PROPS */, ["icon", "pack", "size", "class"]))
                            ]))
                      ], 2 /* CLASS */)
                    ], 16 /* FULL_PROPS */, ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"]))
                  }), 128 /* KEYED_FRAGMENT */)),
                  ($props.checkable && $props.checkboxPosition === 'right')
                    ? (vue.openBlock(), vue.createBlock("th", {
                        key: 2,
                        class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                      }, [
                        ($props.headerCheckable)
                          ? (vue.openBlock(), vue.createBlock(_component_b_checkbox, {
                              key: 0,
                              "model-value": $options.isAllChecked,
                              disabled: $options.isAllUncheckable,
                              onChange: $options.checkAll
                            }, null, 8 /* PROPS */, ["model-value", "disabled", "onChange"]))
                          : vue.createCommentVNode("v-if", true)
                      ], 2 /* CLASS */))
                    : vue.createCommentVNode("v-if", true)
                ]),
                ($options.hasCustomSubheadings)
                  ? (vue.openBlock(), vue.createBlock("tr", _hoisted_5, [
                      ($options.showDetailRowIcon)
                        ? (vue.openBlock(), vue.createBlock("th", _hoisted_6))
                        : vue.createCommentVNode("v-if", true),
                      ($props.checkable && $props.checkboxPosition === 'left')
                        ? (vue.openBlock(), vue.createBlock("th", _hoisted_7))
                        : vue.createCommentVNode("v-if", true),
                      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, index) => {
                        return (vue.openBlock(), vue.createBlock("th", {
                          key: column.newKey + ':' + index + 'subheading',
                          style: column.style
                        }, [
                          vue.createVNode("div", {
                            class: ["th-wrap", {
                                      'is-numeric': column.numeric,
                                      'is-centered': column.centered
                                  }]
                          }, [
                            (column.$slots.subheading)
                              ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                  key: 0,
                                  component: column,
                                  scoped: "",
                                  name: "subheading",
                                  tag: "span",
                                  props: { column, index }
                                }, null, 8 /* PROPS */, ["component", "props"]))
                              : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                                  vue.createTextVNode(vue.toDisplayString(column.subheading), 1 /* TEXT */)
                                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                          ], 2 /* CLASS */)
                        ], 4 /* STYLE */))
                      }), 128 /* KEYED_FRAGMENT */)),
                      ($props.checkable && $props.checkboxPosition === 'right')
                        ? (vue.openBlock(), vue.createBlock("th", _hoisted_8))
                        : vue.createCommentVNode("v-if", true)
                    ]))
                  : vue.createCommentVNode("v-if", true),
                ($options.hasSearchablenewColumns)
                  ? (vue.openBlock(), vue.createBlock("tr", _hoisted_9, [
                      ($options.showDetailRowIcon)
                        ? (vue.openBlock(), vue.createBlock("th", _hoisted_10))
                        : vue.createCommentVNode("v-if", true),
                      ($props.checkable && $props.checkboxPosition === 'left')
                        ? (vue.openBlock(), vue.createBlock("th", _hoisted_11))
                        : vue.createCommentVNode("v-if", true),
                      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, index) => {
                        return (vue.openBlock(), vue.createBlock("th", vue.mergeProps({
                          key: column.newKey + ':' + index + 'searchable'
                        }, column.thAttrs(column), {
                          style: column.thStyle,
                          class: {'is-sticky': column.sticky}
                        }), [
                          vue.createVNode("div", _hoisted_12, [
                            (column.searchable)
                              ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                  (column.$slots.searchable)
                                    ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                        key: 0,
                                        component: column,
                                        scoped: true,
                                        name: "searchable",
                                        tag: "span",
                                        props: { column, filters: $data.filters }
                                      }, null, 8 /* PROPS */, ["component", "props"]))
                                    : (vue.openBlock(), vue.createBlock(_component_b_input, {
                                        key: 1,
                                        [vue.toHandlerKey($props.filtersEvent)]: $options.onFiltersEvent,
                                        modelValue: $data.filters[column.field],
                                        "onUpdate:modelValue": $event => ($data.filters[column.field] = $event),
                                        type: column.numeric ? 'number' : 'text'
                                      }, null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue", "type"]))
                                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                              : vue.createCommentVNode("v-if", true)
                          ])
                        ], 16 /* FULL_PROPS */))
                      }), 128 /* KEYED_FRAGMENT */)),
                      ($props.checkable && $props.checkboxPosition === 'right')
                        ? (vue.openBlock(), vue.createBlock("th", _hoisted_13))
                        : vue.createCommentVNode("v-if", true)
                    ]))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createVNode("tbody", null, [
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleData, (row, index) => {
              return (vue.openBlock(), vue.createBlock(vue.Fragment, {
                key: $props.customRowKey ? row[$props.customRowKey] : index
              }, [
                vue.createVNode("tr", {
                  class: [$props.rowClass(row, index), {
                                  'is-selected': $options.isRowSelected(row, $props.selected),
                                  'is-checked': $options.isRowChecked(row),
                              }],
                  onClick: $event => ($options.selectRow(row)),
                  onDblclick: $event => (_ctx.$emit('dblclick', row)),
                  onMouseenter: $event => ($options.emitEventForRow('mouseenter', $event, row)),
                  onMouseleave: $event => ($options.emitEventForRow('mouseleave', $event, row)),
                  onContextmenu: $event => (_ctx.$emit('contextmenu', row, $event)),
                  draggable: $options.canDragRow,
                  onDragstart: $event => ($options.handleDragStart($event, row, index)),
                  onDragend: $event => ($options.handleDragEnd($event, row, index)),
                  onDrop: $event => ($options.handleDrop($event, row, index)),
                  onDragover: $event => ($options.handleDragOver($event, row, index)),
                  onDragleave: $event => ($options.handleDragLeave($event, row, index))
                }, [
                  ($options.showDetailRowIcon)
                    ? (vue.openBlock(), vue.createBlock("td", _hoisted_14, [
                        ($props.hasDetailedVisible(row))
                          ? (vue.openBlock(), vue.createBlock("a", {
                              key: 0,
                              role: "button",
                              onClick: vue.withModifiers($event => ($options.toggleDetails(row)), ["stop"])
                            }, [
                              vue.createVNode(_component_b_icon, {
                                icon: "chevron-right",
                                pack: $props.iconPack,
                                both: "",
                                class: {'is-expanded': $options.isVisibleDetailRow(row)}
                              }, null, 8 /* PROPS */, ["pack", "class"])
                            ], 8 /* PROPS */, ["onClick"]))
                          : vue.createCommentVNode("v-if", true)
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  ($props.checkable && $props.checkboxPosition === 'left')
                    ? (vue.openBlock(), vue.createBlock("td", {
                        key: 1,
                        class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                      }, [
                        vue.createVNode(_component_b_checkbox, {
                          disabled: !$props.isRowCheckable(row),
                          "model-value": $options.isRowChecked(row),
                          onClick: vue.withModifiers($event => ($options.checkRow(row, index, $event)), ["prevent","stop"])
                        }, null, 8 /* PROPS */, ["disabled", "model-value", "onClick"])
                      ], 2 /* CLASS */))
                    : vue.createCommentVNode("v-if", true),
                  (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, colindex) => {
                    return (vue.openBlock(), vue.createBlock(vue.Fragment, {
                      key: column.newKey + ':' + index + ':' + colindex
                    }, [
                      (column.$slots.default)
                        ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, vue.mergeProps({
                            key: 0,
                            component: column
                          }, column.tdAttrs(row, column), {
                            scoped: "",
                            name: "default",
                            tag: "td",
                            class: column.getRootClasses(row),
                            style: column.getRootStyle(row),
                            "data-label": column.label,
                            props: { row, column, index, colindex, toggleDetails: $options.toggleDetails },
                            onClick: $event => (_ctx.$emit('cellclick',row,column,index,colindex))
                          }), null, 16 /* FULL_PROPS */, ["component", "class", "style", "data-label", "props", "onClick"]))
                        : vue.createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  }), 128 /* KEYED_FRAGMENT */)),
                  ($props.checkable && $props.checkboxPosition === 'right')
                    ? (vue.openBlock(), vue.createBlock("td", {
                        key: 2,
                        class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                      }, [
                        vue.createVNode(_component_b_checkbox, {
                          disabled: !$props.isRowCheckable(row),
                          "model-value": $options.isRowChecked(row),
                          onClick: vue.withModifiers($event => ($options.checkRow(row, index, $event)), ["prevent","stop"])
                        }, null, 8 /* PROPS */, ["disabled", "model-value", "onClick"])
                      ], 2 /* CLASS */))
                    : vue.createCommentVNode("v-if", true)
                ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"]),
                vue.createVNode(vue.Transition, { name: $props.detailTransition }, {
                  default: vue.withCtx(() => [
                    ($options.isActiveDetailRow(row))
                      ? (vue.openBlock(), vue.createBlock("tr", _hoisted_15, [
                          vue.createVNode("td", { colspan: $options.columnCount }, [
                            vue.createVNode("div", _hoisted_16, [
                              vue.renderSlot(_ctx.$slots, "detail", {
                                row: row,
                                index: index
                              })
                            ])
                          ], 8 /* PROPS */, ["colspan"])
                        ]))
                      : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name"]),
                ($options.isActiveCustomDetailRow(row))
                  ? vue.renderSlot(_ctx.$slots, "detail", {
                      key: 0,
                      row: row,
                      index: index
                    })
                  : vue.createCommentVNode("v-if", true)
              ], 64 /* STABLE_FRAGMENT */))
            }), 128 /* KEYED_FRAGMENT */)),
            (!$options.visibleData.length)
              ? (vue.openBlock(), vue.createBlock("tr", _hoisted_17, [
                  vue.createVNode("td", { colspan: $options.columnCount }, [
                    vue.renderSlot(_ctx.$slots, "empty")
                  ], 8 /* PROPS */, ["colspan"])
                ]))
              : vue.createCommentVNode("v-if", true)
          ]),
          (_ctx.$slots.footer !== undefined)
            ? (vue.openBlock(), vue.createBlock("tfoot", _hoisted_18, [
                vue.createVNode("tr", _hoisted_19, [
                  ($options.hasCustomFooterSlot())
                    ? vue.renderSlot(_ctx.$slots, "footer", { key: 0 })
                    : (vue.openBlock(), vue.createBlock("th", {
                        key: 1,
                        colspan: $options.columnCount
                      }, [
                        vue.renderSlot(_ctx.$slots, "footer")
                      ], 8 /* PROPS */, ["colspan"]))
                ])
              ]))
            : vue.createCommentVNode("v-if", true)
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["tabindex"]),
        ($props.loading)
          ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
              vue.createVNode(_component_b_loading, {
                "is-full-page": false,
                active: $props.loading
              }, null, 8 /* PROPS */, ["active"])
            ])
          : vue.createCommentVNode("v-if", true)
      ], 6 /* CLASS, STYLE */),
      (($props.checkable && $options.hasBottomLeftSlot()) ||
                  ($props.paginated && ($props.paginationPosition === 'bottom' || $props.paginationPosition === 'both')))
        ? vue.renderSlot(_ctx.$slots, "pagination", { key: 2 }, () => [
            vue.createVNode(_component_b_table_pagination, vue.mergeProps(_ctx.$attrs, {
              "per-page": $props.perPage,
              paginated: $props.paginated,
              rounded: $props.paginationRounded,
              "icon-pack": $props.iconPack,
              total: $data.newDataTotal,
              "current-page": $data.newCurrentPage,
              "onUpdate:current-page": _cache[7] || (_cache[7] = $event => ($data.newCurrentPage = $event)),
              "aria-next-label": $props.ariaNextLabel,
              "aria-previous-label": $props.ariaPreviousLabel,
              "aria-page-label": $props.ariaPageLabel,
              "aria-current-label": $props.ariaCurrentLabel,
              onPageChange: _cache[8] || (_cache[8] = (event) => _ctx.$emit('page-change', event))
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "bottom-left")
              ]),
              _: 3 /* FORWARDED */
            }, 16 /* FULL_PROPS */, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
          ])
        : vue.createCommentVNode("v-if", true)
    ]))
  }

  script.render = render;
  script.__file = "src/components/table/Table.vue";

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
      registerComponent(Vue, script$4);
    }
  };
  use(Plugin);

  exports.BTable = script;
  exports.BTableColumn = script$4;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
