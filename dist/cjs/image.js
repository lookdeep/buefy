'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-2c63be1d.js');
var helpers = require('./helpers-0d6e2444.js');
var vue = require('vue');
var plugins = require('./plugins-82c06644.js');
require('./typeof-5baf6faf.js');

var script = {
    name: 'BImage',
    props: {
        src: String,
        alt: String,
        srcFallback: String,
        webpFallback: {
            type: String,
            default: () => {
                return config.config.defaultImageWebpFallback
            }
        },
        lazy: {
            type: Boolean,
            default: () => {
                return config.config.defaultImageLazy
            }
        },
        responsive: {
            type: Boolean,
            default: () => {
                return config.config.defaultImageResponsive
            }
        },
        ratio: {
            type: String,
            default: () => {
                return config.config.defaultImageRatio
            }
        },
        placeholder: String,
        srcset: String,
        srcsetSizes: Array,
        srcsetFormatter: {
            type: Function,
            default: (src, size, vm) => {
                if (typeof config.config.defaultImageSrcsetFormatter === 'function') {
                    return config.config.defaultImageSrcsetFormatter(src, size)
                } else {
                    return vm.formatSrcset(src, size)
                }
            }
        },
        rounded: {
            type: Boolean,
            default: false
        },
        captionFirst: {
            type: Boolean,
            default: false
        }
    },
    emits: ['load', 'error'],
    data() {
        return {
            clientWidth: 0,
            webpSupportVerified: false,
            webpSupported: false,
            useNativeLazy: false,
            observer: null,
            inViewPort: false,
            bulmaKnownRatio: ['square', '1by1', '5by4', '4by3', '3by2', '5by3', '16by9', 'b2y1', '3by1', '4by5', '3by4', '2by3', '3by5', '9by16', '1by2', '1by3'],
            loaded: false,
            failed: false
        }
    },
    computed: {
        ratioPattern() {
            return /([0-9]+)by([0-9]+)/
        },
        hasRatio() {
            return this.ratio && this.ratioPattern.test(this.ratio)
        },
        figureClasses() {
            const classes = { image: this.responsive };
            if (this.hasRatio && this.bulmaKnownRatio.indexOf(this.ratio) >= 0) {
                classes[`is-${this.ratio}`] = true;
            }
            return classes
        },
        figureStyles() {
            if (
                this.hasRatio &&
                this.bulmaKnownRatio.indexOf(this.ratio) < 0
            ) {
                const ratioValues = this.ratioPattern.exec(this.ratio);
                return {
                    paddingTop: `${(ratioValues[2] / ratioValues[1]) * 100}%`
                }
            }
            return undefined
        },
        imgClasses() {
            return {
                'is-rounded': this.rounded,
                'has-ratio': this.hasRatio
            }
        },
        srcExt() {
            return this.getExt(this.src)
        },
        isWepb() {
            return this.srcExt === 'webp'
        },
        computedSrc() {
            let src = this.src;
            if (this.failed && this.srcFallback) {
                src = this.srcFallback;
            }
            if (!this.webpSupported && this.isWepb && this.webpFallback) {
                if (this.webpFallback.startsWith('.')) {
                    return src.replace(/\.webp/gi, `${this.webpFallback}`)
                }
                return this.webpFallback
            }
            return src
        },
        computedWidth() {
            if (this.responsive && this.clientWidth > 0) {
                return this.clientWidth
            }
            return undefined
        },
        computedNativeLazy() {
            if (this.lazy && this.useNativeLazy) {
                return 'lazy'
            }
            return undefined
        },
        isDisplayed() {
            return (
                (this.webpSupportVerified || !this.isWepb) &&
                (!this.lazy || this.useNativeLazy || this.inViewPort)
            )
        },
        placeholderExt() {
            if (this.placeholder) {
                return this.getExt(this.placeholder)
            }
            return undefined
        },
        isPlaceholderWepb() {
            if (this.placeholder) {
                return this.placeholderExt === 'webp'
            }
            return false
        },
        computedPlaceholder() {
            if (!this.webpSupported && this.isPlaceholderWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
                return this.placeholder.replace(/\.webp/gi, `${this.webpFallback}`)
            }
            return this.placeholder
        },
        isPlaceholderDisplayed() {
            return (
                !this.loaded &&
                (
                    this.$slots.placeholder || (
                        this.placeholder &&
                        (this.webpSupportVerified || !this.isPlaceholderWepb)
                    )
                )
            )
        },
        computedSrcset() {
            if (this.srcset) {
                if (!this.webpSupported && this.isWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
                    return this.srcset.replace(/\.webp/gi, `${this.webpFallback}`)
                }
                return this.srcset
            }
            if (
                this.srcsetSizes && Array.isArray(this.srcsetSizes) && this.srcsetSizes.length > 0
            ) {
                return this.srcsetSizes.map((size) => {
                    return `${this.srcsetFormatter(this.computedSrc, size, this)} ${size}w`
                }).join(',')
            }
            return undefined
        },
        computedSizes() {
            if (this.computedSrcset && this.computedWidth) {
                return `${this.computedWidth}px`
            }
            return undefined
        },
        isCaptionFirst() {
            return this.$slots.caption && this.captionFirst
        },
        isCaptionLast() {
            return this.$slots.caption && !this.captionFirst
        }
    },
    methods: {
        getExt(filename, clean = true) {
            if (filename) {
                const noParam = clean ? filename.split('?')[0] : filename;
                return noParam.split('.').pop()
            }
            return ''
        },
        setWidth() {
            this.clientWidth = this.$el.clientWidth;
        },
        formatSrcset(src, size) {
            const ext = this.getExt(src, false);
            const name = src.split('.').slice(0, -1).join('.');
            return `${name}-${size}.${ext}`
        },
        onLoad(event) {
            this.loaded = true;
            this.emit('load', event);
        },
        onError(event) {
            this.emit('error', event);
            if (!this.failed) {
                this.failed = true;
            }
        },
        emit(eventName, event) {
            const { target } = event;
            this.$emit(eventName, event, target.currentSrc || target.src || this.computedSrc);
        }
    },
    created() {
        if (this.isWepb) {
            helpers.isWebpSupported().then((supported) => {
                this.webpSupportVerified = true;
                this.webpSupported = supported;
            });
        }
        if (this.lazy) {
            // We use native lazy loading if supported
            // We try to use Intersection Observer if native lazy loading is not supported
            // We use the lazy attribute anyway if we cannot detect support (SSR for example).
            const nativeLazySupported = typeof window !== 'undefined' && 'HTMLImageElement' in window && 'loading' in HTMLImageElement.prototype;
            const intersectionObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;
            if (!nativeLazySupported && intersectionObserverSupported) {
                this.observer = new IntersectionObserver((events) => {
                    const { target, isIntersecting } = events[0];
                    if (isIntersecting && !this.inViewPort) {
                        this.inViewPort = true;
                        this.observer.unobserve(target);
                    }
                });
            } else {
                this.useNativeLazy = true;
            }
        }
    },
    mounted() {
        if (this.lazy && this.observer) {
            this.observer.observe(this.$el);
        }
        this.setWidth();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.setWidth);
        }
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.setWidth);
        }
    }
};

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("figure", {
    class: ["b-image-wrapper", $options.figureClasses],
    style: $options.figureStyles
  }, [
    ($options.isCaptionFirst)
      ? (vue.openBlock(), vue.createBlock("figcaption", _hoisted_1, [
          vue.renderSlot(_ctx.$slots, "caption")
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode(vue.Transition, { name: "fade" }, {
      default: vue.withCtx(() => [
        ($options.isDisplayed)
          ? (vue.openBlock(), vue.createBlock("img", {
              key: 0,
              srcset: $options.computedSrcset,
              src: $options.computedSrc,
              alt: $props.alt,
              class: $options.imgClasses,
              width: $options.computedWidth,
              sizes: $options.computedSizes,
              loading: $options.computedNativeLazy,
              onLoad: _cache[1] || (_cache[1] = (...args) => ($options.onLoad && $options.onLoad(...args))),
              onError: _cache[2] || (_cache[2] = (...args) => ($options.onError && $options.onError(...args)))
            }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["srcset", "src", "alt", "width", "sizes", "loading"]))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }),
    vue.createVNode(vue.Transition, { name: "fade" }, {
      default: vue.withCtx(() => [
        ($options.isPlaceholderDisplayed)
          ? vue.renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
              vue.createVNode("img", {
                src: $options.computedPlaceholder,
                alt: $props.alt,
                class: [$options.imgClasses, "placeholder"]
              }, null, 10 /* CLASS, PROPS */, ["src", "alt"])
            ])
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }),
    ($options.isCaptionLast)
      ? (vue.openBlock(), vue.createBlock("figcaption", _hoisted_2, [
          vue.renderSlot(_ctx.$slots, "caption")
        ]))
      : vue.createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

script.render = render;
script.__file = "src/components/image/Image.vue";

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, script);
  }
};
plugins.use(Plugin);

exports.BImage = script;
exports["default"] = Plugin;
