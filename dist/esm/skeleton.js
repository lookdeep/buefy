import { h } from 'vue';
import { u as use, a as registerComponent } from './plugins-9a909142.js';

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
            items.push(h('div', {
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
        return h(
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

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);

export { script as BSkeleton, Plugin as default };
