const expect = chai.expect;
import Vue from "vue";
import Input from "../src/Input/input.vue";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Input", () => {
  it("存在", () => {
    expect(Input).to.exist;
  });

  describe("props", () => {
    const ctor = Vue.extend(Input);
    let vm;

    afterEach(() => {
      vm.$destroy();
    });

    it("接受value", () => {
      vm = new ctor({
        propsData: {
          value: "1234",
        },
      }).$mount();
      const inputElement = vm.$el.querySelector("input");
      expect(inputElement.value).to.equal("1234");
    });

    it("接受 disabled", () => {
      vm = new ctor({
        propsData: {
          disabled: true,
        },
      }).$mount();
      const inputElement = vm.$el.querySelector("input");
      expect(inputElement.disabled).to.equal(true);
    });
    it("接受 error", () => {
      vm = new ctor({
        propsData: {
          error: "wrong message",
        },
      }).$mount();
      const useElement = vm.$el.querySelector("use");
      expect(useElement.getAttribute("xlink:href")).to.equal("#i-error");
      const errorMessage = vm.$el.querySelector(".errorMessage");
      expect(errorMessage.innerText).to.equal("wrong message");
    });
  });

  describe("事件", () => {
    const ctor = Vue.extend(Input);
    let vm;
    afterEach(() => {
      vm.$destroy();
    });

    it("支持change/input/focus/blur事件", () => {
      ["change", "input", "focus", "blur"].forEach((ele) => {
        vm = new ctor({}).$mount();
        const callback = sinon.fake();
        vm.$on(ele, callback);
        // 触发 input 的change事件
        var event = new Event(ele);
        let inputElement = vm.$el.querySelector("input");
        inputElement.dispatchEvent(event);
        expect(callback).to.have.been.calledWith(event);
      });
    });
  });
});
