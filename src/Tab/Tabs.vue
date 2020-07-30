<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'Tabs',
  props:{
    selected:{
      type:String,
      required:true
    },
    direction:{
      type:String,
      default:'horizon',
      validator(value){
        return ['horizon','vertical'].includes(value)
      }
    }
  },
  created() {
    //this.$emit('update:selected','xxx')
  },
}
</script>

<style >

</style>