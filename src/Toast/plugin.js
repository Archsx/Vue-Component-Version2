import Toast from "./Toast.vue";

const createToastVm = ({ Vue, message, options, OnClose }) => {
  const Ctor = Vue.extend(Toast);
  const toastVm = new Ctor({
    propsData: { ...options, ...{ message } },
  });
  if (!options.enableHtml) {
    toastVm.$slots.default = [message];
  }
  toastVm.$mount(); // 必须mount一下，不然不会执行生命周期的钩子
  toastVm.$on("close", OnClose);
  document.body.appendChild(toastVm.$el);
  return toastVm;
};

let currentToast;

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(message, toastOptions) {
      if (currentToast) {
        currentToast.close();
      }
      currentToast = createToastVm({
        Vue,
        message,
        options: toastOptions,
        OnClose: () => {
          currentToast = null;
        },
      });
    };
  },
};
