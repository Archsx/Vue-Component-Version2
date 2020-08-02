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
    this.$children.forEach((vm) => {
      // 查找TabHead组件
      if (vm.$options.name === "TabsHead") {
        // 查找被选中的TabItem组件
        vm.$children.forEach((item) => {
          if (item.$options.name === "TabsItem" && item.name === this.selected) {
            this.eventBus.$emit("update:selected", this.selected, item);
          }
        });
      }
    });
  },
};
</script>

<style></style>
