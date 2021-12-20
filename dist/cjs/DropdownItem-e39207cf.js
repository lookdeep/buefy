'use strict';

var trapFocus = require('./trapFocus-c795a1dd.js');
var config = require('./config-2c63be1d.js');
var helpers = require('./helpers-0d6e2444.js');
var InjectedChildMixin = require('./InjectedChildMixin-d2127742.js');
var vue = require('vue');

const DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];

var script$1 = {
    name: 'BDropdown',
    directives: {
        trapFocus: trapFocus.trapFocus
    },
    mixins: [InjectedChildMixin.ProviderParentMixin('dropdown')],
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        disabled: Boolean,
        inline: Boolean,
        scrollable: Boolean,
        maxHeight: {
            type: [String, Number],
            default: 200
        },
        position: {
            type: String,
            validator(value) {
                return [
                    'is-top-right',
                    'is-top-left',
                    'is-bottom-left',
                    'is-bottom-right'
                ].indexOf(value) > -1
            }
        },
        triggers: {
            type: Array,
            default: () => ['click']
        },
        mobileModal: {
            type: Boolean,
            default: () => {
                return config.config.defaultDropdownMobileModal
            }
        },
        ariaRole: {
            type: String,
            validator(value) {
                return [
                    'menu',
                    'list',
                    'dialog'
                ].indexOf(value) > -1
            },
            default: null
        },
        animation: {
            type: String,
            default: 'fade'
        },
        multiple: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.config.defaultTrapFocus
            }
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        canClose: {
            type: [Array, Boolean],
            default: true
        },
        expanded: Boolean,
        appendToBody: Boolean,
        appendToBodyCopyParent: Boolean
    },
    emits: ['active-change', 'change', 'update:modelValue'],
    data() {
        return {
            selected: this.modelValue,
            style: {},
            isActive: false,
            isHoverable: false,
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [this.position, {
                'is-disabled': this.disabled,
                'is-hoverable': this.hoverable,
                'is-inline': this.inline,
                'is-active': this.isActive || this.inline,
                'is-mobile-modal': this.isMobileModal,
                'is-expanded': this.expanded
            }]
        },
        isMobileModal() {
            return this.mobileModal && !this.inline
        },
        cancelOptions() {
            return typeof this.canClose === 'boolean'
                ? this.canClose
                    ? DEFAULT_CLOSE_OPTIONS
                    : []
                : this.canClose
        },
        contentStyle() {
            return {
                maxHeight: this.scrollable ? helpers.toCssWidth(this.maxHeight) : null,
                overflow: this.scrollable ? 'auto' : null
            }
        },
        hoverable() {
            return this.triggers.indexOf('hover') >= 0
        }
    },
    watch: {
        /**
        * When v-model is changed set the new selected item.
        */
        modelValue(value) {
            this.selected = value;
        },

        /**
        * Emit event when isActive value is changed.
        */
        isActive(value) {
            this.$emit('active-change', value);
            if (this.appendToBody) {
                this.$nextTick(() => {
                    this.updateAppendToBody();
                });
            }
        }
    },
    methods: {
        /**
         * Click listener from DropdownItem.
         *   1. Set new selected item.
         *   2. Emit input event to update the user v-model.
         *   3. Close the dropdown.
         */
        selectItem(value) {
            if (this.multiple) {
                if (this.selected) {
                    if (this.selected.indexOf(value) === -1) {
                        // Add value
                        this.selected = [...this.selected, value];
                    } else {
                        // Remove value
                        this.selected = this.selected.filter((val) => val !== value);
                    }
                } else {
                    this.selected = [value];
                }
                this.$emit('change', this.selected);
            } else {
                if (this.selected !== value) {
                    this.selected = value;
                    this.$emit('change', this.selected);
                }
            }
            this.$emit('update:modelValue', this.selected);
            if (!this.multiple) {
                this.isActive = !this.closeOnClick;
                if (this.hoverable && this.closeOnClick) {
                    this.isHoverable = false;
                }
            }
        },

        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
            if (el === this.$refs.dropdownMenu) return true
            if (el === this.$refs.trigger) return true
            // All chidren from dropdown
            if (this.$refs.dropdownMenu !== undefined) {
                const children = this.$refs.dropdownMenu.querySelectorAll('*');
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            // All children from trigger
            if (this.$refs.trigger !== undefined) {
                const children = this.$refs.trigger.querySelectorAll('*');
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        },

        /**
        * Close dropdown if clicked outside.
        */
        clickedOutside(event) {
            if (this.cancelOptions.indexOf('outside') < 0) return
            if (this.inline) return

            const target = helpers.isCustomElement(this) ? event.composedPath()[0] : event.target;
            if (!this.isInWhiteList(target)) this.isActive = false;
        },

        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (this.cancelOptions.indexOf('escape') < 0) return
                this.isActive = false;
            }
        },

        onClick() {
            if (this.triggers.indexOf('click') < 0) return
            this.toggle();
        },
        onContextMenu() {
            if (this.triggers.indexOf('contextmenu') < 0) return
            this.toggle();
        },
        onHover() {
            if (this.triggers.indexOf('hover') < 0) return
            this.isHoverable = true;
        },
        onFocus() {
            if (this.triggers.indexOf('focus') < 0) return
            this.toggle();
        },

        /**
        * Toggle dropdown if it's not disabled.
        */
        toggle() {
            if (this.disabled) return

            if (!this.isActive) {
                // if not active, toggle after clickOutside event
                // this fixes toggling programmatic
                // $nextTick may not wait for other events since Vue 3.
                setTimeout(() => {
                    const value = !this.isActive;
                    this.isActive = value;
                });
            } else {
                this.isActive = !this.isActive;
            }
        },

        updateAppendToBody() {
            const dropdown = this.$refs.dropdown;
            const dropdownMenu = this.$refs.dropdownMenu;
            const trigger = this.$refs.trigger;
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const dropdownWrapper = this.$data._bodyEl.children[0];
                dropdownWrapper.classList.forEach((item) => dropdownWrapper.classList.remove(item));
                dropdownWrapper.classList.add('dropdown');
                dropdownWrapper.classList.add('dropdown-menu-animation');
                // TODO: the following test never becomes true on Vue 3.
                //       I have no idea about the intention of it.
                if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
                    dropdownWrapper.classList.add(this.$vnode.data.staticClass);
                }
                this.rootClasses.forEach((item) => {
                    // skip position prop
                    if (item && typeof item === 'object') {
                        for (const key in item) {
                            if (item[key]) {
                                dropdownWrapper.classList.add(key);
                            }
                        }
                    }
                });
                if (this.appendToBodyCopyParent) {
                    const parentNode = this.$refs.dropdown.parentNode;
                    const parent = this.$data._bodyEl;
                    parent.classList.forEach((item) => parent.classList.remove(item));
                    parentNode.classList.forEach((item) => {
                        parent.classList.add(item);
                    });
                }
                const rect = trigger.getBoundingClientRect();
                let top = rect.top + window.scrollY;
                let left = rect.left + window.scrollX;
                if (!this.position || this.position.indexOf('bottom') >= 0) {
                    top += trigger.clientHeight;
                } else {
                    top -= dropdownMenu.clientHeight;
                }
                if (this.position && this.position.indexOf('left') >= 0) {
                    left -= (dropdownMenu.clientWidth - trigger.clientWidth);
                }
                this.style = {
                    position: 'absolute',
                    top: `${top}px`,
                    left: `${left}px`,
                    zIndex: '99',
                    width: this.expanded ? `${dropdown.offsetWidth}px` : undefined
                };
            }
        }
    },
    mounted() {
        if (this.appendToBody) {
            this.$data._bodyEl = helpers.createAbsoluteElement(this.$refs.dropdownMenu);
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

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = vue.resolveDirective("trap-focus");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["dropdown dropdown-menu-animation", $options.rootClasses],
    ref: "dropdown"
  }, [
    (!$props.inline)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          role: "button",
          ref: "trigger",
          class: "dropdown-trigger",
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
          onContextmenu: _cache[2] || (_cache[2] = vue.withModifiers((...args) => ($options.onContextMenu && $options.onContextMenu(...args)), ["prevent"])),
          onMouseenter: _cache[3] || (_cache[3] = (...args) => ($options.onHover && $options.onHover(...args))),
          onFocusCapture: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          "aria-haspopup": "true"
        }, [
          vue.renderSlot(_ctx.$slots, "trigger", { active: $data.isActive })
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode(vue.Transition, { name: $props.animation }, {
      default: vue.withCtx(() => [
        ($options.isMobileModal)
          ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: "background",
              "aria-hidden": !$data.isActive
            }, null, 8 /* PROPS */, ["aria-hidden"])), [
              [vue.vShow, $data.isActive]
            ])
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["name"]),
    vue.createVNode(vue.Transition, { name: $props.animation }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("div", {
          ref: "dropdownMenu",
          class: "dropdown-menu",
          style: $data.style,
          "aria-hidden": !$data.isActive
        }, [
          vue.createVNode("div", {
            class: "dropdown-content",
            role: $props.ariaRole,
            style: $options.contentStyle
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 12 /* STYLE, PROPS */, ["role"])
        ], 12 /* STYLE, PROPS */, ["aria-hidden"]), [
          [vue.vShow, (!$props.disabled && ($data.isActive || $data.isHoverable)) || $props.inline],
          [_directive_trap_focus, $props.trapFocus]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"])
  ], 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "src/components/dropdown/Dropdown.vue";

var script = {
    name: 'BDropdownItem',
    mixins: [InjectedChildMixin.InjectedChildMixin('dropdown')],
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        separator: Boolean,
        disabled: Boolean,
        custom: Boolean,
        focusable: {
            type: Boolean,
            default: true
        },
        paddingless: Boolean,
        hasLink: Boolean,
        ariaRole: {
            type: String,
            default: ''
        }
    },
    emits: ['click'],
    computed: {
        anchorClasses() {
            return {
                'is-disabled': this.parent.disabled || this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive
            }
        },
        itemClasses() {
            return {
                'dropdown-item': !this.hasLink,
                'is-disabled': this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive,
                'has-link': this.hasLink
            }
        },
        ariaRoleItem() {
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null
        },
        isClickable() {
            return !this.parent.disabled && !this.separator && !this.disabled && !this.custom
        },
        isActive() {
            if (this.parent.selected === null) return false
            if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0
            return this.value === this.parent.selected
        },
        isFocusable() {
            return this.hasLink ? false : this.focusable
        }
    },
    methods: {
        /**
        * Click listener, select the item.
        */
        selectItem() {
            if (!this.isClickable) return

            this.parent.selectItem(this.value);
            this.$emit('click');
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "dropdown-divider"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.separator)
    ? (vue.openBlock(), vue.createBlock("hr", _hoisted_1))
    : (!$props.custom && !$props.hasLink)
      ? (vue.openBlock(), vue.createBlock("a", {
          key: 1,
          class: ["dropdown-item", $options.anchorClasses],
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.selectItem && $options.selectItem(...args))),
          role: $options.ariaRoleItem,
          tabindex: $options.isFocusable ? 0 : null
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
      : (vue.openBlock(), vue.createBlock("div", {
          key: 2,
          class: $options.itemClasses,
          onClick: _cache[2] || (_cache[2] = (...args) => ($options.selectItem && $options.selectItem(...args))),
          role: $options.ariaRoleItem,
          tabindex: $options.isFocusable ? 0 : null
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
}

script.render = render;
script.__file = "src/components/dropdown/DropdownItem.vue";

exports.script = script$1;
exports.script$1 = script;
