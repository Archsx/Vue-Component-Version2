<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabsHead",
  inject: ["eventBus"],
  data() {
    return {};
  },
  created() {
    this.eventBus.$on("update:selected", (name, vm) => {
      // 注意这里的vm其实是被selected的子元素 tabs-item

      let { width, height, top, left } = vm.$el.getBoundingClientRect();
      this.$refs.line.style.width = `${width}px`;
      this.$refs.line.style.left = `${left}px`;
    });
  },
};
</script>

<style scoped lang="scss">
.tabs-head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #1890ff;
    transition: all 350ms;
  }
  .actions {
    margin-left: auto;
  }
}
</style>
