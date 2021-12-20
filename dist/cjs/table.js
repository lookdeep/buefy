'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers-0d6e2444.js');
var Checkbox = require('./Checkbox-c83a3715.js');
var Icon = require('./Icon-dc7b693f.js');
var Input = require('./Input-554891c1.js');
var Loading = require('./Loading-d96bd0d7.js');
var SlotComponent = require('./SlotComponent-f2e4fdc4.js');
var Select = require('./Select-a6108835.js');
var vue = require('vue');
var Pagination = require('./Pagination-f02c5b87.js');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');
require('./CheckRadioMixin-6055e755.js');
require('./config-2c63be1d.js');
require('./FormElementMixin-1ac87810.js');
require('./ssr-95fd856b.js');

function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var script$3 = {
    name: 'BTableMobileSort',
    components: {
        [Select.script.name]: Select.script,
        [Icon.script.name]: Icon.script
    },
    props: {
        currentSortColumn: Object,
        sortMultipleData: Array,
        isAsc: Boolean,
        columns: Array,
        placeholder: String,
        iconPack: String,
        sortIcon: {
            type: String,
            default: 'arrow-up'
        },
        sortIconSize: {
            type: String,
            default: 'is-small'
        },
        sortMultiple: {
            type: Boolean,
            default: false
        }
    },
    emits: ['removePriority', 'sort'],
    data() {
        return {
            sortMultipleSelect: '',
            sortMultipleSelectIndex: -1,
            mobileSort: this.currentSortColumn,
            mobileSortIndex: this.columns.indexOf(this.currentSortColumn),
            defaultEvent: {
                shiftKey: true,
                altKey: true,
                ctrlKey: true
            },
            ignoreSort: false
        }
    },
    computed: {
        showPlaceholder() {
            return !this.columns || !this.columns.some((column) => column === this.mobileSort)
        }
    },
    watch: {
        sortMultipleSelect(column) {
            if (this.ignoreSort) {
                this.ignoreSort = false;
            } else {
                this.$emit('sort', column, this.defaultEvent);
            }
        },
        sortMultipleSelectIndex(index) {
            if (index !== -1) {
                this.sortMultipleSelect = this.columns[index];
            } else {
                this.sortMultipleSelect = null;
            }
        },
        mobileSort(column) {
            if (this.currentSortColumn === column) return

            this.$emit('sort', column, this.defaultEvent);
        },
        mobileSortIndex(index) {
            if (index !== -1) {
                this.mobileSort = this.columns[index];
            } else {
                this.mobileSort = null;
            }
        },
        currentSortColumn(column) {
            this.mobileSortIndex = this.columns.indexOf(column);
        },
        columns(newColumns) {
            if (this.sortMultiple) {
                this.sortMultipleSelectIndex = newColumns.indexOf(
                    this.sortMultipleSelect
                );
            } else {
                this.mobileSortIndex = newColumns.indexOf(this.mobileSort);
            }
        }
    },
    methods: {
        removePriority() {
            this.$emit('removePriority', this.sortMultipleSelect);
            // ignore the watcher to sort when we just change whats displayed in the select
            // otherwise the direction will be flipped
            // The sort event is already triggered by the emit
            this.ignoreSort = true;
            // Select one of the other options when we reset one
            const remainingFields = this.sortMultipleData.filter((data) =>
                data.field !== this.sortMultipleSelect.field)
                .map((data) => data.field);
            this.sortMultipleSelectIndex = this.columns.findIndex((column) =>
                remainingFields.includes(column.field));
        },
        getSortingObjectOfColumn(column) {
            return this.sortMultipleData.filter((i) =>
                i.field === column.field)[0]
        },
        columnIsDesc(column) {
            const sortingObject = this.getSortingObjectOfColumn(column);
            if (sortingObject) {
                return !!(sortingObject.order && sortingObject.order === 'desc')
            }
            return true
        },
        getLabel(column) {
            const sortingObject = this.getSortingObjectOfColumn(column);
            if (sortingObject) {
                return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')'
            }
            return column.label
        },
        sort() {
            this.$emit('sort', (this.sortMultiple ? this.sortMultipleSelect : this.mobileSort), this.defaultEvent);
        }
    }
};

