'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var trapFocus = require('./trapFocus-c795a1dd.js');
var Icon = require('./Icon-dc7b693f.js');
var Modal = require('./Modal-85555d92.js');
var config = require('./config-2c63be1d.js');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');

var script = {
    name: 'BDialog',
    components: {
        [Icon.script.name]: Icon.script
    },
    directives: {
        trapFocus: trapFocus.trapFocus
    },
    extends: Modal.script,
    props: {
        title: String,
        message: [String, Array],
        unsafeHtmlMessage: String,
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
                return config.config.defaultDialogConfirmText
                    ? config.config.defaultDialogConfirmText
                    : 'OK'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return config.config.defaultDialogCancelText
                    ? config.config.defaultDialogCancelText
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
                return config.config.defaultContainerElement
            }
        },
        focusOn: {
            type: String,
            default: 'confirm'
        },
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.config.defaultTrapFocus
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
                helpers.removeElement(this.$el);
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
const _hoisted_7 = { key: 1 };
const _hoisted_8 = {
  key: 0,
  class: "field"
};
const _hoisted_9 = { class: "control" };
const _hoisted_10 = { class: "help is-danger" };
const _hoisted_11 = { class: "modal-card-foot" };

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
                        : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                            ($props.unsafeHtmlMessage)
                              ? (vue.openBlock(), vue.createBlock("div", {
                                  key: 0,
                                  innerHTML: $props.unsafeHtmlMessage
                                }, null, 8 /* PROPS */, ["innerHTML"]))
                              : (vue.openBlock(), vue.createBlock("div", _hoisted_7, vue.toDisplayString($props.message), 1 /* TEXT */))
                          ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                    ]),
                    ($props.hasInput)
                      ? (vue.openBlock(), vue.createBlock("div", _hoisted_8, [
                          vue.createVNode("div", _hoisted_9, [
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
                          vue.createVNode("p", _hoisted_10, vue.toDisplayString($data.validationMessage), 1 /* TEXT */)
                        ]))
                      : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ], 2 /* CLASS */),
              vue.createVNode("footer", _hoisted_11, [
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { helpers._defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
          var dialog = helpers.getComponentFromVNode(this.dialogVNode);

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

  if (!config.config.defaultProgrammaticPromise) {
    return createDialog();
  } else {
    return new Promise(function (resolve) {
      var dialog = createDialog(function (event) {
        return resolve({
          result: event || true,
          dialog: dialog
        });
      }, function () {
        return resolve({
          result: false,
          dialog: dialog
        });
      });
    });
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
    var propsData = helpers.merge(defaultParam, params);
    return open(propsData);
  },
  confirm: function confirm(params) {
    var defaultParam = {};
    var propsData = helpers.merge(defaultParam, params);
    return open(propsData);
  },
  prompt: function prompt(params) {
    var defaultParam = {
      hasInput: true
    };
    var propsData = helpers.merge(defaultParam, params);
    return open(propsData);
  }
};
var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
    plugins.registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic);
  }
};
plugins.use(Plugin);

exports.BDialog = script;
exports.DialogProgrammatic = DialogProgrammatic;
exports["default"] = Plugin;
