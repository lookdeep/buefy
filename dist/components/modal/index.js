/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Modal = {}, global.Vue));
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

  function getComponentFromVNode(vnode) {
    if (!vnode) {
      return undefined;
    }

    var component = vnode.component;

    if (!component) {
      return undefined;
    }

    return component.expose ? component.expose : component.proxy;
  }

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

  var script = {
      name: 'BModal',
      directives: {
          trapFocus
      },
      props: {
          modelValue: Boolean,
          component: [Object, Function, String],
          content: [String, Array],
          programmatic: Boolean,
          props: Object,
          events: Object,
          width: {
              type: [String, Number],
              default: 960
          },
          hasModalCard: Boolean,
          animation: {
              type: String,
              default: 'zoom-out'
          },
          canCancel: {
              type: [Array, Boolean],
              default: () => {
                  return config.defaultModalCanCancel
              }
          },
          cancelCallback: {
              type: Function,
              default: () => {}
          },
          scroll: {
              type: String,
              default: () => {
                  return config.defaultModalScroll
                      ? config.defaultModalScroll
                      : 'clip'
              },
              validator: (value) => {
                  return [
                      'clip',
                      'keep'
                  ].indexOf(value) >= 0
              }
          },
          fullScreen: Boolean,
          trapFocus: {
              type: Boolean,
              default: () => {
                  return config.defaultTrapFocus
              }
          },
          autoFocus: {
              type: Boolean,
              default: () => {
                  return config.defaultAutoFocus
              }
          },
          customClass: String,
          ariaRole: {
              type: String,
              validator: (value) => {
                  return [
                      'dialog',
                      'alertdialog'
                  ].indexOf(value) >= 0
              }
          },
          ariaModal: Boolean,
          ariaLabel: {
              type: String,
              validator: (value) => {
                  return Boolean(value)
              }
          },
          destroyOnHide: {
              type: Boolean,
              default: true
          }
      },
      emits: [
          'after-enter',
          'after-leave',
          'cancel',
          'close',
          'update:modelValue'
      ],
      data() {
          return {
              isActive: this.modelValue || false,
              savedScrollTop: null,
              newWidth: typeof this.width === 'number'
                  ? this.width + 'px'
                  : this.width,
              animating: !this.modelValue,
              destroyed: !this.modelValue
          }
      },
      computed: {
          cancelOptions() {
              return typeof this.canCancel === 'boolean'
                  ? this.canCancel
                      ? config.defaultModalCanCancel
                      : []
                  : this.canCancel
          },
          showX() {
              return this.cancelOptions.indexOf('x') >= 0
          },
          customStyle() {
              if (!this.fullScreen) {
                  return { maxWidth: this.newWidth }
              }
              return null
          }
      },
      watch: {
          modelValue(value) {
              this.isActive = value;
          },
          isActive(value) {
              if (value) this.destroyed = false;
              this.handleScroll();
              this.$nextTick(() => {
                  if (value && this.$el && this.$el.focus && this.autoFocus) {
                      this.$el.focus();
                  }
              });
          }
      },
      methods: {
          handleScroll() {
              if (typeof window === 'undefined') return

              if (this.scroll === 'clip') {
                  if (this.isActive) {
                      document.documentElement.classList.add('is-clipped');
                  } else {
                      document.documentElement.classList.remove('is-clipped');
                  }
                  return
              }

              this.savedScrollTop = !this.savedScrollTop
                  ? document.documentElement.scrollTop
                  : this.savedScrollTop;

              if (this.isActive) {
                  document.body.classList.add('is-noscroll');
              } else {
                  document.body.classList.remove('is-noscroll');
              }

              if (this.isActive) {
                  document.body.style.top = `-${this.savedScrollTop}px`;
                  return
              }

              document.documentElement.scrollTop = this.savedScrollTop;
              document.body.style.top = null;
              this.savedScrollTop = null;
          },

          /**
          * Close the Modal if canCancel and call the cancelCallback prop (function).
          */
          cancel(method) {
              if (this.cancelOptions.indexOf(method) < 0) return
              this.$emit('cancel', arguments);
              this.cancelCallback.apply(null, arguments);
              this.close();
          },

          /**
          * Call the cancelCallback prop (function).
          * Emit events, and destroy modal if it's programmatic.
          */
          close() {
              this.$emit('close');
              this.$emit('update:modelValue', false);

              // Timeout for the animation complete before destroying
              if (this.programmatic) {
                  this.isActive = false;
                  setTimeout(() => {
                      removeElement(this.$el);
                  }, 150);
              }
          },

          /**
          * Keypress event that is bound to the document.
          */
          keyPress({ key }) {
              if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
          },

          /**
          * Transition after-enter hook
          */
          afterEnter() {
              this.animating = false;
              this.$emit('after-enter');
          },

          /**
          * Transition before-leave hook
          */
          beforeLeave() {
              this.animating = true;
          },

          /**
          * Transition after-leave hook
          */
          afterLeave() {
              if (this.destroyOnHide) {
                  this.destroyed = true;
              }
              this.$emit('after-leave');
          }
      },
      created() {
          if (typeof window !== 'undefined') {
              document.addEventListener('keyup', this.keyPress);
          }
      },
      mounted() {
          if (this.programmatic) {
              // Insert the Modal component in body tag
              // only if it's programmatic
              // the following line used be in `beforeMount`
              // but $el is null at `beforeMount`
              document.body.appendChild(this.$el);
              this.isActive = true;
          } else if (this.isActive) this.handleScroll();
      },
      beforeUnmount() {
          if (typeof window !== 'undefined') {
              document.removeEventListener('keyup', this.keyPress);
              // reset scroll
              document.documentElement.classList.remove('is-clipped');
              const savedScrollTop = !this.savedScrollTop
                  ? document.documentElement.scrollTop
                  : this.savedScrollTop;
              document.body.classList.remove('is-noscroll');
              document.documentElement.scrollTop = savedScrollTop;
              document.body.style.top = null;
          }
      }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _directive_trap_focus = vue.resolveDirective("trap-focus");

    return (vue.openBlock(), vue.createBlock(vue.Transition, {
      name: $props.animation,
      onAfterEnter: $options.afterEnter,
      onBeforeLeave: $options.beforeLeave,
      onAfterLeave: $options.afterLeave
    }, {
      default: vue.withCtx(() => [
        (!$data.destroyed)
          ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: ["modal is-active", [{'is-full-screen': $props.fullScreen}, $props.customClass]],
              tabindex: "-1",
              role: $props.ariaRole,
              "aria-label": $props.ariaLabel,
              "aria-modal": $props.ariaModal
            }, [
              vue.createVNode("div", {
                class: "modal-background",
                onClick: _cache[1] || (_cache[1] = $event => ($options.cancel('outside')))
              }),
              vue.createVNode("div", {
                class: ["animation-content", { 'modal-content': !$props.hasModalCard }],
                style: $options.customStyle
              }, [
                ($props.component)
                  ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.component), vue.mergeProps({ key: 0 }, $props.props, vue.toHandlers($props.events), {
                      "can-cancel": $props.canCancel,
                      onClose: $options.close
                    }), null, 16 /* FULL_PROPS */, ["can-cancel", "onClose"]))
                  : ($props.content)
                    ? (vue.openBlock(), vue.createBlock("div", {
                        key: 1,
                        innerHTML: $props.content
                      }, null, 8 /* PROPS */, ["innerHTML"]))
                    : vue.renderSlot(_ctx.$slots, "default", {
                        key: 2,
                        canCancel: $props.canCancel,
                        close: $options.close
                      }),
                ($options.showX)
                  ? vue.withDirectives((vue.openBlock(), vue.createBlock("button", {
                      key: 3,
                      type: "button",
                      class: "modal-close is-large",
                      onClick: _cache[2] || (_cache[2] = $event => ($options.cancel('x')))
                    }, null, 512 /* NEED_PATCH */)), [
                      [vue.vShow, !$data.animating]
                    ])
                  : vue.createCommentVNode("v-if", true)
              ], 6 /* CLASS, STYLE */)
            ], 10 /* CLASS, PROPS */, ["role", "aria-label", "aria-modal"])), [
              [vue.vShow, $data.isActive],
              [_directive_trap_focus, $props.trapFocus]
            ])
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
  }

  script.render = render;
  script.__file = "src/components/modal/Modal.vue";

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };
  var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
    if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
    Vue.config.globalProperties.$buefy[property] = component;
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var ModalProgrammatic = {
    // component specified to the `component` option cannot resolve components
    // registered to the caller app, because `open` creates a brand-new app
    // by the `createApp` API.
    // so the component specified to the `component` option has to explicitly
    // reference components that it depends on.
    // see /docs/pages/components/modal/examples/ExProgrammatic for an example.
    open: function open(params) {
      if (typeof params === 'string') {
        params = {
          content: params
        };
      }

      var defaultParam = {
        programmatic: true
      };

      if (params.parent) {
        delete params.parent;
      }

      var slot;

      if (Array.isArray(params.content)) {
        slot = params.content;
        delete params.content;
      }

      var propsData = merge(defaultParam, params);
      var container = document.createElement('div'); // I could not figure out how to extend an existing app to create a new
      // Vue instance on Vue 3.

      var vueInstance = vue.createApp({
        data: function data() {
          return {
            modalVNode: null
          };
        },
        methods: {
          close: function close() {
            var modal = getComponentFromVNode(this.modalVNode);

            if (modal) {
              modal.close();
            }
          }
        },
        render: function render() {
          this.modalVNode = vue.h(script, _objectSpread(_objectSpread({}, propsData), {}, {
            onClose: function onClose() {
              vueInstance.unmount();
            }
          }), slot ? {
            default: function _default() {
              return slot;
            }
          } : undefined);
          return this.modalVNode;
        }
      });
      return vueInstance.mount(container);
    }
  };
  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, script);
      registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
    }
  };
  use(Plugin);

  exports.BModal = script;
  exports.ModalProgrammatic = ModalProgrammatic;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
