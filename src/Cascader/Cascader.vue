<template>
  <div class="cascader">
    <div class="trigger">
      <slot>
        <span class="cascader-picker">
          <input placeholder="" type="text" class="cascader-input" />
          <span class="cascader-picker-label">Hello</span>
          <icon name="arrow-down" class="cascader-arrow-down"></icon>
        </span>
      </slot>
    </div>
    <div class="popover">
      <cascader-item
        v-for="(item, index) in activeNodesArray"
        :key="index"
        :option="item"
        @add="addNodes"
      >
      </cascader-item>
    </div>
  </div>
</template>

<script>
function addLevel(arr, lv = 0) {
  arr.forEach((ele) => {
    ele.level = lv;
    if (ele.children) {
      addLevel(ele.children, lv + 1);
    }
  });
}

import CascaderItem from "./CascaderItem";
import Icon from "../Button/Icon";
export default {
  name: "Cascader",
  components: {
    CascaderItem,
    Icon,
  },
  props: {
    options: {
      type: Array,
    },
  },
  data() {
    return {
      activeNodesArray: [this.options],
    };
  },
  methods: {
    addNodes(item) {
      let lv = item.level;

      if (item.children) {
        const nextNodeArray = this.activeNodesArray[lv + 1];

        if (nextNodeArray) {
          if (nextNodeArray === item.children) {
            return;
          } else {
            this.activeNodesArray.splice(lv + 1);
            this.activeNodesArray.push(item.children);
          }
        } else {
          this.activeNodesArray.push(item.children);
        }
      }
      console.log(this.activeNodesArray)
    },
  },
  created() {
    addLevel(this.options);
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
@import "../scss/var.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.cascader-picker {
  width: 300px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  outline: 0;
  transition: color 0.3s;
  > input {
    width: 100%;
    padding: 4px 24px 4px 11px;
    background-color: transparent !important;
    cursor: pointer;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      border-color: #40a9ff;
    }
  }
  > .cascader-picker-label {
    position: absolute;
    padding: 0 20px 0 12px;
    top: 50%;
    left: 0;
    width: 100%;
    height: 20px;
    margin-top: -10px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cascader-arrow-down {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 12px;
    height: 12px;
    margin-top: -6px;
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
    line-height: 12px;
    transition: transform 0.2s;
  }
}
</style>
