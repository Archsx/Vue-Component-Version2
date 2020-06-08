import Vue from "vue";
import Button from "./Button.vue";
import Icon from "./Icon.vue";
import ButtonGroup from "./Button-Group.vue";

Vue.component("g-button", Button);
Vue.component("g-icon", Icon);
Vue.component("g-button-group", ButtonGroup);

new Vue({
  el: "#app",
  data() {
    return {};
  },
});

// 单元测试
import chai from "chai";
const expect = chai.expect;
// 测试到底测什么？props和event
{
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "settings",
    },
  });
  button.$mount();
  const slotTemp = `<div>Hello World</div>`;
  let useElement = button.$el.querySelector("use");
  console.log(Vue.compile(slotTemp));
  expect(useElement.getAttribute("xlink:href")).to.eq("#i-settings");
  button.$el.remove();
  button.$destroy();
}
{
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "settings",
      loading: true,
    },
  });
  button.$mount();
  let useElement = button.$el.querySelector("use");
  expect(useElement.getAttribute("xlink:href")).to.eq("#i-loading");
  button.$el.remove();
  button.$destroy();
}
{
  // 测试css有所不同，如果元素没有被挂载到页面上，那么这个元素不会被渲染，css也就不会加在这个元素上

  const div = document.createElement("div");
  document.body.appendChild(div);

  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "settings",
    },
  });
  // 看见了吗？原来这mount方法的参数不一定是选择器，直接就是个dom元素也行
  button.$mount(div);
  let svg = button.$el.querySelector("svg");
  let { order } = window.getComputedStyle(svg);
  expect(order).to.eq("1");
  button.$el.remove();
  button.$destroy();
}
{
  const div = document.createElement("div");
  document.body.appendChild(div);
  const Constructor = Vue.extend(Button);
  const instance = new Constructor({
    propsData: {
      icon: "settings",
      iconPosition: "right",
    },
  });
  instance.$mount(div);
  const svg = instance.$el.querySelector("svg");
  expect(window.getComputedStyle(svg).order).to.eq("2");
  instance.$el.remove();
}
{
  const Constructor = Vue.extend(Button)
  const instance = new Constructor({
    propsData:{
      icon:'settings'
    }
  })
  instance.$mount()
  instance.$on('click',()=>{
    console.log('clicked')
  })
  instance.$el.click()
}
