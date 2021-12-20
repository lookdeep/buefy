import { c as config } from './config-1ce4c54c.js';
import { q as isCustomElement, r as removeElement } from './helpers-2263d431.js';
import { openBlock, createBlock, createCommentVNode, createVNode, Transition, withCtx, withDirectives, renderSlot, vShow } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';

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
                    const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
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
            removeElement(this.$el);
        }
    }
};

const _hoisted_1 = { class: "b-sidebar" };
const _hoisted_2 = {
  key: 0,
  class: "sidebar-background"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    ($props.overlay && $data.isOpen)
      ? (openBlock(), createBlock("div", _hoisted_2))
      : createCommentVNode("v-if", true),
    createVNode(Transition, {
      name: $data.transitionName,
      onBeforeEnter: $options.beforeEnter,
      onAfterEnter: $options.afterEnter
    }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", {
          ref: "sidebarContent",
          class: ["sidebar-content", $options.rootClasses]
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */), [
          [vShow, $data.isOpen]
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
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BSidebar, Plugin as default };
