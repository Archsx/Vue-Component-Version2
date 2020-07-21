import Toast from './Toast.vue'


export default {
  install(Vue,options){
    Vue.prototype.$toast = function(message,toastOptions){
      const Ctor = Vue.extend(Toast)
      const toastVm = new Ctor({
        propsData:{
          closeButton:toastOptions.closeButton
        }
      })
      toastVm.$slots.default = [message]
      toastVm.$mount() // 必须mount一下，不然不会执行生命周期的钩子
      document.body.appendChild(toastVm.$el)
    }
  }
}
