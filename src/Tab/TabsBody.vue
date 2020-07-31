<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBody',
  inject:['eventBus']
}
</script>

<style>

</style>