const expect = chai.expect;
import Vue from "vue";
import Tabs from "../src/Tab/Tabs.vue";
import TabsHead from "../src/Tab/TabsHead.vue";
import TabsBody from "../src/Tab/TabsBody.vue";
import TabsItem from "../src/Tab/TabsItem.vue";
import TabsPane from "../src/Tab/TabsPane.vue";

Vue.component("g-tabs", Tabs);
Vue.component("g-tabs-head", TabsHead);
Vue.component("g-tabs-body", TabsBody);
Vue.component("g-tabs-item", TabsItem);
Vue.component("g-tabs-pane", TabsPane);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Tabs", () => {
  it("存在", () => {
    expect(Tabs).to.exist;
  });

  it("接受selected prop", (done) => {
    const div = document.createElement("div");

    document.body.appendChild(div);

    div.innerHTML = `
      <g-tabs :selected="'finace'">
        <g-tabs-head>
        <g-tabs-item name="finace">Finace</g-tabs-item>
        </g-tabs-head>
      </g-tabs>
    `;
    let vm = new Vue({
      el: div,
    });

    vm.$nextTick(() => {
      let ele = vm.$el.querySelector('.tabs-item[data-name="finace"]')
      expect(ele.classList.contains('active')).to.be.true
      done()
    });
  });
});
