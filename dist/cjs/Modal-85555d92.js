'use strict';

var trapFocus = require('./trapFocus-c795a1dd.js');
var helpers = require('./helpers-0d6e2444.js');
var config = require('./config-2c63be1d.js');
var vue = require('vue');

var script = {
    name: 'BModal',
    directives: {
        trapFocus: trapFocus.trapFocus
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
                return config.config.defaultModalCanCancel
            }
        },
        cancelCallback: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return config.config.defaultModalScroll
                    ? config.config.defaultModalScroll
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
                return config.config.defaultTrapFocus
            }
        },
        autoFocus: {
            type: Boolean,
            default: () => {
                return config.config.defaultAutoFocus
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
                    ? config.config.defaultModalCanCancel
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
                    helpers.removeElement(this.$el);
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

exports.script = script;
