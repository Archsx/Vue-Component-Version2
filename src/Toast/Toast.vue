<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .toast{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0,0, 0.7);
    color: #fff;
    padding: 10px 15px;
  }
</style>