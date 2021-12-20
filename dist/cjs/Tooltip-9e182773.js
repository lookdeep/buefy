'use strict';

var config = require('./config-2c63be1d.js');
var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');

var script = {
    name: 'BTooltip',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: () => config.config.defaultTooltipType
        },
        label: String,
        delay: {
            type: Number,
            default: () => config.config.defaultTooltipDelay
        },
        position: {
            type: String,
            default: 'is-top',
            validator(value) {
                return [
                    'is-top',
                    'is-bottom',
                    'is-left',
                    'is-right'
                ].indexOf(value) > -1
            }
        },
        triggers: {
            type: Array,
            default: () => ['hover']
        },
        always: Boolean,
        square: Boolean,
        dashed: Boolean,
        multilined: Boolean,
        size: {
            type: String,
            default: 'is-medium'
        },
        appendToBody: Boolean,
        animated: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        contentClass: String,
        autoClose: {
            type: [Array, Boolean],
            default: true
        }
    },
    data() {
        return {
            isActive: false,
            triggerStyle: {},
            timer: null,
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return ['b-tooltip', this.type, this.position, this.size, {
                'is-square': this.square,
                'is-always': this.always,
                'is-multiline': this.multilined,
                'is-dashed': this.dashed
            }]
        },
        newAnimation() {
            return this.animated ? this.animation : undefined
        }
    },
    watch: {
        isActive(value) {
            if (this.appendToBody) {
                this.updateAppendToBody();
            }
        }
    },
    methods: {
        updateAppendToBody() {
            const tooltip = this.$refs.tooltip;
            const trigger = this.$refs.trigger;
            if (tooltip && trigger) {
                // update wrapper tooltip
                const tooltipEl = this.$data._bodyEl.children[0];
                tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item));
                if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
                    tooltipEl.classList.add(this.$vnode.data.staticClass);
                }
                this.rootClasses.forEach((item) => {
                    if (typeof item === 'object') {
                        for (const key in item) {
                            if (item[key]) {
                                tooltipEl.classList.add(key);
                            }
                        }
                    } else {
                        tooltipEl.classList.add(item);
                    }
                });
                tooltipEl.style.width = `${trigger.clientWidth}px`;
                tooltipEl.style.height = `${trigger.clientHeight}px`;
                const rect = trigger.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const left = rect.left + window.scrollX;
                const wrapper = this.$data._bodyEl;
                wrapper.style.position = 'absolute';
                wrapper.style.top = `${top}px`;
                wrapper.style.left = `${left}px`;
                wrapper.style.zIndex = this.isActive || this.always ? '99' : '-1';
                this.triggerStyle = { zIndex: this.isActive || this.always ? '100' : undefined };
            }
        },
        onClick() {
            if (this.triggers.indexOf('click') < 0) return
            // if not active, toggle after clickOutside event
            // this fixes toggling programmatic
            this.$nextTick(() => {
                setTimeout(() => this.open());
            });
        },
        onHover() {
            if (this.triggers.indexOf('hover') < 0) return
            this.open();
        },
        onContextMenu(e) {
            if (this.triggers.indexOf('contextmenu') < 0) return
            e.preventDefault();
            this.open();
        },
        onFocus() {
            if (this.triggers.indexOf('focus') < 0) return
            this.open();
        },
        open() {
            if (this.delay) {
                this.timer = setTimeout(() => {
                    this.isActive = true;
                    this.timer = null;
                }, this.delay);
            } else {
                this.isActive = true;
            }
        },
        close() {
            if (typeof this.autoClose === 'boolean') {
                this.isActive = !this.autoClose;
                if (this.autoClose && this.timer) clearTimeout(this.timer);
            }
        },
        /**
        * Close tooltip if clicked outside.
        */
        clickedOutside(event) {
            if (this.isActive) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.includes('outside')) {
                        if (!this.isInWhiteList(event.target)) {
                            this.isActive = false;
                            return
                        }
                    }
                    if (this.autoClose.includes('inside')) {
                        if (this.isInWhiteList(event.target)) this.isActive = false;
                    }
                }
            }
        },
        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf('escape') >= 0) this.isActive = false;
                }
            }
        },
        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
            if (el === this.$refs.content) return true
            // All chidren from content
            if (this.$refs.content !== undefined) {
                const children = this.$refs.content.querySelectorAll('*');
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        }
    },
    mounted() {
        if (this.appendToBody && typeof window !== 'undefined') {
            this.$data._bodyEl = helpers.createAbsoluteElement(this.$refs.content);
            this.updateAppendToBody();
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
            document.removeEventListener('keyup', this.keyPress);
        }
        if (this.appendToBody) {
            helpers.removeElement(this.$data._bodyEl);
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("span", {
    ref: "tooltip",
    class: $options.rootClasses
  }, [
    vue.createVNode(vue.Transition, { name: $options.newAnimation }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("div", {
          ref: "content",
          class: ['tooltip-content', $props.contentClass]
        }, [
          ($props.label)
            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                vue.createTextVNode(vue.toDisplayString($props.label), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : (_ctx.$slots.content)
              ? vue.renderSlot(_ctx.$slots, "content", { key: 1 })
              : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */), [
          [vue.vShow, $props.active && ($data.isActive || $props.always)]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"]),
    vue.createVNode("div", {
      ref: "trigger",
      class: "tooltip-trigger",
      style: $data.triggerStyle,
      onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
      onContextmenu: _cache[2] || (_cache[2] = (...args) => ($options.onContextMenu && $options.onContextMenu(...args))),
      onMouseenter: _cache[3] || (_cache[3] = (...args) => ($options.onHover && $options.onHover(...args))),
      onFocusCapture: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
      onBlurCapture: _cache[5] || (_cache[5] = (...args) => ($options.close && $options.close(...args))),
      onMouseleave: _cache[6] || (_cache[6] = (...args) => ($options.close && $options.close(...args)))
    }, [
      vue.renderSlot(_ctx.$slots, "default", { ref: "slot" })
    ], 36 /* STYLE, HYDRATE_EVENTS */)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/tooltip/Tooltip.vue";

exports.script = script;
