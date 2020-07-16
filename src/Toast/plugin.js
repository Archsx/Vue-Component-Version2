import Toast from './Toast.vue'

export default {
  install(Vue,options){
    Vue.prototype.$toast = function(message){
      const Ctor = Vue.extend(Toast)
      const toastVm = new Ctor({

      })
      toastVm.$slots.default = [message]
      toastVm.$mount() // 必须mount一下，不然不会执行生命周期的钩子
      document.body.appendChild(toastVm.$el)
    }
  }
}