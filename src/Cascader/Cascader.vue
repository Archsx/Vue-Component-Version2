<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{ result }}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :items="options"
        class="popover"
        :height="popoverHeight"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from "./CascaderItem";

let p = Promise.resolve();

export default {
  name: "Cascader",
  components: {
    CascaderItems,
  },
  computed: {
    result() {
      return this.selected.map((ele) => ele.label).join(" / ");
    },
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
      default: () => {
        return [];
      },
    },
    loadData: {
      type: Function,
    },
  },
  data() {
    return {
      popoverVisible: true,
      timer: null,
    };
  },
  methods: {
    onUpdateSelected(item, level) {
      if (this.selected[level] && this.selected[level].label === item.label) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        let copy = JSON.parse(JSON.stringify(this.selected));
        p = p.then(() => {
          this.$set(item, "isLoading", true);
          return this.loadData(item).then((item) => {
            this.$set(item, "isLoading", false);
            copy[level] = item;
            copy.splice(level + 1);
            this.$emit("update:selected", copy);
          });
        });
      }, 500);
      // this.$emit("update:selected", item);
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Helvetica Neue, Helvetica, Arial, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: #314659;
  font-size: 14px;
}

.cascader {
  position: relative;
  height: 32px;
  .trigger {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC;
    height: 100%;
    border: 1px solid #d9d9d9;
    display: inline-flex;
    align-items: center;
    min-width: 300px;
    border-radius: 4px;
    padding: 4px 11px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
  }
  .popover-wrapper {
    position: absolute;
    font-size: 14px;
    top: calc(100% + 2px);
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
