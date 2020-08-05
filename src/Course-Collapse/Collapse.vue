<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .collapse{
    border: 1px solid #ddd;
    border-radius: 4px;
    border-bottom: none;
  }
</style>