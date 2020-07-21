import Vue from "vue";
import plugin from "./plugin";

Vue.use(plugin);


new Vue({
  el: "#app",
  mounted() {},
  methods: {
    showToast() {
      const somevnode = {
        render(h){
          return h('p',{},'Hello World')
        }
      }
      this.$toast({message:this.$createElement(somevnode)})
      // this.$toast("Hello World");
    },
  },
});
