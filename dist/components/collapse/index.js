/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Collapse = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var script = {
        name: 'BCollapse',
        props: {
            modelValue: {
                type: Boolean,
                default: true
            },
            animation: {
                type: String,
                default: 'fade'
            },
            ariaId: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'is-top',
                validator(value) {
                    return [
                        'is-top',
                        'is-bottom'
                    ].indexOf(value) > -1
                }
            }
        },
        emits: ['close', 'open', 'update:modelValue'],
        data() {
            return {
                isOpen: this.modelValue
            }
        },
        watch: {
            modelValue(value) {
                this.isOpen = value;
            }
        },
        methods: {
            /**
            * Toggle and emit events
            */
            toggle() {
                this.isOpen = !this.isOpen;
                this.$emit('update:modelValue', this.isOpen);
                this.$emit(this.isOpen ? 'open' : 'close');
            }
        },
        render() {
            const trigger = vue.h(
                'div',
                {
                    class: 'collapse-trigger',
                    onClick: this.toggle
                },
                {
                    default: () => {
                        return this.$slots.trigger
                            ? this.$slots.trigger({ open: this.isOpen })
                            : undefined
                    }
                }
            );
            const content = vue.withDirectives(
                vue.h(
                    vue.Transition,
                    { name: this.animation },
                    {
                        default: () => {
                        return vue.h(
                            'div',
                            {
                                class: 'collapse-content',
                                id: this.ariaId,
                                'aria-expanded': this.isOpen
                            },
                            this.$slots
                        )
                       }
                    }
                ),
                [[vue.vShow, this.isOpen]]
            );
            return vue.h(
                'div',
                { class: 'collapse' },
                {
                    default: () => {
                        return this.position === 'is-top'
                            ? [trigger, content]
                            : [content, trigger]
                    }
                }
            )
        }
    };

    script.__file = "src/components/collapse/Collapse.vue";

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

    exports.BCollapse = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
