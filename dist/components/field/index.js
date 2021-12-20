/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Field = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var config = {
      defaultContainerElement: null,
      defaultIconPack: 'mdi',
      defaultIconComponent: null,
      defaultIconPrev: 'chevron-left',
      defaultIconNext: 'chevron-right',
      defaultLocale: undefined,
      defaultDialogConfirmText: null,
      defaultDialogCancelText: null,
      defaultSnackbarDuration: 3500,
      defaultSnackbarPosition: null,
      defaultToastDuration: 2000,
      defaultToastPosition: null,
      defaultNotificationDuration: 2000,
      defaultNotificationPosition: null,
      defaultTooltipType: 'is-primary',
      defaultTooltipDelay: null,
      defaultInputAutocomplete: 'on',
      defaultDateFormatter: null,
      defaultDateParser: null,
      defaultDateCreator: null,
      defaultTimeCreator: null,
      defaultDayNames: null,
      defaultMonthNames: null,
      defaultFirstDayOfWeek: null,
      defaultUnselectableDaysOfWeek: null,
      defaultTimeFormatter: null,
      defaultTimeParser: null,
      defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
      defaultModalScroll: null,
      defaultDatepickerMobileNative: true,
      defaultTimepickerMobileNative: true,
      defaultNoticeQueue: true,
      defaultInputHasCounter: true,
      defaultTaginputHasCounter: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultFieldLabelPosition: null,
      defaultDatepickerYearsRange: [-100, 10],
      defaultDatepickerNearbyMonthDays: true,
      defaultDatepickerNearbySelectableMonthDays: false,
      defaultDatepickerShowWeekNumber: false,
      defaultDatepickerWeekNumberClickable: false,
      defaultDatepickerMobileModal: true,
      defaultTrapFocus: true,
      defaultAutoFocus: true,
      defaultButtonRounded: false,
      defaultSwitchRounded: true,
      defaultCarouselInterval: 3500,
      defaultTabsExpanded: false,
      defaultTabsAnimated: true,
      defaultTabsType: null,
      defaultStatusIcon: true,
      defaultProgrammaticPromise: false,
      defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
      defaultImageWebpFallback: null,
      defaultImageLazy: true,
      defaultImageResponsive: true,
      defaultImageRatio: null,
      defaultImageSrcsetFormatter: null,
      customIconPacks: null
    };

    function isTag(vnode) {
      return vnode.type !== vue.Comment && vnode.type !== vue.Text && vnode.type !== vue.Static;
    } // TODO: too much dependence of Vue's internal structure?

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
            if (children.length === 1 && children[0].type === vue.Fragment) {
                children = children[0].children;
            }
            return vue.h(
                'div',
                { class: 'field-body' },
                {
                    default: () => {
                        return children.map((element) => {
                            // skip returns(?) and comments
                            if (element.type === vue.Comment) {
                                return element
                            }
                            let message;
                            if (first) {
                                message = this.message;
                                first = false;
                            }
                            return vue.h(
                                vue.resolveComponent('b-field'),
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
      const _component_b_field_body = vue.resolveComponent("b-field-body");
      const _component_b_field = vue.resolveComponent("b-field");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["field", $options.rootClasses]
      }, [
        ($props.horizontal)
          ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: ["field-label", [$props.customClass, $data.fieldLabelSize]]
            }, [
              ($options.hasLabel)
                ? (vue.openBlock(), vue.createBlock("label", {
                    key: 0,
                    for: $props.labelFor,
                    class: [$props.customClass, "label"]
                  }, [
                    (_ctx.$slots.label)
                      ? vue.renderSlot(_ctx.$slots, "label", { key: 0 })
                      : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                          vue.createTextVNode(vue.toDisplayString($props.label), 1 /* TEXT */)
                        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                  ], 10 /* CLASS, PROPS */, ["for"]))
                : vue.createCommentVNode("v-if", true)
            ], 2 /* CLASS */))
          : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
              ($options.hasLabel)
                ? (vue.openBlock(), vue.createBlock("label", {
                    key: 0,
                    for: $props.labelFor,
                    class: [$props.customClass, "label"]
                  }, [
                    (_ctx.$slots.label)
                      ? vue.renderSlot(_ctx.$slots, "label", { key: 0 })
                      : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                          vue.createTextVNode(vue.toDisplayString($props.label), 1 /* TEXT */)
                        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                  ], 10 /* CLASS, PROPS */, ["for"]))
                : vue.createCommentVNode("v-if", true)
            ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)),
        ($props.horizontal)
          ? (vue.openBlock(), vue.createBlock(_component_b_field_body, {
              key: 2,
              message: $data.newMessage ? $options.formattedMessage : '',
              type: $data.newType
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["message", "type"]))
          : ($options.hasInnerField)
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
                vue.createVNode(_component_b_field, {
                  addons: false,
                  type: $data.newType,
                  class: $options.innerFieldClasses
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3 /* FORWARDED */
                }, 8 /* PROPS */, ["type", "class"])
              ]))
            : vue.renderSlot(_ctx.$slots, "default", { key: 4 }),
        ($options.hasMessage && !$props.horizontal)
          ? (vue.openBlock(), vue.createBlock("p", {
              key: 5,
              class: ["help", $data.newType]
            }, [
              (_ctx.$slots.message)
                ? vue.renderSlot(_ctx.$slots, "message", { key: 0 })
                : (vue.openBlock(true), vue.createBlock(vue.Fragment, { key: 1 }, vue.renderList($options.formattedMessage, (mess, i) => {
                    return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
                      vue.createTextVNode(vue.toDisplayString(mess) + " ", 1 /* TEXT */),
                      ((i + 1) < $options.formattedMessage.length)
                        ? (vue.openBlock(), vue.createBlock("br", { key: i }))
                        : vue.createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  }), 256 /* UNKEYED_FRAGMENT */))
            ], 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    }

    script.render = render;
    script.__file = "src/components/field/Field.vue";

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

    exports.BField = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
