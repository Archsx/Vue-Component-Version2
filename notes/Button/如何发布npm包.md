##### 什么是包(库)?

我们要发布一个包，那么我们首先得知道一个包和库大概是什么。对我来说，包就是一个全局的对象，我们引入之后，就能调用这个对象上面的方法。

那么我们写的这个Button组件，包括Button.vue,Icon.vue,ButtonGroup.vue,app.js等等，那么我们应该如何将其打包成一个文件呢？

##### 描述我们要导出的包的入口在哪里

目前这个项目下这些文件，我们怎么描述我们要导出什么文件,我们在根目录下新建一个index.js，
```
  import Button from 'path/to/Button'
  import ButtonGroup from 'path/to/ButtonGroup'
  import Icon from 'path/to/Icon'

  export {Button,ButtonGroup,Icon}


```



然后在package.json里面加上
```
  "main": "index.js"
```

然后在npm上注册自己的账户，在命令行npm adduser,然后npm publish即可

##### 此时发布的包是什么样子的

此时npm i 自己发布的包的名字(package.json里面的那个name)， 此时就像是git clone一样，除了node_modules没传上去其他的应该一样，但是肯定不应该是这样的，以后会改成只上传必要的文件.



##### 别人是怎么使用这个包的？(以vue-cli创建的项目为例)

先 npm i 这个包的名字，然后在main.js中全局注册(这是我的猜想,老师后来改为再相应的组件局部引入了)
记得还要引入样式！！！！！！！！！！！

```
  import Vue from "vue"
  import App from "./App.vue"
  import {Button,ButtonGroup,Icon} from 'zoidberg-me-vue2-component-test'
  import "zoidberg-me-vue2-component-test/dist/index.css"


  Vue.component('g-button',Button)


```

或者再某个.vue文件中局部引入

```
  import {Button,ButtonGroup,Icon} from 'zoidberg-me-vue2-component-test'
  import "zoidberg-me-vue2-component-test/dist/index.css"
  
  export default{
    components:{
      "g-button":Button
    },
    data(){
      return {}
    }
  }


  <style>
        :root {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --color: #333;
        --border-color: #999;
        --border-color-hover: #666;
      }
  </style>
```



但是！这时候使用会报错！原因是我们导出index.js里面的语法(如import等等)并不被node所支持,此时我们需要先将index.js用parcel转译一下(这个--no-minify很重要，不然似乎会出bug，比如slot标签被弄没了)

```

 npx parcel build index.js --no-cache --no-minify


```
然后将package.json中的main改为

```
  "main": "dist/index.js"

```

然后再npm publish(记得再package.json里面更改版本号)



