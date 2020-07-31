<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabsHead",
  inject: ["eventBus"],
  created() {
  },
};
</script>

<style scoped lang="scss">
.tabs-head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .actions{
    margin-left: auto;
  }
}
</style>
