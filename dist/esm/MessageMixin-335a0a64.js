import { _ as _defineProperty } from './helpers-2263d431.js';
import { s as script } from './Icon-fefef9ed.js';

var MessageMixin = {
  components: _defineProperty({}, script.name, script),
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

export { MessageMixin as M };
