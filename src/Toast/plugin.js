import Toast from "./Toast.vue";

let instance;
let instances = [];
let seed = 1;

function close(id) {

  console.log(id)

  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if ((id === instances[i].id)) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      instances.splice(i, 1);
      break;
    }
  }

  console.log('len_________'+len)
  console.log('index_________'+index)

  if (len <= 1 || index === -1 || index > instances.length - 1) {
    return;
  }

  console.log('aaa')

  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style["top"] =
      parseInt(dom.style["top"], 10) - removedHeight - 16 + "px";
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(options = {}) {
      if (typeof options === "string") {
        options = {
          message: options,
        };
      }

      let id = `message_${seed++}`;
      options.onClose = close;

      let ToastConstructor = Vue.extend(Toast);
      instance = new ToastConstructor({
        data: options,
      });
      instance.id = id;
      instance.$mount();
      document.body.appendChild(instance.$el);

      //先只考虑toast从上往下排列的情景
      let verticalOffset = options.offset || 20;
      instances.forEach((item) => {
        verticalOffset += item.$el.offsetHeight + 16;
      });
      instance.verticalOffset = verticalOffset;

      // toast出现
      instance.visible = true;

      // 将vm push进 instances
      instances.push(instance);

      return instances;
    };
  },
};
