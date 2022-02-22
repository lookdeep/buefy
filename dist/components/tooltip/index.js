/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tooltip = {}, global.Vue));
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

    var script = {
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
            },
            keepOpenOnContentHover: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isActive: false,
                triggerStyle: {},
                timer: null,
                closeTimeout: null,
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
            onContentHover() {
                if (this.keepOpenOnContentHover) {
                    this.clearCloseTimeout();
                    this.onHover();
                }
            },
            clearCloseTimeout() {
                if (this.keepOpenOnContentHover) {
                    clearTimeout(this.closeTimeout);
                }
            },
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
                this.clearCloseTimeout();
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
                const _close = () => {
                    this.isActive = !this.autoClose;
                    if (this.autoClose && this.timer) clearTimeout(this.timer);
                };
                if (typeof this.autoClose === 'boolean') {
                    if (this.keepOpenOnContentHover) {
                        clearTimeout(this.closeTimeout);
                        this.closeTimeout = setTimeout(() => {
                            _close();
                        }, 150);
                    } else {
                        _close();
                    }
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

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("span", {
        ref: "tooltip",
        class: $options.rootClasses
      }, [
        vue.createVNode(vue.Transition, { name: $options.newAnimation }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("div", {
              ref: "content",
              class: ['tooltip-content', $props.contentClass],
              onMouseenter: _cache[1] || (_cache[1] = (...args) => ($options.onContentHover && $options.onContentHover(...args))),
              onMouseleave: _cache[2] || (_cache[2] = (...args) => ($options.close && $options.close(...args)))
            }, [
              ($props.label)
                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                    vue.createTextVNode(vue.toDisplayString($props.label), 1 /* TEXT */)
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                : (_ctx.$slots.content)
                  ? vue.renderSlot(_ctx.$slots, "content", { key: 1 })
                  : vue.createCommentVNode("v-if", true)
            ], 34 /* CLASS, HYDRATE_EVENTS */), [
              [vue.vShow, $props.active && ($data.isActive || $props.always)]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"]),
        vue.createVNode("div", {
          ref: "trigger",
          class: "tooltip-trigger",
          style: $data.triggerStyle,
          onClick: _cache[3] || (_cache[3] = (...args) => ($options.onClick && $options.onClick(...args))),
          onContextmenu: _cache[4] || (_cache[4] = (...args) => ($options.onContextMenu && $options.onContextMenu(...args))),
          onMouseenter: _cache[5] || (_cache[5] = (...args) => ($options.onHover && $options.onHover(...args))),
          onFocusCapture: _cache[6] || (_cache[6] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          onBlurCapture: _cache[7] || (_cache[7] = (...args) => ($options.close && $options.close(...args))),
          onMouseleave: _cache[8] || (_cache[8] = (...args) => ($options.close && $options.close(...args)))
        }, [
          vue.renderSlot(_ctx.$slots, "default", { ref: "slot" })
        ], 36 /* STYLE, HYDRATE_EVENTS */)
      ], 2 /* CLASS */))
    }

    script.render = render;
    script.__file = "src/components/tooltip/Tooltip.vue";

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

    exports.BTooltip = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
