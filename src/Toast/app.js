import Vue from "vue";
import plugin from "./plugin";

Vue.use(plugin);

new Vue({
  el: "#app",
  mounted() {
    this.$toast("文文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字字文字文字", {
      enableHtml:true,
      position:"middle",
      closeButton: {
        text: "Close",
        callback() {
          console.log("我知道了");
        },
      },
    });
  },
});
