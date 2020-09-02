<template>
  <div class="wrapper">
    <p>{{ option.label }}</p>
    <template v-if="option.children">
      <cascader-item
        v-for="(item, index) in option.children"
        :key="index"
        :option="item"
      ></cascader-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "CascaderItem",
  props: ["option"],
};
</script>

<style scoped lang="scss">
.wrapper {
  padding-left: 10px;
}
</style>
