<template>
    <label
        class="switch"
        :class="newClass"
        ref="label"
        :disabled="disabledOrUndefined"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseout="isMouseDown = false"
        @blur="isMouseDown = false"
    >
        <input
            v-model="computedValue"
            type="checkbox"
            ref="input"
            @click.stop
            :disabled="disabledOrUndefined"
            :name="name"
            :required="required"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue"
        >
        <span
            class="check"
            :class="checkClasses"
        />
        <span class="control-label"><slot /></span>
    </label>
</template>

<script>
import config from '../../utils/config'

export default {
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
                this.newValue = value
                this.$emit('update:modelValue', value)
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
            this.newValue = value
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
        }
    }
}
</script>