const _hoisted_1$2 = { class: "field table-mobile-sort" };
const _hoisted_2$2 = { class: "field has-addons" };
const _hoisted_3$2 = /*#__PURE__*/vue.createTextVNode(" ↓ ");
const _hoisted_4$2 = /*#__PURE__*/vue.createTextVNode(" ↑ ");
const _hoisted_5$1 = { class: "control" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_select = vue.resolveComponent("b-select");
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$2, [
    vue.createVNode("div", _hoisted_2$2, [
      ($props.sortMultiple)
        ? (vue.openBlock(), vue.createBlock(_component_b_select, {
            key: 0,
            modelValue: $data.sortMultipleSelectIndex,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.sortMultipleSelectIndex = $event)),
            expanded: ""
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.columns, (column, index) => {
                return (vue.openBlock(), vue.createBlock(vue.Fragment, { key: index }, [
                  (column.sortable)
                    ? (vue.openBlock(), vue.createBlock("option", {
                        key: 0,
                        value: index
                      }, [
                        vue.createTextVNode(vue.toDisplayString($options.getLabel(column)) + " ", 1 /* TEXT */),
                        ($options.getSortingObjectOfColumn(column))
                          ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                              ($options.columnIsDesc(column))
                                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                    _hoisted_3$2
                                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                                : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                                    _hoisted_4$2
                                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                            ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                          : vue.createCommentVNode("v-if", true)
                      ], 8 /* PROPS */, ["value"]))
                    : vue.createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue"]))
        : (vue.openBlock(), vue.createBlock(_component_b_select, {
            key: 1,
            modelValue: $data.mobileSortIndex,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.mobileSortIndex = $event)),
            expanded: ""
          }, {
            default: vue.withCtx(() => [
              ($props.placeholder)
                ? vue.withDirectives((vue.openBlock(), vue.createBlock("option", {
                    key: 0,
                    value: {},
                    selected: "",
                    disabled: "",
                    hidden: ""
                  }, vue.toDisplayString($props.placeholder), 513 /* TEXT, NEED_PATCH */)), [
                    [vue.vShow, $options.showPlaceholder]
                  ])
                : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.columns, (column, index) => {
                return (vue.openBlock(), vue.createBlock(vue.Fragment, { key: index }, [
                  (column.sortable)
                    ? (vue.openBlock(), vue.createBlock("option", {
                        key: 0,
                        value: index
                      }, vue.toDisplayString(column.label), 9 /* TEXT, PROPS */, ["value"]))
                    : vue.createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue"])),
      vue.createVNode("div", _hoisted_5$1, [
        ($props.sortMultiple && $props.sortMultipleData.length > 0)
          ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
              vue.createVNode("button", {
                class: "button is-primary",
                onClick: _cache[3] || (_cache[3] = (...args) => ($options.sort && $options.sort(...args)))
              }, [
                vue.createVNode(_component_b_icon, {
                  class: { 'is-desc': $options.columnIsDesc($data.sortMultipleSelect) },
                  icon: $props.sortIcon,
                  pack: $props.iconPack,
                  size: $props.sortIconSize,
                  both: ""
                }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"])
              ]),
              vue.createVNode("button", {
                class: "button is-primary",
                onClick: _cache[4] || (_cache[4] = (...args) => ($options.removePriority && $options.removePriority(...args)))
              }, [
                vue.createVNode(_component_b_icon, {
                  icon: "delete",
                  size: $props.sortIconSize,
                  both: ""
                }, null, 8 /* PROPS */, ["size"])
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (!$props.sortMultiple)
            ? (vue.openBlock(), vue.createBlock("button", {
                key: 1,
                class: "button is-primary",
                onClick: _cache[5] || (_cache[5] = (...args) => ($options.sort && $options.sort(...args)))
              }, [
                vue.withDirectives(vue.createVNode(_component_b_icon, {
                  class: { 'is-desc': !$props.isAsc },
                  icon: $props.sortIcon,
                  pack: $props.iconPack,
                  size: $props.sortIconSize,
                  both: ""
                }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"]), [
                  [vue.vShow, $props.currentSortColumn === $data.mobileSort]
                ])
              ]))
            : vue.createCommentVNode("v-if", true)
      ])
    ])
  ]))
}

script$3.render = render$2;
script$3.__file = "src/components/table/TableMobileSort.vue";

var script$2 = {
    name: 'BTableColumn',
    inject: {
        $table: { name: '$table', default: false }
    },
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        searchable: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        subheading: [String, Number],
        customSort: Function,
        customSearch: Function,
        sticky: Boolean,
        headerSelectable: Boolean,
        headerClass: String,
        cellClass: String,
        thAttrs: {
            type: Function,
            default: () => ({})
        },
        tdAttrs: {
            type: Function,
            default: () => ({})
        }
    },
    data() {
        return {
            newKey: this.customKey || this.label,
            _isTableColumn: true
        }
    },
    computed: {
        thClasses() {
            const attrs = this.thAttrs(this);
            const classes = [this.headerClass, {
                'is-sortable': this.sortable,
                'is-sticky': this.sticky,
                'is-unselectable': this.isHeaderUnSelectable
            }];
            if (attrs && attrs.class) {
                classes.push(attrs.class);
            }
            return classes
        },
        thStyle() {
            const attrs = this.thAttrs(this);
            const style = [this.style];
            if (attrs && attrs.style) {
                style.push(attrs.style);
            }
            return style
        },
        rootClasses() {
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        },
        style() {
            return {
                width: helpers.toCssWidth(this.width)
            }
        },
        hasDefaultSlot() {
            return !!this.$slots.default
        },
        /**
         * Return if column header is un-selectable
         */
        isHeaderUnSelectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    methods: {
        getRootClasses(row) {
            const attrs = this.tdAttrs(row, this);
            const classes = [this.rootClasses];
            if (attrs && attrs.class) {
                classes.push(attrs.class);
            }
            return classes
        },
        getRootStyle(row) {
            const attrs = this.tdAttrs(row, this);
            const style = [];
            if (attrs && attrs.style) {
                style.push(attrs.style);
            }
            return style
        }
    },
    created() {
        if (!this.$table) {
            throw new Error('You should wrap bTableColumn on a bTable')
        }
        this.$table._registerTableColumn(this);
    },
    beforeUnmount() {
        this.$table._unregisterTableColumn(this);
    },
    render(createElement) {
        // renderless
        return null
    }
};

script$2.__file = "src/components/table/TableColumn.vue";

var script$1 = {
    name: 'BTablePagination',
    components: {
        [Pagination.script.name]: Pagination.script
    },
    props: {
        paginated: Boolean,
        total: [Number, String],
        perPage: [Number, String],
        currentPage: [Number, String],
        paginationSimple: Boolean,
        paginationSize: String,
        rounded: Boolean,
        iconPack: String,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    emits: ['page-change', 'update:currentPage'],
    data() {
        return {
            newCurrentPage: this.currentPage
        }
    },
    watch: {
        currentPage(newVal) {
            this.newCurrentPage = newVal;
        }
    },
    methods: {
        /**
        * Paginator change listener.
        */
        pageChanged(page) {
            this.newCurrentPage = page > 0 ? page : 1;
            this.$emit('update:currentPage', this.newCurrentPage);
            this.$emit('page-change', this.newCurrentPage);
        }
    }
};

const _hoisted_1$1 = { class: "top level" };
const _hoisted_2$1 = { class: "level-left" };
const _hoisted_3$1 = { class: "level-right" };
const _hoisted_4$1 = {
  key: 0,
  class: "level-item"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_pagination = vue.resolveComponent("b-pagination");

  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
    vue.createVNode("div", _hoisted_2$1, [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    vue.createVNode("div", _hoisted_3$1, [
      ($props.paginated)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_4$1, [
            vue.createVNode(_component_b_pagination, {
              "icon-pack": $props.iconPack,
              total: $props.total,
              "per-page": $props.perPage,
              simple: $props.paginationSimple,
              size: $props.paginationSize,
              "model-value": $data.newCurrentPage,
              rounded: $props.rounded,
              onChange: $options.pageChanged,
              "aria-next-label": $props.ariaNextLabel,
              "aria-previous-label": $props.ariaPreviousLabel,
              "aria-page-label": $props.ariaPageLabel,
              "aria-current-label": $props.ariaCurrentLabel
            }, null, 8 /* PROPS */, ["icon-pack", "total", "per-page", "simple", "size", "model-value", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
          ]))
        : vue.createCommentVNode("v-if", true)
    ])
  ]))
}

script$1.render = render$1;
script$1.__file = "src/components/table/TablePagination.vue";

var tinyEmitter = {exports: {}};

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

tinyEmitter.exports = E;
tinyEmitter.exports.TinyEmitter = E;

var Emitter = tinyEmitter.exports;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { helpers._defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function mockTableColumn(table, column) {
  var eventEmitter = new Emitter();
  var defaultProps = {
    label: undefined,
    customKey: undefined,
    field: undefined,
    meta: undefined,
    width: undefined,
    numeric: undefined,
    centered: undefined,
    searchable: undefined,
    sortable: undefined,
    visible: true,
    subheading: undefined,
    customSort: undefined,
    customSearch: undefined,
    sticky: undefined,
    headerSelectable: undefined,
    headerClass: undefined,
    thAttrs: function thAttrs() {
      return {};
    },
    tdAttrs: function tdAttrs() {
      return {};
    }
  };
  return _objectSpread(_objectSpread(_objectSpread({}, defaultProps), column), {}, {
    // data
    parent: table,
    newKey: column.customKey || column.label,
    _isTableColumn: true,
    // inject
    $table: table,

    // computed
    get thClasses() {
      var attrs = this.thAttrs(this);
      var classes = [this.headerClass, {
        'is-sortable': this.sortable,
        'is-sticky': this.sticky,
        'is-unselectable': this.isHeaderUnSelectable
      }];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },

    get thStyle() {
      var attrs = this.thAttrs(this);
      var style = [this.style];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    },

    get rootClasses() {
      return [this.cellClass, {
        'has-text-right': this.numeric && !this.centered,
        'has-text-centered': this.centered,
        'is-sticky': this.sticky
      }];
    },

    get style() {
      return {
        width: helpers.toCssWidth(this.width)
      };
    },

    get hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },

    get isHeaderUnSelectable() {
      return !this.headerSelectable && this.sortable;
    },

    // methods
    getRootClasses: function getRootClasses(row) {
      var attrs = this.tdAttrs(row, this);
      var classes = [this.rootClasses];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },
    getRootStyle: function getRootStyle(row) {
      var attrs = this.tdAttrs(row, this);
      var style = [];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    },
    $on: function $on() {
      return eventEmitter.on.apply(eventEmitter, arguments);
    },
    $once: function $once() {
      return eventEmitter.once.apply(eventEmitter, arguments);
    },
    $off: function $off() {
      return eventEmitter.off.apply(eventEmitter, arguments);
    },
    $emit: function $emit() {
      return eventEmitter.emit.apply(eventEmitter, arguments);
    },
    // special fields
    _isVue: true,
    $slots: {
      default: function _default(props) {
        var vnode = vue.h('span', {
          innerHTML: helpers.getValueByPath(props.row, column.field)
        });
        return [vnode];
      }
    }
  });
}

var script = {
    name: 'BTable',
    components: {
        [Checkbox.script.name]: Checkbox.script,
        [Icon.script.name]: Icon.script,
        [Input.script.name]: Input.script,
        [Loading.script.name]: Loading.script,
        [SlotComponent.SlotComponent.name]: SlotComponent.SlotComponent,
        [script$3.name]: script$3,
        [script$2.name]: script$2,
        [script$1.name]: script$1
    },
    inheritAttrs: false,
    provide() {
        return {
            $table: this
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        bordered: Boolean,
        striped: Boolean,
        narrowed: Boolean,
        hoverable: Boolean,
        loading: Boolean,
        detailed: Boolean,
        checkable: Boolean,
        headerCheckable: {
            type: Boolean,
            default: true
        },
        checkboxPosition: {
            type: String,
            default: 'left',
            validator: (value) => {
                return [
                    'left',
                    'right'
                ].indexOf(value) >= 0
            }
        },
        stickyCheckbox: {
            type: Boolean,
            default: false
        },
        selected: Object,
        isRowSelectable: {
            type: Function,
            default: () => true
        },
        focusable: Boolean,
        customIsChecked: Function,
        isRowCheckable: {
            type: Function,
            default: () => true
        },
        checkedRows: {
            type: Array,
            default: () => []
        },
        mobileCards: {
            type: Boolean,
            default: true
        },
        defaultSort: [String, Array],
        defaultSortDirection: {
            type: String,
            default: 'asc'
        },
        sortIcon: {
            type: String,
            default: 'arrow-up'
        },
        sortIconSize: {
            type: String,
            default: 'is-small'
        },
        sortMultiple: {
            type: Boolean,
            default: false
        },
        sortMultipleData: {
            type: Array,
            default: () => []
        },
        sortMultipleKey: {
            type: String,
            default: null
        },
        paginated: Boolean,
        currentPage: {
            type: Number,
            default: 1
        },
        perPage: {
            type: [Number, String],
            default: 20
        },
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        paginationPosition: {
            type: String,
            default: 'bottom',
            validator: (value) => {
                return [
                    'bottom',
                    'top',
                    'both'
                ].indexOf(value) >= 0
            }
        },
        paginationRounded: Boolean,
        backendSorting: Boolean,
        backendFiltering: Boolean,
        rowClass: {
            type: Function,
            default: () => ''
        },
        openedDetailed: {
            type: Array,
            default: () => []
        },
        hasDetailedVisible: {
            type: Function,
            default: () => true
        },
        detailKey: {
            type: String,
            default: ''
        },
        detailTransition: {
            type: String,
            default: ''
        },
        customDetailRow: {
            type: Boolean,
            default: false
        },
        backendPagination: Boolean,
        total: {
            type: [Number, String],
            default: 0
        },
        iconPack: String,
        mobileSortPlaceholder: String,
        customRowKey: String,
        draggable: {
            type: Boolean,
            default: false
        },
        draggableColumn: {
            type: Boolean,
            default: false
        },
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        stickyHeader: Boolean,
        height: [Number, String],
        filtersEvent: {
            type: String,
            default: ''
        },
        cardLayout: Boolean,
        showHeader: {
            type: Boolean,
            default: true
        },
        debounceSearch: Number
    },
    emits: [
        'cellclick',
        'check',
        'check-all',
        'click',
        'columndragend',
        'columndragleave',
        'columndragover',
        'columndragstart',
        'columndrop',
        'contextmenu',
        'dblclick',
        'details-close',
        'details-open',
        'dragend',
        'dragleave',
        'dragover',
        'dragstart',
        'drop',
        'filters-change',
        'page-change',
        'select',
        'sort',
        'sorting-priority-removed',
        'update:checkedRows',
        'update:currentPage',
        'update:openedDetailed',
        'update:selected'
    ],
    data() {
        return {
            sortMultipleDataLocal: [],
            getValueByPath: helpers.getValueByPath,
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [...this.checkedRows],
            lastCheckedRowIndex: null,
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            filters: {},
            defaultSlots: [],
            firstTimeSort: true, // Used by first time initSort
            _isTable: true, // Used by TableColumn
            isDraggingRow: false,
            isDraggingColumn: false
        }
    },
    computed: {
        sortMultipleDataComputed() {
            return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
        },
        tableClasses() {
            return {
                'is-bordered': this.bordered,
                'is-striped': this.striped,
                'is-narrow': this.narrowed,
                'is-hoverable': (
                    (this.hoverable || this.focusable) &&
                    this.visibleData.length
                )
            }
        },
        tableWrapperClasses() {
            return {
                'has-mobile-cards': this.mobileCards,
                'has-sticky-header': this.stickyHeader,
                'is-card-list': this.cardLayout,
                'table-container': this.isScrollable
            }
        },
        tableStyle() {
            return {
                height: helpers.toCssWidth(this.height)
            }
        },

        /**
        * Splitted data based on the pagination.
        */
        visibleData() {
            if (!this.paginated) return this.newData

            const currentPage = this.newCurrentPage;
            const perPage = this.perPage;

            if (this.newData.length <= perPage) {
                return this.newData
            } else {
                const start = (currentPage - 1) * perPage;
                const end = parseInt(start, 10) + parseInt(perPage, 10);
                return this.newData.slice(start, end)
            }
        },

        visibleColumns() {
            if (!this.newColumns) return this.newColumns
            return this.newColumns.filter((column) => {
                return column.visible || column.visible === undefined
            })
        },

        /**
        * Check if all rows in the page are checked.
        */
        isAllChecked() {
            const validVisibleData = this.visibleData.filter(
                (row) => this.isRowCheckable(row));
            if (validVisibleData.length === 0) return false
            const isAllChecked = validVisibleData.some((currentVisibleRow) => {
                return helpers.indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
            });
            return !isAllChecked
        },

        /**
        * Check if all rows in the page are checkable.
        */
        isAllUncheckable() {
            const validVisibleData = this.visibleData.filter(
                (row) => this.isRowCheckable(row));
            return validVisibleData.length === 0
        },

        /**
        * Check if has any sortable column.
        */
        hasSortablenewColumns() {
            return this.newColumns.some((column) => {
                return column.sortable
            })
        },

        /**
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
            return this.newColumns.some((column) => {
                return column.searchable
            })
        },

        /**
        * Check if has any column using subheading.
        */
        hasCustomSubheadings() {
            if (this.$slots && this.$slots.subheading) return true
            return this.newColumns.some((column) => {
                return column.subheading || column.$slots.subheading
            })
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.visibleColumns.length;
            count += this.checkable ? 1 : 0;
            count += (this.detailed && this.showDetailIcon) ? 1 : 0;

            return count
        },

        /**
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
            return this.detailed && this.showDetailIcon
        },

        /**
        * return if scrollable table
        */
        isScrollable() {
            if (this.scrollable) return true
            if (!this.newColumns) return false
            return this.newColumns.some((column) => {
                return column.sticky
            })
        },

        newColumns() {
            if (this.columns && this.columns.length) {
                return this.columns.map((column) => {
                    return mockTableColumn(this, column)
                })
            }
            return this.defaultSlots
        },
        canDragRow() {
            return this.draggable && !this.isDraggingColumn
        },
        canDragColumn() {
            return this.draggableColumn && !this.isDraggingRow
        }
    },
    watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data(value) {
            this.newData = value;
            if (!this.backendFiltering) {
                this.newData = value.filter(
                    (row) => this.isRowFiltered(row));
            }
            if (!this.backendSorting) {
                this.sort(this.currentSortColumn, true);
            }
            if (!this.backendPagination) {
                this.newDataTotal = this.newData.length;
            }
        },

        /**
        * When Pagination total change, update internal total
        * only if it's backend-paginated.
        */
        total(newTotal) {
            if (!this.backendPagination) return

            this.newDataTotal = newTotal;
        },

        currentPage(newVal) {
            this.newCurrentPage = newVal;
        },

        newCurrentPage(newVal) {
            this.$emit('update:currentPage', newVal);
        },

        /**
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows(rows) {
            this.newCheckedRows = [...rows];
        },

        /*
        newColumns(value) {
            this.checkSort()
        },
        */

        debounceSearch: {
            handler(value) {
                this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
            },
            immediate: true
        },

        filters: {
            handler(value) {
                if (this.debounceSearch) {
                    this.debouncedHandleFiltersChange(value);
                } else {
                    this.handleFiltersChange(value);
                }
            },
            deep: true
        },

        /**
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows) {
            this.visibleDetailRows = expandedRows;
        }
    },
    methods: {
        onFiltersEvent(event) {
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
        },
        handleFiltersChange(value) {
            if (this.backendFiltering) {
                this.$emit('filters-change', value);
            } else {
                this.newData = this.data.filter(
                    (row) => this.isRowFiltered(row));
                if (!this.backendPagination) {
                    this.newDataTotal = this.newData.length;
                }
                if (!this.backendSorting) {
                    if (this.sortMultiple &&
                        this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
                        this.doSortMultiColumn();
                    } else if (Object.keys(this.currentSortColumn).length > 0) {
                        this.doSortSingleColumn(this.currentSortColumn);
                    }
                }
            }
        },
        findIndexOfSortData(column) {
            const sortObj = this.sortMultipleDataComputed.filter((i) =>
                i.field === column.field)[0];
            return this.sortMultipleDataComputed.indexOf(sortObj) + 1
        },
        removeSortingPriority(column) {
            if (this.backendSorting) {
                this.$emit('sorting-priority-removed', column.field);
            } else {
                this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                    (priority) => priority.field !== column.field);

                const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                    return (i.order && i.order === 'desc' ? '-' : '') + i.field
                });
                this.newData = helpers.multiColumnSort(this.newData, formattedSortingPriority);
            }
        },
        resetMultiSorting() {
            this.sortMultipleDataLocal = [];
            this.currentSortColumn = {};
            this.newData = this.data;
        },
        /**
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(array, key, fn, isAsc) {
            let sorted = [];
            // Sorting without mutating original data
            if (fn && typeof fn === 'function') {
                sorted = [...array].sort((a, b) => fn(a, b, isAsc));
            } else {
                sorted = [...array].sort((a, b) => {
                    // Get nested values from objects
                    let newA = helpers.getValueByPath(a, key);
                    let newB = helpers.getValueByPath(b, key);

                    // sort boolean type
                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                        return isAsc ? newA - newB : newB - newA
                    }

                    if (!newA && newA !== 0) return 1
                    if (!newB && newB !== 0) return -1
                    if (newA === newB) return 0

                    newA = (typeof newA === 'string')
                        ? newA.toUpperCase()
                        : newA;
                    newB = (typeof newB === 'string')
                        ? newB.toUpperCase()
                        : newB;

                    return isAsc
                        ? newA > newB ? 1 : -1
                        : newA > newB ? -1 : 1
                });
            }

            return sorted
        },

        sortMultiColumn(column) {
            this.currentSortColumn = {};
            if (!this.backendSorting) {
                const existingPriority = this.sortMultipleDataLocal.filter((i) =>
                    i.field === column.field)[0];
                if (existingPriority) {
                    existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc';
                } else {
                    this.sortMultipleDataLocal.push(
                        { field: column.field, order: column.isAsc }
                    );
                }
                this.doSortMultiColumn();
            }
        },

        doSortMultiColumn() {
            const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                return (i.order && i.order === 'desc' ? '-' : '') + i.field
            });
            this.newData = helpers.multiColumnSort(this.newData, formattedSortingPriority);
        },

        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
            if (
                // if backend sorting is enabled, just emit the sort press like usual
                // if the correct key combination isnt pressed, sort like usual
                !this.backendSorting &&
                this.sortMultiple &&
                ((this.sortMultipleKey && event[this.sortMultipleKey]) || !this.sortMultipleKey)
            ) {
                if (updatingData) {
                    this.doSortMultiColumn();
                } else {
                    this.sortMultiColumn(column);
                }
            } else {
                if (!column || !column.sortable) return

                // sort multiple is enabled but the correct key combination isnt pressed so reset
                if (this.sortMultiple) {
                    this.sortMultipleDataLocal = [];
                }

                if (!updatingData) {
                    this.isAsc = column === this.currentSortColumn
                        ? !this.isAsc
                        : (this.defaultSortDirection.toLowerCase() !== 'desc');
                }
                if (!this.firstTimeSort) {
                    this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
                }
                if (!this.backendSorting) {
                    this.doSortSingleColumn(column);
                }
                this.currentSortColumn = column;
            }
        },

        doSortSingleColumn(column) {
            this.newData = this.sortBy(
                this.newData,
                column.field,
                column.customSort,
                this.isAsc
            );
        },

        isRowSelected(row, selected) {
            if (!selected) {
                return false
            }
            if (this.customRowKey) {
                return row[this.customRowKey] === selected[this.customRowKey]
            }
            return row === selected
        },

        /**
        * Check if the row is checked (is added to the array).
        */
        isRowChecked(row) {
            return helpers.indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
        },

        /**
        * Remove a checked row from the array.
        */
        removeCheckedRow(row) {
            const index = helpers.indexOf(this.newCheckedRows, row, this.customIsChecked);
            if (index >= 0) {
                this.newCheckedRows.splice(index, 1);
            }
        },

        /**
        * Header checkbox click listener.
        * Add or remove all rows in current page.
        */
        checkAll() {
            const isAllChecked = this.isAllChecked;
            this.visibleData.forEach((currentRow) => {
                if (this.isRowCheckable(currentRow)) {
                    this.removeCheckedRow(currentRow);
                }
                if (!isAllChecked) {
                    if (this.isRowCheckable(currentRow)) {
                        this.newCheckedRows.push(currentRow);
                    }
                }
            });

            this.$emit('check', this.newCheckedRows);
            this.$emit('check-all', this.newCheckedRows);

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows);
        },

        /**
        * Row checkbox click listener.
        */
        checkRow(row, index, event) {
            if (!this.isRowCheckable(row)) return
            const lastIndex = this.lastCheckedRowIndex;
            this.lastCheckedRowIndex = index;

            if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
                this.shiftCheckRow(row, index, lastIndex);
            } else if (!this.isRowChecked(row)) {
                this.newCheckedRows.push(row);
            } else {
                this.removeCheckedRow(row);
            }

            this.$emit('check', this.newCheckedRows, row);

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows);
        },

        /**
         * Check row when shift is pressed.
         */
        shiftCheckRow(row, index, lastCheckedRowIndex) {
            // Get the subset of the list between the two indicies
            const subset = this.visibleData.slice(
                Math.min(index, lastCheckedRowIndex),
                Math.max(index, lastCheckedRowIndex) + 1
            );

            // Determine the operation based on the state of the clicked checkbox
            const shouldCheck = !this.isRowChecked(row);

            subset.forEach((item) => {
                this.removeCheckedRow(item);
                if (shouldCheck && this.isRowCheckable(item)) {
                    this.newCheckedRows.push(item);
                }
            });
        },

        /**
        * Row click listener.
        * Emit all necessary events.
        */
        selectRow(row, index) {
            this.$emit('click', row);

            if (this.selected === row) return
            if (!this.isRowSelectable(row)) return

            // Emit new and old row
            this.$emit('select', row, this.selected);

            // Emit new row to update user variable
            this.$emit('update:selected', row);
        },

        /**
        * Toggle to show/hide details slot
        */
        toggleDetails(obj) {
            const found = this.isVisibleDetailRow(obj);

            if (found) {
                this.closeDetailRow(obj);
                this.$emit('details-close', obj);
            } else {
                this.openDetailRow(obj);
                this.$emit('details-open', obj);
            }

            // Syncs the detailed rows with the parent component
            this.$emit('update:openedDetailed', this.visibleDetailRows);
        },

        openDetailRow(obj) {
            const index = this.handleDetailKey(obj);
            this.visibleDetailRows.push(index);
        },

        closeDetailRow(obj) {
            const index = this.handleDetailKey(obj);
            const i = this.visibleDetailRows.indexOf(index);
            this.visibleDetailRows.splice(i, 1);
        },

        isVisibleDetailRow(obj) {
            const index = this.handleDetailKey(obj);
            const result = this.visibleDetailRows.indexOf(index) >= 0;
            return result
        },

        isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isRowFiltered(row) {
            for (const key in this.filters) {
                // remove key if empty
                if (!this.filters[key]) {
                    delete this.filters[key];
                    return true
                }
                const input = this.filters[key];
                const column = this.newColumns.filter((c) => c.field === key)[0];
                if (column && column.customSearch && typeof column.customSearch === 'function') {
                    return column.customSearch(row, input)
                } else {
                    const value = this.getValueByPath(row, key);
                    if (value == null) return false
                    if (Number.isInteger(value)) {
                        if (value !== Number(input)) return false
                    } else {
                        const re = new RegExp(helpers.escapeRegExpChars(input), 'i');
                        if (!re.test(value)) return false
                    }
                }
            }
            return true
        },

        /**
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey(index) {
            const key = this.detailKey;
            return !key.length || !index
                ? index
                : index[key]
        },

        checkPredefinedDetailedRows() {
            const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
            if (defaultExpandedRowsDefined && !this.detailKey.length) {
                throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"')
            }
        },

        /**
        * Call initSort only first time (For example async data).
        */
        checkSort() {
            if (this.newColumns.length && this.firstTimeSort) {
                this.initSort();
                this.firstTimeSort = false;
            } else if (this.newColumns.length) {
                if (Object.keys(this.currentSortColumn).length > 0) {
                    for (let i = 0; i < this.newColumns.length; i++) {
                        if (this.newColumns[i].field === this.currentSortColumn.field) {
                            this.currentSortColumn = this.newColumns[i];
                            break
                        }
                    }
                }
            }
        },

        /**
        * Check if footer slot has custom content.
        *
        * Assumes that `$slots.footer` is specified.
        */
        hasCustomFooterSlot() {
            const footer = this.$slots.footer();
            if (footer.length > 1) return true

            // if a template is specified to `footer`, `footer.length` is 1
            // but should contain multiple elements.
            if (helpers.isFragment(footer[0])) return true

            const tag = footer[0].tag;
            if (tag !== 'th' && tag !== 'td') return false

            return true
        },

        /**
        * Check if bottom-left slot exists.
        */
        hasBottomLeftSlot() {
            return typeof this.$slots['bottom-left'] !== 'undefined'
        },

        /**
        * Table arrow keys listener, change selection.
        */
        pressedArrow(pos) {
            if (!this.visibleData.length) return

            let index = this.visibleData.indexOf(this.selected) + pos;

            // Prevent from going up from first and down from last
            index = index < 0
                ? 0
                : index > this.visibleData.length - 1
                    ? this.visibleData.length - 1
                    : index;

            const row = this.visibleData[index];

            if (!this.isRowSelectable(row)) {
                let newIndex = null;
                if (pos > 0) {
                    for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
                    }
                } else {
                    for (let i = index; i >= 0 && newIndex === null; i--) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
                    }
                }
                if (newIndex >= 0) {
                    this.selectRow(this.visibleData[newIndex]);
                }
            } else {
                this.selectRow(row);
            }
        },

        /**
        * Focus table element if has selected prop.
        */
        focus() {
            if (!this.focusable) return

            this.$el.querySelector('table').focus();
        },

        /**
        * Initial sorted column based on the default-sort prop.
        */
        initSort() {
            if (this.sortMultiple && this.sortMultipleData) {
                this.sortMultipleData.forEach((column) => {
                    this.sortMultiColumn(column);
                });
            } else {
                if (!this.defaultSort) return

                let sortField = '';
                let sortDirection = this.defaultSortDirection;

                if (Array.isArray(this.defaultSort)) {
                    sortField = this.defaultSort[0];
                    if (this.defaultSort[1]) {
                        sortDirection = this.defaultSort[1];
                    }
                } else {
                    sortField = this.defaultSort;
                }

                const sortColumn = this.newColumns.filter(
                    (column) => (column.field === sortField))[0];
                if (sortColumn) {
                    this.isAsc = sortDirection.toLowerCase() !== 'desc';
                    this.sort(sortColumn, true);
                }
            }
        },
        /**
        * Emits drag start event (row)
        */
        handleDragStart(event, row, index) {
            if (!this.canDragRow) return
            this.isDraggingRow = true;
            this.$emit('dragstart', { event, row, index });
        },
        /**
        * Emits drag leave event (row)
        */
        handleDragEnd(event, row, index) {
            if (!this.canDragRow) return
            this.isDraggingRow = false;
            this.$emit('dragend', { event, row, index });
        },
        /**
        * Emits drop event (row)
        */
        handleDrop(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('drop', { event, row, index });
        },
        /**
        * Emits drag over event (row)
        */
        handleDragOver(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('dragover', { event, row, index });
        },
        /**
        * Emits drag leave event (row)
        */
        handleDragLeave(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('dragleave', { event, row, index });
        },

        emitEventForRow(eventName, event, row) {
            // eventName should not be in `emits` because it is never included
            // in `$attrs` if it is listed in `emits`.
            return this.$attrs[`on${eventName}`] ? this.$emit(eventName, row, event) : null
        },

        /**
        * Emits drag start event (column)
        */
        handleColumnDragStart(event, column, index) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = true;
            this.$emit('columndragstart', { event, column, index });
        },

        /**
        * Emits drag leave event (column)
        */
        handleColumnDragEnd(event, column, index) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = false;
            this.$emit('columndragend', { event, column, index });
        },

        /**
        * Emits drop event (column)
        */
        handleColumnDrop(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndrop', { event, column, index });
        },

        /**
        * Emits drag over event (column)
        */
        handleColumnDragOver(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndragover', { event, column, index });
        },

        /**
        * Emits drag leave event (column)
        */
        handleColumnDragLeave(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndragleave', { event, column, index });
        },

        _registerTableColumn(column) {
            if (column._isTableColumn) {
                this.defaultSlots.push(column);
            }
        },
        _unregisterTableColumn(column) {
            const index = this.defaultSlots.indexOf(column);
            if (index !== -1) {
                this.defaultSlots.splice(index, 1);
            }
        }
    },
    mounted() {
        this.checkPredefinedDetailedRows();
        this.checkSort();
    }
};

const _hoisted_1 = { class: "b-table" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  key: 0,
  width: "40px"
};
const _hoisted_4 = {
  key: 1,
  class: "is-relative"
};
const _hoisted_5 = {
  key: 0,
  class: "is-subheading"
};
const _hoisted_6 = {
  key: 0,
  width: "40px"
};
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { key: 2 };
const _hoisted_9 = { key: 1 };
const _hoisted_10 = {
  key: 0,
  width: "40px"
};
const _hoisted_11 = { key: 1 };
const _hoisted_12 = { class: "th-wrap" };
const _hoisted_13 = { key: 2 };
const _hoisted_14 = {
  key: 0,
  class: "chevron-cell"
};
const _hoisted_15 = {
  key: 0,
  class: "detail"
};
const _hoisted_16 = { class: "detail-container" };
const _hoisted_17 = {
  key: 0,
  class: "is-empty"
};
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "table-footer" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_table_mobile_sort = vue.resolveComponent("b-table-mobile-sort");
  const _component_b_table_pagination = vue.resolveComponent("b-table-pagination");
  const _component_b_checkbox = vue.resolveComponent("b-checkbox");
  const _component_b_slot_component = vue.resolveComponent("b-slot-component");
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_b_input = vue.resolveComponent("b-input");
  const _component_b_loading = vue.resolveComponent("b-loading");

  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default"),
    ($props.mobileCards && $options.hasSortablenewColumns)
      ? (vue.openBlock(), vue.createBlock(_component_b_table_mobile_sort, {
          key: 0,
          "current-sort-column": $data.currentSortColumn,
          "sort-multiple": $props.sortMultiple,
          "sort-multiple-data": $options.sortMultipleDataComputed,
          "is-asc": $data.isAsc,
          columns: $options.newColumns,
          placeholder: $props.mobileSortPlaceholder,
          "icon-pack": $props.iconPack,
          "sort-icon": $props.sortIcon,
          "sort-icon-size": $props.sortIconSize,
          onSort: _cache[1] || (_cache[1] = (column, event) => $options.sort(column, null, event)),
          onRemovePriority: _cache[2] || (_cache[2] = (column) => $options.removeSortingPriority(column))
        }, null, 8 /* PROPS */, ["current-sort-column", "sort-multiple", "sort-multiple-data", "is-asc", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size"]))
      : vue.createCommentVNode("v-if", true),
    ($props.paginated && ($props.paginationPosition === 'top' || $props.paginationPosition === 'both'))
      ? vue.renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
          vue.createVNode(_component_b_table_pagination, vue.mergeProps(_ctx.$attrs, {
            "per-page": $props.perPage,
            paginated: $props.paginated,
            rounded: $props.paginationRounded,
            "icon-pack": $props.iconPack,
            total: $data.newDataTotal,
            "current-page": $data.newCurrentPage,
            "onUpdate:current-page": _cache[3] || (_cache[3] = $event => ($data.newCurrentPage = $event)),
            "aria-next-label": $props.ariaNextLabel,
            "aria-previous-label": $props.ariaPreviousLabel,
            "aria-page-label": $props.ariaPageLabel,
            "aria-current-label": $props.ariaCurrentLabel,
            onPageChange: _cache[4] || (_cache[4] = (event) => _ctx.$emit('page-change', event))
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "top-left")
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
        ])
      : vue.createCommentVNode("v-if", true),
    vue.createVNode("div", {
      class: ["table-wrapper", $options.tableWrapperClasses],
      style: $options.tableStyle
    }, [
      vue.createVNode("table", {
        class: ["table", $options.tableClasses],
        tabindex: !$props.focusable ? false : 0,
        onKeydown: [
          _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers($event => ($options.pressedArrow(-1)), ["self","prevent"]), ["up"])),
          _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers($event => ($options.pressedArrow(1)), ["self","prevent"]), ["down"]))
        ]
      }, [
        ($options.newColumns.length && $props.showHeader)
          ? (vue.openBlock(), vue.createBlock("thead", _hoisted_2, [
              vue.createVNode("tr", null, [
                ($options.showDetailRowIcon)
                  ? (vue.openBlock(), vue.createBlock("th", _hoisted_3))
                  : vue.createCommentVNode("v-if", true),
                ($props.checkable && $props.checkboxPosition === 'left')
                  ? (vue.openBlock(), vue.createBlock("th", {
                      key: 1,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      ($props.headerCheckable)
                        ? (vue.openBlock(), vue.createBlock(_component_b_checkbox, {
                            key: 0,
                            "model-value": $options.isAllChecked,
                            disabled: $options.isAllUncheckable,
                            onChange: $options.checkAll
                          }, null, 8 /* PROPS */, ["model-value", "disabled", "onChange"]))
                        : vue.createCommentVNode("v-if", true)
                    ], 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true),
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, index) => {
                  return (vue.openBlock(), vue.createBlock("th", vue.mergeProps({
                    key: column.newKey + ':' + index + 'header'
                  }, column.thAttrs(column), {
                    class: [column.thClasses, {
                                'is-current-sort': !$props.sortMultiple && $data.currentSortColumn === column,
                            }],
                    style: column.thStyle,
                    onClick: vue.withModifiers($event => ($options.sort(column, null, $event)), ["stop"]),
                    draggable: $options.canDragColumn,
                    onDragstart: $event => ($options.handleColumnDragStart($event, column, index)),
                    onDragend: $event => ($options.handleColumnDragEnd($event, column, index)),
                    onDrop: $event => ($options.handleColumnDrop($event, column, index)),
                    onDragover: $event => ($options.handleColumnDragOver($event, column, index)),
                    onDragleave: $event => ($options.handleColumnDragLeave($event, column, index))
                  }), [
                    vue.createVNode("div", {
                      class: ["th-wrap", {
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                                }]
                    }, [
                      (column.$slots.header)
                        ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                            key: 0,
                            component: column,
                            scoped: "",
                            name: "header",
                            tag: "span",
                            props: { column, index }
                          }, null, 8 /* PROPS */, ["component", "props"]))
                        : (vue.openBlock(), vue.createBlock("span", _hoisted_4, [
                            vue.createTextVNode(vue.toDisplayString(column.label) + " ", 1 /* TEXT */),
                            ($props.sortMultiple &&
                                                $options.sortMultipleDataComputed &&
                                                $options.sortMultipleDataComputed.length > 0 &&
                                                $options.sortMultipleDataComputed.filter(i =>
                                                    i.field === column.field).length > 0)
                              ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                  vue.createVNode(_component_b_icon, {
                                    icon: $props.sortIcon,
                                    pack: $props.iconPack,
                                    both: "",
                                    size: $props.sortIconSize,
                                    class: {
                                                    'is-desc': $options.sortMultipleDataComputed
                                                        .filter(i => i.field === column.field)[0]
                                                        .order === 'desc'}
                                  }, null, 8 /* PROPS */, ["icon", "pack", "size", "class"]),
                                  vue.createTextVNode(" " + vue.toDisplayString($options.findIndexOfSortData(column)) + " ", 1 /* TEXT */),
                                  vue.createVNode("button", {
                                    class: "delete is-small multi-sort-cancel-icon",
                                    type: "button",
                                    onClick: vue.withModifiers($event => ($options.removeSortingPriority(column)), ["stop"])
                                  }, null, 8 /* PROPS */, ["onClick"])
                                ], 64 /* STABLE_FRAGMENT */))
                              : (vue.openBlock(), vue.createBlock(_component_b_icon, {
                                  key: 1,
                                  icon: $props.sortIcon,
                                  pack: $props.iconPack,
                                  both: "",
                                  size: $props.sortIconSize,
                                  class: ["sort-icon", {
                                                'is-desc': !$data.isAsc,
                                                'is-invisible': $data.currentSortColumn !== column
                                            }]
                                }, null, 8 /* PROPS */, ["icon", "pack", "size", "class"]))
                          ]))
                    ], 2 /* CLASS */)
                  ], 16 /* FULL_PROPS */, ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"]))
                }), 128 /* KEYED_FRAGMENT */)),
                ($props.checkable && $props.checkboxPosition === 'right')
                  ? (vue.openBlock(), vue.createBlock("th", {
                      key: 2,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      ($props.headerCheckable)
                        ? (vue.openBlock(), vue.createBlock(_component_b_checkbox, {
                            key: 0,
                            "model-value": $options.isAllChecked,
                            disabled: $options.isAllUncheckable,
                            onChange: $options.checkAll
                          }, null, 8 /* PROPS */, ["model-value", "disabled", "onChange"]))
                        : vue.createCommentVNode("v-if", true)
                    ], 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true)
              ]),
              ($options.hasCustomSubheadings)
                ? (vue.openBlock(), vue.createBlock("tr", _hoisted_5, [
                    ($options.showDetailRowIcon)
                      ? (vue.openBlock(), vue.createBlock("th", _hoisted_6))
                      : vue.createCommentVNode("v-if", true),
                    ($props.checkable && $props.checkboxPosition === 'left')
                      ? (vue.openBlock(), vue.createBlock("th", _hoisted_7))
                      : vue.createCommentVNode("v-if", true),
                    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, index) => {
                      return (vue.openBlock(), vue.createBlock("th", {
                        key: column.newKey + ':' + index + 'subheading',
                        style: column.style
                      }, [
                        vue.createVNode("div", {
                          class: ["th-wrap", {
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                                }]
                        }, [
                          (column.$slots.subheading)
                            ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                key: 0,
                                component: column,
                                scoped: "",
                                name: "subheading",
                                tag: "span",
                                props: { column, index }
                              }, null, 8 /* PROPS */, ["component", "props"]))
                            : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                                vue.createTextVNode(vue.toDisplayString(column.subheading), 1 /* TEXT */)
                              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                        ], 2 /* CLASS */)
                      ], 4 /* STYLE */))
                    }), 128 /* KEYED_FRAGMENT */)),
                    ($props.checkable && $props.checkboxPosition === 'right')
                      ? (vue.openBlock(), vue.createBlock("th", _hoisted_8))
                      : vue.createCommentVNode("v-if", true)
                  ]))
                : vue.createCommentVNode("v-if", true),
              ($options.hasSearchablenewColumns)
                ? (vue.openBlock(), vue.createBlock("tr", _hoisted_9, [
                    ($options.showDetailRowIcon)
                      ? (vue.openBlock(), vue.createBlock("th", _hoisted_10))
                      : vue.createCommentVNode("v-if", true),
                    ($props.checkable && $props.checkboxPosition === 'left')
                      ? (vue.openBlock(), vue.createBlock("th", _hoisted_11))
                      : vue.createCommentVNode("v-if", true),
                    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, index) => {
                      return (vue.openBlock(), vue.createBlock("th", vue.mergeProps({
                        key: column.newKey + ':' + index + 'searchable'
                      }, column.thAttrs(column), {
                        style: column.thStyle,
                        class: {'is-sticky': column.sticky}
                      }), [
                        vue.createVNode("div", _hoisted_12, [
                          (column.searchable)
                            ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                                (column.$slots.searchable)
                                  ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                      key: 0,
                                      component: column,
                                      scoped: true,
                                      name: "searchable",
                                      tag: "span",
                                      props: { column, filters: $data.filters }
                                    }, null, 8 /* PROPS */, ["component", "props"]))
                                  : (vue.openBlock(), vue.createBlock(_component_b_input, {
                                      key: 1,
                                      [vue.toHandlerKey($props.filtersEvent)]: $options.onFiltersEvent,
                                      modelValue: $data.filters[column.field],
                                      "onUpdate:modelValue": $event => ($data.filters[column.field] = $event),
                                      type: column.numeric ? 'number' : 'text'
                                    }, null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue", "type"]))
                              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                            : vue.createCommentVNode("v-if", true)
                        ])
                      ], 16 /* FULL_PROPS */))
                    }), 128 /* KEYED_FRAGMENT */)),
                    ($props.checkable && $props.checkboxPosition === 'right')
                      ? (vue.openBlock(), vue.createBlock("th", _hoisted_13))
                      : vue.createCommentVNode("v-if", true)
                  ]))
                : vue.createCommentVNode("v-if", true)
            ]))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode("tbody", null, [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleData, (row, index) => {
            return (vue.openBlock(), vue.createBlock(vue.Fragment, {
              key: $props.customRowKey ? row[$props.customRowKey] : index
            }, [
              vue.createVNode("tr", {
                class: [$props.rowClass(row, index), {
                                'is-selected': $options.isRowSelected(row, $props.selected),
                                'is-checked': $options.isRowChecked(row),
                            }],
                onClick: $event => ($options.selectRow(row)),
                onDblclick: $event => (_ctx.$emit('dblclick', row)),
                onMouseenter: $event => ($options.emitEventForRow('mouseenter', $event, row)),
                onMouseleave: $event => ($options.emitEventForRow('mouseleave', $event, row)),
                onContextmenu: $event => (_ctx.$emit('contextmenu', row, $event)),
                draggable: $options.canDragRow,
                onDragstart: $event => ($options.handleDragStart($event, row, index)),
                onDragend: $event => ($options.handleDragEnd($event, row, index)),
                onDrop: $event => ($options.handleDrop($event, row, index)),
                onDragover: $event => ($options.handleDragOver($event, row, index)),
                onDragleave: $event => ($options.handleDragLeave($event, row, index))
              }, [
                ($options.showDetailRowIcon)
                  ? (vue.openBlock(), vue.createBlock("td", _hoisted_14, [
                      ($props.hasDetailedVisible(row))
                        ? (vue.openBlock(), vue.createBlock("a", {
                            key: 0,
                            role: "button",
                            onClick: vue.withModifiers($event => ($options.toggleDetails(row)), ["stop"])
                          }, [
                            vue.createVNode(_component_b_icon, {
                              icon: "chevron-right",
                              pack: $props.iconPack,
                              both: "",
                              class: {'is-expanded': $options.isVisibleDetailRow(row)}
                            }, null, 8 /* PROPS */, ["pack", "class"])
                          ], 8 /* PROPS */, ["onClick"]))
                        : vue.createCommentVNode("v-if", true)
                    ]))
                  : vue.createCommentVNode("v-if", true),
                ($props.checkable && $props.checkboxPosition === 'left')
                  ? (vue.openBlock(), vue.createBlock("td", {
                      key: 1,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      vue.createVNode(_component_b_checkbox, {
                        disabled: !$props.isRowCheckable(row),
                        "model-value": $options.isRowChecked(row),
                        onClick: vue.withModifiers($event => ($options.checkRow(row, index, $event)), ["prevent","stop"])
                      }, null, 8 /* PROPS */, ["disabled", "model-value", "onClick"])
                    ], 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true),
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleColumns, (column, colindex) => {
                  return (vue.openBlock(), vue.createBlock(vue.Fragment, {
                    key: column.newKey + ':' + index + ':' + colindex
                  }, [
                    (column.$slots.default)
                      ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, vue.mergeProps({
                          key: 0,
                          component: column
                        }, column.tdAttrs(row, column), {
                          scoped: "",
                          name: "default",
                          tag: "td",
                          class: column.getRootClasses(row),
                          style: column.getRootStyle(row),
                          "data-label": column.label,
                          props: { row, column, index, colindex, toggleDetails: $options.toggleDetails },
                          onClick: $event => (_ctx.$emit('cellclick',row,column,index,colindex))
                        }), null, 16 /* FULL_PROPS */, ["component", "class", "style", "data-label", "props", "onClick"]))
                      : vue.createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */)),
                ($props.checkable && $props.checkboxPosition === 'right')
                  ? (vue.openBlock(), vue.createBlock("td", {
                      key: 2,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      vue.createVNode(_component_b_checkbox, {
                        disabled: !$props.isRowCheckable(row),
                        "model-value": $options.isRowChecked(row),
                        onClick: vue.withModifiers($event => ($options.checkRow(row, index, $event)), ["prevent","stop"])
                      }, null, 8 /* PROPS */, ["disabled", "model-value", "onClick"])
                    ], 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true)
              ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"]),
              vue.createVNode(vue.Transition, { name: $props.detailTransition }, {
                default: vue.withCtx(() => [
                  ($options.isActiveDetailRow(row))
                    ? (vue.openBlock(), vue.createBlock("tr", _hoisted_15, [
                        vue.createVNode("td", { colspan: $options.columnCount }, [
                          vue.createVNode("div", _hoisted_16, [
                            vue.renderSlot(_ctx.$slots, "detail", {
                              row: row,
                              index: index
                            })
                          ])
                        ], 8 /* PROPS */, ["colspan"])
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name"]),
              ($options.isActiveCustomDetailRow(row))
                ? vue.renderSlot(_ctx.$slots, "detail", {
                    key: 0,
                    row: row,
                    index: index
                  })
                : vue.createCommentVNode("v-if", true)
            ], 64 /* STABLE_FRAGMENT */))
          }), 128 /* KEYED_FRAGMENT */)),
          (!$options.visibleData.length)
            ? (vue.openBlock(), vue.createBlock("tr", _hoisted_17, [
                vue.createVNode("td", { colspan: $options.columnCount }, [
                  vue.renderSlot(_ctx.$slots, "empty")
                ], 8 /* PROPS */, ["colspan"])
              ]))
            : vue.createCommentVNode("v-if", true)
        ]),
        (_ctx.$slots.footer !== undefined)
          ? (vue.openBlock(), vue.createBlock("tfoot", _hoisted_18, [
              vue.createVNode("tr", _hoisted_19, [
                ($options.hasCustomFooterSlot())
                  ? vue.renderSlot(_ctx.$slots, "footer", { key: 0 })
                  : (vue.openBlock(), vue.createBlock("th", {
                      key: 1,
                      colspan: $options.columnCount
                    }, [
                      vue.renderSlot(_ctx.$slots, "footer")
                    ], 8 /* PROPS */, ["colspan"]))
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
      ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["tabindex"]),
      ($props.loading)
        ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            vue.createVNode(_component_b_loading, {
              "is-full-page": false,
              active: $props.loading
            }, null, 8 /* PROPS */, ["active"])
          ])
        : vue.createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    (($props.checkable && $options.hasBottomLeftSlot()) ||
                ($props.paginated && ($props.paginationPosition === 'bottom' || $props.paginationPosition === 'both')))
      ? vue.renderSlot(_ctx.$slots, "pagination", { key: 2 }, () => [
          vue.createVNode(_component_b_table_pagination, vue.mergeProps(_ctx.$attrs, {
            "per-page": $props.perPage,
            paginated: $props.paginated,
            rounded: $props.paginationRounded,
            "icon-pack": $props.iconPack,
            total: $data.newDataTotal,
            "current-page": $data.newCurrentPage,
            "onUpdate:current-page": _cache[7] || (_cache[7] = $event => ($data.newCurrentPage = $event)),
            "aria-next-label": $props.ariaNextLabel,
            "aria-previous-label": $props.ariaPreviousLabel,
            "aria-page-label": $props.ariaPageLabel,
            "aria-current-label": $props.ariaCurrentLabel,
            onPageChange: _cache[8] || (_cache[8] = (event) => _ctx.$emit('page-change', event))
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "bottom-left")
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
        ])
      : vue.createCommentVNode("v-if", true)
  ]))
}

script.render = render;
script.__file = "src/components/table/Table.vue";

var Plugin = {
  install: function install(Vue) {

    plugins.registerComponent(Vue, script);
    plugins.registerComponent(Vue, script$2);
  }
};
plugins.use(Plugin);

exports.BTable = script;
exports.BTableColumn = script$2;
exports["default"] = Plugin;
