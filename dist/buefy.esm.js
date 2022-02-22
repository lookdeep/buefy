/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
import { Fragment, Comment, Text, Static, openBlock, createBlock, resolveDynamicComponent, resolveComponent, mergeProps, createCommentVNode, toDisplayString, createVNode, withKeys, withModifiers, Transition, withCtx, withDirectives, renderSlot, renderList, vShow, vModelCheckbox, h, resolveDirective, createTextVNode, createSlots, vModelSelect, toHandlers, vModelDynamic, createApp, vModelRadio, toHandlerKey } from 'vue';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * +/- function to native math sign
 */

function signPoly(value) {
  if (value < 0) return -1;
  return value > 0 ? 1 : 0;
}

var sign = Math.sign || signPoly;
/**
 * Checks if the flag is set
 * @param val
 * @param flag
 * @returns {boolean}
 */

function hasFlag(val, flag) {
  return (val & flag) === flag;
}
/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 */


function mod(n, mod) {
  return (n % mod + mod) % mod;
}
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
/**
 * Get value of an object property/path even if it's nested
 */

function getValueByPath(obj, path) {
  return path.split('.').reduce(function (o, i) {
    return o ? o[i] : null;
  }, obj);
}
/**
 * Extension of indexOf method by equality function if specified
 */

function indexOf(array, obj, fn) {
  if (!array) return -1;
  if (!fn || typeof fn !== 'function') return array.indexOf(obj);

  for (var i = 0; i < array.length; i++) {
    if (fn(array[i], obj)) {
      return i;
    }
  }

  return -1;
}
/**
 * Merge function to replace Object.assign with deep merging possibility
 */

var isObject = function isObject(item) {
  return _typeof(item) === 'object' && !Array.isArray(item);
};

var mergeFn = function mergeFn(target, source) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (deep || !Object.assign) {
    var isDeep = function isDeep(prop) {
      return isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);
    };

    var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
      return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
    }).reduce(function (a, b) {
      return _objectSpread$9(_objectSpread$9({}, a), b);
    }, {});
    return _objectSpread$9(_objectSpread$9({}, target), replaced);
  } else {
    return Object.assign(target, source);
  }
};

var merge = mergeFn;
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */

var isMobile = {
  Android: function Android() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
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
function isVueComponent(c) {
  return c && c._isVue;
}
/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */

function escapeRegExpChars(value) {
  if (!value) return value; // eslint-disable-next-line

  return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
function multiColumnSort(inputArray, sortingPriority) {
  // clone it to prevent the any watchers from triggering every sorting iteration
  var array = JSON.parse(JSON.stringify(inputArray));

  var fieldSorter = function fieldSorter(fields) {
    return function (a, b) {
      return fields.map(function (o) {
        var dir = 1;

        if (o[0] === '-') {
          dir = -1;
          o = o.substring(1);
        }

        var aValue = getValueByPath(a, o);
        var bValue = getValueByPath(b, o);
        return aValue > bValue ? dir : aValue < bValue ? -dir : 0;
      }).reduce(function (p, n) {
        return p || n;
      }, 0);
    };
  };

  return array.sort(fieldSorter(sortingPriority));
}
function createNewEvent(eventName) {
  var event;

  if (typeof Event === 'function') {
    event = new Event(eventName);
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }

  return event;
}
function toCssWidth(width) {
  return width === undefined ? null : isNaN(width) ? width : width + 'px';
}
/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 */

function getMonthNames() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'long';
  var dates = [];

  for (var i = 0; i < 12; i++) {
    dates.push(new Date(2000, i, 15));
  }

  var dtf = new Intl.DateTimeFormat(locale, {
    month: format,
    timeZone: 'UTC'
  });
  return dates.map(function (d) {
    return dtf.format(d);
  });
}
/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 */

function getWeekdayNames() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'narrow';
  var dates = [];

  for (var i = 0; i < 7; i++) {
    var dt = new Date(2000, 0, i + 1);
    dates[dt.getDay()] = dt;
  }

  var dtf = new Intl.DateTimeFormat(locale, {
    weekday: format
  });
  return dates.map(function (d) {
    return dtf.format(d);
  });
}
/**
 * Accept a regex with group names and return an object
 * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
 * will return { year: 2000, month: 12, day: 25 }
 * @param  {String} includes injections of (?!={groupname}) for each group
 * @param  {String} the string to run regex
 * @return {Object} an object with a property for each group having the group's match as the value
 */

function matchWithGroups(pattern, str) {
  var matches = str.match(pattern);
  return pattern // get the pattern as a string
  .toString() // suss out the groups
  .match(/<(.+?)>/g) // remove the braces
  .map(function (group) {
    var groupMatches = group.match(/<(.+)>/);

    if (!groupMatches || groupMatches.length <= 0) {
      return null;
    }

    return group.match(/<(.+)>/)[1];
  }) // create an object with a property for each group having the group's match as the value
  .reduce(function (acc, curr, index, arr) {
    if (matches && matches.length > index) {
      acc[curr] = matches[index + 1];
    } else {
      acc[curr] = null;
    }

    return acc;
  }, {});
}
/**
 * Based on
 * https://github.com/fregante/supports-webp
 */

function isWebpSupported() {
  return new Promise(function (resolve) {
    var image = new Image();

    image.onerror = function () {
      return resolve(false);
    };

    image.onload = function () {
      return resolve(image.width === 1);
    };

    image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }).catch(function () {
    return false;
  });
}
function isCustomElement(vm) {
  return 'shadowRoot' in vm.$root.$options;
}
var isDefined = function isDefined(d) {
  return d !== undefined;
};
function isFragment(vnode) {
  return vnode.type === Fragment;
} // TODO: replacement of vnode.tag test

function isTag(vnode) {
  return vnode.type !== Comment && vnode.type !== Text && vnode.type !== Static;
} // TODO: too much dependence of Vue's internal structure?

function getComponentFromVNode(vnode) {
  if (!vnode) {
    return undefined;
  }

  var component = vnode.component;

  if (!component) {
    return undefined;
  }

  return component.expose ? component.expose : component.proxy;
}

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
var setOptions = function setOptions(options) {
  config = options;
};

var FormElementMixin = {
  props: {
    size: String,
    expanded: Boolean,
    loading: Boolean,
    rounded: Boolean,
    icon: String,
    iconPack: String,
    // Native options to use in HTML5 validation
    autocomplete: String,
    maxlength: [Number, String],
    useHtml5Validation: {
      type: Boolean,
      default: function _default() {
        return config.defaultUseHtml5Validation;
      }
    },
    validationMessage: String,
    locale: {
      type: [String, Array],
      default: function _default() {
        return config.defaultLocale;
      }
    },
    statusIcon: {
      type: Boolean,
      default: function _default() {
        return config.defaultStatusIcon;
      }
    }
  },
  emits: ['blur', 'focus'],
  data: function data() {
    return {
      isValid: true,
      isFocused: false,
      newIconPack: this.iconPack || config.defaultIconPack
    };
  },
  computed: {
    /**
     * Find parent Field, max 3 levels deep.
     */
    parentField: function parentField() {
      var parent = this.$parent;

      for (var i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }

      return parent;
    },

    /**
     * Get the type prop from parent if it's a Field.
     */
    statusType: function statusType() {
      var _ref = this.parentField || {},
          newType = _ref.newType;

      if (!newType) return;

      if (typeof newType === 'string') {
        return newType;
      } else {
        for (var key in newType) {
          if (newType[key]) {
            return key;
          }
        }
      }
    },

    /**
     * Get the message prop from parent if it's a Field.
     */
    statusMessage: function statusMessage() {
      if (!this.parentField) return;
      return this.parentField.newMessage || this.parentField.$slots.message;
    },

    /**
     * Fix icon size for inputs, large was too big
     */
    iconSize: function iconSize() {
      switch (this.size) {
        case 'is-small':
          return this.size;

        case 'is-medium':
          return;

        case 'is-large':
          return this.newIconPack === 'mdi' ? 'is-medium' : '';
      }
    }
  },
  methods: {
    /**
     * Focus method that work dynamically depending on the component.
     */
    focus: function focus() {
      var el = this.getElement();
      if (el === undefined) return;
      this.$nextTick(function () {
        if (el) el.focus();
      });
    },
    onBlur: function onBlur($event) {
      this.isFocused = false;
      this.$emit('blur', $event);
      this.checkHtml5Validity();
    },
    onFocus: function onFocus($event) {
      this.isFocused = true;
      this.$emit('focus', $event);
    },
    getElement: function getElement() {
      var el = this.$refs[this.$data._elementRef];

      while (el != null && '$refs' in el) {
        el = el.$refs[el.$data._elementRef];
      }

      return el;
    },
    setInvalid: function setInvalid() {
      var type = 'is-danger';
      var message = this.validationMessage || this.getElement().validationMessage;
      this.setValidity(type, message);
    },
    setValidity: function setValidity(type, message) {
      var _this = this;

      this.$nextTick(function () {
        if (_this.parentField) {
          // Set type only if not defined
          if (!_this.parentField.type) {
            _this.parentField.newType = type;
          } // Set message only if not defined


          if (!_this.parentField.message) {
            _this.parentField.newMessage = message;
          }
        }
      });
    },

    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'is-danger' type,
     * and error message to parent if it's a Field.
     */
    checkHtml5Validity: function checkHtml5Validity() {
      if (!this.useHtml5Validation) return;
      var el = this.getElement();
      if (el == null) return;

      if (!el.checkValidity()) {
        this.setInvalid();
        this.isValid = false;
      } else {
        this.setValidity(null, null);
        this.isValid = true;
      }

      return this.isValid;
    }
  }
};

var mdiIcons = {
  sizes: {
    default: 'mdi-24px',
    'is-small': null,
    'is-medium': 'mdi-36px',
    'is-large': 'mdi-48px'
  },
  iconPrefix: 'mdi-'
};

var faIcons = function faIcons() {
  var faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-';
  return {
    sizes: {
      default: null,
      'is-small': null,
      'is-medium': faIconPrefix + 'lg',
      'is-large': faIconPrefix + '2x'
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
      information: 'info-circle',
      alert: 'exclamation-triangle',
      'alert-circle': 'exclamation-circle',
      'chevron-right': 'angle-right',
      'chevron-left': 'angle-left',
      'chevron-down': 'angle-down',
      'eye-off': 'eye-slash',
      'menu-down': 'caret-down',
      'menu-up': 'caret-up',
      'close-circle': 'times-circle'
    }
  };
};

var getIcons = function getIcons() {
  var icons = {
    mdi: mdiIcons,
    fa: faIcons(),
    fas: faIcons(),
    far: faIcons(),
    fad: faIcons(),
    fab: faIcons(),
    fal: faIcons()
  };

  if (config && config.customIconPacks) {
    icons = merge(icons, config.customIconPacks, true);
  }

  return icons;
};

var getIcons$1 = getIcons;

var script$11 = {
    name: 'BIcon',
    props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: String,
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean // This is used internally to show both MDI and FA icon
    },
    computed: {
        iconConfig() {
            const allIcons = getIcons$1();
            return allIcons[this.newPack]
        },
        iconPrefix() {
            if (this.iconConfig && this.iconConfig.iconPrefix) {
                return this.iconConfig.iconPrefix
            }
            return ''
        },
        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
            return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
        },
        newPack() {
            return this.pack || config.defaultIconPack
        },
        newType() {
            if (!this.type) return

            let splitType = [];
            if (typeof this.type === 'string') {
                splitType = this.type.split('-');
            } else {
                for (const key in this.type) {
                    if (this.type[key]) {
                        splitType = key.split('-');
                        break
                    }
                }
            }
            if (splitType.length <= 1) return

            const [, ...type] = splitType;
            return `has-text-${type.join('-')}`
        },
        newCustomSize() {
            return this.customSize || this.customSizeByPack
        },
        customSizeByPack() {
            if (this.iconConfig && this.iconConfig.sizes) {
                if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
                    return this.iconConfig.sizes[this.size]
                } else if (this.iconConfig.sizes.default) {
                    return this.iconConfig.sizes.default
                }
            }
            return null
        },
        useIconComponent() {
            return this.component || config.defaultIconComponent
        }
    },
    methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value
            }

            if (this.iconConfig &&
                this.iconConfig.internalIcons &&
                this.iconConfig.internalIcons[value]) {
                return this.iconConfig.internalIcons[value]
            }
            return value
        }
    }
};

function render$V(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("span", {
    class: ["icon", [$options.newType, $props.size]]
  }, [
    (!$options.useIconComponent)
      ? (openBlock(), createBlock("i", {
          key: 0,
          class: [$options.newPack, $options.newIcon, $options.newCustomSize, $props.customClass]
        }, null, 2 /* CLASS */))
      : (openBlock(), createBlock(resolveDynamicComponent($options.useIconComponent), {
          key: 1,
          icon: [$options.newPack, $options.newIcon],
          size: $options.newCustomSize,
          class: [$props.customClass]
        }, null, 8 /* PROPS */, ["icon", "size", "class"]))
  ], 2 /* CLASS */))
}

script$11.render = render$V;
script$11.__file = "src/components/icon/Icon.vue";

var script$10 = {
    name: 'BInput',
    components: {
        [script$11.name]: script$11
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: [Number, String],
        type: {
            type: String,
            default: 'text'
        },
        lazy: {
            type: Boolean,
            default: false
        },
        passwordReveal: Boolean,
        iconClickable: Boolean,
        hasCounter: {
            type: Boolean,
            default: () => config.defaultInputHasCounter
        },
        customClass: {
            type: String,
            default: ''
        },
        iconRight: String,
        iconRightClickable: Boolean,
        iconRightType: String
    },
    emits: [
        'icon-click',
        'icon-right-click',
        'update:modelValue'
    ],
    data() {
        return {
            newValue: this.modelValue,
            newType: this.type,
            newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
            isPasswordVisible: false,
            _elementRef: this.type === 'textarea'
                ? 'textarea'
                : 'input'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value;
                this.$emit('update:modelValue', value);
            }
        },
        rootClasses() {
            return [
                this.iconPosition,
                this.size,
                {
                    'is-expanded': this.expanded,
                    'is-loading': this.loading,
                    'is-clearfix': !this.hasMessage
                }
            ]
        },
        inputClasses() {
            return [
                this.statusType,
                this.size,
                { 'is-rounded': this.rounded }
            ]
        },
        hasIconRight() {
            return this.passwordReveal ||
                this.loading || (this.statusIcon && this.statusTypeIcon) || this.iconRight
        },
        rightIcon() {
            if (this.passwordReveal) {
                return this.passwordVisibleIcon
            } else if (this.iconRight) {
                return this.iconRight
            }
            return this.statusTypeIcon
        },
        rightIconType() {
            if (this.passwordReveal) {
                return 'is-primary'
            } else if (this.iconRight) {
                return this.iconRightType || null
            }
            return this.statusType
        },

        /**
        * Position of the icon or if it's both sides.
        */
        iconPosition() {
            let iconClasses = '';

            if (this.icon) {
                iconClasses += 'has-icons-left ';
            }

            if (this.hasIconRight) {
                iconClasses += 'has-icons-right';
            }

            return iconClasses
        },

        /**
        * Icon name (MDI) based on the type.
        */
        statusTypeIcon() {
            switch (this.statusType) {
                case 'is-success': return 'check'
                case 'is-danger': return 'alert-circle'
                case 'is-info': return 'information'
                case 'is-warning': return 'alert'
                default: return undefined
            }
        },

        /**
        * Check if have any message prop from parent if it's a Field.
        */
        hasMessage() {
            return !!this.statusMessage
        },

        /**
        * Current password-reveal icon name.
        */
        passwordVisibleIcon() {
            return !this.isPasswordVisible ? 'eye' : 'eye-off'
        },
        /**
        * Get value length
        */
        valueLength() {
            if (typeof this.computedValue === 'string') {
                return this.computedValue.length
            } else if (typeof this.computedValue === 'number') {
                return this.computedValue.toString().length
            }
            return 0
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set internal value.
        */
        modelValue(value) {
            this.newValue = value;
        }
    },
    methods: {
        /**
        * Toggle the visibility of a password-reveal input
        * by changing the type and focus the input right away.
        */
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
            this.newType = this.isPasswordVisible ? 'text' : 'password';

            this.$nextTick(() => {
                this.focus();
            });
        },

        iconClick(emit, event) {
            this.$emit(emit, event);
            this.$nextTick(() => {
                this.focus();
            });
        },

        rightIconClick(event) {
            if (this.passwordReveal) {
                this.togglePasswordVisibility();
            } else if (this.iconRightClickable) {
                this.iconClick('icon-right-click', event);
            }
        },

        onInput(event) {
            if (!this.lazy) {
                const value = event.target.value;
                this.updateValue(value);
            }
        },

        onChange(event) {
            if (this.lazy) {
                const value = event.target.value;
                this.updateValue(value);
            }
        },

        updateValue(value) {
            this.computedValue = value;
            !this.isValid && this.checkHtml5Validity();
        }
    }
};

function render$U(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["control", $options.rootClasses]
  }, [
    ($props.type !== 'textarea')
      ? (openBlock(), createBlock("input", mergeProps({
          key: 0,
          ref: "input",
          class: ["input", [$options.inputClasses, $props.customClass]],
          type: $data.newType,
          autocomplete: $data.newAutocomplete,
          maxlength: _ctx.maxlength,
          value: $options.computedValue
        }, _ctx.$attrs, {
          onInput: _cache[1] || (_cache[1] = (...args) => ($options.onInput && $options.onInput(...args))),
          onChange: _cache[2] || (_cache[2] = (...args) => ($options.onChange && $options.onChange(...args))),
          onBlur: _cache[3] || (_cache[3] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
          onFocus: _cache[4] || (_cache[4] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args)))
        }), null, 16 /* FULL_PROPS */, ["type", "autocomplete", "maxlength", "value"]))
      : (openBlock(), createBlock("textarea", mergeProps({
          key: 1,
          ref: "textarea",
          class: ["textarea", [$options.inputClasses, $props.customClass]],
          maxlength: _ctx.maxlength,
          value: $options.computedValue
        }, _ctx.$attrs, {
          onInput: _cache[5] || (_cache[5] = (...args) => ($options.onInput && $options.onInput(...args))),
          onChange: _cache[6] || (_cache[6] = (...args) => ($options.onChange && $options.onChange(...args))),
          onBlur: _cache[7] || (_cache[7] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
          onFocus: _cache[8] || (_cache[8] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args)))
        }), null, 16 /* FULL_PROPS */, ["maxlength", "value"])),
    (_ctx.icon)
      ? (openBlock(), createBlock(_component_b_icon, {
          key: 2,
          class: ["is-left", {'is-clickable': $props.iconClickable}],
          icon: _ctx.icon,
          pack: _ctx.iconPack,
          size: _ctx.iconSize,
          onClick: _cache[9] || (_cache[9] = $event => ($options.iconClick('icon-click', $event)))
        }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"]))
      : createCommentVNode("v-if", true),
    (!_ctx.loading && $options.hasIconRight)
      ? (openBlock(), createBlock(_component_b_icon, {
          key: 3,
          class: ["is-right", { 'is-clickable': $props.passwordReveal || $props.iconRightClickable }],
          icon: $options.rightIcon,
          pack: _ctx.iconPack,
          size: _ctx.iconSize,
          type: $options.rightIconType,
          both: "",
          onClick: $options.rightIconClick
        }, null, 8 /* PROPS */, ["class", "icon", "pack", "size", "type", "onClick"]))
      : createCommentVNode("v-if", true),
    (_ctx.maxlength && $props.hasCounter && $props.type !== 'number')
      ? (openBlock(), createBlock("small", {
          key: 4,
          class: ["help counter", { 'is-invisible': !_ctx.isFocused }]
        }, toDisplayString($options.valueLength) + " / " + toDisplayString(_ctx.maxlength), 3 /* TEXT, CLASS */))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$10.render = render$U;
script$10.__file = "src/components/input/Input.vue";

var script$$ = {
    name: 'BAutocomplete',
    components: {
        [script$10.name]: script$10
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: [Number, String],
        data: {
            type: Array,
            default: () => []
        },
        field: {
            type: String,
            default: 'value'
        },
        keepFirst: Boolean,
        clearOnSelect: Boolean,
        openOnFocus: Boolean,
        customFormatter: Function,
        checkInfiniteScroll: Boolean,
        keepOpen: Boolean,
        clearable: Boolean,
        maxHeight: [String, Number],
        dropdownPosition: {
            type: String,
            default: 'auto'
        },
        groupField: String,
        groupOptions: String,
        iconRight: String,
        iconRightClickable: Boolean,
        appendToBody: Boolean,
        confirmKeys: {
            type: Array,
            default: () => ['Tab', 'Enter']
        }
    },
    emits: [
        'blur',
        'focus',
        'icon-click',
        'icon-right-click',
        'infinite-scroll',
        'select',
        'typing',
        'update:modelValue'
    ],
    data() {
        return {
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.modelValue,
            newAutocomplete: this.autocomplete || 'off',
            isListInViewportVertically: true,
            hasFocus: false,
            style: {},
            _isAutocomplete: true,
            _elementRef: 'input',
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        computedData() {
            if (this.groupField) {
                if (this.groupOptions) {
                    const newData = [];
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField);
                        const items = getValueByPath(option, this.groupOptions);
                        newData.push({ group, items });
                    });
                    return newData
                } else {
                    const tmp = {};
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField);
                        if (!tmp[group]) tmp[group] = [];
                        tmp[group].push(option);
                    });
                    const newData = [];
                    Object.keys(tmp).forEach((group) => {
                        newData.push({ group, items: tmp[group] });
                    });
                    return newData
                }
            }
            return [{ items: this.data }]
        },
        isEmpty() {
            if (!this.computedData) return true
            return !this.computedData.some((element) => element.items && element.items.length)
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = [];
            whiteList.push(this.$refs.input.$el.querySelector('input'));
            whiteList.push(this.$refs.dropdown);
            // Add all children from dropdown
            if (this.$refs.dropdown != null) {
                const children = this.$refs.dropdown.querySelectorAll('*');
                for (const child of children) {
                    whiteList.push(child);
                }
            }
            if (this.$parent.$data._isTaginput) {
                // Add taginput container
                whiteList.push(this.$parent.$el);
                // Add .tag and .delete
                const tagInputChildren = this.$parent.$el.querySelectorAll('*');
                for (const tagInputChild of tagInputChildren) {
                    whiteList.push(tagInputChild);
                }
            }

            return whiteList
        },

        /**
         * Check if exists default slot
         */
        hasDefaultSlot() {
            return !!this.$slots.default
        },

        /**
         * Check if exists group slot
         */
        hasGroupSlot() {
            return !!this.$slots.group
        },

        /**
         * Check if exists "empty" slot
         */
        hasEmptySlot() {
            return !!this.$slots.empty
        },

        /**
         * Check if exists "header" slot
         */
        hasHeaderSlot() {
            return !!this.$slots.header
        },

        /**
         * Check if exists "footer" slot
         */
        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Apply dropdownPosition property
         */
        isOpenedTop() {
            return (
                this.dropdownPosition === 'top' ||
                    (this.dropdownPosition === 'auto' && !this.isListInViewportVertically)
            )
        },

        newIconRight() {
            if (this.clearable && this.newValue) {
                return 'close-circle'
            }
            return this.iconRight
        },

        newIconRightClickable() {
            if (this.clearable) {
                return true
            }
            return this.iconRightClickable
        },

        contentStyle() {
            return {
                maxHeight: toCssWidth(this.maxHeight)
            }
        }
    },
    watch: {
        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(active) {
            if (this.dropdownPosition === 'auto') {
                if (active) {
                    this.calcDropdownInViewportVertical();
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical();
                    }, 100);
                }
            }
        },

        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
            this.$emit('update:modelValue', value);
            // Check if selected is invalid
            const currentValue = this.getValue(this.selected);
            if (currentValue && currentValue !== value) {
                this.setSelected(null, false);
            }
            // Close dropdown if input is clear or else open it
            if (this.hasFocus && (!this.openOnFocus || value)) {
                this.isActive = !!value;
            }
        },

        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value;
        },

        /**
         * Select first option if "keep-first
         */
        data() {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.$nextTick(() => {
                    if (this.isActive) {
                        this.selectFirstOption(this.computedData);
                    }
                });
            }
        }
    },
    methods: {
        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
            if (option === undefined) return

            this.hovered = option;
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected(option, closeDropdown = true, event = undefined) {
            if (option === undefined) return

            this.selected = option;
            this.$emit('select', this.selected, event);
            if (this.selected !== null) {
                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
                this.setHovered(null);
            }
            closeDropdown && this.$nextTick(() => {
                this.isActive = false;
            });
            this.checkValidity();
        },

        /**
         * Select first option
         */
        selectFirstOption(element) {
            this.$nextTick(() => {
                if (element.length) {
                    // If has visible data or open on focus, keep updating the hovered
                    const option = element[0].items[0];
                    if (this.openOnFocus || (this.newValue !== '' && this.hovered !== option)) {
                        this.setHovered(option);
                    }
                } else {
                    this.setHovered(null);
                }
            });
        },

        keydown(event) {
            const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            // prevent emit submit event
            if (key === 'Enter') event.preventDefault();
            // Close dropdown on Tab & no hovered
            this.isActive = key !== 'Tab';
            if (this.hovered === null) return
            if (this.confirmKeys.indexOf(key) >= 0) {
                // If adding by comma, don't add the comma to the input
                if (key === ',') event.preventDefault();

                // Close dropdown on select by Tab
                const closeDropdown = !this.keepOpen || key === 'Tab';
                this.setSelected(this.hovered, closeDropdown, event);
            }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
            if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
                if (this.keepFirst && this.hovered) {
                    this.setSelected(this.hovered, true);
                } else {
                    this.isActive = false;
                }
            }
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
            if (option === null) return

            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(option)
            }
            return typeof option === 'object' ? getValueByPath(option, this.field) : option
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll(list) {
            if (list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight >= list.scrollHeight
            ) {
                this.$emit('infinite-scroll');
            }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
            this.$nextTick(() => {
                /**
                 * this.$refs.dropdown may be undefined
                 * when Autocomplete is conditional rendered
                 */
                if (this.$refs.dropdown == null) return

                const rect = this.$refs.dropdown.getBoundingClientRect();

                this.isListInViewportVertically = rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                if (this.appendToBody) {
                    this.updateAppendToBody();
                }
            });
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1;
            if (this.isActive) {
                const data = this.computedData.map(
                    (d) => d.items).reduce((a, b) => ([...a, ...b]), []);
                let index = data.indexOf(this.hovered) + sum;
                index = index > data.length - 1 ? data.length - 1 : index;
                index = index < 0 ? 0 : index;

                this.setHovered(data[index]);

                const list = this.$refs.dropdown.querySelector('.dropdown-content');
                const element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index];

                if (!element) return

                const visMin = list.scrollTop;
                const visMax = list.scrollTop + list.clientHeight - element.clientHeight;

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop;
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
                }
            } else {
                this.isActive = true;
            }
        },

        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
                this.$el.querySelector('input').select();
            }
            if (this.openOnFocus) {
                this.isActive = true;
                if (this.keepFirst) {
                    this.selectFirstOption(this.computedData);
                }
            }
            this.hasFocus = true;
            this.$emit('focus', event);
        },

        /**
         * Blur listener.
         */
        onBlur(event) {
            this.hasFocus = false;
            this.$emit('blur', event);
        },
        onInput(event) {
            const currentValue = this.getValue(this.selected);
            if (currentValue && currentValue === this.newValue) return
            this.$emit('typing', this.newValue);
            this.checkValidity();
        },
        rightIconClick(event) {
            if (this.clearable) {
                this.newValue = '';
                this.setSelected(null, false);
                if (this.openOnFocus) {
                    this.$refs.input.$el.focus();
                }
            } else {
                this.$emit('icon-right-click', event);
            }
        },
        checkValidity() {
            if (this.useHtml5Validation) {
                this.$nextTick(() => {
                    this.checkHtml5Validity();
                });
            }
        },
        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdown;
            const trigger = this.$refs.input.$el;
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const root = this.$data._bodyEl;
                root.classList.forEach((item) => root.classList.remove(item));
                root.classList.add('autocomplete');
                root.classList.add('control');
                if (this.expandend) {
                    root.classList.add('is-expandend');
                }
                const rect = trigger.getBoundingClientRect();
                let top = rect.top + window.scrollY;
                const left = rect.left + window.scrollX;
                if (!this.isOpenedTop) {
                    top += trigger.clientHeight;
                } else {
                    top -= dropdownMenu.clientHeight;
                }
                this.style = {
                    position: 'absolute',
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${trigger.clientWidth}px`,
                    maxWidth: `${trigger.clientWidth}px`,
                    zIndex: '99'
                };
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
            if (this.dropdownPosition === 'auto') { window.addEventListener('resize', this.calcDropdownInViewportVertical); }
        }
    },
    mounted() {
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
        ) {
            const list = this.$refs.dropdown.querySelector('.dropdown-content');
            list.addEventListener('scroll', () => this.checkIfReachedTheEndOfScroll(list));
        }
        if (this.appendToBody) {
            this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdown);
            this.updateAppendToBody();
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
            if (this.dropdownPosition === 'auto') { window.removeEventListener('resize', this.calcDropdownInViewportVertical); }
        }
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')
        ) {
            const list = this.$refs.dropdown.querySelector('.dropdown-content');
            list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
        }
        if (this.appendToBody) {
            removeElement(this.$data._bodyEl);
        }
    }
};

const _hoisted_1$E = {
  key: 0,
  class: "dropdown-item"
};
const _hoisted_2$k = {
  key: 1,
  class: "has-text-weight-bold"
};
const _hoisted_3$f = { key: 1 };
const _hoisted_4$a = {
  key: 1,
  class: "dropdown-item is-disabled"
};
const _hoisted_5$7 = {
  key: 2,
  class: "dropdown-item"
};

function render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");

  return (openBlock(), createBlock("div", {
    class: ["autocomplete control", { 'is-expanded': _ctx.expanded }]
  }, [
    createVNode(_component_b_input, mergeProps({
      modelValue: $data.newValue,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.newValue = $event)),
      ref: "input",
      type: "text",
      size: _ctx.size,
      loading: _ctx.loading,
      rounded: _ctx.rounded,
      icon: _ctx.icon,
      "icon-right": $options.newIconRight,
      "icon-right-clickable": $options.newIconRightClickable,
      "icon-pack": _ctx.iconPack,
      maxlength: _ctx.maxlength,
      autocomplete: $data.newAutocomplete,
      "use-html5-validation": false
    }, _ctx.$attrs, {
      "onUpdate:modelValue": $options.onInput,
      onFocus: $options.focused,
      onBlur: $options.onBlur,
      onKeyup: _cache[2] || (_cache[2] = withKeys(withModifiers($event => ($data.isActive = false), ["prevent"]), ["esc"])),
      onKeydown: [
        $options.keydown,
        _cache[3] || (_cache[3] = withKeys(withModifiers($event => ($options.keyArrows('up')), ["prevent"]), ["up"])),
        _cache[4] || (_cache[4] = withKeys(withModifiers($event => ($options.keyArrows('down')), ["prevent"]), ["down"]))
      ],
      onIconRightClick: $options.rightIconClick,
      onIconClick: _cache[5] || (_cache[5] = (event) => _ctx.$emit('icon-click', event))
    }), null, 16 /* FULL_PROPS */, ["modelValue", "size", "loading", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown", "onIconRightClick"]),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", {
          class: ["dropdown-menu", { 'is-opened-top': $options.isOpenedTop && !$props.appendToBody }],
          style: $data.style,
          ref: "dropdown"
        }, [
          withDirectives(createVNode("div", {
            class: "dropdown-content",
            style: $options.contentStyle
          }, [
            ($options.hasHeaderSlot)
              ? (openBlock(), createBlock("div", _hoisted_1$E, [
                  renderSlot(_ctx.$slots, "header")
                ]))
              : createCommentVNode("v-if", true),
            (openBlock(true), createBlock(Fragment, null, renderList($options.computedData, (element, groupindex) => {
              return (openBlock(), createBlock(Fragment, null, [
                (element.group)
                  ? (openBlock(), createBlock("div", {
                      key: groupindex + 'group',
                      class: "dropdown-item"
                    }, [
                      ($options.hasGroupSlot)
                        ? renderSlot(_ctx.$slots, "group", {
                            key: 0,
                            group: element.group,
                            index: groupindex
                          })
                        : (openBlock(), createBlock("span", _hoisted_2$k, toDisplayString(element.group), 1 /* TEXT */))
                    ]))
                  : createCommentVNode("v-if", true),
                (openBlock(true), createBlock(Fragment, null, renderList(element.items, (option, index) => {
                  return (openBlock(), createBlock("a", {
                    key: groupindex + ':' + index,
                    class: ["dropdown-item", { 'is-hovered': option === $data.hovered }],
                    onClick: $event => ($options.setSelected(option, undefined, $event))
                  }, [
                    ($options.hasDefaultSlot)
                      ? renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          option: option,
                          index: index
                        })
                      : (openBlock(), createBlock("span", _hoisted_3$f, toDisplayString($options.getValue(option, true)), 1 /* TEXT */))
                  ], 10 /* CLASS, PROPS */, ["onClick"]))
                }), 128 /* KEYED_FRAGMENT */))
              ], 64 /* STABLE_FRAGMENT */))
            }), 256 /* UNKEYED_FRAGMENT */)),
            ($options.isEmpty && $options.hasEmptySlot)
              ? (openBlock(), createBlock("div", _hoisted_4$a, [
                  renderSlot(_ctx.$slots, "empty")
                ]))
              : createCommentVNode("v-if", true),
            ($options.hasFooterSlot)
              ? (openBlock(), createBlock("div", _hoisted_5$7, [
                  renderSlot(_ctx.$slots, "footer")
                ]))
              : createCommentVNode("v-if", true)
          ], 4 /* STYLE */), [
            [vShow, $data.isActive]
          ])
        ], 6 /* CLASS, STYLE */), [
          [vShow, $data.isActive && (!$options.isEmpty || $options.hasEmptySlot || $options.hasHeaderSlot)]
        ])
      ]),
      _: 3 /* FORWARDED */
    })
  ], 2 /* CLASS */))
}

script$$.render = render$T;
script$$.__file = "src/components/autocomplete/Autocomplete.vue";

var use = function use(plugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }
};
var registerComponent = function registerComponent(Vue, component) {
  Vue.component(component.name, component);
};
var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
  if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
  Vue.config.globalProperties.$buefy[property] = component;
};

var Plugin$1e = {
  install: function install(Vue) {
    registerComponent(Vue, script$$);
  }
};
use(Plugin$1e);
var Plugin$1f = Plugin$1e;

var script$_ = {
    name: 'BButton',
    components: {
        [script$11.name]: script$11
    },
    inheritAttrs: false,
    props: {
        type: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
            type: Boolean,
            default: () => {
                return config.defaultButtonRounded
            }
        },
        loading: Boolean,
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
            type: String,
            default: 'button',
            validator: (value) => {
                return [
                    'button',
                    'submit',
                    'reset'
                ].indexOf(value) >= 0
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        }
    },
    computed: {
        computedTag() {
            if (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false) {
                return 'button'
            }
            return this.tag
        },
        iconSize() {
            if (!this.size || this.size === 'is-medium') {
                return 'is-small'
            } else if (this.size === 'is-large') {
                return 'is-medium'
            }
            return this.size
        }
    }
};

const _hoisted_1$D = { key: 1 };
const _hoisted_2$j = { key: 2 };

function render$S(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock(resolveDynamicComponent($options.computedTag), mergeProps({ class: "button" }, _ctx.$attrs, {
    type: $props.nativeType,
    class: [$props.size, $props.type, {
            'is-rounded': $props.rounded,
            'is-loading': $props.loading,
            'is-outlined': $props.outlined,
            'is-fullwidth': $props.expanded,
            'is-inverted': $props.inverted,
            'is-focused': $props.focused,
            'is-active': $props.active,
            'is-hovered': $props.hovered,
            'is-selected': $props.selected
        }]
  }), {
    default: withCtx(() => [
      ($props.iconLeft)
        ? (openBlock(), createBlock(_component_b_icon, {
            key: 0,
            pack: $props.iconPack,
            icon: $props.iconLeft,
            size: $options.iconSize
          }, null, 8 /* PROPS */, ["pack", "icon", "size"]))
        : createCommentVNode("v-if", true),
      ($props.label)
        ? (openBlock(), createBlock("span", _hoisted_1$D, toDisplayString($props.label), 1 /* TEXT */))
        : (_ctx.$slots.default)
          ? (openBlock(), createBlock("span", _hoisted_2$j, [
              renderSlot(_ctx.$slots, "default")
            ]))
          : createCommentVNode("v-if", true),
      ($props.iconRight)
        ? (openBlock(), createBlock(_component_b_icon, {
            key: 3,
            pack: $props.iconPack,
            icon: $props.iconRight,
            size: $options.iconSize
          }, null, 8 /* PROPS */, ["pack", "icon", "size"]))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["type", "class"]))
}

script$_.render = render$S;
script$_.__file = "src/components/button/Button.vue";

var Plugin$1c = {
  install: function install(Vue) {
    registerComponent(Vue, script$_);
  }
};
use(Plugin$1c);
var Plugin$1d = Plugin$1c;

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var items = 1;
var sorted$1 = 3;
var Sorted$1 = sorted$1;
var ProviderParentMixin = (function (itemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    provide: function provide() {
      return _defineProperty({}, 'b' + itemName, this);
    }
  };

  if (hasFlag(flags, items)) {
    mixin.data = function () {
      return _objectSpread$8({
        childItems: []
      }, hasFlag(flags, sorted$1) ? {
        nextIndex: 0
      } : {});
    };

    mixin.methods = {
      _registerItem: function _registerItem(item) {
        if (hasFlag(flags, sorted$1)) {
          // assigns a dynamic index.
          // dynamic indices will be messed up if any child is
          // unmounted.
          // use the new `order` prop to maintain the ordering.
          item.dynamicIndex = this.nextIndex;
          ++this.nextIndex;
        }

        this.childItems.push(item);
      },
      _unregisterItem: function _unregisterItem(item) {
        this.childItems = this.childItems.filter(function (i) {
          return i.value !== item.value;
        });
      }
    };

    if (hasFlag(flags, sorted$1)) {
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems: function sortedItems() {
          return this.childItems.slice().sort(function (i1, i2) {
            return i1.index - i2.index;
          });
        }
      };
    }
  }

  return mixin;
});

var script$Z = {
    name: 'BCarousel',
    components: {
        [script$11.name]: script$11
    },
    mixins: [ProviderParentMixin('carousel', Sorted$1)],
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
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
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
            }, (this.interval || config.defaultCarouselInterval));
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
                ? mod(newIndex, this.childItems.length)
                : bound(newIndex, 0, this.childItems.length - 1);

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

const _hoisted_1$C = {
  key: 1,
  class: "carousel-pause"
};

function render$R(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["carousel", {'is-overlay': $props.overlay}],
    onMouseenter: _cache[5] || (_cache[5] = (...args) => ($options.checkPause && $options.checkPause(...args))),
    onMouseleave: _cache[6] || (_cache[6] = (...args) => ($options.startTimer && $options.startTimer(...args)))
  }, [
    ($props.progress)
      ? (openBlock(), createBlock("progress", {
          key: 0,
          class: ["progress", $props.progressType],
          value: $data.activeChild,
          max: _ctx.childItems.length - 1
        }, toDisplayString(_ctx.childItems.length - 1), 11 /* TEXT, CLASS, PROPS */, ["value", "max"]))
      : createCommentVNode("v-if", true),
    createVNode("div", {
      class: "carousel-items",
      onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.dragStart && $options.dragStart(...args))),
      onMouseup: _cache[2] || (_cache[2] = (...args) => ($options.dragEnd && $options.dragEnd(...args))),
      onTouchstart: _cache[3] || (_cache[3] = withModifiers((...args) => ($options.dragStart && $options.dragStart(...args)), ["stop"])),
      onTouchend: _cache[4] || (_cache[4] = withModifiers((...args) => ($options.dragEnd && $options.dragEnd(...args)), ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default"),
      ($props.arrow)
        ? (openBlock(), createBlock("div", {
            key: 0,
            class: ["carousel-arrow", {'is-hovered': $props.arrowHover}]
          }, [
            withDirectives(createVNode(_component_b_icon, {
              class: "has-icons-left",
              onClick: $options.prev,
              pack: $props.iconPack,
              icon: $props.iconPrev,
              size: $props.iconSize,
              both: ""
            }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
              [vShow, $options.hasPrev]
            ]),
            withDirectives(createVNode(_component_b_icon, {
              class: "has-icons-right",
              onClick: $options.next,
              pack: $props.iconPack,
              icon: $props.iconNext,
              size: $props.iconSize,
              both: ""
            }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
              [vShow, $options.hasNext]
            ])
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ], 32 /* HYDRATE_EVENTS */),
    ($props.autoplay && $props.pauseHover && $props.pauseInfo && $data.isPause)
      ? (openBlock(), createBlock("div", _hoisted_1$C, [
          createVNode("span", {
            class: ["tag", $props.pauseInfoType]
          }, toDisplayString($props.pauseText), 3 /* TEXT, CLASS */)
        ]))
      : createCommentVNode("v-if", true),
    ($props.withCarouselList && !$props.indicator)
      ? renderSlot(_ctx.$slots, "list", {
          key: 2,
          active: $data.activeChild,
          switch: $options.changeActive
        })
      : createCommentVNode("v-if", true),
    ($props.indicator)
      ? (openBlock(), createBlock("div", {
          key: 3,
          class: ["carousel-indicator", $options.indicatorClasses]
        }, [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sortedItems, (item, index) => {
            return (openBlock(), createBlock("a", {
              class: ["indicator-item", {'is-active': item.isActive}],
              onMouseover: $event => ($options.modeChange('hover', index)),
              onClick: $event => ($options.modeChange('click', index)),
              key: item._uid
            }, [
              renderSlot(_ctx.$slots, "indicators", { i: index }, () => [
                createVNode("span", {
                  class: ["indicator-style", $props.indicatorStyle]
                }, null, 2 /* CLASS */)
              ])
            ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onMouseover", "onClick"]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    ($props.overlay)
      ? renderSlot(_ctx.$slots, "overlay", { key: 4 })
      : createCommentVNode("v-if", true)
  ], 34 /* CLASS, HYDRATE_EVENTS */))
}

script$Z.render = render$R;
script$Z.__file = "src/components/carousel/Carousel.vue";

var sorted = 1;
var optional = 2;
var Sorted = sorted;
var InjectedChildMixin = (function (parentItemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    inject: {
      parent: {
        from: 'b' + parentItemName,
        default: false
      }
    },
    created: function created() {
      if (!this.parent) {
        if (!hasFlag(flags, optional)) {
          this.$destroy();
          throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeUnmount: function beforeUnmount() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };

  if (hasFlag(flags, sorted)) {
    // a user can explicitly specify the `order` prop to keep the order of
    // children.
    // I can no longer rely on automatic indexing of children, because I
    // could not figure out how to calculate the index of a child in its
    // parent on Vue 3.
    // incomplete dynamic indexing is still available if any child is never
    // unmounted; e.g., not switched with `v-if`
    mixin.props = {
      order: {
        type: Number,
        required: false
      }
    };

    mixin.data = function () {
      return {
        dynamicIndex: null
      };
    };

    mixin.computed = {
      index: function index() {
        return this.order != null ? this.order : this.dynamicIndex;
      }
    };
  }

  return mixin;
});

var script$Y = {
    name: 'BCarouselItem',
    mixins: [InjectedChildMixin('carousel', Sorted)],
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

const _hoisted_1$B = { class: "carousel-item" };

function render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, { name: $options.transition }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", _hoisted_1$B, [
        renderSlot(_ctx.$slots, "default")
      ], 512 /* NEED_PATCH */), [
        [vShow, $options.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$Y.render = render$Q;
script$Y.__file = "src/components/carousel/CarouselItem.vue";

var script$X = {
    name: 'BCarouselList',
    components: {
        [script$11.name]: script$11
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
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
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
            return -bound(
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
                this.activeItem = bound(value, 0, this.data.length - 1);
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
                newIndex = mod(newIndex, this.total + 1);
            }
            newIndex = bound(newIndex, 0, this.total);
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
                const signCheck = sign(this.delta);
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

function render$P(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_image = resolveComponent("b-image");
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["carousel-list", {'has-shadow': $data.scrollIndex > 0}],
    onMousedown: _cache[1] || (_cache[1] = withModifiers((...args) => ($options.dragStart && $options.dragStart(...args)), ["prevent"])),
    onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.dragStart && $options.dragStart(...args)))
  }, [
    createVNode("div", {
      class: ["carousel-slides", $options.listClass],
      style: 'transform:translateX('+$options.translation+'px)'
    }, [
      (openBlock(true), createBlock(Fragment, null, renderList($props.data, (list, index) => {
        return (openBlock(), createBlock("div", {
          class: ["carousel-slide", {'is-active': $props.asIndicator ? $data.activeItem === index : $data.scrollIndex === index}],
          onMouseup: $event => ($options.checkAsIndicator(index, $event)),
          onTouchend: $event => ($options.checkAsIndicator(index, $event)),
          key: index,
          style: $options.itemStyle
        }, [
          renderSlot(_ctx.$slots, "item", mergeProps({
            index: index,
            active: $data.activeItem,
            scroll: $data.scrollIndex
          }, list, { list: list }), () => [
            createVNode(_component_b_image, mergeProps({
              src: list.image
            }, list), null, 16 /* FULL_PROPS */, ["src"])
          ])
        ], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, ["onMouseup", "onTouchend"]))
      }), 128 /* KEYED_FRAGMENT */))
    ], 6 /* CLASS, STYLE */),
    ($props.arrow)
      ? (openBlock(), createBlock("div", {
          key: 0,
          class: ["carousel-arrow", {'is-hovered': $options.settings.arrowHover}]
        }, [
          withDirectives(createVNode(_component_b_icon, {
            class: "has-icons-left",
            onClick: withModifiers($options.prev, ["prevent"]),
            pack: $options.settings.iconPack,
            icon: $options.settings.iconPrev,
            size: $options.settings.iconSize,
            both: ""
          }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
            [vShow, $options.hasPrev]
          ]),
          withDirectives(createVNode(_component_b_icon, {
            class: "has-icons-right",
            onClick: withModifiers($options.next, ["prevent"]),
            pack: $options.settings.iconPack,
            icon: $options.settings.iconNext,
            size: $options.settings.iconSize,
            both: ""
          }, null, 8 /* PROPS */, ["onClick", "pack", "icon", "size"]), [
            [vShow, $options.hasNext]
          ])
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 34 /* CLASS, HYDRATE_EVENTS */))
}

script$X.render = render$P;
script$X.__file = "src/components/carousel/CarouselList.vue";

var Plugin$1a = {
  install: function install(Vue) {
    registerComponent(Vue, script$Z);
    registerComponent(Vue, script$Y);
    registerComponent(Vue, script$X);
  }
};
use(Plugin$1a);
var Plugin$1b = Plugin$1a;

var CheckRadioMixin = {
  props: {
    modelValue: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    type: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    size: String
  },
  emits: ['update:modelValue'],
  data: function data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.newValue;
      },
      set: function set(value) {
        this.newValue = value;
        this.$emit('update:modelValue', value);
      }
    },
    disabledOrUndefined: function disabledOrUndefined() {
      // On Vue 3, setting a boolean attribute `false` does not remove it.
      // To remove it, `null` or `undefined` has to be given.
      // Setting `false` ends up with a grayed out component.
      return this.disabled || undefined;
    },
    requiredOrUndefined: function requiredOrUndefined() {
      // On Vue 3, setting a boolean attribute `false` does not remove it,
      // `null` or `undefined` has to be given to remove it.
      return this.required || undefined;
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    modelValue: function modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    focus: function focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus();
    }
  }
};

var script$W = {
    name: 'BCheckbox',
    mixins: [CheckRadioMixin],
    props: {
        indeterminate: Boolean,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: false
        }
    }
};

const _hoisted_1$A = { class: "control-label" };

function render$O(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: ["b-checkbox checkbox", [_ctx.size, { 'is-disabled': _ctx.disabled }]],
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.focus && _ctx.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
  }, [
    withDirectives(createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
      indeterminate: $props.indeterminate,
      type: "checkbox",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue,
      "true-value": $props.trueValue,
      "false-value": $props.falseValue
    }, null, 8 /* PROPS */, ["indeterminate", "disabled", "required", "name", "value", "true-value", "false-value"]), [
      [vModelCheckbox, _ctx.computedValue]
    ]),
    createVNode("span", {
      class: ["check", _ctx.type]
    }, null, 2 /* CLASS */),
    createVNode("span", _hoisted_1$A, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script$W.render = render$O;
script$W.__file = "src/components/checkbox/Checkbox.vue";

var script$V = {
    name: 'BCheckboxButton',
    mixins: [CheckRadioMixin],
    props: {
        type: {
            type: String,
            default: 'is-primary'
        },
        expanded: Boolean
    },
    data() {
        return {
            isFocused: false
        }
    },
    computed: {
        checked() {
            if (Array.isArray(this.newValue)) {
                return this.newValue.indexOf(this.nativeValue) >= 0
            }
            return this.newValue === this.nativeValue
        }
    }
};

function render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["control", { 'is-expanded': $props.expanded }]
  }, [
    createVNode("label", {
      class: ["b-checkbox checkbox button", [$options.checked ? $props.type : null, _ctx.size, {
                'is-disabled': _ctx.disabled,
                'is-focused': $data.isFocused
            }]],
      ref: "label",
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.focus && _ctx.focus(...args))),
      onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
    }, [
      renderSlot(_ctx.$slots, "default"),
      withDirectives(createVNode("input", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
        type: "checkbox",
        ref: "input",
        onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
        disabled: _ctx.disabledOrUndefined,
        required: _ctx.requiredOrUndefined,
        name: _ctx.name,
        value: _ctx.nativeValue,
        onFocus: _cache[3] || (_cache[3] = $event => ($data.isFocused = true)),
        onBlur: _cache[4] || (_cache[4] = $event => ($data.isFocused = false))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "required", "name", "value"]), [
        [vModelCheckbox, _ctx.computedValue]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"])
  ], 2 /* CLASS */))
}

script$V.render = render$N;
script$V.__file = "src/components/checkbox/CheckboxButton.vue";

var Plugin$18 = {
  install: function install(Vue) {
    registerComponent(Vue, script$W);
    registerComponent(Vue, script$V);
  }
};
use(Plugin$18);
var Plugin$19 = Plugin$18;

var script$U = {
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

script$U.__file = "src/components/collapse/Collapse.vue";

var Plugin$16 = {
  install: function install(Vue) {
    registerComponent(Vue, script$U);
  }
};
use(Plugin$16);
var Plugin$17 = Plugin$16;

var AM$1 = 'AM';
var PM$1 = 'PM';
var HOUR_FORMAT_24 = '24';
var HOUR_FORMAT_12 = '12';

var defaultTimeFormatter = function defaultTimeFormatter(date, vm) {
  return vm.dtf.format(date);
};

var defaultTimeParser = function defaultTimeParser(timeString, vm) {
  if (timeString) {
    var d = null;

    if (vm.computedValue && !isNaN(vm.computedValue)) {
      d = new Date(vm.computedValue);
    } else {
      d = vm.timeCreator();
      d.setMilliseconds(0);
    }

    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
      var formatRegex = vm.dtf.formatToParts(d).map(function (part) {
        if (part.type === 'literal') {
          return part.value.replace(/ /g, '\\s?');
        } else if (part.type === 'dayPeriod') {
          return "((?!=<".concat(part.type, ">)(").concat(vm.amString, "|").concat(vm.pmString, "|").concat(AM$1, "|").concat(PM$1, "|").concat(AM$1.toLowerCase(), "|").concat(PM$1.toLowerCase(), ")?)");
        }

        return "((?!=<".concat(part.type, ">)\\d+)");
      }).join('');
      var timeGroups = matchWithGroups(formatRegex, timeString); // We do a simple validation for the group.
      // If it is not valid, it will fallback to Date.parse below

      timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour, 10) : null;
      timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute, 10) : null;
      timeGroups.second = timeGroups.second ? parseInt(timeGroups.second, 10) : null;

      if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
        if (timeGroups.dayPeriod && (timeGroups.dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || timeGroups.dayPeriod.toLowerCase() === PM$1.toLowerCase()) && timeGroups.hour < 12) {
          timeGroups.hour += 12;
        }

        d.setHours(timeGroups.hour);
        d.setMinutes(timeGroups.minute);
        d.setSeconds(timeGroups.second || 0);
        return d;
      }
    } // Fallback if formatToParts is not supported or if we were not able to parse a valid date


    var am = false;

    if (vm.hourFormat === HOUR_FORMAT_12) {
      var dateString12 = timeString.split(' ');
      timeString = dateString12[0];
      am = dateString12[1] === vm.amString || dateString12[1] === AM$1;
    }

    var time = timeString.split(':');
    var hours = parseInt(time[0], 10);
    var minutes = parseInt(time[1], 10);
    var seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;

    if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
      return null;
    }

    d.setSeconds(seconds);
    d.setMinutes(minutes);

    if (vm.hourFormat === HOUR_FORMAT_12) {
      if (am && hours === 12) {
        hours = 0;
      } else if (!am && hours !== 12) {
        hours += 12;
      }
    }

    d.setHours(hours);
    return new Date(d.getTime());
  }

  return null;
};

var TimepickerMixin = {
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    modelValue: Date,
    inline: Boolean,
    minTime: Date,
    maxTime: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    hourFormat: {
      type: String,
      validator: function validator(value) {
        return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
      }
    },
    incrementHours: {
      type: Number,
      default: 1
    },
    incrementMinutes: {
      type: Number,
      default: 1
    },
    incrementSeconds: {
      type: Number,
      default: 1
    },
    timeFormatter: {
      type: Function,
      default: function _default(date, vm) {
        if (typeof config.defaultTimeFormatter === 'function') {
          return config.defaultTimeFormatter(date);
        } else {
          return defaultTimeFormatter(date, vm);
        }
      }
    },
    timeParser: {
      type: Function,
      default: function _default(date, vm) {
        if (typeof config.defaultTimeParser === 'function') {
          return config.defaultTimeParser(date);
        } else {
          return defaultTimeParser(date, vm);
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: function _default() {
        return config.defaultTimepickerMobileNative;
      }
    },
    timeCreator: {
      type: Function,
      default: function _default() {
        if (typeof config.defaultTimeCreator === 'function') {
          return config.defaultTimeCreator();
        } else {
          return new Date();
        }
      }
    },
    position: String,
    unselectableTimes: Array,
    openOnFocus: Boolean,
    enableSeconds: Boolean,
    defaultMinutes: Number,
    defaultSeconds: Number,
    focusable: {
      type: Boolean,
      default: true
    },
    tzOffset: {
      type: Number,
      default: 0
    },
    appendToBody: Boolean,
    resetOnMeridianChange: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data: function data() {
    return {
      dateSelected: this.modelValue,
      hoursSelected: null,
      minutesSelected: null,
      secondsSelected: null,
      meridienSelected: null,
      _elementRef: 'input',
      AM: AM$1,
      PM: PM$1,
      HOUR_FORMAT_24: HOUR_FORMAT_24,
      HOUR_FORMAT_12: HOUR_FORMAT_12
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.dateSelected;
      },
      set: function set(value) {
        this.dateSelected = value;
        this.$emit('update:modelValue', this.dateSelected);
      }
    },
    localeOptions: function localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: this.enableSeconds ? 'numeric' : undefined
      }).resolvedOptions();
    },
    dtf: function dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: this.localeOptions.hour || 'numeric',
        minute: this.localeOptions.minute || 'numeric',
        second: this.enableSeconds ? this.localeOptions.second || 'numeric' : undefined,
        hour12: !this.isHourFormat24
      });
    },
    newHourFormat: function newHourFormat() {
      return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
    },
    sampleTime: function sampleTime() {
      var d = this.timeCreator();
      d.setHours(10);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setMilliseconds(0);
      return d;
    },
    hourLiteral: function hourLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        var d = this.sampleTime;
        var parts = this.dtf.formatToParts(d);
        var literal = parts.find(function (part, idx) {
          return idx > 0 && parts[idx - 1].type === 'hour';
        });

        if (literal) {
          return literal.value;
        }
      }

      return ':';
    },
    minuteLiteral: function minuteLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        var d = this.sampleTime;
        var parts = this.dtf.formatToParts(d);
        var literal = parts.find(function (part, idx) {
          return idx > 0 && parts[idx - 1].type === 'minute';
        });

        if (literal) {
          return literal.value;
        }
      }

      return ':';
    },
    secondLiteral: function secondLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        var d = this.sampleTime;
        var parts = this.dtf.formatToParts(d);
        var literal = parts.find(function (part, idx) {
          return idx > 0 && parts[idx - 1].type === 'second';
        });

        if (literal) {
          return literal.value;
        }
      }
    },
    amString: function amString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        var d = this.sampleTime;
        d.setHours(10);
        var dayPeriod = this.dtf.formatToParts(d).find(function (part) {
          return part.type === 'dayPeriod';
        });

        if (dayPeriod) {
          return dayPeriod.value;
        }
      }

      return this.AM;
    },
    pmString: function pmString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        var d = this.sampleTime;
        d.setHours(20);
        var dayPeriod = this.dtf.formatToParts(d).find(function (part) {
          return part.type === 'dayPeriod';
        });

        if (dayPeriod) {
          return dayPeriod.value;
        }
      }

      return this.PM;
    },
    hours: function hours() {
      if (!this.incrementHours || this.incrementHours < 1) throw new Error('Hour increment cannot be null or less than 1.');
      var hours = [];
      var numberOfHours = this.isHourFormat24 ? 24 : 12;

      for (var i = 0; i < numberOfHours; i += this.incrementHours) {
        var value = i;
        var label = value;

        if (!this.isHourFormat24) {
          value = i + 1;
          label = value;

          if (this.meridienSelected === this.amString || this.meridienSelected === this.AM) {
            if (value === 12) {
              value = 0;
            }
          } else if (this.meridienSelected === this.pmString || this.meridienSelected === this.PM) {
            if (value !== 12) {
              value += 12;
            }
          }
        }

        hours.push({
          label: this.formatNumber(label),
          value: value
        });
      }

      return hours;
    },
    minutes: function minutes() {
      if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error('Minute increment cannot be null or less than 1.');
      var minutes = [];

      for (var i = 0; i < 60; i += this.incrementMinutes) {
        minutes.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }

      return minutes;
    },
    seconds: function seconds() {
      if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error('Second increment cannot be null or less than 1.');
      var seconds = [];

      for (var i = 0; i < 60; i += this.incrementSeconds) {
        seconds.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }

      return seconds;
    },
    meridiens: function meridiens() {
      return [this.amString, this.pmString];
    },
    isMobile: function isMobile$1() {
      return this.mobileNative && isMobile.any();
    },
    isHourFormat24: function isHourFormat24() {
      return this.newHourFormat === HOUR_FORMAT_24;
    },
    disabledOrUndefined: function disabledOrUndefined() {
      return this.disabled || undefined;
    }
  },
  watch: {
    hourFormat: function hourFormat() {
      if (this.hoursSelected !== null) {
        this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
      }
    },

    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue: {
      handler: function handler(value) {
        this.updateInternalState(value);
        !this.isValid && this.$refs.input.checkHtml5Validity();
      },
      immediate: true
    }
  },
  methods: {
    onMeridienChange: function onMeridienChange(value) {
      if (this.hoursSelected !== null && this.resetOnMeridianChange) {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.computedValue = null;
      } else if (this.hoursSelected !== null) {
        if (value === this.pmString || value === PM$1) {
          this.hoursSelected += 12;
        } else if (value === this.amString || value === AM$1) {
          this.hoursSelected -= 12;
        }
      }

      this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
    },
    onHoursChange: function onHoursChange(value) {
      if (!this.minutesSelected && typeof this.defaultMinutes !== 'undefined') {
        this.minutesSelected = this.defaultMinutes;
      }

      if (!this.secondsSelected && typeof this.defaultSeconds !== 'undefined') {
        this.secondsSelected = this.defaultSeconds;
      }

      this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },
    onMinutesChange: function onMinutesChange(value) {
      if (!this.secondsSelected && this.defaultSeconds) {
        this.secondsSelected = this.defaultSeconds;
      }

      this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },
    onSecondsChange: function onSecondsChange(value) {
      this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
    },
    updateDateSelected: function updateDateSelected(hours, minutes, seconds, meridiens) {
      if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
        var time = null;

        if (this.computedValue && !isNaN(this.computedValue)) {
          time = new Date(this.computedValue);
        } else {
          time = this.timeCreator();
          time.setMilliseconds(0);
        }

        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);
        this.computedValue = new Date(time.getTime());
      }
    },
    updateInternalState: function updateInternalState(value) {
      if (value) {
        this.hoursSelected = value.getHours();
        this.minutesSelected = value.getMinutes();
        this.secondsSelected = value.getSeconds();
        this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
      } else {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.meridienSelected = this.amString;
      }

      this.dateSelected = value;
    },
    isHourDisabled: function isHourDisabled(hour) {
      var _this = this;

      var disabled = false;

      if (this.minTime) {
        var minHours = this.minTime.getHours();
        var noMinutesAvailable = this.minutes.every(function (minute) {
          return _this.isMinuteDisabledForHour(hour, minute.value);
        });
        disabled = hour < minHours || noMinutesAvailable;
      }

      if (this.maxTime) {
        if (!disabled) {
          var maxHours = this.maxTime.getHours();
          disabled = hour > maxHours;
        }
      }

      if (this.unselectableTimes) {
        if (!disabled) {
          var unselectable = this.unselectableTimes.filter(function (time) {
            if (_this.enableSeconds && _this.secondsSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === _this.minutesSelected && time.getSeconds() === _this.secondsSelected;
            } else if (_this.minutesSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === _this.minutesSelected;
            }

            return false;
          });

          if (unselectable.length > 0) {
            disabled = true;
          } else {
            disabled = this.minutes.every(function (minute) {
              return _this.unselectableTimes.filter(function (time) {
                return time.getHours() === hour && time.getMinutes() === minute.value;
              }).length > 0;
            });
          }
        }
      }

      return disabled;
    },
    isMinuteDisabledForHour: function isMinuteDisabledForHour(hour, minute) {
      var disabled = false;

      if (this.minTime) {
        var minHours = this.minTime.getHours();
        var minMinutes = this.minTime.getMinutes();
        disabled = hour === minHours && minute < minMinutes;
      }

      if (this.maxTime) {
        if (!disabled) {
          var maxHours = this.maxTime.getHours();
          var maxMinutes = this.maxTime.getMinutes();
          disabled = hour === maxHours && minute > maxMinutes;
        }
      }

      return disabled;
    },
    isMinuteDisabled: function isMinuteDisabled(minute) {
      var _this2 = this;

      var disabled = false;

      if (this.hoursSelected !== null) {
        if (this.isHourDisabled(this.hoursSelected)) {
          disabled = true;
        } else {
          disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
        }

        if (this.unselectableTimes) {
          if (!disabled) {
            var unselectable = this.unselectableTimes.filter(function (time) {
              if (_this2.enableSeconds && _this2.secondsSelected !== null) {
                return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute && time.getSeconds() === _this2.secondsSelected;
              } else {
                return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute;
              }
            });
            disabled = unselectable.length > 0;
          }
        }
      }

      return disabled;
    },
    isSecondDisabled: function isSecondDisabled(second) {
      var _this3 = this;

      var disabled = false;

      if (this.minutesSelected !== null) {
        if (this.isMinuteDisabled(this.minutesSelected)) {
          disabled = true;
        } else {
          if (this.minTime) {
            var minHours = this.minTime.getHours();
            var minMinutes = this.minTime.getMinutes();
            var minSeconds = this.minTime.getSeconds();
            disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
          }

          if (this.maxTime) {
            if (!disabled) {
              var maxHours = this.maxTime.getHours();
              var maxMinutes = this.maxTime.getMinutes();
              var maxSeconds = this.maxTime.getSeconds();
              disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
            }
          }
        }

        if (this.unselectableTimes) {
          if (!disabled) {
            var unselectable = this.unselectableTimes.filter(function (time) {
              return time.getHours() === _this3.hoursSelected && time.getMinutes() === _this3.minutesSelected && time.getSeconds() === second;
            });
            disabled = unselectable.length > 0;
          }
        }
      }

      return disabled;
    },

    /*
     * Parse string into date
     */
    onChange: function onChange(value) {
      var date = this.timeParser(value, this);
      this.updateInternalState(date);

      if (date && !isNaN(date)) {
        this.computedValue = date;
      } else {
        // Force refresh input value when not valid date
        this.computedValue = null;
        this.$refs.input.newValue = this.computedValue;
      }
    },

    /*
     * Toggle timepicker
     */
    toggle: function toggle(active) {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
      }
    },

    /*
     * Close timepicker
     */
    close: function close() {
      this.toggle(false);
    },

    /*
     * Call default onFocus method and show timepicker
     */
    handleOnFocus: function handleOnFocus() {
      this.onFocus();

      if (this.openOnFocus) {
        this.toggle(true);
      }
    },

    /*
     * Format date into string 'HH-MM-SS'
     */
    formatHHMMSS: function formatHHMMSS(value) {
      var date = new Date(value);

      if (value && !isNaN(date)) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return this.formatNumber(hours, true) + ':' + this.formatNumber(minutes, true) + ':' + this.formatNumber(seconds, true);
      }

      return '';
    },

    /*
     * Parse time from string
     */
    onChangeNativePicker: function onChangeNativePicker(event) {
      var date = event.target.value;

      if (date) {
        var time = null;

        if (this.computedValue && !isNaN(this.computedValue)) {
          time = new Date(this.computedValue);
        } else {
          time = new Date();
          time.setMilliseconds(0);
        }

        var t = date.split(':');
        time.setHours(parseInt(t[0], 10));
        time.setMinutes(parseInt(t[1], 10));
        time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
        this.computedValue = new Date(time.getTime());
      } else {
        this.computedValue = null;
      }
    },
    formatNumber: function formatNumber(value, prependZero) {
      return this.isHourFormat24 || prependZero ? this.pad(value) : value;
    },
    pad: function pad(value) {
      return (value < 10 ? '0' : '') + value;
    },

    /*
     * Format date into string
     */
    formatValue: function formatValue(date) {
      if (date && !isNaN(date)) {
        return this.timeFormatter(date, this);
      } else {
        return null;
      }
    },

    /**
     * Keypress event that is bound to the document.
     */
    keyPress: function keyPress(_ref) {
      var key = _ref.key;

      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
        this.toggle(false);
      }
    },

    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange: function onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
    }
  },
  created: function created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress);
    }
  },
  beforeUnmounted: function beforeUnmounted() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress);
    }
  }
};

var findFocusable = function findFocusable(element) {
  var programmatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!element) {
    return null;
  }

  if (programmatic) {
    return element.querySelectorAll('*[tabindex="-1"]');
  }

  return element.querySelectorAll("a[href]:not([tabindex=\"-1\"]),\n                                     area[href],\n                                     input:not([disabled]),\n                                     select:not([disabled]),\n                                     textarea:not([disabled]),\n                                     button:not([disabled]),\n                                     iframe,\n                                     object,\n                                     embed,\n                                     *[tabindex]:not([tabindex=\"-1\"]),\n                                     *[contenteditable]");
};

var onKeyDown;

var beforeMount$1 = function beforeMount(el, _ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? true : _ref$value;

  if (value) {
    var focusable = findFocusable(el);
    var focusableProg = findFocusable(el, true);

    if (focusable && focusable.length > 0) {
      onKeyDown = function onKeyDown(event) {
        // Need to get focusable each time since it can change between key events
        // ex. changing month in a datepicker
        focusable = findFocusable(el);
        focusableProg = findFocusable(el, true);
        var firstFocusable = focusable[0];
        var lastFocusable = focusable[focusable.length - 1];

        if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
          event.preventDefault();
          lastFocusable.focus();
        } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
          event.preventDefault();
          firstFocusable.focus();
        }
      };

      el.addEventListener('keydown', onKeyDown);
    }
  }
};

var unmounted$1 = function unmounted(el) {
  el.removeEventListener('keydown', onKeyDown);
};

var directive$1 = {
  beforeMount: beforeMount$1,
  unmounted: unmounted$1
};
var trapFocus = directive$1;

const DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];

var script$T = {
    name: 'BDropdown',
    directives: {
        trapFocus
    },
    mixins: [ProviderParentMixin('dropdown')],
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        disabled: Boolean,
        inline: Boolean,
        scrollable: Boolean,
        maxHeight: {
            type: [String, Number],
            default: 200
        },
        position: {
            type: String,
            validator(value) {
                return [
                    'is-top-right',
                    'is-top-left',
                    'is-bottom-left',
                    'is-bottom-right'
                ].indexOf(value) > -1
            }
        },
        triggers: {
            type: Array,
            default: () => ['click']
        },
        mobileModal: {
            type: Boolean,
            default: () => {
                return config.defaultDropdownMobileModal
            }
        },
        ariaRole: {
            type: String,
            validator(value) {
                return [
                    'menu',
                    'list',
                    'dialog'
                ].indexOf(value) > -1
            },
            default: null
        },
        animation: {
            type: String,
            default: 'fade'
        },
        multiple: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        canClose: {
            type: [Array, Boolean],
            default: true
        },
        expanded: Boolean,
        appendToBody: Boolean,
        appendToBodyCopyParent: Boolean
    },
    emits: ['active-change', 'change', 'update:modelValue'],
    data() {
        return {
            selected: this.modelValue,
            style: {},
            isActive: false,
            isHoverable: false,
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [this.position, {
                'is-disabled': this.disabled,
                'is-hoverable': this.hoverable,
                'is-inline': this.inline,
                'is-active': this.isActive || this.inline,
                'is-mobile-modal': this.isMobileModal,
                'is-expanded': this.expanded
            }]
        },
        isMobileModal() {
            return this.mobileModal && !this.inline
        },
        cancelOptions() {
            return typeof this.canClose === 'boolean'
                ? this.canClose
                    ? DEFAULT_CLOSE_OPTIONS
                    : []
                : this.canClose
        },
        contentStyle() {
            return {
                maxHeight: this.scrollable ? toCssWidth(this.maxHeight) : null,
                overflow: this.scrollable ? 'auto' : null
            }
        },
        hoverable() {
            return this.triggers.indexOf('hover') >= 0
        }
    },
    watch: {
        /**
        * When v-model is changed set the new selected item.
        */
        modelValue(value) {
            this.selected = value;
        },

        /**
        * Emit event when isActive value is changed.
        */
        isActive(value) {
            this.$emit('active-change', value);
            if (this.appendToBody) {
                this.$nextTick(() => {
                    this.updateAppendToBody();
                });
            }
        }
    },
    methods: {
        /**
         * Click listener from DropdownItem.
         *   1. Set new selected item.
         *   2. Emit input event to update the user v-model.
         *   3. Close the dropdown.
         */
        selectItem(value) {
            if (this.multiple) {
                if (this.selected) {
                    if (this.selected.indexOf(value) === -1) {
                        // Add value
                        this.selected = [...this.selected, value];
                    } else {
                        // Remove value
                        this.selected = this.selected.filter((val) => val !== value);
                    }
                } else {
                    this.selected = [value];
                }
                this.$emit('change', this.selected);
            } else {
                if (this.selected !== value) {
                    this.selected = value;
                    this.$emit('change', this.selected);
                }
            }
            this.$emit('update:modelValue', this.selected);
            if (!this.multiple) {
                this.isActive = !this.closeOnClick;
                if (this.hoverable && this.closeOnClick) {
                    this.isHoverable = false;
                }
            }
        },

        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
            if (el === this.$refs.dropdownMenu) return true
            if (el === this.$refs.trigger) return true
            // All chidren from dropdown
            if (this.$refs.dropdownMenu !== undefined) {
                const children = this.$refs.dropdownMenu.querySelectorAll('*');
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            // All children from trigger
            if (this.$refs.trigger !== undefined) {
                const children = this.$refs.trigger.querySelectorAll('*');
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        },

        /**
        * Close dropdown if clicked outside.
        */
        clickedOutside(event) {
            if (this.cancelOptions.indexOf('outside') < 0) return
            if (this.inline) return

            const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
            if (!this.isInWhiteList(target)) this.isActive = false;
        },

        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (this.cancelOptions.indexOf('escape') < 0) return
                this.isActive = false;
            }
        },

        onClick() {
            if (this.triggers.indexOf('click') < 0) return
            this.toggle();
        },
        onContextMenu() {
            if (this.triggers.indexOf('contextmenu') < 0) return
            this.toggle();
        },
        onHover() {
            if (this.triggers.indexOf('hover') < 0) return
            this.isHoverable = true;
        },
        onFocus() {
            if (this.triggers.indexOf('focus') < 0) return
            this.toggle();
        },

        /**
        * Toggle dropdown if it's not disabled.
        */
        toggle() {
            if (this.disabled) return

            if (!this.isActive) {
                // if not active, toggle after clickOutside event
                // this fixes toggling programmatic
                // $nextTick may not wait for other events since Vue 3.
                setTimeout(() => {
                    const value = !this.isActive;
                    this.isActive = value;
                });
            } else {
                this.isActive = !this.isActive;
            }
        },

        updateAppendToBody() {
            const dropdown = this.$refs.dropdown;
            const dropdownMenu = this.$refs.dropdownMenu;
            const trigger = this.$refs.trigger;
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const dropdownWrapper = this.$data._bodyEl.children[0];
                dropdownWrapper.classList.forEach((item) => dropdownWrapper.classList.remove(item));
                dropdownWrapper.classList.add('dropdown');
                dropdownWrapper.classList.add('dropdown-menu-animation');
                // TODO: the following test never becomes true on Vue 3.
                //       I have no idea about the intention of it.
                if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
                    dropdownWrapper.classList.add(this.$vnode.data.staticClass);
                }
                this.rootClasses.forEach((item) => {
                    // skip position prop
                    if (item && typeof item === 'object') {
                        for (const key in item) {
                            if (item[key]) {
                                dropdownWrapper.classList.add(key);
                            }
                        }
                    }
                });
                if (this.appendToBodyCopyParent) {
                    const parentNode = this.$refs.dropdown.parentNode;
                    const parent = this.$data._bodyEl;
                    parent.classList.forEach((item) => parent.classList.remove(item));
                    parentNode.classList.forEach((item) => {
                        parent.classList.add(item);
                    });
                }
                const rect = trigger.getBoundingClientRect();
                let top = rect.top + window.scrollY;
                let left = rect.left + window.scrollX;
                if (!this.position || this.position.indexOf('bottom') >= 0) {
                    top += trigger.clientHeight;
                } else {
                    top -= dropdownMenu.clientHeight;
                }
                if (this.position && this.position.indexOf('left') >= 0) {
                    left -= (dropdownMenu.clientWidth - trigger.clientWidth);
                }
                this.style = {
                    position: 'absolute',
                    top: `${top}px`,
                    left: `${left}px`,
                    zIndex: '99',
                    width: this.expanded ? `${dropdown.offsetWidth}px` : undefined
                };
            }
        }
    },
    mounted() {
        if (this.appendToBody) {
            this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
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

function render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = resolveDirective("trap-focus");

  return (openBlock(), createBlock("div", {
    class: ["dropdown dropdown-menu-animation", $options.rootClasses],
    ref: "dropdown"
  }, [
    (!$props.inline)
      ? (openBlock(), createBlock("div", {
          key: 0,
          role: "button",
          ref: "trigger",
          class: "dropdown-trigger",
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
          onContextmenu: _cache[2] || (_cache[2] = withModifiers((...args) => ($options.onContextMenu && $options.onContextMenu(...args)), ["prevent"])),
          onMouseenter: _cache[3] || (_cache[3] = (...args) => ($options.onHover && $options.onHover(...args))),
          onFocusCapture: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          "aria-haspopup": "true"
        }, [
          renderSlot(_ctx.$slots, "trigger", { active: $data.isActive })
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
      : createCommentVNode("v-if", true),
    createVNode(Transition, { name: $props.animation }, {
      default: withCtx(() => [
        ($options.isMobileModal)
          ? withDirectives((openBlock(), createBlock("div", {
              key: 0,
              class: "background",
              "aria-hidden": !$data.isActive
            }, null, 8 /* PROPS */, ["aria-hidden"])), [
              [vShow, $data.isActive]
            ])
          : createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["name"]),
    createVNode(Transition, { name: $props.animation }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", {
          ref: "dropdownMenu",
          class: "dropdown-menu",
          style: $data.style,
          "aria-hidden": !$data.isActive
        }, [
          createVNode("div", {
            class: "dropdown-content",
            role: $props.ariaRole,
            style: $options.contentStyle
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 12 /* STYLE, PROPS */, ["role"])
        ], 12 /* STYLE, PROPS */, ["aria-hidden"]), [
          [vShow, (!$props.disabled && ($data.isActive || $data.isHoverable)) || $props.inline],
          [_directive_trap_focus, $props.trapFocus]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"])
  ], 2 /* CLASS */))
}

script$T.render = render$M;
script$T.__file = "src/components/dropdown/Dropdown.vue";

var script$S = {
    name: 'BDropdownItem',
    mixins: [InjectedChildMixin('dropdown')],
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        separator: Boolean,
        disabled: Boolean,
        custom: Boolean,
        focusable: {
            type: Boolean,
            default: true
        },
        paddingless: Boolean,
        hasLink: Boolean,
        ariaRole: {
            type: String,
            default: ''
        }
    },
    emits: ['click'],
    computed: {
        anchorClasses() {
            return {
                'is-disabled': this.parent.disabled || this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive
            }
        },
        itemClasses() {
            return {
                'dropdown-item': !this.hasLink,
                'is-disabled': this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive,
                'has-link': this.hasLink
            }
        },
        ariaRoleItem() {
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null
        },
        isClickable() {
            return !this.parent.disabled && !this.separator && !this.disabled && !this.custom
        },
        isActive() {
            if (this.parent.selected === null) return false
            if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0
            return this.value === this.parent.selected
        },
        isFocusable() {
            return this.hasLink ? false : this.focusable
        }
    },
    methods: {
        /**
        * Click listener, select the item.
        */
        selectItem() {
            if (!this.isClickable) return

            this.parent.selectItem(this.value);
            this.$emit('click');
        }
    }
};

const _hoisted_1$z = {
  key: 0,
  class: "dropdown-divider"
};

function render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.separator)
    ? (openBlock(), createBlock("hr", _hoisted_1$z))
    : (!$props.custom && !$props.hasLink)
      ? (openBlock(), createBlock("a", {
          key: 1,
          class: ["dropdown-item", $options.anchorClasses],
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.selectItem && $options.selectItem(...args))),
          role: $options.ariaRoleItem,
          tabindex: $options.isFocusable ? 0 : null
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
      : (openBlock(), createBlock("div", {
          key: 2,
          class: $options.itemClasses,
          onClick: _cache[2] || (_cache[2] = (...args) => ($options.selectItem && $options.selectItem(...args))),
          role: $options.ariaRoleItem,
          tabindex: $options.isFocusable ? 0 : null
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
}

script$S.render = render$L;
script$S.__file = "src/components/dropdown/DropdownItem.vue";

var script$R = {
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

script$R.__file = "src/components/field/FieldBody.vue";

var script$Q = {
    name: 'BField',
    components: {
        [script$R.name]: script$R
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

const _hoisted_1$y = {
  key: 3,
  class: "field-body"
};

function render$K(_ctx, _cache, $props, $setup, $data, $options) {
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
        ? (openBlock(), createBlock("div", _hoisted_1$y, [
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

script$Q.render = render$K;
script$Q.__file = "src/components/field/Field.vue";

// These should match the variables in clockpicker.scss
const indicatorSize = 40;
const paddingInner = 5;

var script$P = {
    name: 'BClockpickerFace',
    props: {
        pickerSize: Number,
        min: Number,
        max: Number,
        double: Boolean,
        value: Number,
        faceNumbers: Array,
        disabledValues: Function
    },
    emits: ['change', 'input'],
    data() {
        return {
            isDragging: false,
            inputValue: this.value,
            prevAngle: 720
        }
    },
    computed: {
        /**
        * How many number indicators are shown on the face
        */
        count() {
            return this.max - this.min + 1
        },
        /**
        * How many number indicators are shown per ring on the face
        */
        countPerRing() {
            return this.double ? (this.count / 2) : this.count
        },
        /**
        * Radius of the clock face
        */
        radius() {
            return this.pickerSize / 2
        },
        /**
        * Radius of the outer ring of number indicators
        */
        outerRadius() {
            return this.radius -
                paddingInner -
                indicatorSize / 2
        },
        /**
        * Radius of the inner ring of number indicators
        */
        innerRadius() {
            return Math.max(this.outerRadius * 0.6,
                this.outerRadius - paddingInner - indicatorSize)
            // 48px gives enough room for the outer ring of numbers
        },
        /**
        * The angle for each selectable value
        * For hours this ends up being 30 degrees, for minutes 6 degrees
        */
        degreesPerUnit() {
            return 360 / this.countPerRing
        },
        /**
        * Used for calculating x/y grid location based on degrees
        */
        degrees() {
            return this.degreesPerUnit * Math.PI / 180
        },
        /**
        * Calculates the angle the clock hand should be rotated for the
        * selected value
        */
        handRotateAngle() {
            let currentAngle = this.prevAngle;
            while (currentAngle < 0) currentAngle += 360;
            const targetAngle = this.calcHandAngle(this.displayedValue);
            const degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
            const angle = this.prevAngle + degreesDiff;
            return angle
        },
        /**
        * Determines how long the selector hand is based on if the
        * selected value is located along the outer or inner ring
        */
        handScale() {
            return this.calcHandScale(this.displayedValue)
        },
        handStyle() {
            return {
                transform: `rotate(${this.handRotateAngle}deg) scaleY(${this.handScale})`,
                transition: '.3s cubic-bezier(.25,.8,.50,1)'
            }
        },
        /**
        * The value the hand should be pointing at
        */
        displayedValue() {
            return this.inputValue == null ? this.min : this.inputValue
        }
    },
    watch: {
        value(value) {
            if (value !== this.inputValue) {
                this.prevAngle = this.handRotateAngle;
            }
            this.inputValue = value;
        }
    },
    methods: {
        isDisabled(value) {
            return this.disabledValues && this.disabledValues(value)
        },
        /**
        * Calculates the distance between two points
        */
        euclidean(p0, p1) {
            const dx = p1.x - p0.x;
            const dy = p1.y - p0.y;

            return Math.sqrt(dx * dx + dy * dy)
        },
        shortestDistanceDegrees(start, stop) {
            const modDiff = (stop - start) % 360;
            const shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
            return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1
        },
        /**
        * Calculates the angle of the line from the center point
        * to the given point.
        */
        coordToAngle(center, p1) {
            const value = 2 *
                Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
            return Math.abs(value * 180 / Math.PI)
        },
        /**
        * Generates the inline style translate() property for a
        * number indicator, which determines it's location on the
        * clock face
        */
        getNumberTranslate(value) {
            const { x, y } = this.getNumberCoords(value);
            return `translate(${x}px, ${y}px)`
        },
        /***
        * Calculates the coordinates on the clock face for a number
        * indicator value
        */
        getNumberCoords(value) {
            const radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
            return {
                x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
                y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
            }
        },
        getFaceNumberClasses(num) {
            return {
                active: num.value === this.displayedValue,
                disabled: this.isDisabled(num.value)
            }
        },
        /**
        * Determines if a value resides on the inner ring
        */
        isInnerRing(value) {
            return this.double && (value - this.min >= this.countPerRing)
        },
        calcHandAngle(value) {
            let angle = this.degreesPerUnit * (value - this.min);
            if (this.isInnerRing(value)) angle -= 360;
            return angle
        },
        calcHandScale(value) {
            return this.isInnerRing(value)
                ? ((this.innerRadius) / this.outerRadius)
                : 1
        },
        onMouseDown(e) {
            e.preventDefault();
            this.isDragging = true;
            this.onDragMove(e);
        },
        onMouseUp() {
            this.isDragging = false;
            if (!this.isDisabled(this.inputValue)) {
                this.$emit('change', this.inputValue);
            }
        },
        onDragMove(e) {
            e.preventDefault();
            if (!this.isDragging && e.type !== 'click') return

            const { width, top, left } = this.$refs.clock.getBoundingClientRect();
            const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
            const center = { x: width / 2, y: -width / 2 };
            const coords = { x: clientX - left, y: top - clientY };
            const handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
            const insideClick = this.double && this.euclidean(center, coords) <
                (this.outerRadius + this.innerRadius) / 2 - 16;

            let value = Math.round(handAngle / this.degreesPerUnit) +
                this.min +
                (insideClick ? this.countPerRing : 0);

            // Necessary to fix edge case when selecting left part of max value
            if (handAngle >= (360 - this.degreesPerUnit / 2)) {
                value = insideClick ? this.max : this.min;
            }
            this.update(value);
        },
        update(value) {
            if (this.inputValue !== value && !this.isDisabled(value)) {
                this.prevAngle = this.handRotateAngle;
                this.inputValue = value;
                this.$emit('input', value);
            }
        }
    }
};

const _hoisted_1$x = {
  class: "b-clockpicker-face-outer-ring",
  ref: "clock"
};

function render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: "b-clockpicker-face",
    onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.onMouseDown && $options.onMouseDown(...args))),
    onMouseup: _cache[2] || (_cache[2] = (...args) => ($options.onMouseUp && $options.onMouseUp(...args))),
    onMousemove: _cache[3] || (_cache[3] = (...args) => ($options.onDragMove && $options.onDragMove(...args))),
    onTouchstart: _cache[4] || (_cache[4] = (...args) => ($options.onMouseDown && $options.onMouseDown(...args))),
    onTouchend: _cache[5] || (_cache[5] = (...args) => ($options.onMouseUp && $options.onMouseUp(...args))),
    onTouchmove: _cache[6] || (_cache[6] = (...args) => ($options.onDragMove && $options.onDragMove(...args)))
  }, [
    createVNode("div", _hoisted_1$x, [
      createVNode("div", {
        class: "b-clockpicker-face-hand",
        style: $options.handStyle
      }, null, 4 /* STYLE */),
      (openBlock(true), createBlock(Fragment, null, renderList($props.faceNumbers, (num, index) => {
        return (openBlock(), createBlock("span", {
          key: index,
          class: ["b-clockpicker-face-number", $options.getFaceNumberClasses(num)],
          style: { transform: $options.getNumberTranslate(num.value) }
        }, [
          createVNode("span", null, toDisplayString(num.label), 1 /* TEXT */)
        ], 6 /* CLASS, STYLE */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 512 /* NEED_PATCH */)
  ], 32 /* HYDRATE_EVENTS */))
}

script$P.render = render$J;
script$P.__file = "src/components/clockpicker/ClockpickerFace.vue";

const outerPadding = 12;

var script$O = {
    name: 'BClockpicker',
    components: {
        [script$P.name]: script$P,
        [script$10.name]: script$10,
        [script$Q.name]: script$Q,
        [script$11.name]: script$11,
        [script$T.name]: script$T,
        [script$S.name]: script$S
    },
    mixins: [TimepickerMixin],
    props: {
        pickerSize: {
            type: Number,
            default: 290
        },
        incrementMinutes: {
            type: Number,
            default: 5
        },
        autoSwitch: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: 'is-primary'
        },
        hoursLabel: {
            type: String,
            default: () => config.defaultClockpickerHoursLabel || 'Hours'
        },
        minutesLabel: {
            type: String,
            default: () => config.defaultClockpickerMinutesLabel || 'Min'
        }
    },
    data() {
        return {
            isSelectingHour: true,
            isDragging: false,
            _isClockpicker: true
        }
    },
    computed: {
        hoursDisplay() {
            if (this.hoursSelected == null) return '--'
            if (this.isHourFormat24) return this.pad(this.hoursSelected)

            let display = this.hoursSelected;
            if (this.meridienSelected === this.pmString || this.meridienSelected === this.PM) {
                display -= 12;
            }
            if (display === 0) display = 12;
            return display
        },
        minutesDisplay() {
            return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected)
        },
        minFaceValue() {
            return this.isSelectingHour &&
                !this.isHourFormat24 &&
            (this.meridienSelected === this.pmString || this.meridienSelected === this.PM)
                ? 12
                : 0
        },
        maxFaceValue() {
            return this.isSelectingHour
                ? (
                    !this.isHourFormat24 &&
                    (this.meridienSelected === this.amString || this.meridienSelected === this.AM)
                        ? 11
                        : 23
                )
                : 59
        },
        faceSize() {
            return this.pickerSize - (outerPadding * 2)
        },
        faceDisabledValues() {
            return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled
        }
    },
    methods: {
        onClockInput(value) {
            if (this.isSelectingHour) {
                this.hoursSelected = value;
                this.onHoursChange(value);
            } else {
                this.minutesSelected = value;
                this.onMinutesChange(value);
            }
        },
        onClockChange(value) {
            if (this.autoSwitch && this.isSelectingHour) {
                this.isSelectingHour = !this.isSelectingHour;
            }
        },
        onMeridienClick(value) {
            if (this.meridienSelected !== value) {
                this.meridienSelected = value;
                this.onMeridienChange(value);
            }
        }
    }
};

const _hoisted_1$w = {
  key: 0,
  class: "card-header"
};
const _hoisted_2$i = { class: "b-clockpicker-header card-header-title" };
const _hoisted_3$e = { class: "b-clockpicker-time" };
const _hoisted_4$9 = {
  key: 0,
  class: "b-clockpicker-period"
};
const _hoisted_5$6 = { class: "card-content" };
const _hoisted_6$5 = {
  key: 0,
  class: "b-clockpicker-time"
};
const _hoisted_7$4 = {
  key: 1,
  class: "b-clockpicker-period"
};
const _hoisted_8$3 = {
  key: 1,
  class: "b-clockpicker-footer card-footer"
};

function render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_clockpicker_face = resolveComponent("b-clockpicker-face");
  const _component_b_dropdown = resolveComponent("b-dropdown");

  return (openBlock(), createBlock("div", {
    class: ["b-clockpicker control", [_ctx.size, $props.type, {'is-expanded': _ctx.expanded}]]
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
            createVNode("div", {
              class: "card",
              disabled: _ctx.disabledOrUndefined,
              custom: ""
            }, [
              (_ctx.inline)
                ? (openBlock(), createBlock("header", _hoisted_1$w, [
                    createVNode("div", _hoisted_2$i, [
                      createVNode("div", _hoisted_3$e, [
                        createVNode("span", {
                          class: ["b-clockpicker-btn", { active: $data.isSelectingHour }],
                          onClick: _cache[5] || (_cache[5] = $event => ($data.isSelectingHour = true))
                        }, toDisplayString($options.hoursDisplay), 3 /* TEXT, CLASS */),
                        createVNode("span", null, toDisplayString(_ctx.hourLiteral), 1 /* TEXT */),
                        createVNode("span", {
                          class: ["b-clockpicker-btn", { active: !$data.isSelectingHour }],
                          onClick: _cache[6] || (_cache[6] = $event => ($data.isSelectingHour = false))
                        }, toDisplayString($options.minutesDisplay), 3 /* TEXT, CLASS */)
                      ]),
                      (!_ctx.isHourFormat24)
                        ? (openBlock(), createBlock("div", _hoisted_4$9, [
                            createVNode("div", {
                              class: ["b-clockpicker-btn", {
                                    active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                                }],
                              onClick: _cache[7] || (_cache[7] = $event => ($options.onMeridienClick(_ctx.amString)))
                            }, toDisplayString(_ctx.amString), 3 /* TEXT, CLASS */),
                            createVNode("div", {
                              class: ["b-clockpicker-btn", {
                                    active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                                }],
                              onClick: _cache[8] || (_cache[8] = $event => ($options.onMeridienClick(_ctx.pmString)))
                            }, toDisplayString(_ctx.pmString), 3 /* TEXT, CLASS */)
                          ]))
                        : createCommentVNode("v-if", true)
                    ])
                  ]))
                : createCommentVNode("v-if", true),
              createVNode("div", _hoisted_5$6, [
                createVNode("div", {
                  class: "b-clockpicker-body",
                  style: { width: $options.faceSize + 'px', height: $options.faceSize + 'px' }
                }, [
                  (!_ctx.inline)
                    ? (openBlock(), createBlock("div", _hoisted_6$5, [
                        createVNode("div", {
                          class: ["b-clockpicker-btn", { active: $data.isSelectingHour }],
                          onClick: _cache[9] || (_cache[9] = $event => ($data.isSelectingHour = true))
                        }, toDisplayString($props.hoursLabel), 3 /* TEXT, CLASS */),
                        createVNode("span", {
                          class: ["b-clockpicker-btn", { active: !$data.isSelectingHour }],
                          onClick: _cache[10] || (_cache[10] = $event => ($data.isSelectingHour = false))
                        }, toDisplayString($props.minutesLabel), 3 /* TEXT, CLASS */)
                      ]))
                    : createCommentVNode("v-if", true),
                  (!_ctx.isHourFormat24 && !_ctx.inline)
                    ? (openBlock(), createBlock("div", _hoisted_7$4, [
                        createVNode("div", {
                          class: ["b-clockpicker-btn", {
                                    active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                                }],
                          onClick: _cache[11] || (_cache[11] = $event => ($options.onMeridienClick(_ctx.amString)))
                        }, toDisplayString(_ctx.amString), 3 /* TEXT, CLASS */),
                        createVNode("div", {
                          class: ["b-clockpicker-btn", {
                                    active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                                }],
                          onClick: _cache[12] || (_cache[12] = $event => ($options.onMeridienClick(_ctx.pmString)))
                        }, toDisplayString(_ctx.pmString), 3 /* TEXT, CLASS */)
                      ]))
                    : createCommentVNode("v-if", true),
                  createVNode(_component_b_clockpicker_face, {
                    "picker-size": $options.faceSize,
                    min: $options.minFaceValue,
                    max: $options.maxFaceValue,
                    "face-numbers": $data.isSelectingHour ? _ctx.hours : _ctx.minutes,
                    "disabled-values": $options.faceDisabledValues,
                    double: $data.isSelectingHour && _ctx.isHourFormat24,
                    value: $data.isSelectingHour ? _ctx.hoursSelected : _ctx.minutesSelected,
                    onInput: $options.onClockInput,
                    onChange: $options.onClockChange
                  }, null, 8 /* PROPS */, ["picker-size", "min", "max", "face-numbers", "disabled-values", "double", "value", "onInput", "onChange"])
                ], 4 /* STYLE */)
              ]),
              (_ctx.$slots.default !== undefined && _ctx.$slots.default().length)
                ? (openBlock(), createBlock("footer", _hoisted_8$3, [
                    renderSlot(_ctx.$slots, "default")
                  ]))
                : createCommentVNode("v-if", true)
            ], 8 /* PROPS */, ["disabled"])
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
                      value: _ctx.formatValue(_ctx.computedValue),
                      placeholder: _ctx.placeholder,
                      size: _ctx.size,
                      icon: _ctx.icon,
                      "icon-pack": _ctx.iconPack,
                      loading: _ctx.loading,
                      disabled: _ctx.disabledOrUndefined,
                      readonly: !_ctx.editable,
                      rounded: _ctx.rounded
                    }, _ctx.$attrs, {
                      "use-html5-validation": _ctx.useHtml5Validation,
                      onClick: _cache[1] || (_cache[1] = withModifiers($event => (_ctx.toggle(true)), ["stop"])),
                      onKeyup: _cache[2] || (_cache[2] = withKeys($event => (_ctx.toggle(true)), ["enter"])),
                      onChange: _cache[3] || (_cache[3] = $event => (_ctx.onChange($event.target.value))),
                      onFocus: _ctx.handleOnFocus,
                      onBlur: _cache[4] || (_cache[4] = $event => (_ctx.checkHtml5Validity()))
                    }), null, 16 /* FULL_PROPS */, ["value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])
                  ])
                ])
              }
            : undefined
        ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["position", "disabled", "inline", "append-to-body", "onActiveChange"]))
      : (openBlock(), createBlock(_component_b_input, mergeProps({
          key: 1,
          ref: "input",
          type: "time",
          autocomplete: "off",
          value: _ctx.formatHHMMSS(_ctx.computedValue),
          placeholder: _ctx.placeholder,
          size: _ctx.size,
          icon: _ctx.icon,
          "icon-pack": _ctx.iconPack,
          loading: _ctx.loading,
          max: _ctx.formatHHMMSS(_ctx.maxTime),
          min: _ctx.formatHHMMSS(_ctx.minTime),
          disabled: _ctx.disabledOrUndefined,
          readonly: false
        }, _ctx.$attrs, {
          "use-html5-validation": _ctx.useHtml5Validation,
          onClick: _cache[13] || (_cache[13] = withModifiers($event => (_ctx.toggle(true)), ["stop"])),
          onKeyup: _cache[14] || (_cache[14] = withKeys($event => (_ctx.toggle(true)), ["enter"])),
          onChange: _ctx.onChangeNativePicker,
          onFocus: _ctx.handleOnFocus,
          onBlur: _cache[15] || (_cache[15] = $event => (_ctx.onBlur() && _ctx.checkHtml5Validity()))
        }), null, 16 /* FULL_PROPS */, ["value", "placeholder", "size", "icon", "icon-pack", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus"]))
  ], 2 /* CLASS */))
}

script$O.render = render$I;
script$O.__file = "src/components/clockpicker/Clockpicker.vue";

var Plugin$14 = {
  install: function install(Vue) {
    registerComponent(Vue, script$O);
  }
};
use(Plugin$14);
var Plugin$15 = Plugin$14;

var script$N = {
    name: 'BSelect',
    components: {
        [script$11.name]: script$11
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array, Function, Date],
            default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
    },
    emits: ['blur', 'focus', 'update:modelValue'],
    data() {
        return {
            selected: this.modelValue,
            _elementRef: 'select'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.selected
            },
            set(value) {
                this.selected = value;
                this.$emit('update:modelValue', value);
                !this.isValid && this.checkHtml5Validity();
            }
        },
        spanClasses() {
            return [this.size, this.statusType, {
                'is-fullwidth': this.expanded,
                'is-loading': this.loading,
                'is-multiple': this.multiple,
                'is-rounded': this.rounded,
                'is-empty': this.selected === null
            }]
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
            this.selected = value;
            !this.isValid && this.checkHtml5Validity();
        }
    }
};

const _hoisted_1$v = {
  key: 0,
  value: null,
  disabled: "",
  hidden: ""
};

function render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["control", { 'is-expanded': _ctx.expanded, 'has-icons-left': _ctx.icon }]
  }, [
    createVNode("span", {
      class: ["select", $options.spanClasses]
    }, [
      withDirectives(createVNode("select", mergeProps({
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
        ref: "select",
        multiple: $props.multiple,
        size: $props.nativeSize
      }, _ctx.$attrs, {
        onBlur: _cache[2] || (_cache[2] = $event => (_ctx.$emit('blur', $event) && _ctx.checkHtml5Validity())),
        onFocus: _cache[3] || (_cache[3] = $event => (_ctx.$emit('focus', $event)))
      }), [
        ($props.placeholder)
          ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              ($options.computedValue == null)
                ? (openBlock(), createBlock("option", _hoisted_1$v, toDisplayString($props.placeholder), 1 /* TEXT */))
                : createCommentVNode("v-if", true)
            ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
          : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 16 /* FULL_PROPS */, ["multiple", "size"]), [
        [vModelSelect, $options.computedValue]
      ])
    ], 2 /* CLASS */),
    (_ctx.icon)
      ? (openBlock(), createBlock(_component_b_icon, {
          key: 0,
          class: "is-left",
          icon: _ctx.icon,
          pack: _ctx.iconPack,
          size: _ctx.iconSize
        }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$N.render = render$H;
script$N.__file = "src/components/select/Select.vue";

var script$M = {
    name: 'BDatepickerTableRow',
    inject: {
        $datepicker: { name: '$datepicker', default: false }
    },
    props: {
        selectedDate: {
            type: [Date, Array]
        },
        hoveredDateRange: Array,
        day: {
            type: Number
        },
        week: {
            type: Array,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        minDate: Date,
        maxDate: Date,
        disabled: Boolean,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: Array,
        selectableDates: [Array, Function],
        events: Array,
        indicators: String,
        dateCreator: Function,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        range: Boolean,
        multiple: Boolean,
        rulesForFirstWeek: Number,
        firstDayOfWeek: Number
    },
    emits: ['change-focus', 'rangeHoverEndDate', 'select'],
    watch: {
        day(day) {
            const refName = `day-${this.month}-${day}`;
            this.$nextTick(() => {
                if (this.$refs[refName] && this.$refs[refName].length > 0) {
                    if (this.$refs[refName][0]) {
                        this.$refs[refName][0].focus();
                    }
                }
            }); // $nextTick needed when month is changed
        }
    },
    methods: {
        firstWeekOffset(year, dow, doy) {
            // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            const fwd = 7 + dow - doy;
            // first-week day local weekday -- which local weekday is fwd
            const firstJanuary = new Date(year, 0, fwd);
            const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
            return -fwdlw + fwd - 1
        },
        daysInYear(year) {
            return this.isLeapYear(year) ? 366 : 365
        },
        isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        },
        getSetDayOfYear(input) {
            return Math.round((input - new Date(input.getFullYear(), 0, 1)) / 864e5) + 1
        },
        weeksInYear(year, dow, doy) {
            const weekOffset = this.firstWeekOffset(year, dow, doy);
            const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
            return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7
        },
        getWeekNumber(mom) {
            const dow = this.firstDayOfWeek; // first day of week
            // Rules for the first week : 1 for the 1st January, 4 for the 4th January
            const doy = this.rulesForFirstWeek;
            const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
            const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
            let resWeek;
            let resYear;
            if (week < 1) {
                resYear = mom.getFullYear() - 1;
                resWeek = week + this.weeksInYear(resYear, dow, doy);
            } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
                resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
                resYear = mom.getFullYear() + 1;
            } else {
                resYear = mom.getFullYear();
                resWeek = week;
            }

            return resWeek
        },
        clickWeekNumber(week) {
            if (this.weekNumberClickable) {
                this.$datepicker.$emit('week-number-click', week);
            }
        },
        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
            const validity = [];

            if (this.minDate) {
                validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate);
            }

            if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
                validity.push(day.getMonth() === this.month);
            }

            if (this.selectableDates) {
                if (typeof this.selectableDates === 'function') {
                    if (this.selectableDates(day)) {
                        return true
                    } else {
                        validity.push(false);
                    }
                } else {
                    for (let i = 0; i < this.selectableDates.length; i++) {
                        const enabledDate = this.selectableDates[i];
                        if (day.getDate() === enabledDate.getDate() &&
                            day.getFullYear() === enabledDate.getFullYear() &&
                            day.getMonth() === enabledDate.getMonth()) {
                            return true
                        } else {
                            validity.push(false);
                        }
                    }
                }
            }

            if (this.unselectableDates) {
                if (typeof this.unselectableDates === 'function') {
                    validity.push(!this.unselectableDates(day));
                } else {
                    for (let i = 0; i < this.unselectableDates.length; i++) {
                        const disabledDate = this.unselectableDates[i];
                        validity.push(
                            day.getDate() !== disabledDate.getDate() ||
                                day.getFullYear() !== disabledDate.getFullYear() ||
                                day.getMonth() !== disabledDate.getMonth()
                        );
                    }
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
                    const dayOfWeek = this.unselectableDaysOfWeek[i];
                    validity.push(day.getDay() !== dayOfWeek);
                }
            }

            return validity.indexOf(false) < 0
        },

        /*
        * Emit select event with chosen date as payload
        */
        emitChosenDate(day) {
            if (this.disabled) return

            if (this.selectableDate(day)) {
                this.$emit('select', day);
            }
        },

        eventsDateMatch(day) {
            if (!this.events || !this.events.length) return false

            const dayEvents = [];

            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].date.getDay() === day.getDay()) {
                    dayEvents.push(this.events[i]);
                }
            }

            if (!dayEvents.length) {
                return false
            }

            return dayEvents
        },

        /*
        * Build classObject for cell using validations
        */
        classObject(day) {
            function dateMatch(dateOne, dateTwo, multiple) {
                // if either date is null or undefined, return false
                // if using multiple flag, return false
                if (!dateOne || !dateTwo || multiple) {
                    return false
                }

                if (Array.isArray(dateTwo)) {
                    return dateTwo.some((date) => (
                        dateOne.getDate() === date.getDate() &&
                        dateOne.getFullYear() === date.getFullYear() &&
                        dateOne.getMonth() === date.getMonth()
                    ))
                }
                return (dateOne.getDate() === dateTwo.getDate() &&
                    dateOne.getFullYear() === dateTwo.getFullYear() &&
                    dateOne.getMonth() === dateTwo.getMonth())
            }

            function dateWithin(dateOne, dates, multiple) {
                if (!Array.isArray(dates) || multiple) { return false }

                return dateOne > dates[0] && dateOne < dates[1]
            }

            return {
                'is-selected': dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple),
                'is-first-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.selectedDate) && this.selectedDate[0],
                        this.multiple
                    ),
                'is-within-selected':
                    dateWithin(day, this.selectedDate, this.multiple),
                'is-last-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.selectedDate) && this.selectedDate[1],
                        this.multiple
                    ),
                'is-within-hovered-range':
                    this.hoveredDateRange && this.hoveredDateRange.length === 2 &&
                    (dateMatch(day, this.hoveredDateRange) ||
                        dateWithin(day, this.hoveredDateRange)),
                'is-first-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0]
                ),
                'is-within-hovered':
                    dateWithin(day, this.hoveredDateRange),
                'is-last-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1]
                ),
                'is-today': dateMatch(day, this.dateCreator()),
                'is-selectable': this.selectableDate(day) && !this.disabled,
                'is-unselectable': !this.selectableDate(day) || this.disabled,
                'is-invisible': !this.nearbyMonthDays && day.getMonth() !== this.month,
                'is-nearby': this.nearbySelectableMonthDays && day.getMonth() !== this.month,
                'has-event': this.eventsDateMatch(day),
                [this.indicators]: this.eventsDateMatch(day)
            }
        },
        setRangeHoverEndDate(day) {
            if (this.range) {
                this.$emit('rangeHoverEndDate', day);
            }
        },

        manageKeydown(event, weekDay) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event;
            let preventDefault = true;
            switch (key) {
                case 'Tab': {
                    preventDefault = false;
                    break
                }

                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.emitChosenDate(weekDay);
                    break
                }

                case 'ArrowLeft':
                case 'Left': {
                    this.changeFocus(weekDay, -1);
                    break
                }
                case 'ArrowRight':
                case 'Right': {
                    this.changeFocus(weekDay, 1);
                    break
                }
                case 'ArrowUp':
                case 'Up': {
                    this.changeFocus(weekDay, -7);
                    break
                }
                case 'ArrowDown':
                case 'Down': {
                    this.changeFocus(weekDay, 7);
                    break
                }
            }

            if (preventDefault) {
                event.preventDefault();
            }
        },

        changeFocus(day, inc) {
            const nextDay = new Date(day.getTime());
            nextDay.setDate(day.getDate() + inc);
            while (
                (!this.minDate || nextDay > this.minDate) &&
                (!this.maxDate || nextDay < this.maxDate) &&
                !this.selectableDate(nextDay)
            ) {
                nextDay.setDate(day.getDate() + Math.sign(inc));
            }
            this.setRangeHoverEndDate(nextDay);
            this.$emit('change-focus', nextDay);
        }
    }
};

const _hoisted_1$u = { class: "datepicker-row" };
const _hoisted_2$h = {
  key: 0,
  class: "events"
};
const _hoisted_3$d = {
  key: 0,
  class: "events"
};

function render$G(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$u, [
    ($props.showWeekNumber)
      ? (openBlock(), createBlock("a", {
          key: 0,
          class: ["datepicker-cell is-week-number", {'is-clickable': $props.weekNumberClickable }],
          onClick: _cache[1] || (_cache[1] = withModifiers($event => ($options.clickWeekNumber($options.getWeekNumber($props.week[6]))), ["prevent"]))
        }, [
          createVNode("span", null, toDisplayString($options.getWeekNumber($props.week[6])), 1 /* TEXT */)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    (openBlock(true), createBlock(Fragment, null, renderList($props.week, (weekDay, index) => {
      return (openBlock(), createBlock(Fragment, { key: index }, [
        ($options.selectableDate(weekDay) && !$props.disabled)
          ? (openBlock(), createBlock("a", {
              key: 0,
              ref: `day-${weekDay.getMonth()}-${weekDay.getDate()}`,
              class: [$options.classObject(weekDay), "datepicker-cell"],
              role: "button",
              href: "#",
              disabled: $props.disabled,
              onClick: withModifiers($event => ($options.emitChosenDate(weekDay)), ["prevent"]),
              onMouseenter: $event => ($options.setRangeHoverEndDate(weekDay)),
              onKeydown: $event => ($options.manageKeydown($event, weekDay)),
              tabindex: $props.day === weekDay.getDate() ? null : -1
            }, [
              createVNode("span", null, toDisplayString(weekDay.getDate()), 1 /* TEXT */),
              ($options.eventsDateMatch(weekDay))
                ? (openBlock(), createBlock("div", _hoisted_2$h, [
                    (openBlock(true), createBlock(Fragment, null, renderList($options.eventsDateMatch(weekDay), (event, evIdx) => {
                      return (openBlock(), createBlock("div", {
                        class: ["event", event.type],
                        key: evIdx
                      }, null, 2 /* CLASS */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]))
                : createCommentVNode("v-if", true)
            ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"]))
          : (openBlock(), createBlock("div", {
              key: 1,
              class: [$options.classObject(weekDay), "datepicker-cell"]
            }, [
              createVNode("span", null, toDisplayString(weekDay.getDate()), 1 /* TEXT */),
              ($options.eventsDateMatch(weekDay))
                ? (openBlock(), createBlock("div", _hoisted_3$d, [
                    (openBlock(true), createBlock(Fragment, null, renderList($options.eventsDateMatch(weekDay), (event, evIdx) => {
                      return (openBlock(), createBlock("div", {
                        class: ["event", event.type],
                        key: evIdx
                      }, null, 2 /* CLASS */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]))
                : createCommentVNode("v-if", true)
            ], 2 /* CLASS */))
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script$M.render = render$G;
script$M.__file = "src/components/datepicker/DatepickerTableRow.vue";

var script$L = {
    name: 'BDatepickerTable',
    components: {
        [script$M.name]: script$M
    },
    props: {
        modelValue: {
            type: [Date, Array]
        },
        dayNames: Array,
        monthNames: Array,
        firstDayOfWeek: Number,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: Array,
        selectableDates: [Array, Function],
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        rulesForFirstWeek: Number,
        range: Boolean,
        multiple: Boolean
    },
    emits: ['range-end', 'range-start', 'update:focused', 'update:modelValue'],
    data() {
        return {
            selectedBeginDate: undefined,
            selectedEndDate: undefined,
            hoveredEndDate: undefined
        }
    },
    computed: {
        multipleSelectedDates: {
            get() {
                return this.multiple && this.modelValue ? this.modelValue : []
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        },
        visibleDayNames() {
            const visibleDayNames = [];
            let index = this.firstDayOfWeek;
            while (visibleDayNames.length < this.dayNames.length) {
                const currentDayName = this.dayNames[(index % this.dayNames.length)];
                visibleDayNames.push(currentDayName);
                index++;
            }
            if (this.showWeekNumber) visibleDayNames.unshift('');
            return visibleDayNames
        },

        hasEvents() {
            return this.events && this.events.length
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisMonth() {
            if (!this.events) return []

            const monthEvents = [];

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i];

                if (!Object.prototype.hasOwnProperty.call(event, 'date')) {
                    event = { date: event };
                }
                if (!Object.prototype.hasOwnProperty.call(event, 'type')) {
                    event.type = 'is-primary';
                }
                if (
                    event.date.getMonth() === this.focused.month &&
                    event.date.getFullYear() === this.focused.year
                ) {
                    monthEvents.push(event);
                }
            }

            return monthEvents
        },
        /*
        * Return array of all weeks in the specified month
        */
        weeksInThisMonth() {
            this.validateFocusedDay();
            const month = this.focused.month;
            const year = this.focused.year;
            const weeksInThisMonth = [];

            let startingDay = 1;

            while (weeksInThisMonth.length < 6) {
                const newWeek = this.weekBuilder(startingDay, month, year);
                weeksInThisMonth.push(newWeek);
                startingDay += 7;
            }

            return weeksInThisMonth
        },
        hoveredDateRange() {
            if (!this.range) {
                return []
            }
            if (!isNaN(this.selectedEndDate)) {
                return []
            }
            if (this.hoveredEndDate < this.selectedBeginDate) {
                return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined)
            }
            return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined)
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    methods: {
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
            if (!this.range && !this.multiple) {
                this.$emit('update:modelValue', date);
            } else if (this.range) {
                this.handleSelectRangeDate(date);
            } else if (this.multiple) {
                this.handleSelectMultipleDates(date);
            }
        },

        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
            if (this.selectedBeginDate && this.selectedEndDate) {
                this.selectedBeginDate = date;
                this.selectedEndDate = undefined;
                this.$emit('range-start', date);
            } else if (this.selectedBeginDate && !this.selectedEndDate) {
                if (this.selectedBeginDate > date) {
                    this.selectedEndDate = this.selectedBeginDate;
                    this.selectedBeginDate = date;
                } else {
                    this.selectedEndDate = date;
                }
                this.$emit('range-end', date);
                this.$emit('update:modelValue', [this.selectedBeginDate, this.selectedEndDate]);
            } else {
                this.selectedBeginDate = date;
                this.$emit('range-start', date);
            }
        },

        /*
        * If selected date already exists list of selected dates, remove it from the list
        * Otherwise, add date to list of selected dates
        */
        handleSelectMultipleDates(date) {
            const multipleSelect = this.multipleSelectedDates.filter((selectedDate) =>
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth()
            );
            if (multipleSelect.length) {
                this.multipleSelectedDates = this.multipleSelectedDates.filter((selectedDate) =>
                    selectedDate.getDate() !== date.getDate() ||
                    selectedDate.getFullYear() !== date.getFullYear() ||
                    selectedDate.getMonth() !== date.getMonth()
                );
            } else {
                this.multipleSelectedDates = [...this.multipleSelectedDates, date];
            }
        },

        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate, month, year) {
            const thisMonth = new Date(year, month);

            const thisWeek = [];

            const dayOfWeek = new Date(year, month, startingDate).getDay();

            const end = dayOfWeek >= this.firstDayOfWeek
                ? (dayOfWeek - this.firstDayOfWeek)
                : ((7 - this.firstDayOfWeek) + dayOfWeek);

            let daysAgo = 1;
            for (let i = 0; i < end; i++) {
                thisWeek.unshift(new Date(
                    thisMonth.getFullYear(),
                    thisMonth.getMonth(),
                    startingDate - daysAgo)
                );
                daysAgo++;
            }

            thisWeek.push(new Date(year, month, startingDate));

            let daysForward = 1;
            while (thisWeek.length < 7) {
                thisWeek.push(new Date(year, month, startingDate + daysForward));
                daysForward++;
            }

            return thisWeek
        },

        validateFocusedDay() {
            const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
            if (this.selectableDate(focusedDate)) return

            let day = 0;
            // Number of days in the current month
            const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
            let firstFocusable = null;
            while (!firstFocusable && ++day < monthDays) {
                const date = new Date(this.focused.year, this.focused.month, day);
                if (this.selectableDate(date)) {
                    firstFocusable = focusedDate;

                    const focused = {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    };
                    this.$emit('update:focused', focused);
                }
            }
        },

        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
            const validity = [];

            if (this.minDate) {
                validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate);
            }

            if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
                validity.push(day.getMonth() === this.focused.month);
            }

            if (this.selectableDates) {
                if (typeof this.selectableDates === 'function') {
                    if (this.selectableDates(day)) {
                        return true
                    } else {
                        validity.push(false);
                    }
                } else {
                    for (let i = 0; i < this.selectableDates.length; i++) {
                        const enabledDate = this.selectableDates[i];
                        if (day.getDate() === enabledDate.getDate() &&
                            day.getFullYear() === enabledDate.getFullYear() &&
                            day.getMonth() === enabledDate.getMonth()) {
                            return true
                        } else {
                            validity.push(false);
                        }
                    }
                }
            }

            if (this.unselectableDates) {
                if (typeof this.unselectableDates === 'function') {
                    validity.push(!this.unselectableDates(day));
                } else {
                    for (let i = 0; i < this.unselectableDates.length; i++) {
                        const disabledDate = this.unselectableDates[i];
                        validity.push(
                            day.getDate() !== disabledDate.getDate() ||
                                day.getFullYear() !== disabledDate.getFullYear() ||
                                day.getMonth() !== disabledDate.getMonth()
                        );
                    }
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
                    const dayOfWeek = this.unselectableDaysOfWeek[i];
                    validity.push(day.getDay() !== dayOfWeek);
                }
            }

            return validity.indexOf(false) < 0
        },

        eventsInThisWeek(week) {
            return this.eventsInThisMonth.filter((event) => {
                const stripped = new Date(Date.parse(event.date));
                stripped.setHours(0, 0, 0, 0);
                const timed = stripped.getTime();

                return week.some((weekDate) => weekDate.getTime() === timed)
            })
        },

        setRangeHoverEndDate(day) {
            this.hoveredEndDate = day;
        },

        changeFocus(day) {
            const focused = {
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            };
            this.$emit('update:focused', focused);
        }
    }
};

const _hoisted_1$t = { class: "datepicker-table" };
const _hoisted_2$g = { class: "datepicker-header" };

function render$F(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_datepicker_table_row = resolveComponent("b-datepicker-table-row");

  return (openBlock(), createBlock("section", _hoisted_1$t, [
    createVNode("header", _hoisted_2$g, [
      (openBlock(true), createBlock(Fragment, null, renderList($options.visibleDayNames, (day, index) => {
        return (openBlock(), createBlock("div", {
          key: index,
          class: "datepicker-cell"
        }, [
          createVNode("span", null, toDisplayString(day), 1 /* TEXT */)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    createVNode("div", {
      class: ["datepicker-body", {'has-events':$options.hasEvents}]
    }, [
      (openBlock(true), createBlock(Fragment, null, renderList($options.weeksInThisMonth, (week, index) => {
        return (openBlock(), createBlock(_component_b_datepicker_table_row, {
          key: index,
          "selected-date": $props.modelValue,
          day: $props.focused.day,
          week: week,
          month: $props.focused.month,
          "min-date": $props.minDate,
          "max-date": $props.maxDate,
          disabled: $options.disabledOrUndefined,
          "unselectable-dates": $props.unselectableDates,
          "unselectable-days-of-week": $props.unselectableDaysOfWeek,
          "selectable-dates": $props.selectableDates,
          events: $options.eventsInThisWeek(week),
          indicators: $props.indicators,
          "date-creator": $props.dateCreator,
          "nearby-month-days": $props.nearbyMonthDays,
          "nearby-selectable-month-days": $props.nearbySelectableMonthDays,
          "show-week-number": $props.showWeekNumber,
          "week-number-clickable": $props.weekNumberClickable,
          "first-day-of-week": $props.firstDayOfWeek,
          "rules-for-first-week": $props.rulesForFirstWeek,
          range: $props.range,
          "hovered-date-range": $options.hoveredDateRange,
          onSelect: $options.updateSelectedDate,
          onRangeHoverEndDate: $options.setRangeHoverEndDate,
          multiple: $props.multiple,
          onChangeFocus: $options.changeFocus
        }, null, 8 /* PROPS */, ["selected-date", "day", "week", "month", "min-date", "max-date", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "first-day-of-week", "rules-for-first-week", "range", "hovered-date-range", "onSelect", "onRangeHoverEndDate", "multiple", "onChangeFocus"]))
      }), 128 /* KEYED_FRAGMENT */))
    ], 2 /* CLASS */)
  ]))
}

script$L.render = render$F;
script$L.__file = "src/components/datepicker/DatepickerTable.vue";

var script$K = {
    name: 'BDatepickerMonth',
    props: {
        modelValue: {
            type: [Date, Array]
        },
        monthNames: Array,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: Array,
        selectableDates: [Array, Function],
        range: Boolean,
        multiple: Boolean
    },
    emits: ['change-focus', 'range-end', 'range-start', 'update:modelValue'],
    data() {
        return {
            selectedBeginDate: undefined,
            selectedEndDate: undefined,
            hoveredEndDate: undefined,
            multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
        }
    },
    computed: {
        hasEvents() {
            return this.events && this.events.length
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisYear() {
            if (!this.events) return []

            const yearEvents = [];

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i];

                if (!Object.prototype.hasOwnProperty.call(event, 'date')) {
                    event = { date: event };
                }
                if (!Object.prototype.hasOwnProperty.call(event, 'type')) {
                    event.type = 'is-primary';
                }
                if (
                    event.date.getFullYear() === this.focused.year
                ) {
                    yearEvents.push(event);
                }
            }

            return yearEvents
        },
        monthDates() {
            const year = this.focused.year;
            const months = [];
            for (let i = 0; i < 12; i++) {
                const d = new Date(year, i, 1);
                d.setHours(0, 0, 0, 0);
                months.push(d);
            }
            return months
        },

        focusedMonth() {
            return this.focused.month
        },

        hoveredDateRange() {
            if (!this.range) {
                return []
            }
            if (!isNaN(this.selectedEndDate)) {
                return []
            }
            if (this.hoveredEndDate < this.selectedBeginDate) {
                return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined)
            }
            return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined)
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        focusedMonth(month) {
            const refName = `month-${month}`;
            if (this.$refs[refName] && this.$refs[refName].length > 0) {
                this.$nextTick(() => {
                    if (this.$refs[refName][0]) {
                        this.$refs[refName][0].focus();
                    }
                }); // $nextTick needed when year is changed
            }
        }
    },
    methods: {
        selectMultipleDates(date) {
            const multipleSelect = this.multipleSelectedDates.filter((selectedDate) =>
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth()
            );
            if (multipleSelect.length) {
                this.multipleSelectedDates = this.multipleSelectedDates.filter((selectedDate) =>
                    selectedDate.getDate() !== date.getDate() ||
                    selectedDate.getFullYear() !== date.getFullYear() ||
                    selectedDate.getMonth() !== date.getMonth()
                );
            } else {
                this.multipleSelectedDates.push(date);
            }
            this.$emit('update:modelValue', this.multipleSelectedDates);
        },

        selectableDate(day) {
            const validity = [];

            if (this.minDate) {
                validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate);
            }

            validity.push(day.getFullYear() === this.focused.year);

            if (this.selectableDates) {
                if (typeof this.selectableDates === 'function') {
                    if (this.selectableDates(day)) {
                        return true
                    } else {
                        validity.push(false);
                    }
                } else {
                    for (let i = 0; i < this.selectableDates.length; i++) {
                        const enabledDate = this.selectableDates[i];
                        if (day.getFullYear() === enabledDate.getFullYear() &&
                            day.getMonth() === enabledDate.getMonth()) {
                            return true
                        } else {
                            validity.push(false);
                        }
                    }
                }
            }

            if (this.unselectableDates) {
                if (typeof this.unselectableDates === 'function') {
                    validity.push(!this.unselectableDates(day));
                } else {
                    for (let i = 0; i < this.unselectableDates.length; i++) {
                        const disabledDate = this.unselectableDates[i];
                        validity.push(
                            day.getFullYear() !== disabledDate.getFullYear() ||
                                day.getMonth() !== disabledDate.getMonth()
                        );
                    }
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
                    const dayOfWeek = this.unselectableDaysOfWeek[i];
                    validity.push(day.getDay() !== dayOfWeek);
                }
            }

            return validity.indexOf(false) < 0
        },
        eventsDateMatch(day) {
            if (!this.eventsInThisYear.length) return false

            const monthEvents = [];

            for (let i = 0; i < this.eventsInThisYear.length; i++) {
                if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
                    monthEvents.push(this.events[i]);
                }
            }

            if (!monthEvents.length) {
                return false
            }

            return monthEvents
        },
        /*
        * Build classObject for cell using validations
        */
        classObject(day) {
            function dateMatch(dateOne, dateTwo, multiple) {
                // if either date is null or undefined, return false
                if (!dateOne || !dateTwo || multiple) {
                    return false
                }
                if (Array.isArray(dateTwo)) {
                    return dateTwo.some((date) => (
                        dateOne.getFullYear() === date.getFullYear() &&
                        dateOne.getMonth() === date.getMonth()
                    ))
                }
                return (dateOne.getFullYear() === dateTwo.getFullYear() &&
                    dateOne.getMonth() === dateTwo.getMonth())
            }
            function dateWithin(dateOne, dates, multiple) {
                if (!Array.isArray(dates) || multiple) { return false }

                return dateOne > dates[0] && dateOne < dates[1]
            }
            function dateMultipleSelected(dateOne, dates, multiple) {
                if (!Array.isArray(dates) || !multiple) { return false }
                return dates.some((date) => (
                    dateOne.getDate() === date.getDate() &&
                    dateOne.getFullYear() === date.getFullYear() &&
                    dateOne.getMonth() === date.getMonth()
                ))
            }

            return {
                'is-selected': dateMatch(day, this.modelValue, this.multiple) ||
                               dateWithin(day, this.modelValue, this.multiple) ||
                               dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
                'is-first-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.modelValue) && this.modelValue[0],
                        this.multiple
                    ),
                'is-within-selected':
                    dateWithin(day, this.modelValue, this.multiple),
                'is-last-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.modelValue) && this.modelValue[1],
                        this.multiple
                    ),
                'is-within-hovered-range':
                    this.hoveredDateRange && this.hoveredDateRange.length === 2 &&
                    (dateMatch(day, this.hoveredDateRange) ||
                        dateWithin(day, this.hoveredDateRange)),
                'is-first-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0]
                ),
                'is-within-hovered':
                    dateWithin(day, this.hoveredDateRange),
                'is-last-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1]
                ),
                'is-today': dateMatch(day, this.dateCreator()),
                'is-selectable': this.selectableDate(day) && !this.disabled,
                'is-unselectable': !this.selectableDate(day) || this.disabled
            }
        },

        manageKeydown({ key }, date) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            switch (key) {
                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.updateSelectedDate(date);
                    break
                }

                case 'ArrowLeft':
                case 'Left': {
                    this.changeFocus(date, -1);
                    break
                }
                case 'ArrowRight':
                case 'Right': {
                    this.changeFocus(date, 1);
                    break
                }
                case 'ArrowUp':
                case 'Up': {
                    this.changeFocus(date, -3);
                    break
                }
                case 'ArrowDown':
                case 'Down': {
                    this.changeFocus(date, 3);
                    break
                }
            }
        },

        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
            if (!this.range && !this.multiple) {
                this.emitChosenDate(date);
            } else if (this.range) {
                this.handleSelectRangeDate(date);
            } else if (this.multiple) {
                this.selectMultipleDates(date);
            }
        },

        /*
         * Emit select event with chosen date as payload
         */
        emitChosenDate(day) {
            if (this.disabled) return

            if (!this.multiple) {
                if (this.selectableDate(day)) {
                    this.$emit('update:modelValue', day);
                }
            } else {
                this.selectMultipleDates(day);
            }
        },

        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
            if (this.disabled) return
            if (this.selectedBeginDate && this.selectedEndDate) {
                this.selectedBeginDate = date;
                this.selectedEndDate = undefined;
                this.$emit('range-start', date);
            } else if (this.selectedBeginDate && !this.selectedEndDate) {
                if (this.selectedBeginDate > date) {
                    this.selectedEndDate = this.selectedBeginDate;
                    this.selectedBeginDate = date;
                } else {
                    this.selectedEndDate = date;
                }
                this.$emit('range-end', date);
                this.$emit('update:modelValue', [this.selectedBeginDate, this.selectedEndDate]);
            } else {
                this.selectedBeginDate = date;
                this.$emit('range-start', date);
            }
        },

        setRangeHoverEndDate(day) {
            if (this.range) {
                this.hoveredEndDate = day;
            }
        },

        changeFocus(month, inc) {
            const nextMonth = month;
            nextMonth.setMonth(month.getMonth() + inc);
            this.$emit('change-focus', nextMonth);
        }
    }
};

const _hoisted_1$s = { class: "datepicker-table" };
const _hoisted_2$f = { class: "datepicker-months" };
const _hoisted_3$c = {
  key: 0,
  class: "events"
};

function render$E(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("section", _hoisted_1$s, [
    createVNode("div", {
      class: ["datepicker-body", {'has-events':$options.hasEvents}]
    }, [
      createVNode("div", _hoisted_2$f, [
        (openBlock(true), createBlock(Fragment, null, renderList($options.monthDates, (date, index) => {
          return (openBlock(), createBlock(Fragment, { key: index }, [
            ($options.selectableDate(date) && !$props.disabled)
              ? (openBlock(), createBlock("a", {
                  key: 0,
                  ref: `month-${date.getMonth()}`,
                  class: [[
                            $options.classObject(date),
                            {'has-event': $options.eventsDateMatch(date)},
                            $props.indicators
                        ], "datepicker-cell"],
                  role: "button",
                  href: "#",
                  disabled: $options.disabledOrUndefined,
                  onClick: withModifiers($event => ($options.updateSelectedDate(date)), ["prevent"]),
                  onMouseenter: $event => ($options.setRangeHoverEndDate(date)),
                  onKeydown: withModifiers($event => ($options.manageKeydown($event, date)), ["prevent"]),
                  tabindex: $props.focused.month === date.getMonth() ? null : -1
                }, [
                  createTextVNode(toDisplayString($props.monthNames[date.getMonth()]) + " ", 1 /* TEXT */),
                  ($options.eventsDateMatch(date))
                    ? (openBlock(), createBlock("div", _hoisted_3$c, [
                        (openBlock(true), createBlock(Fragment, null, renderList($options.eventsDateMatch(date), (event, evIdx) => {
                          return (openBlock(), createBlock("div", {
                            class: ["event", event.type],
                            key: evIdx
                          }, null, 2 /* CLASS */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                    : createCommentVNode("v-if", true)
                ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"]))
              : (openBlock(), createBlock("div", {
                  key: 1,
                  class: [$options.classObject(date), "datepicker-cell"]
                }, toDisplayString($props.monthNames[date.getMonth()]), 3 /* TEXT, CLASS */))
          ], 64 /* STABLE_FRAGMENT */))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 2 /* CLASS */)
  ]))
}

script$K.render = render$E;
script$K.__file = "src/components/datepicker/DatepickerMonth.vue";

const defaultDateFormatter = (date, vm) => {
    const targetDates = Array.isArray(date) ? date : [date];
    const dates = targetDates.map((date) => {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
        return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d)
    });
    return !vm.multiple ? dates.join(' - ') : dates.join(', ')
};

const defaultDateParser = (date, vm) => {
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
        const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf)
            .formatToParts(new Date(2000, 11, 25)).map((part) => {
                if (part.type === 'literal') {
                    return part.value
                }
                return `((?!=<${part.type}>)\\d+)`
            }).join('');
        const dateGroups = matchWithGroups(formatRegex, date);

        // We do a simple validation for the group.
        // If it is not valid, it will fallback to Date.parse below
        if (
            dateGroups.year &&
            dateGroups.year.length === 4 &&
            dateGroups.month &&
            dateGroups.month <= 12
        ) {
            if (vm.isTypeMonth) return new Date(dateGroups.year, dateGroups.month - 1)
            else if (dateGroups.day && dateGroups.day <= 31) {
                return new Date(dateGroups.year, dateGroups.month - 1, dateGroups.day, 12)
            }
        }
    }
    // Fallback if formatToParts is not supported or if we were not able to parse a valid date
    if (!vm.isTypeMonth) return new Date(Date.parse(date))
    if (date) {
        const s = date.split('/');
        const year = s[0].length === 4 ? s[0] : s[1];
        const month = s[0].length === 2 ? s[0] : s[1];
        if (year && month) {
            return new Date(parseInt(year, 10), parseInt(month - 1, 10), 1, 0, 0, 0, 0)
        }
    }
    return null
};

var script$J = {
    name: 'BDatepicker',
    components: {
        [script$L.name]: script$L,
        [script$K.name]: script$K,
        [script$10.name]: script$10,
        [script$Q.name]: script$Q,
        [script$N.name]: script$N,
        [script$11.name]: script$11,
        [script$T.name]: script$T,
        [script$S.name]: script$S
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $datepicker: this
        }
    },
    props: {
        modelValue: {
            type: [Date, Array]
        },
        dayNames: {
            type: Array,
            default: () => {
                if (!Array.isArray(config.defaultDayNames)) {
                    return undefined
                }
                return config.defaultDayNames
            }
        },
        monthNames: {
            type: Array,
            default: () => {
                if (!Array.isArray(config.defaultMonthNames)) {
                    return undefined
                }
                return config.defaultMonthNames
            }
        },
        firstDayOfWeek: {
            type: Number,
            default: () => {
                if (typeof config.defaultFirstDayOfWeek === 'number') {
                    return config.defaultFirstDayOfWeek
                } else {
                    return 0
                }
            }
        },
        inline: Boolean,
        minDate: Date,
        maxDate: Date,
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        horizontalTimePicker: Boolean,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: {
            type: Array,
            default: () => config.defaultUnselectableDaysOfWeek
        },
        selectableDates: [Array, Function],
        dateFormatter: {
            type: Function,
            default: (date, vm) => {
                if (typeof config.defaultDateFormatter === 'function') {
                    return config.defaultDateFormatter(date)
                } else {
                    return defaultDateFormatter(date, vm)
                }
            }
        },
        dateParser: {
            type: Function,
            default: (date, vm) => {
                if (typeof config.defaultDateParser === 'function') {
                    return config.defaultDateParser(date)
                } else {
                    return defaultDateParser(date, vm)
                }
            }
        },
        dateCreator: {
            type: Function,
            default: () => {
                if (typeof config.defaultDateCreator === 'function') {
                    return config.defaultDateCreator()
                } else {
                    return new Date()
                }
            }
        },
        mobileNative: {
            type: Boolean,
            default: () => config.defaultDatepickerMobileNative
        },
        position: String,
        iconRight: String,
        events: Array,
        indicators: {
            type: String,
            default: 'dots'
        },
        openOnFocus: Boolean,
        iconPrev: {
            type: String,
            default: () => config.defaultIconPrev
        },
        iconNext: {
            type: String,
            default: () => config.defaultIconNext
        },
        yearsRange: {
            type: Array,
            default: () => config.defaultDatepickerYearsRange
        },
        type: {
            type: String,
            validator: (value) => {
                return [
                    'month'
                ].indexOf(value) >= 0
            }
        },
        nearbyMonthDays: {
            type: Boolean,
            default: () => config.defaultDatepickerNearbyMonthDays
        },
        nearbySelectableMonthDays: {
            type: Boolean,
            default: () => config.defaultDatepickerNearbySelectableMonthDays
        },
        showWeekNumber: {
            type: Boolean,
            default: () => config.defaultDatepickerShowWeekNumber
        },
        weekNumberClickable: {
            type: Boolean,
            default: () => config.defaultDatepickerWeekNumberClickable
        },
        rulesForFirstWeek: {
            type: Number,
            default: () => 4
        },
        range: {
            type: Boolean,
            default: false
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        mobileModal: {
            type: Boolean,
            default: () => config.defaultDatepickerMobileModal
        },
        focusable: {
            type: Boolean,
            default: true
        },
        trapFocus: {
            type: Boolean,
            default: () => config.defaultTrapFocus
        },
        appendToBody: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    emits: [
        'change-month',
        'change-year',
        'range-end',
        'range-start',
        'update:modelValue',
        'week-number-click' // emitted from `DatepickerTableRow`
    ],
    data() {
        const focusedDate = (Array.isArray(this.modelValue)
            ? this.modelValue[0]
            : (this.modelValue)) || this.focusedDate || this.dateCreator();

        if (!this.modelValue &&
            this.maxDate &&
            this.maxDate.getFullYear() < focusedDate.getFullYear()) {
            focusedDate.setFullYear(this.maxDate.getFullYear());
        }

        return {
            dateSelected: this.modelValue,
            focusedDateData: {
                day: focusedDate.getDate(),
                month: focusedDate.getMonth(),
                year: focusedDate.getFullYear()
            },
            _elementRef: 'input',
            _isDatepicker: true
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.dateSelected
            },
            set(value) {
                this.updateInternalState(value);
                if (!this.multiple) this.togglePicker(false);
                this.$emit('update:modelValue', value);
                if (this.useHtml5Validation) {
                    this.$nextTick(() => {
                        this.checkHtml5Validity();
                    });
                }
            }
        },
        formattedValue() {
            return this.formatValue(this.computedValue)
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric'
            }).resolvedOptions()
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale, { timeZone: 'UTC' })
        },
        dtfMonth() {
            return new Intl.DateTimeFormat(this.locale, {
                year: this.localeOptions.year || 'numeric',
                month: this.localeOptions.month || '2-digit',
                timeZone: 'UTC'
            })
        },
        newMonthNames() {
            if (Array.isArray(this.monthNames)) {
                return this.monthNames
            }
            return getMonthNames(this.locale)
        },
        newDayNames() {
            if (Array.isArray(this.dayNames)) {
                return this.dayNames
            }
            return getWeekdayNames(this.locale)
        },
        listOfMonths() {
            let minMonth = 0;
            let maxMonth = 12;
            if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
                minMonth = this.minDate.getMonth();
            }
            if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
                maxMonth = this.maxDate.getMonth();
            }
            return this.newMonthNames.map((name, index) => {
                return {
                    name: name,
                    index: index,
                    disabled: index < minMonth || index > maxMonth
                }
            })
        },
        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
            let latestYear = this.focusedDateData.year + this.yearsRange[1];
            if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
                latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
            }

            let earliestYear = this.focusedDateData.year + this.yearsRange[0];
            if (this.minDate && this.minDate.getFullYear() > earliestYear) {
                earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
            }

            const arrayOfYears = [];
            for (let i = earliestYear; i <= latestYear; i++) {
                arrayOfYears.push(i);
            }

            return arrayOfYears.reverse()
        },

        showPrev() {
            if (!this.minDate) return false
            if (this.isTypeMonth) {
                return this.focusedDateData.year <= this.minDate.getFullYear()
            }
            const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
            const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
            return (dateToCheck <= date)
        },

        showNext() {
            if (!this.maxDate) return false
            if (this.isTypeMonth) {
                return this.focusedDateData.year >= this.maxDate.getFullYear()
            }
            const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
            const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
            return (dateToCheck >= date)
        },

        isMobile() {
            return this.mobileNative && isMobile.any()
        },

        isTypeMonth() {
            return this.type === 'month'
        },

        ariaRole() {
            if (!this.inline) {
                return 'dialog'
            } else {
                return undefined
            }
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
            this.updateInternalState(value);
            if (!this.multiple) this.togglePicker(false);
        },

        focusedDate(value) {
            if (value) {
                this.focusedDateData = {
                    day: value.getDate(),
                    month: value.getMonth(),
                    year: value.getFullYear()
                };
            }
        },

        /*
         * Emit input event on month and/or year change
         */
        'focusedDateData.month'(value) {
            this.$emit('change-month', value);
        },
        'focusedDateData.year'(value) {
            this.$emit('change-year', value);
        }
    },
    methods: {
        /*
         * Parse string into date
         */
        onChange(value) {
            const date = this.dateParser(value, this);
            if (date && (!isNaN(date) ||
                (Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1])))) {
                this.computedValue = date;
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null;
                if (this.$refs.input) {
                    this.$refs.input.newValue = this.computedValue;
                }
            }
        },

        /*
         * Format date into string
         */
        formatValue(value) {
            if (Array.isArray(value)) {
                const isArrayWithValidDates = Array.isArray(value) && value.every((v) => !isNaN(v));
                return isArrayWithValidDates ? this.dateFormatter([...value], this) : null
            }
            return (value && !isNaN(value)) ? this.dateFormatter(value, this) : null
        },

        /*
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December) or decrement year when 'month'
         */
        prev() {
            if (this.disabled) return

            if (this.isTypeMonth) {
                this.focusedDateData.year -= 1;
            } else {
                if (this.focusedDateData.month > 0) {
                    this.focusedDateData.month -= 1;
                } else {
                    this.focusedDateData.month = 11;
                    this.focusedDateData.year -= 1;
                }
            }
        },

        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January) or increment year when 'month'
         */
        next() {
            if (this.disabled) return

            if (this.isTypeMonth) {
                this.focusedDateData.year += 1;
            } else {
                if (this.focusedDateData.month < 11) {
                    this.focusedDateData.month += 1;
                } else {
                    this.focusedDateData.month = 0;
                    this.focusedDateData.year += 1;
                }
            }
        },

        formatNative(value) {
            return this.isTypeMonth
                ? this.formatYYYYMM(value)
                : this.formatYYYYMMDD(value)
        },

        /*
         * Format date into string 'YYYY-MM-DD'
         */
        formatYYYYMMDD(value) {
            const date = new Date(value);
            if (value && !isNaN(date)) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day)
            }
            return ''
        },

        /*
         * Format date into string 'YYYY-MM'
         */
        formatYYYYMM(value) {
            const date = new Date(value);
            if (value && !isNaN(date)) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                return year + '-' +
                    ((month < 10 ? '0' : '') + month)
            }
            return ''
        },

        /*
         * Parse date from string
         */
        onChangeNativePicker(event) {
            const date = event.target.value;
            const s = date ? date.split('-') : [];
            if (s.length === 3) {
                const year = parseInt(s[0], 10);
                const month = parseInt(s[1]) - 1;
                const day = parseInt(s[2]);
                this.computedValue = new Date(year, month, day);
            } else {
                this.computedValue = null;
            }
        },
        updateInternalState(value) {
            const currentDate = Array.isArray(value)
                ? (!value.length ? this.dateCreator() : value[value.length - 1])
                : (!value ? this.dateCreator() : value);
            this.focusedDateData = {
                day: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear()
            };
            this.dateSelected = value;
        },

        /*
         * Toggle datepicker
         */
        togglePicker(active) {
            if (this.$refs.dropdown) {
                const isActive = typeof active === 'boolean'
                    ? active
                    : !this.$refs.dropdown.isActive;
                if (isActive) {
                    this.$refs.dropdown.isActive = isActive;
                } else if (this.closeOnClick) {
                    this.$refs.dropdown.isActive = isActive;
                }
            }
        },

        /*
         * Call default onFocus method and show datepicker
         */
        handleOnFocus(event) {
            this.onFocus(event);
            if (this.openOnFocus) {
                this.togglePicker(true);
            }
        },

        /*
         * Toggle dropdown
         */
        toggle() {
            if (this.mobileNative && this.isMobile) {
                const input = this.$refs.input.$refs.input;
                input.focus();
                input.click();
                return
            }
            this.$refs.dropdown.toggle();
        },

        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
            if (this.$refs.dropdown.isActive) {
                event.stopPropagation();
            }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress({ key }) {
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
                this.togglePicker(false);
            }
        },

        /**
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
            if (!value) {
                this.onBlur();
            }
        },

        changeFocus(day) {
            this.focusedDateData = {
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            };
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
};

const _hoisted_1$r = { class: "datepicker-header" };
const _hoisted_2$e = { class: "pagination-list" };
const _hoisted_3$b = { key: 1 };

function render$D(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_select = resolveComponent("b-select");
  const _component_b_field = resolveComponent("b-field");
  const _component_b_datepicker_table = resolveComponent("b-datepicker-table");
  const _component_b_datepicker_month = resolveComponent("b-datepicker-month");
  const _component_b_dropdown_item = resolveComponent("b-dropdown-item");
  const _component_b_dropdown = resolveComponent("b-dropdown");

  return (openBlock(), createBlock("div", {
    class: ["datepicker control", [_ctx.size, {'is-expanded': _ctx.expanded}]]
  }, [
    (!$options.isMobile || $props.inline)
      ? (openBlock(), createBlock(_component_b_dropdown, {
          key: 0,
          ref: "dropdown",
          position: $props.position,
          disabled: $options.disabledOrUndefined,
          inline: $props.inline,
          "mobile-modal": $props.mobileModal,
          "trap-focus": $props.trapFocus,
          "aria-role": $options.ariaRole,
          "aria-modal": !$props.inline,
          "append-to-body": $props.appendToBody,
          "append-to-body-copy-parent": "",
          onActiveChange: $options.onActiveChange
        }, createSlots({
          default: withCtx(() => [
            createVNode(_component_b_dropdown_item, {
              disabled: $options.disabledOrUndefined,
              focusable: $props.focusable,
              custom: "",
              class: {'dropdown-horizonal-timepicker': $props.horizontalTimePicker}
            }, {
              default: withCtx(() => [
                createVNode("div", null, [
                  createVNode("header", _hoisted_1$r, [
                    (_ctx.$slots.header !== undefined)
                      ? renderSlot(_ctx.$slots, "header", { key: 0 })
                      : (openBlock(), createBlock("div", {
                          key: 1,
                          class: ["pagination field is-centered", _ctx.size]
                        }, [
                          withDirectives(createVNode("a", {
                            class: "pagination-previous",
                            role: "button",
                            href: "#",
                            disabled: $options.disabledOrUndefined,
                            "aria-label": $props.ariaPreviousLabel,
                            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => ($options.prev && $options.prev(...args)), ["prevent"])),
                            onKeydown: [
                              _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => ($options.prev && $options.prev(...args)), ["prevent"]), ["enter"])),
                              _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => ($options.prev && $options.prev(...args)), ["prevent"]), ["space"]))
                            ]
                          }, [
                            createVNode(_component_b_icon, {
                              icon: $props.iconPrev,
                              pack: _ctx.iconPack,
                              both: "",
                              type: "is-primary is-clickable"
                            }, null, 8 /* PROPS */, ["icon", "pack"])
                          ], 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label"]), [
                            [vShow, !$options.showPrev && !$props.disabled]
                          ]),
                          withDirectives(createVNode("a", {
                            class: "pagination-next",
                            role: "button",
                            href: "#",
                            disabled: $options.disabledOrUndefined,
                            "aria-label": $props.ariaNextLabel,
                            onClick: _cache[6] || (_cache[6] = withModifiers((...args) => ($options.next && $options.next(...args)), ["prevent"])),
                            onKeydown: [
                              _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => ($options.next && $options.next(...args)), ["prevent"]), ["enter"])),
                              _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => ($options.next && $options.next(...args)), ["prevent"]), ["space"]))
                            ]
                          }, [
                            createVNode(_component_b_icon, {
                              icon: $props.iconNext,
                              pack: _ctx.iconPack,
                              both: "",
                              type: "is-primary is-clickable"
                            }, null, 8 /* PROPS */, ["icon", "pack"])
                          ], 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label"]), [
                            [vShow, !$options.showNext && !$props.disabled]
                          ]),
                          createVNode("div", _hoisted_2$e, [
                            createVNode(_component_b_field, null, {
                              default: withCtx(() => [
                                (!$options.isTypeMonth)
                                  ? (openBlock(), createBlock(_component_b_select, {
                                      key: 0,
                                      modelValue: $data.focusedDateData.month,
                                      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ($data.focusedDateData.month = $event)),
                                      disabled: $options.disabledOrUndefined,
                                      size: _ctx.size
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList($options.listOfMonths, (month) => {
                                          return (openBlock(), createBlock("option", {
                                            value: month.index,
                                            key: month.name,
                                            disabled: month.disabled || undefined
                                          }, toDisplayString(month.name), 9 /* TEXT, PROPS */, ["value", "disabled"]))
                                        }), 128 /* KEYED_FRAGMENT */))
                                      ]),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["modelValue", "disabled", "size"]))
                                  : createCommentVNode("v-if", true),
                                createVNode(_component_b_select, {
                                  modelValue: $data.focusedDateData.year,
                                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ($data.focusedDateData.year = $event)),
                                  disabled: $options.disabledOrUndefined,
                                  size: _ctx.size
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList($options.listOfYears, (year) => {
                                      return (openBlock(), createBlock("option", {
                                        value: year,
                                        key: year
                                      }, toDisplayString(year), 9 /* TEXT, PROPS */, ["value"]))
                                    }), 128 /* KEYED_FRAGMENT */))
                                  ]),
                                  _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["modelValue", "disabled", "size"])
                              ]),
                              _: 1 /* STABLE */
                            })
                          ])
                        ], 2 /* CLASS */))
                  ]),
                  (!$options.isTypeMonth)
                    ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["datepicker-content", {'content-horizonal-timepicker': $props.horizontalTimePicker}]
                      }, [
                        createVNode(_component_b_datepicker_table, {
                          modelValue: $options.computedValue,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ($options.computedValue = $event)),
                          "day-names": $options.newDayNames,
                          "month-names": $options.newMonthNames,
                          "first-day-of-week": $props.firstDayOfWeek,
                          "rules-for-first-week": $props.rulesForFirstWeek,
                          "min-date": $props.minDate,
                          "max-date": $props.maxDate,
                          focused: $data.focusedDateData,
                          disabled: $options.disabledOrUndefined,
                          "unselectable-dates": $props.unselectableDates,
                          "unselectable-days-of-week": $props.unselectableDaysOfWeek,
                          "selectable-dates": $props.selectableDates,
                          events: $props.events,
                          indicators: $props.indicators,
                          "date-creator": $props.dateCreator,
                          "type-month": $options.isTypeMonth,
                          "nearby-month-days": $props.nearbyMonthDays,
                          "nearby-selectable-month-days": $props.nearbySelectableMonthDays,
                          "show-week-number": $props.showWeekNumber,
                          "week-number-clickable": $props.weekNumberClickable,
                          range: $props.range,
                          multiple: $props.multiple,
                          onRangeStart: _cache[12] || (_cache[12] = date => _ctx.$emit('range-start', date)),
                          onRangeEnd: _cache[13] || (_cache[13] = date => _ctx.$emit('range-end', date)),
                          onClose: _cache[14] || (_cache[14] = $event => ($options.togglePicker(false))),
                          "onUpdate:focused": _cache[15] || (_cache[15] = $event => ($data.focusedDateData = $event))
                        }, null, 8 /* PROPS */, ["modelValue", "day-names", "month-names", "first-day-of-week", "rules-for-first-week", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "type-month", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "range", "multiple"])
                      ], 2 /* CLASS */))
                    : (openBlock(), createBlock("div", _hoisted_3$b, [
                        createVNode(_component_b_datepicker_month, {
                          modelValue: $options.computedValue,
                          "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ($options.computedValue = $event)),
                          "month-names": $options.newMonthNames,
                          "min-date": $props.minDate,
                          "max-date": $props.maxDate,
                          focused: $data.focusedDateData,
                          disabled: $options.disabledOrUndefined,
                          "unselectable-dates": $props.unselectableDates,
                          "unselectable-days-of-week": $props.unselectableDaysOfWeek,
                          "selectable-dates": $props.selectableDates,
                          events: $props.events,
                          indicators: $props.indicators,
                          "date-creator": $props.dateCreator,
                          range: $props.range,
                          multiple: $props.multiple,
                          onRangeStart: _cache[17] || (_cache[17] = date => _ctx.$emit('range-start', date)),
                          onRangeEnd: _cache[18] || (_cache[18] = date => _ctx.$emit('range-end', date)),
                          onClose: _cache[19] || (_cache[19] = $event => ($options.togglePicker(false))),
                          onChangeFocus: $options.changeFocus,
                          "onUpdate:focused": _cache[20] || (_cache[20] = $event => ($data.focusedDateData = $event))
                        }, null, 8 /* PROPS */, ["modelValue", "month-names", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "range", "multiple", "onChangeFocus"])
                      ]))
                ]),
                (_ctx.$slots.default !== undefined)
                  ? (openBlock(), createBlock("footer", {
                      key: 0,
                      class: ["datepicker-footer", {'footer-horizontal-timepicker': $props.horizontalTimePicker}]
                    }, [
                      renderSlot(_ctx.$slots, "default")
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true)
              ]),
              _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["disabled", "focusable", "class"])
          ]),
          _: 2 /* DYNAMIC */
        }, [
          (!$props.inline)
            ? {
                name: "trigger",
                fn: withCtx(() => [
                  renderSlot(_ctx.$slots, "trigger", {}, () => [
                    createVNode(_component_b_input, mergeProps({
                      ref: "input",
                      autocomplete: "off",
                      "model-value": $options.formattedValue,
                      placeholder: $props.placeholder,
                      size: _ctx.size,
                      icon: _ctx.icon,
                      "icon-right": $props.iconRight,
                      "icon-pack": _ctx.iconPack,
                      rounded: _ctx.rounded,
                      loading: _ctx.loading,
                      disabled: $options.disabledOrUndefined,
                      readonly: !$props.editable
                    }, _ctx.$attrs, {
                      "use-html5-validation": false,
                      onClick: $options.onInputClick,
                      onKeyup: _cache[1] || (_cache[1] = withKeys($event => ($options.togglePicker(true)), ["enter"])),
                      onChange: _cache[2] || (_cache[2] = $event => ($options.onChange($event.target.value))),
                      onFocus: $options.handleOnFocus
                    }), null, 16 /* FULL_PROPS */, ["model-value", "placeholder", "size", "icon", "icon-right", "icon-pack", "rounded", "loading", "disabled", "readonly", "onClick", "onFocus"])
                  ])
                ])
              }
            : undefined
        ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "aria-modal", "append-to-body", "onActiveChange"]))
      : (openBlock(), createBlock(_component_b_input, mergeProps({
          key: 1,
          ref: "input",
          type: !$options.isTypeMonth ? 'date' : 'month',
          autocomplete: "off",
          "model-value": $options.formatNative($options.computedValue),
          placeholder: $props.placeholder,
          size: _ctx.size,
          icon: _ctx.icon,
          "icon-pack": _ctx.iconPack,
          rounded: _ctx.rounded,
          loading: _ctx.loading,
          max: $options.formatNative($props.maxDate),
          min: $options.formatNative($props.minDate),
          disabled: $options.disabledOrUndefined,
          readonly: false
        }, _ctx.$attrs, {
          "use-html5-validation": false,
          onChange: $options.onChangeNativePicker,
          onFocus: _ctx.onFocus,
          onBlur: _ctx.onBlur
        }), null, 16 /* FULL_PROPS */, ["type", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "onChange", "onFocus", "onBlur"]))
  ], 2 /* CLASS */))
}

script$J.render = render$D;
script$J.__file = "src/components/datepicker/Datepicker.vue";

var Plugin$12 = {
  install: function install(Vue) {
    registerComponent(Vue, script$J);
  }
};
use(Plugin$12);
var Plugin$13 = Plugin$12;

var script$I = {
    name: 'BTimepicker',
    components: {
        [script$10.name]: script$10,
        [script$Q.name]: script$Q,
        [script$N.name]: script$N,
        [script$11.name]: script$11,
        [script$T.name]: script$T,
        [script$S.name]: script$S
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

const _hoisted_1$q = { class: "control is-colon" };
const _hoisted_2$d = { class: "control is-colon" };
const _hoisted_3$a = { class: "control is-colon" };
const _hoisted_4$8 = {
  key: 0,
  class: "timepicker-footer"
};

function render$C(_ctx, _cache, $props, $setup, $data, $options) {
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
                    createVNode("span", _hoisted_1$q, toDisplayString(_ctx.hourLiteral), 1 /* TEXT */),
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
                          createVNode("span", _hoisted_2$d, toDisplayString(_ctx.minuteLiteral), 1 /* TEXT */),
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
                          createVNode("span", _hoisted_3$a, toDisplayString(_ctx.secondLiteral), 1 /* TEXT */)
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
                  ? (openBlock(), createBlock("footer", _hoisted_4$8, [
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

script$I.render = render$C;
script$I.__file = "src/components/timepicker/Timepicker.vue";

const AM = 'AM';
const PM = 'PM';
var script$H = {
    name: 'BDatetimepicker',
    components: {
        [script$J.name]: script$J,
        [script$I.name]: script$I
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Date
        },
        editable: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        horizontalTimePicker: Boolean,
        disabled: Boolean,
        icon: String,
        iconPack: String,
        inline: Boolean,
        openOnFocus: Boolean,
        position: String,
        mobileNative: {
            type: Boolean,
            default: true
        },
        minDatetime: Date,
        maxDatetime: Date,
        datetimeFormatter: {
            type: Function
        },
        datetimeParser: {
            type: Function
        },
        datetimeCreator: {
            type: Function,
            default: (date) => {
                if (typeof config.defaultDatetimeCreator === 'function') {
                    return config.defaultDatetimeCreator(date)
                } else {
                    return date
                }
            }
        },
        datepicker: Object,
        timepicker: Object,
        tzOffset: {
            type: Number,
            default: 0
        },
        focusable: {
            type: Boolean,
            default: true
        },
        appendToBody: Boolean
    },
    emits: [
        'change-month',
        'change-year',
        'update:modelValue'
    ],
    data() {
        return {
            newValue: this.adjustValue(this.modelValue)
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                if (value) {
                    let val = new Date(value.getTime());
                    if (this.newValue) {
                        // restore time part
                        if ((value.getDate() !== this.newValue.getDate() ||
                            value.getMonth() !== this.newValue.getMonth() ||
                            value.getFullYear() !== this.newValue.getFullYear()) &&
                            value.getHours() === 0 &&
                            value.getMinutes() === 0 &&
                            value.getSeconds() === 0) {
                            val.setHours(this.newValue.getHours(),
                                this.newValue.getMinutes(),
                                this.newValue.getSeconds(), 0);
                        }
                    } else {
                        val = this.datetimeCreator(value);
                    }
                    // check min and max range
                    if (this.minDatetime && val < this.adjustValue(this.minDatetime)) {
                        val = this.adjustValue(this.minDatetime);
                    } else if (this.maxDatetime && val > this.adjustValue(this.maxDatetime)) {
                        val = this.adjustValue(this.maxDatetime);
                    }
                    this.newValue = new Date(val.getTime());
                } else {
                    this.newValue = this.adjustValue(value);
                }
                const adjustedValue = this.adjustValue(this.newValue, true); // reverse adjust
                this.$emit('update:modelValue', adjustedValue);
            }
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: this.enableSeconds() ? 'numeric' : undefined
            }).resolvedOptions()
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale, {
                year: this.localeOptions.year || 'numeric',
                month: this.localeOptions.month || 'numeric',
                day: this.localeOptions.day || 'numeric',
                hour: this.localeOptions.hour || 'numeric',
                minute: this.localeOptions.minute || 'numeric',
                second: this.enableSeconds() ? this.localeOptions.second || 'numeric' : undefined,
                hour12: !this.isHourFormat24()
            })
        },
        isMobileNative() {
            return this.mobileNative && this.tzOffset === 0
        },
        isMobile() {
            return this.isMobileNative && isMobile.any()
        },
        minDate() {
            if (!this.minDatetime) {
                return this.datepicker ? this.adjustValue(this.datepicker.minDate) : null
            }
            const adjMinDatetime = this.adjustValue(this.minDatetime);
            return new Date(adjMinDatetime.getFullYear(),
                adjMinDatetime.getMonth(),
                adjMinDatetime.getDate(), 0, 0, 0, 0)
        },
        maxDate() {
            if (!this.maxDatetime) {
                return this.datepicker ? this.adjustValue(this.datepicker.maxDate) : null
            }
            const adjMaxDatetime = this.adjustValue(this.maxDatetime);
            return new Date(adjMaxDatetime.getFullYear(),
                adjMaxDatetime.getMonth(),
                adjMaxDatetime.getDate(), 0, 0, 0, 0)
        },
        minTime() {
            if (!this.minDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.adjustValue(this.timepicker.minTime) : null
            }
            const adjMinDatetime = this.adjustValue(this.minDatetime);
            if (adjMinDatetime.getFullYear() === this.newValue.getFullYear() &&
                adjMinDatetime.getMonth() === this.newValue.getMonth() &&
                adjMinDatetime.getDate() === this.newValue.getDate()) {
                return adjMinDatetime
            }
            return undefined
        },
        maxTime() {
            if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.adjustValue(this.timepicker.maxTime) : null
            }
            const adjMaxDatetime = this.adjustValue(this.maxDatetime);
            if (adjMaxDatetime.getFullYear() === this.newValue.getFullYear() &&
                adjMaxDatetime.getMonth() === this.newValue.getMonth() &&
                adjMaxDatetime.getDate() === this.newValue.getDate()) {
                return adjMaxDatetime
            }
            return undefined
        },
        datepickerSize() {
            return this.datepicker && this.datepicker.size
                ? this.datepicker.size
                : this.size
        },
        timepickerSize() {
            return this.timepicker && this.timepicker.size
                ? this.timepicker.size
                : this.size
        },
        timepickerDisabled() {
            return this.timepicker && this.timepicker.disabled
                ? this.timepicker.disabled
                : this.disabled
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        modelValue() {
            this.newValue = this.adjustValue(this.modelValue);
        },
        tzOffset() {
            this.newValue = this.adjustValue(this.modelValue);
        }
    },
    methods: {
        enableSeconds() {
            if (this.$refs.timepicker) {
                return this.$refs.timepicker.enableSeconds
            }
            return false
        },
        isHourFormat24() {
            if (this.$refs.timepicker) {
                return this.$refs.timepicker.isHourFormat24
            }
            return !this.localeOptions.hour12
        },
        adjustValue(value, reverse = false) {
            if (!value) return value
            if (reverse) {
                return new Date(value.getTime() - this.tzOffset * 60000)
            } else {
                return new Date(value.getTime() + this.tzOffset * 60000)
            }
        },
        defaultDatetimeParser(date) {
            if (typeof this.datetimeParser === 'function') {
                return this.datetimeParser(date)
            } else if (typeof config.defaultDatetimeParser === 'function') {
                return config.defaultDatetimeParser(date)
            } else {
                if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                    const dayPeriods = [AM, PM, AM.toLowerCase(), PM.toLowerCase()];
                    if (this.$refs.timepicker) {
                        dayPeriods.push(this.$refs.timepicker.amString);
                        dayPeriods.push(this.$refs.timepicker.pmString);
                    }
                    const parts = this.dtf.formatToParts(new Date());
                    const formatRegex = parts.map((part, idx) => {
                        if (part.type === 'literal') {
                            if (idx + 1 < parts.length && parts[idx + 1].type === 'hour') {
                                return '[^\\d]+'
                            }
                            return part.value.replace(/ /g, '\\s?')
                        } else if (part.type === 'dayPeriod') {
                            return `((?!=<${part.type}>)(${dayPeriods.join('|')})?)`
                        }
                        return `((?!=<${part.type}>)\\d+)`
                    }).join('');
                    const datetimeGroups = matchWithGroups(formatRegex, date);

                    // We do a simple validation for the group.
                    // If it is not valid, it will fallback to Date.parse below
                    if (
                        datetimeGroups.year &&
                        datetimeGroups.year.length === 4 &&
                        datetimeGroups.month &&
                        datetimeGroups.month <= 12 &&
                        datetimeGroups.day &&
                        datetimeGroups.day <= 31 &&
                        datetimeGroups.hour &&
                        datetimeGroups.hour >= 0 &&
                        datetimeGroups.hour < 24 &&
                        datetimeGroups.minute &&
                        datetimeGroups.minute >= 0 &&
                        datetimeGroups.minute < 59
                    ) {
                        const d = new Date(
                            datetimeGroups.year,
                            datetimeGroups.month - 1,
                            datetimeGroups.day,
                            datetimeGroups.hour,
                            datetimeGroups.minute,
                            datetimeGroups.second || 0);
                        return d
                    }
                }

                return new Date(Date.parse(date))
            }
        },
        defaultDatetimeFormatter(date) {
            if (typeof this.datetimeFormatter === 'function') {
                return this.datetimeFormatter(date)
            } else if (typeof config.defaultDatetimeFormatter === 'function') {
                return config.defaultDatetimeFormatter(date)
            } else {
                return this.dtf.format(date)
            }
        },
        /*
        * Parse date from string
        */
        onChangeNativePicker(event) {
            const date = event.target.value;
            const s = date ? date.split(/\D/) : [];
            if (s.length >= 5) {
                const year = parseInt(s[0], 10);
                const month = parseInt(s[1], 10) - 1;
                const day = parseInt(s[2], 10);
                const hours = parseInt(s[3], 10);
                const minutes = parseInt(s[4], 10);
                // Seconds are omitted intentionally; they are unsupported by input
                // type=datetime-local and cause the control to fail native validation
                this.computedValue = new Date(year, month, day, hours, minutes);
            } else {
                this.computedValue = null;
            }
        },
        formatNative(value) {
            const date = new Date(value);
            if (value && !isNaN(date)) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day) + 'T' +
                    ((hours < 10 ? '0' : '') + hours) + ':' +
                    ((minutes < 10 ? '0' : '') + minutes) + ':' +
                    ((seconds < 10 ? '0' : '') + seconds)
            }
            return ''
        },
        toggle() {
            this.$refs.datepicker.toggle();
        }
    },
    mounted() {
        if (!this.isMobile || this.inline) {
            // $refs attached, it's time to refresh datepicker (input)
            if (this.newValue) {
                this.$refs.datepicker.$forceUpdate();
            }
        }
    }
};

const _hoisted_1$p = { class: "level is-mobile" };
const _hoisted_2$c = {
  key: 0,
  class: "level-item has-text-centered"
};
const _hoisted_3$9 = { class: "level-item has-text-centered" };
const _hoisted_4$7 = {
  key: 1,
  class: "level-item has-text-centered"
};

function render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_timepicker = resolveComponent("b-timepicker");
  const _component_b_datepicker = resolveComponent("b-datepicker");
  const _component_b_input = resolveComponent("b-input");

  return (!$options.isMobile || $props.inline)
    ? (openBlock(), createBlock(_component_b_datepicker, mergeProps({
        key: 0,
        ref: "datepicker",
        modelValue: $options.computedValue,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($options.computedValue = $event))
      }, $props.datepicker, {
        rounded: _ctx.rounded,
        "open-on-focus": $props.openOnFocus,
        position: $props.position,
        loading: _ctx.loading,
        inline: $props.inline,
        editable: $props.editable,
        expanded: _ctx.expanded,
        "close-on-click": false,
        "date-formatter": $options.defaultDatetimeFormatter,
        "date-parser": $options.defaultDatetimeParser,
        "min-date": $options.minDate,
        "max-date": $options.maxDate,
        icon: $props.icon,
        "icon-pack": $props.iconPack,
        size: $options.datepickerSize,
        placeholder: $props.placeholder,
        "horizontal-time-picker": $props.horizontalTimePicker,
        range: false,
        disabled: $options.disabledOrUndefined,
        "mobile-native": $options.isMobileNative,
        locale: _ctx.locale,
        focusable: $props.focusable,
        "append-to-body": $props.appendToBody,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.onBlur,
        onChangeMonth: _cache[3] || (_cache[3] = $event => (_ctx.$emit('change-month', $event))),
        onChangeYear: _cache[4] || (_cache[4] = $event => (_ctx.$emit('change-year', $event)))
      }), {
        default: withCtx(() => [
          createVNode("nav", _hoisted_1$p, [
            (_ctx.$slots.left !== undefined)
              ? (openBlock(), createBlock("div", _hoisted_2$c, [
                  renderSlot(_ctx.$slots, "left")
                ]))
              : createCommentVNode("v-if", true),
            createVNode("div", _hoisted_3$9, [
              createVNode(_component_b_timepicker, mergeProps({ ref: "timepicker" }, $props.timepicker, {
                modelValue: $options.computedValue,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
                inline: "",
                editable: $props.editable,
                "min-time": $options.minTime,
                "max-time": $options.maxTime,
                size: $options.timepickerSize,
                disabled: $options.timepickerDisabled || undefined,
                focusable: $props.focusable,
                "mobile-native": $options.isMobileNative,
                locale: _ctx.locale
              }), null, 16 /* FULL_PROPS */, ["modelValue", "editable", "min-time", "max-time", "size", "disabled", "focusable", "mobile-native", "locale"])
            ]),
            (_ctx.$slots.right !== undefined)
              ? (openBlock(), createBlock("div", _hoisted_4$7, [
                  renderSlot(_ctx.$slots, "right")
                ]))
              : createCommentVNode("v-if", true)
          ])
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["modelValue", "rounded", "open-on-focus", "position", "loading", "inline", "editable", "expanded", "date-formatter", "date-parser", "min-date", "max-date", "icon", "icon-pack", "size", "placeholder", "horizontal-time-picker", "disabled", "mobile-native", "locale", "focusable", "append-to-body", "onFocus", "onBlur"]))
    : (openBlock(), createBlock(_component_b_input, mergeProps({
        key: 1,
        ref: "input",
        type: "datetime-local",
        autocomplete: "off",
        "model-value": $options.formatNative($options.computedValue),
        placeholder: $props.placeholder,
        size: _ctx.size,
        icon: $props.icon,
        "icon-pack": $props.iconPack,
        rounded: _ctx.rounded,
        loading: _ctx.loading,
        max: $options.formatNative($options.maxDate),
        min: $options.formatNative($options.minDate),
        disabled: $options.disabledOrUndefined,
        readonly: false
      }, _ctx.$attrs, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onChange: $options.onChangeNativePicker,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.onBlur
      }), null, 16 /* FULL_PROPS */, ["model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus", "onBlur"]))
}

script$H.render = render$B;
script$H.__file = "src/components/datetimepicker/Datetimepicker.vue";

var Plugin$10 = {
  install: function install(Vue) {
    registerComponent(Vue, script$H);
  }
};
use(Plugin$10);
var Plugin$11 = Plugin$10;

var script$G = {
    name: 'BModal',
    directives: {
        trapFocus
    },
    props: {
        modelValue: Boolean,
        component: [Object, Function, String],
        content: [String, Array],
        programmatic: Boolean,
        props: Object,
        events: Object,
        width: {
            type: [String, Number],
            default: 960
        },
        hasModalCard: Boolean,
        animation: {
            type: String,
            default: 'zoom-out'
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return config.defaultModalCanCancel
            }
        },
        cancelCallback: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return config.defaultModalScroll
                    ? config.defaultModalScroll
                    : 'clip'
            },
            validator: (value) => {
                return [
                    'clip',
                    'keep'
                ].indexOf(value) >= 0
            }
        },
        fullScreen: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        autoFocus: {
            type: Boolean,
            default: () => {
                return config.defaultAutoFocus
            }
        },
        customClass: String,
        ariaRole: {
            type: String,
            validator: (value) => {
                return [
                    'dialog',
                    'alertdialog'
                ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean,
        ariaLabel: {
            type: String,
            validator: (value) => {
                return Boolean(value)
            }
        },
        destroyOnHide: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        'after-enter',
        'after-leave',
        'cancel',
        'close',
        'update:modelValue'
    ],
    data() {
        return {
            isActive: this.modelValue || false,
            savedScrollTop: null,
            newWidth: typeof this.width === 'number'
                ? this.width + 'px'
                : this.width,
            animating: !this.modelValue,
            destroyed: !this.modelValue
        }
    },
    computed: {
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? config.defaultModalCanCancel
                    : []
                : this.canCancel
        },
        showX() {
            return this.cancelOptions.indexOf('x') >= 0
        },
        customStyle() {
            if (!this.fullScreen) {
                return { maxWidth: this.newWidth }
            }
            return null
        }
    },
    watch: {
        modelValue(value) {
            this.isActive = value;
        },
        isActive(value) {
            if (value) this.destroyed = false;
            this.handleScroll();
            this.$nextTick(() => {
                if (value && this.$el && this.$el.focus && this.autoFocus) {
                    this.$el.focus();
                }
            });
        }
    },
    methods: {
        handleScroll() {
            if (typeof window === 'undefined') return

            if (this.scroll === 'clip') {
                if (this.isActive) {
                    document.documentElement.classList.add('is-clipped');
                } else {
                    document.documentElement.classList.remove('is-clipped');
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop;

            if (this.isActive) {
                document.body.classList.add('is-noscroll');
            } else {
                document.body.classList.remove('is-noscroll');
            }

            if (this.isActive) {
                document.body.style.top = `-${this.savedScrollTop}px`;
                return
            }

            document.documentElement.scrollTop = this.savedScrollTop;
            document.body.style.top = null;
            this.savedScrollTop = null;
        },

        /**
        * Close the Modal if canCancel and call the cancelCallback prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            this.$emit('cancel', arguments);
            this.cancelCallback.apply(null, arguments);
            this.close();
        },

        /**
        * Call the cancelCallback prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.$emit('close');
            this.$emit('update:modelValue', false);

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false;
                setTimeout(() => {
                    removeElement(this.$el);
                }, 150);
            }
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
        },

        /**
        * Transition after-enter hook
        */
        afterEnter() {
            this.animating = false;
            this.$emit('after-enter');
        },

        /**
        * Transition before-leave hook
        */
        beforeLeave() {
            this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterLeave() {
            if (this.destroyOnHide) {
                this.destroyed = true;
            }
            this.$emit('after-leave');
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    mounted() {
        if (this.programmatic) {
            // Insert the Modal component in body tag
            // only if it's programmatic
            // the following line used be in `beforeMount`
            // but $el is null at `beforeMount`
            document.body.appendChild(this.$el);
            this.isActive = true;
        } else if (this.isActive) this.handleScroll();
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
            // reset scroll
            document.documentElement.classList.remove('is-clipped');
            const savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop;
            document.body.classList.remove('is-noscroll');
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = null;
        }
    }
};

function render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = resolveDirective("trap-focus");

  return (openBlock(), createBlock(Transition, {
    name: $props.animation,
    onAfterEnter: $options.afterEnter,
    onBeforeLeave: $options.beforeLeave,
    onAfterLeave: $options.afterLeave
  }, {
    default: withCtx(() => [
      (!$data.destroyed)
        ? withDirectives((openBlock(), createBlock("div", {
            key: 0,
            class: ["modal is-active", [{'is-full-screen': $props.fullScreen}, $props.customClass]],
            tabindex: "-1",
            role: $props.ariaRole,
            "aria-label": $props.ariaLabel,
            "aria-modal": $props.ariaModal
          }, [
            createVNode("div", {
              class: "modal-background",
              onClick: _cache[1] || (_cache[1] = $event => ($options.cancel('outside')))
            }),
            createVNode("div", {
              class: ["animation-content", { 'modal-content': !$props.hasModalCard }],
              style: $options.customStyle
            }, [
              ($props.component)
                ? (openBlock(), createBlock(resolveDynamicComponent($props.component), mergeProps({ key: 0 }, $props.props, toHandlers($props.events), {
                    "can-cancel": $props.canCancel,
                    onClose: $options.close
                  }), null, 16 /* FULL_PROPS */, ["can-cancel", "onClose"]))
                : ($props.content)
                  ? (openBlock(), createBlock("div", {
                      key: 1,
                      innerHTML: $props.content
                    }, null, 8 /* PROPS */, ["innerHTML"]))
                  : renderSlot(_ctx.$slots, "default", {
                      key: 2,
                      canCancel: $props.canCancel,
                      close: $options.close
                    }),
              ($options.showX)
                ? withDirectives((openBlock(), createBlock("button", {
                    key: 3,
                    type: "button",
                    class: "modal-close is-large",
                    onClick: _cache[2] || (_cache[2] = $event => ($options.cancel('x')))
                  }, null, 512 /* NEED_PATCH */)), [
                    [vShow, !$data.animating]
                  ])
                : createCommentVNode("v-if", true)
            ], 6 /* CLASS, STYLE */)
          ], 10 /* CLASS, PROPS */, ["role", "aria-label", "aria-modal"])), [
            [vShow, $data.isActive],
            [_directive_trap_focus, $props.trapFocus]
          ])
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
}

script$G.render = render$A;
script$G.__file = "src/components/modal/Modal.vue";

var script$F = {
    name: 'BDialog',
    components: {
        [script$11.name]: script$11
    },
    directives: {
        trapFocus
    },
    extends: script$G,
    props: {
        title: String,
        message: [String, Array],
        icon: String,
        iconPack: String,
        hasIcon: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        size: String,
        confirmText: {
            type: String,
            default: () => {
                return config.defaultDialogConfirmText
                    ? config.defaultDialogConfirmText
                    : 'OK'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return config.defaultDialogCancelText
                    ? config.defaultDialogCancelText
                    : 'Cancel'
            }
        },
        hasInput: Boolean, // Used internally to know if it's prompt
        inputAttrs: {
            type: Object,
            default: () => ({})
        },
        confirmCallback: {
            type: Function,
            default: () => {}
        },
        closeOnConfirm: {
            type: Boolean,
            default: true
        },
        container: {
            type: String,
            default: () => {
                return config.defaultContainerElement
            }
        },
        focusOn: {
            type: String,
            default: 'confirm'
        },
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        ariaRole: {
            type: String,
            validator: (value) => {
                return [
                    'dialog',
                    'alertdialog'
                ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean
    },
    emits: ['confirm'],
    data() {
        const prompt = this.hasInput
            ? this.inputAttrs.value || ''
            : '';

        return {
            prompt,
            isActive: false,
            validationMessage: ''
        }
    },
    computed: {
        // `safeInputAttrs` is a shallow copy of `inputAttrs` except for `value`
        // `value` should not be specified to `v-bind` of the input element
        // because it inhibits `v-model` of the input on Vue 3
        safeInputAttrs() {
            const attrs = { ...this.inputAttrs };
            delete attrs.value;
            if (typeof attrs.required === 'undefined') {
                attrs.required = true;
            }
            return attrs
        },
        dialogClass() {
            return [this.size, {
                'has-custom-container': this.container !== null
            }]
        },
        /**
        * Icon name (MDI) based on the type.
        */
        iconByType() {
            switch (this.type) {
                case 'is-info':
                    return 'information'
                case 'is-success':
                    return 'check-circle'
                case 'is-warning':
                    return 'alert'
                case 'is-danger':
                    return 'alert-circle'
                default:
                    return null
            }
        },
        showCancel() {
            return this.cancelOptions.indexOf('button') >= 0
        }
    },
    methods: {
        /**
        * If it's a prompt Dialog, validate the input.
        * Call the confirmCallback prop (function) and close the Dialog.
        */
        confirm() {
            if (this.$refs.input !== undefined) {
                if (!this.$refs.input.checkValidity()) {
                    this.validationMessage = this.$refs.input.validationMessage;
                    this.$nextTick(() => this.$refs.input.select());
                    return
                }
            }
            this.$emit('confirm', this.prompt);
            this.confirmCallback(this.prompt, this);
            if (this.closeOnConfirm) this.close();
        },

        /**
        * Close the Dialog.
        */
        close() {
            this.isActive = false;
            // Timeout for the animation complete before destroying
            setTimeout(() => {
                removeElement(this.$el);
            }, 150);
        }
    },
    beforeMount() {
        // Insert the Dialog component in the element container
        if (typeof window !== 'undefined') {
            this.$nextTick(() => {
                const container = document.querySelector(this.container) || document.body;
                container.appendChild(this.$el);
            });
        }
    },
    mounted() {
        this.isActive = true;

        this.$nextTick(() => {
            // Handle which element receives focus
            if (this.hasInput) {
                this.$refs.input.focus();
            } else if (this.focusOn === 'cancel' && this.showCancel) {
                this.$refs.cancelButton.focus();
            } else {
                this.$refs.confirmButton.focus();
            }
        });
    }
};

const _hoisted_1$o = { class: "modal-card animation-content" };
const _hoisted_2$b = {
  key: 0,
  class: "modal-card-head"
};
const _hoisted_3$8 = { class: "modal-card-title" };
const _hoisted_4$6 = { class: "media" };
const _hoisted_5$5 = {
  key: 0,
  class: "media-left"
};
const _hoisted_6$4 = { class: "media-content" };
const _hoisted_7$3 = {
  key: 0,
  class: "field"
};
const _hoisted_8$2 = { class: "control" };
const _hoisted_9$1 = { class: "help is-danger" };
const _hoisted_10$1 = { class: "modal-card-foot" };

function render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _directive_trap_focus = resolveDirective("trap-focus");

  return (openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      ($data.isActive)
        ? withDirectives((openBlock(), createBlock("div", {
            key: 0,
            class: ["dialog modal is-active", $options.dialogClass],
            role: $props.ariaRole,
            "aria-modal": $props.ariaModal
          }, [
            createVNode("div", {
              class: "modal-background",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.cancel('outside')))
            }),
            createVNode("div", _hoisted_1$o, [
              ($props.title)
                ? (openBlock(), createBlock("header", _hoisted_2$b, [
                    createVNode("p", _hoisted_3$8, toDisplayString($props.title), 1 /* TEXT */)
                  ]))
                : createCommentVNode("v-if", true),
              createVNode("section", {
                class: ["modal-card-body", { 'is-titleless': !$props.title, 'is-flex': $props.hasIcon }]
              }, [
                createVNode("div", _hoisted_4$6, [
                  ($props.hasIcon && ($props.icon || $options.iconByType))
                    ? (openBlock(), createBlock("div", _hoisted_5$5, [
                        createVNode(_component_b_icon, {
                          icon: $props.icon ? $props.icon : $options.iconByType,
                          pack: $props.iconPack,
                          type: $props.type,
                          both: !$props.icon,
                          size: "is-large"
                        }, null, 8 /* PROPS */, ["icon", "pack", "type", "both"])
                      ]))
                    : createCommentVNode("v-if", true),
                  createVNode("div", _hoisted_6$4, [
                    createVNode("p", null, [
                      (_ctx.$slots.default)
                        ? renderSlot(_ctx.$slots, "default", { key: 0 })
                        : (openBlock(), createBlock("div", {
                            key: 1,
                            innerHTML: $props.message
                          }, null, 8 /* PROPS */, ["innerHTML"]))
                    ]),
                    ($props.hasInput)
                      ? (openBlock(), createBlock("div", _hoisted_7$3, [
                          createVNode("div", _hoisted_8$2, [
                            withDirectives(createVNode("input", mergeProps({
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.prompt = $event)),
                              class: ["input", { 'is-danger': $data.validationMessage }],
                              ref: "input"
                            }, $options.safeInputAttrs, {
                              onKeyup: _cache[3] || (_cache[3] = withKeys((...args) => ($options.confirm && $options.confirm(...args)), ["enter"]))
                            }), null, 16 /* FULL_PROPS */), [
                              [vModelDynamic, $data.prompt]
                            ])
                          ]),
                          createVNode("p", _hoisted_9$1, toDisplayString($data.validationMessage), 1 /* TEXT */)
                        ]))
                      : createCommentVNode("v-if", true)
                  ])
                ])
              ], 2 /* CLASS */),
              createVNode("footer", _hoisted_10$1, [
                ($options.showCancel)
                  ? (openBlock(), createBlock("button", {
                      key: 0,
                      class: "button",
                      ref: "cancelButton",
                      onClick: _cache[4] || (_cache[4] = $event => (_ctx.cancel('button')))
                    }, toDisplayString($props.cancelText), 513 /* TEXT, NEED_PATCH */))
                  : createCommentVNode("v-if", true),
                createVNode("button", {
                  class: ["button", $props.type],
                  ref: "confirmButton",
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.confirm && $options.confirm(...args)))
                }, toDisplayString($props.confirmText), 3 /* TEXT, CLASS */)
              ])
            ])
          ], 10 /* CLASS, PROPS */, ["role", "aria-modal"])), [
            [_directive_trap_focus, $props.trapFocus]
          ])
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$F.render = render$z;
script$F.__file = "src/components/dialog/Dialog.vue";

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function open(propsData) {
  var slot;

  if (Array.isArray(propsData.message)) {
    slot = propsData.message;
    delete propsData.message;
  }

  function createDialog(_onConfirm, _onCancel) {
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          dialogVNode: null
        };
      },
      methods: {
        close: function close() {
          var dialog = getComponentFromVNode(this.dialogVNode);

          if (dialog) {
            dialog.close();
          }
        }
      },
      render: function render() {
        this.dialogVNode = h(script$F, _objectSpread$7(_objectSpread$7({}, propsData), {}, {
          onConfirm: function onConfirm() {
            if (_onConfirm != null) {
              _onConfirm.apply(void 0, arguments);
            }
          },
          onCancel: function onCancel() {
            if (_onCancel != null) {
              _onCancel.apply(void 0, arguments);
            }

            vueInstance.unmount();
          }
        }), slot ? {
          default: function _default() {
            return slot;
          }
        } : undefined);
        return this.dialogVNode;
      }
    });
    return vueInstance.mount(container);
  }

  if (!config.defaultProgrammaticPromise) {
    return createDialog();
  } else {
    return new Promise(function (resolve) {
      var dialog = createDialog(function (event) {
        return resolve({
          result: event || true,
          dialog: dialog
        });
      }, function () {
        return resolve({
          result: false,
          dialog: dialog
        });
      });
    });
  }
}

var DialogProgrammatic = {
  alert: function alert(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      canCancel: false
    };
    var propsData = merge(defaultParam, params);
    return open(propsData);
  },
  confirm: function confirm(params) {
    var defaultParam = {};
    var propsData = merge(defaultParam, params);
    return open(propsData);
  },
  prompt: function prompt(params) {
    var defaultParam = {
      hasInput: true
    };
    var propsData = merge(defaultParam, params);
    return open(propsData);
  }
};
var Plugin$_ = {
  install: function install(Vue) {
    registerComponent(Vue, script$F);
    registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic);
  }
};
use(Plugin$_);
var Plugin$$ = Plugin$_;

var Plugin$Y = {
  install: function install(Vue) {
    registerComponent(Vue, script$T);
    registerComponent(Vue, script$S);
  }
};
use(Plugin$Y);
var Plugin$Z = Plugin$Y;

var Plugin$W = {
  install: function install(Vue) {
    registerComponent(Vue, script$Q);
  }
};
use(Plugin$W);
var Plugin$X = Plugin$W;

var Plugin$U = {
  install: function install(Vue) {
    registerComponent(Vue, script$11);
  }
};
use(Plugin$U);
var Plugin$V = Plugin$U;

var script$E = {
    name: 'BImage',
    props: {
        src: String,
        alt: String,
        srcFallback: String,
        webpFallback: {
            type: String,
            default: () => {
                return config.defaultImageWebpFallback
            }
        },
        lazy: {
            type: Boolean,
            default: () => {
                return config.defaultImageLazy
            }
        },
        responsive: {
            type: Boolean,
            default: () => {
                return config.defaultImageResponsive
            }
        },
        ratio: {
            type: String,
            default: () => {
                return config.defaultImageRatio
            }
        },
        placeholder: String,
        srcset: String,
        srcsetSizes: Array,
        srcsetFormatter: {
            type: Function,
            default: (src, size, vm) => {
                if (typeof config.defaultImageSrcsetFormatter === 'function') {
                    return config.defaultImageSrcsetFormatter(src, size)
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
            isWebpSupported().then((supported) => {
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

const _hoisted_1$n = { key: 0 };
const _hoisted_2$a = { key: 1 };

function render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("figure", {
    class: ["b-image-wrapper", $options.figureClasses],
    style: $options.figureStyles
  }, [
    ($options.isCaptionFirst)
      ? (openBlock(), createBlock("figcaption", _hoisted_1$n, [
          renderSlot(_ctx.$slots, "caption")
        ]))
      : createCommentVNode("v-if", true),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        ($options.isDisplayed)
          ? (openBlock(), createBlock("img", {
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
          : createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        ($options.isPlaceholderDisplayed)
          ? renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
              createVNode("img", {
                src: $options.computedPlaceholder,
                alt: $props.alt,
                class: [$options.imgClasses, "placeholder"]
              }, null, 10 /* CLASS, PROPS */, ["src", "alt"])
            ])
          : createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }),
    ($options.isCaptionLast)
      ? (openBlock(), createBlock("figcaption", _hoisted_2$a, [
          renderSlot(_ctx.$slots, "caption")
        ]))
      : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

script$E.render = render$y;
script$E.__file = "src/components/image/Image.vue";

var Plugin$S = {
  install: function install(Vue) {
    registerComponent(Vue, script$E);
  }
};
use(Plugin$S);
var Plugin$T = Plugin$S;

var Plugin$Q = {
  install: function install(Vue) {
    registerComponent(Vue, script$10);
  }
};
use(Plugin$Q);
var Plugin$R = Plugin$Q;

// Polyfills for SSR
var isSSR = typeof window === 'undefined';
var HTMLElement = isSSR ? Object : window.HTMLElement;
var File = isSSR ? Object : window.File;

var script$D = {
    name: 'BLoading',
    props: {
        modelValue: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        isFullPage: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        canCancel: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    emits: ['close', 'update:is-full-page', 'update:modelValue'],
    data() {
        return {
            isActive: this.modelValue || false,
            displayInFullPage: this.isFullPage
        }
    },
    watch: {
        modelValue(value) {
            this.isActive = value;
        },
        isFullPage(value) {
            this.displayInFullPage = value;
        }
    },
    methods: {
        /**
        * Close the Modal if canCancel.
        */
        cancel() {
            if (!this.canCancel || !this.isActive) return

            this.close();
        },
        /**
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.onCancel.apply(null, arguments);
            this.$emit('close');
            this.$emit('update:modelValue', false);

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false;
                // TODO: should the following happen outside this component;
                // i.e., in index.js?
                setTimeout(() => {
                    removeElement(this.$el);
                }, 150);
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') this.cancel();
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    mounted() {
        // Insert the Loading component in body tag
        // only if it's programmatic
        // (moved from beforeMount because $el is not bound during beforeMount)
        // TODO: should this happen outside this component; i.e., in index.js?
        if (this.programmatic) {
            if (!this.container) {
                document.body.appendChild(this.$el);
            } else {
                this.displayInFullPage = false;
                this.$emit('update:is-full-page', false);
                this.container.appendChild(this.$el);
            }
            this.isActive = true;
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
};

const _hoisted_1$m = /*#__PURE__*/createVNode("div", { class: "loading-icon" }, null, -1 /* HOISTED */);

function render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, { name: $props.animation }, {
    default: withCtx(() => [
      ($data.isActive)
        ? (openBlock(), createBlock("div", {
            key: 0,
            class: ["loading-overlay is-active", { 'is-full-page': $data.displayInFullPage }]
          }, [
            createVNode("div", {
              class: "loading-background",
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.cancel && $options.cancel(...args)))
            }),
            renderSlot(_ctx.$slots, "default", {}, () => [
              _hoisted_1$m
            ])
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$D.render = render$x;
script$D.__file = "src/components/loading/Loading.vue";

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          loadingVNode: null
        };
      },
      methods: {
        close: function close() {
          // TODO: too much dependence on Vue's internal structure?
          var loading = getComponentFromVNode(this.loadingVNode);

          if (loading) {
            loading.close();
          }
        }
      },
      render: function render() {
        this.loadingVNode = h(script$D, _objectSpread$6(_objectSpread$6({}, propsData), {}, {
          onClose: function onClose() {
            if (propsData.onClose) {
              propsData.onClose.apply(propsData, arguments);
            } // timeout for the animation complete before destroying


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }));
        return this.loadingVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin$O = {
  install: function install(Vue) {
    registerComponent(Vue, script$D);
    registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
use(Plugin$O);
var Plugin$P = Plugin$O;

var MenuItemContainerMixin = {
  provide: function provide() {
    return {
      BMenuItemContainer: this
    };
  },
  data: function data() {
    return {
      menuItems: []
    };
  },
  methods: {
    appendMenuItem: function appendMenuItem(item) {
      this.menuItems.push(item);
    },
    removeMenuItem: function removeMenuItem(item) {
      var index = this.menuItems.indexOf(item);

      if (index !== -1) {
        this.menuItems.splice(index, 1);
      }
    }
  }
};

var script$C = {
    name: 'BMenu',
    mixins: [MenuItemContainerMixin],
    props: {
        accordion: {
            type: Boolean,
            default: true
        },
        activable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            _isMenu: true // Used by MenuItem
        }
    }
};

const _hoisted_1$l = { class: "menu" };

function render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$l, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

script$C.render = render$w;
script$C.__file = "src/components/menu/Menu.vue";

const BMenuList = (props, context) => {
    let vlabel = null;
    const slots = context.slots;
    if (props.label || slots.label) {
        vlabel = h(
            'p',
            { class: 'menu-label' },
            props.label
                ? props.icon
                    ? [
                        h('b-icon', {
                            icon: props.icon,
                            pack: props.iconPack,
                            size: props.size
                        }),
                        h('span', {}, props.label)
                    ]
                    : props.label
                : slots.label()
        );
    }
    const vnode = h(
        'ul',
        {
            class: 'menu-list',
            role: props.ariaRole === 'menu' ? props.ariaRole : null
        },
        slots.default()
    );
    return vlabel ? [vlabel, vnode] : vnode
};

BMenuList.props = {
    label: String,
    icon: String,
    iconPack: String,
    ariaRole: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'is-small'
    }
};

var script$B = BMenuList;

script$B.__file = "src/components/menu/MenuList.vue";

var script$A = {
    name: 'BMenuItem',
    components: {
        [script$11.name]: script$11
    },
    mixins: [MenuItemContainerMixin],
    inject: {
        parent: {
            from: 'BMenuItemContainer',
            default: null
        }
    },
    inheritAttrs: false,
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        label: String,
        active: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
            type: String,
            default: 'slide'
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        },
        ariaRole: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'is-small'
        }
    },
    emits: ['update:active', 'update:expanded'],
    data() {
        return {
            newActive: this.active,
            newExpanded: this.expanded
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : null
        }
    },
    watch: {
        active(value) {
            this.newActive = value;
        },
        expanded(value) {
            this.newExpanded = value;
        }
    },
    methods: {
        onClick(event) {
            if (this.disabled) return
            const menu = this.getMenu();
            this.reset(this.parent, menu);
            this.newExpanded = !this.newExpanded;
            this.$emit('update:expanded', this.newExpanded);
            if (menu && menu.activable) {
                this.newActive = true;
                this.$emit('update:active', this.newActive);
            }
        },
        reset(parent, menu) {
            if (parent == null) {
                return
            }
            parent.menuItems.forEach((item) => {
                if (item !== this) {
                    this.reset(item, menu);
                    if (!parent.$data._isMenu || (parent.$data._isMenu && parent.accordion)) {
                        item.newExpanded = false;
                        item.$emit('update:expanded', item.newActive);
                    }
                    if (menu && menu.activable) {
                        item.newActive = false;
                        item.$emit('update:active', item.newActive);
                    }
                }
            });
        },
        getMenu() {
            let parent = this.$parent;
            while (parent && !parent.$data._isMenu) {
                parent = parent.$parent;
            }
            return parent
        }
    },
    mounted() {
        if (this.parent) {
            this.parent.appendMenuItem(this);
        }
    },
    beforeUnmount() {
        if (this.parent) {
            this.parent.removeMenuItem(this);
        }
    }
};

const _hoisted_1$k = { key: 1 };

function render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("li", { role: $options.ariaRoleMenu }, [
    (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps(_ctx.$attrs, {
      class: {
                'is-active': $data.newActive,
                'is-expanded': $data.newExpanded,
                'is-disabled': $props.disabled,
                'icon-text': $props.icon,
            },
      onClick: _cache[1] || (_cache[1] = $event => ($options.onClick($event)))
    }), {
      default: withCtx(() => [
        ($props.icon)
          ? (openBlock(), createBlock(_component_b_icon, {
              key: 0,
              icon: $props.icon,
              pack: $props.iconPack,
              size: $props.size
            }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
          : createCommentVNode("v-if", true),
        ($props.label)
          ? (openBlock(), createBlock("span", _hoisted_1$k, toDisplayString($props.label), 1 /* TEXT */))
          : renderSlot(_ctx.$slots, "label", {
              key: 2,
              expanded: $data.newExpanded,
              active: $data.newActive
            })
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class"])),
    createCommentVNode(" sub menu items "),
    (_ctx.$slots.default)
      ? (openBlock(), createBlock(Transition, {
          key: 0,
          name: $props.animation
        }, {
          default: withCtx(() => [
            withDirectives(createVNode("ul", null, [
              renderSlot(_ctx.$slots, "default")
            ], 512 /* NEED_PATCH */), [
              [vShow, $data.newExpanded]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"]))
      : createCommentVNode("v-if", true)
  ], 8 /* PROPS */, ["role"]))
}

script$A.render = render$v;
script$A.__file = "src/components/menu/MenuItem.vue";

var Plugin$M = {
  install: function install(Vue) {
    registerComponent(Vue, script$C);
    registerComponent(Vue, script$B);
    registerComponent(Vue, script$A);
  }
};
use(Plugin$M);
var Plugin$N = Plugin$M;

var MessageMixin = {
  components: _defineProperty({}, script$11.name, script$11),
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    message: String,
    type: String,
    hasIcon: Boolean,
    size: String,
    icon: String,
    iconPack: String,
    iconSize: String,
    autoClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  emits: ['close', 'update:modelValue'],
  data: function data() {
    return {
      isActive: this.modelValue
    };
  },
  watch: {
    modelValue: function modelValue(value) {
      this.isActive = value;
    },
    isActive: function isActive(value) {
      if (value) {
        this.setAutoClose();
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }
  },
  computed: {
    /**
     * Icon name (MDI) based on type.
     */
    computedIcon: function computedIcon() {
      if (this.icon) {
        return this.icon;
      }

      switch (this.type) {
        case 'is-info':
          return 'information';

        case 'is-success':
          return 'check-circle';

        case 'is-warning':
          return 'alert';

        case 'is-danger':
          return 'alert-circle';

        default:
          return null;
      }
    }
  },
  methods: {
    /**
     * Close the Message and emit events.
     */
    close: function close() {
      this.isActive = false;
      this.$emit('close');
      this.$emit('update:modelValue', false);
    },

    /**
     * Set timer to auto close message
     */
    setAutoClose: function setAutoClose() {
      var _this = this;

      if (this.autoClose) {
        this.timer = setTimeout(function () {
          if (_this.isActive) {
            _this.close();
          }
        }, this.duration);
      }
    }
  },
  mounted: function mounted() {
    this.setAutoClose();
  }
};

var script$z = {
    name: 'BMessage',
    mixins: [MessageMixin],
    props: {
        ariaCloseLabel: String
    },
    data() {
        return {
            newIconSize: this.iconSize || this.size || 'is-large'
        }
    }
};

const _hoisted_1$j = {
  key: 0,
  class: "message-header"
};
const _hoisted_2$9 = { key: 0 };
const _hoisted_3$7 = { key: 1 };
const _hoisted_4$5 = {
  key: 1,
  class: "message-body"
};
const _hoisted_5$4 = { class: "media" };
const _hoisted_6$3 = {
  key: 0,
  class: "media-left"
};
const _hoisted_7$2 = { class: "media-content" };

function render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      (_ctx.isActive)
        ? (openBlock(), createBlock("article", {
            key: 0,
            class: ["message", [_ctx.type, _ctx.size]]
          }, [
            (_ctx.$slots.header || _ctx.title)
              ? (openBlock(), createBlock("header", _hoisted_1$j, [
                  (_ctx.$slots.header)
                    ? (openBlock(), createBlock("div", _hoisted_2$9, [
                        renderSlot(_ctx.$slots, "header")
                      ]))
                    : (_ctx.title)
                      ? (openBlock(), createBlock("p", _hoisted_3$7, toDisplayString(_ctx.title), 1 /* TEXT */))
                      : createCommentVNode("v-if", true),
                  (_ctx.closable)
                    ? (openBlock(), createBlock("button", {
                        key: 2,
                        type: "button",
                        class: "delete",
                        onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args))),
                        "aria-label": $props.ariaCloseLabel
                      }, null, 8 /* PROPS */, ["aria-label"]))
                    : createCommentVNode("v-if", true)
                ]))
              : createCommentVNode("v-if", true),
            (_ctx.$slots.default)
              ? (openBlock(), createBlock("section", _hoisted_4$5, [
                  createVNode("div", _hoisted_5$4, [
                    (_ctx.computedIcon && _ctx.hasIcon)
                      ? (openBlock(), createBlock("div", _hoisted_6$3, [
                          createVNode(_component_b_icon, {
                            icon: _ctx.computedIcon,
                            pack: _ctx.iconPack,
                            class: _ctx.type,
                            both: "",
                            size: $data.newIconSize
                          }, null, 8 /* PROPS */, ["icon", "pack", "class", "size"])
                        ]))
                      : createCommentVNode("v-if", true),
                    createVNode("div", _hoisted_7$2, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ])
                ]))
              : createCommentVNode("v-if", true)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }))
}

script$z.render = render$u;
script$z.__file = "src/components/message/Message.vue";

var Plugin$K = {
  install: function install(Vue) {
    registerComponent(Vue, script$z);
  }
};
use(Plugin$K);
var Plugin$L = Plugin$K;

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ModalProgrammatic = {
  // component specified to the `component` option cannot resolve components
  // registered to the caller app, because `open` creates a brand-new app
  // by the `createApp` API.
  // so the component specified to the `component` option has to explicitly
  // reference components that it depends on.
  // see /docs/pages/components/modal/examples/ExProgrammatic for an example.
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        content: params
      };
    }

    var defaultParam = {
      programmatic: true
    };

    if (params.parent) {
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.content)) {
      slot = params.content;
      delete params.content;
    }

    var propsData = merge(defaultParam, params);
    var container = document.createElement('div'); // I could not figure out how to extend an existing app to create a new
    // Vue instance on Vue 3.

    var vueInstance = createApp({
      data: function data() {
        return {
          modalVNode: null
        };
      },
      methods: {
        close: function close() {
          var modal = getComponentFromVNode(this.modalVNode);

          if (modal) {
            modal.close();
          }
        }
      },
      render: function render() {
        this.modalVNode = h(script$G, _objectSpread$5(_objectSpread$5({}, propsData), {}, {
          onClose: function onClose() {
            vueInstance.unmount();
          }
        }), slot ? {
          default: function _default() {
            return slot;
          }
        } : undefined);
        return this.modalVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin$I = {
  install: function install(Vue) {
    registerComponent(Vue, script$G);
    registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
  }
};
use(Plugin$I);
var Plugin$J = Plugin$I;

var script$y = {
    name: 'BNotification',
    mixins: [MessageMixin],
    props: {
        position: String,
        ariaCloseLabel: String,
        animation: {
            type: String,
            default: 'fade'
        }
    }
};

const _hoisted_1$i = {
  key: 1,
  class: "media"
};
const _hoisted_2$8 = {
  key: 0,
  class: "media-left"
};
const _hoisted_3$6 = { class: "media-content" };

function render$t(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock(Transition, { name: $props.animation }, {
    default: withCtx(() => [
      withDirectives(createVNode("article", {
        class: ["notification", [_ctx.type, $props.position]]
      }, [
        (_ctx.closable)
          ? (openBlock(), createBlock("button", {
              key: 0,
              class: "delete",
              type: "button",
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args))),
              "aria-label": $props.ariaCloseLabel
            }, null, 8 /* PROPS */, ["aria-label"]))
          : createCommentVNode("v-if", true),
        (_ctx.$slots.default || _ctx.message)
          ? (openBlock(), createBlock("div", _hoisted_1$i, [
              (_ctx.computedIcon && _ctx.hasIcon)
                ? (openBlock(), createBlock("div", _hoisted_2$8, [
                    createVNode(_component_b_icon, {
                      icon: _ctx.computedIcon,
                      pack: _ctx.iconPack,
                      both: "",
                      size: "is-large",
                      "aria-hidden": ""
                    }, null, 8 /* PROPS */, ["icon", "pack"])
                  ]))
                : createCommentVNode("v-if", true),
              createVNode("div", _hoisted_3$6, [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", { key: 0 })
                  : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text",
                      innerHTML: _ctx.message
                    }, null, 8 /* PROPS */, ["innerHTML"]))
              ])
            ]))
          : createCommentVNode("v-if", true)
      ], 2 /* CLASS */), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$y.render = render$t;
script$y.__file = "src/components/notification/Notification.vue";

var NoticeMixin = {
  props: {
    type: {
      type: String,
      default: 'is-dark'
    },
    message: [String, Array],
    duration: Number,
    queue: {
      type: Boolean,
      default: undefined
    },
    indefinite: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'is-top',
      validator: function validator(value) {
        return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
      }
    },
    container: String
  },
  emits: ['close'],
  data: function data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      newContainer: this.container || config.defaultContainerElement
    };
  },
  computed: {
    correctParent: function correctParent() {
      switch (this.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return this.parentTop;

        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return this.parentBottom;
      }
    },
    transition: function transition() {
      switch (this.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return {
            enter: 'fadeInDown',
            leave: 'fadeOut'
          };

        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return {
            enter: 'fadeInUp',
            leave: 'fadeOut'
          };
      }
    }
  },
  methods: {
    shouldQueue: function shouldQueue() {
      var queue = this.queue !== undefined ? this.queue : config.defaultNoticeQueue;
      if (!queue) return false;
      return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
    },
    close: function close() {
      var _this = this;

      clearTimeout(this.timer);
      this.isActive = false;
      this.$emit('close'); // Timeout for the animation complete before destroying

      setTimeout(function () {
        removeElement(_this.$el);
      }, 150);
    },
    showNotice: function showNotice() {
      var _this2 = this;

      if (this.shouldQueue()) {
        // Call recursively if should queue
        setTimeout(function () {
          return _this2.showNotice();
        }, 250);
        return;
      }

      this.correctParent.insertAdjacentElement('afterbegin', this.$el);
      this.isActive = true;

      if (!this.indefinite) {
        this.timer = setTimeout(function () {
          return _this2.close();
        }, this.newDuration);
      }
    },
    setupContainer: function setupContainer() {
      this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-top');
      this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-bottom');
      if (this.parentTop && this.parentBottom) return;

      if (!this.parentTop) {
        this.parentTop = document.createElement('div');
        this.parentTop.className = 'notices is-top';
      }

      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div');
        this.parentBottom.className = 'notices is-bottom';
      }

      var container = document.querySelector(this.newContainer) || document.body;
      container.appendChild(this.parentTop);
      container.appendChild(this.parentBottom);

      if (this.newContainer) {
        this.parentTop.classList.add('has-custom-container');
        this.parentBottom.classList.add('has-custom-container');
      }
    }
  },
  beforeMount: function beforeMount() {
    this.setupContainer();
  },
  mounted: function mounted() {
    this.showNotice();
  }
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// - type
// - message
// - duration

var _NoticeMixin$props = NoticeMixin.props,
    queue = _NoticeMixin$props.queue,
    indefinite = _NoticeMixin$props.indefinite,
    position = _NoticeMixin$props.position,
    container = _NoticeMixin$props.container;
var NoticeMixinSubset = _objectSpread$4(_objectSpread$4({}, NoticeMixin), {}, {
  props: {
    queue: queue,
    indefinite: indefinite,
    position: position,
    container: container
  }
});

var script$x = {
    name: 'BNotificationNotice',
    components: {
        [script$y.name]: script$y
    },
    mixins: [NoticeMixinSubset],
    data() {
        return {
            newDuration: this.duration || config.defaultNotificationDuration
        }
    }
};

function render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_notification = resolveComponent("b-notification");

  return (_ctx.$slots.default != null)
    ? (openBlock(), createBlock(_component_b_notification, mergeProps({
        key: 0,
        ref: "notification",
        position: _ctx.position,
        "model-value": _ctx.isActive
      }, _ctx.$attrs, { onClose: _ctx.close }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["position", "model-value", "onClose"]))
    : (openBlock(), createBlock(_component_b_notification, mergeProps({
        key: 1,
        ref: "notification",
        position: _ctx.position,
        "model-value": _ctx.isActive
      }, _ctx.$attrs, { onClose: _ctx.close }), null, 16 /* FULL_PROPS */, ["position", "model-value", "onClose"]))
}

script$x.render = render$s;
script$x.__file = "src/components/notification/NotificationNotice.vue";

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var NotificationProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      position: config.defaultNotificationPosition || 'is-top-right'
    };

    if (params.parent) {
      delete params.parent;
    }

    var _onClose;

    if (typeof params.onClose === 'function') {
      _onClose = params.onClose;
      delete params.onClose;
    }

    var slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    }

    var propsData = merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          noticeVNode: null
        };
      },
      methods: {
        close: function close() {
          var notice = getComponentFromVNode(this.noticeVNode);

          if (notice) {
            notice.close();
          }
        }
      },
      render: function render() {
        this.noticeVNode = h(script$x, _objectSpread$3(_objectSpread$3({}, propsData), {}, {
          onClose: function onClose() {
            if (_onClose != null) {
              _onClose();
            } // waits for a while in favor of animation


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }), slot != null ? {
          default: function _default() {
            return slot;
          }
        } : undefined);
        return this.noticeVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin$G = {
  install: function install(Vue) {
    registerComponent(Vue, script$y);
    registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic);
  }
};
use(Plugin$G);
var Plugin$H = Plugin$G;

var script$w = {
    name: 'NavbarBurger',
    props: {
        isOpened: {
            type: Boolean,
            default: false
        }
    }
};

const _hoisted_1$h = /*#__PURE__*/createVNode("span", { "aria-hidden": "true" }, null, -1 /* HOISTED */);
const _hoisted_2$7 = /*#__PURE__*/createVNode("span", { "aria-hidden": "true" }, null, -1 /* HOISTED */);
const _hoisted_3$5 = /*#__PURE__*/createVNode("span", { "aria-hidden": "true" }, null, -1 /* HOISTED */);

function render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("a", mergeProps({
    role: "button",
    class: ["navbar-burger burger", { 'is-active': $props.isOpened }],
    "aria-label": "menu",
    "aria-expanded": $props.isOpened
  }, _ctx.$attrs), [
    _hoisted_1$h,
    _hoisted_2$7,
    _hoisted_3$5
  ], 16 /* FULL_PROPS */, ["aria-expanded"]))
}

script$w.render = render$r;
script$w.__file = "src/components/navbar/NavbarBurger.vue";

var isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
var events = isTouch ? ['touchstart', 'click'] : ['click'];
var instances = [];

function processArgs(bindingValue) {
  var isFunction = typeof bindingValue === 'function';

  if (!isFunction && _typeof(bindingValue) !== 'object') {
    throw new Error("v-click-outside: Binding value should be a function or an object, ".concat(_typeof(bindingValue), " given"));
  }

  return {
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: bindingValue.middleware || function (isClickOutside) {
      return isClickOutside;
    },
    events: bindingValue.events || events
  };
}

function onEvent(_ref) {
  var el = _ref.el,
      event = _ref.event,
      handler = _ref.handler,
      middleware = _ref.middleware;
  var isClickOutside = event.target !== el && !el.contains(event.target);

  if (!isClickOutside || !middleware(event, el)) {
    return;
  }

  handler(event, el);
}

function toggleEventListeners() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      eventHandlers = _ref2.eventHandlers;

  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'add';
  eventHandlers.forEach(function (_ref3) {
    var event = _ref3.event,
        handler = _ref3.handler;
    document["".concat(action, "EventListener")](event, handler);
  });
}

function beforeMount(el, _ref4) {
  var value = _ref4.value;

  var _processArgs = processArgs(value),
      _handler = _processArgs.handler,
      middleware = _processArgs.middleware,
      events = _processArgs.events;

  var instance = {
    el: el,
    eventHandlers: events.map(function (eventName) {
      return {
        event: eventName,
        handler: function handler(event) {
          return onEvent({
            event: event,
            el: el,
            handler: _handler,
            middleware: middleware
          });
        }
      };
    })
  };
  toggleEventListeners(instance, 'add');
  instances.push(instance);
}

function updated(el, _ref5) {
  var value = _ref5.value;

  var _processArgs2 = processArgs(value),
      _handler2 = _processArgs2.handler,
      middleware = _processArgs2.middleware,
      events = _processArgs2.events; // `filter` instead of `find` for compat with IE


  var instance = instances.filter(function (instance) {
    return instance.el === el;
  })[0];
  toggleEventListeners(instance, 'remove');
  instance.eventHandlers = events.map(function (eventName) {
    return {
      event: eventName,
      handler: function handler(event) {
        return onEvent({
          event: event,
          el: el,
          handler: _handler2,
          middleware: middleware
        });
      }
    };
  });
  toggleEventListeners(instance, 'add');
}

function unmounted(el) {
  // `filter` instead of `find` for compat with IE
  var instance = instances.filter(function (instance) {
    return instance.el === el;
  })[0];
  toggleEventListeners(instance, 'remove');
}

var directive = {
  beforeMount: beforeMount,
  updated: updated,
  unmounted: unmounted,
  instances: instances
};
var clickOutside = directive;

const FIXED_TOP_CLASS = 'is-fixed-top';
const BODY_FIXED_TOP_CLASS = 'has-navbar-fixed-top';
const BODY_SPACED_FIXED_TOP_CLASS = 'has-spaced-navbar-fixed-top';
const FIXED_BOTTOM_CLASS = 'is-fixed-bottom';
const BODY_FIXED_BOTTOM_CLASS = 'has-navbar-fixed-bottom';
const BODY_SPACED_FIXED_BOTTOM_CLASS = 'has-spaced-navbar-fixed-bottom';
const BODY_CENTERED_CLASS = 'has-navbar-centered';

const isFilled = (str) => !!str;

var script$v = {
    name: 'BNavbar',
    components: {
        NavbarBurger: script$w
    },
    directives: {
        clickOutside
    },
    props: {
        type: [String, Object],
        transparent: {
            type: Boolean,
            default: false
        },
        fixedTop: {
            type: Boolean,
            default: false
        },
        fixedBottom: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: false
        },
        centered: {
            type: Boolean,
            default: false
        },
        wrapperClass: {
            type: String
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        mobileBurger: {
            type: Boolean,
            default: true
        },
        spaced: Boolean,
        shadow: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            internalIsActive: this.modelValue,
            _isNavBar: true // Used internally by NavbarItem
        }
    },
    computed: {
        isOpened() {
            return this.internalIsActive
        },
        computedClasses() {
            return [
                this.type,
                {
                    [FIXED_TOP_CLASS]: this.fixedTop,
                    [FIXED_BOTTOM_CLASS]: this.fixedBottom,
                    [BODY_CENTERED_CLASS]: this.centered,
                    'is-spaced': this.spaced,
                    'has-shadow': this.shadow,
                    'is-transparent': this.transparent
                }
            ]
        }
    },
    watch: {
        modelValue: {
            handler(active) {
                this.internalIsActive = active;
            },
            immediate: true
        },
        fixedTop(isSet) {
            // toggle body class only on update to handle multiple navbar
            this.setBodyFixedTopClass(isSet);
        },
        bottomTop(isSet) {
            // toggle body class only on update to handle multiple navbar
            this.setBodyFixedBottomClass(isSet);
        }
    },
    methods: {
        toggleActive() {
            this.internalIsActive = !this.internalIsActive;
            this.emitUpdateParentEvent();
        },
        closeMenu() {
            if (this.closeOnClick && this.internalIsActive) {
                this.internalIsActive = false;
                this.emitUpdateParentEvent();
            }
        },
        emitUpdateParentEvent() {
            this.$emit('update:modelValue', this.internalIsActive);
        },
        setBodyClass(className) {
            if (typeof window !== 'undefined') {
                document.body.classList.add(className);
            }
        },
        removeBodyClass(className) {
            if (typeof window !== 'undefined') {
                document.body.classList.remove(className);
            }
        },
        checkIfFixedPropertiesAreColliding() {
            const areColliding = this.fixedTop && this.fixedBottom;
            if (areColliding) {
                throw new Error('You should choose if the BNavbar is fixed bottom or fixed top, but not both')
            }
        },
        genNavbar() {
            const navBarSlots = [
                this.genNavbarBrandNode(),
                this.genNavbarSlotsNode()
            ];

            if (!isFilled(this.wrapperClass)) {
                return this.genNavbarSlots(navBarSlots)
            }

            // It wraps the slots into a div with the provided wrapperClass prop
            const navWrapper = h(
                'div',
                { class: this.wrapperClass },
                navBarSlots
            );

            return this.genNavbarSlots([navWrapper])
        },
        genNavbarSlots(slots) {
            const vnode = h(
                'nav',
                {
                    class: ['navbar', this.computedClasses],
                    role: 'navigation',
                    'aria-label': 'main navigation'
                },
                slots
            );
            return withDirectives(vnode, [
                [resolveDirective('click-outside'), this.closeMenu]
            ])
        },
        genNavbarBrandNode() {
            return h(
                'div',
                { class: 'navbar-brand' },
                [this.$slots.brand(), this.genBurgerNode()]
            )
        },
        genBurgerNode() {
            if (this.mobileBurger) {
                const defaultBurgerNode = h(
                    resolveComponent('navbar-burger'),
                    {
                        isOpened: this.isOpened,
                        onClick: this.toggleActive
                    }
                );

                const hasBurgerSlot = !!this.$slots.burger;
                return hasBurgerSlot
                    ? this.$slots.burger({
                        isOpened: this.isOpened,
                        toggleActive: this.toggleActive
                    })
                    : defaultBurgerNode
            }
        },
        genNavbarSlotsNode() {
            return h(
                'div',
                { class: ['navbar-menu', { 'is-active': this.isOpened }] },
                [
                    this.genMenuPosition('start'),
                    this.genMenuPosition('end')
                ]
            )
        },
        genMenuPosition(positionName) {
            return h(
                'div',
                { class: `navbar-${positionName}` },
                this.$slots[positionName] != null
                    ? this.$slots[positionName]()
                    : []
            )
        },
        setBodyFixedTopClass(isSet) {
            this.checkIfFixedPropertiesAreColliding();
            if (isSet) {
                // TODO Apply only one of the classes once PR is merged in Bulma:
                // https://github.com/jgthms/bulma/pull/2737
                this.setBodyClass(BODY_FIXED_TOP_CLASS);
                this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
            } else {
                this.removeBodyClass(BODY_FIXED_TOP_CLASS);
                this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
            }
        },
        setBodyFixedBottomClass(isSet) {
            this.checkIfFixedPropertiesAreColliding();
            if (isSet) {
                // TODO Apply only one of the classes once PR is merged in Bulma:
                // https://github.com/jgthms/bulma/pull/2737
                this.setBodyClass(BODY_FIXED_BOTTOM_CLASS);
                this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
            } else {
                this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS);
                this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
            }
        }
    },
    beforeMount() {
        this.fixedTop && this.setBodyFixedTopClass(true);
        this.fixedBottom && this.setBodyFixedBottomClass(true);
    },
    beforeUnmount() {
        if (this.fixedTop) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_TOP_CLASS
                : BODY_FIXED_TOP_CLASS;
            this.removeBodyClass(className);
        } else if (this.fixedBottom) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_BOTTOM_CLASS
                : BODY_FIXED_BOTTOM_CLASS;
            this.removeBodyClass(className);
        }
    },
    render() {
        return this.genNavbar()
    }
};

script$v.__file = "src/components/navbar/Navbar.vue";

const clickableWhiteList = ['div', 'span', 'input'];

var script$u = {
    name: 'BNavbarItem',
    inheritAttrs: false,
    props: {
        tag: {
            type: String,
            default: 'a'
        },
        active: Boolean
    },
    methods: {
        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') {
                this.closeMenuRecursive(this, ['NavBar']);
            }
        },
        /**
         * Close parent if clicked outside.
         */
        handleClickEvent(event) {
            const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName);
            if (!isOnWhiteList) {
                const parent = this.closeMenuRecursive(this, ['NavbarDropdown', 'NavBar']);
                if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ['NavBar']);
            }
        },
        /**
         * Close parent recursively
         */
        closeMenuRecursive(current, targetComponents) {
            if (!current.$parent) return null
            const foundItem = targetComponents.reduce((acc, item) => {
                if (current.$parent.$data[`_is${item}`]) {
                    current.$parent.closeMenu();
                    return current.$parent
                }
                return acc
            }, null);
            return foundItem || this.closeMenuRecursive(current.$parent, targetComponents)
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            this.$el.addEventListener('click', this.handleClickEvent);
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            this.$el.removeEventListener('click', this.handleClickEvent);
            document.removeEventListener('keyup', this.keyPress);
        }
    }
};

function render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
    class: ["navbar-item", {
            'is-active': $props.active
        }]
  }, _ctx.$attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class"]))
}

script$u.render = render$q;
script$u.__file = "src/components/navbar/NavbarItem.vue";

var script$t = {
    name: 'BNavbarDropdown',
    directives: {
        clickOutside
    },
    props: {
        label: String,
        hoverable: Boolean,
        active: Boolean,
        right: Boolean,
        arrowless: Boolean,
        boxed: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        },
        collapsible: Boolean

    },
    data() {
        return {
            newActive: this.active,
            isHoverable: this.hoverable,
            _isNavbarDropdown: true // Used internally by NavbarItem
        }
    },
    watch: {
        active(value) {
            this.newActive = value;
        }
    },
    methods: {
        showMenu() {
            this.newActive = true;
        },
        /**
        * See naming convetion of navbaritem
        */
        closeMenu() {
            this.newActive = !this.closeOnClick;
            if (this.hoverable && this.closeOnClick) {
                this.isHoverable = false;
            }
        },
        checkHoverable() {
            if (this.hoverable) {
                this.isHoverable = true;
            }
        }
    }
};

function render$p(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_click_outside = resolveDirective("click-outside");

  return withDirectives((openBlock(), createBlock("div", {
    class: ["navbar-item has-dropdown", {
            'is-hoverable': $data.isHoverable,
            'is-active': $data.newActive
        }],
    onMouseenter: _cache[2] || (_cache[2] = (...args) => ($options.checkHoverable && $options.checkHoverable(...args)))
  }, [
    createVNode("a", {
      class: ["navbar-link", {
                'is-arrowless': $props.arrowless,
                'is-active': $data.newActive && $props.collapsible
            }],
      role: "menuitem",
      "aria-haspopup": "true",
      href: "#",
      onClick: _cache[1] || (_cache[1] = withModifiers($event => ($data.newActive = !$data.newActive), ["prevent"]))
    }, [
      ($props.label)
        ? (openBlock(), createBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString($props.label), 1 /* TEXT */)
          ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
        : renderSlot(_ctx.$slots, "label", { key: 1 })
    ], 2 /* CLASS */),
    withDirectives(createVNode("div", {
      class: ["navbar-dropdown", {
                'is-right': $props.right,
                'is-boxed': $props.boxed,
            }]
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */), [
      [vShow, !$props.collapsible || ($props.collapsible && $data.newActive)]
    ])
  ], 34 /* CLASS, HYDRATE_EVENTS */)), [
    [_directive_click_outside, $options.closeMenu]
  ])
}

script$t.render = render$p;
script$t.__file = "src/components/navbar/NavbarDropdown.vue";

var Plugin$E = {
  install: function install(Vue) {
    registerComponent(Vue, script$v);
    registerComponent(Vue, script$u);
    registerComponent(Vue, script$t);
  }
};
use(Plugin$E);
var Plugin$F = Plugin$E;

var script$s = {
    name: 'BNumberinput',
    components: {
        [script$11.name]: script$11,
        [script$10.name]: script$10
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    inject: {
        field: {
            from: 'BField',
            default: false
        }
    },
    props: {
        modelValue: Number,
        min: {
            type: [Number, String]
        },
        max: [Number, String],
        step: [Number, String],
        minStep: [Number, String],
        exponential: [Boolean, Number],
        disabled: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        editable: {
            type: Boolean,
            default: true
        },
        controls: {
            type: Boolean,
            default: true
        },
        controlsAlignment: {
            type: String,
            default: 'center',
            validator: (value) => {
                return [
                    'left',
                    'right',
                    'center'
                ].indexOf(value) >= 0
            }
        },
        controlsRounded: {
            type: Boolean,
            default: false
        },
        controlsPosition: String,
        placeholder: [Number, String],
        ariaMinusLabel: String,
        ariaPlusLabel: String
    },
    emits: ['blur', 'focus', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            newStep: this.step || 1,
            newMinStep: this.minStep,
            timesPressed: 1,
            _elementRef: 'input'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                let newValue = value;
                if (value === '' || value === undefined || value === null) {
                    if (this.minNumber !== undefined) {
                        newValue = this.minNumber;
                    } else {
                        newValue = null;
                    }
                }
                this.newValue = newValue;
                if (!isNaN(newValue) && newValue !== null && newValue !== '-0') {
                    this.$emit('update:modelValue', Number(newValue));
                }
                !this.isValid && this.$refs.input.checkHtml5Validity();
            }
        },
        controlsLeft() {
            if (this.controls && this.controlsAlignment !== 'right') {
                return this.controlsAlignment === 'left' ? ['minus', 'plus'] : ['minus']
            }
            return []
        },
        controlsRight() {
            if (this.controls && this.controlsAlignment !== 'left') {
                return this.controlsAlignment === 'right' ? ['minus', 'plus'] : ['plus']
            }
            return []
        },
        fieldClasses() {
            return [
                { 'has-addons': this.controlsPosition === 'compact' },
                { 'is-grouped': this.controlsPosition !== 'compact' },
                { 'is-expanded': this.expanded }
            ]
        },
        buttonClasses() {
            return [this.type, this.size, { 'is-rounded': this.controlsRounded }]
        },
        minNumber() {
            return typeof this.min === 'string' ? parseFloat(this.min) : this.min
        },
        maxNumber() {
            return typeof this.max === 'string' ? parseFloat(this.max) : this.max
        },
        stepNumber() {
            return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep
        },
        minStepNumber() {
            const step = typeof this.newMinStep !== 'undefined' ? this.newMinStep : this.newStep;
            return typeof step === 'string' ? parseFloat(step) : step
        },
        disabledMin() {
            return this.computedValue - this.stepNumber < this.minNumber
        },
        disabledMax() {
            return this.computedValue + this.stepNumber > this.maxNumber
        },
        stepDecimals() {
            const step = this.minStepNumber.toString();
            const index = step.indexOf('.');
            if (index >= 0) {
                return step.substring(index + 1).length
            }
            return 0
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
        modelValue: {
            immediate: true,
            handler(value) {
                this.newValue = value;
            }
        },
        step(value) {
            this.newStep = value;
        },
        minStep(value) {
            this.newMinStep = value;
        }
    },
    methods: {
        isDisabled(control) {
            return this.disabled || (control === 'plus' ? this.disabledMax : this.disabledMin)
        },
        decrement() {
            if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
                if (this.computedValue === null || typeof this.computedValue === 'undefined') {
                    if (this.maxNumber) {
                        this.computedValue = this.maxNumber;
                        return
                    }
                    this.computedValue = 0;
                }
                const value = this.computedValue - this.stepNumber;
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
        },
        increment() {
            if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
                if (this.computedValue === null || typeof this.computedValue === 'undefined') {
                    if (this.minNumber) {
                        this.computedValue = this.minNumber;
                        return
                    }
                    this.computedValue = 0;
                }
                const value = this.computedValue + this.stepNumber;
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
        },
        onControlClick(event, inc) {
            // IE 11 -> filter click event
            if (event.detail !== 0 || event.type !== 'click') return
            if (inc) this.increment();
            else this.decrement();
        },
        longPressTick(inc) {
            if (inc) this.increment();
            else this.decrement();

            this._$intervalRef = setTimeout(() => {
                this.longPressTick(inc);
            }, this.exponential ? (250 / (this.exponential * this.timesPressed++)) : 250);
        },
        onStartLongPress(event, inc) {
            if (event.button !== 0 && event.type !== 'touchstart') return
            clearTimeout(this._$intervalRef);
            this.longPressTick(inc);
        },
        onStopLongPress() {
            if (!this._$intervalRef) return
            this.timesPressed = 1;
            clearTimeout(this._$intervalRef);
            this._$intervalRef = null;
        }
    },
    mounted() {
        // tells the field that it is wrapping a number input
        // if the field is the direct parent.
        if (this.field === this.$parent) {
            this.$parent.wrapNumberinput({
                controlsPosition: this.controlsPosition,
                size: this.size
            });
        }
    }
};

function render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");

  return (openBlock(), createBlock("div", {
    class: ["b-numberinput field", $options.fieldClasses]
  }, [
    (openBlock(true), createBlock(Fragment, null, renderList($options.controlsLeft, (control) => {
      return (openBlock(), createBlock("p", {
        key: control,
        class: ['control', control],
        onMouseup: _cache[1] || (_cache[1] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchend: _cache[3] || (_cache[3] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchcancel: _cache[4] || (_cache[4] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args)))
      }, [
        createVNode("button", {
          type: "button",
          class: ["button", $options.buttonClasses],
          disabled: $options.isDisabled(control) || undefined,
          "aria-label": control === 'plus' ? $props.ariaPlusLabel : $props.ariaMinusLabel,
          onMousedown: $event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ),
          onTouchstart: withModifiers($event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ), ["prevent"]),
          onClick: $event => (
                    !$options.isDisabled(control) && $options.onControlClick($event, control === 'plus')
                )
        }, [
          createVNode(_component_b_icon, {
            both: "",
            icon: control,
            pack: _ctx.iconPack,
            size: _ctx.iconSize
          }, null, 8 /* PROPS */, ["icon", "pack", "size"])
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"])
      ], 34 /* CLASS, HYDRATE_EVENTS */))
    }), 128 /* KEYED_FRAGMENT */)),
    createVNode(_component_b_input, mergeProps({
      type: "number",
      ref: "input",
      modelValue: $options.computedValue,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ($options.computedValue = $event))
    }, _ctx.$attrs, {
      step: $options.minStepNumber,
      max: $props.max,
      min: $props.min,
      size: _ctx.size,
      disabled: $options.disabledOrUndefined,
      readonly: !$props.editable,
      loading: _ctx.loading,
      rounded: _ctx.rounded,
      icon: _ctx.icon,
      "icon-pack": _ctx.iconPack,
      autocomplete: _ctx.autocomplete,
      expanded: _ctx.expanded,
      placeholder: $props.placeholder,
      "use-html5-validation": _ctx.useHtml5Validation,
      onFocus: _cache[6] || (_cache[6] = $event => (_ctx.$emit('focus', $event))),
      onBlur: _cache[7] || (_cache[7] = $event => (_ctx.$emit('blur', $event)))
    }), null, 16 /* FULL_PROPS */, ["modelValue", "step", "max", "min", "size", "disabled", "readonly", "loading", "rounded", "icon", "icon-pack", "autocomplete", "expanded", "placeholder", "use-html5-validation"]),
    (openBlock(true), createBlock(Fragment, null, renderList($options.controlsRight, (control) => {
      return (openBlock(), createBlock("p", {
        key: control,
        class: ['control', control],
        onMouseup: _cache[8] || (_cache[8] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onMouseleave: _cache[9] || (_cache[9] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchend: _cache[10] || (_cache[10] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args))),
        onTouchcancel: _cache[11] || (_cache[11] = (...args) => ($options.onStopLongPress && $options.onStopLongPress(...args)))
      }, [
        createVNode("button", {
          type: "button",
          class: ["button", $options.buttonClasses],
          disabled: $options.isDisabled(control) || undefined,
          "aria-label": control === 'plus' ? $props.ariaPlusLabel : $props.ariaMinusLabel,
          onMousedown: $event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ),
          onTouchstart: withModifiers($event => (
                    !$options.isDisabled(control) && $options.onStartLongPress($event, control === 'plus')
                ), ["prevent"]),
          onClick: $event => (
                    !$options.isDisabled(control) && $options.onControlClick($event, control === 'plus')
                )
        }, [
          createVNode(_component_b_icon, {
            both: "",
            icon: control,
            pack: _ctx.iconPack,
            size: _ctx.iconSize
          }, null, 8 /* PROPS */, ["icon", "pack", "size"])
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"])
      ], 34 /* CLASS, HYDRATE_EVENTS */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}

script$s.render = render$o;
script$s.__file = "src/components/numberinput/Numberinput.vue";

var Plugin$C = {
  install: function install(Vue) {
    registerComponent(Vue, script$s);
  }
};
use(Plugin$C);
var Plugin$D = Plugin$C;

var script$r = {
    name: 'BPaginationButton',
    props: {
        page: {
            type: Object,
            required: true
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        href() {
            if (this.tag === 'a') {
                return '#'
            } else {
                return undefined
            }
        },
        isDisabled() {
            return this.disabled || this.page.disabled
        },
        disabledOrUndefined() {
            return this.isDisabled || undefined
        }
    }
};

function render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
    role: "button",
    href: $options.href,
    disabled: $options.disabledOrUndefined,
    class: ["pagination-link", { 'is-current': $props.page.isCurrent, [$props.page.class]: true }]
  }, _ctx.$attrs, {
    onClick: withModifiers($props.page.click, ["prevent"]),
    "aria-label": $props.page['aria-label'],
    "aria-current": $props.page.isCurrent
  }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString($props.page.number), 1 /* TEXT */)
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]))
}

script$r.render = render$n;
script$r.__file = "src/components/pagination/PaginationButton.vue";

var script$q = {
    name: 'BPagination',
    components: {
        [script$11.name]: script$11,
        [script$r.name]: script$r
    },
    props: {
        total: [Number, String],
        perPage: {
            type: [Number, String],
            default: 20
        },
        modelValue: {
            type: [Number, String],
            default: 1
        },
        rangeBefore: {
            type: [Number, String],
            default: 1
        },
        rangeAfter: {
            type: [Number, String],
            default: 1
        },
        size: String,
        simple: Boolean,
        rounded: Boolean,
        order: String,
        iconPack: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
            }
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    emits: ['change', 'update:modelValue'],
    computed: {
        rootClasses() {
            return [
                this.order,
                this.size,
                {
                    'is-simple': this.simple,
                    'is-rounded': this.rounded
                }
            ]
        },

        beforeCurrent() {
            return parseInt(this.rangeBefore)
        },

        afterCurrent() {
            return parseInt(this.rangeAfter)
        },

        /**
        * Total page size (count).
        */
        pageCount() {
            return Math.ceil(this.total / this.perPage)
        },

        /**
        * First item of the page (count).
        */
        firstItem() {
            const firstItem = this.modelValue * this.perPage - this.perPage + 1;
            return firstItem >= 0 ? firstItem : 0
        },

        /**
        * Check if previous button is available.
        */
        hasPrev() {
            return this.modelValue > 1
        },

        /**
        * Check if first page button should be visible.
        */
        hasFirst() {
            return this.modelValue >= (2 + this.beforeCurrent)
        },

        /**
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
            return this.modelValue >= (this.beforeCurrent + 4)
        },

        /**
        * Check if last page button should be visible.
        */
        hasLast() {
            return this.modelValue <= this.pageCount - (1 + this.afterCurrent)
        },

        /**
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
            return this.modelValue < this.pageCount - (2 + this.afterCurrent)
        },

        /**
        * Check if next button is available.
        */
        hasNext() {
            return this.modelValue < this.pageCount
        },

        /**
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
            if (this.simple) return

            let left = Math.max(1, this.modelValue - this.beforeCurrent);
            if (left - 1 === 2) {
                left--; // Do not show the ellipsis if there is only one to hide
            }
            let right = Math.min(this.modelValue + this.afterCurrent, this.pageCount);
            if (this.pageCount - right === 2) {
                right++; // Do not show the ellipsis if there is only one to hide
            }

            const pages = [];
            for (let i = left; i <= right; i++) {
                pages.push(this.getPage(i));
            }
            return pages
        }
    },
    watch: {
        /**
        * If current page is trying to be greater than page count, set to last.
        */
        pageCount(value) {
            if (this.modelValue > value) this.last();
        }
    },
    methods: {
        /**
        * Previous button click listener.
        */
        prev(event) {
            this.changePage(this.modelValue - 1, event);
        },
        /**
        * Next button click listener.
        */
        next(event) {
            this.changePage(this.modelValue + 1, event);
        },
        /**
        * First button click listener.
        */
        first(event) {
            this.changePage(1, event);
        },
        /**
        * Last button click listener.
        */
        last(event) {
            this.changePage(this.pageCount, event);
        },

        changePage(num, event) {
            if (this.modelValue === num || num < 1 || num > this.pageCount) return
            this.$emit('update:modelValue', num);
            this.$emit('change', num);

            // Set focus on element to keep tab order
            if (event && event.target) {
                this.$nextTick(() => event.target.focus());
            }
        },

        getPage(num, options = {}) {
            return {
                number: num,
                isCurrent: this.modelValue === num,
                click: (event) => this.changePage(num, event),
                disabled: options.disabled || false,
                class: options.class || '',
                'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.modelValue === num)
            }
        },

        /**
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                return this.ariaPageLabel + ' ' + pageNumber + '.'
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.'
            }
            return null
        }
    }
};

const _hoisted_1$g = {
  key: 4,
  class: "info"
};
const _hoisted_2$6 = {
  key: 5,
  class: "pagination-list"
};
const _hoisted_3$4 = { key: 0 };
const _hoisted_4$4 = { key: 1 };
const _hoisted_5$3 = /*#__PURE__*/createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_6$2 = { key: 2 };
const _hoisted_7$1 = /*#__PURE__*/createVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_8$1 = { key: 3 };

function render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_BPaginationButton = resolveComponent("BPaginationButton");

  return (openBlock(), createBlock("nav", {
    class: ["pagination", $options.rootClasses]
  }, [
    (_ctx.$slots.previous)
      ? renderSlot(_ctx.$slots, "previous", {
          key: 0,
          page: $options.getPage($props.modelValue - 1, {
                disabled: !$options.hasPrev,
                class: 'pagination-previous',
                'aria-label': $props.ariaPreviousLabel
            })
        }, () => [
          createVNode(_component_b_icon, {
            icon: $props.iconPrev,
            pack: $props.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8 /* PROPS */, ["icon", "pack"])
        ])
      : (openBlock(), createBlock(_component_BPaginationButton, {
          key: 1,
          class: "pagination-previous",
          disabled: !$options.hasPrev,
          page: $options.getPage($props.modelValue - 1),
          "aria-label": $props.ariaPreviousLabel
        }, {
          default: withCtx(() => [
            createVNode(_component_b_icon, {
              icon: $props.iconPrev,
              pack: $props.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8 /* PROPS */, ["icon", "pack"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "page", "aria-label"])),
    (_ctx.$slots.next)
      ? renderSlot(_ctx.$slots, "next", {
          key: 2,
          page: $options.getPage($props.modelValue + 1, {
                disabled: !$options.hasNext,
                class: 'pagination-next',
                'aria-label': $props.ariaNextLabel
            })
        }, () => [
          createVNode(_component_b_icon, {
            icon: $props.iconNext,
            pack: $props.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8 /* PROPS */, ["icon", "pack"])
        ])
      : (openBlock(), createBlock(_component_BPaginationButton, {
          key: 3,
          class: "pagination-next",
          disabled: !$options.hasNext,
          page: $options.getPage($props.modelValue + 1),
          "aria-label": $props.ariaNextLabel
        }, {
          default: withCtx(() => [
            createVNode(_component_b_icon, {
              icon: $props.iconNext,
              pack: $props.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8 /* PROPS */, ["icon", "pack"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "page", "aria-label"])),
    ($props.simple)
      ? (openBlock(), createBlock("small", _hoisted_1$g, [
          ($props.perPage == 1)
            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($options.firstItem) + " / " + toDisplayString($props.total), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString($options.firstItem) + "-" + toDisplayString(Math.min($props.modelValue * $props.perPage, $props.total)) + " / " + toDisplayString($props.total), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
        ]))
      : (openBlock(), createBlock("ul", _hoisted_2$6, [
          createCommentVNode("First"),
          ($options.hasFirst)
            ? (openBlock(), createBlock("li", _hoisted_3$4, [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      page: $options.getPage(1)
                    })
                  : (openBlock(), createBlock(_component_BPaginationButton, {
                      key: 1,
                      page: $options.getPage(1)
                    }, null, 8 /* PROPS */, ["page"]))
              ]))
            : createCommentVNode("v-if", true),
          ($options.hasFirstEllipsis)
            ? (openBlock(), createBlock("li", _hoisted_4$4, [
                _hoisted_5$3
              ]))
            : createCommentVNode("v-if", true),
          createCommentVNode("Pages"),
          (openBlock(true), createBlock(Fragment, null, renderList($options.pagesInRange, (page) => {
            return (openBlock(), createBlock("li", {
              key: page.number
            }, [
              (_ctx.$slots.default)
                ? renderSlot(_ctx.$slots, "default", {
                    key: 0,
                    page: page
                  })
                : (openBlock(), createBlock(_component_BPaginationButton, {
                    key: 1,
                    page: page
                  }, null, 8 /* PROPS */, ["page"]))
            ]))
          }), 128 /* KEYED_FRAGMENT */)),
          createCommentVNode("Last"),
          ($options.hasLastEllipsis)
            ? (openBlock(), createBlock("li", _hoisted_6$2, [
                _hoisted_7$1
              ]))
            : createCommentVNode("v-if", true),
          ($options.hasLast)
            ? (openBlock(), createBlock("li", _hoisted_8$1, [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      page: $options.getPage($options.pageCount)
                    })
                  : (openBlock(), createBlock(_component_BPaginationButton, {
                      key: 1,
                      page: $options.getPage($options.pageCount)
                    }, null, 8 /* PROPS */, ["page"]))
              ]))
            : createCommentVNode("v-if", true)
        ]))
  ], 2 /* CLASS */))
}

script$q.render = render$m;
script$q.__file = "src/components/pagination/Pagination.vue";

var Plugin$A = {
  install: function install(Vue) {
    registerComponent(Vue, script$q);
    registerComponent(Vue, script$r);
  }
};
use(Plugin$A);
var Plugin$B = Plugin$A;

var script$p = {
    name: 'BProgress',
    mixins: [ProviderParentMixin('progress')],
    props: {
        type: {
            type: [String, Object],
            default: 'is-darkgrey'
        },
        size: String,
        value: {
            type: Number,
            default: undefined
        },
        max: {
            type: Number,
            default: 100
        },
        showValue: {
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
        precision: {
            type: Number,
            default: 2
        },
        keepTrailingZeroes: {
            type: Boolean,
            default: false
        },
        locale: {
            type: [String, Array],
            default: () => {
                return config.defaultLocale
            }
        }
    },
    computed: {
        isIndeterminate() {
            return this.value === undefined || this.value === null
        },
        newType() {
            return [
                this.size,
                this.type,
                {
                    'is-more-than-half': this.value && this.value > this.max / 2
                }
            ]
        },
        newValue() {
            return this.calculateValue(this.value)
        },
        isNative() {
            return this.$slots.bar === undefined
        },
        wrapperClasses() {
            return {
                'is-not-native': !this.isNative,
                [this.size]: !this.isNative
            }
        }
    },
    watch: {
        /**
         * When value is changed back to undefined, value of native progress get reset to 0.
         * Need to add and remove the value attribute to have the indeterminate or not.
         */
        isIndeterminate(indeterminate) {
            this.$nextTick(() => {
                if (this.$refs.progress) {
                    if (indeterminate) {
                        this.$refs.progress.removeAttribute('value');
                    } else {
                        this.$refs.progress.setAttribute('value', this.value);
                    }
                }
            });
        }
    },
    methods: {
        calculateValue(value) {
            if (value === undefined || value === null || isNaN(value)) {
                return undefined
            }

            const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
            const maximumFractionDigits = this.precision;
            if (this.format === 'percent') {
                return new Intl.NumberFormat(
                    this.locale,
                    {
                        style: 'percent',
                        minimumFractionDigits: minimumFractionDigits,
                        maximumFractionDigits: maximumFractionDigits
                    }
                ).format(value / this.max)
            }

            return new Intl.NumberFormat(
                this.locale,
                {
                    minimumFractionDigits: minimumFractionDigits,
                    maximumFractionDigits: maximumFractionDigits
                }
            ).format(value)
        }
    }
};

const _hoisted_1$f = {
  key: 2,
  class: "progress-value"
};

function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["progress-wrapper", $options.wrapperClasses]
  }, [
    ($options.isNative)
      ? (openBlock(), createBlock("progress", {
          key: 0,
          ref: "progress",
          class: ["progress", $options.newType],
          max: $props.max,
          value: $props.value
        }, toDisplayString($options.newValue), 11 /* TEXT, CLASS, PROPS */, ["max", "value"]))
      : renderSlot(_ctx.$slots, "bar", { key: 1 }),
    ($options.isNative && $props.showValue)
      ? (openBlock(), createBlock("p", _hoisted_1$f, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString($options.newValue), 1 /* TEXT */)
          ])
        ]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$p.render = render$l;
script$p.__file = "src/components/progress/Progress.vue";

var script$o = {
    name: 'BProgressBar',
    mixins: [InjectedChildMixin('progress')],
    props: {
        type: {
            type: [String, Object],
            default: undefined
        },
        value: {
            type: Number,
            default: undefined
        },
        showValue: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        newType() {
            return [
                this.parent.size,
                this.type || this.parent.type
            ]
        },
        newShowValue() {
            return this.showValue || this.parent.showValue
        },
        newValue() {
            return this.parent.calculateValue(this.value)
        },
        barWidth() {
            return `${this.value * 100 / this.parent.max}%`
        }
    }
};

const _hoisted_1$e = {
  key: 0,
  class: "progress-value"
};

function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["progress-bar", $options.newType],
    role: "progressbar",
    "aria-valuenow": $props.value,
    "aria-valuemax": _ctx.parent.max,
    "aria-valuemin": "0",
    style: {width: $options.barWidth}
  }, [
    ($options.newShowValue)
      ? (openBlock(), createBlock("p", _hoisted_1$e, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString($options.newValue), 1 /* TEXT */)
          ])
        ]))
      : createCommentVNode("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["aria-valuenow", "aria-valuemax"]))
}

script$o.render = render$k;
script$o.__file = "src/components/progress/ProgressBar.vue";

var Plugin$y = {
  install: function install(Vue) {
    registerComponent(Vue, script$p);
    registerComponent(Vue, script$o);
  }
};
use(Plugin$y);
var Plugin$z = Plugin$y;

var script$n = {
    name: 'BRadio',
    mixins: [CheckRadioMixin]
};

const _hoisted_1$d = { class: "control-label" };

function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: ["b-radio radio", [_ctx.size, { 'is-disabled': _ctx.disabled }]],
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.focus && _ctx.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
  }, [
    withDirectives(createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
      type: "radio",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 8 /* PROPS */, ["disabled", "required", "name", "value"]), [
      [vModelRadio, _ctx.computedValue]
    ]),
    createVNode("span", {
      class: ["check", _ctx.type]
    }, null, 2 /* CLASS */),
    createVNode("span", _hoisted_1$d, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script$n.render = render$j;
script$n.__file = "src/components/radio/Radio.vue";

var script$m = {
    name: 'BRadioButton',
    mixins: [CheckRadioMixin],
    props: {
        type: {
            type: String,
            default: 'is-primary'
        },
        expanded: Boolean
    },
    data() {
        return {
            isFocused: false
        }
    },
    computed: {
        isSelected() {
            return this.newValue === this.nativeValue
        },
        labelClass() {
            return [
                this.isSelected ? this.type : null,
                this.size,
                {
                    'is-selected': this.isSelected,
                    'is-disabled': this.disabled,
                    'is-focused': this.isFocused
                }
            ]
        }
    }
};

function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["control", { 'is-expanded': $props.expanded }]
  }, [
    createVNode("label", {
      class: ["b-radio radio button", $options.labelClass],
      ref: "label",
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.focus && _ctx.focus(...args))),
      onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"]))
    }, [
      renderSlot(_ctx.$slots, "default"),
      withDirectives(createVNode("input", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.computedValue = $event)),
        type: "radio",
        ref: "input",
        onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
        disabled: _ctx.disabledOrUndefined,
        required: _ctx.requiredOrUndefined,
        name: _ctx.name,
        value: _ctx.nativeValue,
        onFocus: _cache[3] || (_cache[3] = $event => ($data.isFocused = true)),
        onBlur: _cache[4] || (_cache[4] = $event => ($data.isFocused = false))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "required", "name", "value"]), [
        [vModelRadio, _ctx.computedValue]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"])
  ], 2 /* CLASS */))
}

script$m.render = render$i;
script$m.__file = "src/components/radio/RadioButton.vue";

var Plugin$w = {
  install: function install(Vue) {
    registerComponent(Vue, script$n);
    registerComponent(Vue, script$m);
  }
};
use(Plugin$w);
var Plugin$x = Plugin$w;

var script$l = {
    name: 'BRate',
    components: {
        [script$11.name]: script$11
    },
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 5
        },
        icon: {
            type: String,
            default: 'star'
        },
        iconPack: String,
        size: String,
        spaced: Boolean,
        rtl: Boolean,
        disabled: Boolean,
        showScore: Boolean,
        showText: Boolean,
        customText: String,
        texts: Array,
        locale: {
            type: [String, Array],
            default: () => {
                return config.defaultLocale
            }
        }
    },
    emits: ['change', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            hoverValue: 0
        }
    },
    computed: {
        halfStyle() {
            return `width:${this.valueDecimal}%`
        },
        showMe() {
            let result = '';
            if (this.showScore) {
                result = this.disabled ? this.modelValue : this.newValue;
                if (result === 0) {
                    result = '';
                } else {
                    result = new Intl.NumberFormat(this.locale).format(this.modelValue);
                }
            } else if (this.showText) {
                result = this.texts[Math.ceil(this.newValue) - 1];
            }
            return result
        },
        valueDecimal() {
            return this.modelValue * 100 - Math.floor(this.modelValue) * 100
        }
    },
    watch: {
        // When v-model is changed set the new value.
        modelValue(value) {
            this.newValue = value;
        }
    },
    methods: {
        resetNewValue() {
            if (this.disabled) return
            this.hoverValue = 0;
        },
        previewRate(index, event) {
            if (this.disabled) return
            this.hoverValue = index;
            event.stopPropagation();
        },
        confirmValue(index) {
            if (this.disabled) return
            this.newValue = index;
            this.$emit('change', this.newValue);
            this.$emit('update:modelValue', this.newValue);
        },
        checkHalf(index) {
            const showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
            index - 1 < this.modelValue && index > this.modelValue;
            return showWhenDisabled
        },
        rateClass(index) {
            let output = '';
            const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;
            if (index <= currentValue) {
                output = 'set-on';
            } else if (this.disabled && (Math.ceil(this.modelValue) === index)) {
                output = 'set-half';
            }
            return output
        }
    }
};

const _hoisted_1$c = { key: 0 };

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["rate", { 'is-disabled': $props.disabled, 'is-spaced': $props.spaced, 'is-rtl': $props.rtl }]
  }, [
    (openBlock(true), createBlock(Fragment, null, renderList($props.max, (item, index) => {
      return (openBlock(), createBlock("div", {
        class: ["rate-item", $options.rateClass(item)],
        key: index,
        onMousemove: $event => ($options.previewRate(item, $event)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => ($options.resetNewValue && $options.resetNewValue(...args))),
        onClick: withModifiers($event => ($options.confirmValue(item)), ["prevent"])
      }, [
        createVNode(_component_b_icon, {
          pack: $props.iconPack,
          icon: $props.icon,
          size: $props.size
        }, null, 8 /* PROPS */, ["pack", "icon", "size"]),
        ($options.checkHalf(item))
          ? (openBlock(), createBlock(_component_b_icon, {
              key: 0,
              class: "is-half",
              pack: $props.iconPack,
              icon: $props.icon,
              size: $props.size,
              style: $options.halfStyle
            }, null, 8 /* PROPS */, ["pack", "icon", "size", "style"]))
          : createCommentVNode("v-if", true)
      ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onMousemove", "onClick"]))
    }), 128 /* KEYED_FRAGMENT */)),
    ($props.showText || $props.showScore || $props.customText)
      ? (openBlock(), createBlock("div", {
          key: 0,
          class: ["rate-text", $props.size]
        }, [
          createVNode("span", null, toDisplayString($options.showMe), 1 /* TEXT */),
          ($props.customText && !$props.showText)
            ? (openBlock(), createBlock("span", _hoisted_1$c, toDisplayString($props.customText), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$l.render = render$h;
script$l.__file = "src/components/rate/Rate.vue";

var Plugin$u = {
  install: function install(Vue) {
    registerComponent(Vue, script$l);
  }
};
use(Plugin$u);
var Plugin$v = Plugin$u;

var Plugin$s = {
  install: function install(Vue) {
    registerComponent(Vue, script$N);
  }
};
use(Plugin$s);
var Plugin$t = Plugin$s;

var script$k = {
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

script$k.__file = "src/components/skeleton/Skeleton.vue";

var Plugin$q = {
  install: function install(Vue) {
    registerComponent(Vue, script$k);
  }
};
use(Plugin$q);
var Plugin$r = Plugin$q;

var script$j = {
    name: 'BSidebar',
    props: {
        modelValue: Boolean,
        type: [String, Object],
        overlay: Boolean,
        position: {
            type: String,
            default: 'fixed',
            validator: (value) => {
                return [
                    'fixed',
                    'absolute',
                    'static'
                ].indexOf(value) >= 0
            }
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
            type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'outside']
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return config.defaultModalScroll
                    ? config.defaultModalScroll
                    : 'clip'
            },
            validator: (value) => {
                return [
                    'clip',
                    'keep'
                ].indexOf(value) >= 0
            }
        }
    },
    emits: ['close', 'update:modelValue'],
    data() {
        return {
            isOpen: this.modelValue,
            transitionName: null,
            animating: true,
            savedScrollTop: null
        }
    },
    computed: {
        rootClasses() {
            return [this.type, {
                'is-fixed': this.isFixed,
                'is-static': this.isStatic,
                'is-absolute': this.isAbsolute,
                'is-fullheight': this.fullheight,
                'is-fullwidth': this.fullwidth,
                'is-right': this.right,
                'is-mini': this.reduce,
                'is-mini-expand': this.expandOnHover,
                'is-mini-expand-fixed': this.expandOnHover && this.expandOnHoverFixed,
                'is-mini-mobile': this.mobile === 'reduce',
                'is-hidden-mobile': this.mobile === 'hide',
                'is-fullwidth-mobile': this.mobile === 'fullwidth'
            }]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? ['escape', 'outside']
                    : []
                : this.canCancel
        },
        isStatic() {
            return this.position === 'static'
        },
        isFixed() {
            return this.position === 'fixed'
        },
        isAbsolute() {
            return this.position === 'absolute'
        }
    },
    watch: {
        modelValue: {
            handler(value) {
                this.isOpen = value;
                if (this.overlay) {
                    this.handleScroll();
                }
                const open = this.right ? !value : value;
                this.transitionName = !open ? 'slide-prev' : 'slide-next';
            },
            immediate: true
        }
    },
    methods: {
        /**
        * White-listed items to not close when clicked.
        * Add sidebar content and all children.
        */
        getWhiteList() {
            const whiteList = [];
            whiteList.push(this.$refs.sidebarContent);
            // Add all chidren from dropdown
            if (this.$refs.sidebarContent !== undefined) {
                const children = this.$refs.sidebarContent.querySelectorAll('*');
                for (const child of children) {
                    whiteList.push(child);
                }
            }
            return whiteList
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isFixed) {
                if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
            }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.isStatic) return

            this.onCancel.apply(null, arguments);
            this.close();
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close() {
            this.isOpen = false;
            this.$emit('close');
            this.$emit('update:modelValue', false);
        },

        /**
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event) {
            if (this.isFixed) {
                if (this.isOpen && !this.animating) {
                    const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
                    if (this.getWhiteList().indexOf(target) < 0) {
                        this.cancel('outside');
                    }
                }
            }
        },

        /**
        * Transition before-enter hook
        */
        beforeEnter() {
            this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterEnter() {
            this.animating = false;
        },

        handleScroll() {
            if (typeof window === 'undefined') return

            if (this.scroll === 'clip') {
                if (this.modelValue) {
                    document.documentElement.classList.add('is-clipped');
                } else {
                    document.documentElement.classList.remove('is-clipped');
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop;

            if (this.modelValue) {
                document.body.classList.add('is-noscroll');
            } else {
                document.body.classList.remove('is-noscroll');
            }

            if (this.modelValue) {
                document.body.style.top = `-${this.savedScrollTop}px`;
                return
            }

            document.documentElement.scrollTop = this.savedScrollTop;
            document.body.style.top = null;
            this.savedScrollTop = null;
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
            document.addEventListener('click', this.clickedOutside);
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (this.isFixed) {
                document.body.appendChild(this.$el);
            }
        }
        if (this.overlay && this.modelValue) {
            this.handleScroll();
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
            document.removeEventListener('click', this.clickedOutside);
            if (this.overlay) {
                // reset scroll
                document.documentElement.classList.remove('is-clipped');
                const savedScrollTop = !this.savedScrollTop
                    ? document.documentElement.scrollTop
                    : this.savedScrollTop;
                document.body.classList.remove('is-noscroll');
                document.documentElement.scrollTop = savedScrollTop;
                document.body.style.top = null;
            }
        }
        if (this.isFixed) {
            removeElement(this.$el);
        }
    }
};

const _hoisted_1$b = { class: "b-sidebar" };
const _hoisted_2$5 = {
  key: 0,
  class: "sidebar-background"
};

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$b, [
    ($props.overlay && $data.isOpen)
      ? (openBlock(), createBlock("div", _hoisted_2$5))
      : createCommentVNode("v-if", true),
    createVNode(Transition, {
      name: $data.transitionName,
      onBeforeEnter: $options.beforeEnter,
      onAfterEnter: $options.afterEnter
    }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", {
          ref: "sidebarContent",
          class: ["sidebar-content", $options.rootClasses]
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */), [
          [vShow, $data.isOpen]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name", "onBeforeEnter", "onAfterEnter"])
  ]))
}

script$j.render = render$g;
script$j.__file = "src/components/sidebar/Sidebar.vue";

var Plugin$o = {
  install: function install(Vue) {
    registerComponent(Vue, script$j);
  }
};
use(Plugin$o);
var Plugin$p = Plugin$o;

var script$i = {
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

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("span", {
    ref: "tooltip",
    class: $options.rootClasses
  }, [
    createVNode(Transition, { name: $options.newAnimation }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", {
          ref: "content",
          class: ['tooltip-content', $props.contentClass],
          onMouseenter: _cache[1] || (_cache[1] = (...args) => ($options.onContentHover && $options.onContentHover(...args))),
          onMouseleave: _cache[2] || (_cache[2] = (...args) => ($options.close && $options.close(...args)))
        }, [
          ($props.label)
            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($props.label), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : (_ctx.$slots.content)
              ? renderSlot(_ctx.$slots, "content", { key: 1 })
              : createCommentVNode("v-if", true)
        ], 34 /* CLASS, HYDRATE_EVENTS */), [
          [vShow, $props.active && ($data.isActive || $props.always)]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"]),
    createVNode("div", {
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
      renderSlot(_ctx.$slots, "default", { ref: "slot" })
    ], 36 /* STYLE, HYDRATE_EVENTS */)
  ], 2 /* CLASS */))
}

script$i.render = render$f;
script$i.__file = "src/components/tooltip/Tooltip.vue";

var script$h = {
    name: 'BSliderThumb',
    components: {
        [script$i.name]: script$i
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

const _hoisted_1$a = { key: 0 };

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tooltip = resolveComponent("b-tooltip");

  return (openBlock(), createBlock("div", {
    class: ["b-slider-thumb-wrapper", { 'is-dragging': $data.dragging, 'has-indicator': $props.indicator}],
    style: $options.wrapperStyle
  }, [
    createVNode(_component_b_tooltip, {
      label: $options.formattedValue,
      type: $props.type,
      always: $data.dragging || $data.isFocused || $props.tooltipAlways,
      active: !$options.disabled && $props.tooltip
    }, {
      default: withCtx(() => [
        createVNode("div", mergeProps({
          class: "b-slider-thumb",
          tabindex: $options.disabled ? false : 0
        }, _ctx.$attrs, {
          onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.onButtonDown && $options.onButtonDown(...args))),
          onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.onButtonDown && $options.onButtonDown(...args))),
          onFocus: _cache[3] || (_cache[3] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          onBlur: _cache[4] || (_cache[4] = (...args) => ($options.onBlur && $options.onBlur(...args))),
          onKeydown: [
            _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => ($options.onLeftKeyDown && $options.onLeftKeyDown(...args)), ["prevent"]), ["left"])),
            _cache[6] || (_cache[6] = withKeys(withModifiers((...args) => ($options.onRightKeyDown && $options.onRightKeyDown(...args)), ["prevent"]), ["right"])),
            _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => ($options.onLeftKeyDown && $options.onLeftKeyDown(...args)), ["prevent"]), ["down"])),
            _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => ($options.onRightKeyDown && $options.onRightKeyDown(...args)), ["prevent"]), ["up"])),
            _cache[9] || (_cache[9] = withKeys(withModifiers((...args) => ($options.onHomeKeyDown && $options.onHomeKeyDown(...args)), ["prevent"]), ["home"])),
            _cache[10] || (_cache[10] = withKeys(withModifiers((...args) => ($options.onEndKeyDown && $options.onEndKeyDown(...args)), ["prevent"]), ["end"]))
          ]
        }), [
          ($props.indicator)
            ? (openBlock(), createBlock("span", _hoisted_1$a, toDisplayString($options.formattedValue), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ], 16 /* FULL_PROPS */, ["tabindex"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["label", "type", "always", "active"])
  ], 6 /* CLASS, STYLE */))
}

script$h.render = render$e;
script$h.__file = "src/components/slider/SliderThumb.vue";

var script$g = {
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

const _hoisted_1$9 = {
  key: 0,
  class: "b-slider-tick-label"
};

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["b-slider-tick", { 'is-tick-hidden': $options.hidden }],
    style: $options.getTickStyle($options.position)
  }, [
    (_ctx.$slots.default)
      ? (openBlock(), createBlock("span", _hoisted_1$9, [
          renderSlot(_ctx.$slots, "default")
        ]))
      : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

script$g.render = render$d;
script$g.__file = "src/components/slider/SliderTick.vue";

var script$f = {
    name: 'BSlider',
    components: {
        [script$h.name]: script$h,
        [script$g.name]: script$g
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

const _hoisted_1$8 = {
  class: "b-slider-track",
  ref: "slider"
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slider_tick = resolveComponent("b-slider-tick");
  const _component_b_slider_thumb = resolveComponent("b-slider-thumb");

  return (openBlock(), createBlock("div", {
    class: ["b-slider", [$props.size, $props.type, $options.rootClasses ]],
    onClick: _cache[3] || (_cache[3] = (...args) => ($options.onSliderClick && $options.onSliderClick(...args)))
  }, [
    createVNode("div", _hoisted_1$8, [
      createVNode("div", {
        class: "b-slider-fill",
        style: $options.barStyle
      }, null, 4 /* STYLE */),
      ($props.ticks)
        ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList($options.tickValues, (val, key) => {
            return (openBlock(), createBlock(_component_b_slider_tick, {
              key: key,
              value: val
            }, null, 8 /* PROPS */, ["value"]))
          }), 128 /* KEYED_FRAGMENT */))
        : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_b_slider_thumb, {
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
        ? (openBlock(), createBlock(_component_b_slider_thumb, {
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
        : createCommentVNode("v-if", true)
    ], 512 /* NEED_PATCH */)
  ], 2 /* CLASS */))
}

script$f.render = render$c;
script$f.__file = "src/components/slider/Slider.vue";

var Plugin$m = {
  install: function install(Vue) {
    registerComponent(Vue, script$f);
    registerComponent(Vue, script$g);
  }
};
use(Plugin$m);
var Plugin$n = Plugin$m;

var script$e = {
    name: 'BSnackbar',
    mixins: [NoticeMixin],
    props: {
        actionText: {
            type: String,
            default: 'OK'
        },
        onAction: {
            type: Function,
            default: () => {}
        },
        cancelText: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            newDuration: this.duration || config.defaultSnackbarDuration
        }
    },
    methods: {
        /**
        * Click listener.
        * Call action prop before closing (from Mixin).
        */
        action() {
            this.onAction();
            this.close();
        }
    }
};

const _hoisted_1$7 = { class: "button" };
const _hoisted_2$4 = { class: "button" };

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave
  }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        class: ["snackbar", [_ctx.type,_ctx.position]],
        role: $props.actionText ? 'alertdialog' : 'alert'
      }, [
        (_ctx.$slots.default)
          ? renderSlot(_ctx.$slots, "default", { key: 0 })
          : (openBlock(), createBlock("div", {
              key: 1,
              class: "text",
              innerHTML: _ctx.message
            }, null, 8 /* PROPS */, ["innerHTML"])),
        ($props.cancelText)
          ? (openBlock(), createBlock("div", {
              key: 2,
              class: "action is-light is-cancel",
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args)))
            }, [
              createVNode("button", _hoisted_1$7, toDisplayString($props.cancelText), 1 /* TEXT */)
            ]))
          : createCommentVNode("v-if", true),
        ($props.actionText)
          ? (openBlock(), createBlock("div", {
              key: 3,
              class: ["action", _ctx.type],
              onClick: _cache[2] || (_cache[2] = (...args) => ($options.action && $options.action(...args)))
            }, [
              createVNode("button", _hoisted_2$4, toDisplayString($props.actionText), 1 /* TEXT */)
            ], 2 /* CLASS */))
          : createCommentVNode("v-if", true)
      ], 10 /* CLASS, PROPS */, ["role"]), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["enter-active-class", "leave-active-class"]))
}

script$e.render = render$b;
script$e.__file = "src/components/snackbar/Snackbar.vue";

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SnackbarProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      type: 'is-success',
      position: config.defaultSnackbarPosition || 'is-bottom-right'
    };

    if (params.parent) {
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    }

    var propsData = merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          snackbarVNode: null
        };
      },
      methods: {
        close: function close() {
          var snackbar = getComponentFromVNode(this.snackbarVNode);

          if (snackbar) {
            snackbar.close();
          }
        }
      },
      render: function render() {
        this.snackbarVNode = h(script$e, _objectSpread$2(_objectSpread$2({}, propsData), {}, {
          onClose: function onClose() {
            if (typeof propsData.onClose === 'function') {
              propsData.onClose();
            } // timeout for the animation complete
            // before unmounting


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }), slot != null ? {
          default: function _default() {
            return slot;
          }
        } : undefined);
        return this.snackbarVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin$k = {
  install: function install(Vue) {
    registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
  }
};
use(Plugin$k);
var Plugin$l = Plugin$k;

var SlotComponent = {
  name: 'BSlotComponent',
  props: {
    component: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: 'default'
    },
    scoped: {
      type: Boolean
    },
    props: {
      type: Object
    },
    tag: {
      type: String,
      default: 'div'
    },
    event: {
      type: String,
      default: 'hook:updated'
    }
  },
  methods: {
    refresh: function refresh() {
      this.$forceUpdate();
    }
  },
  created: function created() {
    if (isVueComponent(this.component)) {
      this.component.$on(this.event, this.refresh);
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (isVueComponent(this.component)) {
      this.component.$off(this.event, this.refresh);
    }
  },
  render: function render() {
    return h(this.tag, {}, this.scoped ? this.component.$slots[this.name](this.props) : this.component.$slots[this.name]());
  }
};

var TabbedMixin = (function (cmp) {
  var _components;

  return {
    mixins: [ProviderParentMixin(cmp, Sorted$1)],
    components: (_components = {}, _defineProperty(_components, script$11.name, script$11), _defineProperty(_components, SlotComponent.name, SlotComponent), _components),
    props: {
      modelValue: {
        type: [String, Number],
        default: undefined
      },
      size: String,
      animated: {
        type: Boolean,
        default: true
      },
      animation: String,
      animateInitially: Boolean,
      vertical: {
        type: Boolean,
        default: false
      },
      position: String,
      destroyOnHide: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],
    data: function data() {
      return {
        activeId: this.modelValue,
        // Internal state
        defaultSlots: [],
        contentHeight: 0,
        isTransitioning: false
      };
    },
    mounted: function mounted() {
      if (typeof this.modelValue === 'number') {
        // Backward compatibility: converts the index value to an id
        var value = bound(this.modelValue, 0, this.items.length - 1);
        this.activeId = this.items[value].value;
      } else {
        this.activeId = this.modelValue;
      }
    },
    computed: {
      activeItem: function activeItem() {
        var _this = this;

        return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
          return i.value === _this.activeId;
        });
      },
      items: function items() {
        return this.sortedItems;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active tab.
       */
      modelValue: function modelValue(value) {
        if (typeof value === 'number') {
          // Backward compatibility: converts the index value to an id
          value = bound(value, 0, this.items.length - 1);
          this.activeId = this.items[value].value;
        } else {
          this.activeId = value;
        }
      },

      /**
       * Sync internal state with external state
       */
      activeId: function activeId(val, oldValue) {
        var oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.find(function (i) {
          return i.value === oldValue;
        }) : null;

        if (oldTab && this.activeItem) {
          oldTab.deactivate(this.activeItem.index);
          this.activeItem.activate(oldTab.index);
        }

        val = this.activeItem ? typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

        if (val !== this.modelValue) {
          this.$emit('update:modelValue', val);
        }
      }
    },
    methods: {
      /**
      * Child click listener, emit input event and change active child.
      */
      childClick: function childClick(child) {
        this.activeId = child.value;
      },
      getNextItemIdx: function getNextItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var nextItemIdx = null;

        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];

          if (fromIdx < item.index && item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            nextItemIdx = item.index;
            break;
          }
        }

        return nextItemIdx;
      },
      getPrevItemIdx: function getPrevItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var prevItemIdx = null;

        for (var i = this.items.length - 1; i >= 0; i--) {
          var item = this.items[i];

          if (item.index < fromIdx && item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            prevItemIdx = item.index;
            break;
          }
        }

        return prevItemIdx;
      }
    }
  };
});

var script$d = {
    name: 'BSteps',
    components: {
        [script$11.name]: script$11
    },
    mixins: [TabbedMixin('step')],
    props: {
        type: [String, Object],
        iconPack: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
            }
        },
        hasNavigation: {
            type: Boolean,
            default: true
        },
        labelPosition: {
            type: String,
            validator(value) {
                return [
                    'bottom',
                    'right',
                    'left'
                ].indexOf(value) > -1
            },
            default: 'bottom'
        },
        rounded: {
            type: Boolean,
            default: true
        },
        mobileMode: {
            type: String,
            validator(value) {
                return [
                    'minimalist',
                    'compact'
                ].indexOf(value) > -1
            },
            default: 'minimalist'
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    computed: {
        // Override mixin implementation to always have a value
        activeItem() {
            return this.childItems.filter((i) => i.value === this.activeId)[0] || this.items[0]
        },
        wrapperClasses() {
            return [
                this.size,
                {
                    'is-vertical': this.vertical,
                    [this.position]: this.position && this.vertical
                }
            ]
        },
        mainClasses() {
            return [
                this.type,
                {
                    'has-label-right': this.labelPosition === 'right',
                    'has-label-left': this.labelPosition === 'left',
                    'is-animated': this.animated,
                    'is-rounded': this.rounded,
                    [`mobile-${this.mobileMode}`]: this.mobileMode !== null
                }
            ]
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
            return this.prevItemIdx !== null
        },

        /**
         * Retrieves the next visible item index
         */
        nextItemIdx() {
            const idx = this.activeItem ? this.activeItem.index : 0;
            return this.getNextItemIdx(idx)
        },

        /**
         * Retrieves the next visible item
         */
        nextItem() {
            let nextItem = null;
            if (this.nextItemIdx !== null) {
                nextItem = this.items.find((i) => i.index === this.nextItemIdx);
            }
            return nextItem
        },

        /**
        * Retrieves the next visible item index
        */
        prevItemIdx() {
            if (!this.activeItem) { return null }
            const idx = this.activeItem.index;
            return this.getPrevItemIdx(idx)
        },

        /**
         * Retrieves the previous visible item
         */
        prevItem() {
            if (!this.activeItem) { return null }

            let prevItem = null;
            if (this.prevItemIdx !== null) {
                prevItem = this.items.find((i) => i.index === this.prevItemIdx);
            }
            return prevItem
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
            return this.nextItemIdx !== null
        },

        navigationProps() {
            return {
                previous: {
                    disabled: !this.hasPrev,
                    action: this.prev
                },
                next: {
                    disabled: !this.hasNext,
                    action: this.next
                }
            }
        }
    },
    methods: {
        /**
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem) {
            if (stepItem.clickable === undefined) {
                return stepItem.index < this.activeItem.index
            }
            return stepItem.clickable
        },

        /**
         * Previous button click listener.
         */
        prev() {
            if (this.hasPrev) {
                this.activeId = this.prevItem.value;
            }
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (this.hasNext) {
                this.activeId = this.nextItem.value;
            }
        }
    }
};

const _hoisted_1$6 = { class: "step-items" };
const _hoisted_2$3 = { class: "step-marker" };
const _hoisted_3$3 = { key: 1 };
const _hoisted_4$3 = { class: "step-details" };
const _hoisted_5$2 = { class: "step-title" };
const _hoisted_6$1 = {
  key: 0,
  class: "step-navigation"
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["b-steps", $options.wrapperClasses]
  }, [
    createVNode("nav", {
      class: ["steps", $options.mainClasses]
    }, [
      createVNode("ul", _hoisted_1$6, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (childItem) => {
          return withDirectives((openBlock(), createBlock("li", {
            key: childItem.value,
            class: ["step-item", [childItem.type || $props.type, childItem.headerClass, {
                        'is-active': childItem.isActive,
                        'is-previous': $options.activeItem.index > childItem.index
                    }]]
          }, [
            createVNode("a", {
              class: ["step-link", {'is-clickable': $options.isItemClickable(childItem)}],
              onClick: $event => ($options.isItemClickable(childItem) && _ctx.childClick(childItem))
            }, [
              createVNode("div", _hoisted_2$3, [
                (childItem.icon)
                  ? (openBlock(), createBlock(_component_b_icon, {
                      key: 0,
                      icon: childItem.icon,
                      pack: childItem.iconPack,
                      size: _ctx.size
                    }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
                  : (childItem.step)
                    ? (openBlock(), createBlock("span", _hoisted_3$3, toDisplayString(childItem.step), 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
              ]),
              createVNode("div", _hoisted_4$3, [
                createVNode("span", _hoisted_5$2, toDisplayString(childItem.label), 1 /* TEXT */)
              ])
            ], 10 /* CLASS, PROPS */, ["onClick"])
          ], 2 /* CLASS */)), [
            [vShow, childItem.visible]
          ])
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 2 /* CLASS */),
    createVNode("section", {
      class: ["step-content", {'is-transitioning': _ctx.isTransitioning}]
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */),
    renderSlot(_ctx.$slots, "navigation", {
      previous: $options.navigationProps.previous,
      next: $options.navigationProps.next
    }, () => [
      ($props.hasNavigation)
        ? (openBlock(), createBlock("nav", _hoisted_6$1, [
            createVNode("a", {
              role: "button",
              class: "pagination-previous",
              disabled: $options.navigationProps.previous.disabled || undefined,
              onClick: _cache[1] || (_cache[1] = withModifiers((...args) => ($options.navigationProps.previous.action && $options.navigationProps.previous.action(...args)), ["prevent"])),
              "aria-label": $props.ariaPreviousLabel
            }, [
              createVNode(_component_b_icon, {
                icon: $props.iconPrev,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ], 8 /* PROPS */, ["disabled", "aria-label"]),
            createVNode("a", {
              role: "button",
              class: "pagination-next",
              disabled: $options.navigationProps.next.disabled || undefined,
              onClick: _cache[2] || (_cache[2] = withModifiers((...args) => ($options.navigationProps.next.action && $options.navigationProps.next.action(...args)), ["prevent"])),
              "aria-label": $props.ariaNextLabel
            }, [
              createVNode(_component_b_icon, {
                icon: $props.iconNext,
                pack: $props.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8 /* PROPS */, ["icon", "pack"])
            ], 8 /* PROPS */, ["disabled", "aria-label"])
          ]))
        : createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}

script$d.render = render$a;
script$d.__file = "src/components/steps/Steps.vue";

function makeUniqueId() {
  var values = new Uint8Array(12);
  window.crypto.getRandomValues(values);
  return Array.prototype.map.call(values, function (v) {
    return v.toString(16);
  }).join('');
}

var TabbedChildMixin = (function (parentCmp) {
  return {
    mixins: [InjectedChildMixin(parentCmp, Sorted)],
    props: {
      label: String,
      icon: String,
      iconPack: String,
      visible: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: function _default() {
          return makeUniqueId();
        }
      },
      headerClass: {
        type: [String, Array, Object],
        default: null
      }
    },
    data: function data() {
      return {
        transitionName: null,
        elementClass: 'item',
        elementRole: null
      };
    },
    computed: {
      isActive: function isActive() {
        return this.parent.activeItem === this;
      }
    },
    methods: {
      /**
       * Activate element, alter animation name based on the index.
       */
      activate: function activate(oldIndex) {
        this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
      },

      /**
       * Deactivate element, alter animation name based on the index.
       */
      deactivate: function deactivate(newIndex) {
        this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
      }
    },
    render: function render() {
      var _this = this;

      // if destroy apply v-if
      if (this.parent.destroyOnHide) {
        if (!this.isActive || !this.visible) {
          return;
        }
      }

      var vnode = withDirectives(h('div', {
        class: this.elementClass,
        role: this.elementRole,
        id: "".concat(this.value, "-content"),
        'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
        tabindex: this.isActive ? 0 : -1
      }, this.$slots), [[vShow, this.isActive && this.visible]]); // check animated prop

      if (this.parent.animated) {
        return h(Transition, {
          name: this.parent.animation || this.transitionName,
          appear: this.parent.animateInitially === true || undefined,
          onBeforeEnter: function onBeforeEnter() {
            _this.parent.isTransitioning = true;
          },
          onAfterEnter: function onAfterEnter() {
            _this.parent.isTransitioning = false;
          }
        }, {
          default: function _default() {
            return vnode;
          }
        });
      }

      return vnode;
    }
  };
});

var script$c = {
    name: 'BStepItem',
    mixins: [TabbedChildMixin('step')],
    props: {
        step: [String, Number],
        type: [String, Object],
        clickable: {
            type: Boolean,
            default: undefined
        }
    },
    data() {
        return {
            elementClass: 'step-item'
        }
    }
};

script$c.__file = "src/components/steps/StepItem.vue";

var Plugin$i = {
  install: function install(Vue) {
    registerComponent(Vue, script$d);
    registerComponent(Vue, script$c);
  }
};
use(Plugin$i);
var Plugin$j = Plugin$i;

var script$b = {
    name: 'BSwitch',
    props: {
        modelValue: [String, Number, Boolean, Function, Object, Array, Date],
        nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
        disabled: Boolean,
        type: String,
        passiveType: String,
        name: String,
        required: Boolean,
        size: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: false
        },
        rounded: {
            type: Boolean,
            default: () => {
                return config.defaultSwitchRounded
            }
        },
        outlined: {
            type: Boolean,
            default: false
        },
        leftLabel: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            isMouseDown: false
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value;
                this.$emit('update:modelValue', value);
            }
        },
        newClass() {
            return [
                this.size,
                {
                    'is-disabled': this.disabled,
                    'is-rounded': this.rounded,
                    'is-outlined': this.outlined,
                    'has-left-label': this.leftLabel
                }
            ]
        },
        checkClasses() {
            return [
                { 'is-elastic': this.isMouseDown && !this.disabled },
                (this.passiveType && `${this.passiveType}-passive`),
                this.type
            ]
        },
        disabledOrUndefined() {
            // On Vue 3, setting boolean attribute `false` does not remove it.
            // To do so, `null` or `undefined` has to be specified instead.
            // Setting `disabled="false"` ends up with a grayed out switch.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        modelValue(value) {
            this.newValue = value;
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus();
        }
    }
};

const _hoisted_1$5 = { class: "control-label" };

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: ["switch", $options.newClass],
    ref: "label",
    disabled: $options.disabledOrUndefined,
    onClick: _cache[3] || (_cache[3] = (...args) => ($options.focus && $options.focus(...args))),
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers($event => (_ctx.$refs.label.click()), ["prevent"]), ["enter"])),
    onMousedown: _cache[5] || (_cache[5] = $event => ($data.isMouseDown = true)),
    onMouseup: _cache[6] || (_cache[6] = $event => ($data.isMouseDown = false)),
    onMouseout: _cache[7] || (_cache[7] = $event => ($data.isMouseDown = false)),
    onBlur: _cache[8] || (_cache[8] = $event => ($data.isMouseDown = false))
  }, [
    withDirectives(createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
      type: "checkbox",
      ref: "input",
      onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      disabled: $options.disabledOrUndefined,
      name: $props.name,
      required: $props.required,
      value: $props.nativeValue,
      "true-value": $props.trueValue,
      "false-value": $props.falseValue
    }, null, 8 /* PROPS */, ["disabled", "name", "required", "value", "true-value", "false-value"]), [
      [vModelCheckbox, $options.computedValue]
    ]),
    createVNode("span", {
      class: ["check", $options.checkClasses]
    }, null, 2 /* CLASS */),
    createVNode("span", _hoisted_1$5, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled"]))
}

script$b.render = render$9;
script$b.__file = "src/components/switch/Switch.vue";

var Plugin$g = {
  install: function install(Vue) {
    registerComponent(Vue, script$b);
  }
};
use(Plugin$g);
var Plugin$h = Plugin$g;

function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var script$a = {
    name: 'BTableMobileSort',
    components: {
        [script$N.name]: script$N,
        [script$11.name]: script$11
    },
    props: {
        currentSortColumn: Object,
        sortMultipleData: Array,
        isAsc: Boolean,
        columns: Array,
        placeholder: String,
        iconPack: String,
        sortIcon: {
            type: String,
            default: 'arrow-up'
        },
        sortIconSize: {
            type: String,
            default: 'is-small'
        },
        sortMultiple: {
            type: Boolean,
            default: false
        }
    },
    emits: ['removePriority', 'sort'],
    data() {
        return {
            sortMultipleSelect: '',
            sortMultipleSelectIndex: -1,
            mobileSort: this.currentSortColumn,
            mobileSortIndex: this.columns.indexOf(this.currentSortColumn),
            defaultEvent: {
                shiftKey: true,
                altKey: true,
                ctrlKey: true
            },
            ignoreSort: false
        }
    },
    computed: {
        showPlaceholder() {
            return !this.columns || !this.columns.some((column) => column === this.mobileSort)
        }
    },
    watch: {
        sortMultipleSelect(column) {
            if (this.ignoreSort) {
                this.ignoreSort = false;
            } else {
                this.$emit('sort', column, this.defaultEvent);
            }
        },
        sortMultipleSelectIndex(index) {
            if (index !== -1) {
                this.sortMultipleSelect = this.columns[index];
            } else {
                this.sortMultipleSelect = null;
            }
        },
        mobileSort(column) {
            if (this.currentSortColumn === column) return

            this.$emit('sort', column, this.defaultEvent);
        },
        mobileSortIndex(index) {
            if (index !== -1) {
                this.mobileSort = this.columns[index];
            } else {
                this.mobileSort = null;
            }
        },
        currentSortColumn(column) {
            this.mobileSortIndex = this.columns.indexOf(column);
        },
        columns(newColumns) {
            if (this.sortMultiple) {
                this.sortMultipleSelectIndex = newColumns.indexOf(
                    this.sortMultipleSelect
                );
            } else {
                this.mobileSortIndex = newColumns.indexOf(this.mobileSort);
            }
        }
    },
    methods: {
        removePriority() {
            this.$emit('removePriority', this.sortMultipleSelect);
            // ignore the watcher to sort when we just change whats displayed in the select
            // otherwise the direction will be flipped
            // The sort event is already triggered by the emit
            this.ignoreSort = true;
            // Select one of the other options when we reset one
            const remainingFields = this.sortMultipleData.filter((data) =>
                data.field !== this.sortMultipleSelect.field)
                .map((data) => data.field);
            this.sortMultipleSelectIndex = this.columns.findIndex((column) =>
                remainingFields.includes(column.field));
        },
        getSortingObjectOfColumn(column) {
            return this.sortMultipleData.filter((i) =>
                i.field === column.field)[0]
        },
        columnIsDesc(column) {
            const sortingObject = this.getSortingObjectOfColumn(column);
            if (sortingObject) {
                return !!(sortingObject.order && sortingObject.order === 'desc')
            }
            return true
        },
        getLabel(column) {
            const sortingObject = this.getSortingObjectOfColumn(column);
            if (sortingObject) {
                return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')'
            }
            return column.label
        },
        sort() {
            this.$emit('sort', (this.sortMultiple ? this.sortMultipleSelect : this.mobileSort), this.defaultEvent);
        }
    }
};

const _hoisted_1$4 = { class: "field table-mobile-sort" };
const _hoisted_2$2 = { class: "field has-addons" };
const _hoisted_3$2 = /*#__PURE__*/createTextVNode(" ↓ ");
const _hoisted_4$2 = /*#__PURE__*/createTextVNode(" ↑ ");
const _hoisted_5$1 = { class: "control" };

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_select = resolveComponent("b-select");
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", _hoisted_1$4, [
    createVNode("div", _hoisted_2$2, [
      ($props.sortMultiple)
        ? (openBlock(), createBlock(_component_b_select, {
            key: 0,
            modelValue: $data.sortMultipleSelectIndex,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.sortMultipleSelectIndex = $event)),
            expanded: ""
          }, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList($props.columns, (column, index) => {
                return (openBlock(), createBlock(Fragment, { key: index }, [
                  (column.sortable)
                    ? (openBlock(), createBlock("option", {
                        key: 0,
                        value: index
                      }, [
                        createTextVNode(toDisplayString($options.getLabel(column)) + " ", 1 /* TEXT */),
                        ($options.getSortingObjectOfColumn(column))
                          ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              ($options.columnIsDesc(column))
                                ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    _hoisted_3$2
                                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                                : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    _hoisted_4$2
                                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                            ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                          : createCommentVNode("v-if", true)
                      ], 8 /* PROPS */, ["value"]))
                    : createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue"]))
        : (openBlock(), createBlock(_component_b_select, {
            key: 1,
            modelValue: $data.mobileSortIndex,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ($data.mobileSortIndex = $event)),
            expanded: ""
          }, {
            default: withCtx(() => [
              ($props.placeholder)
                ? withDirectives((openBlock(), createBlock("option", {
                    key: 0,
                    value: {},
                    selected: "",
                    disabled: "",
                    hidden: ""
                  }, toDisplayString($props.placeholder), 513 /* TEXT, NEED_PATCH */)), [
                    [vShow, $options.showPlaceholder]
                  ])
                : createCommentVNode("v-if", true),
              (openBlock(true), createBlock(Fragment, null, renderList($props.columns, (column, index) => {
                return (openBlock(), createBlock(Fragment, { key: index }, [
                  (column.sortable)
                    ? (openBlock(), createBlock("option", {
                        key: 0,
                        value: index
                      }, toDisplayString(column.label), 9 /* TEXT, PROPS */, ["value"]))
                    : createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue"])),
      createVNode("div", _hoisted_5$1, [
        ($props.sortMultiple && $props.sortMultipleData.length > 0)
          ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              createVNode("button", {
                class: "button is-primary",
                onClick: _cache[3] || (_cache[3] = (...args) => ($options.sort && $options.sort(...args)))
              }, [
                createVNode(_component_b_icon, {
                  class: { 'is-desc': $options.columnIsDesc($data.sortMultipleSelect) },
                  icon: $props.sortIcon,
                  pack: $props.iconPack,
                  size: $props.sortIconSize,
                  both: ""
                }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"])
              ]),
              createVNode("button", {
                class: "button is-primary",
                onClick: _cache[4] || (_cache[4] = (...args) => ($options.removePriority && $options.removePriority(...args)))
              }, [
                createVNode(_component_b_icon, {
                  icon: "delete",
                  size: $props.sortIconSize,
                  both: ""
                }, null, 8 /* PROPS */, ["size"])
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (!$props.sortMultiple)
            ? (openBlock(), createBlock("button", {
                key: 1,
                class: "button is-primary",
                onClick: _cache[5] || (_cache[5] = (...args) => ($options.sort && $options.sort(...args)))
              }, [
                withDirectives(createVNode(_component_b_icon, {
                  class: { 'is-desc': !$props.isAsc },
                  icon: $props.sortIcon,
                  pack: $props.iconPack,
                  size: $props.sortIconSize,
                  both: ""
                }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"]), [
                  [vShow, $props.currentSortColumn === $data.mobileSort]
                ])
              ]))
            : createCommentVNode("v-if", true)
      ])
    ])
  ]))
}

script$a.render = render$8;
script$a.__file = "src/components/table/TableMobileSort.vue";

var script$9 = {
    name: 'BTableColumn',
    inject: {
        $table: { name: '$table', default: false }
    },
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        searchable: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        subheading: [String, Number],
        customSort: Function,
        customSearch: Function,
        sticky: Boolean,
        headerSelectable: Boolean,
        headerClass: String,
        cellClass: String,
        thAttrs: {
            type: Function,
            default: () => ({})
        },
        tdAttrs: {
            type: Function,
            default: () => ({})
        }
    },
    data() {
        return {
            newKey: this.customKey || this.label,
            _isTableColumn: true
        }
    },
    computed: {
        thClasses() {
            const attrs = this.thAttrs(this);
            const classes = [this.headerClass, {
                'is-sortable': this.sortable,
                'is-sticky': this.sticky,
                'is-unselectable': this.isHeaderUnSelectable
            }];
            if (attrs && attrs.class) {
                classes.push(attrs.class);
            }
            return classes
        },
        thStyle() {
            const attrs = this.thAttrs(this);
            const style = [this.style];
            if (attrs && attrs.style) {
                style.push(attrs.style);
            }
            return style
        },
        rootClasses() {
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        },
        style() {
            return {
                width: toCssWidth(this.width)
            }
        },
        hasDefaultSlot() {
            return !!this.$slots.default
        },
        /**
         * Return if column header is un-selectable
         */
        isHeaderUnSelectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    methods: {
        getRootClasses(row) {
            const attrs = this.tdAttrs(row, this);
            const classes = [this.rootClasses];
            if (attrs && attrs.class) {
                classes.push(attrs.class);
            }
            return classes
        },
        getRootStyle(row) {
            const attrs = this.tdAttrs(row, this);
            const style = [];
            if (attrs && attrs.style) {
                style.push(attrs.style);
            }
            return style
        }
    },
    created() {
        if (!this.$table) {
            throw new Error('You should wrap bTableColumn on a bTable')
        }
        this.$table._registerTableColumn(this);
    },
    beforeUnmount() {
        this.$table._unregisterTableColumn(this);
    },
    render(createElement) {
        // renderless
        return null
    }
};

script$9.__file = "src/components/table/TableColumn.vue";

var script$8 = {
    name: 'BTablePagination',
    components: {
        [script$q.name]: script$q
    },
    props: {
        paginated: Boolean,
        total: [Number, String],
        perPage: [Number, String],
        currentPage: [Number, String],
        paginationSimple: Boolean,
        paginationSize: String,
        rounded: Boolean,
        iconPack: String,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    emits: ['page-change', 'update:currentPage'],
    data() {
        return {
            newCurrentPage: this.currentPage
        }
    },
    watch: {
        currentPage(newVal) {
            this.newCurrentPage = newVal;
        }
    },
    methods: {
        /**
        * Paginator change listener.
        */
        pageChanged(page) {
            this.newCurrentPage = page > 0 ? page : 1;
            this.$emit('update:currentPage', this.newCurrentPage);
            this.$emit('page-change', this.newCurrentPage);
        }
    }
};

const _hoisted_1$3 = { class: "top level" };
const _hoisted_2$1 = { class: "level-left" };
const _hoisted_3$1 = { class: "level-right" };
const _hoisted_4$1 = {
  key: 0,
  class: "level-item"
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_pagination = resolveComponent("b-pagination");

  return (openBlock(), createBlock("div", _hoisted_1$3, [
    createVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode("div", _hoisted_3$1, [
      ($props.paginated)
        ? (openBlock(), createBlock("div", _hoisted_4$1, [
            createVNode(_component_b_pagination, {
              "icon-pack": $props.iconPack,
              total: $props.total,
              "per-page": $props.perPage,
              simple: $props.paginationSimple,
              size: $props.paginationSize,
              "model-value": $data.newCurrentPage,
              rounded: $props.rounded,
              onChange: $options.pageChanged,
              "aria-next-label": $props.ariaNextLabel,
              "aria-previous-label": $props.ariaPreviousLabel,
              "aria-page-label": $props.ariaPageLabel,
              "aria-current-label": $props.ariaCurrentLabel
            }, null, 8 /* PROPS */, ["icon-pack", "total", "per-page", "simple", "size", "model-value", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
          ]))
        : createCommentVNode("v-if", true)
    ])
  ]))
}

script$8.render = render$7;
script$8.__file = "src/components/table/TablePagination.vue";

var tinyEmitter = {exports: {}};

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

tinyEmitter.exports = E;
tinyEmitter.exports.TinyEmitter = E;

var Emitter = tinyEmitter.exports;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function mockTableColumn(table, column) {
  var eventEmitter = new Emitter();
  var defaultProps = {
    label: undefined,
    customKey: undefined,
    field: undefined,
    meta: undefined,
    width: undefined,
    numeric: undefined,
    centered: undefined,
    searchable: undefined,
    sortable: undefined,
    visible: true,
    subheading: undefined,
    customSort: undefined,
    customSearch: undefined,
    sticky: undefined,
    headerSelectable: undefined,
    headerClass: undefined,
    thAttrs: function thAttrs() {
      return {};
    },
    tdAttrs: function tdAttrs() {
      return {};
    }
  };
  return _objectSpread$1(_objectSpread$1(_objectSpread$1({}, defaultProps), column), {}, {
    // data
    parent: table,
    newKey: column.customKey || column.label,
    _isTableColumn: true,
    // inject
    $table: table,

    // computed
    get thClasses() {
      var attrs = this.thAttrs(this);
      var classes = [this.headerClass, {
        'is-sortable': this.sortable,
        'is-sticky': this.sticky,
        'is-unselectable': this.isHeaderUnSelectable
      }];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },

    get thStyle() {
      var attrs = this.thAttrs(this);
      var style = [this.style];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    },

    get rootClasses() {
      return [this.cellClass, {
        'has-text-right': this.numeric && !this.centered,
        'has-text-centered': this.centered,
        'is-sticky': this.sticky
      }];
    },

    get style() {
      return {
        width: toCssWidth(this.width)
      };
    },

    get hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },

    get isHeaderUnSelectable() {
      return !this.headerSelectable && this.sortable;
    },

    // methods
    getRootClasses: function getRootClasses(row) {
      var attrs = this.tdAttrs(row, this);
      var classes = [this.rootClasses];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },
    getRootStyle: function getRootStyle(row) {
      var attrs = this.tdAttrs(row, this);
      var style = [];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    },
    $on: function $on() {
      return eventEmitter.on.apply(eventEmitter, arguments);
    },
    $once: function $once() {
      return eventEmitter.once.apply(eventEmitter, arguments);
    },
    $off: function $off() {
      return eventEmitter.off.apply(eventEmitter, arguments);
    },
    $emit: function $emit() {
      return eventEmitter.emit.apply(eventEmitter, arguments);
    },
    // special fields
    _isVue: true,
    $slots: {
      default: function _default(props) {
        var vnode = h('span', {
          innerHTML: getValueByPath(props.row, column.field)
        });
        return [vnode];
      }
    }
  });
}

var script$7 = {
    name: 'BTable',
    components: {
        [script$W.name]: script$W,
        [script$11.name]: script$11,
        [script$10.name]: script$10,
        [script$D.name]: script$D,
        [SlotComponent.name]: SlotComponent,
        [script$a.name]: script$a,
        [script$9.name]: script$9,
        [script$8.name]: script$8
    },
    inheritAttrs: false,
    provide() {
        return {
            $table: this
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        bordered: Boolean,
        striped: Boolean,
        narrowed: Boolean,
        hoverable: Boolean,
        loading: Boolean,
        detailed: Boolean,
        checkable: Boolean,
        headerCheckable: {
            type: Boolean,
            default: true
        },
        checkboxPosition: {
            type: String,
            default: 'left',
            validator: (value) => {
                return [
                    'left',
                    'right'
                ].indexOf(value) >= 0
            }
        },
        stickyCheckbox: {
            type: Boolean,
            default: false
        },
        selected: Object,
        isRowSelectable: {
            type: Function,
            default: () => true
        },
        focusable: Boolean,
        customIsChecked: Function,
        isRowCheckable: {
            type: Function,
            default: () => true
        },
        checkedRows: {
            type: Array,
            default: () => []
        },
        mobileCards: {
            type: Boolean,
            default: true
        },
        defaultSort: [String, Array],
        defaultSortDirection: {
            type: String,
            default: 'asc'
        },
        sortIcon: {
            type: String,
            default: 'arrow-up'
        },
        sortIconSize: {
            type: String,
            default: 'is-small'
        },
        sortMultiple: {
            type: Boolean,
            default: false
        },
        sortMultipleData: {
            type: Array,
            default: () => []
        },
        sortMultipleKey: {
            type: String,
            default: null
        },
        paginated: Boolean,
        currentPage: {
            type: Number,
            default: 1
        },
        perPage: {
            type: [Number, String],
            default: 20
        },
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        paginationPosition: {
            type: String,
            default: 'bottom',
            validator: (value) => {
                return [
                    'bottom',
                    'top',
                    'both'
                ].indexOf(value) >= 0
            }
        },
        paginationRounded: Boolean,
        backendSorting: Boolean,
        backendFiltering: Boolean,
        rowClass: {
            type: Function,
            default: () => ''
        },
        openedDetailed: {
            type: Array,
            default: () => []
        },
        hasDetailedVisible: {
            type: Function,
            default: () => true
        },
        detailKey: {
            type: String,
            default: ''
        },
        detailTransition: {
            type: String,
            default: ''
        },
        customDetailRow: {
            type: Boolean,
            default: false
        },
        backendPagination: Boolean,
        total: {
            type: [Number, String],
            default: 0
        },
        iconPack: String,
        mobileSortPlaceholder: String,
        customRowKey: String,
        draggable: {
            type: Boolean,
            default: false
        },
        draggableColumn: {
            type: Boolean,
            default: false
        },
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        stickyHeader: Boolean,
        height: [Number, String],
        filtersEvent: {
            type: String,
            default: ''
        },
        cardLayout: Boolean,
        showHeader: {
            type: Boolean,
            default: true
        },
        debounceSearch: Number
    },
    emits: [
        'cellclick',
        'check',
        'check-all',
        'click',
        'columndragend',
        'columndragleave',
        'columndragover',
        'columndragstart',
        'columndrop',
        'contextmenu',
        'dblclick',
        'details-close',
        'details-open',
        'dragend',
        'dragleave',
        'dragover',
        'dragstart',
        'drop',
        'filters-change',
        'page-change',
        'select',
        'sort',
        'sorting-priority-removed',
        'update:checkedRows',
        'update:currentPage',
        'update:openedDetailed',
        'update:selected'
    ],
    data() {
        return {
            sortMultipleDataLocal: [],
            getValueByPath,
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [...this.checkedRows],
            lastCheckedRowIndex: null,
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            filters: {},
            defaultSlots: [],
            firstTimeSort: true, // Used by first time initSort
            _isTable: true, // Used by TableColumn
            isDraggingRow: false,
            isDraggingColumn: false
        }
    },
    computed: {
        sortMultipleDataComputed() {
            return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
        },
        tableClasses() {
            return {
                'is-bordered': this.bordered,
                'is-striped': this.striped,
                'is-narrow': this.narrowed,
                'is-hoverable': (
                    (this.hoverable || this.focusable) &&
                    this.visibleData.length
                )
            }
        },
        tableWrapperClasses() {
            return {
                'has-mobile-cards': this.mobileCards,
                'has-sticky-header': this.stickyHeader,
                'is-card-list': this.cardLayout,
                'table-container': this.isScrollable
            }
        },
        tableStyle() {
            return {
                height: toCssWidth(this.height)
            }
        },

        /**
        * Splitted data based on the pagination.
        */
        visibleData() {
            if (!this.paginated) return this.newData

            const currentPage = this.newCurrentPage;
            const perPage = this.perPage;

            if (this.newData.length <= perPage) {
                return this.newData
            } else {
                const start = (currentPage - 1) * perPage;
                const end = parseInt(start, 10) + parseInt(perPage, 10);
                return this.newData.slice(start, end)
            }
        },

        visibleColumns() {
            if (!this.newColumns) return this.newColumns
            return this.newColumns.filter((column) => {
                return column.visible || column.visible === undefined
            })
        },

        /**
        * Check if all rows in the page are checked.
        */
        isAllChecked() {
            const validVisibleData = this.visibleData.filter(
                (row) => this.isRowCheckable(row));
            if (validVisibleData.length === 0) return false
            const isAllChecked = validVisibleData.some((currentVisibleRow) => {
                return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
            });
            return !isAllChecked
        },

        /**
        * Check if all rows in the page are checkable.
        */
        isAllUncheckable() {
            const validVisibleData = this.visibleData.filter(
                (row) => this.isRowCheckable(row));
            return validVisibleData.length === 0
        },

        /**
        * Check if has any sortable column.
        */
        hasSortablenewColumns() {
            return this.newColumns.some((column) => {
                return column.sortable
            })
        },

        /**
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
            return this.newColumns.some((column) => {
                return column.searchable
            })
        },

        /**
        * Check if has any column using subheading.
        */
        hasCustomSubheadings() {
            if (this.$slots && this.$slots.subheading) return true
            return this.newColumns.some((column) => {
                return column.subheading || column.$slots.subheading
            })
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.visibleColumns.length;
            count += this.checkable ? 1 : 0;
            count += (this.detailed && this.showDetailIcon) ? 1 : 0;

            return count
        },

        /**
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
            return this.detailed && this.showDetailIcon
        },

        /**
        * return if scrollable table
        */
        isScrollable() {
            if (this.scrollable) return true
            if (!this.newColumns) return false
            return this.newColumns.some((column) => {
                return column.sticky
            })
        },

        newColumns() {
            if (this.columns && this.columns.length) {
                return this.columns.map((column) => {
                    return mockTableColumn(this, column)
                })
            }
            return this.defaultSlots
        },
        canDragRow() {
            return this.draggable && !this.isDraggingColumn
        },
        canDragColumn() {
            return this.draggableColumn && !this.isDraggingRow
        }
    },
    watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data(value) {
            this.newData = value;
            if (!this.backendFiltering) {
                this.newData = value.filter(
                    (row) => this.isRowFiltered(row));
            }
            if (!this.backendSorting) {
                this.sort(this.currentSortColumn, true);
            }
            if (!this.backendPagination) {
                this.newDataTotal = this.newData.length;
            }
        },

        /**
        * When Pagination total change, update internal total
        * only if it's backend-paginated.
        */
        total(newTotal) {
            if (!this.backendPagination) return

            this.newDataTotal = newTotal;
        },

        currentPage(newVal) {
            this.newCurrentPage = newVal;
        },

        newCurrentPage(newVal) {
            this.$emit('update:currentPage', newVal);
        },

        /**
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        // Using deep watching because in vue3 array mutations doesn't trigger watchers
        checkedRows: {
            handler(rows) {
                this.newCheckedRows = [...rows];
            },
            deep: true
        },

        /*
        newColumns(value) {
            this.checkSort()
        },
        */

        debounceSearch: {
            handler(value) {
                this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
            },
            immediate: true
        },

        filters: {
            handler(value) {
                if (this.debounceSearch) {
                    this.debouncedHandleFiltersChange(value);
                } else {
                    this.handleFiltersChange(value);
                }
            },
            deep: true
        },

        /**
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows) {
            this.visibleDetailRows = expandedRows;
        }
    },
    methods: {
        onFiltersEvent(event) {
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
        },
        handleFiltersChange(value) {
            if (this.backendFiltering) {
                this.$emit('filters-change', value);
            } else {
                this.newData = this.data.filter(
                    (row) => this.isRowFiltered(row));
                if (!this.backendPagination) {
                    this.newDataTotal = this.newData.length;
                }
                if (!this.backendSorting) {
                    if (this.sortMultiple &&
                        this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
                        this.doSortMultiColumn();
                    } else if (Object.keys(this.currentSortColumn).length > 0) {
                        this.doSortSingleColumn(this.currentSortColumn);
                    }
                }
            }
        },
        findIndexOfSortData(column) {
            const sortObj = this.sortMultipleDataComputed.filter((i) =>
                i.field === column.field)[0];
            return this.sortMultipleDataComputed.indexOf(sortObj) + 1
        },
        removeSortingPriority(column) {
            if (this.backendSorting) {
                this.$emit('sorting-priority-removed', column.field);
            } else {
                this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                    (priority) => priority.field !== column.field);

                const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                    return (i.order && i.order === 'desc' ? '-' : '') + i.field
                });
                this.newData = multiColumnSort(this.newData, formattedSortingPriority);
            }
        },
        resetMultiSorting() {
            this.sortMultipleDataLocal = [];
            this.currentSortColumn = {};
            this.newData = this.data;
        },
        /**
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(array, key, fn, isAsc) {
            let sorted = [];
            // Sorting without mutating original data
            if (fn && typeof fn === 'function') {
                sorted = [...array].sort((a, b) => fn(a, b, isAsc));
            } else {
                sorted = [...array].sort((a, b) => {
                    // Get nested values from objects
                    let newA = getValueByPath(a, key);
                    let newB = getValueByPath(b, key);

                    // sort boolean type
                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                        return isAsc ? newA - newB : newB - newA
                    }

                    if (!newA && newA !== 0) return 1
                    if (!newB && newB !== 0) return -1
                    if (newA === newB) return 0

                    newA = (typeof newA === 'string')
                        ? newA.toUpperCase()
                        : newA;
                    newB = (typeof newB === 'string')
                        ? newB.toUpperCase()
                        : newB;

                    return isAsc
                        ? newA > newB ? 1 : -1
                        : newA > newB ? -1 : 1
                });
            }

            return sorted
        },

        sortMultiColumn(column) {
            this.currentSortColumn = {};
            if (!this.backendSorting) {
                const existingPriority = this.sortMultipleDataLocal.filter((i) =>
                    i.field === column.field)[0];
                if (existingPriority) {
                    existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc';
                } else {
                    this.sortMultipleDataLocal.push(
                        { field: column.field, order: column.isAsc }
                    );
                }
                this.doSortMultiColumn();
            }
        },

        doSortMultiColumn() {
            const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                return (i.order && i.order === 'desc' ? '-' : '') + i.field
            });
            this.newData = multiColumnSort(this.newData, formattedSortingPriority);
        },

        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
            if (
                // if backend sorting is enabled, just emit the sort press like usual
                // if the correct key combination isnt pressed, sort like usual
                !this.backendSorting &&
                this.sortMultiple &&
                ((this.sortMultipleKey && event[this.sortMultipleKey]) || !this.sortMultipleKey)
            ) {
                if (updatingData) {
                    this.doSortMultiColumn();
                } else {
                    this.sortMultiColumn(column);
                }
            } else {
                if (!column || !column.sortable) return

                // sort multiple is enabled but the correct key combination isnt pressed so reset
                if (this.sortMultiple) {
                    this.sortMultipleDataLocal = [];
                }

                if (!updatingData) {
                    this.isAsc = column === this.currentSortColumn
                        ? !this.isAsc
                        : (this.defaultSortDirection.toLowerCase() !== 'desc');
                }
                if (!this.firstTimeSort) {
                    this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
                }
                if (!this.backendSorting) {
                    this.doSortSingleColumn(column);
                }
                this.currentSortColumn = column;
            }
        },

        doSortSingleColumn(column) {
            this.newData = this.sortBy(
                this.newData,
                column.field,
                column.customSort,
                this.isAsc
            );
        },

        isRowSelected(row, selected) {
            if (!selected) {
                return false
            }
            if (this.customRowKey) {
                return row[this.customRowKey] === selected[this.customRowKey]
            }
            return row === selected
        },

        /**
        * Check if the row is checked (is added to the array).
        */
        isRowChecked(row) {
            return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
        },

        /**
        * Remove a checked row from the array.
        */
        removeCheckedRow(row) {
            const index = indexOf(this.newCheckedRows, row, this.customIsChecked);
            if (index >= 0) {
                this.newCheckedRows.splice(index, 1);
            }
        },

        /**
        * Header checkbox click listener.
        * Add or remove all rows in current page.
        */
        checkAll() {
            const isAllChecked = this.isAllChecked;
            this.visibleData.forEach((currentRow) => {
                if (this.isRowCheckable(currentRow)) {
                    this.removeCheckedRow(currentRow);
                }
                if (!isAllChecked) {
                    if (this.isRowCheckable(currentRow)) {
                        this.newCheckedRows.push(currentRow);
                    }
                }
            });

            this.$emit('check', this.newCheckedRows);
            this.$emit('check-all', this.newCheckedRows);

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows);
        },

        /**
        * Row checkbox click listener.
        */
        checkRow(row, index, event) {
            if (!this.isRowCheckable(row)) return
            const lastIndex = this.lastCheckedRowIndex;
            this.lastCheckedRowIndex = index;

            if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
                this.shiftCheckRow(row, index, lastIndex);
            } else if (!this.isRowChecked(row)) {
                this.newCheckedRows.push(row);
            } else {
                this.removeCheckedRow(row);
            }

            this.$emit('check', this.newCheckedRows, row);

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows);
        },

        /**
         * Check row when shift is pressed.
         */
        shiftCheckRow(row, index, lastCheckedRowIndex) {
            // Get the subset of the list between the two indicies
            const subset = this.visibleData.slice(
                Math.min(index, lastCheckedRowIndex),
                Math.max(index, lastCheckedRowIndex) + 1
            );

            // Determine the operation based on the state of the clicked checkbox
            const shouldCheck = !this.isRowChecked(row);

            subset.forEach((item) => {
                this.removeCheckedRow(item);
                if (shouldCheck && this.isRowCheckable(item)) {
                    this.newCheckedRows.push(item);
                }
            });
        },

        /**
        * Row click listener.
        * Emit all necessary events.
        */
        selectRow(row, index) {
            this.$emit('click', row);

            if (this.selected === row) return
            if (!this.isRowSelectable(row)) return

            // Emit new and old row
            this.$emit('select', row, this.selected);

            // Emit new row to update user variable
            this.$emit('update:selected', row);
        },

        /**
        * Toggle to show/hide details slot
        */
        toggleDetails(obj) {
            const found = this.isVisibleDetailRow(obj);

            if (found) {
                this.closeDetailRow(obj);
                this.$emit('details-close', obj);
            } else {
                this.openDetailRow(obj);
                this.$emit('details-open', obj);
            }

            // Syncs the detailed rows with the parent component
            this.$emit('update:openedDetailed', this.visibleDetailRows);
        },

        openDetailRow(obj) {
            const index = this.handleDetailKey(obj);
            this.visibleDetailRows.push(index);
        },

        closeDetailRow(obj) {
            const index = this.handleDetailKey(obj);
            const i = this.visibleDetailRows.indexOf(index);
            this.visibleDetailRows.splice(i, 1);
        },

        isVisibleDetailRow(obj) {
            const index = this.handleDetailKey(obj);
            const result = this.visibleDetailRows.indexOf(index) >= 0;
            return result
        },

        isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isRowFiltered(row) {
            for (const key in this.filters) {
                // remove key if empty
                if (!this.filters[key]) {
                    delete this.filters[key];
                    return true
                }
                const input = this.filters[key];
                const column = this.newColumns.filter((c) => c.field === key)[0];
                if (column && column.customSearch && typeof column.customSearch === 'function') {
                    return column.customSearch(row, input)
                } else {
                    const value = this.getValueByPath(row, key);
                    if (value == null) return false
                    if (Number.isInteger(value)) {
                        if (value !== Number(input)) return false
                    } else {
                        const re = new RegExp(escapeRegExpChars(input), 'i');
                        if (!re.test(value)) return false
                    }
                }
            }
            return true
        },

        /**
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey(index) {
            const key = this.detailKey;
            return !key.length || !index
                ? index
                : index[key]
        },

        checkPredefinedDetailedRows() {
            const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
            if (defaultExpandedRowsDefined && !this.detailKey.length) {
                throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"')
            }
        },

        /**
        * Call initSort only first time (For example async data).
        */
        checkSort() {
            if (this.newColumns.length && this.firstTimeSort) {
                this.initSort();
                this.firstTimeSort = false;
            } else if (this.newColumns.length) {
                if (Object.keys(this.currentSortColumn).length > 0) {
                    for (let i = 0; i < this.newColumns.length; i++) {
                        if (this.newColumns[i].field === this.currentSortColumn.field) {
                            this.currentSortColumn = this.newColumns[i];
                            break
                        }
                    }
                }
            }
        },

        /**
        * Check if footer slot has custom content.
        *
        * Assumes that `$slots.footer` is specified.
        */
        hasCustomFooterSlot() {
            const footer = this.$slots.footer();
            if (footer.length > 1) return true

            // if a template is specified to `footer`, `footer.length` is 1
            // but should contain multiple elements.
            if (isFragment(footer[0])) return true

            const tag = footer[0].tag;
            if (tag !== 'th' && tag !== 'td') return false

            return true
        },

        /**
        * Check if bottom-left slot exists.
        */
        hasBottomLeftSlot() {
            return typeof this.$slots['bottom-left'] !== 'undefined'
        },

        /**
        * Table arrow keys listener, change selection.
        */
        pressedArrow(pos) {
            if (!this.visibleData.length) return

            let index = this.visibleData.indexOf(this.selected) + pos;

            // Prevent from going up from first and down from last
            index = index < 0
                ? 0
                : index > this.visibleData.length - 1
                    ? this.visibleData.length - 1
                    : index;

            const row = this.visibleData[index];

            if (!this.isRowSelectable(row)) {
                let newIndex = null;
                if (pos > 0) {
                    for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
                    }
                } else {
                    for (let i = index; i >= 0 && newIndex === null; i--) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
                    }
                }
                if (newIndex >= 0) {
                    this.selectRow(this.visibleData[newIndex]);
                }
            } else {
                this.selectRow(row);
            }
        },

        /**
        * Focus table element if has selected prop.
        */
        focus() {
            if (!this.focusable) return

            this.$el.querySelector('table').focus();
        },

        /**
        * Initial sorted column based on the default-sort prop.
        */
        initSort() {
            if (this.sortMultiple && this.sortMultipleData) {
                this.sortMultipleData.forEach((column) => {
                    this.sortMultiColumn(column);
                });
            } else {
                if (!this.defaultSort) return

                let sortField = '';
                let sortDirection = this.defaultSortDirection;

                if (Array.isArray(this.defaultSort)) {
                    sortField = this.defaultSort[0];
                    if (this.defaultSort[1]) {
                        sortDirection = this.defaultSort[1];
                    }
                } else {
                    sortField = this.defaultSort;
                }

                const sortColumn = this.newColumns.filter(
                    (column) => (column.field === sortField))[0];
                if (sortColumn) {
                    this.isAsc = sortDirection.toLowerCase() !== 'desc';
                    this.sort(sortColumn, true);
                }
            }
        },
        /**
        * Emits drag start event (row)
        */
        handleDragStart(event, row, index) {
            if (!this.canDragRow) return
            this.isDraggingRow = true;
            this.$emit('dragstart', { event, row, index });
        },
        /**
        * Emits drag leave event (row)
        */
        handleDragEnd(event, row, index) {
            if (!this.canDragRow) return
            this.isDraggingRow = false;
            this.$emit('dragend', { event, row, index });
        },
        /**
        * Emits drop event (row)
        */
        handleDrop(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('drop', { event, row, index });
        },
        /**
        * Emits drag over event (row)
        */
        handleDragOver(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('dragover', { event, row, index });
        },
        /**
        * Emits drag leave event (row)
        */
        handleDragLeave(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('dragleave', { event, row, index });
        },

        emitEventForRow(eventName, event, row) {
            // eventName should not be in `emits` because it is never included
            // in `$attrs` if it is listed in `emits`.
            return this.$attrs[`on${eventName}`] ? this.$emit(eventName, row, event) : null
        },

        /**
        * Emits drag start event (column)
        */
        handleColumnDragStart(event, column, index) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = true;
            this.$emit('columndragstart', { event, column, index });
        },

        /**
        * Emits drag leave event (column)
        */
        handleColumnDragEnd(event, column, index) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = false;
            this.$emit('columndragend', { event, column, index });
        },

        /**
        * Emits drop event (column)
        */
        handleColumnDrop(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndrop', { event, column, index });
        },

        /**
        * Emits drag over event (column)
        */
        handleColumnDragOver(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndragover', { event, column, index });
        },

        /**
        * Emits drag leave event (column)
        */
        handleColumnDragLeave(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndragleave', { event, column, index });
        },

        _registerTableColumn(column) {
            if (column._isTableColumn) {
                this.defaultSlots.push(column);
            }
        },
        _unregisterTableColumn(column) {
            const index = this.defaultSlots.indexOf(column);
            if (index !== -1) {
                this.defaultSlots.splice(index, 1);
            }
        }
    },
    mounted() {
        this.checkPredefinedDetailedRows();
        this.checkSort();
    }
};

const _hoisted_1$2 = { class: "b-table" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  key: 0,
  width: "40px"
};
const _hoisted_4 = {
  key: 1,
  class: "is-relative"
};
const _hoisted_5 = {
  key: 0,
  class: "is-subheading"
};
const _hoisted_6 = {
  key: 0,
  width: "40px"
};
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { key: 2 };
const _hoisted_9 = { key: 1 };
const _hoisted_10 = {
  key: 0,
  width: "40px"
};
const _hoisted_11 = { key: 1 };
const _hoisted_12 = { class: "th-wrap" };
const _hoisted_13 = { key: 2 };
const _hoisted_14 = {
  key: 0,
  class: "chevron-cell"
};
const _hoisted_15 = {
  key: 0,
  class: "detail"
};
const _hoisted_16 = { class: "detail-container" };
const _hoisted_17 = {
  key: 0,
  class: "is-empty"
};
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "table-footer" };

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_table_mobile_sort = resolveComponent("b-table-mobile-sort");
  const _component_b_table_pagination = resolveComponent("b-table-pagination");
  const _component_b_checkbox = resolveComponent("b-checkbox");
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");
  const _component_b_loading = resolveComponent("b-loading");

  return (openBlock(), createBlock("div", _hoisted_1$2, [
    renderSlot(_ctx.$slots, "default"),
    ($props.mobileCards && $options.hasSortablenewColumns)
      ? (openBlock(), createBlock(_component_b_table_mobile_sort, {
          key: 0,
          "current-sort-column": $data.currentSortColumn,
          "sort-multiple": $props.sortMultiple,
          "sort-multiple-data": $options.sortMultipleDataComputed,
          "is-asc": $data.isAsc,
          columns: $options.newColumns,
          placeholder: $props.mobileSortPlaceholder,
          "icon-pack": $props.iconPack,
          "sort-icon": $props.sortIcon,
          "sort-icon-size": $props.sortIconSize,
          onSort: _cache[1] || (_cache[1] = (column, event) => $options.sort(column, null, event)),
          onRemovePriority: _cache[2] || (_cache[2] = (column) => $options.removeSortingPriority(column))
        }, null, 8 /* PROPS */, ["current-sort-column", "sort-multiple", "sort-multiple-data", "is-asc", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size"]))
      : createCommentVNode("v-if", true),
    ($props.paginated && ($props.paginationPosition === 'top' || $props.paginationPosition === 'both'))
      ? renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
          createVNode(_component_b_table_pagination, mergeProps(_ctx.$attrs, {
            "per-page": $props.perPage,
            paginated: $props.paginated,
            rounded: $props.paginationRounded,
            "icon-pack": $props.iconPack,
            total: $data.newDataTotal,
            "current-page": $data.newCurrentPage,
            "onUpdate:current-page": _cache[3] || (_cache[3] = $event => ($data.newCurrentPage = $event)),
            "aria-next-label": $props.ariaNextLabel,
            "aria-previous-label": $props.ariaPreviousLabel,
            "aria-page-label": $props.ariaPageLabel,
            "aria-current-label": $props.ariaCurrentLabel,
            onPageChange: _cache[4] || (_cache[4] = (event) => _ctx.$emit('page-change', event))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "top-left")
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
        ])
      : createCommentVNode("v-if", true),
    createVNode("div", {
      class: ["table-wrapper", $options.tableWrapperClasses],
      style: $options.tableStyle
    }, [
      createVNode("table", {
        class: ["table", $options.tableClasses],
        tabindex: !$props.focusable ? false : 0,
        onKeydown: [
          _cache[5] || (_cache[5] = withKeys(withModifiers($event => ($options.pressedArrow(-1)), ["self","prevent"]), ["up"])),
          _cache[6] || (_cache[6] = withKeys(withModifiers($event => ($options.pressedArrow(1)), ["self","prevent"]), ["down"]))
        ]
      }, [
        ($options.newColumns.length && $props.showHeader)
          ? (openBlock(), createBlock("thead", _hoisted_2, [
              createVNode("tr", null, [
                ($options.showDetailRowIcon)
                  ? (openBlock(), createBlock("th", _hoisted_3))
                  : createCommentVNode("v-if", true),
                ($props.checkable && $props.checkboxPosition === 'left')
                  ? (openBlock(), createBlock("th", {
                      key: 1,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      ($props.headerCheckable)
                        ? (openBlock(), createBlock(_component_b_checkbox, {
                            key: 0,
                            "model-value": $options.isAllChecked,
                            disabled: $options.isAllUncheckable,
                            onChange: $options.checkAll
                          }, null, 8 /* PROPS */, ["model-value", "disabled", "onChange"]))
                        : createCommentVNode("v-if", true)
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true),
                (openBlock(true), createBlock(Fragment, null, renderList($options.visibleColumns, (column, index) => {
                  return (openBlock(), createBlock("th", mergeProps({
                    key: column.newKey + ':' + index + 'header'
                  }, column.thAttrs(column), {
                    class: [column.thClasses, {
                                'is-current-sort': !$props.sortMultiple && $data.currentSortColumn === column,
                            }],
                    style: column.thStyle,
                    onClick: withModifiers($event => ($options.sort(column, null, $event)), ["stop"]),
                    draggable: $options.canDragColumn,
                    onDragstart: $event => ($options.handleColumnDragStart($event, column, index)),
                    onDragend: $event => ($options.handleColumnDragEnd($event, column, index)),
                    onDrop: $event => ($options.handleColumnDrop($event, column, index)),
                    onDragover: $event => ($options.handleColumnDragOver($event, column, index)),
                    onDragleave: $event => ($options.handleColumnDragLeave($event, column, index))
                  }), [
                    createVNode("div", {
                      class: ["th-wrap", {
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                                }]
                    }, [
                      (column.$slots.header)
                        ? (openBlock(), createBlock(_component_b_slot_component, {
                            key: 0,
                            component: column,
                            scoped: "",
                            name: "header",
                            tag: "span",
                            props: { column, index }
                          }, null, 8 /* PROPS */, ["component", "props"]))
                        : (openBlock(), createBlock("span", _hoisted_4, [
                            createTextVNode(toDisplayString(column.label) + " ", 1 /* TEXT */),
                            ($props.sortMultiple &&
                                                $options.sortMultipleDataComputed &&
                                                $options.sortMultipleDataComputed.length > 0 &&
                                                $options.sortMultipleDataComputed.filter(i =>
                                                    i.field === column.field).length > 0)
                              ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(_component_b_icon, {
                                    icon: $props.sortIcon,
                                    pack: $props.iconPack,
                                    both: "",
                                    size: $props.sortIconSize,
                                    class: {
                                                    'is-desc': $options.sortMultipleDataComputed
                                                        .filter(i => i.field === column.field)[0]
                                                        .order === 'desc'}
                                  }, null, 8 /* PROPS */, ["icon", "pack", "size", "class"]),
                                  createTextVNode(" " + toDisplayString($options.findIndexOfSortData(column)) + " ", 1 /* TEXT */),
                                  createVNode("button", {
                                    class: "delete is-small multi-sort-cancel-icon",
                                    type: "button",
                                    onClick: withModifiers($event => ($options.removeSortingPriority(column)), ["stop"])
                                  }, null, 8 /* PROPS */, ["onClick"])
                                ], 64 /* STABLE_FRAGMENT */))
                              : (openBlock(), createBlock(_component_b_icon, {
                                  key: 1,
                                  icon: $props.sortIcon,
                                  pack: $props.iconPack,
                                  both: "",
                                  size: $props.sortIconSize,
                                  class: ["sort-icon", {
                                                'is-desc': !$data.isAsc,
                                                'is-invisible': $data.currentSortColumn !== column
                                            }]
                                }, null, 8 /* PROPS */, ["icon", "pack", "size", "class"]))
                          ]))
                    ], 2 /* CLASS */)
                  ], 16 /* FULL_PROPS */, ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"]))
                }), 128 /* KEYED_FRAGMENT */)),
                ($props.checkable && $props.checkboxPosition === 'right')
                  ? (openBlock(), createBlock("th", {
                      key: 2,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      ($props.headerCheckable)
                        ? (openBlock(), createBlock(_component_b_checkbox, {
                            key: 0,
                            "model-value": $options.isAllChecked,
                            disabled: $options.isAllUncheckable,
                            onChange: $options.checkAll
                          }, null, 8 /* PROPS */, ["model-value", "disabled", "onChange"]))
                        : createCommentVNode("v-if", true)
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true)
              ]),
              ($options.hasCustomSubheadings)
                ? (openBlock(), createBlock("tr", _hoisted_5, [
                    ($options.showDetailRowIcon)
                      ? (openBlock(), createBlock("th", _hoisted_6))
                      : createCommentVNode("v-if", true),
                    ($props.checkable && $props.checkboxPosition === 'left')
                      ? (openBlock(), createBlock("th", _hoisted_7))
                      : createCommentVNode("v-if", true),
                    (openBlock(true), createBlock(Fragment, null, renderList($options.visibleColumns, (column, index) => {
                      return (openBlock(), createBlock("th", {
                        key: column.newKey + ':' + index + 'subheading',
                        style: column.style
                      }, [
                        createVNode("div", {
                          class: ["th-wrap", {
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                                }]
                        }, [
                          (column.$slots.subheading)
                            ? (openBlock(), createBlock(_component_b_slot_component, {
                                key: 0,
                                component: column,
                                scoped: "",
                                name: "subheading",
                                tag: "span",
                                props: { column, index }
                              }, null, 8 /* PROPS */, ["component", "props"]))
                            : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(toDisplayString(column.subheading), 1 /* TEXT */)
                              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                        ], 2 /* CLASS */)
                      ], 4 /* STYLE */))
                    }), 128 /* KEYED_FRAGMENT */)),
                    ($props.checkable && $props.checkboxPosition === 'right')
                      ? (openBlock(), createBlock("th", _hoisted_8))
                      : createCommentVNode("v-if", true)
                  ]))
                : createCommentVNode("v-if", true),
              ($options.hasSearchablenewColumns)
                ? (openBlock(), createBlock("tr", _hoisted_9, [
                    ($options.showDetailRowIcon)
                      ? (openBlock(), createBlock("th", _hoisted_10))
                      : createCommentVNode("v-if", true),
                    ($props.checkable && $props.checkboxPosition === 'left')
                      ? (openBlock(), createBlock("th", _hoisted_11))
                      : createCommentVNode("v-if", true),
                    (openBlock(true), createBlock(Fragment, null, renderList($options.visibleColumns, (column, index) => {
                      return (openBlock(), createBlock("th", mergeProps({
                        key: column.newKey + ':' + index + 'searchable'
                      }, column.thAttrs(column), {
                        style: column.thStyle,
                        class: {'is-sticky': column.sticky}
                      }), [
                        createVNode("div", _hoisted_12, [
                          (column.searchable)
                            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                (column.$slots.searchable)
                                  ? (openBlock(), createBlock(_component_b_slot_component, {
                                      key: 0,
                                      component: column,
                                      scoped: true,
                                      name: "searchable",
                                      tag: "span",
                                      props: { column, filters: $data.filters }
                                    }, null, 8 /* PROPS */, ["component", "props"]))
                                  : (openBlock(), createBlock(_component_b_input, {
                                      key: 1,
                                      [toHandlerKey($props.filtersEvent)]: $options.onFiltersEvent,
                                      modelValue: $data.filters[column.field],
                                      "onUpdate:modelValue": $event => ($data.filters[column.field] = $event),
                                      type: column.numeric ? 'number' : 'text'
                                    }, null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue", "type"]))
                              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                            : createCommentVNode("v-if", true)
                        ])
                      ], 16 /* FULL_PROPS */))
                    }), 128 /* KEYED_FRAGMENT */)),
                    ($props.checkable && $props.checkboxPosition === 'right')
                      ? (openBlock(), createBlock("th", _hoisted_13))
                      : createCommentVNode("v-if", true)
                  ]))
                : createCommentVNode("v-if", true)
            ]))
          : createCommentVNode("v-if", true),
        createVNode("tbody", null, [
          (openBlock(true), createBlock(Fragment, null, renderList($options.visibleData, (row, index) => {
            return (openBlock(), createBlock(Fragment, {
              key: $props.customRowKey ? row[$props.customRowKey] : index
            }, [
              createVNode("tr", {
                class: [$props.rowClass(row, index), {
                                'is-selected': $options.isRowSelected(row, $props.selected),
                                'is-checked': $options.isRowChecked(row),
                            }],
                onClick: $event => ($options.selectRow(row)),
                onDblclick: $event => (_ctx.$emit('dblclick', row)),
                onMouseenter: $event => ($options.emitEventForRow('mouseenter', $event, row)),
                onMouseleave: $event => ($options.emitEventForRow('mouseleave', $event, row)),
                onContextmenu: $event => (_ctx.$emit('contextmenu', row, $event)),
                draggable: $options.canDragRow,
                onDragstart: $event => ($options.handleDragStart($event, row, index)),
                onDragend: $event => ($options.handleDragEnd($event, row, index)),
                onDrop: $event => ($options.handleDrop($event, row, index)),
                onDragover: $event => ($options.handleDragOver($event, row, index)),
                onDragleave: $event => ($options.handleDragLeave($event, row, index))
              }, [
                ($options.showDetailRowIcon)
                  ? (openBlock(), createBlock("td", _hoisted_14, [
                      ($props.hasDetailedVisible(row))
                        ? (openBlock(), createBlock("a", {
                            key: 0,
                            role: "button",
                            onClick: withModifiers($event => ($options.toggleDetails(row)), ["stop"])
                          }, [
                            createVNode(_component_b_icon, {
                              icon: "chevron-right",
                              pack: $props.iconPack,
                              both: "",
                              class: {'is-expanded': $options.isVisibleDetailRow(row)}
                            }, null, 8 /* PROPS */, ["pack", "class"])
                          ], 8 /* PROPS */, ["onClick"]))
                        : createCommentVNode("v-if", true)
                    ]))
                  : createCommentVNode("v-if", true),
                ($props.checkable && $props.checkboxPosition === 'left')
                  ? (openBlock(), createBlock("td", {
                      key: 1,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      createVNode(_component_b_checkbox, {
                        disabled: !$props.isRowCheckable(row),
                        "model-value": $options.isRowChecked(row),
                        onClick: withModifiers($event => ($options.checkRow(row, index, $event)), ["prevent","stop"])
                      }, null, 8 /* PROPS */, ["disabled", "model-value", "onClick"])
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true),
                (openBlock(true), createBlock(Fragment, null, renderList($options.visibleColumns, (column, colindex) => {
                  return (openBlock(), createBlock(Fragment, {
                    key: column.newKey + ':' + index + ':' + colindex
                  }, [
                    (column.$slots.default)
                      ? (openBlock(), createBlock(_component_b_slot_component, mergeProps({
                          key: 0,
                          component: column
                        }, column.tdAttrs(row, column), {
                          scoped: "",
                          name: "default",
                          tag: "td",
                          class: column.getRootClasses(row),
                          style: column.getRootStyle(row),
                          "data-label": column.label,
                          props: { row, column, index, colindex, toggleDetails: $options.toggleDetails },
                          onClick: $event => (_ctx.$emit('cellclick',row,column,index,colindex))
                        }), null, 16 /* FULL_PROPS */, ["component", "class", "style", "data-label", "props", "onClick"]))
                      : createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */)),
                ($props.checkable && $props.checkboxPosition === 'right')
                  ? (openBlock(), createBlock("td", {
                      key: 2,
                      class: ['checkbox-cell', { 'is-sticky': $props.stickyCheckbox } ]
                    }, [
                      createVNode(_component_b_checkbox, {
                        disabled: !$props.isRowCheckable(row),
                        "model-value": $options.isRowChecked(row),
                        onClick: withModifiers($event => ($options.checkRow(row, index, $event)), ["prevent","stop"])
                      }, null, 8 /* PROPS */, ["disabled", "model-value", "onClick"])
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true)
              ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"]),
              createVNode(Transition, { name: $props.detailTransition }, {
                default: withCtx(() => [
                  ($options.isActiveDetailRow(row))
                    ? (openBlock(), createBlock("tr", _hoisted_15, [
                        createVNode("td", { colspan: $options.columnCount }, [
                          createVNode("div", _hoisted_16, [
                            renderSlot(_ctx.$slots, "detail", {
                              row: row,
                              index: index
                            })
                          ])
                        ], 8 /* PROPS */, ["colspan"])
                      ]))
                    : createCommentVNode("v-if", true)
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name"]),
              ($options.isActiveCustomDetailRow(row))
                ? renderSlot(_ctx.$slots, "detail", {
                    key: 0,
                    row: row,
                    index: index
                  })
                : createCommentVNode("v-if", true)
            ], 64 /* STABLE_FRAGMENT */))
          }), 128 /* KEYED_FRAGMENT */)),
          (!$options.visibleData.length)
            ? (openBlock(), createBlock("tr", _hoisted_17, [
                createVNode("td", { colspan: $options.columnCount }, [
                  renderSlot(_ctx.$slots, "empty")
                ], 8 /* PROPS */, ["colspan"])
              ]))
            : createCommentVNode("v-if", true)
        ]),
        (_ctx.$slots.footer !== undefined)
          ? (openBlock(), createBlock("tfoot", _hoisted_18, [
              createVNode("tr", _hoisted_19, [
                ($options.hasCustomFooterSlot())
                  ? renderSlot(_ctx.$slots, "footer", { key: 0 })
                  : (openBlock(), createBlock("th", {
                      key: 1,
                      colspan: $options.columnCount
                    }, [
                      renderSlot(_ctx.$slots, "footer")
                    ], 8 /* PROPS */, ["colspan"]))
              ])
            ]))
          : createCommentVNode("v-if", true)
      ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["tabindex"]),
      ($props.loading)
        ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            createVNode(_component_b_loading, {
              "is-full-page": false,
              active: $props.loading
            }, null, 8 /* PROPS */, ["active"])
          ])
        : createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    (($props.checkable && $options.hasBottomLeftSlot()) ||
                ($props.paginated && ($props.paginationPosition === 'bottom' || $props.paginationPosition === 'both')))
      ? renderSlot(_ctx.$slots, "pagination", { key: 2 }, () => [
          createVNode(_component_b_table_pagination, mergeProps(_ctx.$attrs, {
            "per-page": $props.perPage,
            paginated: $props.paginated,
            rounded: $props.paginationRounded,
            "icon-pack": $props.iconPack,
            total: $data.newDataTotal,
            "current-page": $data.newCurrentPage,
            "onUpdate:current-page": _cache[7] || (_cache[7] = $event => ($data.newCurrentPage = $event)),
            "aria-next-label": $props.ariaNextLabel,
            "aria-previous-label": $props.ariaPreviousLabel,
            "aria-page-label": $props.ariaPageLabel,
            "aria-current-label": $props.ariaCurrentLabel,
            onPageChange: _cache[8] || (_cache[8] = (event) => _ctx.$emit('page-change', event))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "bottom-left")
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])
        ])
      : createCommentVNode("v-if", true)
  ]))
}

script$7.render = render$6;
script$7.__file = "src/components/table/Table.vue";

var Plugin$e = {
  install: function install(Vue) {

    registerComponent(Vue, script$7);
    registerComponent(Vue, script$9);
  }
};
use(Plugin$e);
var Plugin$f = Plugin$e;

var script$6 = {
    name: 'BTabs',
    mixins: [TabbedMixin('tab')],
    props: {
        expanded: {
            type: Boolean,
            default: () => {
                return config.defaultTabsExpanded
            }
        },
        type: {
            type: [String, Object],
            default: () => {
                return config.defaultTabsType
            }
        },
        animated: {
            type: Boolean,
            default: () => {
                return config.defaultTabsAnimated
            }
        },
        multiline: Boolean
    },
    data() {
        return {
            currentFocus: null
        }
    },
    computed: {
        mainClasses() {
            return {
                'is-fullwidth': this.expanded,
                'is-vertical': this.vertical,
                'is-multiline': this.multiline,
                [this.position]: this.position && this.vertical
            }
        },
        navClasses() {
            return [
                this.type,
                this.size,
                {
                    [this.position]: this.position && !this.vertical,
                    'is-fullwidth': this.expanded,
                    'is-toggle': this.type === 'is-toggle-rounded'
                }
            ]
        }
    },
    methods: {
        giveFocusToTab(tab) {
            if (tab.$el && tab.$el.focus) {
                tab.$el.focus();
            } else if (tab.focus) {
                tab.focus();
            }
        },
        manageTablistKeydown(event) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event;
            switch (key) {
                case this.vertical ? 'ArrowUp' : 'ArrowLeft':
                case this.vertical ? 'Up' : 'Left': {
                    let prevIdx = this.getPrevItemIdx(this.currentFocus, true);
                    if (prevIdx === null) {
                        // We try to give focus back to the last visible element
                        prevIdx = this.getPrevItemIdx(Infinity, true);
                    }
                    const prevItem = this.items.find((i) => i.index === prevIdx);
                    if (
                        prevItem &&
                        this.$refs[`tabLink${prevIdx}`] &&
                        !prevItem.disabled
                    ) {
                        this.giveFocusToTab(this.$refs[`tabLink${prevIdx}`]);
                    }
                    event.preventDefault();
                    break
                }
                case this.vertical ? 'ArrowDown' : 'ArrowRight':
                case this.vertical ? 'Down' : 'Right': {
                    let nextIdx = this.getNextItemIdx(this.currentFocus, true);
                    if (nextIdx === null) {
                        // We try to give focus back to the first visible element
                        nextIdx = this.getNextItemIdx(-1, true);
                    }
                    const nextItem = this.items.find((i) => i.index === nextIdx);
                    if (
                        nextItem &&
                        this.$refs[`tabLink${nextIdx}`] &&
                        !nextItem.disabled
                    ) {
                        this.giveFocusToTab(this.$refs[`tabLink${nextIdx}`]);
                    }
                    event.preventDefault();
                    break
                }
            }
        },

        manageTabKeydown(event, childItem) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event;
            switch (key) {
                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.childClick(childItem);
                    event.preventDefault();
                    break
                }
            }
        }
    }
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");

  return (openBlock(), createBlock("div", {
    class: ["b-tabs", $options.mainClasses]
  }, [
    createVNode("nav", {
      class: ["tabs", $options.navClasses],
      role: "tablist",
      "aria-orientation": _ctx.vertical ? 'vertical' : 'horizontal',
      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.manageTablistKeydown && $options.manageTablistKeydown(...args)))
    }, [
      createVNode("ul", null, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (childItem) => {
          return withDirectives((openBlock(), createBlock("li", {
            key: childItem.value,
            class: [ childItem.headerClass, { 'is-active': childItem.isActive,
                                                       'is-disabled': childItem.disabled }],
            role: "presentation"
          }, [
            (childItem.$slots.header)
              ? (openBlock(), createBlock(_component_b_slot_component, {
                  key: 0,
                  ref: `tabLink${childItem.index}`,
                  component: childItem,
                  name: "header",
                  tag: "a",
                  role: "tab",
                  id: `${childItem.value}-label`,
                  "aria-controls": `${childItem.value}-content`,
                  "aria-selected": `${childItem.isActive}`,
                  tabindex: childItem.isActive ? 0 : -1,
                  onFocus: $event => ($data.currentFocus = childItem.index),
                  onClick: $event => (_ctx.childClick(childItem)),
                  onKeydown: $event => ($options.manageTabKeydown($event, childItem))
                }, null, 8 /* PROPS */, ["component", "id", "aria-controls", "aria-selected", "tabindex", "onFocus", "onClick", "onKeydown"]))
              : (openBlock(), createBlock("a", {
                  key: 1,
                  ref: `tabLink${childItem.index}`,
                  role: "tab",
                  id: `${childItem.value}-tab`,
                  "aria-controls": `${childItem.value}-content`,
                  "aria-selected": `${childItem.isActive}`,
                  tabindex: childItem.isActive ? 0 : -1,
                  onFocus: $event => ($data.currentFocus = childItem.index),
                  onClick: $event => (_ctx.childClick(childItem)),
                  onKeydown: $event => ($options.manageTabKeydown($event, childItem))
                }, [
                  (childItem.icon)
                    ? (openBlock(), createBlock(_component_b_icon, {
                        key: 0,
                        icon: childItem.icon,
                        pack: childItem.iconPack,
                        size: _ctx.size
                      }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
                    : createCommentVNode("v-if", true),
                  createVNode("span", null, toDisplayString(childItem.label), 1 /* TEXT */)
                ], 40 /* PROPS, HYDRATE_EVENTS */, ["id", "aria-controls", "aria-selected", "tabindex", "onFocus", "onClick", "onKeydown"]))
          ], 2 /* CLASS */)), [
            [vShow, childItem.visible]
          ])
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-orientation"]),
    createVNode("section", {
      class: ["tab-content", {'is-transitioning': _ctx.isTransitioning}]
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script$6.render = render$5;
script$6.__file = "src/components/tabs/Tabs.vue";

var script$5 = {
    name: 'BTabItem',
    mixins: [TabbedChildMixin('tab')],
    props: {
        disabled: Boolean
    },
    data() {
        return {
            elementClass: 'tab-item',
            elementRole: 'tabpanel'
        }
    }
};

script$5.__file = "src/components/tabs/TabItem.vue";

var Plugin$c = {
  install: function install(Vue) {
    registerComponent(Vue, script$6);
    registerComponent(Vue, script$5);
  }
};
use(Plugin$c);
var Plugin$d = Plugin$c;

var script$4 = {
    name: 'BTag',
    props: {
        attached: Boolean,
        closable: Boolean,
        type: String,
        size: String,
        rounded: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        tabstop: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        closeType: String,
        closeIcon: String,
        closeIconPack: String,
        closeIconType: String
    },
    emits: ['close'],
    computed: {
        // setting a boolean attribute `false` does not remove it on Vue 3.
        // `null` or `undefined` has to be given to remove it.
        disabledOrUndefined() {
            return this.disabled || undefined
        }
    },
    methods: {
        /**
        * Emit close event when delete button is clicked
        * or delete key is pressed.
        */
        close(event) {
            if (this.disabled) return

            this.$emit('close', event);
        }
    }
};

const _hoisted_1$1 = {
  key: 0,
  class: "tags has-addons"
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");

  return ($props.attached && $props.closable)
    ? (openBlock(), createBlock("div", _hoisted_1$1, [
        createVNode("span", {
          class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
        }, [
          createVNode("span", {
            class: { 'has-ellipsis': $props.ellipsis }
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */)
        ], 2 /* CLASS */),
        createVNode("a", {
          class: ["tag", [$props.size,
                     $props.closeType,
                     {'is-rounded': $props.rounded},
                     $props.closeIcon ? 'has-delete-icon' : 'is-delete']],
          role: "button",
          "aria-label": $props.ariaCloseLabel,
          tabindex: $props.tabstop ? 0 : false,
          disabled: $options.disabledOrUndefined,
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.close && $options.close(...args))),
          onKeyup: _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
        }, [
          ($props.closeIcon)
            ? (openBlock(), createBlock(_component_b_icon, {
                key: 0,
                "custom-class": "",
                icon: $props.closeIcon,
                size: $props.size,
                type: $props.closeIconType,
                pack: $props.closeIconPack
              }, null, 8 /* PROPS */, ["icon", "size", "type", "pack"]))
            : createCommentVNode("v-if", true)
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "tabindex", "disabled"])
      ]))
    : (openBlock(), createBlock("span", {
        key: 1,
        class: ["tag", [$props.type, $props.size, { 'is-rounded': $props.rounded }]]
      }, [
        createVNode("span", {
          class: { 'has-ellipsis': $props.ellipsis }
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */),
        ($props.closable)
          ? (openBlock(), createBlock("a", {
              key: 0,
              role: "button",
              "aria-label": $props.ariaCloseLabel,
              class: ["delete is-small", $props.closeType],
              disabled: $options.disabledOrUndefined,
              tabindex: $props.tabstop ? 0 : false,
              onClick: _cache[3] || (_cache[3] = (...args) => ($options.close && $options.close(...args))),
              onKeyup: _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => ($options.close && $options.close(...args)), ["prevent"]), ["delete"]))
            }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["aria-label", "disabled", "tabindex"]))
          : createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
}

script$4.render = render$4;
script$4.__file = "src/components/tag/Tag.vue";

var script$3 = {
    name: 'BTaglist',
    props: {
        attached: Boolean
    }
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["tags", { 'has-addons': $props.attached }]
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$3.render = render$3;
script$3.__file = "src/components/tag/Taglist.vue";

var Plugin$a = {
  install: function install(Vue) {
    registerComponent(Vue, script$4);
    registerComponent(Vue, script$3);
  }
};
use(Plugin$a);
var Plugin$b = Plugin$a;

var script$2 = {
    name: 'BTaginput',
    components: {
        [script$$.name]: script$$,
        [script$4.name]: script$4
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        type: String,
        closeType: String,
        rounded: {
            type: Boolean,
            default: false
        },
        attached: {
            type: Boolean,
            default: false
        },
        maxtags: {
            type: [Number, String],
            required: false
        },
        hasCounter: {
            type: Boolean,
            default: () => config.defaultTaginputHasCounter
        },
        field: {
            type: String,
            default: 'value'
        },
        autocomplete: Boolean,
        groupField: String,
        groupOptions: String,
        nativeAutocomplete: String,
        openOnFocus: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        closable: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        confirmKeys: {
            type: Array,
            default: () => [',', 'Tab', 'Enter']
        },
        removeOnKeys: {
            type: Array,
            default: () => ['Backspace']
        },
        allowNew: Boolean,
        onPasteSeparators: {
            type: Array,
            default: () => [',']
        },
        beforeAdding: {
            type: Function,
            default: () => true
        },
        allowDuplicates: {
            type: Boolean,
            default: false
        },
        checkInfiniteScroll: {
            type: Boolean,
            default: false
        },
        createTag: {
            type: Function,
            default: (tag) => tag
        },
        appendToBody: Boolean
    },
    emits: [
        'add',
        'infinite-scroll',
        'remove',
        'typing',
        'update:modelValue'
    ],
    data() {
        return {
            tags: Array.isArray(this.modelValue)
                ? this.modelValue.slice(0)
                : (this.modelValue || []),
            newTag: '',
            isComposing: false,
            _elementRef: 'autocomplete',
            _isTaginput: true
        }
    },
    computed: {
        rootClasses() {
            return {
                'is-expanded': this.expanded
            }
        },

        containerClasses() {
            return {
                'is-focused': this.isFocused,
                'is-focusable': this.hasInput
            }
        },

        valueLength() {
            return this.newTag.trim().length
        },

        hasDefaultSlot() {
            return !!this.$slots.default
        },

        hasEmptySlot() {
            return !!this.$slots.empty
        },

        hasHeaderSlot() {
            return !!this.$slots.header
        },

        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Show the input field if a maxtags hasn't been set or reached.
         */
        hasInput() {
            return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags
        },

        tagsLength() {
            return this.tags.length
        },

        /**
         * If Taginput has onPasteSeparators prop,
         * returning new RegExp used to split pasted string.
         */
        separatorsAsRegExp() {
            const sep = this.onPasteSeparators;

            return sep.length
                ? new RegExp(sep.map((s) => {
                    return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null
                }).join('|'), 'g')
                : null
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it.
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
         * When v-model is changed set internal value.
         */
        modelValue(value) {
            this.tags = Array.isArray(value) ? value.slice(0) : (value || []);
        },

        hasInput() {
            if (!this.hasInput) this.onBlur();
        }
    },
    methods: {
        addTag(tag) {
            const tagToAdd = tag || this.newTag.trim();

            if (tagToAdd) {
                if (!this.autocomplete) {
                    const reg = this.separatorsAsRegExp;
                    if (reg && tagToAdd.match(reg)) {
                        tagToAdd.split(reg)
                            .map((t) => t.trim())
                            .filter((t) => t.length !== 0)
                            .map(this.addTag);
                        return
                    }
                }
                // Add the tag input if it is not blank
                // or previously added (if not allowDuplicates).
                const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
                if (add && this.beforeAdding(tagToAdd)) {
                    if (this.maxtags === 1) {
                        this.tags = []; // replace existing tag if only 1 is allowed
                    }
                    this.tags.push(this.createTag(tagToAdd));
                    this.$emit('update:modelValue', this.tags);
                    this.$emit('add', tagToAdd);
                }
            }

            this.newTag = '';
        },

        getNormalizedTagText(tag) {
            if (typeof tag === 'object') {
                tag = getValueByPath(tag, this.field);
            }

            return `${tag}`
        },

        customOnBlur(event) {
            // Add tag on-blur if not select only
            if (!this.autocomplete) this.addTag();

            this.onBlur(event);
        },

        onSelect(option) {
            if (!option) return

            this.addTag(option);
            this.$nextTick(() => {
                this.newTag = '';
            });
        },

        removeTag(index, event) {
            const tag = this.tags.splice(index, 1)[0];
            this.$emit('update:modelValue', this.tags);
            this.$emit('remove', tag);
            if (event) event.stopPropagation();
            if (this.openOnFocus && this.$refs.autocomplete) {
                this.$refs.autocomplete.focus();
            }
            return tag
        },

        removeLastTag() {
            if (this.tagsLength > 0) {
                this.removeTag(this.tagsLength - 1);
            }
        },

        keydown(event) {
            const { key } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
                this.removeLastTag();
            }
            // Stop if is to accept select only
            if (this.autocomplete && !this.allowNew) return

            if (this.confirmKeys.indexOf(key) >= 0) {
                // Allow Tab to advance to next field regardless
                if (key !== 'Tab') event.preventDefault();
                if (key === 'Enter' && this.isComposing) return
                this.addTag();
            }
        },

        onTyping(event) {
            this.$emit('typing', event.trim());
        },

        emitInfiniteScroll() {
            this.$emit('infinite-scroll');
        }
    }
};

const _hoisted_1 = {
  key: 0,
  class: "help counter"
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tag = resolveComponent("b-tag");
  const _component_b_autocomplete = resolveComponent("b-autocomplete");

  return (openBlock(), createBlock("div", {
    class: ["taginput control", $options.rootClasses]
  }, [
    createVNode("div", {
      class: ["taginput-container", [_ctx.statusType, _ctx.size, $options.containerClasses]],
      disabled: $options.disabledOrUndefined,
      onClick: _cache[4] || (_cache[4] = $event => ($options.hasInput && _ctx.focus($event)))
    }, [
      renderSlot(_ctx.$slots, "selected", { tags: $data.tags }, () => [
        (openBlock(true), createBlock(Fragment, null, renderList($data.tags, (tag, index) => {
          return (openBlock(), createBlock(_component_b_tag, {
            key: $options.getNormalizedTagText(tag) + index,
            type: $props.type,
            "close-type": $props.closeType,
            size: _ctx.size,
            rounded: $props.rounded,
            attached: $props.attached,
            tabstop: false,
            disabled: $options.disabledOrUndefined,
            ellipsis: $props.ellipsis,
            closable: $props.closable,
            "aria-close-label": $props.ariaCloseLabel,
            title: $props.ellipsis && $options.getNormalizedTagText(tag),
            onClose: $event => ($options.removeTag(index, $event))
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "tag", { tag: tag }, () => [
                createTextVNode(toDisplayString($options.getNormalizedTagText(tag)), 1 /* TEXT */)
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "close-type", "size", "rounded", "attached", "disabled", "ellipsis", "closable", "aria-close-label", "title", "onClose"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      ($options.hasInput)
        ? (openBlock(), createBlock(_component_b_autocomplete, mergeProps({
            key: 0,
            ref: "autocomplete",
            modelValue: $data.newTag,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.newTag = $event))
          }, _ctx.$attrs, {
            data: $props.data,
            field: $props.field,
            icon: _ctx.icon,
            "icon-pack": _ctx.iconPack,
            maxlength: _ctx.maxlength,
            "has-counter": false,
            size: _ctx.size,
            disabled: $options.disabledOrUndefined,
            loading: _ctx.loading,
            autocomplete: $props.nativeAutocomplete,
            "open-on-focus": $props.openOnFocus,
            "keep-open": $props.openOnFocus,
            "group-field": $props.groupField,
            "group-options": $props.groupOptions,
            "use-html5-validation": _ctx.useHtml5Validation,
            "check-infinite-scroll": $props.checkInfiniteScroll,
            "append-to-body": $props.appendToBody,
            "confirm-keys": $props.confirmKeys,
            onTyping: $options.onTyping,
            onFocus: _ctx.onFocus,
            onBlur: $options.customOnBlur,
            onKeydown: $options.keydown,
            onCompositionstart: _cache[2] || (_cache[2] = $event => ($data.isComposing = true)),
            onCompositionend: _cache[3] || (_cache[3] = $event => ($data.isComposing = false)),
            onSelect: $options.onSelect,
            onInfiniteScroll: $options.emitInfiniteScroll
          }), createSlots({ _: 2 /* DYNAMIC */ }, [
            ($options.hasHeaderSlot)
              ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "header")
                  ])
                }
              : undefined,
            ($options.hasDefaultSlot)
              ? {
                  name: "default",
                  fn: withCtx((props) => [
                    renderSlot(_ctx.$slots, "default", {
                      option: props.option,
                      index: props.index
                    })
                  ])
                }
              : undefined,
            ($options.hasEmptySlot)
              ? {
                  name: "empty",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "empty")
                  ])
                }
              : undefined,
            ($options.hasFooterSlot)
              ? {
                  name: "footer",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "footer")
                  ])
                }
              : undefined
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "loading", "autocomplete", "open-on-focus", "keep-open", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onKeydown", "onSelect", "onInfiniteScroll"]))
        : createCommentVNode("v-if", true)
    ], 10 /* CLASS, PROPS */, ["disabled"]),
    ($props.hasCounter && ($props.maxtags || _ctx.maxlength))
      ? (openBlock(), createBlock("small", _hoisted_1, [
          (_ctx.maxlength && $options.valueLength > 0)
            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($options.valueLength) + " / " + toDisplayString(_ctx.maxlength), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : ($props.maxtags)
              ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString($options.tagsLength) + " / " + toDisplayString($props.maxtags), 1 /* TEXT */)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              : createCommentVNode("v-if", true)
        ]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$2.render = render$2;
script$2.__file = "src/components/taginput/Taginput.vue";

var Plugin$8 = {
  install: function install(Vue) {
    registerComponent(Vue, script$2);
  }
};
use(Plugin$8);
var Plugin$9 = Plugin$8;

var Plugin$6 = {
  install: function install(Vue) {
    registerComponent(Vue, script$I);
  }
};
use(Plugin$6);
var Plugin$7 = Plugin$6;

var script$1 = {
    name: 'BToast',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultToastDuration
        }
    }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave
  }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        class: ["toast", [_ctx.type, _ctx.position]],
        "aria-hidden": !_ctx.isActive,
        role: "alert"
      }, [
        (_ctx.$slots.default)
          ? renderSlot(_ctx.$slots, "default", { key: 0 })
          : (openBlock(), createBlock("div", {
              key: 1,
              innerHTML: _ctx.message
            }, null, 8 /* PROPS */, ["innerHTML"]))
      ], 10 /* CLASS, PROPS */, ["aria-hidden"]), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["enter-active-class", "leave-active-class"]))
}

script$1.render = render$1;
script$1.__file = "src/components/toast/Toast.vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ToastProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      position: config.defaultToastPosition || 'is-top'
    };

    if (params.parent) {
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    }

    var propsData = merge(defaultParam, params);
    var container = document.createElement('div');
    var vueInstance = createApp({
      data: function data() {
        return {
          toastVNode: null
        };
      },
      methods: {
        close: function close() {
          var toast = getComponentFromVNode(this.toastVNode);

          if (toast) {
            toast.close();
          }
        }
      },
      render: function render() {
        this.toastVNode = h(script$1, _objectSpread(_objectSpread({}, propsData), {}, {
          // On Vue 3, $destroy is no longer available.
          // A toast has to be unmounted manually.
          onClose: function onClose() {
            if (typeof propsData.onClose === 'function') {
              propsData.onClose();
            } // timeout for the animation complete
            // before unmounting


            setTimeout(function () {
              vueInstance.unmount();
            }, 150);
          }
        }), slot != null ? {
          default: function _default() {
            return slot;
          }
        } : undefined); // we are interested in `toastVNode.component` but
        // at this point `toastVNode.component` should be null

        return this.toastVNode;
      }
    });
    return vueInstance.mount(container);
  }
};
var Plugin$4 = {
  install: function install(Vue) {
    registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic);
  }
};
use(Plugin$4);
var Plugin$5 = Plugin$4;

var Plugin$2 = {
  install: function install(Vue) {
    registerComponent(Vue, script$i);
  }
};
use(Plugin$2);
var Plugin$3 = Plugin$2;

var script = {
    name: 'BUpload',
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [Object, Function, File, Array]
        },
        multiple: Boolean,
        disabled: Boolean,
        accept: String,
        dragDrop: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        native: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        }
    },
    emits: ['invalid', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            dragDropFocus: false,
            _elementRef: 'input'
        }
    },
    computed: {
        classAndStyle() {
            return {
                class: this.$attrs.class,
                style: this.$attrs.style
            }
        },
        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `true` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
         *   When v-model is changed:
         *   1. Set internal value.
         *   2. Reset interna input file value
         *   3. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value;
            if (!value || (Array.isArray(value) && value.length === 0)) {
                this.$refs.input.value = null;
            }
            !this.isValid && !this.dragDrop && this.checkHtml5Validity();
        }
    },
    methods: {
        /**
        * Listen change event on input type 'file',
        * emit 'input' event and validate
        */
        onFileChange(event) {
            if (this.disabled || this.loading) return
            if (this.dragDrop) this.updateDragDropFocus(false);
            const value = event.target.files || event.dataTransfer.files;
            if (value.length === 0) {
                if (!this.newValue) return
                if (this.native) this.newValue = null;
            } else if (!this.multiple) {
                // only one element in case drag drop mode and isn't multiple
                if (this.dragDrop && value.length !== 1) return
                else {
                    const file = value[0];
                    if (this.checkType(file)) this.newValue = file;
                    else if (this.newValue) this.newValue = null;
                    else return
                }
            } else {
                // always new values if native or undefined local
                let newValues = false;
                if (this.native || !this.newValue) {
                    this.newValue = [];
                    newValues = true;
                }
                for (let i = 0; i < value.length; i++) {
                    const file = value[i];
                    if (this.checkType(file)) {
                        this.newValue.push(file);
                        newValues = true;
                    }
                }
                if (!newValues) return
            }
            this.$emit('update:modelValue', this.newValue);
            !this.dragDrop && this.checkHtml5Validity();
        },

        /**
        * Listen drag-drop to update internal variable
        */
        updateDragDropFocus(focus) {
            if (!this.disabled && !this.loading) {
                this.dragDropFocus = focus;
            }
        },

        /**
        * Check mime type of file
        */
        checkType(file) {
            if (!this.accept) return true
            const types = this.accept.split(',');
            if (types.length === 0) return true
            let valid = false;
            for (let i = 0; i < types.length && !valid; i++) {
                const type = types[i].trim();
                if (type) {
                    if (type.substring(0, 1) === '.') {
                        // check extension
                        const extIndex = file.name.lastIndexOf('.');
                        const extension = extIndex >= 0
                            ? file.name.substring(extIndex)
                            : '';
                        if (extension.toLowerCase() === type.toLowerCase()) {
                            valid = true;
                        }
                    } else {
                        // check mime type
                        if (file.type.match(type)) {
                            valid = true;
                        }
                    }
                }
            }
            if (!valid) this.$emit('invalid');
            return valid
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", mergeProps({ class: "upload control" }, $options.classAndStyle, {
    class: [{'is-expanded' : $props.expanded, 'is-rounded' : $props.rounded}]
  }), [
    (!$props.dragDrop)
      ? renderSlot(_ctx.$slots, "default", { key: 0 })
      : (openBlock(), createBlock("div", {
          key: 1,
          class: ["upload-draggable", [$props.type, {
                'is-loading': _ctx.loading,
                'is-disabled': $props.disabled,
                'is-hovered': $data.dragDropFocus,
                'is-expanded': $props.expanded,
            }]],
          onDragover: _cache[1] || (_cache[1] = withModifiers($event => ($options.updateDragDropFocus(true)), ["prevent"])),
          onDragleave: _cache[2] || (_cache[2] = withModifiers($event => ($options.updateDragDropFocus(false)), ["prevent"])),
          onDragenter: _cache[3] || (_cache[3] = withModifiers($event => ($options.updateDragDropFocus(true)), ["prevent"])),
          onDrop: _cache[4] || (_cache[4] = withModifiers((...args) => ($options.onFileChange && $options.onFileChange(...args)), ["prevent"]))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 34 /* CLASS, HYDRATE_EVENTS */)),
    createVNode("input", mergeProps({
      ref: "input",
      type: "file"
    }, _ctx.$attrs, {
      multiple: $props.multiple,
      accept: $props.accept,
      disabled: $options.disabledOrUndefined,
      onChange: _cache[5] || (_cache[5] = (...args) => ($options.onFileChange && $options.onFileChange(...args)))
    }), null, 16 /* FULL_PROPS */, ["multiple", "accept", "disabled"])
  ], 16 /* FULL_PROPS */))
}

script.render = render;
script.__file = "src/components/upload/Upload.vue";

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, script);
  }
};
use(Plugin);
var Plugin$1 = Plugin;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Autocomplete: Plugin$1f,
  Button: Plugin$1d,
  Carousel: Plugin$1b,
  Checkbox: Plugin$19,
  Clockpicker: Plugin$15,
  Collapse: Plugin$17,
  Datepicker: Plugin$13,
  Datetimepicker: Plugin$11,
  Dialog: Plugin$$,
  Dropdown: Plugin$Z,
  Field: Plugin$X,
  Icon: Plugin$V,
  Image: Plugin$T,
  Input: Plugin$R,
  Loading: Plugin$P,
  Menu: Plugin$N,
  Message: Plugin$L,
  Modal: Plugin$J,
  Navbar: Plugin$F,
  Notification: Plugin$H,
  Numberinput: Plugin$D,
  Pagination: Plugin$B,
  Progress: Plugin$z,
  Radio: Plugin$x,
  Rate: Plugin$v,
  Select: Plugin$t,
  Skeleton: Plugin$r,
  Sidebar: Plugin$p,
  Slider: Plugin$n,
  Snackbar: Plugin$l,
  Steps: Plugin$j,
  Switch: Plugin$h,
  Table: Plugin$f,
  Tabs: Plugin$d,
  Tag: Plugin$b,
  Taginput: Plugin$9,
  Timepicker: Plugin$7,
  Toast: Plugin$5,
  Tooltip: Plugin$3,
  Upload: Plugin$1
});

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    setOptions(merge(config, options, true)); // Components

    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    registerComponentProgrammatic(Vue, 'config', ConfigComponent);
  }
};
use(Buefy);

export { Plugin$1f as Autocomplete, Plugin$1d as Button, Plugin$1b as Carousel, Plugin$19 as Checkbox, Plugin$15 as Clockpicker, Plugin$17 as Collapse, ConfigComponent as ConfigProgrammatic, Plugin$13 as Datepicker, Plugin$11 as Datetimepicker, Plugin$$ as Dialog, DialogProgrammatic, Plugin$Z as Dropdown, Plugin$X as Field, Plugin$V as Icon, Plugin$T as Image, Plugin$R as Input, Plugin$P as Loading, LoadingProgrammatic, Plugin$N as Menu, Plugin$L as Message, Plugin$J as Modal, ModalProgrammatic, Plugin$F as Navbar, Plugin$H as Notification, NotificationProgrammatic, Plugin$D as Numberinput, Plugin$B as Pagination, Plugin$z as Progress, Plugin$x as Radio, Plugin$v as Rate, Plugin$t as Select, Plugin$p as Sidebar, Plugin$r as Skeleton, Plugin$n as Slider, Plugin$l as Snackbar, SnackbarProgrammatic, Plugin$j as Steps, Plugin$h as Switch, Plugin$f as Table, Plugin$d as Tabs, Plugin$b as Tag, Plugin$9 as Taginput, Plugin$7 as Timepicker, Plugin$5 as Toast, ToastProgrammatic, Plugin$3 as Tooltip, Plugin$1 as Upload, bound, createAbsoluteElement, createNewEvent, Buefy as default, escapeRegExpChars, getComponentFromVNode, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isFragment, isMobile, isTag, isVueComponent, isWebpSupported, matchWithGroups, merge, mod, multiColumnSort, removeElement, sign, toCssWidth };
