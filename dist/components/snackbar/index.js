/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Snackbar = {}, global.Vue));
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

  var NoticeMixin = {
    props: {
      type: {
        type: String,
        default: 'is-dark'
      },
      message: [String, Array],
      duration: Number,
      queue: {
        type: Boolean,
        default: undefined
      },
      indefinite: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'is-top',
        validator: function validator(value) {
          return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
        }
      },
      container: String
    },
    emits: ['close'],
    data: function data() {
      return {
        isActive: false,
        parentTop: null,
        parentBottom: null,
        newContainer: this.container || config.defaultContainerElement
      };
    },
    computed: {
      correctParent: function correctParent() {
        switch (this.position) {
          case 'is-top-right':
          case 'is-top':
          case 'is-top-left':
            return this.parentTop;

          case 'is-bottom-right':
          case 'is-bottom':
          case 'is-bottom-left':
            return this.parentBottom;
        }
      },
      transition: function transition() {
        switch (this.position) {
          case 'is-top-right':
          case 'is-top':
          case 'is-top-left':
            return {
              enter: 'fadeInDown',
              leave: 'fadeOut'
            };

          case 'is-bottom-right':
          case 'is-bottom':
          case 'is-bottom-left':
            return {
              enter: 'fadeInUp',
              leave: 'fadeOut'
            };
        }
      }
    },
    methods: {
      shouldQueue: function shouldQueue() {
        var queue = this.queue !== undefined ? this.queue : config.defaultNoticeQueue;
        if (!queue) return false;
        return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
      },
      close: function close() {
        var _this = this;

        clearTimeout(this.timer);
        this.isActive = false;
        this.$emit('close'); // Timeout for the animation complete before destroying

        setTimeout(function () {
          removeElement(_this.$el);
        }, 150);
      },
      showNotice: function showNotice() {
        var _this2 = this;

        if (this.shouldQueue()) {
          // Call recursively if should queue
          setTimeout(function () {
            return _this2.showNotice();
          }, 250);
          return;
        }

        this.correctParent.insertAdjacentElement('afterbegin', this.$el);
        this.isActive = true;

        if (!this.indefinite) {
          this.timer = setTimeout(function () {
            return _this2.close();
          }, this.newDuration);
        }
      },
      setupContainer: function setupContainer() {
        this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-top');
        this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-bottom');
        if (this.parentTop && this.parentBottom) return;

        if (!this.parentTop) {
          this.parentTop = document.createElement('div');
          this.parentTop.className = 'notices is-top';
        }

        if (!this.parentBottom) {
          this.parentBottom = document.createElement('div');
          this.parentBottom.className = 'notices is-bottom';
        }

        var container = document.querySelector(this.newContainer) || document.body;
        container.appendChild(this.parentTop);
        container.appendChild(this.parentBottom);

        if (this.newContainer) {
          this.parentTop.classList.add('has-custom-container');
          this.parentBottom.classList.add('has-custom-container');
        }
      }
    },
    beforeMount: function beforeMount() {
      this.setupContainer();
    },
    mounted: function mounted() {
      this.showNotice();
    }
  };

  var script = {
      name: 'BSnackbar',
      mixins: [NoticeMixin],
      props: {
          actionText: {
              type: String,
              default: 'OK'
          },
          onAction: {
              type: Function,
              default: () => {}
          },
          cancelText: {
              type: String,
              default: null
          }
      },
      data() {
          return {
              newDuration: this.duration || config.defaultSnackbarDuration
          }
      },
      methods: {
          /**
          * Click listener.
          * Call action prop before closing (from Mixin).
          */
          action() {
              this.onAction();
              this.close();
          }
      }
  };

  const _hoisted_1 = { class: "button" };
  const _hoisted_2 = { class: "button" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.Transition, {
      "enter-active-class": _ctx.transition.enter,
      "leave-active-class": _ctx.transition.leave
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("div", {
          class: ["snackbar", [_ctx.type,_ctx.position]],
          role: $props.actionText ? 'alertdialog' : 'alert'
        }, [
          (_ctx.$slots.default)
            ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
            : (vue.openBlock(), vue.createBlock("div", {
                key: 1,
                class: "text",
                innerHTML: _ctx.message
              }, null, 8 /* PROPS */, ["innerHTML"])),
          ($props.cancelText)
            ? (vue.openBlock(), vue.createBlock("div", {
                key: 2,
                class: "action is-light is-cancel",
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args)))
              }, [
                vue.createVNode("button", _hoisted_1, vue.toDisplayString($props.cancelText), 1 /* TEXT */)
              ]))
            : vue.createCommentVNode("v-if", true),
          ($props.actionText)
            ? (vue.openBlock(), vue.createBlock("div", {
                key: 3,
                class: ["action", _ctx.type],
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.action && $options.action(...args)))
              }, [
                vue.createVNode("button", _hoisted_2, vue.toDisplayString($props.actionText), 1 /* TEXT */)
              ], 2 /* CLASS */))
            : vue.createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, ["role"]), [
          [vue.vShow, _ctx.isActive]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["enter-active-class", "leave-active-class"]))
  }

  script.render = render;
  script.__file = "src/components/snackbar/Snackbar.vue";

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
    if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
    Vue.config.globalProperties.$buefy[property] = component;
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var SnackbarProgrammatic = {
    open: function open(params) {
      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      var defaultParam = {
        type: 'is-success',
        position: 'is-bottom-right'
      };

      if (params.parent) {
        delete params.parent;
      }

      var slot;

      if (Array.isArray(params.message)) {
        slot = params.message;
        delete params.message;
      }

      var propsData = merge(defaultParam, params);
      var container = document.createElement('div');
      var vueInstance = vue.createApp({
        data: function data() {
          return {
            snackbarVNode: null
          };
        },
        methods: {
          close: function close() {
            var snackbar = getComponentFromVNode(this.snackbarVNode);

            if (snackbar) {
              snackbar.close();
            }
          }
        },
        render: function render() {
          this.snackbarVNode = vue.h(script, _objectSpread(_objectSpread({}, propsData), {}, {
            onClose: function onClose() {
              if (typeof propsData.onClose === 'function') {
                propsData.onClose();
              } // timeout for the animation complete
              // before unmounting


              setTimeout(function () {
                vueInstance.unmount();
              }, 150);
            }
          }), slot != null ? {
            default: function _default() {
              return slot;
            }
          } : undefined);
          return this.snackbarVNode;
        }
      });
      return vueInstance.mount(container);
    }
  };
  var Plugin = {
    install: function install(Vue) {
      registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
    }
  };
  use(Plugin);

  exports.BSnackbar = script;
  exports.SnackbarProgrammatic = SnackbarProgrammatic;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
