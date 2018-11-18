# vue.component
> generator

## 参数
 * {string} | id
 * {Function | Object} |[definition]

## 功能
 * 注册全局组件
 ```js
 // 传入一个扩展过的构造器
 Vue.component('c-toast', Vue.extend({ /* ... */}))

 // 传入一个包含实例选项的对象，自动调用Vue.extend()
 Vue.component('c-toast, { /* ... */ })
 ```
 * 获取全局组件（的构造器，要new才能用）
 ```js
 // 返回一个构造器
 Vue.component('c-toast')
 ```

 ------
## 运用 && 实践
  在项目中，一般会有一些原子组件是需要 **自动注册** 的，这时候可通过一个js文件来写
```js
import Vue from 'vue'

const Components = require.context('../components/common', true, /(\.vue)$/)
/** require.context()表示动态引入文件
* 第一个参数：目标文件夹的相对路径
* 第二个参数：是否搜索其子子孙孙文件夹
* 第三个参数：引入文件的正则表达式
* 结果如下：
* 0: "./base/test/u-button.vue"
* 1: "./base/u-button.vue"
* 2: "./base/u-collapse-item.vue"
* 3: "./base/u-collapse-transition.vue"
* 4: "./base/u-collapse.vue"
*/ 

Components.keys().map(key => {
    let componentName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    // 取最后一个“.”之前的那个单词作为组件名（例如："./base/test/u-button.vue"只取"u-button"）

    Vue.component(componentName, Components(key).default)
    // 以后就根据这个id去获取构造器了
    // by the way, 注册时，会将 第一个参数id 自动作为组件名(虽然也不知道name有啥用)
})
```
以上自动注册完成了。

如果要获取某一个全局组件，并且绑定在vue的原型上的时候，就应该：
```js
const Ctor = Vue.component('c-toast') // 通过id去获取
if (!Ctor) return
Vue.prototype.$toast = new Ctor() // 因为返回的是扩展构造器
```
