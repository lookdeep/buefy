import { s as script$1 } from './Tag-89b086b9.js';
export { s as BTag } from './Tag-89b086b9.js';
import { openBlock, createBlock, renderSlot } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';

var script = {
    name: 'BTaglist',
    props: {
        attached: Boolean
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["tags", { 'has-addons': $props.attached }]
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/tag/Taglist.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script$1);
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BTaglist, Plugin as default };
