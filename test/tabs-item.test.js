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

describe("TabsItem", () => {
  it("存在", () => {
    expect(TabsItem).to.exist;
  });

  it("接受name 属性", () => {
    const Ctor = Vue.extend(TabsItem)
    const vm = new Ctor({
      propsData:{
        name:'item'
      }
    }).$mount()
    expect(vm.$el.getAttribute('data-name')).to.eq('item')
  });
  it("接受disabled 属性", () => {
    const Ctor = Vue.extend(TabsItem)
    const vm = new Ctor({
      propsData:{
        disabled:true
      }
    }).$mount()
    expect(vm.$el.classList.contains('disabled')).to.be.true
    const callback = sinon.fake()
    vm.$on('click',callback)
    vm.$el.click()
    expect(callback).to.have.not.been.called
  });
});
