const expect = chai.expect;

import Vue from "vue";
import Toast from "../src/Toast/Toast.vue";

Vue.config.productionTip = false;

Vue.config.devtools = false;

describe("Row", () => {
  it("存在", () => {
    expect(Toast).to.exist;
  });
  describe("props", function() {
    it("接受 autoClose", (done) => {
      let div = document.createElement("div");
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          autoClose: true,
          autoCloseDelay: 1,
        },
      }).$mount(div);
      vm.$on("close", () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
    });
    it("接受closeButton", (done) => {
      const callback = sinon.fake();
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          closeButton: {
            text: "close",
            callback,
          },
        },
      }).$mount();
      let closeButton = vm.$el.querySelector(".close");
      expect(closeButton.textContent.trim()).to.eq("close");
      // 这里触发了点击事件，这里用代码触发的，并不是手动点击触发的
      // 因为点击事件会影响到这个组件实例的关闭(close方法的调用)，而我们在上面mount方法调用后，出发了组件的mounted的钩子函数中
      // 在哪个狗子函数中使用了nextTick,而那个nextTick中访问了dom的一些属性
      // 所以这里存在着一个时间先后的问题，可能会引发bug（就是触发click事件，造成vm销毁，那么之前nextTick里面的函数就无法访问到dom），我们在这里使用nextTick做一个处理
      // 老师使用的是setTimeout,我觉得使用nextTick就行
      vm.$nextTick(() => {
        closeButton.click();
        expect(callback).to.have.been.called;
        done();
      });
    });
    it("接受position", () => {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          position: "bottom",
        },
      }).$mount();
      expect(vm.$el.classList.contains("bottom")).to.eq(true);
    });
  });
});
