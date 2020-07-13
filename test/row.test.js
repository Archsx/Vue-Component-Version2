const expect = chai.expect;

import Vue from "vue";
import Row from "../src/Grid/Row.vue";
import Col from "../src/Grid/Col.vue";

Vue.config.productionTip = false;

Vue.config.devtools = false;

describe("Row", () => {
  it("存在", () => {
    expect(Row).to.exist;
  });
  it("接受gutter属性", (done) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const rowCtor = Vue.extend(Row);
    const rowVm = new rowCtor({
      propsData: {
        gutter: 10,
      },
    });
    const colVm1 = rowVm.$createElement(Col);
    const colVm2 = rowVm.$createElement(Col);
    rowVm.$slots.default = [colVm1, colVm2];
    rowVm.$mount(div);

    rowVm.$nextTick(() => {
      const row = rowVm.$el
      expect(getComputedStyle(row).marginLeft).to.eq('-5px')


      const cols = rowVm.$el.querySelectorAll('.col')
      expect(getComputedStyle(cols[0]).paddingLeft).to.eq('5px')
      rowVm.$el.remove()
      rowVm.$destroy()
      done()
    });
  });
});
