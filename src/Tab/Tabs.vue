<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Tabs",
  provide() {
    this.eventBus = new Vue();
    return {
      eventBus: this.eventBus,
    };
  },
  props: {
    selected: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: "horizon",
      validator(value) {
        return ["horizon", "vertical"].includes(value);
      },
    },
  },
  mounted() {
      this.eventBus.$emit("update:selected", this.selected || this.$children[0].name);
  },
};
</script>

<style></style>
