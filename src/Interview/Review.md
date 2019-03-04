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
### [Vue.js]Vue里面的继承
#### extend（单继承）
 - Vue的全局方法
 ```js
 Vue.extend(...) // 传递Vue实例选项
 ```
 - Vue的实例选项
 ```js
 export default {
     extends: myExtend
 }
 ```
#### mixin（多继承）
混入 可以接受 对象数组，所以类似多继承。

当使用“混入对象”时，所有“混入对象”的选项，都将适当地 **合并** 到该组件本身的选项
 - Vue的全局方法
 ```js
 Vue.mixin({
     created() {
         // ...
     }
 })
 ```
 - Vue的实例选项
 ```js
 export default {
    mixins: [ ... ]
 }
 ```

 #### 继承的合并规则
  - 对象（覆盖冲突）
    - （覆盖顺序优先）组件内部 > 混入对象（数组最右最优） > Extend对象

  - 钩子函数
    - （调用顺序优先）Extend对象 > 混入对象（数组最右最优） > 组件内部

### [HTML5]HTML5的新语法
#### 语法优化
 - DOCTYPE html 简化
    - 字符编码更简洁
    - 不区分大小写

#### 新增标签（语义化）
 - 结构标签
    - header（头部信息、标题）
    - nav（导航条）
    - section（内容区块）
    - article（核心内容）
    - footer（底部信息）

 - 表单标签（input的type属性）
    - email
    - url
    - number
    - range
    - Date
    - search
    - color

 - 媒体标签
    - video
    - audio
    - embed（嵌入内容，包括各种媒体：PDF、MP3等）

### [CSS3]CSS3的新增属性
CSS3样式提纲：
 - 圆角（border-radius）、阴影（box-shadow、text-shadow）、渐变（gradient）、滤镜（filter）、文字省略（text-overflow: ellipsis）
 - 动画（animation）
 - 过渡（transition）、变换（transform）