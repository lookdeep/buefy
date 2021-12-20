/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Slider = {}, global.Vue));
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

    /**
     * Asserts a value is beetween min and max
     * @param val
     * @param min
     * @param max
     * @returns {number}
     */


    function bound(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
    function removeElement(el) {
      if (typeof el.remove !== 'undefined') {
        el.remove();
      } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function createAbsoluteElement(el) {
      var root = document.createElement('div');
      root.style.position = 'absolute';
      root.style.left = '0px';
      root.style.top = '0px';
      root.style.width = '100%';
      var wrapper = document.createElement('div');
      root.appendChild(wrapper);
      wrapper.appendChild(el);
      document.body.appendChild(root);
      return root;
    }

    var script$3 = {
        name: 'BTooltip',
        props: {
            active: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: () => config.defaultTooltipType
            },
            label: String,
            delay: {
                type: Number,
                default: () => config.defaultTooltipDelay
            },
            position: {
                type: String,
                default: 'is-top',
                validator(value) {
                    return [
                        'is-top',
                        'is-bottom',
                        'is-left',
                        'is-right'
                    ].indexOf(value) > -1
                }
            },
            triggers: {
                type: Array,
                default: () => ['hover']
            },
            always: Boolean,
            square: Boolean,
            dashed: Boolean,
            multilined: Boolean,
            size: {
                type: String,
                default: 'is-medium'
            },
            appendToBody: Boolean,
            animated: {
                type: Boolean,
                default: true
            },
            animation: {
                type: String,
                default: 'fade'
            },
            contentClass: String,
            autoClose: {
                type: [Array, Boolean],
                default: true
            }
        },
        data() {
            return {
                isActive: false,
                triggerStyle: {},
                timer: null,
                _bodyEl: undefined // Used to append to body
            }
        },
        computed: {
            rootClasses() {
                return ['b-tooltip', this.type, this.position, this.size, {
                    'is-square': this.square,
                    'is-always': this.always,
                    'is-multiline': this.multilined,
                    'is-dashed': this.dashed
                }]
            },
            newAnimation() {
                return this.animated ? this.animation : undefined
            }
        },
        watch: {
            isActive(value) {
                if (this.appendToBody) {
                    this.updateAppendToBody();
                }
            }
        },
        methods: {
            updateAppendToBody() {
                const tooltip = this.$refs.tooltip;
                const trigger = this.$refs.trigger;
                if (tooltip && trigger) {
                    // update wrapper tooltip
                    const tooltipEl = this.$data._bodyEl.children[0];
                    tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item));
                    if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
                        tooltipEl.classList.add(this.$vnode.data.staticClass);
                    }
                    this.rootClasses.forEach((item) => {
                        if (typeof item === 'object') {
                            for (const key in item) {
                                if (item[key]) {
                                    tooltipEl.classList.add(key);
                                }
                            }
                        } else {
                            tooltipEl.classList.add(item);
                        }
                    });
                    tooltipEl.style.width = `${trigger.clientWidth}px`;
                    tooltipEl.style.height = `${trigger.clientHeight}px`;
                    const rect = trigger.getBoundingClientRect();
                    const top = rect.top + window.scrollY;
                    const left = rect.left + window.scrollX;
                    const wrapper = this.$data._bodyEl;
                    wrapper.style.position = 'absolute';
                    wrapper.style.top = `${top}px`;
                    wrapper.style.left = `${left}px`;
                    wrapper.style.zIndex = this.isActive || this.always ? '99' : '-1';
                    this.triggerStyle = { zIndex: this.isActive || this.always ? '100' : undefined };
                }
            },
            onClick() {
                if (this.triggers.indexOf('click') < 0) return
                // if not active, toggle after clickOutside event
                // this fixes toggling programmatic
                this.$nextTick(() => {
                    setTimeout(() => this.open());
                });
            },
            onHover() {
                if (this.triggers.indexOf('hover') < 0) return
                this.open();
            },
            onContextMenu(e) {
                if (this.triggers.indexOf('contextmenu') < 0) return
                e.preventDefault();
                this.open();
            },
            onFocus() {
                if (this.triggers.indexOf('focus') < 0) return
                this.open();
            },
            open() {
                if (this.delay) {
                    this.timer = setTimeout(() => {
                        this.isActive = true;
                        this.timer = null;
                    }, this.delay);
                } else {
                    this.isActive = true;
                }
            },
            close() {
                if (typeof this.autoClose === 'boolean') {
                    this.isActive = !this.autoClose;
                    if (this.autoClose && this.timer) clearTimeout(this.timer);
                }
            },
            /**
            * Close tooltip if clicked outside.
            */
            clickedOutside(event) {
                if (this.isActive) {
                    if (Array.isArray(this.autoClose)) {
                        if (this.autoClose.includes('outside')) {
                            if (!this.isInWhiteList(event.target)) {
                                this.isActive = false;
                                return
                            }
                        }
                        if (this.autoClose.includes('inside')) {
                            if (this.isInWhiteList(event.target)) this.isActive = false;
                        }
                    }
                }
            },
            /**
             * Keypress event that is bound to the document
             */
            keyPress({ key }) {
                if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                    if (Array.isArray(this.autoClose)) {
                        if (this.autoClose.indexOf('escape') >= 0) this.isActive = false;
                    }
                }
            },
            /**
            * White-listed items to not close when clicked.
            */
            isInWhiteList(el) {
                if (el === this.$refs.content) return true
                // All chidren from content
                if (this.$refs.content !== undefined) {
                    const children = this.$refs.content.querySelectorAll('*');
                    for (const child of children) {
                        if (el === child) {
                            return true
                        }
                    }
                }
                return false
            }
        },
        mounted() {
            if (this.appendToBody && typeof window !== 'undefined') {
                this.$data._bodyEl = createAbsoluteElement(this.$refs.content);
                this.updateAppendToBody();
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('click', this.clickedOutside);
                document.addEventListener('keyup', this.keyPress);
            }
        },
        beforeUnmount() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('click', this.clickedOutside);
                document.removeEventListener('keyup', this.keyPress);
            }
            if (this.appendToBody) {
                removeElement(this.$data._bodyEl);
            }
        }
    };

    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("span", {
        ref: "tooltip",
        class: $options.rootClasses
      }, [
        vue.createVNode(vue.Transition, { name: $options.newAnimation }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("div", {
              ref: "content",
              class: ['tooltip-content', $props.contentClass]
            }, [
              ($props.label)
                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                    vue.createTextVNode(vue.toDisplayString($props.label), 1 /* TEXT */)
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                : (_ctx.$slots.content)
                  ? vue.renderSlot(_ctx.$slots, "content", { key: 1 })
                  : vue.createCommentVNode("v-if", true)
            ], 2 /* CLASS */), [
              [vue.vShow, $props.active && ($data.isActive || $props.always)]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"]),
        vue.createVNode("div", {
          ref: "trigger",
          class: "tooltip-trigger",
          style: $data.triggerStyle,
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
          onContextmenu: _cache[2] || (_cache[2] = (...args) => ($options.onContextMenu && $options.onContextMenu(...args))),
          onMouseenter: _cache[3] || (_cache[3] = (...args) => ($options.onHover && $options.onHover(...args))),
          onFocusCapture: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          onBlurCapture: _cache[5] || (_cache[5] = (...args) => ($options.close && $options.close(...args))),
          onMouseleave: _cache[6] || (_cache[6] = (...args) => ($options.close && $options.close(...args)))
        }, [
          vue.renderSlot(_ctx.$slots, "default", { ref: "slot" })
        ], 36 /* STYLE, HYDRATE_EVENTS */)
      ], 2 /* CLASS */))
    }

    script$3.render = render$3;
    script$3.__file = "src/components/tooltip/Tooltip.vue";

    var script$2 = {
        name: 'BSliderThumb',
        components: {
            [script$3.name]: script$3
        },
        inheritAttrs: false,
        props: {
            modelValue: {
                type: Number,
                default: 0
            },
            type: {
                type: String,
                default: ''
            },
            tooltip: {
                type: Boolean,
                default: true
            },
            indicator: {
                type: Boolean,
                default: false
            },
            customFormatter: Function,
            format: {
                type: String,
                default: 'raw',
                validator: (value) => {
                    return [
                        'raw',
                        'percent'
                    ].indexOf(value) >= 0
                }
            },
            locale: {
                type: [String, Array],
                default: () => {
                    return config.defaultLocale
                }
            },
            tooltipAlways: {
                type: Boolean,
                default: false
            }
        },
        emits: ['dragend', 'dragstart', 'update:modelValue'],
        data() {
            return {
                isFocused: false,
                dragging: false,
                startX: 0,
                startPosition: 0,
                newPosition: null,
                oldValue: this.modelValue
            }
        },
        computed: {
            disabled() {
                return this.$parent.disabled
            },
            max() {
                return this.$parent.max
            },
            min() {
                return this.$parent.min
            },
            step() {
                return this.$parent.step
            },
            precision() {
                return this.$parent.precision
            },
            currentPosition() {
                return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`
            },
            wrapperStyle() {
                return { left: this.currentPosition }
            },
            formattedValue() {
                if (typeof this.customFormatter !== 'undefined') {
                    return this.customFormatter(this.modelValue)
                }

                if (this.format === 'percent') {
                    return new Intl.NumberFormat(
                        this.locale,
                        {
                            style: 'percent'
                        }
                    ).format(((this.modelValue - this.min)) / (this.max - this.min))
                }

                return new Intl.NumberFormat(this.locale).format(this.modelValue)
            }
        },
        methods: {
            onFocus() {
                this.isFocused = true;
            },
            onBlur() {
                this.isFocused = false;
            },
            onButtonDown(event) {
                if (this.disabled) return
                event.preventDefault();
                this.onDragStart(event);
                if (typeof window !== 'undefined') {
                    document.addEventListener('mousemove', this.onDragging);
                    document.addEventListener('touchmove', this.onDragging);
                    document.addEventListener('mouseup', this.onDragEnd);
                    document.addEventListener('touchend', this.onDragEnd);
                    document.addEventListener('contextmenu', this.onDragEnd);
                }
            },
            onLeftKeyDown() {
                if (this.disabled || this.modelValue === this.min) return
                this.newPosition = parseFloat(this.currentPosition) -
                    this.step / (this.max - this.min) * 100;
                this.setPosition(this.newPosition);
                this.$parent.emitValue('change');
            },
            onRightKeyDown() {
                if (this.disabled || this.modelValue === this.max) return
                this.newPosition = parseFloat(this.currentPosition) +
                    this.step / (this.max - this.min) * 100;
                this.setPosition(this.newPosition);
                this.$parent.emitValue('change');
            },
            onHomeKeyDown() {
                if (this.disabled || this.modelValue === this.min) return
                this.newPosition = 0;
                this.setPosition(this.newPosition);
                this.$parent.emitValue('change');
            },
            onEndKeyDown() {
                if (this.disabled || this.modelValue === this.max) return
                this.newPosition = 100;
                this.setPosition(this.newPosition);
                this.$parent.emitValue('change');
            },
            onDragStart(event) {
                this.dragging = true;
                this.$emit('dragstart');
                if (event.type === 'touchstart') {
                    event.clientX = event.touches[0].clientX;
                }
                this.startX = event.clientX;
                this.startPosition = parseFloat(this.currentPosition);
                this.newPosition = this.startPosition;
            },
            onDragging(event) {
                if (this.dragging) {
                    if (event.type === 'touchmove') {
                        event.clientX = event.touches[0].clientX;
                    }
                    const diff = (event.clientX - this.startX) / this.$parent.sliderSize() * 100;
                    this.newPosition = this.startPosition + diff;
                    this.setPosition(this.newPosition);
                }
            },
            onDragEnd() {
                this.dragging = false;
                this.$emit('dragend');
                if (this.modelValue !== this.oldValue) {
                    this.$parent.emitValue('change');
                }
                this.setPosition(this.newPosition);
                if (typeof window !== 'undefined') {
                    document.removeEventListener('mousemove', this.onDragging);
                    document.removeEventListener('touchmove', this.onDragging);
                    document.removeEventListener('mouseup', this.onDragEnd);
                    document.removeEventListener('touchend', this.onDragEnd);
                    document.removeEventListener('contextmenu', this.onDragEnd);
                }
            },
            setPosition(percent) {
                if (percent === null || isNaN(percent)) return
                if (percent < 0) {
                    percent = 0;
                } else if (percent > 100) {
                    percent = 100;
                }
                const stepLength = 100 / ((this.max - this.min) / this.step);
                const steps = Math.round(percent / stepLength);
                let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
                value = parseFloat(value.toFixed(this.precision));
                this.$emit('update:modelValue', value);
                if (!this.dragging && value !== this.oldValue) {
                    this.oldValue = value;
                }
            }
        }
    };

    const _hoisted_1$2 = { key: 0 };

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_tooltip = vue.resolveComponent("b-tooltip");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["b-slider-thumb-wrapper", { 'is-dragging': $data.dragging, 'has-indicator': $props.indicator}],
        style: $options.wrapperStyle
      }, [
        vue.createVNode(_component_b_tooltip, {
          label: $options.formattedValue,
          type: $props.type,
          always: $data.dragging || $data.isFocused || $props.tooltipAlways,
          active: !$options.disabled && $props.tooltip
        }, {
          default: vue.withCtx(() => [
            vue.createVNode("div", vue.mergeProps({
              class: "b-slider-thumb",
              tabindex: $options.disabled ? false : 0
            }, _ctx.$attrs, {
              onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.onButtonDown && $options.onButtonDown(...args))),
              onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.onButtonDown && $options.onButtonDown(...args))),
              onFocus: _cache[3] || (_cache[3] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              onBlur: _cache[4] || (_cache[4] = (...args) => ($options.onBlur && $options.onBlur(...args))),
              onKeydown: [
                _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => ($options.onLeftKeyDown && $options.onLeftKeyDown(...args)), ["prevent"]), ["left"])),
                _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers((...args) => ($options.onRightKeyDown && $options.onRightKeyDown(...args)), ["prevent"]), ["right"])),
                _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => ($options.onLeftKeyDown && $options.onLeftKeyDown(...args)), ["prevent"]), ["down"])),
                _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => ($options.onRightKeyDown && $options.onRightKeyDown(...args)), ["prevent"]), ["up"])),
                _cache[9] || (_cache[9] = vue.withKeys(vue.withModifiers((...args) => ($options.onHomeKeyDown && $options.onHomeKeyDown(...args)), ["prevent"]), ["home"])),
                _cache[10] || (_cache[10] = vue.withKeys(vue.withModifiers((...args) => ($options.onEndKeyDown && $options.onEndKeyDown(...args)), ["prevent"]), ["end"]))
              ]
            }), [
              ($props.indicator)
                ? (vue.openBlock(), vue.createBlock("span", _hoisted_1$2, vue.toDisplayString($options.formattedValue), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true)
            ], 16 /* FULL_PROPS */, ["tabindex"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["label", "type", "always", "active"])
      ], 6 /* CLASS, STYLE */))
    }

    script$2.render = render$2;
    script$2.__file = "src/components/slider/SliderThumb.vue";

    var script$1 = {
        name: 'BSliderTick',
        props: {
            value: {
                type: Number,
                default: 0
            }
        },
        computed: {
            position() {
                const pos = (this.value - this.$parent.min) /
                    (this.$parent.max - this.$parent.min) * 100;
                return (pos >= 0 && pos <= 100) ? pos : 0
            },
            hidden() {
                return this.value === this.$parent.min || this.value === this.$parent.max
            }
        },
        methods: {
            getTickStyle(position) {
                return { left: position + '%' }
            }
        },
        created() {
            if (!this.$parent.$data._isSlider) {
                throw new Error('You should wrap bSliderTick on a bSlider')
            }
        }
    };

    const _hoisted_1$1 = {
      key: 0,
      class: "b-slider-tick-label"
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("div", {
        class: ["b-slider-tick", { 'is-tick-hidden': $options.hidden }],
        style: $options.getTickStyle($options.position)
      }, [
        (_ctx.$slots.default)
          ? (vue.openBlock(), vue.createBlock("span", _hoisted_1$1, [
              vue.renderSlot(_ctx.$slots, "default")
            ]))
          : vue.createCommentVNode("v-if", true)
      ], 6 /* CLASS, STYLE */))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/slider/SliderTick.vue";

    var script = {
        name: 'BSlider',
        components: {
            [script$2.name]: script$2,
            [script$1.name]: script$1
        },
        props: {
            modelValue: {
                type: [Number, Array],
                default: 0
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            type: {
                type: String,
                default: 'is-primary'
            },
            size: String,
            ticks: {
                type: Boolean,
                default: false
            },
            tooltip: {
                type: Boolean,
                default: true
            },
            tooltipType: String,
            rounded: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            lazy: {
                type: Boolean,
                default: false
            },
            customFormatter: Function,
            ariaLabel: [String, Array],
            biggerSliderFocus: {
                type: Boolean,
                default: false
            },
            indicator: {
                type: Boolean,
                default: false
            },
            format: {
                type: String,
                default: 'raw',
                validator: (value) => {
                    return [
                        'raw',
                        'percent'
                    ].indexOf(value) >= 0
                }
            },
            locale: {
                type: [String, Array],
                default: () => {
                    return config.defaultLocale
                }
            },
            tooltipAlways: {
                type: Boolean,
                default: false
            }
        },
        emits: ['change', 'dragend', 'dragging', 'dragstart', 'update:modelValue'],
        data() {
            return {
                value1: null,
                value2: null,
                // internal is used to update value1 and value2 with a single shot.
                // internal is also used to stop unnecessary propagation of update.
                internal: {
                    value1: null,
                    value2: null
                },
                dragging: false,
                isRange: false,
                _isSlider: true // Used by Thumb and Tick
            }
        },
        computed: {
            newTooltipType() {
                return this.tooltipType ? this.tooltipType : this.type
            },
            tickValues() {
                if (!this.ticks || this.min > this.max || this.step === 0) return []
                const result = [];
                for (let i = this.min + this.step; i < this.max; i = i + this.step) {
                    result.push(i);
                }
                return result
            },
            minValue() {
                return Math.min(this.value1, this.value2)
            },
            maxValue() {
                return Math.max(this.value1, this.value2)
            },
            barSize() {
                return this.isRange
                    ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
                    : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`
            },
            barStart() {
                return this.isRange
                    ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
                    : '0%'
            },
            precision() {
                const precisions = [this.min, this.max, this.step].map((item) => {
                    const decimal = ('' + item).split('.')[1];
                    return decimal ? decimal.length : 0
                });
                return Math.max(...precisions)
            },
            barStyle() {
                return {
                    width: this.barSize,
                    left: this.barStart
                }
            },
            rootClasses() {
                return {
                    'is-rounded': this.rounded,
                    'is-dragging': this.dragging,
                    'is-disabled': this.disabled,
                    'slider-focus': this.biggerSliderFocus
                }
            }
        },
        watch: {
            /**
            * When v-model is changed set the new active step.
            */
            modelValue(value) {
                this.setValues(value);
            },
            internal({ value1, value2 }) {
                this.value1 = value1;
                this.value2 = value2;
            },
            value1(newValue) {
                if (this.internal.value1 !== newValue) {
                    this.onInternalValueUpdate();
                }
            },
            value2(newValue) {
                if (this.internal.value2 !== newValue) {
                    this.onInternalValueUpdate();
                }
            },
            min() {
                this.setValues(this.modelValue);
            },
            max() {
                this.setValues(this.modelValue);
            }
        },
        methods: {
            setValues(newValue) {
                if (this.min > this.max) {
                    return
                }
                if (Array.isArray(newValue)) {
                    this.isRange = true;
                    const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                        ? this.min
                        : bound(newValue[0], this.min, this.max);
                    const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                        ? this.max
                        : bound(newValue[1], this.min, this.max);
                    // premature update will be triggered and end up with circular
                    // update, if value1 and value2 are updated one by one
                    this.internal = {
                        value1: this.isThumbReversed ? largeValue : smallValue,
                        value2: this.isThumbReversed ? smallValue : largeValue
                    };
                } else {
                    this.isRange = false;
                    this.internal = {
                        value1: isNaN(newValue)
                            ? this.min
                            : bound(newValue, this.min, this.max),
                        value2: null
                    };
                }
            },
            onInternalValueUpdate() {
                if (this.isRange) {
                    this.isThumbReversed = this.value1 > this.value2;
                }
                if (!this.lazy || !this.dragging) {
                    this.emitValue('update:modelValue');
                }
                if (this.dragging) {
                    this.emitValue('dragging');
                }
            },
            sliderSize() {
                return this.$refs.slider.getBoundingClientRect().width
            },
            onSliderClick(event) {
                if (this.disabled || this.isTrackClickDisabled) return
                const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
                const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
                const targetValue = this.min + percent * (this.max - this.min) / 100;
                const diffFirst = Math.abs(targetValue - this.value1);
                if (!this.isRange) {
                    if (diffFirst < this.step / 2) return
                    this.$refs.button1.setPosition(percent);
                } else {
                    const diffSecond = Math.abs(targetValue - this.value2);
                    if (diffFirst <= diffSecond) {
                        if (diffFirst < this.step / 2) return
                        this.$refs.button1.setPosition(percent);
                    } else {
                        if (diffSecond < this.step / 2) return
                        this.$refs.button2.setPosition(percent);
                    }
                }
                this.emitValue('change');
            },
            onDragStart() {
                this.dragging = true;
                this.$emit('dragstart');
            },
            onDragEnd() {
                this.isTrackClickDisabled = true;
                setTimeout(() => {
                    // avoid triggering onSliderClick after dragend
                    this.isTrackClickDisabled = false;
                }, 0);
                this.dragging = false;
                this.$emit('dragend');
                if (this.lazy) {
                    this.emitValue('update:modelValue');
                }
            },
            emitValue(type) {
                this.$emit(type, this.isRange
                    ? [this.minValue, this.maxValue]
                    : this.value1);
            }
        },
        created() {
            this.isThumbReversed = false;
            this.isTrackClickDisabled = false;
            this.setValues(this.modelValue);
        }
    };

    const _hoisted_1 = {
      class: "b-slider-track",
      ref: "slider"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_slider_tick = vue.resolveComponent("b-slider-tick");
      const _component_b_slider_thumb = vue.resolveComponent("b-slider-thumb");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["b-slider", [$props.size, $props.type, $options.rootClasses ]],
        onClick: _cache[3] || (_cache[3] = (...args) => ($options.onSliderClick && $options.onSliderClick(...args)))
      }, [
        vue.createVNode("div", _hoisted_1, [
          vue.createVNode("div", {
            class: "b-slider-fill",
            style: $options.barStyle
          }, null, 4 /* STYLE */),
          ($props.ticks)
            ? (vue.openBlock(true), vue.createBlock(vue.Fragment, { key: 0 }, vue.renderList($options.tickValues, (val, key) => {
                return (vue.openBlock(), vue.createBlock(_component_b_slider_tick, {
                  key: key,
                  value: val
                }, null, 8 /* PROPS */, ["value"]))
              }), 128 /* KEYED_FRAGMENT */))
            : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createVNode(_component_b_slider_thumb, {
            "tooltip-always": $props.tooltipAlways,
            modelValue: $data.value1,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.value1 = $event)),
            type: $options.newTooltipType,
            tooltip: $props.tooltip,
            "custom-formatter": $props.customFormatter,
            indicator: $props.indicator,
            format: $props.format,
            locale: $props.locale,
            ref: "button1",
            role: "slider",
            "aria-valuenow": $data.value1,
            "aria-valuemin": $props.min,
            "aria-valuemax": $props.max,
            "aria-orientation": "horizontal",
            "aria-label": Array.isArray($props.ariaLabel) ? $props.ariaLabel[0] : $props.ariaLabel,
            "aria-disabled": $props.disabled,
            onDragstart: $options.onDragStart,
            onDragend: $options.onDragEnd
          }, null, 8 /* PROPS */, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]),
          ($data.isRange)
            ? (vue.openBlock(), vue.createBlock(_component_b_slider_thumb, {
                key: 1,
                "tooltip-always": $props.tooltipAlways,
                modelValue: $data.value2,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.value2 = $event)),
                type: $options.newTooltipType,
                tooltip: $props.tooltip,
                "custom-formatter": $props.customFormatter,
                indicator: $props.indicator,
                format: $props.format,
                locale: $props.locale,
                ref: "button2",
                role: "slider",
                "aria-valuenow": $data.value2,
                "aria-valuemin": $props.min,
                "aria-valuemax": $props.max,
                "aria-orientation": "horizontal",
                "aria-label": Array.isArray($props.ariaLabel) ? $props.ariaLabel[1] : '',
                "aria-disabled": $props.disabled,
                onDragstart: $options.onDragStart,
                onDragend: $options.onDragEnd
              }, null, 8 /* PROPS */, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]))
            : vue.createCommentVNode("v-if", true)
        ], 512 /* NEED_PATCH */)
      ], 2 /* CLASS */))
    }

    script.render = render;
    script.__file = "src/components/slider/Slider.vue";

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
        registerComponent(Vue, script$1);
      }
    };
    use(Plugin);

    exports.BSlider = script;
    exports.BSliderTick = script$1;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
