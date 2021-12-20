'use strict';

var helpers = require('./helpers-0d6e2444.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { helpers._defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var items = 1;
var sorted$1 = 3;
var Sorted$1 = sorted$1;
var ProviderParentMixin = (function (itemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    provide: function provide() {
      return helpers._defineProperty({}, 'b' + itemName, this);
    }
  };

  if (helpers.hasFlag(flags, items)) {
    mixin.data = function () {
      return _objectSpread({
        childItems: []
      }, helpers.hasFlag(flags, sorted$1) ? {
        nextIndex: 0
      } : {});
    };

    mixin.methods = {
      _registerItem: function _registerItem(item) {
        if (helpers.hasFlag(flags, sorted$1)) {
          // assigns a dynamic index.
          // dynamic indices will be messed up if any child is
          // unmounted.
          // use the new `order` prop to maintain the ordering.
          item.dynamicIndex = this.nextIndex;
          ++this.nextIndex;
        }

        this.childItems.push(item);
      },
      _unregisterItem: function _unregisterItem(item) {
        this.childItems = this.childItems.filter(function (i) {
          return i.value !== item.value;
        });
      }
    };

    if (helpers.hasFlag(flags, sorted$1)) {
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems: function sortedItems() {
          return this.childItems.slice().sort(function (i1, i2) {
            return i1.index - i2.index;
          });
        }
      };
    }
  }

  return mixin;
});

var sorted = 1;
var optional = 2;
var Sorted = sorted;
var InjectedChildMixin = (function (parentItemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    inject: {
      parent: {
        from: 'b' + parentItemName,
        default: false
      }
    },
    created: function created() {
      if (!this.parent) {
        if (!helpers.hasFlag(flags, optional)) {
          this.$destroy();
          throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeUnmount: function beforeUnmount() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };

  if (helpers.hasFlag(flags, sorted)) {
    // a user can explicitly specify the `order` prop to keep the order of
    // children.
    // I can no longer rely on automatic indexing of children, because I
    // could not figure out how to calculate the index of a child in its
    // parent on Vue 3.
    // incomplete dynamic indexing is still available if any child is never
    // unmounted; e.g., not switched with `v-if`
    mixin.props = {
      order: {
        type: Number,
        required: false
      }
    };

    mixin.data = function () {
      return {
        dynamicIndex: null
      };
    };

    mixin.computed = {
      index: function index() {
        return this.order != null ? this.order : this.dynamicIndex;
      }
    };
  }

  return mixin;
});

exports.InjectedChildMixin = InjectedChildMixin;
exports.ProviderParentMixin = ProviderParentMixin;
exports.Sorted = Sorted$1;
exports.Sorted$1 = Sorted;
