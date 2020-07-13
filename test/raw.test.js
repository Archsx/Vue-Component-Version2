const expect = chai.expect;

import Vue from "vue";
import Raw from "../src/Grid/Row.vue";
import Col from "../src/Grid/Col.vue";


Vue.config.productionTip = false

Vue.config.devtools = false

describe('Raw',()=>{
  it('存在',()=>{
    expect(Raw).to.exist
  })
  it('接受gutter属性',()=>{
    const div = docuemnt.createElement('div')
    document.body.appendChild(div)
    const rawCtor = Vue.extend(Raw)
    const vm = new rawCtor({
      propsData:{
        gutter:10
      }
    })
    

  })
})
