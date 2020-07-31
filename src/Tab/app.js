import Vue from "vue"
import Tabs from './Tabs.vue'
import TabsBody from './TabsBody.vue'
import TabsHead from './TabsHead.vue'
import TabsItem from './TabsItem.vue'
import TabsPane from './TabsPane.vue'



new Vue({
  el:"#app",
  components:{
    Tabs,
    TabsBody,
    TabsHead,
    TabsItem,
    TabsPane
  },
  data() {
    return {
      selectedTab:'sports'
    }
  },
  methods: {
    handleChange(val){
    }
  },
})