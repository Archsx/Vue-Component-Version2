import Vue from 'vue'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'






new Vue({
  el:'#app',
  components:{
    Collapse,
    CollapseItem
  },
  data() {
    return {
      selected:['2','1']
    }
  },
})