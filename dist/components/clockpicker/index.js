/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Clockpicker = {}, global.Vue));
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

    function isTag(vnode) {
      return vnode.type !== vue.Comment && vnode.type !== vue.Text && vnode.type !== vue.Static;
    } // TODO: too much dependence of Vue's internal structure?

    var AM = 'AM';
    var PM = 'PM';
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
              return "((?!=<".concat(part.type, ">)(").concat(vm.amString, "|").concat(vm.pmString, "|").concat(AM, "|").concat(PM, "|").concat(AM.toLowerCase(), "|").concat(PM.toLowerCase(), ")?)");
            }

            return "((?!=<".concat(part.type, ">)\\d+)");
          }).join('');
          var timeGroups = matchWithGroups(formatRegex, timeString); // We do a simple validation for the group.
          // If it is not valid, it will fallback to Date.parse below

          timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour, 10) : null;
          timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute, 10) : null;
          timeGroups.second = timeGroups.second ? parseInt(timeGroups.second, 10) : null;

          if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
            if (timeGroups.dayPeriod && (timeGroups.dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || timeGroups.dayPeriod.toLowerCase() === PM.toLowerCase()) && timeGroups.hour < 12) {
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
          am = dateString12[1] === vm.amString || dateString12[1] === AM;
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
          AM: AM,
          PM: PM,
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
            if (value === this.pmString || value === PM) {
              this.hoursSelected += 12;
            } else if (value === this.amString || value === AM) {
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

    var script$7 = {
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

    function render$6(_ctx, _cache, $props, $setup, $data, $options) {
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

    script$7.render = render$6;
    script$7.__file = "src/components/dropdown/Dropdown.vue";

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

    var script$6 = {
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

    const _hoisted_1$3 = {
      key: 0,
      class: "dropdown-divider"
    };

    function render$5(_ctx, _cache, $props, $setup, $data, $options) {
      return ($props.separator)
        ? (vue.openBlock(), vue.createBlock("hr", _hoisted_1$3))
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

    script$6.render = render$5;
    script$6.__file = "src/components/dropdown/DropdownItem.vue";

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

    var script$5 = {
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

    function render$4(_ctx, _cache, $props, $setup, $data, $options) {
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

    script$5.render = render$4;
    script$5.__file = "src/components/icon/Icon.vue";

    var script$4 = {
        name: 'BInput',
        components: {
            [script$5.name]: script$5
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

    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
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

    script$4.render = render$3;
    script$4.__file = "src/components/input/Input.vue";

    var script$3 = {
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

    script$3.__file = "src/components/field/FieldBody.vue";

    var script$2 = {
        name: 'BField',
        components: {
            [script$3.name]: script$3
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

    const _hoisted_1$2 = {
      key: 3,
      class: "field-body"
    };

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$2, [
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

    script$2.render = render$2;
    script$2.__file = "src/components/field/Field.vue";

    // These should match the variables in clockpicker.scss
    const indicatorSize = 40;
    const paddingInner = 5;

    var script$1 = {
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

    const _hoisted_1$1 = {
      class: "b-clockpicker-face-outer-ring",
      ref: "clock"
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createBlock("div", {
        class: "b-clockpicker-face",
        onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.onMouseDown && $options.onMouseDown(...args))),
        onMouseup: _cache[2] || (_cache[2] = (...args) => ($options.onMouseUp && $options.onMouseUp(...args))),
        onMousemove: _cache[3] || (_cache[3] = (...args) => ($options.onDragMove && $options.onDragMove(...args))),
        onTouchstart: _cache[4] || (_cache[4] = (...args) => ($options.onMouseDown && $options.onMouseDown(...args))),
        onTouchend: _cache[5] || (_cache[5] = (...args) => ($options.onMouseUp && $options.onMouseUp(...args))),
        onTouchmove: _cache[6] || (_cache[6] = (...args) => ($options.onDragMove && $options.onDragMove(...args)))
      }, [
        vue.createVNode("div", _hoisted_1$1, [
          vue.createVNode("div", {
            class: "b-clockpicker-face-hand",
            style: $options.handStyle
          }, null, 4 /* STYLE */),
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.faceNumbers, (num, index) => {
            return (vue.openBlock(), vue.createBlock("span", {
              key: index,
              class: ["b-clockpicker-face-number", $options.getFaceNumberClasses(num)],
              style: { transform: $options.getNumberTranslate(num.value) }
            }, [
              vue.createVNode("span", null, vue.toDisplayString(num.label), 1 /* TEXT */)
            ], 6 /* CLASS, STYLE */))
          }), 128 /* KEYED_FRAGMENT */))
        ], 512 /* NEED_PATCH */)
      ], 32 /* HYDRATE_EVENTS */))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/clockpicker/ClockpickerFace.vue";

    const outerPadding = 12;

    var script = {
        name: 'BClockpicker',
        components: {
            [script$1.name]: script$1,
            [script$4.name]: script$4,
            [script$2.name]: script$2,
            [script$5.name]: script$5,
            [script$7.name]: script$7,
            [script$6.name]: script$6
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

    const _hoisted_1 = {
      key: 0,
      class: "card-header"
    };
    const _hoisted_2 = { class: "b-clockpicker-header card-header-title" };
    const _hoisted_3 = { class: "b-clockpicker-time" };
    const _hoisted_4 = {
      key: 0,
      class: "b-clockpicker-period"
    };
    const _hoisted_5 = { class: "card-content" };
    const _hoisted_6 = {
      key: 0,
      class: "b-clockpicker-time"
    };
    const _hoisted_7 = {
      key: 1,
      class: "b-clockpicker-period"
    };
    const _hoisted_8 = {
      key: 1,
      class: "b-clockpicker-footer card-footer"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_input = vue.resolveComponent("b-input");
      const _component_b_clockpicker_face = vue.resolveComponent("b-clockpicker-face");
      const _component_b_dropdown = vue.resolveComponent("b-dropdown");

      return (vue.openBlock(), vue.createBlock("div", {
        class: ["b-clockpicker control", [_ctx.size, $props.type, {'is-expanded': _ctx.expanded}]]
      }, [
        (!_ctx.isMobile || _ctx.inline)
          ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
              key: 0,
              ref: "dropdown",
              position: _ctx.position,
              disabled: _ctx.disabledOrUndefined,
              inline: _ctx.inline,
              "append-to-body": _ctx.appendToBody,
              "append-to-body-copy-parent": "",
              onActiveChange: _ctx.onActiveChange
            }, vue.createSlots({
              default: vue.withCtx(() => [
                vue.createVNode("div", {
                  class: "card",
                  disabled: _ctx.disabledOrUndefined,
                  custom: ""
                }, [
                  (_ctx.inline)
                    ? (vue.openBlock(), vue.createBlock("header", _hoisted_1, [
                        vue.createVNode("div", _hoisted_2, [
                          vue.createVNode("div", _hoisted_3, [
                            vue.createVNode("span", {
                              class: ["b-clockpicker-btn", { active: $data.isSelectingHour }],
                              onClick: _cache[5] || (_cache[5] = $event => ($data.isSelectingHour = true))
                            }, vue.toDisplayString($options.hoursDisplay), 3 /* TEXT, CLASS */),
                            vue.createVNode("span", null, vue.toDisplayString(_ctx.hourLiteral), 1 /* TEXT */),
                            vue.createVNode("span", {
                              class: ["b-clockpicker-btn", { active: !$data.isSelectingHour }],
                              onClick: _cache[6] || (_cache[6] = $event => ($data.isSelectingHour = false))
                            }, vue.toDisplayString($options.minutesDisplay), 3 /* TEXT, CLASS */)
                          ]),
                          (!_ctx.isHourFormat24)
                            ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, [
                                vue.createVNode("div", {
                                  class: ["b-clockpicker-btn", {
                                        active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                                    }],
                                  onClick: _cache[7] || (_cache[7] = $event => ($options.onMeridienClick(_ctx.amString)))
                                }, vue.toDisplayString(_ctx.amString), 3 /* TEXT, CLASS */),
                                vue.createVNode("div", {
                                  class: ["b-clockpicker-btn", {
                                        active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                                    }],
                                  onClick: _cache[8] || (_cache[8] = $event => ($options.onMeridienClick(_ctx.pmString)))
                                }, vue.toDisplayString(_ctx.pmString), 3 /* TEXT, CLASS */)
                              ]))
                            : vue.createCommentVNode("v-if", true)
                        ])
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  vue.createVNode("div", _hoisted_5, [
                    vue.createVNode("div", {
                      class: "b-clockpicker-body",
                      style: { width: $options.faceSize + 'px', height: $options.faceSize + 'px' }
                    }, [
                      (!_ctx.inline)
                        ? (vue.openBlock(), vue.createBlock("div", _hoisted_6, [
                            vue.createVNode("div", {
                              class: ["b-clockpicker-btn", { active: $data.isSelectingHour }],
                              onClick: _cache[9] || (_cache[9] = $event => ($data.isSelectingHour = true))
                            }, vue.toDisplayString($props.hoursLabel), 3 /* TEXT, CLASS */),
                            vue.createVNode("span", {
                              class: ["b-clockpicker-btn", { active: !$data.isSelectingHour }],
                              onClick: _cache[10] || (_cache[10] = $event => ($data.isSelectingHour = false))
                            }, vue.toDisplayString($props.minutesLabel), 3 /* TEXT, CLASS */)
                          ]))
                        : vue.createCommentVNode("v-if", true),
                      (!_ctx.isHourFormat24 && !_ctx.inline)
                        ? (vue.openBlock(), vue.createBlock("div", _hoisted_7, [
                            vue.createVNode("div", {
                              class: ["b-clockpicker-btn", {
                                        active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                                    }],
                              onClick: _cache[11] || (_cache[11] = $event => ($options.onMeridienClick(_ctx.amString)))
                            }, vue.toDisplayString(_ctx.amString), 3 /* TEXT, CLASS */),
                            vue.createVNode("div", {
                              class: ["b-clockpicker-btn", {
                                        active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                                    }],
                              onClick: _cache[12] || (_cache[12] = $event => ($options.onMeridienClick(_ctx.pmString)))
                            }, vue.toDisplayString(_ctx.pmString), 3 /* TEXT, CLASS */)
                          ]))
                        : vue.createCommentVNode("v-if", true),
                      vue.createVNode(_component_b_clockpicker_face, {
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
                    ? (vue.openBlock(), vue.createBlock("footer", _hoisted_8, [
                        vue.renderSlot(_ctx.$slots, "default")
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ], 8 /* PROPS */, ["disabled"])
              ]),
              _: 2 /* DYNAMIC */
            }, [
              (!_ctx.inline)
                ? {
                    name: "trigger",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "trigger", {}, () => [
                        vue.createVNode(_component_b_input, vue.mergeProps({
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
                          onClick: _cache[1] || (_cache[1] = vue.withModifiers($event => (_ctx.toggle(true)), ["stop"])),
                          onKeyup: _cache[2] || (_cache[2] = vue.withKeys($event => (_ctx.toggle(true)), ["enter"])),
                          onChange: _cache[3] || (_cache[3] = $event => (_ctx.onChange($event.target.value))),
                          onFocus: _ctx.handleOnFocus,
                          onBlur: _cache[4] || (_cache[4] = $event => (_ctx.checkHtml5Validity()))
                        }), null, 16 /* FULL_PROPS */, ["value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])
                      ])
                    ])
                  }
                : undefined
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["position", "disabled", "inline", "append-to-body", "onActiveChange"]))
          : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
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
              onClick: _cache[13] || (_cache[13] = vue.withModifiers($event => (_ctx.toggle(true)), ["stop"])),
              onKeyup: _cache[14] || (_cache[14] = vue.withKeys($event => (_ctx.toggle(true)), ["enter"])),
              onChange: _ctx.onChangeNativePicker,
              onFocus: _ctx.handleOnFocus,
              onBlur: _cache[15] || (_cache[15] = $event => (_ctx.onBlur() && _ctx.checkHtml5Validity()))
            }), null, 16 /* FULL_PROPS */, ["value", "placeholder", "size", "icon", "icon-pack", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus"]))
      ], 2 /* CLASS */))
    }

    script.render = render;
    script.__file = "src/components/clockpicker/Clockpicker.vue";

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

    exports.BClockpicker = script;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
