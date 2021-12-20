'use strict';

var config = require('./config-2c63be1d.js');
var vue = require('vue');
var Icon = require('./Icon-dc7b693f.js');

var script$1 = {
    name: 'BPaginationButton',
    props: {
        page: {
            type: Object,
            required: true
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.config.defaultLinkTags.indexOf(value) >= 0
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        href() {
            if (this.tag === 'a') {
                return '#'
            } else {
                return undefined
            }
        },
        isDisabled() {
            return this.disabled || this.page.disabled
        },
        disabledOrUndefined() {
            return this.isDisabled || undefined
        }
    }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), vue.mergeProps({
    role: "button",
    href: $options.href,
    disabled: $options.disabledOrUndefined,
    class: ["pagination-link", { 'is-current': $props.page.isCurrent, [$props.page.class]: true }]
  }, _ctx.$attrs, {
    onClick: vue.withModifiers($props.page.click, ["prevent"]),
    "aria-label": $props.page['aria-label'],
    "aria-current": $props.page.isCurrent
  }), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString($props.page.number), 1 /* TEXT */)
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]))
}

script$1.render = render$1;
script$1.__file = "src/components/pagination/PaginationButton.vue";

var script = {
    name: 'BPagination',
    components: {
        [Icon.script.name]: Icon.script,
        [script$1.name]: script$1
    },
    props: {
        total: [Number, String],
        perPage: {
            type: [Number, String],
            default: 20
        },
        modelValue: {
            type: [Number, String],
            default: 1
        },
        rangeBefore: {
            type: [Number, String],
            default: 1
        },
        rangeAfter: {
            type: [Number, String],
            default: 1
        },
        size: String,
        simple: Boolean,
        rounded: Boolean,
        order: String,
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
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    emits: ['change', 'update:modelValue'],
    computed: {
        rootClasses() {
            return [
                this.order,
                this.size,
                {
                    'is-simple': this.simple,
                    'is-rounded': this.rounded
                }
            ]
        },

        beforeCurrent() {
            return parseInt(this.rangeBefore)
        },

        afterCurrent() {
            return parseInt(this.rangeAfter)
        },

        /**
        * Total page size (count).
        */
        pageCount() {
            return Math.ceil(this.total / this.perPage)
        },

        /**
        * First item of the page (count).
        */
        firstItem() {
            const firstItem = this.modelValue * this.perPage - this.perPage + 1;
            return firstItem >= 0 ? firstItem : 0
        },

        /**
        * Check if previous button is available.
        */
        hasPrev() {
            return this.modelValue > 1
        },

        /**
        * Check if first page button should be visible.
        */
        hasFirst() {
            return this.modelValue >= (2 + this.beforeCurrent)
        },

        /**
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
            return this.modelValue >= (this.beforeCurrent + 4)
        },

        /**
        * Check if last page button should be visible.
        */
        hasLast() {
            return this.modelValue <= this.pageCount - (1 + this.afterCurrent)
        },

        /**
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
            return this.modelValue < this.pageCount - (2 + this.afterCurrent)
        },

        /**
        * Check if next button is available.
        */
        hasNext() {
            return this.modelValue < this.pageCount
        },

        /**
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
            if (this.simple) return

            let left = Math.max(1, this.modelValue - this.beforeCurrent);
            if (left - 1 === 2) {
                left--; // Do not show the ellipsis if there is only one to hide
            }
            let right = Math.min(this.modelValue + this.afterCurrent, this.pageCount);
            if (this.pageCount - right === 2) {
                right++; // Do not show the ellipsis if there is only one to hide
            }

            const pages = [];
            for (let i = left; i <= right; i++) {
                pages.push(this.getPage(i));
            }
            return pages
        }
    },
    watch: {
        /**
        * If current page is trying to be greater than page count, set to last.
        */
        pageCount(value) {
            if (this.modelValue > value) this.last();
        }
    },
    methods: {
        /**
        * Previous button click listener.
        */
        prev(event) {
            this.changePage(this.modelValue - 1, event);
        },
        /**
        * Next button click listener.
        */
        next(event) {
            this.changePage(this.modelValue + 1, event);
        },
        /**
        * First button click listener.
        */
        first(event) {
            this.changePage(1, event);
        },
        /**
        * Last button click listener.
        */
        last(event) {
            this.changePage(this.pageCount, event);
        },

        changePage(num, event) {
            if (this.modelValue === num || num < 1 || num > this.pageCount) return
            this.$emit('update:modelValue', num);
            this.$emit('change', num);

            // Set focus on element to keep tab order
            if (event && event.target) {
                this.$nextTick(() => event.target.focus());
            }
        },

        getPage(num, options = {}) {
            return {
                number: num,
                isCurrent: this.modelValue === num,
                click: (event) => this.changePage(num, event),
                disabled: options.disabled || false,
                class: options.class || '',
                'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.modelValue === num)
            }
        },

        /**
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                return this.ariaPageLabel + ' ' + pageNumber + '.'
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.'
            }
            return null
        }
    }
};

const _hoisted_1 = {
  key: 4,
  class: "info"
};
const _hoisted_2 = {
  key: 5,
  class: "pagination-list"
};
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = /*#__PURE__*/vue.createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_6 = { key: 2 };
const _hoisted_7 = /*#__PURE__*/vue.createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_8 = { key: 3 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_BPaginationButton = vue.resolveComponent("BPaginationButton");

  return (vue.openBlock(), vue.createBlock("nav", {
    class: ["pagination", $options.rootClasses]
  }, [
    (_ctx.$slots.previous)
      ? vue.renderSlot(_ctx.$slots, "previous", {
          key: 0,
          page: $options.getPage($props.modelValue - 1, {
                disabled: !$options.hasPrev,
                class: 'pagination-previous',
                'aria-label': $props.ariaPreviousLabel
            })
        }, () => [
          vue.createVNode(_component_b_icon, {
            icon: $props.iconPrev,
            pack: $props.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8 /* PROPS */, ["icon", "pack"])
        ])
      : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
          key: 1,
          class: "pagination-previous",
          disabled: !$options.hasPrev,
          page: $options.getPage($props.modelValue - 1),
          "aria-label": $props.ariaPreviousLabel
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_b_icon, {
              icon: $props.iconPrev,
              pack: $props.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8 /* PROPS */, ["icon", "pack"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "page", "aria-label"])),
    (_ctx.$slots.next)
      ? vue.renderSlot(_ctx.$slots, "next", {
          key: 2,
          page: $options.getPage($props.modelValue + 1, {
                disabled: !$options.hasNext,
                class: 'pagination-next',
                'aria-label': $props.ariaNextLabel
            })
        }, () => [
          vue.createVNode(_component_b_icon, {
            icon: $props.iconNext,
            pack: $props.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8 /* PROPS */, ["icon", "pack"])
        ])
      : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
          key: 3,
          class: "pagination-next",
          disabled: !$options.hasNext,
          page: $options.getPage($props.modelValue + 1),
          "aria-label": $props.ariaNextLabel
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_b_icon, {
              icon: $props.iconNext,
              pack: $props.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8 /* PROPS */, ["icon", "pack"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "page", "aria-label"])),
    ($props.simple)
      ? (vue.openBlock(), vue.createBlock("small", _hoisted_1, [
          ($props.perPage == 1)
            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                vue.createTextVNode(vue.toDisplayString($options.firstItem) + " / " + vue.toDisplayString($props.total), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                vue.createTextVNode(vue.toDisplayString($options.firstItem) + "-" + vue.toDisplayString(Math.min($props.modelValue * $props.perPage, $props.total)) + " / " + vue.toDisplayString($props.total), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
        ]))
      : (vue.openBlock(), vue.createBlock("ul", _hoisted_2, [
          vue.createCommentVNode("First"),
          ($options.hasFirst)
            ? (vue.openBlock(), vue.createBlock("li", _hoisted_3, [
                (_ctx.$slots.default)
                  ? vue.renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      page: $options.getPage(1)
                    })
                  : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                      key: 1,
                      page: $options.getPage(1)
                    }, null, 8 /* PROPS */, ["page"]))
              ]))
            : vue.createCommentVNode("v-if", true),
          ($options.hasFirstEllipsis)
            ? (vue.openBlock(), vue.createBlock("li", _hoisted_4, [
                _hoisted_5
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode("Pages"),
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.pagesInRange, (page) => {
            return (vue.openBlock(), vue.createBlock("li", {
              key: page.number
            }, [
              (_ctx.$slots.default)
                ? vue.renderSlot(_ctx.$slots, "default", {
                    key: 0,
                    page: page
                  })
                : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                    key: 1,
                    page: page
                  }, null, 8 /* PROPS */, ["page"]))
            ]))
          }), 128 /* KEYED_FRAGMENT */)),
          vue.createCommentVNode("Last"),
          ($options.hasLastEllipsis)
            ? (vue.openBlock(), vue.createBlock("li", _hoisted_6, [
                _hoisted_7
              ]))
            : vue.createCommentVNode("v-if", true),
          ($options.hasLast)
            ? (vue.openBlock(), vue.createBlock("li", _hoisted_8, [
                (_ctx.$slots.default)
                  ? vue.renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      page: $options.getPage($options.pageCount)
                    })
                  : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                      key: 1,
                      page: $options.getPage($options.pageCount)
                    }, null, 8 /* PROPS */, ["page"]))
              ]))
            : vue.createCommentVNode("v-if", true)
        ]))
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/pagination/Pagination.vue";

exports.script = script;
exports.script$1 = script$1;
