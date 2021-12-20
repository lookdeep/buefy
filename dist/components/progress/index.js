/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Progress = {}, global.Vue));
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

    /**
     * Checks if the flag is set
     * @param val
     * @param flag
     * @returns {boolean}
     */

    function hasFlag(val, flag) {
      return (val & flag) === flag;
    }

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var items = 1;
    var sorted$1 = 3;
    var ProviderParentMixin = (function (itemName) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var mixin = {
        provide: function provide() {
          return _defineProperty({}, 'b' + itemName, this);
        }
      };

      if (hasFlag(flags, items)) {
        mixin.data = function () {
          return _objectSpread({
            childItems: []
          }, hasFlag(flags, sorted$1) ? {
            nextIndex: 0
          } : {});
        };

        mixin.methods = {
          _registerItem: function _registerItem(item) {
            if (hasFlag(flags, sorted$1)) {
              // assigns a dynamic index.
              // dynamic indices will be messed up if any child is
              // unmounted.
              // use the new `order` prop to maintain the ordering.
              item.dynamicIndex = this.nextIndex;
              ++this.nextIndex;
            }

            this.childItems.push(item);
          },
          _unregisterItem: function _unregisterItem(item) {
            this.childItems = this.childItems.filter(function (i) {
              return i.value !== item.value;
            });
          }
        };

        if (hasFlag(flags, sorted$1)) {
          mixin.computed = {
            /**
             * When items are added/removed sort them according to their position
             */
            sortedItems: function sortedItems() {
              return this.childItems.slice().sort(function (i1, i2) {
                return i1.index - i2.index;
              });
            }
          };
        }
      }

      return mixin;
    });

    var script$1 = {
        name: 'BProgress',
        mixins: [ProviderParentMixin('progress')],
        props: {
            type: {
                type: [String, Object],
                default: 'is-darkgrey'
            },
            size: String,
            value: {
                type: Number,
                default: undefined
            },
            max: {
                type: Number,
                default: 100
            },
            showValue: {
                type: Boolean,
                default: false
            },
            format: {
                type: String,
                default: 'raw',
                validator: (value) => {
                    return [
                        'raw',
                        'percent'
                    ].indexOf(value) >= 0
                }
            },
            precision: {
                type: Number,
                default: 2
            },
            keepTrailingZeroes: {
                type: Boolean,
                default: false
            },
            locale: {
                type: [String, Array],
                default: () => {
                    return config.defaultLocale
                }
            }
        },
        computed: {
            isIndeterminate() {
                return this.value === undefined || this.value === null
            },
            newType() {
                return [
                    this.size,
                    this.type,
                    {
                        'is-more-than-half': this.value && this.value > this.max / 2
                    }
                ]
            },
            newValue() {
                return this.calculateValue(this.value)
            },
            isNative() {
                return this.$slots.bar === undefined
            },
            wrapperClasses() {
                return {
                    'is-not-native': !this.isNative,
                    [this.size]: !this.isNative
                }
            }
        },
        watch: {
            /**
             * When value is changed back to undefined, value of native progress get reset to 0.
             * Need to add and remove the value attribute to have the indeterminate or not.
             */
            isIndeterminate(indeterminate) {
                this.$nextTick(() => {
                    if (this.$refs.progress) {
                        if (indeterminate) {
                            this.$refs.progress.removeAttribute('value');
                        } else {
                            this.$refs.progress.setAttribute('value', this.value);
                        }
                    }
                });
            }
        },
        methods: {
            calculateValue(value) {
                if (value === undefined || value === null || isNaN(value)) {
                    return undefined
                }

                const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
                const maximumFractionDigits = this.precision;
                if (this.format === 'percent') {
                    return new Intl.NumberFormat(
                        this.locale,
                        {
                            style: 'percent',
                            minimumFractionDigits: minimumFractionDigits,
                            maximumFractionDigits: maximumFractionDigits
                        }
                    ).format(value / this.max)
                }

                return new Intl.NumberFormat(
                    this.locale,
                    {
                        minimumFractionDigits: minimumFractionDigits,
                        maximumFractionDigits: maximumFractionDigits
                    }
                ).format(value)
            }
        }
    };

    const _hoisted_1$1 = {
      key: 2,
      class: "progress-value"
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("div", {
        class: ["progress-wrapper", $options.wrapperClasses]
      }, [
        ($options.isNative)
          ? (vue.openBlock(), vue.createBlock("progress", {
              key: 0,
              ref: "progress",
              class: ["progress", $options.newType],
              max: $props.max,
              value: $props.value
            }, vue.toDisplayString($options.newValue), 11 /* TEXT, CLASS, PROPS */, ["max", "value"]))
          : vue.renderSlot(_ctx.$slots, "bar", { key: 1 }),
        ($options.isNative && $props.showValue)
          ? (vue.openBlock(), vue.createBlock("p", _hoisted_1$1, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createTextVNode(vue.toDisplayString($options.newValue), 1 /* TEXT */)
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/progress/Progress.vue";

    var sorted = 1;
    var optional = 2;
    var InjectedChildMixin = (function (parentItemName) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var mixin = {
        inject: {
          parent: {
            from: 'b' + parentItemName,
            default: false
          }
        },
        created: function created() {
          if (!this.parent) {
            if (!hasFlag(flags, optional)) {
              this.$destroy();
              throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
            }
          } else if (this.parent._registerItem) {
            this.parent._registerItem(this);
          }
        },
        beforeUnmount: function beforeUnmount() {
          if (this.parent && this.parent._unregisterItem) {
            this.parent._unregisterItem(this);
          }
        }
      };

      if (hasFlag(flags, sorted)) {
        // a user can explicitly specify the `order` prop to keep the order of
        // children.
        // I can no longer rely on automatic indexing of children, because I
        // could not figure out how to calculate the index of a child in its
        // parent on Vue 3.
        // incomplete dynamic indexing is still available if any child is never
        // unmounted; e.g., not switched with `v-if`
        mixin.props = {
          order: {
            type: Number,
            required: false
          }
        };

        mixin.data = function () {
          return {
            dynamicIndex: null
          };
        };

        mixin.computed = {
          index: function index() {
            return this.order != null ? this.order : this.dynamicIndex;
          }
        };
      }

      return mixin;
    });

    var script = {
        name: 'BProgressBar',
        mixins: [InjectedChildMixin('progress')],
        props: {
            type: {
                type: [String, Object],
                default: undefined
            },
            value: {
                type: Number,
                default: undefined
            },
            showValue: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            newType() {
                return [
                    this.parent.size,
                    this.type || this.parent.type
                ]
            },
            newShowValue() {
                return this.showValue || this.parent.showValue
            },
            newValue() {
                return this.parent.calculateValue(this.value)
            },
            barWidth() {
                return `${this.value * 100 / this.parent.max}%`
            }
        }
    };

    const _hoisted_1 = {
      key: 0,
      class: "progress-value"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("div", {
        class: ["progress-bar", $options.newType],
        role: "progressbar",
        "aria-valuenow": $props.value,
        "aria-valuemax": _ctx.parent.max,
        "aria-valuemin": "0",
        style: {width: $options.barWidth}
      }, [
        ($options.newShowValue)
          ? (vue.openBlock(), vue.createBlock("p", _hoisted_1, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createTextVNode(vue.toDisplayString($options.newValue), 1 /* TEXT */)
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
      ], 14 /* CLASS, STYLE, PROPS */, ["aria-valuenow", "aria-valuemax"]))
    }

    script.render = render;
    script.__file = "src/components/progress/ProgressBar.vue";

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

    exports.BProgress = script$1;
    exports.BProgressBar = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
