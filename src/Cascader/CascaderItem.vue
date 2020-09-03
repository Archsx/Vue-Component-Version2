<template>
  <div class="cascaderItem" :key="Math.random()" :style="{height:height}">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="leftSelected = item"
      >
        {{ item.value }}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cascader-item  :items="rightItems" :height="height"></cascader-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "CascaderItem",
  props: {
    items: {
      type: Array,
    },
    height:{
      type:String
    }
  },
  data() {
    return {
      leftSelected: null,
    };
  },
  computed: {
    rightItems() {
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children;
      }
    },
  },
};
</script>

<style scoped  lang="scss">
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    border: 1px solid red;
    height: 100%;
  }
  .right {
    height:100%
  }
}
</style>
