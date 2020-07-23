<template>
  <div :class="['wrapper', wrapperClasses]">
    <div class="toast">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="message"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">
        {{ closeButton.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    autoClose: {
      default: true,
    },
    autoCloseDelay: {
      default: 1,
    },
    closeButton: {
      default() {
        return {
          text: "关闭",
          callback: undefined,
        };
      },
    },
    message: {
      default: "",
    },
    enableHtml: {
      default: false,
    },
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "middle"].indexOf(value) >= 0;
      },
    },
  },
  computed: {
    wrapperClasses() {
      return this.position;
    },
  },
  data() {
    return {};
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000);
    }
    // 这是老师的代码 仅仅使为了记录
    // this.$nextTick(()=>{
    //   this.$refs.line.style.height = `${this.$refs.wrapper.getBoundingClientRect().height}px`
    // })
  },
  methods: {
    close() {
      this.$el.remove();
      this.$emit("close");
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
$duration:700ms;
@keyframes slide-up {
  0%{
    opacity: 0;
    transform: translateY(100%);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slide-down {
  0%{
    opacity: 0;
    transform: translateY(-100%);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes scale-in {
  0% {
    opacity: 0;
    // transform: translateY(100%);
    transform:scale(1.1)
  }
  100% {
    opacity: 1;
    // transform: translateY(0%);
    transform: scale(1);
  }
}
.wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  &.top {
    top: 0;
    .toast{
      animation: slide-down $duration;
    }
  }
  &.bottom {
    bottom: 0;
    .toast{
      animation: slide-up $duration;
    }
  }
  &.middle {
    top: 50%;
    transform: translate(-50%, -50%);
    .toast{
      animation: scale-in $duration;
    }
  }
  .toast {
    display: flex;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px 15px;
  }
  .close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
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
}
</style>
