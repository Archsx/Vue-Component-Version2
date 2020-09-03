<template>
  <ul>
    <li v-for="(item,index) in option" :key="index" @click="handleClick(item)">{{ item.label }}</li>
  </ul>
</template>

<script>
export default {
  name: "CascaderItem",
  props: ["option"],
  mounted(){
  },
  methods: {
    handleClick(item){
        this.$emit('add',item)
    }
  },
};
</script>

<style scoped lang="scss">
ul {
  border-radius: 4px 0 0 4px;
  display:inline-block;
  min-width: 111px;
  height: 180px;
  padding:4px 0;
  overflow: auto;
  border-right: 1px solid #e8e8e8;
  li {
    list-style: none;
    padding-left: 0;
    // font-weight: 600;
    // background-color: #fafafa;
    position: relative;
    padding: 5px 24px 5px 12px;
    line-height: 22px;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
