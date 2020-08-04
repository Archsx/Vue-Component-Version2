import Vue from "vue";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import Icon from '../Button/Icon.vue'

new Vue({
  el: "#app",
  components: {
    Collapse,
    CollapseItem,
    Icon
  },
  data() {
    return {
      activekey:['1']
    }
  },
});
