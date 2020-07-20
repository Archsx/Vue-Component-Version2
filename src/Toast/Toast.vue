<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div class="toast" v-show="visible" @click="close" :style="computedStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
      <slot>
        <p v-html="message"></p>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      onClose: null,
      message: "",
      duration: 3000,
      closed: false,
      verticalOffset: 20,
      timer: null,
    };
  },
  computed: {
    computedStyle() {
      return {
        top: this.verticalOffset + "px",
      };
    },
  },
  watch: {
    closed(val){
      if(val){
        this.visible = false
      }
    }
  },
  methods: {
    handleAfterLeave() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this.id);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
  },
  mounted() {
    this.startTimer()
  },
};
</script>

<style scoped lang="scss">
.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s;
}
.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
}
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 15px;
  transition: all 0.7s;
}
</style>
