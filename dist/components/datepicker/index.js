/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Datepicker = {}, global.Vue));
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

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
          return _objectSpread$1(_objectSpread$1({}, a), b);
        }, {});
        return _objectSpread$1(_objectSpread$1({}, target), replaced);
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
    function isCustomElement(vm) {
      return 'shadowRoot' in vm.$root.$options;
    }
    var isDefined = function isDefined(d) {
      return d !== undefined;
    };

    function isTag(vnode) {
      return vnode.type !== vue.Comment && vnode.type !== vue.Text && vnode.type !== vue.Static;
    } // TODO: too much dependence of Vue's internal structure?

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

    var beforeMount = function beforeMount(el, _ref) {
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

    var unmounted = function unmounted(el) {
      el.removeEventListener('keydown', onKeyDown);
    };

    var directive = {
      beforeMount: beforeMount,
      unmounted: unmounted
    };
    var trapFocus = directive;

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var items = 1;
    var sorted$1 = 3;
    var ProviderParentMixin = (function (itemName) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var mixin = {
        provide: function provide() {
          return _defineProperty({}, 'b' + itemName, this);
        }
      };

      if (hasFlag(flags, items)) {
        mixin.data = function () {
          return _objectSpread({
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

    const DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];

    var script$a = {
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

    function render$9(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_trap_focus = vue.resolveDirective("trap-focus");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["dropdown dropdown-menu-animation", $options.rootClasses],
        ref: "dropdown"
      }, [
        (!$props.inline)
          ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              role: "button",
              ref: "trigger",
              class: "dropdown-trigger",
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
              onContextmenu: _cache[2] || (_cache[2] = vue.withModifiers((...args) => ($options.onContextMenu && $options.onContextMenu(...args)), ["prevent"])),
              onMouseenter: _cache[3] || (_cache[3] = (...args) => ($options.onHover && $options.onHover(...args))),
              onFocusCapture: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              "aria-haspopup": "true"
            }, [
              vue.renderSlot(_ctx.$slots, "trigger", { active: $data.isActive })
            ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode(vue.Transition, { name: $props.animation }, {
          default: vue.withCtx(() => [
            ($options.isMobileModal)
              ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
                  key: 0,
                  class: "background",
                  "aria-hidden": !$data.isActive
                }, null, 8 /* PROPS */, ["aria-hidden"])), [
                  [vue.vShow, $data.isActive]
                ])
              : vue.createCommentVNode("v-if", true)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["name"]),
        vue.createVNode(vue.Transition, { name: $props.animation }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("div", {
              ref: "dropdownMenu",
              class: "dropdown-menu",
              style: $data.style,
              "aria-hidden": !$data.isActive
            }, [
              vue.createVNode("div", {
                class: "dropdown-content",
                role: $props.ariaRole,
                style: $options.contentStyle
              }, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 12 /* STYLE, PROPS */, ["role"])
            ], 12 /* STYLE, PROPS */, ["aria-hidden"]), [
              [vue.vShow, (!$props.disabled && ($data.isActive || $data.isHoverable)) || $props.inline],
              [_directive_trap_focus, $props.trapFocus]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["name"])
      ], 2 /* CLASS */))
    }

    script$a.render = render$9;
    script$a.__file = "src/components/dropdown/Dropdown.vue";

    var sorted = 1;
    var optional = 2;
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

    var script$9 = {
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

    const _hoisted_1$6 = {
      key: 0,
      class: "dropdown-divider"
    };

    function render$8(_ctx, _cache, $props, $setup, $data, $options) {
      return ($props.separator)
        ? (vue.openBlock(), vue.createBlock("hr", _hoisted_1$6))
        : (!$props.custom && !$props.hasLink)
          ? (vue.openBlock(), vue.createBlock("a", {
              key: 1,
              class: ["dropdown-item", $options.anchorClasses],
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.selectItem && $options.selectItem(...args))),
              role: $options.ariaRoleItem,
              tabindex: $options.isFocusable ? 0 : null
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
          : (vue.openBlock(), vue.createBlock("div", {
              key: 2,
              class: $options.itemClasses,
              onClick: _cache[2] || (_cache[2] = (...args) => ($options.selectItem && $options.selectItem(...args))),
              role: $options.ariaRoleItem,
              tabindex: $options.isFocusable ? 0 : null
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, ["role", "tabindex"]))
    }

    script$9.render = render$8;
    script$9.__file = "src/components/dropdown/DropdownItem.vue";

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

    var script$8 = {
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

    function render$7(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("span", {
        class: ["icon", [$options.newType, $props.size]]
      }, [
        (!$options.useIconComponent)
          ? (vue.openBlock(), vue.createBlock("i", {
              key: 0,
              class: [$options.newPack, $options.newIcon, $options.newCustomSize, $props.customClass]
            }, null, 2 /* CLASS */))
          : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.useIconComponent), {
              key: 1,
              icon: [$options.newPack, $options.newIcon],
              size: $options.newCustomSize,
              class: [$props.customClass]
            }, null, 8 /* PROPS */, ["icon", "size", "class"]))
      ], 2 /* CLASS */))
    }

    script$8.render = render$7;
    script$8.__file = "src/components/icon/Icon.vue";

    var script$7 = {
        name: 'BInput',
        components: {
            [script$8.name]: script$8
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

    function render$6(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["control", $options.rootClasses]
      }, [
        ($props.type !== 'textarea')
          ? (vue.openBlock(), vue.createBlock("input", vue.mergeProps({
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
          : (vue.openBlock(), vue.createBlock("textarea", vue.mergeProps({
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
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 2,
              class: ["is-left", {'is-clickable': $props.iconClickable}],
              icon: _ctx.icon,
              pack: _ctx.iconPack,
              size: _ctx.iconSize,
              onClick: _cache[9] || (_cache[9] = $event => ($options.iconClick('icon-click', $event)))
            }, null, 8 /* PROPS */, ["class", "icon", "pack", "size"]))
          : vue.createCommentVNode("v-if", true),
        (!_ctx.loading && $options.hasIconRight)
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 3,
              class: ["is-right", { 'is-clickable': $props.passwordReveal || $props.iconRightClickable }],
              icon: $options.rightIcon,
              pack: _ctx.iconPack,
              size: _ctx.iconSize,
              type: $options.rightIconType,
              both: "",
              onClick: $options.rightIconClick
            }, null, 8 /* PROPS */, ["class", "icon", "pack", "size", "type", "onClick"]))
          : vue.createCommentVNode("v-if", true),
        (_ctx.maxlength && $props.hasCounter && $props.type !== 'number')
          ? (vue.openBlock(), vue.createBlock("small", {
              key: 4,
              class: ["help counter", { 'is-invisible': !_ctx.isFocused }]
            }, vue.toDisplayString($options.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength), 3 /* TEXT, CLASS */))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    }

    script$7.render = render$6;
    script$7.__file = "src/components/input/Input.vue";

    var script$6 = {
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

    script$6.__file = "src/components/field/FieldBody.vue";

    var script$5 = {
        name: 'BField',
        components: {
            [script$6.name]: script$6
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

    const _hoisted_1$5 = {
      key: 3,
      class: "field-body"
    };

    function render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$5, [
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

    script$5.render = render$5;
    script$5.__file = "src/components/field/Field.vue";

    var script$4 = {
        name: 'BSelect',
        components: {
            [script$8.name]: script$8
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

    const _hoisted_1$4 = {
      key: 0,
      value: null,
      disabled: "",
      hidden: ""
    };

    function render$4(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["control", { 'is-expanded': _ctx.expanded, 'has-icons-left': _ctx.icon }]
      }, [
        vue.createVNode("span", {
          class: ["select", $options.spanClasses]
        }, [
          vue.withDirectives(vue.createVNode("select", vue.mergeProps({
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($options.computedValue = $event)),
            ref: "select",
            multiple: $props.multiple,
            size: $props.nativeSize
          }, _ctx.$attrs, {
            onBlur: _cache[2] || (_cache[2] = $event => (_ctx.$emit('blur', $event) && _ctx.checkHtml5Validity())),
            onFocus: _cache[3] || (_cache[3] = $event => (_ctx.$emit('focus', $event)))
          }), [
            ($props.placeholder)
              ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                  ($options.computedValue == null)
                    ? (vue.openBlock(), vue.createBlock("option", _hoisted_1$4, vue.toDisplayString($props.placeholder), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true)
                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
              : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "default")
          ], 16 /* FULL_PROPS */, ["multiple", "size"]), [
            [vue.vModelSelect, $options.computedValue]
          ])
        ], 2 /* CLASS */),
        (_ctx.icon)
          ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 0,
              class: "is-left",
              icon: _ctx.icon,
              pack: _ctx.iconPack,
              size: _ctx.iconSize
            }, null, 8 /* PROPS */, ["icon", "pack", "size"]))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    }

    script$4.render = render$4;
    script$4.__file = "src/components/select/Select.vue";

    var script$3 = {
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

    const _hoisted_1$3 = { class: "datepicker-row" };
    const _hoisted_2$3 = {
      key: 0,
      class: "events"
    };
    const _hoisted_3$2 = {
      key: 0,
      class: "events"
    };

    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [
        ($props.showWeekNumber)
          ? (vue.openBlock(), vue.createBlock("a", {
              key: 0,
              class: ["datepicker-cell is-week-number", {'is-clickable': $props.weekNumberClickable }],
              onClick: _cache[1] || (_cache[1] = vue.withModifiers($event => ($options.clickWeekNumber($options.getWeekNumber($props.week[6]))), ["prevent"]))
            }, [
              vue.createVNode("span", null, vue.toDisplayString($options.getWeekNumber($props.week[6])), 1 /* TEXT */)
            ], 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.week, (weekDay, index) => {
          return (vue.openBlock(), vue.createBlock(vue.Fragment, { key: index }, [
            ($options.selectableDate(weekDay) && !$props.disabled)
              ? (vue.openBlock(), vue.createBlock("a", {
                  key: 0,
                  ref: `day-${weekDay.getMonth()}-${weekDay.getDate()}`,
                  class: [$options.classObject(weekDay), "datepicker-cell"],
                  role: "button",
                  href: "#",
                  disabled: $props.disabled,
                  onClick: vue.withModifiers($event => ($options.emitChosenDate(weekDay)), ["prevent"]),
                  onMouseenter: $event => ($options.setRangeHoverEndDate(weekDay)),
                  onKeydown: $event => ($options.manageKeydown($event, weekDay)),
                  tabindex: $props.day === weekDay.getDate() ? null : -1
                }, [
                  vue.createVNode("span", null, vue.toDisplayString(weekDay.getDate()), 1 /* TEXT */),
                  ($options.eventsDateMatch(weekDay))
                    ? (vue.openBlock(), vue.createBlock("div", _hoisted_2$3, [
                        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.eventsDateMatch(weekDay), (event, evIdx) => {
                          return (vue.openBlock(), vue.createBlock("div", {
                            class: ["event", event.type],
                            key: evIdx
                          }, null, 2 /* CLASS */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"]))
              : (vue.openBlock(), vue.createBlock("div", {
                  key: 1,
                  class: [$options.classObject(weekDay), "datepicker-cell"]
                }, [
                  vue.createVNode("span", null, vue.toDisplayString(weekDay.getDate()), 1 /* TEXT */),
                  ($options.eventsDateMatch(weekDay))
                    ? (vue.openBlock(), vue.createBlock("div", _hoisted_3$2, [
                        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.eventsDateMatch(weekDay), (event, evIdx) => {
                          return (vue.openBlock(), vue.createBlock("div", {
                            class: ["event", event.type],
                            key: evIdx
                          }, null, 2 /* CLASS */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
          ], 64 /* STABLE_FRAGMENT */))
        }), 128 /* KEYED_FRAGMENT */))
      ]))
    }

    script$3.render = render$3;
    script$3.__file = "src/components/datepicker/DatepickerTableRow.vue";

    var script$2 = {
        name: 'BDatepickerTable',
        components: {
            [script$3.name]: script$3
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

    const _hoisted_1$2 = { class: "datepicker-table" };
    const _hoisted_2$2 = { class: "datepicker-header" };

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_datepicker_table_row = vue.resolveComponent("b-datepicker-table-row");

      return (vue.openBlock(), vue.createBlock("section", _hoisted_1$2, [
        vue.createVNode("header", _hoisted_2$2, [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.visibleDayNames, (day, index) => {
            return (vue.openBlock(), vue.createBlock("div", {
              key: index,
              class: "datepicker-cell"
            }, [
              vue.createVNode("span", null, vue.toDisplayString(day), 1 /* TEXT */)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        vue.createVNode("div", {
          class: ["datepicker-body", {'has-events':$options.hasEvents}]
        }, [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.weeksInThisMonth, (week, index) => {
            return (vue.openBlock(), vue.createBlock(_component_b_datepicker_table_row, {
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

    script$2.render = render$2;
    script$2.__file = "src/components/datepicker/DatepickerTable.vue";

    var script$1 = {
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

    const _hoisted_1$1 = { class: "datepicker-table" };
    const _hoisted_2$1 = { class: "datepicker-months" };
    const _hoisted_3$1 = {
      key: 0,
      class: "events"
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("section", _hoisted_1$1, [
        vue.createVNode("div", {
          class: ["datepicker-body", {'has-events':$options.hasEvents}]
        }, [
          vue.createVNode("div", _hoisted_2$1, [
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.monthDates, (date, index) => {
              return (vue.openBlock(), vue.createBlock(vue.Fragment, { key: index }, [
                ($options.selectableDate(date) && !$props.disabled)
                  ? (vue.openBlock(), vue.createBlock("a", {
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
                      onClick: vue.withModifiers($event => ($options.updateSelectedDate(date)), ["prevent"]),
                      onMouseenter: $event => ($options.setRangeHoverEndDate(date)),
                      onKeydown: vue.withModifiers($event => ($options.manageKeydown($event, date)), ["prevent"]),
                      tabindex: $props.focused.month === date.getMonth() ? null : -1
                    }, [
                      vue.createTextVNode(vue.toDisplayString($props.monthNames[date.getMonth()]) + " ", 1 /* TEXT */),
                      ($options.eventsDateMatch(date))
                        ? (vue.openBlock(), vue.createBlock("div", _hoisted_3$1, [
                            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.eventsDateMatch(date), (event, evIdx) => {
                              return (vue.openBlock(), vue.createBlock("div", {
                                class: ["event", event.type],
                                key: evIdx
                              }, null, 2 /* CLASS */))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]))
                        : vue.createCommentVNode("v-if", true)
                    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"]))
                  : (vue.openBlock(), vue.createBlock("div", {
                      key: 1,
                      class: [$options.classObject(date), "datepicker-cell"]
                    }, vue.toDisplayString($props.monthNames[date.getMonth()]), 3 /* TEXT, CLASS */))
              ], 64 /* STABLE_FRAGMENT */))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 2 /* CLASS */)
      ]))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/datepicker/DatepickerMonth.vue";

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

    var script = {
        name: 'BDatepicker',
        components: {
            [script$2.name]: script$2,
            [script$1.name]: script$1,
            [script$7.name]: script$7,
            [script$5.name]: script$5,
            [script$4.name]: script$4,
            [script$8.name]: script$8,
            [script$a.name]: script$a,
            [script$9.name]: script$9
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

    const _hoisted_1 = { class: "datepicker-header" };
    const _hoisted_2 = { class: "pagination-list" };
    const _hoisted_3 = { key: 1 };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_input = vue.resolveComponent("b-input");
      const _component_b_icon = vue.resolveComponent("b-icon");
      const _component_b_select = vue.resolveComponent("b-select");
      const _component_b_field = vue.resolveComponent("b-field");
      const _component_b_datepicker_table = vue.resolveComponent("b-datepicker-table");
      const _component_b_datepicker_month = vue.resolveComponent("b-datepicker-month");
      const _component_b_dropdown_item = vue.resolveComponent("b-dropdown-item");
      const _component_b_dropdown = vue.resolveComponent("b-dropdown");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["datepicker control", [_ctx.size, {'is-expanded': _ctx.expanded}]]
      }, [
        (!$options.isMobile || $props.inline)
          ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
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
            }, vue.createSlots({
              default: vue.withCtx(() => [
                vue.createVNode(_component_b_dropdown_item, {
                  disabled: $options.disabledOrUndefined,
                  focusable: $props.focusable,
                  custom: "",
                  class: {'dropdown-horizonal-timepicker': $props.horizontalTimePicker}
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode("div", null, [
                      vue.createVNode("header", _hoisted_1, [
                        (_ctx.$slots.header !== undefined)
                          ? vue.renderSlot(_ctx.$slots, "header", { key: 0 })
                          : (vue.openBlock(), vue.createBlock("div", {
                              key: 1,
                              class: ["pagination field is-centered", _ctx.size]
                            }, [
                              vue.withDirectives(vue.createVNode("a", {
                                class: "pagination-previous",
                                role: "button",
                                href: "#",
                                disabled: $options.disabledOrUndefined,
                                "aria-label": $props.ariaPreviousLabel,
                                onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => ($options.prev && $options.prev(...args)), ["prevent"])),
                                onKeydown: [
                                  _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => ($options.prev && $options.prev(...args)), ["prevent"]), ["enter"])),
                                  _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => ($options.prev && $options.prev(...args)), ["prevent"]), ["space"]))
                                ]
                              }, [
                                vue.createVNode(_component_b_icon, {
                                  icon: $props.iconPrev,
                                  pack: _ctx.iconPack,
                                  both: "",
                                  type: "is-primary is-clickable"
                                }, null, 8 /* PROPS */, ["icon", "pack"])
                              ], 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label"]), [
                                [vue.vShow, !$options.showPrev && !$props.disabled]
                              ]),
                              vue.withDirectives(vue.createVNode("a", {
                                class: "pagination-next",
                                role: "button",
                                href: "#",
                                disabled: $options.disabledOrUndefined,
                                "aria-label": $props.ariaNextLabel,
                                onClick: _cache[6] || (_cache[6] = vue.withModifiers((...args) => ($options.next && $options.next(...args)), ["prevent"])),
                                onKeydown: [
                                  _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => ($options.next && $options.next(...args)), ["prevent"]), ["enter"])),
                                  _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => ($options.next && $options.next(...args)), ["prevent"]), ["space"]))
                                ]
                              }, [
                                vue.createVNode(_component_b_icon, {
                                  icon: $props.iconNext,
                                  pack: _ctx.iconPack,
                                  both: "",
                                  type: "is-primary is-clickable"
                                }, null, 8 /* PROPS */, ["icon", "pack"])
                              ], 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "aria-label"]), [
                                [vue.vShow, !$options.showNext && !$props.disabled]
                              ]),
                              vue.createVNode("div", _hoisted_2, [
                                vue.createVNode(_component_b_field, null, {
                                  default: vue.withCtx(() => [
                                    (!$options.isTypeMonth)
                                      ? (vue.openBlock(), vue.createBlock(_component_b_select, {
                                          key: 0,
                                          modelValue: $data.focusedDateData.month,
                                          "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ($data.focusedDateData.month = $event)),
                                          disabled: $options.disabledOrUndefined,
                                          size: _ctx.size
                                        }, {
                                          default: vue.withCtx(() => [
                                            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.listOfMonths, (month) => {
                                              return (vue.openBlock(), vue.createBlock("option", {
                                                value: month.index,
                                                key: month.name,
                                                disabled: month.disabled || undefined
                                              }, vue.toDisplayString(month.name), 9 /* TEXT, PROPS */, ["value", "disabled"]))
                                            }), 128 /* KEYED_FRAGMENT */))
                                          ]),
                                          _: 1 /* STABLE */
                                        }, 8 /* PROPS */, ["modelValue", "disabled", "size"]))
                                      : vue.createCommentVNode("v-if", true),
                                    vue.createVNode(_component_b_select, {
                                      modelValue: $data.focusedDateData.year,
                                      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ($data.focusedDateData.year = $event)),
                                      disabled: $options.disabledOrUndefined,
                                      size: _ctx.size
                                    }, {
                                      default: vue.withCtx(() => [
                                        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.listOfYears, (year) => {
                                          return (vue.openBlock(), vue.createBlock("option", {
                                            value: year,
                                            key: year
                                          }, vue.toDisplayString(year), 9 /* TEXT, PROPS */, ["value"]))
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
                        ? (vue.openBlock(), vue.createBlock("div", {
                            key: 0,
                            class: ["datepicker-content", {'content-horizonal-timepicker': $props.horizontalTimePicker}]
                          }, [
                            vue.createVNode(_component_b_datepicker_table, {
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
                        : (vue.openBlock(), vue.createBlock("div", _hoisted_3, [
                            vue.createVNode(_component_b_datepicker_month, {
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
                      ? (vue.openBlock(), vue.createBlock("footer", {
                          key: 0,
                          class: ["datepicker-footer", {'footer-horizontal-timepicker': $props.horizontalTimePicker}]
                        }, [
                          vue.renderSlot(_ctx.$slots, "default")
                        ], 2 /* CLASS */))
                      : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 3 /* FORWARDED */
                }, 8 /* PROPS */, ["disabled", "focusable", "class"])
              ]),
              _: 2 /* DYNAMIC */
            }, [
              (!$props.inline)
                ? {
                    name: "trigger",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "trigger", {}, () => [
                        vue.createVNode(_component_b_input, vue.mergeProps({
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
                          onKeyup: _cache[1] || (_cache[1] = vue.withKeys($event => ($options.togglePicker(true)), ["enter"])),
                          onChange: _cache[2] || (_cache[2] = $event => ($options.onChange($event.target.value))),
                          onFocus: $options.handleOnFocus
                        }), null, 16 /* FULL_PROPS */, ["model-value", "placeholder", "size", "icon", "icon-right", "icon-pack", "rounded", "loading", "disabled", "readonly", "onClick", "onFocus"])
                      ])
                    ])
                  }
                : undefined
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "aria-modal", "append-to-body", "onActiveChange"]))
          : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
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

    script.render = render;
    script.__file = "src/components/datepicker/Datepicker.vue";

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

    exports.BDatepicker = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
