<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$children) // 这个只会找vue组件实例
    for(let node of this.$el.children){
      if(node.nodeName.toLowerCase() !== 'button'){
        console.warn('g-button-group的子元素应该全是g-button')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.g-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .g-button {
    border-radius: 0;
    // &:not(:first-child){
    //   border-left: none;
    // }
    margin-left: -1px;
    &:first-child {
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
    &:last-child{
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
    &:hover{
      position: relative;
      z-index: 1;
    }
  }
}
</style>
