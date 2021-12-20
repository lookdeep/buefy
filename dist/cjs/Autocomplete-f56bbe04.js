'use strict';

var helpers = require('./helpers-0d6e2444.js');
var FormElementMixin = require('./FormElementMixin-1ac87810.js');
var Input = require('./Input-554891c1.js');
var vue = require('vue');

var script = {
    name: 'BAutocomplete',
    components: {
        [Input.script.name]: Input.script
    },
    mixins: [FormElementMixin.FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: [Number, String],
        data: {
            type: Array,
            default: () => []
        },
        field: {
            type: String,
            default: 'value'
        },
        keepFirst: Boolean,
        clearOnSelect: Boolean,
        openOnFocus: Boolean,
        customFormatter: Function,
        checkInfiniteScroll: Boolean,
        keepOpen: Boolean,
        clearable: Boolean,
        maxHeight: [String, Number],
        dropdownPosition: {
            type: String,
            default: 'auto'
        },
        groupField: String,
        groupOptions: String,
        iconRight: String,
        iconRightClickable: Boolean,
        appendToBody: Boolean,
        confirmKeys: {
            type: Array,
            default: () => ['Tab', 'Enter']
        }
    },
    emits: [
        'blur',
        'focus',
        'icon-click',
        'icon-right-click',
        'infinite-scroll',
        'select',
        'typing',
        'update:modelValue'
    ],
    data() {
        return {
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.modelValue,
            newAutocomplete: this.autocomplete || 'off',
            isListInViewportVertically: true,
            hasFocus: false,
            style: {},
            _isAutocomplete: true,
            _elementRef: 'input',
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        computedData() {
            if (this.groupField) {
                if (this.groupOptions) {
                    const newData = [];
                    this.data.forEach((option) => {
                        const group = helpers.getValueByPath(option, this.groupField);
                        const items = helpers.getValueByPath(option, this.groupOptions);
                        newData.push({ group, items });
                    });
                    return newData
                } else {
                    const tmp = {};
                    this.data.forEach((option) => {
                        const group = helpers.getValueByPath(option, this.groupField);
                        if (!tmp[group]) tmp[group] = [];
                        tmp[group].push(option);
                    });
                    const newData = [];
                    Object.keys(tmp).forEach((group) => {
                        newData.push({ group, items: tmp[group] });
                    });
                    return newData
                }
            }
            return [{ items: this.data }]
        },
        isEmpty() {
            if (!this.computedData) return true
            return !this.computedData.some((element) => element.items && element.items.length)
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = [];
            whiteList.push(this.$refs.input.$el.querySelector('input'));
            whiteList.push(this.$refs.dropdown);
            // Add all children from dropdown
            if (this.$refs.dropdown != null) {
                const children = this.$refs.dropdown.querySelectorAll('*');
                for (const child of children) {
                    whiteList.push(child);
                }
            }
            if (this.$parent.$data._isTaginput) {
                // Add taginput container
                whiteList.push(this.$parent.$el);
                // Add .tag and .delete
                const tagInputChildren = this.$parent.$el.querySelectorAll('*');
                for (const tagInputChild of tagInputChildren) {
                    whiteList.push(tagInputChild);
                }
            }

            return whiteList
        },

        /**
         * Check if exists default slot
         */
        hasDefaultSlot() {
            return !!this.$slots.default
        },

        /**
         * Check if exists group slot
         */
        hasGroupSlot() {
            return !!this.$slots.group
        },

        /**
         * Check if exists "empty" slot
         */
        hasEmptySlot() {
            return !!this.$slots.empty
        },

        /**
         * Check if exists "header" slot
         */
        hasHeaderSlot() {
            return !!this.$slots.header
        },

        /**
         * Check if exists "footer" slot
         */
        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Apply dropdownPosition property
         */
        isOpenedTop() {
            return (
                this.dropdownPosition === 'top' ||
                    (this.dropdownPosition === 'auto' && !this.isListInViewportVertically)
            )
        },

        newIconRight() {
            if (this.clearable && this.newValue) {
                return 'close-circle'
            }
            return this.iconRight
        },

        newIconRightClickable() {
            if (this.clearable) {
                return true
            }
            return this.iconRightClickable
        },

        contentStyle() {
            return {
                maxHeight: helpers.toCssWidth(this.maxHeight)
            }
        }
    },
    watch: {
        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(active) {
            if (this.dropdownPosition === 'auto') {
                if (active) {
                    this.calcDropdownInViewportVertical();
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical();
                    }, 100);
                }
            }
        },

        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
            this.$emit('update:modelValue', value);
            // Check if selected is invalid
            const currentValue = this.getValue(this.selected);
            if (currentValue && currentValue !== value) {
                this.setSelected(null, false);
            }
            // Close dropdown if input is clear or else open it
            if (this.hasFocus && (!this.openOnFocus || value)) {
                this.isActive = !!value;
            }
        },

        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value;
        },

        /**
         * Select first option if "keep-first
         */
        data() {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.$nextTick(() => {
                    if (this.isActive) {
                        this.selectFirstOption(this.computedData);
                    }
                });
            }
        }
    },
    methods: {
        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
            if (option === undefined) return

            this.hovered = option;
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected(option, closeDropdown = true, event = undefined) {
            if (option === undefined) return

            this.selected = option;
            this.$emit('select', this.selected, event);
            if (this.selected !== null) {
                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
                this.setHovered(null);
            }
            closeDropdown && this.$nextTick(() => {
                this.isActive = false;
            });
            this.checkValidity();
        },

        /**
         * Select first option
         */
        selectFirstOption(element) {
            this.$nextTick(() => {
                if (element.length) {
                    // If has visible data or open on focus, keep updating the hovered
                    const option = element[0].items[0];
                    if (this.openOnFocus || (this.newValue !== '' && this.hovered !== option)) {
                        this.setHovered(option);
                    }
                } else {
                    this.setHovered(null);
                }
            });
        },

        keydown(event) {
            const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            // prevent emit submit event
            if (key === 'Enter') event.preventDefault();
            // Close dropdown on Tab & no hovered
            this.isActive = key !== 'Tab';
            if (this.hovered === null) return
            if (this.confirmKeys.indexOf(key) >= 0) {
                // If adding by comma, don't add the comma to the input
                if (key === ',') event.preventDefault();

                // Close dropdown on select by Tab
                const closeDropdown = !this.keepOpen || key === 'Tab';
                this.setSelected(this.hovered, closeDropdown, event);
            }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            const target = helpers.isCustomElement(this) ? event.composedPath()[0] : event.target;
            if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
                if (this.keepFirst && this.hovered) {
                    this.setSelected(this.hovered, true);
                } else {
                    this.isActive = false;
                }
            }
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
            if (option === null) return

            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(option)
            }
            return typeof option === 'object' ? helpers.getValueByPath(option, this.field) : option
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll(list) {
            if (list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight >= list.scrollHeight
            ) {
                this.$emit('infinite-scroll');
            }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
            this.$nextTick(() => {
                /**
                 * this.$refs.dropdown may be undefined
                 * when Autocomplete is conditional rendered
                 */
                if (this.$refs.dropdown == null) return

                const rect = this.$refs.dropdown.getBoundingClientRect();

                this.isListInViewportVertically = rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                if (this.appendToBody) {
                    this.updateAppendToBody();
                }
            });
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1;
            if (this.isActive) {
                const data = this.computedData.map(
                    (d) => d.items).reduce((a, b) => ([...a, ...b]), []);
                let index = data.indexOf(this.hovered) + sum;
                index = index > data.length - 1 ? data.length - 1 : index;
                index = index < 0 ? 0 : index;

                this.setHovered(data[index]);

                const list = this.$refs.dropdown.querySelector('.dropdown-content');
                const element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index];

                if (!element) return

                const visMin = list.scrollTop;
                const visMax = list.scrollTop + list.clientHeight - element.clientHeight;

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop;
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
                }
            } else {
                this.isActive = true;
            }
        },

        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
                this.$el.querySelector('input').select();
            }
            if (this.openOnFocus) {
                this.isActive = true;
                if (this.keepFirst) {
                    this.selectFirstOption(this.computedData);
                }
            }
            this.hasFocus = true;
            this.$emit('focus', event);
        },

        /**
         * Blur listener.
         */
        onBlur(event) {
            this.hasFocus = false;
            this.$emit('blur', event);
        },
        onInput(event) {
            const currentValue = this.getValue(this.selected);
            if (currentValue && currentValue === this.newValue) return
            this.$emit('typing', this.newValue);
            this.checkValidity();
        },
        rightIconClick(event) {
            if (this.clearable) {
                this.newValue = '';
                this.setSelected(null, false);
                if (this.openOnFocus) {
                    this.$refs.input.$el.focus();
                }
            } else {
                this.$emit('icon-right-click', event);
            }
        },
        checkValidity() {
            if (this.useHtml5Validation) {
                this.$nextTick(() => {
                    this.checkHtml5Validity();
                });
            }
        },
        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdown;
            const trigger = this.$refs.input.$el;
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const root = this.$data._bodyEl;
                root.classList.forEach((item) => root.classList.remove(item));
                root.classList.add('autocomplete');
                root.classList.add('control');
                if (this.expandend) {
                    root.classList.add('is-expandend');
                }
                const rect = trigger.getBoundingClientRect();
                let top = rect.top + window.scrollY;
                const left = rect.left + window.scrollX;
                if (!this.isOpenedTop) {
                    top += trigger.clientHeight;
                } else {
                    top -= dropdownMenu.clientHeight;
                }
                this.style = {
                    position: 'absolute',
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${trigger.clientWidth}px`,
                    maxWidth: `${trigger.clientWidth}px`,
                    zIndex: '99'
                };
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
            if (this.dropdownPosition === 'auto') { window.addEventListener('resize', this.calcDropdownInViewportVertical); }
        }
    },
    mounted() {
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
        ) {
            const list = this.$refs.dropdown.querySelector('.dropdown-content');
            list.addEventListener('scroll', () => this.checkIfReachedTheEndOfScroll(list));
        }
        if (this.appendToBody) {
            this.$data._bodyEl = helpers.createAbsoluteElement(this.$refs.dropdown);
            this.updateAppendToBody();
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
            if (this.dropdownPosition === 'auto') { window.removeEventListener('resize', this.calcDropdownInViewportVertical); }
        }
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
        ) {
            const list = this.$refs.dropdown.querySelector('.dropdown-content');
            list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
        }
        if (this.appendToBody) {
            helpers.removeElement(this.$data._bodyEl);
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "dropdown-item"
};
const _hoisted_2 = {
  key: 1,
  class: "has-text-weight-bold"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 1,
  class: "dropdown-item is-disabled"
};
const _hoisted_5 = {
  key: 2,
  class: "dropdown-item"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = vue.resolveComponent("b-input");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["autocomplete control", { 'is-expanded': _ctx.expanded }]
  }, [
    vue.createVNode(_component_b_input, vue.mergeProps({
      modelValue: $data.newValue,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.newValue = $event)),
      ref: "input",
      type: "text",
      size: _ctx.size,
      loading: _ctx.loading,
      rounded: _ctx.rounded,
      icon: _ctx.icon,
      "icon-right": $options.newIconRight,
      "icon-right-clickable": $options.newIconRightClickable,
      "icon-pack": _ctx.iconPack,
      maxlength: _ctx.maxlength,
      autocomplete: $data.newAutocomplete,
      "use-html5-validation": false
    }, _ctx.$attrs, {
      "onUpdate:modelValue": $options.onInput,
      onFocus: $options.focused,
      onBlur: $options.onBlur,
      onKeyup: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers($event => ($data.isActive = false), ["prevent"]), ["esc"])),
      onKeydown: [
        $options.keydown,
        _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers($event => ($options.keyArrows('up')), ["prevent"]), ["up"])),
        _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers($event => ($options.keyArrows('down')), ["prevent"]), ["down"]))
      ],
      onIconRightClick: $options.rightIconClick,
      onIconClick: _cache[5] || (_cache[5] = (event) => _ctx.$emit('icon-click', event))
    }), null, 16 /* FULL_PROPS */, ["modelValue", "size", "loading", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown", "onIconRightClick"]),
    vue.createVNode(vue.Transition, { name: "fade" }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("div", {
          class: ["dropdown-menu", { 'is-opened-top': $options.isOpenedTop && !$props.appendToBody }],
          style: $data.style,
          ref: "dropdown"
        }, [
          vue.withDirectives(vue.createVNode("div", {
            class: "dropdown-content",
            style: $options.contentStyle
          }, [
            ($options.hasHeaderSlot)
              ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
                  vue.renderSlot(_ctx.$slots, "header")
                ]))
              : vue.createCommentVNode("v-if", true),
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.computedData, (element, groupindex) => {
              return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
                (element.group)
                  ? (vue.openBlock(), vue.createBlock("div", {
                      key: groupindex + 'group',
                      class: "dropdown-item"
                    }, [
                      ($options.hasGroupSlot)
                        ? vue.renderSlot(_ctx.$slots, "group", {
                            key: 0,
                            group: element.group,
                            index: groupindex
                          })
                        : (vue.openBlock(), vue.createBlock("span", _hoisted_2, vue.toDisplayString(element.group), 1 /* TEXT */))
                    ]))
                  : vue.createCommentVNode("v-if", true),
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(element.items, (option, index) => {
                  return (vue.openBlock(), vue.createBlock("a", {
                    key: groupindex + ':' + index,
                    class: ["dropdown-item", { 'is-hovered': option === $data.hovered }],
                    onClick: $event => ($options.setSelected(option, undefined, $event))
                  }, [
                    ($options.hasDefaultSlot)
                      ? vue.renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          option: option,
                          index: index
                        })
                      : (vue.openBlock(), vue.createBlock("span", _hoisted_3, vue.toDisplayString($options.getValue(option, true)), 1 /* TEXT */))
                  ], 10 /* CLASS, PROPS */, ["onClick"]))
                }), 128 /* KEYED_FRAGMENT */))
              ], 64 /* STABLE_FRAGMENT */))
            }), 256 /* UNKEYED_FRAGMENT */)),
            ($options.isEmpty && $options.hasEmptySlot)
              ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, [
                  vue.renderSlot(_ctx.$slots, "empty")
                ]))
              : vue.createCommentVNode("v-if", true),
            ($options.hasFooterSlot)
              ? (vue.openBlock(), vue.createBlock("div", _hoisted_5, [
                  vue.renderSlot(_ctx.$slots, "footer")
                ]))
              : vue.createCommentVNode("v-if", true)
          ], 4 /* STYLE */), [
            [vue.vShow, $data.isActive]
          ])
        ], 6 /* CLASS, STYLE */), [
          [vue.vShow, $data.isActive && (!$options.isEmpty || $options.hasEmptySlot || $options.hasHeaderSlot)]
        ])
      ]),
      _: 3 /* FORWARDED */
    })
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/autocomplete/Autocomplete.vue";

exports.script = script;
