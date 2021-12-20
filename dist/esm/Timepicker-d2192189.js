import { T as TimepickerMixin } from './TimepickerMixin-885a12ae.js';
import { s as script$5, a as script$6 } from './DropdownItem-2d055f53.js';
import { s as script$1 } from './Input-82ba71aa.js';
import { s as script$2 } from './Field-bdc7266c.js';
import { s as script$3 } from './Select-2621b3e3.js';
import { s as script$4 } from './Icon-fefef9ed.js';
import { resolveComponent, openBlock, createBlock, createSlots, withCtx, createVNode, Fragment, renderList, toDisplayString, createCommentVNode, renderSlot, mergeProps, withKeys } from 'vue';

var script = {
    name: 'BTimepicker',
    components: {
        [script$1.name]: script$1,
        [script$2.name]: script$2,
        [script$3.name]: script$3,
        [script$4.name]: script$4,
        [script$5.name]: script$5,
        [script$6.name]: script$6
    },
    mixins: [TimepickerMixin],
    inheritAttrs: false,
    data() {
        return {
            _isTimepicker: true
        }
    },
    computed: {
        nativeStep() {
            if (this.enableSeconds) return '1'
            else return undefined
        }
    }
};

const _hoisted_1 = { class: "control is-colon" };
const _hoisted_2 = { class: "control is-colon" };
const _hoisted_3 = { class: "control is-colon" };
const _hoisted_4 = {
  key: 0,
  class: "timepicker-footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_select = resolveComponent("b-select");
  const _component_b_field = resolveComponent("b-field");
  const _component_b_dropdown_item = resolveComponent("b-dropdown-item");
  const _component_b_dropdown = resolveComponent("b-dropdown");

  return (openBlock(), createBlock("div", {
    class: ["timepicker control", [_ctx.size, {'is-expanded': _ctx.expanded}]]
  }, [
    (!_ctx.isMobile || _ctx.inline)
      ? (openBlock(), createBlock(_component_b_dropdown, {
          key: 0,
          ref: "dropdown",
          position: _ctx.position,
          disabled: _ctx.disabledOrUndefined,
          inline: _ctx.inline,
          "append-to-body": _ctx.appendToBody,
          "append-to-body-copy-parent": "",
          onActiveChange: _ctx.onActiveChange
        }, createSlots({
          default: withCtx(() => [
            createVNode(_component_b_dropdown_item, {
              disabled: _ctx.disabledOrUndefined,
              focusable: _ctx.focusable,
              custom: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_b_field, {
                  grouped: "",
                  position: "is-centered"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_b_select, {
                      modelValue: _ctx.hoursSelected,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.hoursSelected = $event)),
                      onChange: _cache[4] || (_cache[4] = $event => (_ctx.onHoursChange($event.target.value))),
                      disabled: _ctx.disabledOrUndefined,
                      placeholder: "00"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.hours, (hour) => {
                          return (openBlock(), createBlock("option", {
                            value: hour.value,
                            key: hour.value,
                            disabled: _ctx.isHourDisabled(hour.value) || undefined
                          }, toDisplayString(hour.label), 9 /* TEXT, PROPS */, ["value", "disabled"]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["modelValue", "disabled"]),
                    createVNode("span", _hoisted_1, toDisplayString(_ctx.hourLiteral), 1 /* TEXT */),
                    createVNode(_component_b_select, {
                      modelValue: _ctx.minutesSelected,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => (_ctx.minutesSelected = $event)),
                      onChange: _cache[6] || (_cache[6] = $event => (_ctx.onMinutesChange($event.target.value))),
                      disabled: _ctx.disabledOrUndefined,
                      placeholder: "00"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.minutes, (minute) => {
                          return (openBlock(), createBlock("option", {
                            value: minute.value,
                            key: minute.value,
                            disabled: _ctx.isMinuteDisabled(minute.value) || undefined
                          }, toDisplayString(minute.label), 9 /* TEXT, PROPS */, ["value", "disabled"]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["modelValue", "disabled"]),
                    (_ctx.enableSeconds)
                      ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("span", _hoisted_2, toDisplayString(_ctx.minuteLiteral), 1 /* TEXT */),
                          createVNode(_component_b_select, {
                            modelValue: _ctx.secondsSelected,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => (_ctx.secondsSelected = $event)),
                            onChange: _cache[8] || (_cache[8] = $event => (_ctx.onSecondsChange($event.target.value))),
                            disabled: _ctx.disabledOrUndefined,
                            placeholder: "00"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.seconds, (second) => {
                                return (openBlock(), createBlock("option", {
                                  value: second.value,
                                  key: second.value,
                                  disabled: _ctx.isSecondDisabled(second.value) || undefined
                                }, toDisplayString(second.label), 9 /* TEXT, PROPS */, ["value", "disabled"]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["modelValue", "disabled"]),
                          createVNode("span", _hoisted_3, toDisplayString(_ctx.secondLiteral), 1 /* TEXT */)
                        ], 64 /* STABLE_FRAGMENT */))
                      : createCommentVNode("v-if", true),
                    (!_ctx.isHourFormat24)
                      ? (openBlock(), createBlock(_component_b_select, {
                          key: 1,
                          modelValue: _ctx.meridienSelected,
                          "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => (_ctx.meridienSelected = $event)),
                          onChange: _cache[10] || (_cache[10] = $event => (_ctx.onMeridienChange($event.target.value))),
                          disabled: _ctx.disabledOrUndefined
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.meridiens, (meridien) => {
                              return (openBlock(), createBlock("option", {
                                value: meridien,
                                key: meridien
                              }, toDisplayString(meridien), 9 /* TEXT, PROPS */, ["value"]))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["modelValue", "disabled"]))
                      : createCommentVNode("v-if", true)
                  ]),
                  _: 1 /* STABLE */
                }),
                (_ctx.$slots.default !== undefined)
                  ? (openBlock(), createBlock("footer", _hoisted_4, [
                      renderSlot(_ctx.$slots, "default")
                    ]))
                  : createCommentVNode("v-if", true)
              ]),
              _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["disabled", "focusable"])
          ]),
          _: 2 /* DYNAMIC */
        }, [
          (!_ctx.inline)
            ? {
                name: "trigger",
                fn: withCtx(() => [
                  renderSlot(_ctx.$slots, "trigger", {}, () => [
                    createVNode(_component_b_input, mergeProps({
                      ref: "input",
                      autocomplete: "off",
                      "model-value": _ctx.formatValue(_ctx.computedValue),
                      placeholder: _ctx.placeholder,
                      size: _ctx.size,
                      icon: _ctx.icon,
                      "icon-pack": _ctx.iconPack,
                      loading: _ctx.loading,
                      disabled: _ctx.disabledOrUndefined,
                      readonly: !_ctx.editable || undefined,
                      rounded: _ctx.rounded
                    }, _ctx.$attrs, {
                      "use-html5-validation": _ctx.useHtml5Validation,
                      onKeyup: _cache[1] || (_cache[1] = withKeys($event => (_ctx.toggle(true)), ["enter"])),
                      onChange: _cache[2] || (_cache[2] = $event => (_ctx.onChange($event.target.value))),
                      onFocus: _ctx.handleOnFocus
                    }), null, 16 /* FULL_PROPS */, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])
                  ])
                ])
              }
            : undefined
        ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["position", "disabled", "inline", "append-to-body", "onActiveChange"]))
      : (openBlock(), createBlock(_component_b_input, mergeProps({
          key: 1,
          ref: "input",
          type: "time",
          step: $options.nativeStep,
          autocomplete: "off",
          "model-value": _ctx.formatHHMMSS(_ctx.computedValue),
          placeholder: _ctx.placeholder,
          size: _ctx.size,
          icon: _ctx.icon,
          "icon-pack": _ctx.iconPack,
          rounded: _ctx.rounded,
          loading: _ctx.loading,
          max: _ctx.formatHHMMSS(_ctx.maxTime),
          min: _ctx.formatHHMMSS(_ctx.minTime),
          disabled: _ctx.disabledOrUndefined,
          readonly: false,
          "reset-on-meridian-change": _ctx.isReset
        }, _ctx.$attrs, {
          "use-html5-validation": _ctx.useHtml5Validation,
          onChange: _cache[11] || (_cache[11] = $event => (_ctx.onChange($event.target.value))),
          onFocus: _ctx.handleOnFocus,
          onBlur: _cache[12] || (_cache[12] = $event => (_ctx.onBlur() && _ctx.checkHtml5Validity()))
        }), null, 16 /* FULL_PROPS */, ["step", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "reset-on-meridian-change", "use-html5-validation", "onFocus"]))
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/timepicker/Timepicker.vue";

export { script as s };
