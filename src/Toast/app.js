import Vue from "vue";
import plugin from "./plugin";

Vue.use(plugin);


let i = 0
new Vue({
  el: "#app",
  mounted() {},
  methods: {
    showToast() {
      this.$toast("Hello World"+ i++);
    },
  },
});
