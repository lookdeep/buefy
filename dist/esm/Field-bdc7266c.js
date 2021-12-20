import { c as config } from './config-1ce4c54c.js';
import { w as isTag } from './helpers-2263d431.js';
import { Fragment, h, Comment, resolveComponent, openBlock, createBlock, renderSlot, createTextVNode, toDisplayString, createCommentVNode, withCtx, createVNode, renderList } from 'vue';

var script$1 = {
    name: 'BFieldBody',
    props: {
        message: {
            type: [String, Array]
        },
        type: {
            type: [String, Object]
        }
    },
    render() {
        let first = true;
        // wraps the default slot (children) with `b-field`.
        // children may be given in a fragment and should be extracted.
        let children = this.$slots.default();
        if (children.length === 1 && children[0].type === Fragment) {
            children = children[0].children;
        }
        return h(
            'div',
            { class: 'field-body' },
            {
                default: () => {
                    return children.map((element) => {
                        // skip returns(?) and comments
                        if (element.type === Comment) {
                            return element
                        }
                        let message;
                        if (first) {
                            message = this.message;
                            first = false;
                        }
                        return h(
                            resolveComponent('b-field'),
                            {
                                type: this.type,
                                message
                            },
                            [element]
                        )
                    })
                }
            }
        )
    }
};

script$1.__file = "src/components/field/FieldBody.vue";

var script = {
    name: 'BField',
    components: {
        [script$1.name]: script$1
    },
    provide() {
        return {
            BField: this
        }
    },
    inject: {
        parent: {
            from: 'BField',
            default: false
        }
    }, // Used internally only when using Field in Field
    props: {
        type: [String, Object],
        label: String,
        labelFor: String,
        message: [String, Array, Object],
        grouped: Boolean,
        groupMultiline: Boolean,
        position: String,
        expanded: Boolean,
        horizontal: Boolean,
        addons: {
            type: Boolean,
            default: true
        },
        customClass: String,
        labelPosition: {
            type: String,
            default: () => { return config.defaultFieldLabelPosition }
        }
    },
    data() {
        return {
            newType: this.type,
            newMessage: this.message,
            fieldLabelSize: null,
            numberInputClasses: [],
            _isField: true // Used internally by Input and Select
        }
    },
    computed: {
        rootClasses() {
            return [{
                'is-expanded': this.expanded,
                'is-horizontal': this.horizontal,
                'is-floating-in-label': this.hasLabel && !this.horizontal &&
                    this.labelPosition === 'inside',
                'is-floating-label': this.hasLabel && !this.horizontal &&
                    this.labelPosition === 'on-border'
            },
            this.numberInputClasses]
        },
        innerFieldClasses() {
            return [
                this.fieldType(),
                this.newPosition,
                {
                    'is-grouped-multiline': this.groupMultiline
                }
            ]
        },
        hasInnerField() {
            return this.grouped || this.groupMultiline || this.hasAddons()
        },
        /**
        * Correct Bulma class for the side of the addon or group.
        *
        * This is not kept like the others (is-small, etc.),
        * because since 'has-addons' is set automatically it
        * doesn't make sense to teach users what addons are exactly.
        */
        newPosition() {
            if (this.position === undefined) return

            const position = this.position.split('-');
            if (position.length < 1) return

            const prefix = this.grouped
                ? 'is-grouped-'
                : 'has-addons-';

            if (this.position) return prefix + position[1]
            return undefined
        },
        /**
        * Formatted message in case it's an array
        * (each element is separated by <br> tag)
        */
        formattedMessage() {
            if (this.parent && this.parent.hasInnerField) {
                return '' // Message will be displayed in parent field
            }
            if (typeof this.newMessage === 'string') {
                return [this.newMessage]
            }
            const messages = [];
            if (Array.isArray(this.newMessage)) {
                this.newMessage.forEach((message) => {
                    if (typeof message === 'string') {
                        messages.push(message);
                    } else {
                        for (const key in message) {
                            if (message[key]) {
                                messages.push(key);
                            }
                        }
                    }
                });
            } else {
                for (const key in this.newMessage) {
                    if (this.newMessage[key]) {
                        messages.push(key);
                    }
                }
            }
            return messages.filter((m) => !!m)
        },
        hasLabel() {
            return this.label || this.$slots.label
        },
        hasMessage() {
            return ((!this.parent || !this.parent.hasInnerField) && this.newMessage) ||
                this.$slots.message
        }
    },
    watch: {
        /**
        * Set internal type when prop change.
        */
        type(value) {
            this.newType = value;
        },

        /**
        * Set internal message when prop change.
        */
        message(value) {
            this.newMessage = value;
        },

        /**
        * Set parent message if we use Field in Field.
        */
        newMessage(value) {
            if (this.parent && this.parent.hasInnerField) {
                if (!this.parent.type) {
                    this.parent.newType = this.newType;
                }
                this.parent.newMessage = value;
            }
        }
    },
    methods: {
        /**
        * Field has addons if there are more than one slot
        * (element / component) in the Field.
        * Or is grouped when prop is set.
        * Is a method to be called when component re-render.
        */
        fieldType() {
            if (this.grouped) return 'is-grouped'
            if (this.hasAddons()) return 'has-addons'
        },
        hasAddons() {
            let renderedNode = 0;
            if (this.$slots.default) {
                renderedNode = this.$slots.default().reduce((i, node) => isTag(node) ? i + 1 : i, 0);
            }
            return (
                renderedNode > 1 &&
                this.addons &&
                !this.horizontal
            )
        },
        // called by a number input if it is a direct child.
        wrapNumberinput({ controlsPosition, size }) {
            const classes = ['has-numberinput'];
            if (controlsPosition) {
                classes.push(`has-numberinput-${controlsPosition}`);
            }
            if (size) {
                classes.push(`has-numberinput-${size}`);
            }
            this.numberInputClasses = classes;
        }
    },
    mounted() {
        if (this.horizontal) {
            // Bulma docs: .is-normal for any .input or .button
            const elements = this.$el.querySelectorAll('.input, .select, .button, .textarea, .b-slider');
            if (elements.length > 0) {
                this.fieldLabelSize = 'is-normal';
            }
        }
    }
};

