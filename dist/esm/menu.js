import { openBlock, createBlock, renderSlot, h, resolveComponent, resolveDynamicComponent, mergeProps, withCtx, createCommentVNode, toDisplayString, Transition, withDirectives, createVNode, vShow } from 'vue';
import { s as script$3 } from './Icon-fefef9ed.js';
import { c as config } from './config-1ce4c54c.js';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './helpers-2263d431.js';
import './typeof-6c6d8d7a.js';

var MenuItemContainerMixin = {
  provide: function provide() {
    return {
      BMenuItemContainer: this
    };
  },
  data: function data() {
    return {
      menuItems: []
    };
  },
  methods: {
    appendMenuItem: function appendMenuItem(item) {
      this.menuItems.push(item);
    },
    removeMenuItem: function removeMenuItem(item) {
      var index = this.menuItems.indexOf(item);

      if (index !== -1) {
        this.menuItems.splice(index, 1);
      }
    }
  }
};

var script$2 = {
    name: 'BMenu',
    mixins: [MenuItemContainerMixin],
    props: {
        accordion: {
            type: Boolean,
            default: true
        },
        activable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            _isMenu: true // Used by MenuItem
        }
    }
};

const _hoisted_1$1 = { class: "menu" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

script$2.render = render$1;
script$2.__file = "src/components/menu/Menu.vue";

const BMenuList = (props, context) => {
    let vlabel = null;
    const slots = context.slots;
    if (props.label || slots.label) {
        vlabel = h(
            'p',
            { class: 'menu-label' },
            props.label
                ? props.icon
                    ? [
                        h('b-icon', {
                            icon: props.icon,
                            pack: props.iconPack,
                            size: props.size
                        }),
                        h('span', {}, props.label)
                    ]
                    : props.label
                : slots.label()
        );
    }
    const vnode = h(
        'ul',
        {
            class: 'menu-list',
            role: props.ariaRole === 'menu' ? props.ariaRole : null
        },
        slots.default()
    );
    return vlabel ? [vlabel, vnode] : vnode
};

BMenuList.props = {
    label: String,
    icon: String,
    iconPack: String,
    ariaRole: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'is-small'
    }
};

var script$1 = BMenuList;

script$1.__file = "src/components/menu/MenuList.vue";

var script = {
    name: 'BMenuItem',
    components: {
        [script$3.name]: script$3
    },
    mixins: [MenuItemContainerMixin],
    inject: {
        parent: {
            from: 'BMenuItemContainer',
            default: null
        }
    },
    inheritAttrs: false,
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        label: String,
        active: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
            type: String,
            default: 'slide'
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        },
        ariaRole: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'is-small'
        }
    },
    emits: ['update:active', 'update:expanded'],
    data() {
        return {
            newActive: this.active,
            newExpanded: this.expanded
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : null
        }
    },
    watch: {
        active(value) {
            this.newActive = value;
        },
        expanded(value) {
            this.newExpanded = value;
        }
    },
    methods: {
        onClick(event) {
            if (this.disabled) return
            const menu = this.getMenu();
            this.reset(this.parent, menu);
            this.newExpanded = !this.newExpanded;
            this.$emit('update:expanded', this.newExpanded);
            if (menu && menu.activable) {
                this.newActive = true;
                this.$emit('update:active', this.newActive);
            }
        },
        reset(parent, menu) {
            if (parent == null) {
                return
            }
            parent.menuItems.forEach((item) => {
                if (item !== this) {
                    this.reset(item, menu);
                    if (!parent.$data._isMenu || (parent.$data._isMenu && parent.accordion)) {
                        item.newExpanded = false;
                        item.$emit('update:expanded', item.newActive);
                    }
                    if (menu && menu.activable) {
                        item.newActive = false;
                        item.$emit('update:active', item.newActive);
                    }
                }
            });
        },
        getMenu() {
            let parent = this.$parent;
            while (parent && !parent.$data._isMenu) {
                parent = parent.$parent;
            }
            return parent
        }
    },
    mounted() {
        if (this.parent) {
            this.parent.appendMenuItem(this);
        }
    },
    beforeUnmount() {
        if (this.parent) {
            this.parent.removeMenuItem(this);
        }
    }
};

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("li", { role: $options.ariaRoleMenu }, [
    (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps(_ctx.$attrs, {
      class: {
                'is-active': $data.newActive,
                'is-expanded': $data.newExpanded,
                'is-disabled': $props.disabled,
                'icon-text': $props.icon,
            },
      onClick: _cache[1] || (_cache[1] = $event => ($options.onClick($event)))
    }), {
      default: withCtx(() => [
        ($props.icon)
          ? (openBlock(), createBlock(_component_b_icon, {
              key: 0,
              icon: $props.icon,
              pack: $props.iconPack,
              size: $props.size
            }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
          : createCommentVNode("v-if", true),
        ($props.label)
          ? (openBlock(), createBlock("span", _hoisted_1, toDisplayString($props.label), 1 /* TEXT */))
          : renderSlot(_ctx.$slots, "label", {
              key: 2,
              expanded: $data.newExpanded,
              active: $data.newActive
            })
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class"])),
    createCommentVNode(" sub menu items "),
    (_ctx.$slots.default)
      ? (openBlock(), createBlock(Transition, {
          key: 0,
          name: $props.animation
        }, {
          default: withCtx(() => [
            withDirectives(createVNode("ul", null, [
              renderSlot(_ctx.$slots, "default")
            ], 512 /* NEED_PATCH */), [
              [vShow, $data.newExpanded]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"]))
      : createCommentVNode("v-if", true)
  ], 8 /* PROPS */, ["role"]))
}

script.render = render;
script.__file = "src/components/menu/MenuItem.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script$2);
    registerComponent(Vue, script$1);
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script$2 as BMenu, script as BMenuItem, script$1 as BMenuList, Plugin as default };
