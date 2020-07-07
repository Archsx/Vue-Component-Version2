##### 初识render函数

在vue项目中，template模板被相关loader转换成render函数，但是如果我们需要发挥js的能力，我们可以直接写render函数，说实话，刚开始的话可能还有些不习惯，毕竟模板里面那么多指令呢。需要注意的是，我们平时写的export default {},其实就是导出了一个对象。
```
    // parent component

    import subComponent from 'path/to/subComponent'

    

    export default {
        props:['someProp']
        render(h){
            // 写成这两个return，其实就是想表示一下区别
            // 比如像下面这样的写法，我们是在描述parent component是长什么样的
            // 比如下面的意思就是
            // 这parent component是一个div，这个div的id是box，里面的内容由parent component所接收到的someProp决定
            // 假如parent component是这样被调用的<parent-component someProp="Love"></parent-component>
            // 那么这个div的内容就是love
            return h('div',{
                attrs:{
                    id:"box"
                }
            },this.someProp)



            // 而这样的写法呢，虽然我们也是在描述parent component长什么样（parent component里面使用了subComponent）
            // 可是却有一点点思维上的转变
            // 比如下面的props，一瞬间我分不清到底这是在干啥
            // 当然，这里的定义的props:{endVal:100}是传给subComponent（subComponent里面定义了接受endVal这个prop）的值，而不是定义parent component需要接受一个参数endVal
            // 毕竟！！！ 这parent component需要的参数为someProp啊！！就定义在上面啊啊啊啊
            return h(subComponent,{
                props:{
                    endVal:100
                }
            })


            //插播一个题外话

            //这个h函数，其实就是很简单的创建vnode(就是那个用js来描述dom的那个对象)的函数，有时候我们创建节点，可以把这个节点单独拿出来写
            //似乎这个h函数没有哪些科普文章里面的那么简单，返回值也并不是简单的类似于{tag:xx,props:{},children:[yyy]},这样的对象，似乎还要下一步的更复杂的处理
            //例如

            const somevnode = {
                render(h){
                    return h('p',{},'Hello World')
                }
            }

            // 这里看起来有点离谱，说明h方法的参数可能是一个对象(这个对象也包含render方法)，而不是简单的h('div',{},[])这样的形式
            return h(somevnode)













        }
    }












```