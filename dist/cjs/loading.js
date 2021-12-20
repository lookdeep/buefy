'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var Loading = require('./Loading-d96bd0d7.js');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');
require('./ssr-95fd856b.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { helpers._defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = helpers.merge(defaultParam, params);
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
          var loading = helpers.getComponentFromVNode(this.loadingVNode);

          if (loading) {
            loading.close();
          }
        }
      },
      render: function render() {
        this.loadingVNode = vue.h(Loading.script, _objectSpread(_objectSpread({}, propsData), {}, {
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
    plugins.registerComponent(Vue, Loading.script);
    plugins.registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
plugins.use(Plugin);

exports.BLoading = Loading.script;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports["default"] = Plugin;
