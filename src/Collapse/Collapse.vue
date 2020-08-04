<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  model:{
    prop:'activekey',
    event:'change'
  },
  props: {
    activekey: {
      type: Array,
      required: true,
    },
  },
  provide() {
    return {
      getActiveKey: () => {
        return this.activekey;
      },
      toggleActiveState:(key)=>{
        const idx = this.activekey.indexOf(key)
        let keyArray
        if(idx>=0){
          keyArray=  this.activekey.filter((val)=>{
            return val !== key
          })
        }else{
          keyArray = [...this.activekey,key]
        }
        this.$emit('change',keyArray)
      }
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.collapse {
  line-height: 1.5;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
}
</style>
