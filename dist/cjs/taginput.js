'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers-0d6e2444.js');
var Tag = require('./Tag-b341e01a.js');
var Autocomplete = require('./Autocomplete-f56bbe04.js');
var config = require('./config-2c63be1d.js');
var FormElementMixin = require('./FormElementMixin-1ac87810.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');
require('./Input-554891c1.js');
require('./Icon-dc7b693f.js');

var script = {
    name: 'BTaginput',
    components: {
        [Autocomplete.script.name]: Autocomplete.script,
        [Tag.script.name]: Tag.script
    },
    mixins: [FormElementMixin.FormElementMixin],
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
            default: () => config.config.defaultTaginputHasCounter
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
                tag = helpers.getValueByPath(tag, this.field);
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
  const _component_b_tag = vue.resolveComponent("b-tag");
  const _component_b_autocomplete = vue.resolveComponent("b-autocomplete");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["taginput control", $options.rootClasses]
  }, [
    vue.createVNode("div", {
      class: ["taginput-container", [_ctx.statusType, _ctx.size, $options.containerClasses]],
      disabled: $options.disabledOrUndefined,
      onClick: _cache[4] || (_cache[4] = $event => ($options.hasInput && _ctx.focus($event)))
    }, [
      vue.renderSlot(_ctx.$slots, "selected", { tags: $data.tags }, () => [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.tags, (tag, index) => {
          return (vue.openBlock(), vue.createBlock(_component_b_tag, {
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
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "tag", { tag: tag }, () => [
                vue.createTextVNode(vue.toDisplayString($options.getNormalizedTagText(tag)), 1 /* TEXT */)
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "close-type", "size", "rounded", "attached", "disabled", "ellipsis", "closable", "aria-close-label", "title", "onClose"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      ($options.hasInput)
        ? (vue.openBlock(), vue.createBlock(_component_b_autocomplete, vue.mergeProps({
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
          }), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
            ($options.hasHeaderSlot)
              ? {
                  name: "header",
                  fn: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "header")
                  ])
                }
              : undefined,
            ($options.hasDefaultSlot)
              ? {
                  name: "default",
                  fn: vue.withCtx((props) => [
                    vue.renderSlot(_ctx.$slots, "default", {
                      option: props.option,
                      index: props.index
                    })
                  ])
                }
              : undefined,
            ($options.hasEmptySlot)
              ? {
                  name: "empty",
                  fn: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "empty")
                  ])
                }
              : undefined,
            ($options.hasFooterSlot)
              ? {
                  name: "footer",
                  fn: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "footer")
                  ])
                }
              : undefined
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "loading", "autocomplete", "open-on-focus", "keep-open", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onKeydown", "onSelect", "onInfiniteScroll"]))
        : vue.createCommentVNode("v-if", true)
    ], 10 /* CLASS, PROPS */, ["disabled"]),
    ($props.hasCounter && ($props.maxtags || _ctx.maxlength))
      ? (vue.openBlock(), vue.createBlock("small", _hoisted_1, [
          (_ctx.maxlength && $options.valueLength > 0)
            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                vue.createTextVNode(vue.toDisplayString($options.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : ($props.maxtags)
              ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                  vue.createTextVNode(vue.toDisplayString($options.tagsLength) + " / " + vue.toDisplayString($props.maxtags), 1 /* TEXT */)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              : vue.createCommentVNode("v-if", true)
        ]))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/taginput/Taginput.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BTaginput = script;
exports["default"] = Plugin;
