<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :items="options"></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './CascaderItem'
export default {
  name:'Cascader',
  components:{
    CascaderItems
  },
  props:{
    options:{
      type:Array
    }
  },
  data() {
    return {
      popoverVisible:true
    }
  },
};
</script>

<style></style>
