<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'el-message',
        type && !iconClass ? `el-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTime"
      @mouseleave="startTime"
      role="alert"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">
          {{ message }}
        </p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <i
        v-if="showClose"
        class="el-message__closeBtn el-icon-close"
        @click="close"
      ></i>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default {
  data() {
    return {
      visible: false,
      //消息文字	string / VNode
      message: "",
      duration: 3000,
      type: "info",
      //自定义图标的类名，会覆盖 type
      iconClass: "",
      //	自定义类名
      customClass: "",
      //关闭时的回调函数, 参数为被关闭的 message 实例
      onClose: null,
      //是否显示关闭按钮
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      //文字是否居中
      center: false,
    };
  },
  computed: {
    typeClass() {
      return this.type && !this.iconClass
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : "";
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      };
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },
  methods: {
    handleAfterLeave() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },
    clearTime() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(()=>{
          if(!this.closed){
            this.close()
          }
        },this.duration)
      }
    },
    keydown(e){
      if(e.keyCode === 27){
        if(!this.closed){
          this.close()
        }
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown',this.keydown)
  },
  beforeDestroy(){
    document.removeEventListener('keydown',this.keydown)
  }
};
</script>

<style></style>
