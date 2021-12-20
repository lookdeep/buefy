'use strict';

var helpers = require('./helpers-0d6e2444.js');
var Icon = require('./Icon-dc7b693f.js');
var SlotComponent = require('./SlotComponent-f2e4fdc4.js');
var InjectedChildMixin = require('./InjectedChildMixin-d2127742.js');
var vue = require('vue');

var TabbedMixin = (function (cmp) {
  var _components;

  return {
    mixins: [InjectedChildMixin.ProviderParentMixin(cmp, InjectedChildMixin.Sorted)],
    components: (_components = {}, helpers._defineProperty(_components, Icon.script.name, Icon.script), helpers._defineProperty(_components, SlotComponent.SlotComponent.name, SlotComponent.SlotComponent), _components),
    props: {
      modelValue: {
        type: [String, Number],
        default: undefined
      },
      size: String,
      animated: {
        type: Boolean,
        default: true
      },
      animation: String,
      animateInitially: Boolean,
      vertical: {
        type: Boolean,
        default: false
      },
      position: String,
      destroyOnHide: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],
    data: function data() {
      return {
        activeId: this.modelValue,
        // Internal state
        defaultSlots: [],
        contentHeight: 0,
        isTransitioning: false
      };
    },
    mounted: function mounted() {
      if (typeof this.modelValue === 'number') {
        // Backward compatibility: converts the index value to an id
        var value = helpers.bound(this.modelValue, 0, this.items.length - 1);
        this.activeId = this.items[value].value;
      } else {
        this.activeId = this.modelValue;
      }
    },
    computed: {
      activeItem: function activeItem() {
        var _this = this;

        return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
          return i.value === _this.activeId;
        });
      },
      items: function items() {
        return this.sortedItems;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active tab.
       */
      modelValue: function modelValue(value) {
        if (typeof value === 'number') {
          // Backward compatibility: converts the index value to an id
          value = helpers.bound(value, 0, this.items.length - 1);
          this.activeId = this.items[value].value;
        } else {
          this.activeId = value;
        }
      },

      /**
       * Sync internal state with external state
       */
      activeId: function activeId(val, oldValue) {
        var oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.find(function (i) {
          return i.value === oldValue;
        }) : null;

        if (oldTab && this.activeItem) {
          oldTab.deactivate(this.activeItem.index);
          this.activeItem.activate(oldTab.index);
        }

        val = this.activeItem ? typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

        if (val !== this.modelValue) {
          this.$emit('update:modelValue', val);
        }
      }
    },
    methods: {
      /**
      * Child click listener, emit input event and change active child.
      */
      childClick: function childClick(child) {
        this.activeId = child.value;
      },
      getNextItemIdx: function getNextItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var nextItemIdx = null;

        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];

          if (fromIdx < item.index && item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            nextItemIdx = item.index;
            break;
          }
        }

        return nextItemIdx;
      },
      getPrevItemIdx: function getPrevItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var prevItemIdx = null;

        for (var i = this.items.length - 1; i >= 0; i--) {
          var item = this.items[i];

          if (item.index < fromIdx && item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            prevItemIdx = item.index;
            break;
          }
        }

        return prevItemIdx;
      }
    }
  };
});

function makeUniqueId() {
  var values = new Uint8Array(12);
  window.crypto.getRandomValues(values);
  return Array.prototype.map.call(values, function (v) {
    return v.toString(16);
  }).join('');
}

var TabbedChildMixin = (function (parentCmp) {
  return {
    mixins: [InjectedChildMixin.InjectedChildMixin(parentCmp, InjectedChildMixin.Sorted$1)],
    props: {
      label: String,
      icon: String,
      iconPack: String,
      visible: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: function _default() {
          return makeUniqueId();
        }
      },
      headerClass: {
        type: [String, Array, Object],
        default: null
      }
    },
    data: function data() {
      return {
        transitionName: null,
        elementClass: 'item',
        elementRole: null
      };
    },
    computed: {
      isActive: function isActive() {
        return this.parent.activeItem === this;
      }
    },
    methods: {
      /**
       * Activate element, alter animation name based on the index.
       */
      activate: function activate(oldIndex) {
        this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
      },

      /**
       * Deactivate element, alter animation name based on the index.
       */
      deactivate: function deactivate(newIndex) {
        this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
      }
    },
    render: function render() {
      var _this = this;

      // if destroy apply v-if
      if (this.parent.destroyOnHide) {
        if (!this.isActive || !this.visible) {
          return;
        }
      }

      var vnode = vue.withDirectives(vue.h('div', {
        class: this.elementClass,
        role: this.elementRole,
        id: "".concat(this.value, "-content"),
        'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
        tabindex: this.isActive ? 0 : -1
      }, this.$slots), [[vue.vShow, this.isActive && this.visible]]); // check animated prop

      if (this.parent.animated) {
        return vue.h(vue.Transition, {
          name: this.parent.animation || this.transitionName,
          appear: this.parent.animateInitially === true || undefined,
          onBeforeEnter: function onBeforeEnter() {
            _this.parent.isTransitioning = true;
          },
          onAfterEnter: function onAfterEnter() {
            _this.parent.isTransitioning = false;
          }
        }, {
          default: function _default() {
            return vnode;
          }
        });
      }

      return vnode;
    }
  };
});

exports.TabbedChildMixin = TabbedChildMixin;
exports.TabbedMixin = TabbedMixin;
