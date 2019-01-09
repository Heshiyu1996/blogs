## render
> 通常的开发会选择在vue文件里template、script、style直接写，但是其实还可以通过render函数来生成template；再者，vue的底层编译的原理也是通过render函数来生成那些需要渲染的节点的
> 
> 更新时间： 2019-01-09

 - 类型：`(createElement: () => VNode)  => VNode`
##### 由类型可以看出，render函数的参数是createElement，返回值是VNode。
##### 其中createElement也是一个函数，它的返回值也是VNode

 - 详细：该渲染函数接收一个`createElement`方法作为第一个参数，用来创建`VNode` [什么是VNode？](#什么是VNode？)
 - 写法：
 ```js
 render(createElement) {
   return createElement('div', { class: 'heshiyu' }, '内容')
 }
 ```



### createElement
由上面例子可知，createElement函数有三个参数：

#### 第一个参数：
 - 必须
 - {String | Object | Function}
 - 写法：
 ```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>render</title>
    <script src="https://cdn.bootcss.com/vue/2.3.4/vue.js"></script>
</head>
<body>
    <div id="app">
        <elem></elem>
    </div>

    <script>
        Vue.component('elem', {
            render: function(createElement) {
                // 类型①：一个HTML标签
                return createElement('div')

                /* 类型②：组件选项对象
                  return createElement({
                      template: '<div></div>'
                  })
                */

                /* 类型③：一个返回HTML标签字符 或 组件选项对象的函数
                  var func = function() {
                      return {template: '<div></div>'}
                  }
                  return createElement(func())
                */
            }
        });
        new Vue({
            el: '#app'
        })
    </script>
</body>
</html>
 ```

#### 第二个参数：
 - 可选
 - {Object}
 - 写法：
 ```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>render</title>
    <script src="https://cdn.bootcss.com/vue/2.3.4/vue.js"></script>
</head>
<body>
    <div id="app">
        <elem></elem>
    </div>

    <script>
        Vue.component('elem', {
            render: function(createElement) {
                return createElement(
                  'div',
                  // 一个包含模板相关属性的数据对象
                  {
                    'class': {
                      foo: true,
                      bar: false
                    },
                    style: {
                      color: 'red',
                      fontSize: '14px'
                    },
                    attrs: {
                      id: 'foo'
                    },
                    domProps: {
                      innerHTML: 'baz'
                    }
                  }
                )
            }
        });
        new Vue({
            el: '#app'
        })
    </script>
</body>
</html>
 ```

#### 第三个参数：
 - 可选
 - {String | Array}
 - 写法：
 ```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>render</title>
    <script src="https://cdn.bootcss.com/vue/2.3.4/vue.js"></script>
</head>
<body>
    <div id="app">
        <elem></elem>
    </div>

    <script>
        Vue.component('elem', {
            render: function(createElement) {
                let that = this
                /* 类型①：使用字符串生成文本节点，此时作为第二个参数
                  return createElement('div', '文本')
                */

                // 类型②：由createElement函数组成的数组
                return createElement(
                  'div',
                  {
                    'class': {
                      foo: true,
                      bar: false
                    },
                    style: {
                      color: 'red',
                      fontSize: '14px'
                    },
                    attrs: {
                      id: 'foo'
                    },
                    domProps: {
                      innerHTML: 'baz'
                    }
                  },
                  [
                    createElement('h1', '主标')
                    createElement('h2', '副标')
                  ]
                )
            }
        });
        new Vue({
            el: '#app'
        })
    </script>
</body>
</html>
 ```

### template VS render
如果是在单文件组件（.vue）文件里开发，那么优先级如下：

`<template>` > `render函数`（即，如果template标签存在，则 **不会执行** render函数）

两种写法的转换：
```js
Vue.component('ele', {
  /*
    template: '<div id="elem" :class="{show: show}" @click="handleClick">文本</div>',
  */

  // 和上面template实例选项等价的render函数写法：
  render(createElement) {
    return createElement(
      'div',
      {
        'class': {
          show: this.show
        },
        attrs: {
          id: 'elem'
        },
        on: {
          click: this.handleClick
        }
      },
      '文本'
    )
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
      handleClick: function() {
          console.log('clicked!')
      }
  }
})
```






### 什么是VNode？
 > 1、由createElement返回的
 > 
 > 2、不是一个实际的DOM元素
 > 
 > 3、它包含的信息将告诉Vue：页面上需要渲染什么样的节点，及其子节点


 ### 参考文章：
 [如何理解Vue的render函数](https://segmentfault.com/a/1190000010913794)

 [vue渲染函数render的使用](https://yq.aliyun.com/articles/610026)