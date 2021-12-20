import { resolveComponent, openBlock, createBlock, createVNode, renderSlot, withKeys, withModifiers, createCommentVNode } from 'vue';

var script = {
    name: 'BTag',
    props: {
        attached: Boolean,
        closable: Boolean,
        type: String,
        size: String,
        rounded: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        tabstop: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        closeType: String,
        closeIcon: String,
        closeIconPack: String,
        closeIconType: String
    },
    emits: ['close'],
    computed: {
        // setting a boolean attribute `false` does not remove it on Vue 3.
        // `null` or `undefined` has to be given to remove it.
        disabledOrUndefined() {
            return this.disabled || undefined
        }
    },
    methods: {
        /**
        * Emit close event when delete button is clicked
        * or delete key is pressed.
        */
        close(event) {
            if (this.disabled) return

            this.$emit('close', event);
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "tags has-addons"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return ($props.attached && $props.closable)
    ? (openBlock(), createBlock("div", _hoisted_1, [
        createVNode("span", {
          class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
        }, [
          createVNode("span", {
            class: { 'has-ellipsis': $props.ellipsis }
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */)
        ], 2 /* CLASS */),
        createVNode("a", {
          class: ["tag", [$props.size,
                     $props.closeType,
                     {'is-rounded': $props.rounded},
                     $props.closeIcon ? 'has-delete-icon' : 'is-delete']],
          role: "button",
          "aria-label": $props.ariaCloseLabel,
          tabindex: $props.tabstop ? 0 : false,
          disabled: $options.disabledOrUndefined,
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.close && $options.close(...args))),
          onKeyup: _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
        }, [
          ($props.closeIcon)
            ? (openBlock(), createBlock(_component_b_icon, {
                key: 0,
                "custom-class": "",
                icon: $props.closeIcon,
                size: $props.size,
                type: $props.closeIconType,
                pack: $props.closeIconPack
              }, null, 8 /* PROPS */, ["icon", "size", "type", "pack"]))
            : createCommentVNode("v-if", true)
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "tabindex", "disabled"])
      ]))
    : (openBlock(), createBlock("span", {
        key: 1,
        class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
      }, [
        createVNode("span", {
          class: { 'has-ellipsis': $props.ellipsis }
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */),
        ($props.closable)
          ? (openBlock(), createBlock("a", {
              key: 0,
              role: "button",
              "aria-label": $props.ariaCloseLabel,
              class: ["delete is-small", $props.closeType],
              disabled: $options.disabledOrUndefined,
              tabindex: $props.tabstop ? 0 : false,
              onClick: _cache[3] || (_cache[3] = (...args) => ($options.close && $options.close(...args))),
              onKeyup: _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
            }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "disabled", "tabindex"]))
          : createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/tag/Tag.vue";

export { script as s };
