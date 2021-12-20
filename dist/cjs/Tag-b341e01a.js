'use strict';

var vue = require('vue');

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
  const _component_b_icon = vue.resolveComponent("b-icon");

  return ($props.attached && $props.closable)
    ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
        vue.createVNode("span", {
          class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
        }, [
          vue.createVNode("span", {
            class: { 'has-ellipsis': $props.ellipsis }
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */)
        ], 2 /* CLASS */),
        vue.createVNode("a", {
          class: ["tag", [$props.size,
                     $props.closeType,
                     {'is-rounded': $props.rounded},
                     $props.closeIcon ? 'has-delete-icon' : 'is-delete']],
          role: "button",
          "aria-label": $props.ariaCloseLabel,
          tabindex: $props.tabstop ? 0 : false,
          disabled: $options.disabledOrUndefined,
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.close && $options.close(...args))),
          onKeyup: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
        }, [
          ($props.closeIcon)
            ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                key: 0,
                "custom-class": "",
                icon: $props.closeIcon,
                size: $props.size,
                type: $props.closeIconType,
                pack: $props.closeIconPack
              }, null, 8 /* PROPS */, ["icon", "size", "type", "pack"]))
            : vue.createCommentVNode("v-if", true)
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "tabindex", "disabled"])
      ]))
    : (vue.openBlock(), vue.createBlock("span", {
        key: 1,
        class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
      }, [
        vue.createVNode("span", {
          class: { 'has-ellipsis': $props.ellipsis }
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */),
        ($props.closable)
          ? (vue.openBlock(), vue.createBlock("a", {
              key: 0,
              role: "button",
              "aria-label": $props.ariaCloseLabel,
              class: ["delete is-small", $props.closeType],
              disabled: $options.disabledOrUndefined,
              tabindex: $props.tabstop ? 0 : false,
              onClick: _cache[3] || (_cache[3] = (...args) => ($options.close && $options.close(...args))),
              onKeyup: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
            }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "disabled", "tabindex"]))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/tag/Tag.vue";

exports.script = script;
