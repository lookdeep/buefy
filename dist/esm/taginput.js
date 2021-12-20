import { g as getValueByPath } from './helpers-2263d431.js';
import { s as script$2 } from './Tag-89b086b9.js';
import { s as script$1 } from './Autocomplete-40982d73.js';
import { c as config } from './config-1ce4c54c.js';
import { F as FormElementMixin } from './FormElementMixin-55920052.js';
import { resolveComponent, openBlock, createBlock, createVNode, renderSlot, Fragment, renderList, withCtx, createTextVNode, toDisplayString, mergeProps, createSlots, createCommentVNode } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';
import './typeof-6c6d8d7a.js';
import './Input-82ba71aa.js';
import './Icon-fefef9ed.js';

var script = {
    name: 'BTaginput',
    components: {
        [script$1.name]: script$1,
        [script$2.name]: script$2
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        type: String,
        closeType: String,
        rounded: {
            type: Boolean,
            default: false
        },
        attached: {
            type: Boolean,
            default: false
        },
        maxtags: {
            type: [Number, String],
            required: false
        },
        hasCounter: {
            type: Boolean,
            default: () => config.defaultTaginputHasCounter
        },
        field: {
            type: String,
            default: 'value'
        },
        autocomplete: Boolean,
        groupField: String,
        groupOptions: String,
        nativeAutocomplete: String,
        openOnFocus: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        closable: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        confirmKeys: {
            type: Array,
            default: () => [',', 'Tab', 'Enter']
        },
        removeOnKeys: {
            type: Array,
            default: () => ['Backspace']
        },
        allowNew: Boolean,
        onPasteSeparators: {
            type: Array,
            default: () => [',']
        },
        beforeAdding: {
            type: Function,
            default: () => true
        },
        allowDuplicates: {
            type: Boolean,
            default: false
        },
        checkInfiniteScroll: {
            type: Boolean,
            default: false
        },
        createTag: {
            type: Function,
            default: (tag) => tag
        },
        appendToBody: Boolean
    },
    emits: [
        'add',
        'infinite-scroll',
        'remove',
        'typing',
        'update:modelValue'
    ],
    data() {
        return {
            tags: Array.isArray(this.modelValue)
                ? this.modelValue.slice(0)
                : (this.modelValue || []),
            newTag: '',
            isComposing: false,
            _elementRef: 'autocomplete',
            _isTaginput: true
        }
    },
    computed: {
        rootClasses() {
            return {
                'is-expanded': this.expanded
            }
        },

        containerClasses() {
            return {
                'is-focused': this.isFocused,
                'is-focusable': this.hasInput
            }
        },

        valueLength() {
            return this.newTag.trim().length
        },

        hasDefaultSlot() {
            return !!this.$slots.default
        },

        hasEmptySlot() {
            return !!this.$slots.empty
        },

        hasHeaderSlot() {
            return !!this.$slots.header
        },

        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Show the input field if a maxtags hasn't been set or reached.
         */
        hasInput() {
            return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags
        },

        tagsLength() {
            return this.tags.length
        },

        /**
         * If Taginput has onPasteSeparators prop,
         * returning new RegExp used to split pasted string.
         */
        separatorsAsRegExp() {
            const sep = this.onPasteSeparators;

            return sep.length
                ? new RegExp(sep.map((s) => {
                    return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null
                }).join('|'), 'g')
                : null
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it.
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
         * When v-model is changed set internal value.
         */
        modelValue(value) {
            this.tags = Array.isArray(value) ? value.slice(0) : (value || []);
        },

        hasInput() {
            if (!this.hasInput) this.onBlur();
        }
    },
    methods: {
        addTag(tag) {
            const tagToAdd = tag || this.newTag.trim();

            if (tagToAdd) {
                if (!this.autocomplete) {
                    const reg = this.separatorsAsRegExp;
                    if (reg && tagToAdd.match(reg)) {
                        tagToAdd.split(reg)
                            .map((t) => t.trim())
                            .filter((t) => t.length !== 0)
                            .map(this.addTag);
                        return
                    }
                }
                // Add the tag input if it is not blank
                // or previously added (if not allowDuplicates).
                const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
                if (add && this.beforeAdding(tagToAdd)) {
                    if (this.maxtags === 1) {
                        this.tags = []; // replace existing tag if only 1 is allowed
                    }
                    this.tags.push(this.createTag(tagToAdd));
                    this.$emit('update:modelValue', this.tags);
                    this.$emit('add', tagToAdd);
                }
            }

            this.newTag = '';
        },

        getNormalizedTagText(tag) {
            if (typeof tag === 'object') {
                tag = getValueByPath(tag, this.field);
            }

            return `${tag}`
        },

        customOnBlur(event) {
            // Add tag on-blur if not select only
            if (!this.autocomplete) this.addTag();

            this.onBlur(event);
        },

        onSelect(option) {
            if (!option) return

            this.addTag(option);
            this.$nextTick(() => {
                this.newTag = '';
            });
        },

        removeTag(index, event) {
            const tag = this.tags.splice(index, 1)[0];
            this.$emit('update:modelValue', this.tags);
            this.$emit('remove', tag);
            if (event) event.stopPropagation();
            if (this.openOnFocus && this.$refs.autocomplete) {
                this.$refs.autocomplete.focus();
            }
            return tag
        },

        removeLastTag() {
            if (this.tagsLength > 0) {
                this.removeTag(this.tagsLength - 1);
            }
        },

        keydown(event) {
            const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
                this.removeLastTag();
            }
            // Stop if is to accept select only
            if (this.autocomplete && !this.allowNew) return

            if (this.confirmKeys.indexOf(key) >= 0) {
                // Allow Tab to advance to next field regardless
                if (key !== 'Tab') event.preventDefault();
                if (key === 'Enter' && this.isComposing) return
                this.addTag();
            }
        },

        onTyping(event) {
            this.$emit('typing', event.trim());
        },

        emitInfiniteScroll() {
            this.$emit('infinite-scroll');
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "help counter"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tag = resolveComponent("b-tag");
  const _component_b_autocomplete = resolveComponent("b-autocomplete");

  return (openBlock(), createBlock("div", {
    class: ["taginput control", $options.rootClasses]
  }, [
    createVNode("div", {
      class: ["taginput-container", [_ctx.statusType, _ctx.size, $options.containerClasses]],
      disabled: $options.disabledOrUndefined,
      onClick: _cache[4] || (_cache[4] = $event => ($options.hasInput && _ctx.focus($event)))
    }, [
      renderSlot(_ctx.$slots, "selected", { tags: $data.tags }, () => [
        (openBlock(true), createBlock(Fragment, null, renderList($data.tags, (tag, index) => {
          return (openBlock(), createBlock(_component_b_tag, {
            key: $options.getNormalizedTagText(tag) + index,
            type: $props.type,
            "close-type": $props.closeType,
            size: _ctx.size,
            rounded: $props.rounded,
            attached: $props.attached,
            tabstop: false,
            disabled: $options.disabledOrUndefined,
            ellipsis: $props.ellipsis,
            closable: $props.closable,
            "aria-close-label": $props.ariaCloseLabel,
            title: $props.ellipsis && $options.getNormalizedTagText(tag),
            onClose: $event => ($options.removeTag(index, $event))
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "tag", { tag: tag }, () => [
                createTextVNode(toDisplayString($options.getNormalizedTagText(tag)), 1 /* TEXT */)
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "close-type", "size", "rounded", "attached", "disabled", "ellipsis", "closable", "aria-close-label", "title", "onClose"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      ($options.hasInput)
        ? (openBlock(), createBlock(_component_b_autocomplete, mergeProps({
            key: 0,
            ref: "autocomplete",
            modelValue: $data.newTag,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.newTag = $event))
          }, _ctx.$attrs, {
            data: $props.data,
            field: $props.field,
            icon: _ctx.icon,
            "icon-pack": _ctx.iconPack,
            maxlength: _ctx.maxlength,
            "has-counter": false,
            size: _ctx.size,
            disabled: $options.disabledOrUndefined,
            loading: _ctx.loading,
            autocomplete: $props.nativeAutocomplete,
            "open-on-focus": $props.openOnFocus,
            "keep-open": $props.openOnFocus,
            "group-field": $props.groupField,
            "group-options": $props.groupOptions,
            "use-html5-validation": _ctx.useHtml5Validation,
            "check-infinite-scroll": $props.checkInfiniteScroll,
            "append-to-body": $props.appendToBody,
            "confirm-keys": $props.confirmKeys,
            onTyping: $options.onTyping,
            onFocus: _ctx.onFocus,
            onBlur: $options.customOnBlur,
            onKeydown: $options.keydown,
            onCompositionstart: _cache[2] || (_cache[2] = $event => ($data.isComposing = true)),
            onCompositionend: _cache[3] || (_cache[3] = $event => ($data.isComposing = false)),
            onSelect: $options.onSelect,
            onInfiniteScroll: $options.emitInfiniteScroll
          }), createSlots({ _: 2 /* DYNAMIC */ }, [
            ($options.hasHeaderSlot)
              ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "header")
                  ])
                }
              : undefined,
            ($options.hasDefaultSlot)
              ? {
                  name: "default",
                  fn: withCtx((props) => [
                    renderSlot(_ctx.$slots, "default", {
                      option: props.option,
                      index: props.index
                    })
                  ])
                }
              : undefined,
            ($options.hasEmptySlot)
              ? {
                  name: "empty",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "empty")
                  ])
                }
              : undefined,
            ($options.hasFooterSlot)
              ? {
                  name: "footer",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "footer")
                  ])
                }
              : undefined
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "loading", "autocomplete", "open-on-focus", "keep-open", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onKeydown", "onSelect", "onInfiniteScroll"]))
        : createCommentVNode("v-if", true)
    ], 10 /* CLASS, PROPS */, ["disabled"]),
    ($props.hasCounter && ($props.maxtags || _ctx.maxlength))
      ? (openBlock(), createBlock("small", _hoisted_1, [
          (_ctx.maxlength && $options.valueLength > 0)
            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($options.valueLength) + " / " + toDisplayString(_ctx.maxlength), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : ($props.maxtags)
              ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString($options.tagsLength) + " / " + toDisplayString($props.maxtags), 1 /* TEXT */)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              : createCommentVNode("v-if", true)
        ]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/taginput/Taginput.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BTaginput, Plugin as default };
