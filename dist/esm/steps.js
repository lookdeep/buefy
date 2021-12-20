import { s as script$2 } from './Icon-fefef9ed.js';
import { T as TabbedMixin, a as TabbedChildMixin } from './TabbedChildMixin-bdf09624.js';
import { c as config } from './config-1ce4c54c.js';
import { resolveComponent, openBlock, createBlock, createVNode, Fragment, renderList, withDirectives, toDisplayString, createCommentVNode, vShow, renderSlot, withModifiers } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import './SlotComponent-bdb2e93f.js';
import './InjectedChildMixin-eb1af2ee.js';

var script$1 = {
    name: 'BSteps',
    components: {
        [script$2.name]: script$2
    },
    mixins: [TabbedMixin('step')],
    props: {
        type: [String, Object],
        iconPack: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
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
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["b-steps", $options.wrapperClasses]
  }, [
    createVNode("nav", {
      class: ["steps", $options.mainClasses]
    }, [
      createVNode("ul", _hoisted_1, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (childItem) => {
          return withDirectives((openBlock(), createBlock("li", {
            key: childItem.value,
            class: ["step-item", [childItem.type || $props.type, childItem.headerClass, {
                        'is-active': childItem.isActive,
                        'is-previous': $options.activeItem.index > childItem.index
                    }]]
          }, [
            createVNode("a", {
              class: ["step-link", {'is-clickable': $options.isItemClickable(childItem)}],
              onClick: $event => ($options.isItemClickable(childItem) && _ctx.childClick(childItem))
            }, [
              createVNode("div", _hoisted_2, [
                (childItem.icon)
                  ? (openBlock(), createBlock(_component_b_icon, {
                      key: 0,
                      icon: childItem.icon,
                      pack: childItem.iconPack,
                      size: _ctx.size
                    }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
                  : (childItem.step)
                    ? (openBlock(), createBlock("span", _hoisted_3, toDisplayString(childItem.step), 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
              ]),
              createVNode("div", _hoisted_4, [
                createVNode("span", _hoisted_5, toDisplayString(childItem.label), 1 /* TEXT */)
              ])
            ], 10 /* CLASS, PROPS */, ["onClick"])
          ], 2 /* CLASS */)), [
            [vShow, childItem.visible]
          ])
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 2 /* CLASS */),
    createVNode("section", {
      class: ["step-content", {'is-transitioning': _ctx.isTransitioning}]
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */),
    renderSlot(_ctx.$slots, "navigation", {
      previous: $options.navigationProps.previous,
      next: $options.navigationProps.next
    }, () => [
      ($props.hasNavigation)
        ? (openBlock(), createBlock("nav", _hoisted_6, [
            createVNode("a", {
              role: "button",
              class: "pagination-previous",
              disabled: $options.navigationProps.previous.disabled || undefined,
              onClick: _cache[1] || (_cache[1] = withModifiers((...args) => ($options.navigationProps.previous.action && $options.navigationProps.previous.action(...args)), ["prevent"])),
              "aria-label": $props.ariaPreviousLabel
            }, [
              createVNode(_component_b_icon, {
                icon: $props.iconPrev,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ], 8 /* PROPS */, ["disabled", "aria-label"]),
            createVNode("a", {
              role: "button",
              class: "pagination-next",
              disabled: $options.navigationProps.next.disabled || undefined,
              onClick: _cache[2] || (_cache[2] = withModifiers((...args) => ($options.navigationProps.next.action && $options.navigationProps.next.action(...args)), ["prevent"])),
              "aria-label": $props.ariaNextLabel
            }, [
              createVNode(_component_b_icon, {
                icon: $props.iconNext,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ], 8 /* PROPS */, ["disabled", "aria-label"])
          ]))
        : createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}

script$1.render = render;
script$1.__file = "src/components/steps/Steps.vue";

var script = {
    name: 'BStepItem',
    mixins: [TabbedChildMixin('step')],
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
    registerComponent(Vue, script$1);
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BStepItem, script$1 as BSteps, Plugin as default };
