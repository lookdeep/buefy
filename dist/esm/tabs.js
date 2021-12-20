import { c as config } from './config-1ce4c54c.js';
import { T as TabbedMixin, a as TabbedChildMixin } from './TabbedChildMixin-bdf09624.js';
import { resolveComponent, openBlock, createBlock, createVNode, Fragment, renderList, withDirectives, createCommentVNode, toDisplayString, vShow, renderSlot } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';
import './Icon-fefef9ed.js';
import './SlotComponent-bdb2e93f.js';
import './InjectedChildMixin-eb1af2ee.js';

var script$1 = {
    name: 'BTabs',
    mixins: [TabbedMixin('tab')],
    props: {
        expanded: {
            type: Boolean,
            default: () => {
                return config.defaultTabsExpanded
            }
        },
        type: {
            type: [String, Object],
            default: () => {
                return config.defaultTabsType
            }
        },
        animated: {
            type: Boolean,
            default: () => {
                return config.defaultTabsAnimated
            }
        },
        multiline: Boolean
    },
    data() {
        return {
            currentFocus: null
        }
    },
    computed: {
        mainClasses() {
            return {
                'is-fullwidth': this.expanded,
                'is-vertical': this.vertical,
                'is-multiline': this.multiline,
                [this.position]: this.position && this.vertical
            }
        },
        navClasses() {
            return [
                this.type,
                this.size,
                {
                    [this.position]: this.position && !this.vertical,
                    'is-fullwidth': this.expanded,
                    'is-toggle': this.type === 'is-toggle-rounded'
                }
            ]
        }
    },
    methods: {
        giveFocusToTab(tab) {
            if (tab.$el && tab.$el.focus) {
                tab.$el.focus();
            } else if (tab.focus) {
                tab.focus();
            }
        },
        manageTablistKeydown(event) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event;
            switch (key) {
                case this.vertical ? 'ArrowUp' : 'ArrowLeft':
                case this.vertical ? 'Up' : 'Left': {
                    let prevIdx = this.getPrevItemIdx(this.currentFocus, true);
                    if (prevIdx === null) {
                        // We try to give focus back to the last visible element
                        prevIdx = this.getPrevItemIdx(Infinity, true);
                    }
                    const prevItem = this.items.find((i) => i.index === prevIdx);
                    if (
                        prevItem &&
                        this.$refs[`tabLink${prevIdx}`] &&
                        !prevItem.disabled
                    ) {
                        this.giveFocusToTab(this.$refs[`tabLink${prevIdx}`]);
                    }
                    event.preventDefault();
                    break
                }
                case this.vertical ? 'ArrowDown' : 'ArrowRight':
                case this.vertical ? 'Down' : 'Right': {
                    let nextIdx = this.getNextItemIdx(this.currentFocus, true);
                    if (nextIdx === null) {
                        // We try to give focus back to the first visible element
                        nextIdx = this.getNextItemIdx(-1, true);
                    }
                    const nextItem = this.items.find((i) => i.index === nextIdx);
                    if (
                        nextItem &&
                        this.$refs[`tabLink${nextIdx}`] &&
                        !nextItem.disabled
                    ) {
                        this.giveFocusToTab(this.$refs[`tabLink${nextIdx}`]);
                    }
                    event.preventDefault();
                    break
                }
            }
        },

        manageTabKeydown(event, childItem) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event;
            switch (key) {
                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.childClick(childItem);
                    event.preventDefault();
                    break
                }
            }
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["b-tabs", $options.mainClasses]
  }, [
    createVNode("nav", {
      class: ["tabs", $options.navClasses],
      role: "tablist",
      "aria-orientation": _ctx.vertical ? 'vertical' : 'horizontal',
      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.manageTablistKeydown && $options.manageTablistKeydown(...args)))
    }, [
      createVNode("ul", null, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (childItem) => {
          return withDirectives((openBlock(), createBlock("li", {
            key: childItem.value,
            class: [ childItem.headerClass, { 'is-active': childItem.isActive,
                                                       'is-disabled': childItem.disabled }],
            role: "presentation"
          }, [
            (childItem.$slots.header)
              ? (openBlock(), createBlock(_component_b_slot_component, {
                  key: 0,
                  ref: `tabLink${childItem.index}`,
                  component: childItem,
                  name: "header",
                  tag: "a",
                  role: "tab",
                  id: `${childItem.value}-label`,
                  "aria-controls": `${childItem.value}-content`,
                  "aria-selected": `${childItem.isActive}`,
                  tabindex: childItem.isActive ? 0 : -1,
                  onFocus: $event => ($data.currentFocus = childItem.index),
                  onClick: $event => (_ctx.childClick(childItem)),
                  onKeydown: $event => ($options.manageTabKeydown($event, childItem))
                }, null, 8 /* PROPS */, ["component", "id", "aria-controls", "aria-selected", "tabindex", "onFocus", "onClick", "onKeydown"]))
              : (openBlock(), createBlock("a", {
                  key: 1,
                  ref: `tabLink${childItem.index}`,
                  role: "tab",
                  id: `${childItem.value}-tab`,
                  "aria-controls": `${childItem.value}-content`,
                  "aria-selected": `${childItem.isActive}`,
                  tabindex: childItem.isActive ? 0 : -1,
                  onFocus: $event => ($data.currentFocus = childItem.index),
                  onClick: $event => (_ctx.childClick(childItem)),
                  onKeydown: $event => ($options.manageTabKeydown($event, childItem))
                }, [
                  (childItem.icon)
                    ? (openBlock(), createBlock(_component_b_icon, {
                        key: 0,
                        icon: childItem.icon,
                        pack: childItem.iconPack,
                        size: _ctx.size
                      }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
                    : createCommentVNode("v-if", true),
                  createVNode("span", null, toDisplayString(childItem.label), 1 /* TEXT */)
                ], 40 /* PROPS, HYDRATE_EVENTS */, ["id", "aria-controls", "aria-selected", "tabindex", "onFocus", "onClick", "onKeydown"]))
          ], 2 /* CLASS */)), [
            [vShow, childItem.visible]
          ])
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-orientation"]),
    createVNode("section", {
      class: ["tab-content", {'is-transitioning': _ctx.isTransitioning}]
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script$1.render = render;
script$1.__file = "src/components/tabs/Tabs.vue";

var script = {
    name: 'BTabItem',
    mixins: [TabbedChildMixin('tab')],
    props: {
        disabled: Boolean
    },
    data() {
        return {
            elementClass: 'tab-item',
            elementRole: 'tabpanel'
        }
    }
};

script.__file = "src/components/tabs/TabItem.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script$1);
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BTabItem, script$1 as BTabs, Plugin as default };
