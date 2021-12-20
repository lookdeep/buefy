/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Dialog = {}, global.Vue));
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

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
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

  script$2.render = render$2;
  script$2.__file = "src/components/icon/Icon.vue";

  var script$1 = {
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

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
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

  script$1.render = render$1;
  script$1.__file = "src/components/modal/Modal.vue";

  var script = {
      name: 'BDialog',
      components: {
          [script$2.name]: script$2
      },
      directives: {
          trapFocus
      },
      extends: script$1,
      props: {
          title: String,
          message: [String, Array],
          icon: String,
          iconPack: String,
          hasIcon: Boolean,
          type: {
              type: String,
              default: 'is-primary'
          },
          size: String,
          confirmText: {
              type: String,
              default: () => {
                  return config.defaultDialogConfirmText
                      ? config.defaultDialogConfirmText
                      : 'OK'
              }
          },
          cancelText: {
              type: String,
              default: () => {
                  return config.defaultDialogCancelText
                      ? config.defaultDialogCancelText
                      : 'Cancel'
              }
          },
          hasInput: Boolean, // Used internally to know if it's prompt
          inputAttrs: {
              type: Object,
              default: () => ({})
          },
          confirmCallback: {
              type: Function,
              default: () => {}
          },
          closeOnConfirm: {
              type: Boolean,
              default: true
          },
          container: {
              type: String,
              default: () => {
                  return config.defaultContainerElement
              }
          },
          focusOn: {
              type: String,
              default: 'confirm'
          },
          trapFocus: {
              type: Boolean,
              default: () => {
                  return config.defaultTrapFocus
              }
          },
          ariaRole: {
              type: String,
              validator: (value) => {
                  return [
                      'dialog',
                      'alertdialog'
                  ].indexOf(value) >= 0
              }
          },
          ariaModal: Boolean
      },
      emits: ['confirm'],
      data() {
          const prompt = this.hasInput
              ? this.inputAttrs.value || ''
              : '';

          return {
              prompt,
              isActive: false,
              validationMessage: ''
          }
      },
      computed: {
          // `safeInputAttrs` is a shallow copy of `inputAttrs` except for `value`
          // `value` should not be specified to `v-bind` of the input element
          // because it inhibits `v-model` of the input on Vue 3
          safeInputAttrs() {
              const attrs = { ...this.inputAttrs };
              delete attrs.value;
              if (typeof attrs.required === 'undefined') {
                  attrs.required = true;
              }
              return attrs
          },
          dialogClass() {
              return [this.size, {
                  'has-custom-container': this.container !== null
              }]
          },
          /**
          * Icon name (MDI) based on the type.
          */
          iconByType() {
              switch (this.type) {
                  case 'is-info':
                      return 'information'
                  case 'is-success':
                      return 'check-circle'
                  case 'is-warning':
                      return 'alert'
                  case 'is-danger':
                      return 'alert-circle'
                  default:
                      return null
              }
          },
          showCancel() {
              return this.cancelOptions.indexOf('button') >= 0
          }
      },
      methods: {
          /**
          * If it's a prompt Dialog, validate the input.
          * Call the confirmCallback prop (function) and close the Dialog.
          */
          confirm() {
              if (this.$refs.input !== undefined) {
                  if (!this.$refs.input.checkValidity()) {
                      this.validationMessage = this.$refs.input.validationMessage;
                      this.$nextTick(() => this.$refs.input.select());
                      return
                  }
              }
              this.$emit('confirm', this.prompt);
              this.confirmCallback(this.prompt, this);
              if (this.closeOnConfirm) this.close();
          },

          /**
          * Close the Dialog.
          */
          close() {
              this.isActive = false;
              // Timeout for the animation complete before destroying
              setTimeout(() => {
                  removeElement(this.$el);
              }, 150);
          }
      },
      beforeMount() {
          // Insert the Dialog component in the element container
          if (typeof window !== 'undefined') {
              this.$nextTick(() => {
                  const container = document.querySelector(this.container) || document.body;
                  container.appendChild(this.$el);
              });
          }
      },
      mounted() {
          this.isActive = true;

          this.$nextTick(() => {
              // Handle which element receives focus
              if (this.hasInput) {
                  this.$refs.input.focus();
              } else if (this.focusOn === 'cancel' && this.showCancel) {
                  this.$refs.cancelButton.focus();
              } else {
                  this.$refs.confirmButton.focus();
              }
          });
      }
  };

  const _hoisted_1 = { class: "modal-card animation-content" };
  const _hoisted_2 = {
    key: 0,
    class: "modal-card-head"
  };
  const _hoisted_3 = { class: "modal-card-title" };
  const _hoisted_4 = { class: "media" };
  const _hoisted_5 = {
    key: 0,
    class: "media-left"
  };
  const _hoisted_6 = { class: "media-content" };
  const _hoisted_7 = {
    key: 0,
    class: "field"
  };
  const _hoisted_8 = { class: "control" };
  const _hoisted_9 = { class: "help is-danger" };
  const _hoisted_10 = { class: "modal-card-foot" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_b_icon = vue.resolveComponent("b-icon");
    const _directive_trap_focus = vue.resolveDirective("trap-focus");

    return (vue.openBlock(), vue.createBlock(vue.Transition, { name: _ctx.animation }, {
      default: vue.withCtx(() => [
        ($data.isActive)
          ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: ["dialog modal is-active", $options.dialogClass],
              role: $props.ariaRole,
              "aria-modal": $props.ariaModal
            }, [
              vue.createVNode("div", {
                class: "modal-background",
                onClick: _cache[1] || (_cache[1] = $event => (_ctx.cancel('outside')))
              }),
              vue.createVNode("div", _hoisted_1, [
                ($props.title)
                  ? (vue.openBlock(), vue.createBlock("header", _hoisted_2, [
                      vue.createVNode("p", _hoisted_3, vue.toDisplayString($props.title), 1 /* TEXT */)
                    ]))
                  : vue.createCommentVNode("v-if", true),
                vue.createVNode("section", {
                  class: ["modal-card-body", { 'is-titleless': !$props.title, 'is-flex': $props.hasIcon }]
                }, [
                  vue.createVNode("div", _hoisted_4, [
                    ($props.hasIcon && ($props.icon || $options.iconByType))
                      ? (vue.openBlock(), vue.createBlock("div", _hoisted_5, [
                          vue.createVNode(_component_b_icon, {
                            icon: $props.icon ? $props.icon : $options.iconByType,
                            pack: $props.iconPack,
                            type: $props.type,
                            both: !$props.icon,
                            size: "is-large"
                          }, null, 8 /* PROPS */, ["icon", "pack", "type", "both"])
                        ]))
                      : vue.createCommentVNode("v-if", true),
                    vue.createVNode("div", _hoisted_6, [
                      vue.createVNode("p", null, [
                        (_ctx.$slots.default)
                          ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
                          : (vue.openBlock(), vue.createBlock("div", {
                              key: 1,
                              innerHTML: $props.message
                            }, null, 8 /* PROPS */, ["innerHTML"]))
                      ]),
                      ($props.hasInput)
                        ? (vue.openBlock(), vue.createBlock("div", _hoisted_7, [
                            vue.createVNode("div", _hoisted_8, [
                              vue.withDirectives(vue.createVNode("input", vue.mergeProps({
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.prompt = $event)),
                                class: ["input", { 'is-danger': $data.validationMessage }],
                                ref: "input"
                              }, $options.safeInputAttrs, {
                                onKeyup: _cache[3] || (_cache[3] = vue.withKeys((...args) => ($options.confirm && $options.confirm(...args)), ["enter"]))
                              }), null, 16 /* FULL_PROPS */), [
                                [vue.vModelDynamic, $data.prompt]
                              ])
                            ]),
                            vue.createVNode("p", _hoisted_9, vue.toDisplayString($data.validationMessage), 1 /* TEXT */)
                          ]))
                        : vue.createCommentVNode("v-if", true)
                    ])
                  ])
                ], 2 /* CLASS */),
                vue.createVNode("footer", _hoisted_10, [
                  ($options.showCancel)
                    ? (vue.openBlock(), vue.createBlock("button", {
                        key: 0,
                        class: "button",
                        ref: "cancelButton",
                        onClick: _cache[4] || (_cache[4] = $event => (_ctx.cancel('button')))
                      }, vue.toDisplayString($props.cancelText), 513 /* TEXT, NEED_PATCH */))
                    : vue.createCommentVNode("v-if", true),
                  vue.createVNode("button", {
                    class: ["button", $props.type],
                    ref: "confirmButton",
                    onClick: _cache[5] || (_cache[5] = (...args) => ($options.confirm && $options.confirm(...args)))
                  }, vue.toDisplayString($props.confirmText), 3 /* TEXT, CLASS */)
                ])
              ])
            ], 10 /* CLASS, PROPS */, ["role", "aria-modal"])), [
              [_directive_trap_focus, $props.trapFocus]
            ])
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"]))
  }

  script.render = render;
  script.__file = "src/components/dialog/Dialog.vue";

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

  function open(propsData) {
    var slot;

    if (Array.isArray(propsData.message)) {
      slot = propsData.message;
      delete propsData.message;
    }

    function createDialog(_onConfirm, _onCancel) {
      var container = document.createElement('div');
      var vueInstance = vue.createApp({
        data: function data() {
          return {
            dialogVNode: null
          };
        },
        methods: {
          close: function close() {
            var dialog = getComponentFromVNode(this.dialogVNode);

            if (dialog) {
              dialog.close();
            }
          }
        },
        render: function render() {
          this.dialogVNode = vue.h(script, _objectSpread(_objectSpread({}, propsData), {}, {
            onConfirm: function onConfirm() {
              if (_onConfirm != null) {
                _onConfirm.apply(void 0, arguments);
              }
            },
            onCancel: function onCancel() {
              if (_onCancel != null) {
                _onCancel.apply(void 0, arguments);
              }

              vueInstance.unmount();
            }
          }), slot ? {
            default: function _default() {
              return slot;
            }
          } : undefined);
          return this.dialogVNode;
        }
      });
      return vueInstance.mount(container);
    }

    {
      return createDialog();
    }
  }

  var DialogProgrammatic = {
    alert: function alert(params) {
      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      var defaultParam = {
        canCancel: false
      };
      var propsData = merge(defaultParam, params);
      return open(propsData);
    },
    confirm: function confirm(params) {
      var defaultParam = {};
      var propsData = merge(defaultParam, params);
      return open(propsData);
    },
    prompt: function prompt(params) {
      var defaultParam = {
        hasInput: true
      };
      var propsData = merge(defaultParam, params);
      return open(propsData);
    }
  };
  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, script);
      registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic);
    }
  };
  use(Plugin);

  exports.BDialog = script;
  exports.DialogProgrammatic = DialogProgrammatic;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
