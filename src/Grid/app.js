import Vue from 'vue'
import Row from "./Row.vue";
import Col from "./Col.vue";

new Vue({
  el: "#app",
  components: {
    "g-row":Row,
    "g-col":Col
  },
});
