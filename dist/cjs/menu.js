'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Icon = require('./Icon-dc7b693f.js');
var config = require('./config-2c63be1d.js');
var plugins = require('./plugins-82c06644.js');
require('./helpers-0d6e2444.js');
require('./typeof-5baf6faf.js');

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
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]))
}

script$2.render = render$1;
script$2.__file = "src/components/menu/Menu.vue";

const BMenuList = (props, context) => {
    let vlabel = null;
    const slots = context.slots;
    if (props.label || slots.label) {
        vlabel = vue.h(
            'p',
            { class: 'menu-label' },
            props.label
                ? props.icon
                    ? [
                        vue.h('b-icon', {
                            icon: props.icon,
                            pack: props.iconPack,
                            size: props.size
                        }),
                        vue.h('span', {}, props.label)
                    ]
                    : props.label
                : slots.label()
        );
    }
    const vnode = vue.h(
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
        [Icon.script.name]: Icon.script
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
                return config.config.defaultLinkTags.indexOf(value) >= 0
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
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("li", { role: $options.ariaRoleMenu }, [
    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), vue.mergeProps(_ctx.$attrs, {
      class: {
                'is-active': $data.newActive,
                'is-expanded': $data.newExpanded,
                'is-disabled': $props.disabled,
                'icon-text': $props.icon,
            },
      onClick: _cache[1] || (_cache[1] = $event => ($options.onClick($event)))
    }), {
      default: vue.withCtx(() => [
        ($props.icon)
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 0,
              icon: $props.icon,
              pack: $props.iconPack,
              size: $props.size
            }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
          : vue.createCommentVNode("v-if", true),
        ($props.label)
          ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString($props.label), 1 /* TEXT */))
          : vue.renderSlot(_ctx.$slots, "label", {
              key: 2,
              expanded: $data.newExpanded,
              active: $data.newActive
            })
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class"])),
    vue.createCommentVNode(" sub menu items "),
    (_ctx.$slots.default)
      ? (vue.openBlock(), vue.createBlock(vue.Transition, {
          key: 0,
          name: $props.animation
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("ul", null, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 512 /* NEED_PATCH */), [
              [vue.vShow, $data.newExpanded]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"]))
      : vue.createCommentVNode("v-if", true)
  ], 8 /* PROPS */, ["role"]))
}

script.render = render;
script.__file = "src/components/menu/MenuItem.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script$2);
    plugins.registerComponent(Vue, script$1);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BMenu = script$2;
exports.BMenuItem = script;
exports.BMenuList = script$1;
exports["default"] = Plugin;
