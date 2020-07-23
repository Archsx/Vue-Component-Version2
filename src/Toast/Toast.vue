<template>
  <div :class="['toast',toastClasses]" >
    <slot v-if="!enableHtml"></slot>
    <div v-else v-html="message"></div>
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
    message:{
      default:''
    },
    enableHtml:{
      default:false
    },
    position:{
      type:String,
      default:'top',
      validator(value){
        return ['top','bottom','middle'].indexOf(value) >= 0
      }
    }
  },
  computed: {
    toastClasses(){
      return this.position
    }
  },
  data() {
    return {
      closed:false
    }
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
      console.log(1111111)
      this.closed = true
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
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 15px;
  &.top{
    top:0
  }
  &.bottom{
    bottom: 0;
  }
  &.middle{
    top:50%;
    transform: translate(-50%,-50%);
  }
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
</style>
