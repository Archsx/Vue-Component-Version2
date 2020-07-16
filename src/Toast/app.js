import Vue from 'vue'
import plugin from './plugin'

Vue.use(plugin)

new Vue({
  el:'#app',
  mounted() {
    this.$toast('Hello World')
  },
})