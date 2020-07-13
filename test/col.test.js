
const expect = chai.expect;

import Vue from "vue";
import Col from "../src/Grid/Col.vue";

Vue.config.productionTip = false;

Vue.config.devtools = false;

describe("Col", () => {
  it("存在", () => {
    expect(Col).to.exist;
  });
  it("接受span以及xs属性", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const colCtor = Vue.extend(Col);
    const colVm = new colCtor({
      propsData: {
        span: 10,
        xs:12
      },
    });
    colVm.$mount(div);
    const col = colVm.$el
    expect(col.getAttribute('span')).to.eq('10')
    expect(col.classList.contains('col-xs-12')).to.be.true

    col.remove()
    colVm.$destroy()

  });
});
