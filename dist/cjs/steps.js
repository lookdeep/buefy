'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Icon = require('./Icon-dc7b693f.js');
var TabbedChildMixin = require('./TabbedChildMixin-84248bd5.js');
var config = require('./config-2c63be1d.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');
require('./SlotComponent-f2e4fdc4.js');
require('./InjectedChildMixin-d2127742.js');

var script$1 = {
    name: 'BSteps',
    components: {
        [Icon.script.name]: Icon.script
    },
    mixins: [TabbedChildMixin.TabbedMixin('step')],
    props: {
        type: [String, Object],
        iconPack: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.config.defaultIconNext
            }
        },
        hasNavigation: {
            type: Boolean,
            default: true
        },
        labelPosition: {
            type: String,
            validator(value) {
                return [
                    'bottom',
                    'right',
                    'left'
                ].indexOf(value) > -1
            },
            default: 'bottom'
        },
        rounded: {
            type: Boolean,
            default: true
        },
        mobileMode: {
            type: String,
            validator(value) {
                return [
                    'minimalist',
                    'compact'
                ].indexOf(value) > -1
            },
            default: 'minimalist'
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    computed: {
        // Override mixin implementation to always have a value
        activeItem() {
            return this.childItems.filter((i) => i.value === this.activeId)[0] || this.items[0]
        },
        wrapperClasses() {
            return [
                this.size,
                {
                    'is-vertical': this.vertical,
                    [this.position]: this.position && this.vertical
                }
            ]
        },
        mainClasses() {
            return [
                this.type,
                {
                    'has-label-right': this.labelPosition === 'right',
                    'has-label-left': this.labelPosition === 'left',
                    'is-animated': this.animated,
                    'is-rounded': this.rounded,
                    [`mobile-${this.mobileMode}`]: this.mobileMode !== null
                }
            ]
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
            return this.prevItemIdx !== null
        },

        /**
         * Retrieves the next visible item index
         */
        nextItemIdx() {
            const idx = this.activeItem ? this.activeItem.index : 0;
            return this.getNextItemIdx(idx)
        },

        /**
         * Retrieves the next visible item
         */
        nextItem() {
            let nextItem = null;
            if (this.nextItemIdx !== null) {
                nextItem = this.items.find((i) => i.index === this.nextItemIdx);
            }
            return nextItem
        },

        /**
        * Retrieves the next visible item index
        */
        prevItemIdx() {
            if (!this.activeItem) { return null }
            const idx = this.activeItem.index;
            return this.getPrevItemIdx(idx)
        },

        /**
         * Retrieves the previous visible item
         */
        prevItem() {
            if (!this.activeItem) { return null }

            let prevItem = null;
            if (this.prevItemIdx !== null) {
                prevItem = this.items.find((i) => i.index === this.prevItemIdx);
            }
            return prevItem
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
            return this.nextItemIdx !== null
        },

        navigationProps() {
            return {
                previous: {
                    disabled: !this.hasPrev,
                    action: this.prev
                },
                next: {
                    disabled: !this.hasNext,
                    action: this.next
                }
            }
        }
    },
    methods: {
        /**
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem) {
            if (stepItem.clickable === undefined) {
                return stepItem.index < this.activeItem.index
            }
            return stepItem.clickable
        },

        /**
         * Previous button click listener.
         */
        prev() {
            if (this.hasPrev) {
                this.activeId = this.prevItem.value;
            }
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (this.hasNext) {
                this.activeId = this.nextItem.value;
            }
        }
    }
};

const _hoisted_1 = { class: "step-items" };
const _hoisted_2 = { class: "step-marker" };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { class: "step-details" };
const _hoisted_5 = { class: "step-title" };
const _hoisted_6 = {
  key: 0,
  class: "step-navigation"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["b-steps", $options.wrapperClasses]
  }, [
    vue.createVNode("nav", {
      class: ["steps", $options.mainClasses]
    }, [
      vue.createVNode("ul", _hoisted_1, [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.items, (childItem) => {
          return vue.withDirectives((vue.openBlock(), vue.createBlock("li", {
            key: childItem.value,
            class: ["step-item", [childItem.type || $props.type, childItem.headerClass, {
                        'is-active': childItem.isActive,
                        'is-previous': $options.activeItem.index > childItem.index
                    }]]
          }, [
            vue.createVNode("a", {
              class: ["step-link", {'is-clickable': $options.isItemClickable(childItem)}],
              onClick: $event => ($options.isItemClickable(childItem) && _ctx.childClick(childItem))
            }, [
              vue.createVNode("div", _hoisted_2, [
                (childItem.icon)
                  ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                      key: 0,
                      icon: childItem.icon,
                      pack: childItem.iconPack,
                      size: _ctx.size
                    }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
                  : (childItem.step)
                    ? (vue.openBlock(), vue.createBlock("span", _hoisted_3, vue.toDisplayString(childItem.step), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true)
              ]),
              vue.createVNode("div", _hoisted_4, [
                vue.createVNode("span", _hoisted_5, vue.toDisplayString(childItem.label), 1 /* TEXT */)
              ])
            ], 10 /* CLASS, PROPS */, ["onClick"])
          ], 2 /* CLASS */)), [
            [vue.vShow, childItem.visible]
          ])
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 2 /* CLASS */),
    vue.createVNode("section", {
      class: ["step-content", {'is-transitioning': _ctx.isTransitioning}]
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */),
    vue.renderSlot(_ctx.$slots, "navigation", {
      previous: $options.navigationProps.previous,
      next: $options.navigationProps.next
    }, () => [
      ($props.hasNavigation)
        ? (vue.openBlock(), vue.createBlock("nav", _hoisted_6, [
            vue.createVNode("a", {
              role: "button",
              class: "pagination-previous",
              disabled: $options.navigationProps.previous.disabled || undefined,
              onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => ($options.navigationProps.previous.action && $options.navigationProps.previous.action(...args)), ["prevent"])),
              "aria-label": $props.ariaPreviousLabel
            }, [
              vue.createVNode(_component_b_icon, {
                icon: $props.iconPrev,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ], 8 /* PROPS */, ["disabled", "aria-label"]),
            vue.createVNode("a", {
              role: "button",
              class: "pagination-next",
              disabled: $options.navigationProps.next.disabled || undefined,
              onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => ($options.navigationProps.next.action && $options.navigationProps.next.action(...args)), ["prevent"])),
              "aria-label": $props.ariaNextLabel
            }, [
              vue.createVNode(_component_b_icon, {
                icon: $props.iconNext,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ], 8 /* PROPS */, ["disabled", "aria-label"])
          ]))
        : vue.createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}

script$1.render = render;
script$1.__file = "src/components/steps/Steps.vue";

var script = {
    name: 'BStepItem',
    mixins: [TabbedChildMixin.TabbedChildMixin('step')],
    props: {
        step: [String, Number],
        type: [String, Object],
        clickable: {
            type: Boolean,
            default: undefined
        }
    },
    data() {
        return {
            elementClass: 'step-item'
        }
    }
};

script.__file = "src/components/steps/StepItem.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script$1);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BStepItem = script;
exports.BSteps = script$1;
exports["default"] = Plugin;
