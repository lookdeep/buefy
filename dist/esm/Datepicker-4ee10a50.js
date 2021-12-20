import { F as FormElementMixin } from './FormElementMixin-55920052.js';
import { u as isDefined, l as getMonthNames, n as getWeekdayNames, c as isMobile, o as matchWithGroups } from './helpers-2263d431.js';
import { c as config } from './config-1ce4c54c.js';
import { s as script$8, a as script$9 } from './DropdownItem-2d055f53.js';
import { s as script$4 } from './Input-82ba71aa.js';
import { s as script$5 } from './Field-bdc7266c.js';
import { s as script$6 } from './Select-2621b3e3.js';
import { s as script$7 } from './Icon-fefef9ed.js';
import { openBlock, createBlock, withModifiers, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, resolveComponent, createTextVNode, createSlots, withCtx, renderSlot, withDirectives, withKeys, vShow, mergeProps } from 'vue';

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
  return (openBlock(), createBlock("div", _hoisted_1$3, [
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
                ? (openBlock(), createBlock("div", _hoisted_2$3, [
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
                ? (openBlock(), createBlock("div", _hoisted_3$2, [
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
  const _component_b_datepicker_table_row = resolveComponent("b-datepicker-table-row");

  return (openBlock(), createBlock("section", _hoisted_1$2, [
    createVNode("header", _hoisted_2$2, [
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
  return (openBlock(), createBlock("section", _hoisted_1$1, [
    createVNode("div", {
      class: ["datepicker-body", {'has-events':$options.hasEvents}]
    }, [
      createVNode("div", _hoisted_2$1, [
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
                    ? (openBlock(), createBlock("div", _hoisted_3$1, [
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
        [script$4.name]: script$4,
        [script$5.name]: script$5,
        [script$6.name]: script$6,
        [script$7.name]: script$7,
        [script$8.name]: script$8,
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
                  createVNode("header", _hoisted_1, [
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
                          createVNode("div", _hoisted_2, [
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
                    : (openBlock(), createBlock("div", _hoisted_3, [
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

script.render = render;
script.__file = "src/components/datepicker/Datepicker.vue";

export { script as s };
