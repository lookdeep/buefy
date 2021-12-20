/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Skeleton = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var script = {
        name: 'BSkeleton',
        functional: true,
        props: {
            active: {
                type: Boolean,
                default: true
            },
            animated: {
                type: Boolean,
                default: true
            },
            width: [Number, String],
            height: [Number, String],
            circle: Boolean,
            rounded: {
                type: Boolean,
                default: true
            },
            count: {
                type: Number,
                default: 1
            },
            position: {
                type: String,
                default: '',
                validator(value) {
                    return [
                        '',
                        'is-centered',
                        'is-right'
                    ].indexOf(value) > -1
                }
            },
            size: String
        },
        render(props) {
            if (!props.active) return
            const items = [];
            const width = props.width;
            const height = props.height;
            for (let i = 0; i < props.count; i++) {
                items.push(vue.h('div', {
                    class: [
                        'b-skeleton-item',
                        { 'is-rounded': props.rounded }
                    ],
                    key: i,
                    style: {
                        height: height === undefined
                            ? null
                            : (isNaN(height) ? height : height + 'px'),
                        width: width === undefined
                            ? null
                            : (isNaN(width) ? width : width + 'px'),
                        borderRadius: props.circle ? '50%' : null
                    }
                }));
            }
            return vue.h(
                'div',
                {
                    class: [
                        'b-skeleton',
                        props.size,
                        props.position,
                        { 'is-animated': props.animated }
                    ]
                },
                items
            )
        }
    };

    script.__file = "src/components/skeleton/Skeleton.vue";

    var use = function use(plugin) {
      if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
      }
    };
    var registerComponent = function registerComponent(Vue, component) {
      Vue.component(component.name, component);
    };

    var Plugin = {
      install: function install(Vue) {
        registerComponent(Vue, script);
      }
    };
    use(Plugin);

    exports.BSkeleton = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
