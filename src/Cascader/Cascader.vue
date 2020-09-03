<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :items="options"
        class="popover"
        :height="popoverHeight "
      ></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from "./CascaderItem";
export default {
  name: "Cascader",
  components: {
    CascaderItems,
  },
  props: {
    options: {
      type: Array,
    },
    popoverHeight: {
      type: String,
    },
  },
  data() {
    return {
      popoverVisible: true,
    };
  },
};
</script>

<style scoped lang="scss">
.cascader {
  position: relative;
  .trigger {
    border: 1px solid red;
    height: 32px;
    width: 100px;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid green;
    background-color: #fff;
    display: flex;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
