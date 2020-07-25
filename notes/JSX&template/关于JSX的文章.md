##### 相关链接

[using-jsx-with-vue-and-why-you-should-care](https://scotch.io/tutorials/using-jsx-with-vue-and-why-you-should-care)

我原以为 vue 里面的 template 就已经够用了，但是有时候很臃肿，比如在条件渲染某个标签的时候(h1,h2,h3,h4,h5 等等)。直接写 render 函数可以解决这个问题，虽然 render 函数看起来结构可能不太清晰。有没有一种方法可以结合模板的直观以及 render 函数的高效呢？用 JSX。

Note：JSX 也是写在 render 函数里面的，上面所说的 render 函数是指`h('div',{class:{},attrs:{}},[])`这样的形式.

所以本文的比较其实是 JSX vs Template vs 传统 vue 的 render 函数写法

##### 传统 template 写法

```html
<div>
  <textarea
    v-if="multiline"
    v-model="content"
    :name="name"
    :placeholder="placeholder"
    :aria-invalid="false"
  ></textarea>
  <input
    v-else
    v-model="content"
    :name="name"
    :placeholder="placeholder"
    :aria-invalid="false"
  />
</div>
```

这样一段模板的写法的问题很明显，代码冗余严重，两个元素上绑定的属性和内容都一样，只是根据 multiline 这个变量来区别展示哪一个元素。假如元素上的属性很多，那么就更恼人了，因为你的在两个地方小心翼翼的写一样的代码

##### 用传统的 render 函数解决

```javascript
export default {
  name: "TextField",
  render(h) {
    const tag = this.multiline ? "textarea" : "input";

    return h(tag, {
      class: {
        "text-input": true,
        "is-disabled": false,
      },
      attrs: {
        name: this.name,
        placeholder: this.placeholder,
        "aria-invalid": false,
      },
    });
  },
};
```

代码很简单，但是也有一个问题，那就是我要想知道这个组件到底长什么样子的，我必须先读一次代码，然后再在大脑中构思这个组件的样子，假如上面的函数层次较多，那么我们并不能直观的得到结果。

##### JSX

比如这样的写法：
`const heading = <h1>Welcome to Scotch</h1>`

##### 在 vue 中使用 JSX

1. 监听事件,不再使用@这个符号

```javascript
  {
    //...
    render(h){
      return (
        <button onClick={this.handleClick}></button>
      )
    }
  }

  // click.prevent用法

  {
    //...
    render(h){
      return (
        <button onClick:prevent = {this.handleClick}></button>
      )
    }
  }

```

2.绑定属性

```javascript

render(h){
  return (
    <button content={this.generateText}></button>
  )
}


```

3. 展开语法

```javascript

render(h){
  return (
    <button  {...this.largeProps}  ></button>
  )
}



```

##### 用 JSX 改写上面的组件

尽管不愿意承认，但是下面的写法真的清爽多了

```javascript
  {
    render(h){
      const inputAttributes = {
        'class':'input-filed has-outline',
        onClick:this.handleClick,
        backdrop:false
      }
      const inputMarkup = this.multiline 
      ? <textarea {...inputAttributes}></textarea> 
      : <input {...inputAttributes}>

      return inputMarkup
    }
  }


```


##### 如何使用一个JSX的组件

无需在components中或者全局注册我们需要使用的组件
```
  import {Button} from 'path/to/component'

  export default {
    render(h){
      return <Button primary={true}></Button>
    }
  }



```
