# 复习2019
## 2019-03-03
### [HTML 5]Web worker
Web Worker是HTML5的新功能。Web Worker标准包含两部分：**Worker对象**（该对象暴露给创建该线程 的线程用的）、**WorkerGlobalScope**（这是一个用来表示新创建的Worker的全局对象，也是Worker线程内部使用的对象）

外界：
 - 实例化一个worker对象
 ```js
 var worker = new Worker('./my/path/to/async.js')
 ```
 - 发送消息给worker内部
 ```js
 worker.postMessage('Hello')
 ```
 - 注册事件处理程序
 ```js
 worker.onmessage = function(e) {
     // ...
     worker.terminate() // 关闭 Worker线程
 }
 ```
worker内部
 - 注册事件处理程序
 ```js
 // WorkerGlobalScope是一个供Worker使用的全局对象
 // 因此postMessage、onmessage看起来像全局函数和全局变量
 onmessage = function(e) {
     postMessage(123)
 }
 ```

### [Vue.js]如何实现Vue.js的响应式数据绑定？
Vue实例初始化的过程中，实现依赖管理。大致总结如下：

 - `initState`过程中，把`props、computed、data`等属性通过`Object.defineProperty`来改造其`getter/setter`属性，并为每一个响应式属性去实例化一个`observer`观察者；
 - `observer`观察者内部的`dep`对象记录了这个响应式属性的所有依赖；
 - 当响应式属性调用`setter`函数时，通过`dep.notify()`方法去遍历所有依赖，然后调用`watcher.update()`去完成数据的动态响应


## 2019-03-04
### [工具]gulp与webpack的区别
gulp：强调的是前端开发流程。通过定义一系列的task，再定义task处理的事物、顺序，最后让gulp执行task，从而构建前端项目；

webpack：是一个前端模块化的方案，侧重模块打包。把开发的资源看成模块，通过`loader`、`plugins`对资源进行处理，最后打包成符合生产环境部署的前端资源。
 - 不同环境下全局安装的webpack版本可能不符合这个项目，所以还是用局部依赖
 - ./node_modules/.bin/webpack input.js output.js

### [Vue.js]Vue.js的三大特点：
 - 响应式（数据双向绑定）
 - 组件化（模块化）
 - 单文件组件（.vue）
    - 将html/js/css存在于一个文件内，然后得益于`webpack + vue-loader`来让浏览器识别
    - 好处1：Style的作用域
    - 好处2：预加载器（在template、style中的lang属性）

### [Vue.js]$attrs 和 $listeners
$attrs是一个对象，存着由父组件传递给子组件、但是没有在子组件里prop的特性

$listeners也是一个对象，存着由父组件传递给子组件定义的所有方法的集合（即，一些@emit）
 - 通过`$listeners`可以向孙组件去传递那些emit事件，由孙组件去触发“爷组件”的方法

### [Vue.js]改变prop值的方法
> Vue一般防止子组件改变父组件的状态，所以不应该在子组件内部改变prop

#### 不改变父组件
 - data（利用prop作为初始值，后续修改本地data）
 - computed（“听父从命”，当父通知prop值改变，子组件computed）

#### 改变父组件（.sync）
 - .sync（当子组件改变了prop值，这个变化也同步到父组件中）
 ```js
 // parent.vue
 <child :inputValue="name"></child>

 // child.vue
 props: {
     inputValue: { type: 'String', default: '' }
 },
 data() {
     return {
         iValue: this.inputValue
     }
 },
 watch: {
     iValue(val) {
         this.$emit('update:inputValue', val) // 当子组件需要更新inputValue时，
     },
     inputValue(val) {
         this.iValue = val
     }
 }
 ```
 实际上，`.sync`代表的是

 ```js
 model: {
     prop: 'inputValue', // 子组件的prop值
     event: 'update' // 子组件的prop值绑定的事件
 }
 ```
 `v-model`代表的是
 ```js
 model: {
     prop: 'value',
     event: 'input'
 }
 ```