##### 这篇md的起源

在学习单元测试的时候，由于需要动态的创建组件，并且传入组件所需要的prop以及slot的内容，而这种情况我们之前并未遇到过，故记录下来。

参考链接(stackoverflow)

[vue-pass-slot-template-to-extended-componenty](https://stackoverflow.com/questions/43041145/vue-pass-slot-template-to-extended-component)


[how-to-create-vue-js-slot-programmatically](https://stackoverflow.com/questions/50150668/how-to-create-vue-js-slot-programmatically)

```
  // slide.vue

  <template>
    <div class="swiper-slider swiper-slide-one">
      <slot></slot>
    </div>
  </template>


  // somewhere.vue

  import Slide from "path/to/slide.vue"
  const SlideConstructor = Vue.extend(Slide)
  (new SlideConstructor()).mount("someDomId")

```

如上所示，假如我们需要动态的创建一个Slide组件，像上面的方式就可以了，但该怎么传入prop和slot的内容呢？

方式1

思考，我们想要的是什么？在slide里面加入我们自己想要的内容。那么在平时的模板情况下是怎么写的?

```
  <slide>
    <div>
      slot content expected
    </div>
  </slide>
```

所以我们可以采取这种方式，只是名字可能有点绕口

```
  const anotherSlide = vue.extend({
    components:{
      Slide
    },
    template:`
      <slide>      
        <div>
         slot content expected
        </div>
      </slide>
    `
  })


  (new anotherSlide()).$mount('someDomId')


```

不知道大家注意到没有，这样的方式其实和我们平常的使用方式很像，还记得这样的代码吗？

```

  Vue.component('componentName',{
    components:{Another},
    template:`Hello ${message}
              <another></another>    
    `,
    data:{
      message:'World'
    },
    methods:{

    }
    // 等等
  })

  // 注意上面的组件，我们在定义一个组件的时候，其内部可以使用其他的组件
  // 我们是怎么使用别的组件的呢？在components里面注册，然后在template中使用就好了
  // 看了下面的代码，我怀疑这些template最终都会成为Vue.compile(template)的参数
  // 可能在这过程中，遇到自定义的标签名就回去查找
  // 所以假如一个组件是全局注册的话，都不用在这components里面写明了



```

以上就是第一种方法，但总感觉不够js

```

  // Vue.compile + $createElement(感觉这个函数就是直接根据vnode生成真实DOM)
  // 以及直接设置vue组件实例的$slots.default
  const slotTemplate = `<div><h4>This is the slot content</h4>{{message}}</div>`
  const renderer = Vue.compile(slotTemplate)
  const slotContent = {
    data(){
      return {
        message:'some data in slot'
      }
    },
    render:renderer.render,
    // 这个属性不知道是干啥用的
    staticRenderFns:renderer.staticRenderFns
  }

  const instance = new Slide()
  instance.$slots.default = [instance.$createElement(slotContent)]
  instance.$mount("someDomId")


  // 假如slot里面的内容很简单，就是一些HTML，那么可以有简单的方式

  const slotTemplate = `<div><h4>This is the slot content</h4></div>`
  const instance = new Slide()
  instance.$slots.default = [instance.$createElement(Vue.compile(slotTemplate))]
  instance.$mount('#someDomId')

  // 注意 $slots[key]should be an array of vNodes













```
