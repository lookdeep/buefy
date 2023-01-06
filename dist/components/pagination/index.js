/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Pagination = {}, global.Vue));
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

    var script$2 = {
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

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
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

    script$2.render = render$2;
    script$2.__file = "src/components/pagination/PaginationButton.vue";

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
        name: 'BPagination',
        components: {
            [script$1.name]: script$1,
            [script$2.name]: script$2
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

    const _hoisted_1 = {
      key: 4,
      class: "info"
    };
    const _hoisted_2 = {
      key: 5,
      class: "pagination-list"
    };
    const _hoisted_3 = { key: 0 };
    const _hoisted_4 = { key: 1 };
    const _hoisted_5 = /*#__PURE__*/vue.createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
    const _hoisted_6 = { key: 2 };
    const _hoisted_7 = /*#__PURE__*/vue.createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
    const _hoisted_8 = { key: 3 };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
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
          ? (vue.openBlock(), vue.createBlock("small", _hoisted_1, [
              ($props.perPage == 1)
                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                    vue.createTextVNode(vue.toDisplayString($options.firstItem) + " / " + vue.toDisplayString($props.total), 1 /* TEXT */)
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                    vue.createTextVNode(vue.toDisplayString($options.firstItem) + "-" + vue.toDisplayString(Math.min($props.modelValue * $props.perPage, $props.total)) + " / " + vue.toDisplayString($props.total), 1 /* TEXT */)
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            ]))
          : (vue.openBlock(), vue.createBlock("ul", _hoisted_2, [
              vue.createCommentVNode("First"),
              ($options.hasFirst)
                ? (vue.openBlock(), vue.createBlock("li", _hoisted_3, [
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
                ? (vue.openBlock(), vue.createBlock("li", _hoisted_4, [
                    _hoisted_5
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
                ? (vue.openBlock(), vue.createBlock("li", _hoisted_6, [
                    _hoisted_7
                  ]))
                : vue.createCommentVNode("v-if", true),
              ($options.hasLast)
                ? (vue.openBlock(), vue.createBlock("li", _hoisted_8, [
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

    script.render = render;
    script.__file = "src/components/pagination/Pagination.vue";

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
        registerComponent(Vue, script$2);
      }
    };
    use(Plugin);

    exports.BPagination = script;
    exports.BPaginationButton = script$2;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));