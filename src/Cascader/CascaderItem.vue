<template>
  <div class="cascaderItem" :key="Math.random()" :style="{ height: height }">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="leftSelected = item"
      >
        {{ item.value }}
        <icon v-if="item.children" name="arrow-right" class="icon"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cascader-item :items="rightItems" :height="height"></cascader-item>
    </div>
  </div>
</template>

<script>
import Icon from "../Button/Icon.vue";

export default {
  name: "CascaderItem",
  components: {
    Icon,
  },
  props: {
    items: {
      type: Array,
    },
    height: {
      type: String,
    },
  },
  data() {
    return {
      leftSelected: null,
    };
  },
  mounted() {},
  computed: {
    rightItems() {
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    height: 100%;
    padding: 0.3em 0;
  }
  .right {
    height: 100%;
    border-left: 1px solid #eee;
  }
  .label {
    padding: 0.6em 1.5em;
    position: relative;

    .icon {
      position: absolute;
      font-size: 12px;
      line-height: 12px;
      top: 50%;
      right: 6px;
      margin-top: -6px;
    }
  }
}
</style>
