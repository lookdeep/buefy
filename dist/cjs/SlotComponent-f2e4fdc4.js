'use strict';

var vue = require('vue');
var helpers = require('./helpers-0d6e2444.js');

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
    if (helpers.isVueComponent(this.component)) {
      this.component.$on(this.event, this.refresh);
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (helpers.isVueComponent(this.component)) {
      this.component.$off(this.event, this.refresh);
    }
  },
  render: function render() {
    return vue.h(this.tag, {}, this.scoped ? this.component.$slots[this.name](this.props) : this.component.$slots[this.name]());
  }
};

exports.SlotComponent = SlotComponent;
