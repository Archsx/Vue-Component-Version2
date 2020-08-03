<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions" v-if="$slots.actions">
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
      const offset = this.$el.getBoundingClientRect().left;
      this.$refs.line.style.width = `${width}px`;
      this.$refs.line.style.left = `${left - offset}px`;
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
  margin: 0 0 16px;
  .line {
    position: absolute;
    bottom: 0;
    border-bottom: 2px solid #1890ff;
    transition: all 350ms;
    z-index: 2;
  }
  .actions {
    margin-left: auto;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    z-index: 1;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
