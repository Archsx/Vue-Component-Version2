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
    if (!this.$children.length) {
      console &&
        console.warn &&
        console.warn("tabs的子组件应该是tabs-head和tabs-body,但你没有子组件");
    }
    this.$children.forEach((vm) => {
      // 查找TabHead组件
      if (vm.$options.name === "TabsHead") {
        // 查找被选中的TabItem组件
        vm.$children.forEach((item) => {
          if (
            item.$options.name === "TabsItem" &&
            item.name === this.selected
          ) {
            this.eventBus.$emit("update:selected", this.selected, item);
          }
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 42px 24px 50px;
}
</style>
