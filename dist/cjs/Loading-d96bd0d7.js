'use strict';

var helpers = require('./helpers-0d6e2444.js');
var ssr = require('./ssr-95fd856b.js');
var vue = require('vue');

var script = {
    name: 'BLoading',
    props: {
        modelValue: Boolean,
        programmatic: Boolean,
        container: [Object, Function, ssr.HTMLElement],
        isFullPage: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        canCancel: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    emits: ['close', 'update:is-full-page', 'update:modelValue'],
    data() {
        return {
            isActive: this.modelValue || false,
            displayInFullPage: this.isFullPage
        }
    },
    watch: {
        modelValue(value) {
            this.isActive = value;
        },
        isFullPage(value) {
            this.displayInFullPage = value;
        }
    },
    methods: {
        /**
        * Close the Modal if canCancel.
        */
        cancel() {
            if (!this.canCancel || !this.isActive) return

            this.close();
        },
        /**
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.onCancel.apply(null, arguments);
            this.$emit('close');
            this.$emit('update:modelValue', false);

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false;
                // TODO: should the following happen outside this component;
                // i.e., in index.js?
                setTimeout(() => {
                    helpers.removeElement(this.$el);
                }, 150);
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') this.cancel();
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    mounted() {
        // Insert the Loading component in body tag
        // only if it's programmatic
        // (moved from beforeMount because $el is not bound during beforeMount)
        // TODO: should this happen outside this component; i.e., in index.js?
        if (this.programmatic) {
            if (!this.container) {
                document.body.appendChild(this.$el);
            } else {
                this.displayInFullPage = false;
                this.$emit('update:is-full-page', false);
                this.container.appendChild(this.$el);
            }
            this.isActive = true;
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
};

const _hoisted_1 = /*#__PURE__*/vue.createVNode("div", { class: "loading-icon" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, { name: $props.animation }, {
    default: vue.withCtx(() => [
      ($data.isActive)
        ? (vue.openBlock(), vue.createBlock("div", {
            key: 0,
            class: ["loading-overlay is-active", { 'is-full-page': $data.displayInFullPage }]
          }, [
            vue.createVNode("div", {
              class: "loading-background",
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.cancel && $options.cancel(...args)))
            }),
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              _hoisted_1
            ])
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script.render = render;
script.__file = "src/components/loading/Loading.vue";

exports.script = script;
