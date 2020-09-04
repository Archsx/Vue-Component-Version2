<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :items="options"
        class="popover"
        :height="popoverHeight"
        :selected = "selected"
        @update:selected="onUpdateSelected"
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
    selected: {
      type: Array,
      default:() => {
        return []
      }
    },
  },
  data() {
    return {
      popoverVisible: true,
    };
  },
  methods: {
    onUpdateSelected(item){
      this.$emit('update:selected',item)
    }
  },
};
</script>

<style scoped lang="scss">
.cascader {
  position: relative;
  .trigger {
    border: 1px solid black;
    height: 32px;
    width: 100px;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    display: flex;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
