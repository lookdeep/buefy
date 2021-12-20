/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Loading = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  /**
   * Merge function to replace Object.assign with deep merging possibility
   */

  var isObject = function isObject(item) {
    return _typeof(item) === 'object' && !Array.isArray(item);
  };

  var mergeFn = function mergeFn(target, source) {
    var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (deep || !Object.assign) {
      var isDeep = function isDeep(prop) {
        return isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);
      };

      var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
        return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
      }).reduce(function (a, b) {
        return _objectSpread$1(_objectSpread$1({}, a), b);
      }, {});
      return _objectSpread$1(_objectSpread$1({}, target), replaced);
    } else {
      return Object.assign(target, source);
    }
  };

  var merge = mergeFn;
  function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
      el.remove();
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }

  function getComponentFromVNode(vnode) {
    if (!vnode) {
      return undefined;
    }

    var component = vnode.component;

    if (!component) {
      return undefined;
    }

    return component.expose ? component.expose : component.proxy;
  }

  // Polyfills for SSR
  var isSSR = typeof window === 'undefined';
  var HTMLElement = isSSR ? Object : window.HTMLElement;

  var script = {
      name: 'BLoading',
      props: {
          modelValue: Boolean,
          programmatic: Boolean,
          container: [Object, Function, HTMLElement],
          isFullPage: {
              type: Boolean,
              default: true
          },
          animation: {
              type: String,
              default: 'fade'
          },
          canCancel: {
              type: Boolean,
              default: false
          },
          onCancel: {
              type: Function,
              default: () => {}
          }
      },
      emits: ['close', 'update:is-full-page', 'update:modelValue'],
      data() {
          return {
              isActive: this.modelValue || false,
              displayInFullPage: this.isFullPage
          }
      },
      watch: {
          modelValue(value) {
              this.isActive = value;
          },
          isFullPage(value) {
              this.displayInFullPage = value;
          }
      },
      methods: {
          /**
          * Close the Modal if canCancel.
          */
          cancel() {
              if (!this.canCancel || !this.isActive) return

              this.close();
          },
          /**
          * Emit events, and destroy modal if it's programmatic.
          */
          close() {
              this.onCancel.apply(null, arguments);
              this.$emit('close');
              this.$emit('update:modelValue', false);

              // Timeout for the animation complete before destroying
              if (this.programmatic) {
                  this.isActive = false;
                  // TODO: should the following happen outside this component;
                  // i.e., in index.js?
                  setTimeout(() => {
                      removeElement(this.$el);
                  }, 150);
              }
          },
          /**
          * Keypress event that is bound to the document.
          */
          keyPress({ key }) {
              if (key === 'Escape' || key === 'Esc') this.cancel();
          }
      },
      created() {
          if (typeof window !== 'undefined') {
              document.addEventListener('keyup', this.keyPress);
          }
      },
      mounted() {
          // Insert the Loading component in body tag
          // only if it's programmatic
          // (moved from beforeMount because $el is not bound during beforeMount)
          // TODO: should this happen outside this component; i.e., in index.js?
          if (this.programmatic) {
              if (!this.container) {
                  document.body.appendChild(this.$el);
              } else {
                  this.displayInFullPage = false;
                  this.$emit('update:is-full-page', false);
                  this.container.appendChild(this.$el);
              }
              this.isActive = true;
          }
      },
      beforeUnmount() {
          if (typeof window !== 'undefined') {
              document.removeEventListener('keyup', this.keyPress);
          }
      }
  };

  const _hoisted_1 = /*#__PURE__*/vue.createVNode("div", { class: "loading-icon" }, null, -1 /* HOISTED */);

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.Transition, { name: $props.animation }, {
      default: vue.withCtx(() => [
        ($data.isActive)
          ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: ["loading-overlay is-active", { 'is-full-page': $data.displayInFullPage }]
            }, [
              vue.createVNode("div", {
                class: "loading-background",
                onClick: _cache[1] || (_cache[1] = (...args) => ($options.cancel && $options.cancel(...args)))
              }),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                _hoisted_1
              ])
            ], 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"]))
  }

  script.render = render;
  script.__file = "src/components/loading/Loading.vue";

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };
  var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
    if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
    Vue.config.globalProperties.$buefy[property] = component;
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var LoadingProgrammatic = {
    open: function open(params) {
      var defaultParam = {
        programmatic: true
      };
      var propsData = merge(defaultParam, params);
      var container = document.createElement('div');
      var vueInstance = vue.createApp({
        data: function data() {
          return {
            loadingVNode: null
          };
        },
        methods: {
          close: function close() {
            // TODO: too much dependence on Vue's internal structure?
            var loading = getComponentFromVNode(this.loadingVNode);

            if (loading) {
              loading.close();
            }
          }
        },
        render: function render() {
          this.loadingVNode = vue.h(script, _objectSpread(_objectSpread({}, propsData), {}, {
            onClose: function onClose() {
              if (propsData.onClose) {
                propsData.onClose.apply(propsData, arguments);
              } // timeout for the animation complete before destroying


              setTimeout(function () {
                vueInstance.unmount();
              }, 150);
            }
          }));
          return this.loadingVNode;
        }
      });
      return vueInstance.mount(container);
    }
  };
  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, script);
      registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
    }
  };
  use(Plugin);

  exports.BLoading = script;
  exports.LoadingProgrammatic = LoadingProgrammatic;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
