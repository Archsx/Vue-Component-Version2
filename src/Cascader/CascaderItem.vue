<template>
  <div class="cascaderItem" :style="{ height: height }">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="onClickLabel(item)"
      >
        {{ item.value }}
        <icon v-if="item.children" name="arrow-right" class="icon"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cascader-item
        :items="rightItems"
        :height="height"
        :selected="selected"
        :level="level + 1"
        @update:selected="onUpdateSelected"
      ></cascader-item>
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
    selected: {
      type: Array,
      default: () => {
        return [];
      },
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickLabel(item) {
      // this.$set(this.selected, this.level, item);
      let copy = JSON.parse(JSON.stringify(this.selected));
      copy[this.level] = item;
      copy.splice(this.level + 1)
      this.$emit("update:selected", copy);
      // this.selected.splice(this.level, 1, item);
    },
    onUpdateSelected(item) {
      this.$emit("update:selected", item);
    },
  },
  mounted() {},
  computed: {
    rightItems() {
      let currentSelected = this.selected[this.level];
      if (currentSelected && currentSelected.children) {
        return currentSelected.children;
      } else {
        return null;
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
