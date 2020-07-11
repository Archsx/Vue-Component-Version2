<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.row{
  display: flex;
}
@for $i from 1 through 24 {
  .col[span="#{$i}"]{
    width:($i / 24) * 100%
  }
}
</style>