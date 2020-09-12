<template>
  <div class="cascaderItem" :style="{ height: height }">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="onClickLabel(item)"
        :style="{cursor:'pointer'}"
      >
        {{ item.label }}
        <icon v-if="item.isLoading" name="loading" class="icon loading"></icon>
        <icon v-if="!item.isLoading && item.children" name="arrow-right" class="icon"></icon>
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
      // this.selected.splice(this.level, 1, item);
      // let copy = JSON.parse(JSON.stringify(this.selected));

      // this.timer = setTimeout(() => {
      //   p = p.then(() => {
      //     ajax(item).then((item) => {
      //       copy[this.level] = item;
      //       copy.splice(this.level + 1);
      //       this.$emit("update:selected", copy);
      //     });
      //   });
      // }, 500);
      this.$emit("update:selected", item, this.level);
    },
    onUpdateSelected(item, level) {
      this.$emit("update:selected", item, level);
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}


::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  background-color: #9f9f9f;
  -webkit-border-radius: 4px;
}

.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    height: 100%;
    padding: 0.3em 0;
    overflow: auto;
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
      &.loading{
        animation: spin 1.5s linear infinite;
      }
    }
  }
}
</style>
