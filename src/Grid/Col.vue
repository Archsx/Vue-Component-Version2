<template>
  <div :span="span" class="col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:"Col",
  props:{
    span:{
      type:String | Number
    }
  }
}
</script>

<style>

.col{
  height: 100px;
  width: 100%;
  background-color: salmon;
}

</style> 