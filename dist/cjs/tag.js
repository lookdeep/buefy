'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Tag = require('./Tag-b341e01a.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');

var script = {
    name: 'BTaglist',
    props: {
        attached: Boolean
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", {
    class: ["tags", { 'has-addons': $props.attached }]
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/tag/Taglist.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Tag.script);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BTag = Tag.script;
exports.BTaglist = script;
exports["default"] = Plugin;