const _hoisted_1 = {
  key: 3,
  class: "field-body"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_field_body = resolveComponent("b-field-body");
  const _component_b_field = resolveComponent("b-field");

  return (openBlock(), createBlock("div", {
    class: ["field", $options.rootClasses]
  }, [
    ($props.horizontal)
      ? (openBlock(), createBlock("div", {
          key: 0,
          class: ["field-label", [$props.customClass, $data.fieldLabelSize]]
        }, [
          ($options.hasLabel)
            ? (openBlock(), createBlock("label", {
                key: 0,
                for: $props.labelFor,
                class: [$props.customClass, "label"]
              }, [
                (_ctx.$slots.label)
                  ? renderSlot(_ctx.$slots, "label", { key: 0 })
                  : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString($props.label), 1 /* TEXT */)
                    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              ], 10 /* CLASS, PROPS */, ["for"]))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : (openBlock(), createBlock(Fragment, { key: 1 }, [
          ($options.hasLabel)
            ? (openBlock(), createBlock("label", {
                key: 0,
                for: $props.labelFor,
                class: [$props.customClass, "label"]
              }, [
                (_ctx.$slots.label)
                  ? renderSlot(_ctx.$slots, "label", { key: 0 })
                  : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString($props.label), 1 /* TEXT */)
                    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              ], 10 /* CLASS, PROPS */, ["for"]))
            : createCommentVNode("v-if", true)
        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)),
    ($props.horizontal)
      ? (openBlock(), createBlock(_component_b_field_body, {
          key: 2,
          message: $data.newMessage ? $options.formattedMessage : '',
          type: $data.newType
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["message", "type"]))
      : ($options.hasInnerField)
        ? (openBlock(), createBlock("div", _hoisted_1, [
            createVNode(_component_b_field, {
              addons: false,
              type: $data.newType,
              class: $options.innerFieldClasses
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["type", "class"])
          ]))
        : renderSlot(_ctx.$slots, "default", { key: 4 }),
    ($options.hasMessage && !$props.horizontal)
      ? (openBlock(), createBlock("p", {
          key: 5,
          class: ["help", $data.newType]
        }, [
          (_ctx.$slots.message)
            ? renderSlot(_ctx.$slots, "message", { key: 0 })
            : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList($options.formattedMessage, (mess, i) => {
                return (openBlock(), createBlock(Fragment, null, [
                  createTextVNode(toDisplayString(mess) + " ", 1 /* TEXT */),
                  ((i + 1) < $options.formattedMessage.length)
                    ? (openBlock(), createBlock("br", { key: i }))
                    : createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 256 /* UNKEYED_FRAGMENT */))
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/field/Field.vue";

export { script as s };
