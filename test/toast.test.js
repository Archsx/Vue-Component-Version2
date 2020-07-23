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
      vm.$on('close',()=>{
        expect(document.body.contains(vm.$el)).to.eq(false)
        done()
      })
    });
    it('接受closeButton',()=>{
      const callback = sinon.fake()
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          closeButton:{
            text:'close',
            callback,
          }
        },
      }).$mount();
      let closeButton = vm.$el.querySelector('.close')
      expect(closeButton.textContent.trim()).to.eq('close')
      closeButton.click()
      expect(callback).to.have.been.called


    })
    it('接受position',()=>{
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          position:'bottom'
        },
      }).$mount();
      expect(vm.$el.classList.contains('bottom')).to.eq(true)
      
    })
  });
});
