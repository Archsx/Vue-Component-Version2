// let map = new Map()



export default {
  bind: function(el, binding, vnode) {
    el.event = function(event) {
      // 检查点击是否发生在节点之内（包括子节点）
      if (!(el == event.target || el.contains(event.target))) {
        // 如果没有，则触发调用
        // 若绑定值为函数，则执行
        // 这里我们可以通过钩子函数中的 vnode.context，来获取当前组件的作用域
        if (typeof vnode.context[binding.expression] == "function") {
          vnode.context[binding.expression](event);
        }
      }
    };
    // 绑定事件
    // 设置为true，代表在DOM树中，注册了该listener的元素，会先于它下方的任何事件目标，接收到该事件。
    document.body.addEventListener("click", el.event, true);
  },
  unbind: function(el) {
    // 解绑事件
    document.body.removeEventListener("click", el.event, true);
  },
};
