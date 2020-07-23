import Vue from "vue";
import plugin from "./plugin";

Vue.use(plugin);

new Vue({
  el: "#app",
  mounted() {},
  methods: {
    showToast() {
      this.$toast(
        "文文字文"+Math.random(),
        {
          enableHtml: true,
          position: "bottom",
          closeButton: {
            text: "Close",
            callback() {
              console.log("我知道了");
            },
          },
        }
      );
    },
  },
});
