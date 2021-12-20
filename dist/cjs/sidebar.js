'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-2c63be1d.js');
var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');

var script = {
    name: 'BSidebar',
    props: {
        modelValue: Boolean,
        type: [String, Object],
        overlay: Boolean,
        position: {
            type: String,
            default: 'fixed',
            validator: (value) => {
                return [
                    'fixed',
                    'absolute',
                    'static'
                ].indexOf(value) >= 0
            }
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
            type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'outside']
        },
        onCancel: {
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
        }
    },
    emits: ['close', 'update:modelValue'],
    data() {
        return {
            isOpen: this.modelValue,
            transitionName: null,
            animating: true,
            savedScrollTop: null
        }
    },
    computed: {
        rootClasses() {
            return [this.type, {
                'is-fixed': this.isFixed,
                'is-static': this.isStatic,
                'is-absolute': this.isAbsolute,
                'is-fullheight': this.fullheight,
                'is-fullwidth': this.fullwidth,
                'is-right': this.right,
                'is-mini': this.reduce,
                'is-mini-expand': this.expandOnHover,
                'is-mini-expand-fixed': this.expandOnHover && this.expandOnHoverFixed,
                'is-mini-mobile': this.mobile === 'reduce',
                'is-hidden-mobile': this.mobile === 'hide',
                'is-fullwidth-mobile': this.mobile === 'fullwidth'
            }]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? ['escape', 'outside']
                    : []
                : this.canCancel
        },
        isStatic() {
            return this.position === 'static'
        },
        isFixed() {
            return this.position === 'fixed'
        },
        isAbsolute() {
            return this.position === 'absolute'
        }
    },
    watch: {
        modelValue: {
            handler(value) {
                this.isOpen = value;
                if (this.overlay) {
                    this.handleScroll();
                }
                const open = this.right ? !value : value;
                this.transitionName = !open ? 'slide-prev' : 'slide-next';
            },
            immediate: true
        }
    },
    methods: {
        /**
        * White-listed items to not close when clicked.
        * Add sidebar content and all children.
        */
        getWhiteList() {
            const whiteList = [];
            whiteList.push(this.$refs.sidebarContent);
            // Add all chidren from dropdown
            if (this.$refs.sidebarContent !== undefined) {
                const children = this.$refs.sidebarContent.querySelectorAll('*');
                for (const child of children) {
                    whiteList.push(child);
                }
            }
            return whiteList
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isFixed) {
                if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
            }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.isStatic) return

            this.onCancel.apply(null, arguments);
            this.close();
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close() {
            this.isOpen = false;
            this.$emit('close');
            this.$emit('update:modelValue', false);
        },

        /**
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event) {
            if (this.isFixed) {
                if (this.isOpen && !this.animating) {
                    const target = helpers.isCustomElement(this) ? event.composedPath()[0] : event.target;
                    if (this.getWhiteList().indexOf(target) < 0) {
                        this.cancel('outside');
                    }
                }
            }
        },

        /**
        * Transition before-enter hook
        */
        beforeEnter() {
            this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterEnter() {
            this.animating = false;
        },

        handleScroll() {
            if (typeof window === 'undefined') return

            if (this.scroll === 'clip') {
                if (this.modelValue) {
                    document.documentElement.classList.add('is-clipped');
                } else {
                    document.documentElement.classList.remove('is-clipped');
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop;

            if (this.modelValue) {
                document.body.classList.add('is-noscroll');
            } else {
                document.body.classList.remove('is-noscroll');
            }

            if (this.modelValue) {
                document.body.style.top = `-${this.savedScrollTop}px`;
                return
            }

            document.documentElement.scrollTop = this.savedScrollTop;
            document.body.style.top = null;
            this.savedScrollTop = null;
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
            document.addEventListener('click', this.clickedOutside);
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (this.isFixed) {
                document.body.appendChild(this.$el);
            }
        }
        if (this.overlay && this.modelValue) {
            this.handleScroll();
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
            document.removeEventListener('click', this.clickedOutside);
            if (this.overlay) {
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
        if (this.isFixed) {
            helpers.removeElement(this.$el);
        }
    }
};

const _hoisted_1 = { class: "b-sidebar" };
const _hoisted_2 = {
  key: 0,
  class: "sidebar-background"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    ($props.overlay && $data.isOpen)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_2))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode(vue.Transition, {
      name: $data.transitionName,
      onBeforeEnter: $options.beforeEnter,
      onAfterEnter: $options.afterEnter
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("div", {
          ref: "sidebarContent",
          class: ["sidebar-content", $options.rootClasses]
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */), [
          [vue.vShow, $data.isOpen]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name", "onBeforeEnter", "onAfterEnter"])
  ]))
}

script.render = render;
script.__file = "src/components/sidebar/Sidebar.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BSidebar = script;
exports["default"] = Plugin;
