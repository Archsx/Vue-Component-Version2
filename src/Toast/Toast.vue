<template>
  <div class="toast">
    <slot></slot>
    <span class="close" v-if="closeButton" @click="onClickClose">
      {{ closeButton.text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    autoClose: {
      default: true,
    },
    autoCloseDelay: {
      default: 100,
    },
    closeButton: {
      default() {
        return {
          text: "关闭",
          callback: undefined,
        };
      },
    },
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000);
    }
  },
  methods: {
    close() {
      this.$el.remove();
      this.$destroy();
    },
    onClickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === "function") {
        this.closeButton.callback(this);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 15px;
}
.close {
  margin-left: 8px;
  padding-left: 8px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    height: 100%;
    top: 0;
    border-left: 1px solid #ccc;
  }
}
</style>
