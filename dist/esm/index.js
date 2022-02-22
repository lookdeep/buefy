import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import Plugin$2 from './carousel.js';
export { default as Carousel } from './carousel.js';
import Plugin$3 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$5 from './collapse.js';
export { default as Collapse } from './collapse.js';
import Plugin$4 from './clockpicker.js';
export { default as Clockpicker } from './clockpicker.js';
import Plugin$6 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import Plugin$7 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import Plugin$8 from './dialog.js';
export { default as Dialog, DialogProgrammatic } from './dialog.js';
import Plugin$9 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$a from './field.js';
export { default as Field } from './field.js';
import Plugin$b from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$c from './image.js';
export { default as Image } from './image.js';
import Plugin$d from './input.js';
export { default as Input } from './input.js';
import Plugin$e from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$f from './menu.js';
export { default as Menu } from './menu.js';
import Plugin$g from './message.js';
export { default as Message } from './message.js';
import Plugin$h from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import Plugin$j from './notification.js';
export { default as Notification, NotificationProgrammatic } from './notification.js';
import Plugin$i from './navbar.js';
export { default as Navbar } from './navbar.js';
import Plugin$k from './numberinput.js';
export { default as Numberinput } from './numberinput.js';
import Plugin$l from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$m from './progress.js';
export { default as Progress } from './progress.js';
import Plugin$n from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$o from './rate.js';
export { default as Rate } from './rate.js';
import Plugin$p from './select.js';
export { default as Select } from './select.js';
import Plugin$q from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$r from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import Plugin$s from './slider.js';
export { default as Slider } from './slider.js';
import Plugin$t from './snackbar.js';
export { default as Snackbar, SnackbarProgrammatic } from './snackbar.js';
import Plugin$u from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$v from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$w from './table.js';
export { default as Table } from './table.js';
import Plugin$x from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$y from './tag.js';
export { default as Tag } from './tag.js';
import Plugin$z from './taginput.js';
export { default as Taginput } from './taginput.js';
import Plugin$A from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$B from './toast.js';
export { default as Toast, ToastProgrammatic } from './toast.js';
import Plugin$C from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$D from './upload.js';
export { default as Upload } from './upload.js';
import { m as merge } from './helpers-2263d431.js';
export { b as bound, d as createAbsoluteElement, k as createNewEvent, f as escapeRegExpChars, x as getComponentFromVNode, l as getMonthNames, g as getValueByPath, n as getWeekdayNames, h as hasFlag, i as indexOf, q as isCustomElement, u as isDefined, v as isFragment, c as isMobile, w as isTag, e as isVueComponent, p as isWebpSupported, o as matchWithGroups, m as merge, a as mod, j as multiColumnSort, r as removeElement, s as sign, t as toCssWidth } from './helpers-2263d431.js';
import { s as setOptions, c as config } from './config-1ce4c54c.js';
import { u as use, r as registerComponentProgrammatic } from './plugins-9a909142.js';
import ConfigComponent from './config.js';
export { default as ConfigProgrammatic } from './config.js';
import './Autocomplete-40982d73.js';
import './FormElementMixin-55920052.js';
import './Input-82ba71aa.js';
import './Icon-fefef9ed.js';
import 'vue';
import './InjectedChildMixin-eb1af2ee.js';
import './Checkbox-a8233508.js';
import './CheckRadioMixin-43df7c28.js';
import './TimepickerMixin-885a12ae.js';
import './DropdownItem-2d055f53.js';
import './trapFocus-d876d41a.js';
import './Field-bdc7266c.js';
import './Datepicker-4ee10a50.js';
import './Select-2621b3e3.js';
import './Timepicker-d2192189.js';
import './Modal-5ebd467f.js';
import './Loading-9476d683.js';
import './ssr-44a76b0e.js';
import './MessageMixin-335a0a64.js';
import './NoticeMixin-66c3d0b2.js';
import './typeof-6c6d8d7a.js';
import './Pagination-aa3b2cba.js';
import './Tooltip-de1ce9fa.js';
import './TabbedChildMixin-bdf09624.js';
import './SlotComponent-bdb2e93f.js';
import './Tag-89b086b9.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: Plugin,
    Button: Plugin$1,
    Carousel: Plugin$2,
    Checkbox: Plugin$3,
    Clockpicker: Plugin$4,
    Collapse: Plugin$5,
    Datepicker: Plugin$6,
    Datetimepicker: Plugin$7,
    Dialog: Plugin$8,
    Dropdown: Plugin$9,
    Field: Plugin$a,
    Icon: Plugin$b,
    Image: Plugin$c,
    Input: Plugin$d,
    Loading: Plugin$e,
    Menu: Plugin$f,
    Message: Plugin$g,
    Modal: Plugin$h,
    Navbar: Plugin$i,
    Notification: Plugin$j,
    Numberinput: Plugin$k,
    Pagination: Plugin$l,
    Progress: Plugin$m,
    Radio: Plugin$n,
    Rate: Plugin$o,
    Select: Plugin$p,
    Skeleton: Plugin$q,
    Sidebar: Plugin$r,
    Slider: Plugin$s,
    Snackbar: Plugin$t,
    Steps: Plugin$u,
    Switch: Plugin$v,
    Table: Plugin$w,
    Tabs: Plugin$x,
    Tag: Plugin$y,
    Taginput: Plugin$z,
    Timepicker: Plugin$A,
    Toast: Plugin$B,
    Tooltip: Plugin$C,
    Upload: Plugin$D
});

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

export { Buefy as default };
