/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Navbar = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var script$3 = {
        name: 'NavbarBurger',
        props: {
            isOpened: {
                type: Boolean,
                default: false
            }
        }
    };

    const _hoisted_1 = /*#__PURE__*/vue.createVNode("span", { "aria-hidden": "true" }, null, -1 /* HOISTED */);
    const _hoisted_2 = /*#__PURE__*/vue.createVNode("span", { "aria-hidden": "true" }, null, -1 /* HOISTED */);
    const _hoisted_3 = /*#__PURE__*/vue.createVNode("span", { "aria-hidden": "true" }, null, -1 /* HOISTED */);

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("a", vue.mergeProps({
        role: "button",
        class: ["navbar-burger burger", { 'is-active': $props.isOpened }],
        "aria-label": "menu",
        "aria-expanded": $props.isOpened
      }, _ctx.$attrs), [
        _hoisted_1,
        _hoisted_2,
        _hoisted_3
      ], 16 /* FULL_PROPS */, ["aria-expanded"]))
    }

    script$3.render = render$2;
    script$3.__file = "src/components/navbar/NavbarBurger.vue";

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

    var isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
    var events = isTouch ? ['touchstart', 'click'] : ['click'];
    var instances = [];

    function processArgs(bindingValue) {
      var isFunction = typeof bindingValue === 'function';

      if (!isFunction && _typeof(bindingValue) !== 'object') {
        throw new Error("v-click-outside: Binding value should be a function or an object, ".concat(_typeof(bindingValue), " given"));
      }

      return {
        handler: isFunction ? bindingValue : bindingValue.handler,
        middleware: bindingValue.middleware || function (isClickOutside) {
          return isClickOutside;
        },
        events: bindingValue.events || events
      };
    }

    function onEvent(_ref) {
      var el = _ref.el,
          event = _ref.event,
          handler = _ref.handler,
          middleware = _ref.middleware;
      var isClickOutside = event.target !== el && !el.contains(event.target);

      if (!isClickOutside || !middleware(event, el)) {
        return;
      }

      handler(event, el);
    }

    function toggleEventListeners() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          eventHandlers = _ref2.eventHandlers;

      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'add';
      eventHandlers.forEach(function (_ref3) {
        var event = _ref3.event,
            handler = _ref3.handler;
        document["".concat(action, "EventListener")](event, handler);
      });
    }

    function beforeMount(el, _ref4) {
      var value = _ref4.value;

      var _processArgs = processArgs(value),
          _handler = _processArgs.handler,
          middleware = _processArgs.middleware,
          events = _processArgs.events;

      var instance = {
        el: el,
        eventHandlers: events.map(function (eventName) {
          return {
            event: eventName,
            handler: function handler(event) {
              return onEvent({
                event: event,
                el: el,
                handler: _handler,
                middleware: middleware
              });
            }
          };
        })
      };
      toggleEventListeners(instance, 'add');
      instances.push(instance);
    }

    function updated(el, _ref5) {
      var value = _ref5.value;

      var _processArgs2 = processArgs(value),
          _handler2 = _processArgs2.handler,
          middleware = _processArgs2.middleware,
          events = _processArgs2.events; // `filter` instead of `find` for compat with IE


      var instance = instances.filter(function (instance) {
        return instance.el === el;
      })[0];
      toggleEventListeners(instance, 'remove');
      instance.eventHandlers = events.map(function (eventName) {
        return {
          event: eventName,
          handler: function handler(event) {
            return onEvent({
              event: event,
              el: el,
              handler: _handler2,
              middleware: middleware
            });
          }
        };
      });
      toggleEventListeners(instance, 'add');
    }

    function unmounted(el) {
      // `filter` instead of `find` for compat with IE
      var instance = instances.filter(function (instance) {
        return instance.el === el;
      })[0];
      toggleEventListeners(instance, 'remove');
    }

    var directive = {
      beforeMount: beforeMount,
      updated: updated,
      unmounted: unmounted,
      instances: instances
    };
    var clickOutside = directive;

    const FIXED_TOP_CLASS = 'is-fixed-top';
    const BODY_FIXED_TOP_CLASS = 'has-navbar-fixed-top';
    const BODY_SPACED_FIXED_TOP_CLASS = 'has-spaced-navbar-fixed-top';
    const FIXED_BOTTOM_CLASS = 'is-fixed-bottom';
    const BODY_FIXED_BOTTOM_CLASS = 'has-navbar-fixed-bottom';
    const BODY_SPACED_FIXED_BOTTOM_CLASS = 'has-spaced-navbar-fixed-bottom';
    const BODY_CENTERED_CLASS = 'has-navbar-centered';

    const isFilled = (str) => !!str;

    var script$2 = {
        name: 'BNavbar',
        components: {
            NavbarBurger: script$3
        },
        directives: {
            clickOutside
        },
        props: {
            type: [String, Object],
            transparent: {
                type: Boolean,
                default: false
            },
            fixedTop: {
                type: Boolean,
                default: false
            },
            fixedBottom: {
                type: Boolean,
                default: false
            },
            modelValue: {
                type: Boolean,
                default: false
            },
            centered: {
                type: Boolean,
                default: false
            },
            wrapperClass: {
                type: String
            },
            closeOnClick: {
                type: Boolean,
                default: true
            },
            mobileBurger: {
                type: Boolean,
                default: true
            },
            spaced: Boolean,
            shadow: Boolean
        },
        emits: ['update:modelValue'],
        data() {
            return {
                internalIsActive: this.modelValue,
                _isNavBar: true // Used internally by NavbarItem
            }
        },
        computed: {
            isOpened() {
                return this.internalIsActive
            },
            computedClasses() {
                return [
                    this.type,
                    {
                        [FIXED_TOP_CLASS]: this.fixedTop,
                        [FIXED_BOTTOM_CLASS]: this.fixedBottom,
                        [BODY_CENTERED_CLASS]: this.centered,
                        'is-spaced': this.spaced,
                        'has-shadow': this.shadow,
                        'is-transparent': this.transparent
                    }
                ]
            }
        },
        watch: {
            modelValue: {
                handler(active) {
                    this.internalIsActive = active;
                },
                immediate: true
            },
            fixedTop(isSet) {
                // toggle body class only on update to handle multiple navbar
                this.setBodyFixedTopClass(isSet);
            },
            bottomTop(isSet) {
                // toggle body class only on update to handle multiple navbar
                this.setBodyFixedBottomClass(isSet);
            }
        },
        methods: {
            toggleActive() {
                this.internalIsActive = !this.internalIsActive;
                this.emitUpdateParentEvent();
            },
            closeMenu() {
                if (this.closeOnClick && this.internalIsActive) {
                    this.internalIsActive = false;
                    this.emitUpdateParentEvent();
                }
            },
            emitUpdateParentEvent() {
                this.$emit('update:modelValue', this.internalIsActive);
            },
            setBodyClass(className) {
                if (typeof window !== 'undefined') {
                    document.body.classList.add(className);
                }
            },
            removeBodyClass(className) {
                if (typeof window !== 'undefined') {
                    document.body.classList.remove(className);
                }
            },
            checkIfFixedPropertiesAreColliding() {
                const areColliding = this.fixedTop && this.fixedBottom;
                if (areColliding) {
                    throw new Error('You should choose if the BNavbar is fixed bottom or fixed top, but not both')
                }
            },
            genNavbar() {
                const navBarSlots = [
                    this.genNavbarBrandNode(),
                    this.genNavbarSlotsNode()
                ];

                if (!isFilled(this.wrapperClass)) {
                    return this.genNavbarSlots(navBarSlots)
                }

                // It wraps the slots into a div with the provided wrapperClass prop
                const navWrapper = vue.h(
                    'div',
                    { class: this.wrapperClass },
                    navBarSlots
                );

                return this.genNavbarSlots([navWrapper])
            },
            genNavbarSlots(slots) {
                const vnode = vue.h(
                    'nav',
                    {
                        class: ['navbar', this.computedClasses],
                        role: 'navigation',
                        'aria-label': 'main navigation'
                    },
                    slots
                );
                return vue.withDirectives(vnode, [
                    [vue.resolveDirective('click-outside'), this.closeMenu]
                ])
            },
            genNavbarBrandNode() {
                return vue.h(
                    'div',
                    { class: 'navbar-brand' },
                    [this.$slots.brand(), this.genBurgerNode()]
                )
            },
            genBurgerNode() {
                if (this.mobileBurger) {
                    const defaultBurgerNode = vue.h(
                        vue.resolveComponent('navbar-burger'),
                        {
                            isOpened: this.isOpened,
                            onClick: this.toggleActive
                        }
                    );

                    const hasBurgerSlot = !!this.$slots.burger;
                    return hasBurgerSlot
                        ? this.$slots.burger({
                            isOpened: this.isOpened,
                            toggleActive: this.toggleActive
                        })
                        : defaultBurgerNode
                }
            },
            genNavbarSlotsNode() {
                return vue.h(
                    'div',
                    { class: ['navbar-menu', { 'is-active': this.isOpened }] },
                    [
                        this.genMenuPosition('start'),
                        this.genMenuPosition('end')
                    ]
                )
            },
            genMenuPosition(positionName) {
                return vue.h(
                    'div',
                    { class: `navbar-${positionName}` },
                    this.$slots[positionName] != null
                        ? this.$slots[positionName]()
                        : []
                )
            },
            setBodyFixedTopClass(isSet) {
                this.checkIfFixedPropertiesAreColliding();
                if (isSet) {
                    // TODO Apply only one of the classes once PR is merged in Bulma:
                    // https://github.com/jgthms/bulma/pull/2737
                    this.setBodyClass(BODY_FIXED_TOP_CLASS);
                    this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
                } else {
                    this.removeBodyClass(BODY_FIXED_TOP_CLASS);
                    this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
                }
            },
            setBodyFixedBottomClass(isSet) {
                this.checkIfFixedPropertiesAreColliding();
                if (isSet) {
                    // TODO Apply only one of the classes once PR is merged in Bulma:
                    // https://github.com/jgthms/bulma/pull/2737
                    this.setBodyClass(BODY_FIXED_BOTTOM_CLASS);
                    this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
                } else {
                    this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS);
                    this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
                }
            }
        },
        beforeMount() {
            this.fixedTop && this.setBodyFixedTopClass(true);
            this.fixedBottom && this.setBodyFixedBottomClass(true);
        },
        beforeUnmount() {
            if (this.fixedTop) {
                const className = this.spaced
                    ? BODY_SPACED_FIXED_TOP_CLASS
                    : BODY_FIXED_TOP_CLASS;
                this.removeBodyClass(className);
            } else if (this.fixedBottom) {
                const className = this.spaced
                    ? BODY_SPACED_FIXED_BOTTOM_CLASS
                    : BODY_FIXED_BOTTOM_CLASS;
                this.removeBodyClass(className);
            }
        },
        render() {
            return this.genNavbar()
        }
    };

    script$2.__file = "src/components/navbar/Navbar.vue";

    const clickableWhiteList = ['div', 'span', 'input'];

    var script$1 = {
        name: 'BNavbarItem',
        inheritAttrs: false,
        props: {
            tag: {
                type: String,
                default: 'a'
            },
            active: Boolean
        },
        methods: {
            /**
             * Keypress event that is bound to the document
             */
            keyPress({ key }) {
                if (key === 'Escape' || key === 'Esc') {
                    this.closeMenuRecursive(this, ['NavBar']);
                }
            },
            /**
             * Close parent if clicked outside.
             */
            handleClickEvent(event) {
                const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName);
                if (!isOnWhiteList) {
                    const parent = this.closeMenuRecursive(this, ['NavbarDropdown', 'NavBar']);
                    if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ['NavBar']);
                }
            },
            /**
             * Close parent recursively
             */
            closeMenuRecursive(current, targetComponents) {
                if (!current.$parent) return null
                const foundItem = targetComponents.reduce((acc, item) => {
                    if (current.$parent.$data[`_is${item}`]) {
                        current.$parent.closeMenu();
                        return current.$parent
                    }
                    return acc
                }, null);
                return foundItem || this.closeMenuRecursive(current.$parent, targetComponents)
            }
        },
        mounted() {
            if (typeof window !== 'undefined') {
                this.$el.addEventListener('click', this.handleClickEvent);
                document.addEventListener('keyup', this.keyPress);
            }
        },
        beforeUnmount() {
            if (typeof window !== 'undefined') {
                this.$el.removeEventListener('click', this.handleClickEvent);
                document.removeEventListener('keyup', this.keyPress);
            }
        }
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), vue.mergeProps({
        class: ["navbar-item", {
                'is-active': $props.active
            }]
      }, _ctx.$attrs), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["class"]))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/navbar/NavbarItem.vue";

    var script = {
        name: 'BNavbarDropdown',
        directives: {
            clickOutside
        },
        props: {
            label: String,
            hoverable: Boolean,
            active: Boolean,
            right: Boolean,
            arrowless: Boolean,
            boxed: Boolean,
            closeOnClick: {
                type: Boolean,
                default: true
            },
            collapsible: Boolean

        },
        data() {
            return {
                newActive: this.active,
                isHoverable: this.hoverable,
                _isNavbarDropdown: true // Used internally by NavbarItem
            }
        },
        watch: {
            active(value) {
                this.newActive = value;
            }
        },
        methods: {
            showMenu() {
                this.newActive = true;
            },
            /**
            * See naming convetion of navbaritem
            */
            closeMenu() {
                this.newActive = !this.closeOnClick;
                if (this.hoverable && this.closeOnClick) {
                    this.isHoverable = false;
                }
            },
            checkHoverable() {
                if (this.hoverable) {
                    this.isHoverable = true;
                }
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_click_outside = vue.resolveDirective("click-outside");

      return vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
        class: ["navbar-item has-dropdown", {
                'is-hoverable': $data.isHoverable,
                'is-active': $data.newActive
            }],
        onMouseenter: _cache[2] || (_cache[2] = (...args) => ($options.checkHoverable && $options.checkHoverable(...args)))
      }, [
        vue.createVNode("a", {
          class: ["navbar-link", {
                    'is-arrowless': $props.arrowless,
                    'is-active': $data.newActive && $props.collapsible
                }],
          role: "menuitem",
          "aria-haspopup": "true",
          href: "#",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers($event => ($data.newActive = !$data.newActive), ["prevent"]))
        }, [
          ($props.label)
            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                vue.createTextVNode(vue.toDisplayString($props.label), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : vue.renderSlot(_ctx.$slots, "label", { key: 1 })
        ], 2 /* CLASS */),
        vue.withDirectives(vue.createVNode("div", {
          class: ["navbar-dropdown", {
                    'is-right': $props.right,
                    'is-boxed': $props.boxed,
                }]
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */), [
          [vue.vShow, !$props.collapsible || ($props.collapsible && $data.newActive)]
        ])
      ], 34 /* CLASS, HYDRATE_EVENTS */)), [
        [_directive_click_outside, $options.closeMenu]
      ])
    }

    script.render = render;
    script.__file = "src/components/navbar/NavbarDropdown.vue";

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
        registerComponent(Vue, script$2);
        registerComponent(Vue, script$1);
        registerComponent(Vue, script);
      }
    };
    use(Plugin);

    exports.BNavbar = script$2;
    exports.BNavbarDropdown = script;
    exports.BNavbarItem = script$1;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
