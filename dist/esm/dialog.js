import { r as removeElement, m as merge, x as getComponentFromVNode, _ as _defineProperty } from './helpers-2263d431.js';
import { resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, toDisplayString, createCommentVNode, renderSlot, mergeProps, withKeys, vModelDynamic, createApp, h } from 'vue';
import { t as trapFocus } from './trapFocus-d876d41a.js';
import { s as script$1 } from './Icon-fefef9ed.js';
import { s as script$2 } from './Modal-5ebd467f.js';
import { c as config } from './config-1ce4c54c.js';
import { u as use, a as registerComponent, r as registerComponentProgrammatic } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';

var script = {
    name: 'BDialog',
    components: {
        [script$1.name]: script$1
    },
    directives: {
        trapFocus
    },
    extends: script$2,
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
  const _component_b_icon = resolveComponent("b-icon");
  const _directive_trap_focus = resolveDirective("trap-focus");

  return (openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      ($data.isActive)
        ? withDirectives((openBlock(), createBlock("div", {
            key: 0,
            class: ["dialog modal is-active", $options.dialogClass],
            role: $props.ariaRole,
            "aria-modal": $props.ariaModal
          }, [
            createVNode("div", {
              class: "modal-background",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.cancel('outside')))
            }),
            createVNode("div", _hoisted_1, [
              ($props.title)
                ? (openBlock(), createBlock("header", _hoisted_2, [
                    createVNode("p", _hoisted_3, toDisplayString($props.title), 1 /* TEXT */)
                  ]))
                : createCommentVNode("v-if", true),
              createVNode("section", {
                class: ["modal-card-body", { 'is-titleless': !$props.title, 'is-flex': $props.hasIcon }]
              }, [
                createVNode("div", _hoisted_4, [
                  ($props.hasIcon && ($props.icon || $options.iconByType))
                    ? (openBlock(), createBlock("div", _hoisted_5, [
                        createVNode(_component_b_icon, {
                          icon: $props.icon ? $props.icon : $options.iconByType,
                          pack: $props.iconPack,
                          type: $props.type,
                          both: !$props.icon,
                          size: "is-large"
                        }, null, 8 /* PROPS */, ["icon", "pack", "type", "both"])
                      ]))
                    : createCommentVNode("v-if", true),
                  createVNode("div", _hoisted_6, [
                    createVNode("p", null, [
                      (_ctx.$slots.default)
                        ? renderSlot(_ctx.$slots, "default", { key: 0 })
                        : (openBlock(), createBlock("div", {
                            key: 1,
                            innerHTML: $props.message
                          }, null, 8 /* PROPS */, ["innerHTML"]))
                    ]),
                    ($props.hasInput)
                      ? (openBlock(), createBlock("div", _hoisted_7, [
                          createVNode("div", _hoisted_8, [
                            withDirectives(createVNode("input", mergeProps({
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.prompt = $event)),
                              class: ["input", { 'is-danger': $data.validationMessage }],
                              ref: "input"
                            }, $options.safeInputAttrs, {
                              onKeyup: _cache[3] || (_cache[3] = withKeys((...args) => ($options.confirm && $options.confirm(...args)), ["enter"]))
                            }), null, 16 /* FULL_PROPS */), [
                              [vModelDynamic, $data.prompt]
                            ])
                          ]),
                          createVNode("p", _hoisted_9, toDisplayString($data.validationMessage), 1 /* TEXT */)
                        ]))
                      : createCommentVNode("v-if", true)
                  ])
                ])
              ], 2 /* CLASS */),
              createVNode("footer", _hoisted_10, [
                ($options.showCancel)
                  ? (openBlock(), createBlock("button", {
                      key: 0,
                      class: "button",
                      ref: "cancelButton",
                      onClick: _cache[4] || (_cache[4] = $event => (_ctx.cancel('button')))
                    }, toDisplayString($props.cancelText), 513 /* TEXT, NEED_PATCH */))
                  : createCommentVNode("v-if", true),
                createVNode("button", {
                  class: ["button", $props.type],
                  ref: "confirmButton",
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.confirm && $options.confirm(...args)))
                }, toDisplayString($props.confirmText), 3 /* TEXT, CLASS */)
              ])
            ])
          ], 10 /* CLASS, PROPS */, ["role", "aria-modal"])), [
            [_directive_trap_focus, $props.trapFocus]
          ])
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script.render = render;
script.__file = "src/components/dialog/Dialog.vue";

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
    var vueInstance = createApp({
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
        this.dialogVNode = h(script, _objectSpread(_objectSpread({}, propsData), {}, {
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

  if (!config.defaultProgrammaticPromise) {
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

export { script as BDialog, DialogProgrammatic, Plugin as default };
