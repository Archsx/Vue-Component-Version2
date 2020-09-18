let map = new Map();

document.addEventListener("click", (e) => {
  for (let [key, value] of map) {
    if (!key.contains(e.target)) {
      value();
    }
  }
});

export default {
  bind: function(el, binding, vnode) {
    map.set(el, vnode.context[binding.expression]);
  },
  unbind: function(el) {
    // 解绑事件
    map.delete(el)
  },
};
