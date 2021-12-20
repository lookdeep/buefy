/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Rate = {}, global.Vue));
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

    var script = {
        name: 'BRate',
        components: {
            [script$1.name]: script$1
        },
        props: {
            modelValue: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 5
            },
            icon: {
                type: String,
                default: 'star'
            },
            iconPack: String,
            size: String,
            spaced: Boolean,
            rtl: Boolean,
            disabled: Boolean,
            showScore: Boolean,
            showText: Boolean,
            customText: String,
            texts: Array,
            locale: {
                type: [String, Array],
                default: () => {
                    return config.defaultLocale
                }
            }
        },
        emits: ['change', 'update:modelValue'],
        data() {
            return {
                newValue: this.modelValue,
                hoverValue: 0
            }
        },
        computed: {
            halfStyle() {
                return `width:${this.valueDecimal}%`
            },
            showMe() {
                let result = '';
                if (this.showScore) {
                    result = this.disabled ? this.modelValue : this.newValue;
                    if (result === 0) {
                        result = '';
                    } else {
                        result = new Intl.NumberFormat(this.locale).format(this.modelValue);
                    }
                } else if (this.showText) {
                    result = this.texts[Math.ceil(this.newValue) - 1];
                }
                return result
            },
            valueDecimal() {
                return this.modelValue * 100 - Math.floor(this.modelValue) * 100
            }
        },
        watch: {
            // When v-model is changed set the new value.
            modelValue(value) {
                this.newValue = value;
            }
        },
        methods: {
            resetNewValue() {
                if (this.disabled) return
                this.hoverValue = 0;
            },
            previewRate(index, event) {
                if (this.disabled) return
                this.hoverValue = index;
                event.stopPropagation();
            },
            confirmValue(index) {
                if (this.disabled) return
                this.newValue = index;
                this.$emit('change', this.newValue);
                this.$emit('update:modelValue', this.newValue);
            },
            checkHalf(index) {
                const showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
                index - 1 < this.modelValue && index > this.modelValue;
                return showWhenDisabled
            },
            rateClass(index) {
                let output = '';
                const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;
                if (index <= currentValue) {
                    output = 'set-on';
                } else if (this.disabled && (Math.ceil(this.modelValue) === index)) {
                    output = 'set-half';
                }
                return output
            }
        }
    };

    const _hoisted_1 = { key: 0 };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["rate", { 'is-disabled': $props.disabled, 'is-spaced': $props.spaced, 'is-rtl': $props.rtl }]
      }, [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.max, (item, index) => {
          return (vue.openBlock(), vue.createBlock("div", {
            class: ["rate-item", $options.rateClass(item)],
            key: index,
            onMousemove: $event => ($options.previewRate(item, $event)),
            onMouseleave: _cache[1] || (_cache[1] = (...args) => ($options.resetNewValue && $options.resetNewValue(...args))),
            onClick: vue.withModifiers($event => ($options.confirmValue(item)), ["prevent"])
          }, [
            vue.createVNode(_component_b_icon, {
              pack: $props.iconPack,
              icon: $props.icon,
              size: $props.size
            }, null, 8 /* PROPS */, ["pack", "icon", "size"]),
            ($options.checkHalf(item))
              ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                  key: 0,
                  class: "is-half",
                  pack: $props.iconPack,
                  icon: $props.icon,
                  size: $props.size,
                  style: $options.halfStyle
                }, null, 8 /* PROPS */, ["pack", "icon", "size", "style"]))
              : vue.createCommentVNode("v-if", true)
          ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onMousemove", "onClick"]))
        }), 128 /* KEYED_FRAGMENT */)),
        ($props.showText || $props.showScore || $props.customText)
          ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: ["rate-text", $props.size]
            }, [
              vue.createVNode("span", null, vue.toDisplayString($options.showMe), 1 /* TEXT */),
              ($props.customText && !$props.showText)
                ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString($props.customText), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true)
            ], 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    }

    script.render = render;
    script.__file = "src/components/rate/Rate.vue";

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

    exports.BRate = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
