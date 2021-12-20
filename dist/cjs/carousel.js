'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-2c63be1d.js');
var Icon = require('./Icon-dc7b693f.js');
var InjectedChildMixin = require('./InjectedChildMixin-d2127742.js');
var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');

var script$2 = {
    name: 'BCarousel',
    components: {
        [Icon.script.name]: Icon.script
    },
    mixins: [InjectedChildMixin.ProviderParentMixin('carousel', InjectedChildMixin.Sorted)],
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        animated: {
            type: String,
            default: 'slide'
        },
        interval: Number,
        hasDrag: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        pauseHover: {
            type: Boolean,
            default: true
        },
        pauseInfo: {
            type: Boolean,
            default: true
        },
        pauseInfoType: {
            type: String,
            default: 'is-white'
        },
        pauseText: {
            type: String,
            default: 'Pause'
        },
        arrow: {
            type: Boolean,
            default: true
        },
        arrowHover: {
            type: Boolean,
            default: true
        },
        repeat: {
            type: Boolean,
            default: true
        },
        iconPack: String,
        iconSize: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.config.defaultIconNext
            }
        },
        indicator: {
            type: Boolean,
            default: true
        },
        indicatorBackground: Boolean,
        indicatorCustom: Boolean,
        indicatorCustomSize: {
            type: String,
            default: 'is-small'
        },
        indicatorInside: {
            type: Boolean,
            default: true
        },
        indicatorMode: {
            type: String,
            default: 'click'
        },
        indicatorPosition: {
            type: String,
            default: 'is-bottom'
        },
        indicatorStyle: {
            type: String,
            default: 'is-dots'
        },
        overlay: Boolean,
        progress: Boolean,
        progressType: {
            type: String,
            default: 'is-primary'
        },
        withCarouselList: Boolean
    },
    emits: ['change', 'click', 'update:modelValue'],
    data() {
        return {
            transition: 'next',
            activeChild: this.modelValue || 0,
            isPause: false,
            dragX: false,
            timer: null
        }
    },
    computed: {
        indicatorClasses() {
            return [
                {
                    'has-background': this.indicatorBackground,
                    'has-custom': this.indicatorCustom,
                    'is-inside': this.indicatorInside
                },
                this.indicatorCustom && this.indicatorCustomSize,
                this.indicatorInside && this.indicatorPosition
            ]
        },

        // checking arrows
        hasPrev() {
            return this.repeat || this.activeChild !== 0
        },
        hasNext() {
            return this.repeat || this.activeChild < this.childItems.length - 1
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        modelValue(value) {
            this.changeActive(value);
        },
        /**
         * When carousel-items are updated, set active one.
         */
        sortedItems(items) {
            if (this.activeChild >= items.length && this.activeChild > 0) {
                this.changeActive(this.activeChild - 1);
            }
        },
        /**
         *  When autoplay is changed, start or pause timer accordingly
         */
        autoplay(status) {
            status ? this.startTimer() : this.pauseTimer();
        },
        /**
         *  Since the timer can get paused at the end, if repeat is changed we need to restart it
         */
        repeat(status) {
            if (status) { this.startTimer(); }
        }
    },

    methods: {
        startTimer() {
            if (!this.autoplay || this.timer) return
            this.isPause = false;
            this.timer = setInterval(() => {
                if (!this.repeat && this.activeChild >= this.childItems.length - 1) {
                    this.pauseTimer();
                } else {
                    this.next();
                }
            }, (this.interval || config.config.defaultCarouselInterval));
        },
        pauseTimer() {
            this.isPause = true;
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        restartTimer() {
            this.pauseTimer();
            this.startTimer();
        },
        checkPause() {
            if (this.pauseHover && this.autoplay) {
                this.pauseTimer();
            }
        },
        /**
         * Change the active item and emit change event.
         * action only for animated slide, there true = next, false = prev
         */
        changeActive(newIndex, direction = 0) {
            if (this.activeChild === newIndex || isNaN(newIndex)) return

            direction = direction || (newIndex - this.activeChild);

            newIndex = this.repeat
                ? helpers.mod(newIndex, this.childItems.length)
                : helpers.bound(newIndex, 0, this.childItems.length - 1);

            this.transition = direction > 0 ? 'prev' : 'next';
            // Transition names are reversed from the actual direction for correct effect

            this.activeChild = newIndex;
            if (newIndex !== this.modelValue) {
                this.$emit('update:modelValue', newIndex);
            }
            this.restartTimer();
            this.$emit('change', newIndex); // BC
        },
        // Indicator trigger when change active item.
        modeChange(trigger, value) {
            if (this.indicatorMode === trigger) {
                return this.changeActive(value)
            }
        },
        prev() {
            this.changeActive(this.activeChild - 1, -1);
        },
        next() {
            this.changeActive(this.activeChild + 1, 1);
        },
        // handle drag event
        dragStart(event) {
            if (!this.hasDrag ||
                !event.target.draggable) return
            this.dragX = event.touches ? event.changedTouches[0].pageX : event.pageX;
            if (event.touches) {
                this.pauseTimer();
            } else {
                event.preventDefault();
            }
        },
        dragEnd(event) {
            if (this.dragX === false) return
            const detected = event.touches ? event.changedTouches[0].pageX : event.pageX;
            const diffX = detected - this.dragX;
            if (Math.abs(diffX) > 30) {
                if (diffX < 0) {
                    this.next();
                } else {
                    this.prev();
                }
            } else {
                event.target.click();
                this.sortedItems[this.activeChild].$emit('click');
                this.$emit('click');
            }
            if (event.touches) {
                this.startTimer();
            }
            this.dragX = false;
        }
    },
    mounted() {
        this.startTimer();
    },
    beforeUnmount() {
        this.pauseTimer();
    }
};

const _hoisted_1$1 = {
  key: 1,
  class: "carousel-pause"
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["carousel", {'is-overlay': $props.overlay}],
    onMouseenter: _cache[5] || (_cache[5] = (...args) => ($options.checkPause && $options.checkPause(...args))),
    onMouseleave: _cache[6] || (_cache[6] = (...args) => ($options.startTimer && $options.startTimer(...args)))
  }, [
    ($props.progress)
      ? (vue.openBlock(), vue.createBlock("progress", {
          key: 0,
          class: ["progress", $props.progressType],
          value: $data.activeChild,
          max: _ctx.childItems.length - 1
        }, vue.toDisplayString(_ctx.childItems.length - 1), 11 /* TEXT, CLASS, PROPS */, ["value", "max"]))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode("div", {
      class: "carousel-items",
      onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.dragStart && $options.dragStart(...args))),
      onMouseup: _cache[2] || (_cache[2] = (...args) => ($options.dragEnd && $options.dragEnd(...args))),
      onTouchstart: _cache[3] || (_cache[3] = vue.withModifiers((...args) => ($options.dragStart && $options.dragStart(...args)), ["stop"])),
      onTouchend: _cache[4] || (_cache[4] = vue.withModifiers((...args) => ($options.dragEnd && $options.dragEnd(...args)), ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default"),
      ($props.arrow)
        ? (vue.openBlock(), vue.createBlock("div", {
            key: 0,
            class: ["carousel-arrow", {'is-hovered': $props.arrowHover}]
          }, [
            vue.withDirectives(vue.createVNode(_component_b_icon, {
              class: "has-icons-left",
              onClick: $options.prev,
              pack: $props.iconPack,
              icon: $props.iconPrev,
              size: $props.iconSize,
              both: ""
            }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
              [vue.vShow, $options.hasPrev]
            ]),
            vue.withDirectives(vue.createVNode(_component_b_icon, {
              class: "has-icons-right",
              onClick: $options.next,
              pack: $props.iconPack,
              icon: $props.iconNext,
              size: $props.iconSize,
              both: ""
            }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
              [vue.vShow, $options.hasNext]
            ])
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ], 32 /* HYDRATE_EVENTS */),
    ($props.autoplay && $props.pauseHover && $props.pauseInfo && $data.isPause)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
          vue.createVNode("span", {
            class: ["tag", $props.pauseInfoType]
          }, vue.toDisplayString($props.pauseText), 3 /* TEXT, CLASS */)
        ]))
      : vue.createCommentVNode("v-if", true),
    ($props.withCarouselList && !$props.indicator)
      ? vue.renderSlot(_ctx.$slots, "list", {
          key: 2,
          active: $data.activeChild,
          switch: $options.changeActive
        })
      : vue.createCommentVNode("v-if", true),
    ($props.indicator)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 3,
          class: ["carousel-indicator", $options.indicatorClasses]
        }, [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.sortedItems, (item, index) => {
            return (vue.openBlock(), vue.createBlock("a", {
              class: ["indicator-item", {'is-active': item.isActive}],
              onMouseover: $event => ($options.modeChange('hover', index)),
              onClick: $event => ($options.modeChange('click', index)),
              key: item._uid
            }, [
              vue.renderSlot(_ctx.$slots, "indicators", { i: index }, () => [
                vue.createVNode("span", {
                  class: ["indicator-style", $props.indicatorStyle]
                }, null, 2 /* CLASS */)
              ])
            ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onMouseover", "onClick"]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    ($props.overlay)
      ? vue.renderSlot(_ctx.$slots, "overlay", { key: 4 })
      : vue.createCommentVNode("v-if", true)
  ], 34 /* CLASS, HYDRATE_EVENTS */))
}

script$2.render = render$2;
script$2.__file = "src/components/carousel/Carousel.vue";

var script$1 = {
    name: 'BCarouselItem',
    mixins: [InjectedChildMixin.InjectedChildMixin('carousel', InjectedChildMixin.Sorted$1)],
    data() {
        return {
            transitionName: null
        }
    },
    computed: {
        transition() {
            if (this.parent.animated === 'fade') {
                return 'fade'
            } else if (this.parent.transition) {
                return 'slide-' + this.parent.transition
            }
            return undefined
        },
        isActive() {
            return this.parent.activeChild === this.index
        }
    }
};

const _hoisted_1 = { class: "carousel-item" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, { name: $options.transition }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", _hoisted_1, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 512 /* NEED_PATCH */), [
        [vue.vShow, $options.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$1.render = render$1;
script$1.__file = "src/components/carousel/CarouselItem.vue";

var script = {
    name: 'BCarouselList',
    components: {
        [Icon.script.name]: Icon.script
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: Number,
            default: 0
        },
        scrollValue: {
            type: Number,
            default: 0
        },
        hasDrag: {
            type: Boolean,
            default: true
        },
        hasGrayscale: Boolean,
        hasOpacity: Boolean,
        repeat: Boolean,
        itemsToShow: {
            type: Number,
            default: 4
        },
        itemsToList: {
            type: Number,
            default: 1
        },
        asIndicator: Boolean,
        arrow: {
            type: Boolean,
            default: true
        },
        arrowHover: {
            type: Boolean,
            default: true
        },
        iconPack: String,
        iconSize: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.config.defaultIconNext
            }
        },
        breakpoints: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['switch', 'update:modelValue', 'updated:scroll'],
    data() {
        return {
            activeItem: this.modelValue,
            scrollIndex: this.asIndicator ? this.scrollValue : this.modelValue,
            delta: 0,
            dragX: false,
            hold: 0,
            windowWidth: 0,
            touch: false,
            observer: null,
            refresh_: 0
        }
    },
    computed: {
        dragging() {
            return this.dragX !== false
        },
        listClass() {
            return [
                {
                    'has-grayscale': this.settings.hasGrayscale,
                    'has-opacity': this.settings.hasOpacity,
                    'is-dragging': this.dragging
                }
            ]
        },
        itemStyle() {
            return `width: ${this.itemWidth}px;`
        },
        translation() {
            return -helpers.bound(
                this.delta + (this.scrollIndex * this.itemWidth), 0,
                (this.data.length - this.settings.itemsToShow) * this.itemWidth
            )
        },
        total() {
            return this.data.length - this.settings.itemsToShow
        },
        hasPrev() {
            return (this.settings.repeat || this.scrollIndex > 0)
        },
        hasNext() {
            return (this.settings.repeat || this.scrollIndex < this.total)
        },
        breakpointKeys() {
            return Object.keys(this.breakpoints).sort((a, b) => b - a)
        },
        settings() {
            const breakpoint = this.breakpointKeys.filter((breakpoint) => {
                if (this.windowWidth >= breakpoint) {
                    return true
                }
                return false
            })[0];
            if (breakpoint) {
                return { ...this.$props, ...this.breakpoints[breakpoint] }
            }
            return this.$props
        },
        itemWidth() {
            if (this.windowWidth) { // Ensure component is mounted
                /* eslint-disable-next-line */
                this.refresh_; // We force the computed property to refresh if this prop is changed

                const rect = this.$el.getBoundingClientRect();
                return rect.width / this.settings.itemsToShow
            }
            return 0
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        modelValue(value) {
            this.switchTo(this.asIndicator ? value - (this.itemsToShow - 3) / 2 : value);
            if (this.activeItem !== value) {
                this.activeItem = helpers.bound(value, 0, this.data.length - 1);
            }
        },
        scrollValue(value) {
            this.switchTo(value);
        }
    },
    methods: {
        resized() {
            this.windowWidth = window.innerWidth;
        },
        switchTo(newIndex) {
            if (newIndex === this.scrollIndex || isNaN(newIndex)) { return }

            if (this.settings.repeat) {
                newIndex = helpers.mod(newIndex, this.total + 1);
            }
            newIndex = helpers.bound(newIndex, 0, this.total);
            this.scrollIndex = newIndex;
            if (!this.asIndicator && this.modelValue !== newIndex) {
                this.$emit('update:modelValue', newIndex);
            } else if (this.scrollIndex !== newIndex) {
                this.$emit('updated:scroll', newIndex);
            }
        },
        next() {
            this.switchTo(this.scrollIndex + this.settings.itemsToList);
        },
        prev() {
            this.switchTo(this.scrollIndex - this.settings.itemsToList);
        },
        checkAsIndicator(value, event) {
            if (!this.asIndicator) return

            const dragEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
            if (this.hold - Date.now() > 2000 || Math.abs(this.dragX - dragEndX) > 10) return

            this.dragX = false;
            this.hold = 0;
            event.preventDefault();

            // Make the item appear in the middle
            this.activeItem = value;

            this.$emit('switch', value);
        },
        // handle drag event
        dragStart(event) {
            if (this.dragging || !this.settings.hasDrag || (event.button !== 0 && event.type !== 'touchstart')) return
            this.hold = Date.now();
            this.touch = !!event.touches;
            this.dragX = this.touch ? event.touches[0].clientX : event.clientX;
            window.addEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove);
            window.addEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd);
        },
        dragMove(event) {
            if (!this.dragging) return
            const dragEndX = event.touches
                ? (event.changedTouches[0] || event.touches[0]).clientX
                : event.clientX;
            this.delta = this.dragX - dragEndX;
            if (!event.touches) {
                event.preventDefault();
            }
        },
        dragEnd() {
            if (!this.dragging && !this.hold) return
            if (this.hold) {
                const signCheck = helpers.sign(this.delta);
                const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15);// Hack
                this.switchTo(this.scrollIndex + signCheck * results);
            }
            this.delta = 0;
            this.dragX = false;
            window.removeEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove);
            window.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd);
        },
        refresh() {
            this.$nextTick(() => {
                this.refresh_++;
            });
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (window.ResizeObserver) {
                this.observer = new ResizeObserver(this.refresh);
                this.observer.observe(this.$el);
            }
            window.addEventListener('resize', this.resized);
            document.addEventListener('animationend', this.refresh);
            document.addEventListener('transitionend', this.refresh);
            document.addEventListener('transitionstart', this.refresh);
            this.resized();
        }
        if (this.$attrs.config) {
            throw new Error('The config prop was removed, you need to use v-bind instead')
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            if (window.ResizeObserver) {
                this.observer.disconnect();
            }
            window.removeEventListener('resize', this.resized);
            document.removeEventListener('animationend', this.refresh);
            document.removeEventListener('transitionend', this.refresh);
            document.removeEventListener('transitionstart', this.refresh);
            this.dragEnd();
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_image = vue.resolveComponent("b-image");
  const _component_b_icon = vue.resolveComponent("b-icon");

  return (vue.openBlock(), vue.createBlock("div", {
    class: ["carousel-list", {'has-shadow': $data.scrollIndex > 0}],
    onMousedown: _cache[1] || (_cache[1] = vue.withModifiers((...args) => ($options.dragStart && $options.dragStart(...args)), ["prevent"])),
    onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.dragStart && $options.dragStart(...args)))
  }, [
    vue.createVNode("div", {
      class: ["carousel-slides", $options.listClass],
      style: 'transform:translateX('+$options.translation+'px)'
    }, [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.data, (list, index) => {
        return (vue.openBlock(), vue.createBlock("div", {
          class: ["carousel-slide", {'is-active': $props.asIndicator ? $data.activeItem === index : $data.scrollIndex === index}],
          onMouseup: $event => ($options.checkAsIndicator(index, $event)),
          onTouchend: $event => ($options.checkAsIndicator(index, $event)),
          key: index,
          style: $options.itemStyle
        }, [
          vue.renderSlot(_ctx.$slots, "item", vue.mergeProps({
            index: index,
            active: $data.activeItem,
            scroll: $data.scrollIndex
          }, list, { list: list }), () => [
            vue.createVNode(_component_b_image, vue.mergeProps({
              src: list.image
            }, list), null, 16 /* FULL_PROPS */, ["src"])
          ])
        ], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, ["onMouseup", "onTouchend"]))
      }), 128 /* KEYED_FRAGMENT */))
    ], 6 /* CLASS, STYLE */),
    ($props.arrow)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: ["carousel-arrow", {'is-hovered': $options.settings.arrowHover}]
        }, [
          vue.withDirectives(vue.createVNode(_component_b_icon, {
            class: "has-icons-left",
            onClick: vue.withModifiers($options.prev, ["prevent"]),
            pack: $options.settings.iconPack,
            icon: $options.settings.iconPrev,
            size: $options.settings.iconSize,
            both: ""
          }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
            [vue.vShow, $options.hasPrev]
          ]),
          vue.withDirectives(vue.createVNode(_component_b_icon, {
            class: "has-icons-right",
            onClick: vue.withModifiers($options.next, ["prevent"]),
            pack: $options.settings.iconPack,
            icon: $options.settings.iconNext,
            size: $options.settings.iconSize,
            both: ""
          }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
            [vue.vShow, $options.hasNext]
          ])
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true)
  ], 34 /* CLASS, HYDRATE_EVENTS */))
}

script.render = render;
script.__file = "src/components/carousel/CarouselList.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script$2);
    plugins.registerComponent(Vue, script$1);
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BCarousel = script$2;
exports.BCarouselItem = script$1;
exports.BCarouselList = script;
exports["default"] = Plugin;
