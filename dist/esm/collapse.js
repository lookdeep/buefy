import { h, withDirectives, Transition, vShow } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';

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
        const trigger = h(
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
        const content = withDirectives(
            h(
                Transition,
                { name: this.animation },
                {
                    default: () => {
                    return h(
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
            [[vShow, this.isOpen]]
        );
        return h(
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
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BCollapse, Plugin as default };
