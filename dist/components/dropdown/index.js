/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Dropdown = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var findFocusable = function findFocusable(element) {
      var programmatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!element) {
        return null;
      }

      if (programmatic) {
        return element.querySelectorAll('*[tabindex="-1"]');
      }

      return element.querySelectorAll("a[href]:not([tabindex=\"-1\"]),\n                                     area[href],\n                                     input:not([disabled]),\n                                     select:not([disabled]),\n                                     textarea:not([disabled]),\n                                     button:not([disabled]),\n                                     iframe,\n                                     object,\n                                     embed,\n                                     *[tabindex]:not([tabindex=\"-1\"]),\n                                     *[contenteditable]");
    };

    var onKeyDown;

    var beforeMount = function beforeMount(el, _ref) {
      var _ref$value = _ref.value,
          value = _ref$value === void 0 ? true : _ref$value;

      if (value) {
        var focusable = findFocusable(el);
        var focusableProg = findFocusable(el, true);

        if (focusable && focusable.length > 0) {
          onKeyDown = function onKeyDown(event) {
            // Need to get focusable each time since it can change between key events
            // ex. changing month in a datepicker
            focusable = findFocusable(el);
            focusableProg = findFocusable(el, true);
            var firstFocusable = focusable[0];
            var lastFocusable = focusable[focusable.length - 1];

            if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
              event.preventDefault();
              lastFocusable.focus();
            } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
              event.preventDefault();
              firstFocusable.focus();
            }
          };

          el.addEventListener('keydown', onKeyDown);
        }
      }
    };

    var unmounted = function unmounted(el) {
      el.removeEventListener('keydown', onKeyDown);
    };

    var directive = {
      beforeMount: beforeMount,
      unmounted: unmounted
    };
    var trapFocus = directive;

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

    const DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];

    var script$1 = {
        name: 'BDropdown',
        directives: {
            trapFocus
        },
        mixins: [ProviderParentMixin('dropdown')],
        props: {
            modelValue: {
                type: [String, Number, Boolean, Object, Array, Function],
                default: null
            },
            disabled: Boolean,
            inline: Boolean,
            scrollable: Boolean,
            maxHeight: {
                type: [String, Number],
                default: 200
            },
            position: {
                type: String,
                validator(value) {
                    return [
                        'is-top-right',
                        'is-top-left',
                        'is-bottom-left',
                        'is-bottom-right'
                    ].indexOf(value) > -1
                }
            },
            triggers: {
                type: Array,
                default: () => ['click']
            },
            mobileModal: {
                type: Boolean,
                default: () => {
                    return config.defaultDropdownMobileModal
                }
            },
            ariaRole: {
                type: String,
                validator(value) {
                    return [
                        'menu',
                        'list',
                        'dialog'
                    ].indexOf(value) > -1
                },
                default: null
            },
            animation: {
                type: String,
                default: 'fade'
            },
            multiple: Boolean,
            trapFocus: {
                type: Boolean,
                default: () => {
                    return config.defaultTrapFocus
                }
            },
            closeOnClick: {
                type: Boolean,
                default: true
            },
            canClose: {
                type: [Array, Boolean],
                default: true
            },
            expanded: Boolean,
            appendToBody: Boolean,
            appendToBodyCopyParent: Boolean
        },
        emits: ['active-change', 'change', 'update:modelValue'],
        data() {
            return {
                selected: this.modelValue,
                style: {},
                isActive: false,
                isHoverable: false,
                _bodyEl: undefined // Used to append to body
            }
        },
        computed: {
            rootClasses() {
                return [this.position, {
                    'is-disabled': this.disabled,
                    'is-hoverable': this.hoverable,
                    'is-inline': this.inline,
                    'is-active': this.isActive || this.inline,
                    'is-mobile-modal': this.isMobileModal,
                    'is-expanded': this.expanded
                }]
            },
            isMobileModal() {
                return this.mobileModal && !this.inline
            },
            cancelOptions() {
                return typeof this.canClose === 'boolean'
                    ? this.canClose
                        ? DEFAULT_CLOSE_OPTIONS
                        : []
                    : this.canClose
            },
            contentStyle() {
                return {
                    maxHeight: this.scrollable ? toCssWidth(this.maxHeight) : null,
                    overflow: this.scrollable ? 'auto' : null
                }
            },
            hoverable() {
                return this.triggers.indexOf('hover') >= 0
            }
        },
        watch: {
            /**
            * When v-model is changed set the new selected item.
            */
            modelValue(value) {
                this.selected = value;
            },

            /**
            * Emit event when isActive value is changed.
            */
            isActive(value) {
                this.$emit('active-change', value);
                if (this.appendToBody) {
                    this.$nextTick(() => {
                        this.updateAppendToBody();
                    });
                }
            }
        },
        methods: {
            /**
             * Click listener from DropdownItem.
             *   1. Set new selected item.
             *   2. Emit input event to update the user v-model.
             *   3. Close the dropdown.
             */
            selectItem(value) {
                if (this.multiple) {
                    if (this.selected) {
                        if (this.selected.indexOf(value) === -1) {
                            // Add value
                            this.selected = [...this.selected, value];
                        } else {
                            // Remove value
                            this.selected = this.selected.filter((val) => val !== value);
                        }
                    } else {
                        this.selected = [value];
                    }
                    this.$emit('change', this.selected);
                } else {
                    if (this.selected !== value) {
                        this.selected = value;
                        this.$emit('change', this.selected);
                    }
                }
                this.$emit('update:modelValue', this.selected);
                if (!this.multiple) {
                    this.isActive = !this.closeOnClick;
                    if (this.hoverable && this.closeOnClick) {
                        this.isHoverable = false;
                    }
                }
            },

            /**
            * White-listed items to not close when clicked.
            */
            isInWhiteList(el) {
                if (el === this.$refs.dropdownMenu) return true
                if (el === this.$refs.trigger) return true
                // All chidren from dropdown
                if (this.$refs.dropdownMenu !== undefined) {
                    const children = this.$refs.dropdownMenu.querySelectorAll('*');
                    for (const child of children) {
                        if (el === child) {
                            return true
                        }
                    }
                }
                // All children from trigger
                if (this.$refs.trigger !== undefined) {
                    const children = this.$refs.trigger.querySelectorAll('*');
                    for (const child of children) {
                        if (el === child) {
                            return true
                        }
                    }
                }
                return false
            },

            /**
            * Close dropdown if clicked outside.
            */
            clickedOutside(event) {
                if (this.cancelOptions.indexOf('outside') < 0) return
                if (this.inline) return

                const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
                if (!this.isInWhiteList(target)) this.isActive = false;
            },

            /**
             * Keypress event that is bound to the document
             */
            keyPress({ key }) {
                if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                    if (this.cancelOptions.indexOf('escape') < 0) return
                    this.isActive = false;
                }
            },

            onClick() {
                if (this.triggers.indexOf('click') < 0) return
                this.toggle();
            },
            onContextMenu() {
                if (this.triggers.indexOf('contextmenu') < 0) return
                this.toggle();
            },
            onHover() {
                if (this.triggers.indexOf('hover') < 0) return
                this.isHoverable = true;
            },
            onFocus() {
                if (this.triggers.indexOf('focus') < 0) return
                this.toggle();
            },

            /**
            * Toggle dropdown if it's not disabled.
            */
            toggle() {
                if (this.disabled) return

                if (!this.isActive) {
                    // if not active, toggle after clickOutside event
                    // this fixes toggling programmatic
                    // $nextTick may not wait for other events since Vue 3.
                    setTimeout(() => {
                        const value = !this.isActive;
                        this.isActive = value;
                    });
                } else {
                    this.isActive = !this.isActive;
                }
            },

            updateAppendToBody() {
                const dropdown = this.$refs.dropdown;
                const dropdownMenu = this.$refs.dropdownMenu;
                const trigger = this.$refs.trigger;
                if (dropdownMenu && trigger) {
                    // update wrapper dropdown
                    const dropdownWrapper = this.$data._bodyEl.children[0];
                    dropdownWrapper.classList.forEach((item) => dropdownWrapper.classList.remove(item));
                    dropdownWrapper.classList.add('dropdown');
                    dropdownWrapper.classList.add('dropdown-menu-animation');
                    // TODO: the following test never becomes true on Vue 3.
                    //       I have no idea about the intention of it.
                    if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
                        dropdownWrapper.classList.add(this.$vnode.data.staticClass);
                    }
                    this.rootClasses.forEach((item) => {
                        // skip position prop
                        if (item && typeof item === 'object') {
                            for (const key in item) {
                                if (item[key]) {
                                    dropdownWrapper.classList.add(key);
                                }
                            }
                        }
                    });
                    if (this.appendToBodyCopyParent) {
                        const parentNode = this.$refs.dropdown.parentNode;
                        const parent = this.$data._bodyEl;
                        parent.classList.forEach((item) => parent.classList.remove(item));
                        parentNode.classList.forEach((item) => {
                            parent.classList.add(item);
                        });
                    }
                    const rect = trigger.getBoundingClientRect();
                    let top = rect.top + window.scrollY;
                    let left = rect.left + window.scrollX;
                    if (!this.position || this.position.indexOf('bottom') >= 0) {
                        top += trigger.clientHeight;
                    } else {
                        top -= dropdownMenu.clientHeight;
                    }
                    if (this.position && this.position.indexOf('left') >= 0) {
                        left -= (dropdownMenu.clientWidth - trigger.clientWidth);
                    }
                    this.style = {
                        position: 'absolute',
                        top: `${top}px`,
                        left: `${left}px`,
                        zIndex: '99',
                        width: this.expanded ? `${dropdown.offsetWidth}px` : undefined
                    };
                }
            }
        },
        mounted() {
            if (this.appendToBody) {
                this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
                this.updateAppendToBody();
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('click', this.clickedOutside);
                document.addEventListener('keyup', this.keyPress);
            }
        },
        beforeUnmount() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('click', this.clickedOutside);
                document.removeEventListener('keyup', this.keyPress);
            }
            if (this.appendToBody) {
                removeElement(this.$data._bodyEl);
            }
        }
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_trap_focus = vue.resolveDirective("trap-focus");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["dropdown dropdown-menu-animation", $options.rootClasses],
        ref: "dropdown"
      }, [
        (!$props.inline)
          ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              role: "button",
              ref: "trigger",
              class: "dropdown-trigger",
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
              onContextmenu: _cache[2] || (_cache[2] = vue.withModifiers((...args) => ($options.onContextMenu && $options.onContextMenu(...args)), ["prevent"])),
              onMouseenter: _cache[3] || (_cache[3] = (...args) => ($options.onHover && $options.onHover(...args))),
              onFocusCapture: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              "aria-haspopup": "true"
            }, [
              vue.renderSlot(_ctx.$slots, "trigger", { active: $data.isActive })
            ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode(vue.Transition, { name: $props.animation }, {
          default: vue.withCtx(() => [
            ($options.isMobileModal)
              ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
                  key: 0,
                  class: "background",
                  "aria-hidden": !$data.isActive
                }, null, 8 /* PROPS */, ["aria-hidden"])), [
                  [vue.vShow, $data.isActive]
                ])
              : vue.createCommentVNode("v-if", true)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["name"]),
        vue.createVNode(vue.Transition, { name: $props.animation }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("div", {
              ref: "dropdownMenu",
              class: "dropdown-menu",
              style: $data.style,
              "aria-hidden": !$data.isActive
            }, [
              vue.createVNode("div", {
                class: "dropdown-content",
                role: $props.ariaRole,
                style: $options.contentStyle
              }, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 12 /* STYLE, PROPS */, ["role"])
            ], 12 /* STYLE, PROPS */, ["aria-hidden"]), [
              [vue.vShow, (!$props.disabled && ($data.isActive || $data.isHoverable)) || $props.inline],
              [_directive_trap_focus, $props.trapFocus]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"])
      ], 2 /* CLASS */))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/dropdown/Dropdown.vue";

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
        name: 'BDropdownItem',
        mixins: [InjectedChildMixin('dropdown')],
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Function],
                default: null
            },
            separator: Boolean,
            disabled: Boolean,
            custom: Boolean,
            focusable: {
                type: Boolean,
                default: true
            },
            paddingless: Boolean,
            hasLink: Boolean,
            ariaRole: {
                type: String,
                default: ''
            }
        },
        emits: ['click'],
        computed: {
            anchorClasses() {
                return {
                    'is-disabled': this.parent.disabled || this.disabled,
                    'is-paddingless': this.paddingless,
                    'is-active': this.isActive
                }
            },
            itemClasses() {
                return {
                    'dropdown-item': !this.hasLink,
                    'is-disabled': this.disabled,
                    'is-paddingless': this.paddingless,
                    'is-active': this.isActive,
                    'has-link': this.hasLink
                }
            },
            ariaRoleItem() {
                return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null
            },
            isClickable() {
                return !this.parent.disabled && !this.separator && !this.disabled && !this.custom
            },
            isActive() {
                if (this.parent.selected === null) return false
                if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0
                return this.value === this.parent.selected
            },
            isFocusable() {
                return this.hasLink ? false : this.focusable
            }
        },
        methods: {
            /**
            * Click listener, select the item.
            */
            selectItem() {
                if (!this.isClickable) return

                this.parent.selectItem(this.value);
                this.$emit('click');
            }
        }
    };

    const _hoisted_1 = {
      key: 0,
      class: "dropdown-divider"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return ($props.separator)
        ? (vue.openBlock(), vue.createBlock("hr", _hoisted_1))
        : (!$props.custom && !$props.hasLink)
          ? (vue.openBlock(), vue.createBlock("a", {
              key: 1,
              class: ["dropdown-item", $options.anchorClasses],
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.selectItem && $options.selectItem(...args))),
              role: $options.ariaRoleItem,
              tabindex: $options.isFocusable ? 0 : null
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
          : (vue.openBlock(), vue.createBlock("div", {
              key: 2,
              class: $options.itemClasses,
              onClick: _cache[2] || (_cache[2] = (...args) => ($options.selectItem && $options.selectItem(...args))),
              role: $options.ariaRoleItem,
              tabindex: $options.isFocusable ? 0 : null
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
    }

    script.render = render;
    script.__file = "src/components/dropdown/DropdownItem.vue";

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

    exports.BDropdown = script$1;
    exports.BDropdownItem = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
