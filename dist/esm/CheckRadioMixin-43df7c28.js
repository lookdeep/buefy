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

export { CheckRadioMixin as C };
