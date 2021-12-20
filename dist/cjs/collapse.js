'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var plugins = require('./plugins-82c06644.js');

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

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BCollapse = script;
exports["default"] = Plugin;
