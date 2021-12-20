/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Steps = {}, global.Vue));
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

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    /**
     * Checks if the flag is set
     * @param val
     * @param flag
     * @returns {boolean}
     */

    function hasFlag(val, flag) {
      return (val & flag) === flag;
    }
    /**
     * Asserts a value is beetween min and max
     * @param val
     * @param min
     * @param max
     * @returns {number}
     */


    function bound(val, min, max) {
      return Math.max(min, Math.min(max, val));
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
    function isVueComponent(c) {
      return c && c._isVue;
    }

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

    var script$2 = {
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

    script$2.render = render$1;
    script$2.__file = "src/components/icon/Icon.vue";

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

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var items = 1;
    var sorted$1 = 3;
    var Sorted$1 = sorted$1;
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

    var TabbedMixin = (function (cmp) {
      var _components;

      return {
        mixins: [ProviderParentMixin(cmp, Sorted$1)],
        components: (_components = {}, _defineProperty(_components, script$2.name, script$2), _defineProperty(_components, SlotComponent.name, SlotComponent), _components),
        props: {
          modelValue: {
            type: [String, Number],
            default: undefined
          },
          size: String,
          animated: {
            type: Boolean,
            default: true
          },
          animation: String,
          animateInitially: Boolean,
          vertical: {
            type: Boolean,
            default: false
          },
          position: String,
          destroyOnHide: {
            type: Boolean,
            default: false
          }
        },
        emits: ['update:modelValue'],
        data: function data() {
          return {
            activeId: this.modelValue,
            // Internal state
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false
          };
        },
        mounted: function mounted() {
          if (typeof this.modelValue === 'number') {
            // Backward compatibility: converts the index value to an id
            var value = bound(this.modelValue, 0, this.items.length - 1);
            this.activeId = this.items[value].value;
          } else {
            this.activeId = this.modelValue;
          }
        },
        computed: {
          activeItem: function activeItem() {
            var _this = this;

            return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
              return i.value === _this.activeId;
            });
          },
          items: function items() {
            return this.sortedItems;
          }
        },
        watch: {
          /**
           * When v-model is changed set the new active tab.
           */
          modelValue: function modelValue(value) {
            if (typeof value === 'number') {
              // Backward compatibility: converts the index value to an id
              value = bound(value, 0, this.items.length - 1);
              this.activeId = this.items[value].value;
            } else {
              this.activeId = value;
            }
          },

          /**
           * Sync internal state with external state
           */
          activeId: function activeId(val, oldValue) {
            var oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.find(function (i) {
              return i.value === oldValue;
            }) : null;

            if (oldTab && this.activeItem) {
              oldTab.deactivate(this.activeItem.index);
              this.activeItem.activate(oldTab.index);
            }

            val = this.activeItem ? typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

            if (val !== this.modelValue) {
              this.$emit('update:modelValue', val);
            }
          }
        },
        methods: {
          /**
          * Child click listener, emit input event and change active child.
          */
          childClick: function childClick(child) {
            this.activeId = child.value;
          },
          getNextItemIdx: function getNextItemIdx(fromIdx) {
            var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var nextItemIdx = null;

            for (var i = 0; i < this.items.length; i++) {
              var item = this.items[i];

              if (fromIdx < item.index && item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
                nextItemIdx = item.index;
                break;
              }
            }

            return nextItemIdx;
          },
          getPrevItemIdx: function getPrevItemIdx(fromIdx) {
            var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var prevItemIdx = null;

            for (var i = this.items.length - 1; i >= 0; i--) {
              var item = this.items[i];

              if (item.index < fromIdx && item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
                prevItemIdx = item.index;
                break;
              }
            }

            return prevItemIdx;
          }
        }
      };
    });

    var script$1 = {
        name: 'BSteps',
        components: {
            [script$2.name]: script$2
        },
        mixins: [TabbedMixin('step')],
        props: {
            type: [String, Object],
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
            hasNavigation: {
                type: Boolean,
                default: true
            },
            labelPosition: {
                type: String,
                validator(value) {
                    return [
                        'bottom',
                        'right',
                        'left'
                    ].indexOf(value) > -1
                },
                default: 'bottom'
            },
            rounded: {
                type: Boolean,
                default: true
            },
            mobileMode: {
                type: String,
                validator(value) {
                    return [
                        'minimalist',
                        'compact'
                    ].indexOf(value) > -1
                },
                default: 'minimalist'
            },
            ariaNextLabel: String,
            ariaPreviousLabel: String
        },
        computed: {
            // Override mixin implementation to always have a value
            activeItem() {
                return this.childItems.filter((i) => i.value === this.activeId)[0] || this.items[0]
            },
            wrapperClasses() {
                return [
                    this.size,
                    {
                        'is-vertical': this.vertical,
                        [this.position]: this.position && this.vertical
                    }
                ]
            },
            mainClasses() {
                return [
                    this.type,
                    {
                        'has-label-right': this.labelPosition === 'right',
                        'has-label-left': this.labelPosition === 'left',
                        'is-animated': this.animated,
                        'is-rounded': this.rounded,
                        [`mobile-${this.mobileMode}`]: this.mobileMode !== null
                    }
                ]
            },

            /**
             * Check if previous button is available.
             */
            hasPrev() {
                return this.prevItemIdx !== null
            },

            /**
             * Retrieves the next visible item index
             */
            nextItemIdx() {
                const idx = this.activeItem ? this.activeItem.index : 0;
                return this.getNextItemIdx(idx)
            },

            /**
             * Retrieves the next visible item
             */
            nextItem() {
                let nextItem = null;
                if (this.nextItemIdx !== null) {
                    nextItem = this.items.find((i) => i.index === this.nextItemIdx);
                }
                return nextItem
            },

            /**
            * Retrieves the next visible item index
            */
            prevItemIdx() {
                if (!this.activeItem) { return null }
                const idx = this.activeItem.index;
                return this.getPrevItemIdx(idx)
            },

            /**
             * Retrieves the previous visible item
             */
            prevItem() {
                if (!this.activeItem) { return null }

                let prevItem = null;
                if (this.prevItemIdx !== null) {
                    prevItem = this.items.find((i) => i.index === this.prevItemIdx);
                }
                return prevItem
            },

            /**
             * Check if next button is available.
             */
            hasNext() {
                return this.nextItemIdx !== null
            },

            navigationProps() {
                return {
                    previous: {
                        disabled: !this.hasPrev,
                        action: this.prev
                    },
                    next: {
                        disabled: !this.hasNext,
                        action: this.next
                    }
                }
            }
        },
        methods: {
            /**
             * Return if the step should be clickable or not.
             */
            isItemClickable(stepItem) {
                if (stepItem.clickable === undefined) {
                    return stepItem.index < this.activeItem.index
                }
                return stepItem.clickable
            },

            /**
             * Previous button click listener.
             */
            prev() {
                if (this.hasPrev) {
                    this.activeId = this.prevItem.value;
                }
            },

            /**
             * Previous button click listener.
             */
            next() {
                if (this.hasNext) {
                    this.activeId = this.nextItem.value;
                }
            }
        }
    };

    const _hoisted_1 = { class: "step-items" };
    const _hoisted_2 = { class: "step-marker" };
    const _hoisted_3 = { key: 1 };
    const _hoisted_4 = { class: "step-details" };
    const _hoisted_5 = { class: "step-title" };
    const _hoisted_6 = {
      key: 0,
      class: "step-navigation"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["b-steps", $options.wrapperClasses]
      }, [
        vue.createVNode("nav", {
          class: ["steps", $options.mainClasses]
        }, [
          vue.createVNode("ul", _hoisted_1, [
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.items, (childItem) => {
              return vue.withDirectives((vue.openBlock(), vue.createBlock("li", {
                key: childItem.value,
                class: ["step-item", [childItem.type || $props.type, childItem.headerClass, {
                            'is-active': childItem.isActive,
                            'is-previous': $options.activeItem.index > childItem.index
                        }]]
              }, [
                vue.createVNode("a", {
                  class: ["step-link", {'is-clickable': $options.isItemClickable(childItem)}],
                  onClick: $event => ($options.isItemClickable(childItem) && _ctx.childClick(childItem))
                }, [
                  vue.createVNode("div", _hoisted_2, [
                    (childItem.icon)
                      ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                          key: 0,
                          icon: childItem.icon,
                          pack: childItem.iconPack,
                          size: _ctx.size
                        }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
                      : (childItem.step)
                        ? (vue.openBlock(), vue.createBlock("span", _hoisted_3, vue.toDisplayString(childItem.step), 1 /* TEXT */))
                        : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createVNode("div", _hoisted_4, [
                    vue.createVNode("span", _hoisted_5, vue.toDisplayString(childItem.label), 1 /* TEXT */)
                  ])
                ], 10 /* CLASS, PROPS */, ["onClick"])
              ], 2 /* CLASS */)), [
                [vue.vShow, childItem.visible]
              ])
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 2 /* CLASS */),
        vue.createVNode("section", {
          class: ["step-content", {'is-transitioning': _ctx.isTransitioning}]
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */),
        vue.renderSlot(_ctx.$slots, "navigation", {
          previous: $options.navigationProps.previous,
          next: $options.navigationProps.next
        }, () => [
          ($props.hasNavigation)
            ? (vue.openBlock(), vue.createBlock("nav", _hoisted_6, [
                vue.createVNode("a", {
                  role: "button",
                  class: "pagination-previous",
                  disabled: $options.navigationProps.previous.disabled || undefined,
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => ($options.navigationProps.previous.action && $options.navigationProps.previous.action(...args)), ["prevent"])),
                  "aria-label": $props.ariaPreviousLabel
                }, [
                  vue.createVNode(_component_b_icon, {
                    icon: $props.iconPrev,
                    pack: $props.iconPack,
                    both: "",
                    "aria-hidden": "true"
                  }, null, 8 /* PROPS */, ["icon", "pack"])
                ], 8 /* PROPS */, ["disabled", "aria-label"]),
                vue.createVNode("a", {
                  role: "button",
                  class: "pagination-next",
                  disabled: $options.navigationProps.next.disabled || undefined,
                  onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => ($options.navigationProps.next.action && $options.navigationProps.next.action(...args)), ["prevent"])),
                  "aria-label": $props.ariaNextLabel
                }, [
                  vue.createVNode(_component_b_icon, {
                    icon: $props.iconNext,
                    pack: $props.iconPack,
                    both: "",
                    "aria-hidden": "true"
                  }, null, 8 /* PROPS */, ["icon", "pack"])
                ], 8 /* PROPS */, ["disabled", "aria-label"])
              ]))
            : vue.createCommentVNode("v-if", true)
        ])
      ], 2 /* CLASS */))
    }

    script$1.render = render;
    script$1.__file = "src/components/steps/Steps.vue";

    var sorted = 1;
    var optional = 2;
    var Sorted = sorted;
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

    function makeUniqueId() {
      var values = new Uint8Array(12);
      window.crypto.getRandomValues(values);
      return Array.prototype.map.call(values, function (v) {
        return v.toString(16);
      }).join('');
    }

    var TabbedChildMixin = (function (parentCmp) {
      return {
        mixins: [InjectedChildMixin(parentCmp, Sorted)],
        props: {
          label: String,
          icon: String,
          iconPack: String,
          visible: {
            type: Boolean,
            default: true
          },
          value: {
            type: String,
            default: function _default() {
              return makeUniqueId();
            }
          },
          headerClass: {
            type: [String, Array, Object],
            default: null
          }
        },
        data: function data() {
          return {
            transitionName: null,
            elementClass: 'item',
            elementRole: null
          };
        },
        computed: {
          isActive: function isActive() {
            return this.parent.activeItem === this;
          }
        },
        methods: {
          /**
           * Activate element, alter animation name based on the index.
           */
          activate: function activate(oldIndex) {
            this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
          },

          /**
           * Deactivate element, alter animation name based on the index.
           */
          deactivate: function deactivate(newIndex) {
            this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
          }
        },
        render: function render() {
          var _this = this;

          // if destroy apply v-if
          if (this.parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
              return;
            }
          }

          var vnode = vue.withDirectives(vue.h('div', {
            class: this.elementClass,
            role: this.elementRole,
            id: "".concat(this.value, "-content"),
            'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
            tabindex: this.isActive ? 0 : -1
          }, this.$slots), [[vue.vShow, this.isActive && this.visible]]); // check animated prop

          if (this.parent.animated) {
            return vue.h(vue.Transition, {
              name: this.parent.animation || this.transitionName,
              appear: this.parent.animateInitially === true || undefined,
              onBeforeEnter: function onBeforeEnter() {
                _this.parent.isTransitioning = true;
              },
              onAfterEnter: function onAfterEnter() {
                _this.parent.isTransitioning = false;
              }
            }, {
              default: function _default() {
                return vnode;
              }
            });
          }

          return vnode;
        }
      };
    });

    var script = {
        name: 'BStepItem',
        mixins: [TabbedChildMixin('step')],
        props: {
            step: [String, Number],
            type: [String, Object],
            clickable: {
                type: Boolean,
                default: undefined
            }
        },
        data() {
            return {
                elementClass: 'step-item'
            }
        }
    };

    script.__file = "src/components/steps/StepItem.vue";

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

    exports.BStepItem = script;
    exports.BSteps = script$1;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
