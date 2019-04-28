# 项目经验
转载请注明出处: [https://github.com/Heshiyu1996/blogs](https://github.com/Heshiyu1996/blogs)

### [Vue.js]Vue.js的优势与不足：
 - 优势（特点）
    - 从`React`那里借鉴了`组件化`、`prop`、`单向数据流`、`性能`、`虚拟DOM`、`状态管理`
    - 从`Angular`那里借鉴了`模板`、`双向数据绑定`
    - 单文件组件（.vue）
        - 将html/js/css存在于一个文件内，然后得益于`webpack + vue-loader`来让浏览器识别
        - 好处1：Style的作用域
        - 好处2：预加载器（在template、style中的lang属性）
 - 不足
    - 模板的`运行时错误`描述不够直观（**异常堆栈信息**总是指向Vue.js的内部方法）

### [Vue.js]如何实现Vue.js的响应式数据绑定？
Vue实例初始化的过程中，实现依赖管理。大致总结如下：

 - `initState`过程中，把`props、data、computed`等属性通过`Object.defineProperty`来改造其`getter/setter`属性，并为每一个响应式属性去实例化一个`observer`观察者；
 - `observer`观察者内部的`dep`对象会记录这个响应式属性的所有依赖；
 - 当响应式属性调用`setter`函数时，通过`dep.notify()`方法去通知所有依赖进行改变，然后会通过diff算法来计算出更新了的虚拟节点，最后patch到真实dom上

### [Vue.js]render做了什么？
`render`函数会返回一棵VNode树。在挂载之前，会通过`createElem`、`createChildren`的相互调用，遍历整棵VNode树，来生成真实DOM节点。

### [Vue.js]$attrs 和 $listeners
$attrs是一个对象，存着由父组件传递给子组件、但是没有在子组件里prop的特性

$listeners也是一个对象，存着在`父作用域中的v-on事件监听器`
 - 通过`$listeners`可以向孙组件去传递那些emit事件，由孙组件去触发“爷组件”的方法
```html
<!-- u-search-type.vue -->
<u-input @keypress.enter="goSearch"></u-input>

<!-- u-input.vue -->
<input v-on="$listeners" />
```

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
`混入` 可以接受 对象数组，所以类似多继承。

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
  - 对象（只覆盖掉冲突的属性，`不冲突的属性会保留下来，且合并`）
    - 覆盖顺序：组件内部 > 混入对象（数组最右最优） > Extend对象

  - 钩子函数
    - 调用顺序：Extend对象 > 混入对象（数组最右最优） > 组件内部

```js
var mixin = {
  data: function () {
    return {
      person: {
        age: 22
      }
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      person: {
        name: 'heshiyu'
      }
    }
  },
  created: function () {
    console.log(this.person)
    // => { name: 'heshiyu', age: 22 }
  }
})
```

### [VueConf]Make Your Vue App Accessible

### [vuelidate]表单校验
 #### 调研思路：
  - 基于数据模型
  - 支持自定义函数
  - 支持嵌套
  - 支持Promise
  - 引入方式（可全局、可局部）
 
 #### 源码实现（数据响应）
  - 当实例化一个vue时，会通过`this.$options`获取该vue实例选项里的`validations`
  - 再把选项里的`配置规则`转化为`$v`属性
  - 将`$v`的代理通过`mixin`的方式，加入到Vue实例中的`computed`选项
  - 默认是通过`input`事件进行校验。作者也推荐开发者可以通过给`v-model`定义`.lazy`修饰符，使得校验器可以进行懒校验
 
### [Vue]生命周期
首先，从`new Vue()`开始
 - 初始化生命周期、初始化事件系统
 - `beforeCreate`
 - 初始化State（props、data、computed...）、watcher
 - `Created`
 - 有el选项吗？
    - 没有的话，等待 **vm.$mount(el)** 被执行时，才开始编辑
 - 有template选项吗？
    - 有，将template里的内容编译为render函数
    - 没有，将el的outerHTML整个内容编译为render函数
 - `beforeMount`（此时已准备好render函数了）
 - 将render函数返回的VNode树渲染到真实DOM上
 - `mounted`（挂载成功！）

----
 - 当data发生变化（未重绘）
 - `beforeUpdate`
 - 执行diff算法，并将变化的部分patch到真实DOM
 - `updated`
----
 - 当this.$destroy()被执行
 - `beforeDestroy`
 - 摧毁子组件、事件绑定、数据监听
 - `destroyed`（摧毁成功！）


### vuex

### [jQuery]源码
 - 首先，是从`闭包` + `立即执行函数`开始的（传入了window对象）
    - 目的：避免变量冲突
 - 然后，`重载`很常用
    - 原因：单单为了实例化一个jQuery对象，就有9种不同的方法
 - 最后，`链式调用`实现原理
    - 原因：实现很简单。只需在实现链式调用的方法的返回结果里，返回this即可解决

### [js]Babel将ES6转换成ES5的原理
 `Babel`是一个转译器，它是将`JavaScript的高版本规则`转移成`低版本规则`的一个工具。

 它的原理分三个部分：
  - parsing（解析）
    - 把ES6代码生成AST
  - transforming（转译）
    - 把AST遍历，优化成新的AST
  - generating（生成）
    - 按照新的AST生成ES5代码

 #### plugins和presets 
 `plugins`应用于整个转译过程（尤其是`transforming`）

 `presets`是官方提供的一些预设的插件集

 #### babel-polyfill和babel-runtime
 `Babel`默认只转换js的新语法，而不转换新的API。为了弥补这个不足，需提供一个`polyfill`

 `babel-polyfill`能够`加载整个polyfill库`

 引入方法：
 ```js
 // 第一种：在main.js里
 import 'babel-polyfill'

 // 第二种：在webpack.config.js中
 module.exports = {
     entry: ['babel-polyfill', './app/js']
 }
 ```

 问题：
  - 导致污染全局环境
  - 重复代码过多
 
 解决：使用`babel-runtime`（它可以提供一些`转译模块的工具函数`）

#### vue-cli 3.0的babel
在vue-cli 3.0根目录下，有`babel.config.js`（采用babel7的新配置格式）。
 - 里面预先配置了`preset`，它的值是`['@vue/app']`
 - 也可以配置`plugins`（引用插件来处理代码的转换。和`preset`平级。）

### [工具]npm和和yarn的区别
`yarn`是Facebook和Google联合推出的`新的JS包管理工具`

`npm`是Node.js中`默认的包管理工具`

`yarn`有以下优点：
 - 速度快
    - 并行安装、离线模式
 - 版本锁定
    - yarn.lock
 - 更简洁的输出
 - 语义化的命令

### [BOT]
 #### 个人职责
  - 项目重构（Regular.js -> Vue.js）
  - 高阶组件库开发
  - 校验框架调研
  - 引入 登录功能、对象存储组件

 #### 项目亮点
  - 重components、轻pages
    - 页面结构清晰
  - 原生组件可复用
    - u-modal
  - 资源模块化
    - vuex
        - 将vuex实例选项按模块划分，引入命名空间
        - 通过index.js将各模块导入，封装到modules对象里，再传入Vuex的构造函数中
    - api
        - 将接口按模块归类。利用index.js进行“导入再导出”

 #### 难点
 无分页列表数据庞大，无法正常显示。
 
 主要问题：
 - 数据加载慢
 - 校验（去重、字符规则）
 - 全量保存

 解决方案：
 - 真分页 + 增量保存
    - 将校验交给后台。劣势：1、后台工作量增多；2、请求频繁，且耗时；
 - 假分页 + 全量保存
    - 将校验交给前端。
- vue-virtual-scroller
    - 第三方库分页工具。
    - 两种模式：
        - RecycleScroller
            - 只加载当前可视窗口的图片
            - 复用组件、DOM元素
        - DynamicScroller
            - 利用RecycleScroller
            - 外加了一个：动态尺寸管理
    - 大致思路：把刷新`可视区域的item`这个事件，放到用户滚动时触发；通过记录上次加载的startIndex、以及endIndex来记住buffer（？）


### [觅见日记]
 #### 个人职责
  - 调研并引入fly.js
  - 开发登录部分
  - 前端资源模块化
  - 视觉UI设计

 #### 项目亮点
  - 请求响应统一拦截配置
    - 根据不同的code对响应进行不同的逻辑处理
  - LS以及Vuex巧妙搭配
    - LS作为存储方、Vuex作为提供方
  - 资源模块化
    - vuex
        - 将vuex实例按模块归类，引入命名空间
        - 通过index.js将各模块导入，封装到modules对象里，再传入Vuex的构造函数中
    - api
        - 将接口按模块归类。利用index.js进行“导入再导出”

 #### 难点
 1、登录态、userInfo的获取与存储
 
 主要问题：
 - 判断过程需要微信服务端的加入（需判断微信端中的session_key是否过期）
 - 登录态、userInfo在前端的存储（减少HTTP请求）
 - 为已授权的用户的userInfo存储到后端（减少重新授权操作）

 解决方案：
  - 采用了`LS（存储方）` + `Vuex（提供方）`搭配。
    - 小程序加载，检查`LS`里的登录态：
        - 若有，将`登录态`配进请求头；将`userInfo`存到`vuex`。（`LS`在，则证明`userInfo`也在）
        - 若没有，发起`wx.login()`，利用`code`和服务端换取新的`登录态`。随后将`登录态`存到`LS`，并配进请求头；通过与后端拉取`userInfo`，存到`LS`、`vuex`
    - 用户授权时，微信会返回最新`userInfo`，再更新`userInfo`到后端

 2、登录态的统一拦截判断

 主要问题：请求具有登录权限的接口时，根据返回的登录态进行统一响应拦截处理

 解决方案：
   - 在`请求拦截器`中统一加入与后端约定好的`登录态`自定义属性
   - 在`响应拦截器`进行判断：
        - 判断后端返回的`data.code`：
            - 3 - 记录`登录态`；
            - 2 - `登录态`失效了、发起`wx.login()`，自动完成登录然后继续发起这个请求；
            - 1 - 表明500，统一出现报错提示
            - 0 - 表明正常，这时候才返回响应结果

 #### fly.js
 因为小程序是在jsCore环境下执行，在这个环境下并没有window，也没有XMLHttpRequest对象。

而fly.js它是通过自定义http engine来实现不同的adapter，来支持不同环境的。


### [小程序]登录过程
  - 微信
    - 小程序端调用`wx.login()`获取`code`
    - 带着`code`，传递给开发者后端
    - 开发者后端带着`code + appid + appsecret`跟微信后端换取`session_key + openid`
    - 开发者后端将`自定义登录态`与`session_key + openid`关联，并响应给小程序`登录态`
      - 并将session_key和openid存到redis里，过期后会重新请求
    - 小程序把`登录态`写入Storage，等到下次有需要登录权限时，从Storage获取
    - 开发者后端通过`自定义登录态`去查询`session_key + openid`，返回业务数据

  - 支付宝
    - 小程序端调用`getAuthCode`，向支付宝App获取`auth_code`
    - 小程序端携带`auth_code`给开发者后端，发起登录验证请求
    - 开发者后端通过`auth_code`与支付宝授权平台获取`token`和`uid`
    - 开发者将`token`和`uid`种到session里，并响应给小程序端验证成功
    - 在session有效期内，不需重复授权


### [小程序]生命周期
  - beforeCreate
  - created
    - 所有页面created会在项目加载的时候一起被调用，进入页面不会被调用，一般用onLoad代替
--------
  - onLoad，页面加载
  - onShow，页面显示
  - onReady，页面初次渲染完成
  - onHide，页面隐藏
  - onUnload，页面卸载
--------
  - beforeMount
  - mounted
    - 从B返回到A，A的mounted不会被触发，因为页面没有被重新加载，一般用onShow代替
  - beforeDestroy
  - destroyed

### [小程序]跳转区别
 `redirectTo`，跳转到指定页，并关闭当前页

 `navigateTo`，跳转到指定页，并保留当前页
 
 `switchTab`，跳转到tab bar页面，并关闭其他非tab bar页



### [Axios] 源码解析
 `Axios`是一个基于`Promise`的http请求库。

 ```js
 function Axios() {
     this.interceptors = {
         request: new InterceptorManager(), // 请求拦截器
         response: new InterceptorManager() // 响应拦截器
     }
 }
 ```
 每个axios实例都有一个`interceptors`实例属性，同时这个`interceptors`对象上有两个属性`request`、`response`，它们都是`InterceptorManager`的实例。`InterceptorManager`构造函数时用来实现拦截器的，且这个构造函数原型上有3个方法：`use`、`eject`、`forEach`。

 一般我们最常用的是`use`，
  - 对于`request`，我们就在`use`里对`config`进行修改，随后会覆盖掉默认配置
  - 对于`response`，我们就在`use`里对后端返回的数据进行一个预处理再返回

### [MVC] 什么是MVC？
`M`指的是Model层
   - 用于封装和业务逻辑相关的数据、以及对数据处理的方法

`V`指的是View层
   - 监听模型层上的数据改变，并实时更新页面

`C`指的是Controller层
   - 负责接收用户的操作，然后调用模型或视图去完成用户的操作

 本质是：将**数据展示** 和 **数据** 进行隔离，提高代码的复用性和扩展性；

 特点：职责明确、相互分离；
 
### [MVVM] 什么是MVVM？
 `M`：Model层，存放数据

 `V`：View层，视图层

 `VM`：ViewModel层，负责：
   - 将Model层的数据`同步`到View层，进行呈现
   - 将View层的修改`同步`到Model层，进行存储

### 移动端touch事件和web端click的区别
在移动端，在手指点击一个元素，会经过：**touchstart -> touchmove -> touchend -> click**

`touchstart`，手指一触碰就能触发

`click`，则需要：
 - 手指触碰
 - 手指未在屏幕上移动
 - 手指在这个dom节点上离开屏幕
 - 触摸和离开的时间间隔短
 - 如果不想触发click，可以执行`ev.preventDefault()`

 #### 两端在事件对象上的区别（TouchEvent、Touch、TouchList）
 对于`TouchEvent`（触摸事件对象），它会比`MouseEvent`（鼠标事件对象）多出一些属性值：
  - touches
    - 当前屏幕上，所有`Touch对象`的列表
  - targetTouches
    - 当前对象上，所有`Touch对象`的列表
  - changedTouches
    - 涉及当前事件的，所有`Touch对象`的列表
 
 同时，与`MouseEvent`中有关位置/目标的属性：`clientX`、`clientY`；`pageX`、`pageY`；`screenX`、`screenY`、`target`会放到`Touch对象`中。

 #### click延时的问题
 原因：移动端上，两次轻触是放大操作。在第一次轻触后，浏览器会等一段时间（`300ms`延迟左右）来判断是否为连续触碰，才会触发`click`事件

 解决方式：
  - 原生解决：
    - 利用`touchstart`、`touchend`记录`时间`、`手指位置`。若期间手指处于同一位置、且时间很短、且期间未触发`touchmove`事件，则可触发`click`，并且阻止`touchend`的默认行为
  - 利用Zepto.js中的`tap`事件（`singleTap`点击事件）解决
    - 缺点：会发生`点透事件`
 
 #### “点透事件”
 原理：因为`tap`是通过`touch`事件模拟的，故`tap`要冒泡到`document`才触发
 原因：
  - 有两层A、B（A盖在上面）
  - 在`touchstart`阶段就隐藏了A；当`click`被触发时，能够使下面的B“被点击”
  - **touchstart -> touchmove -> touchend -> click**
 
 解决办法：为元素绑定`touchend`事件，并在内部加上`e.preventDefault()`，从而阻止`click`事件的产生

 #### “滑动事件”
 通过`touchstart`、`touchend`来计算此次的滑动方向。
 ```js
 // 调用时：setListenForWipe(elem, gesture, type)
 setListenForWipe(elem, gesture, type) {
     if (type) {
         // 1、绑定touchstart、touchend
         // 2、记录startX、startY（从ev.touches[0].pageX中取值）
         // 3、记录endX、endY（从ev.changedTouches[0].pageX中取值）
         // 4、取完endX、endY后计算角度、方向
         // 5、将方向赋值给传入的gesture对象
     } else {
         // 解绑touchstart、touchend
     }
 }
 ```
 注意：对于`touchend`事件，`touches`和`targetTouches`只存储接触到屏幕上的点，要获取最后离开的触摸点，要用`changedTouches`

 
### 重构的好处？
 - 实现前后端分离
 - 代码优化
 - 减少后期维护的学习成本


### 两个异步请求，若第二个比第一个先返回，对于第一个的结果如何cancel掉？
栈


### 通讯录搜索（按姓名查询、或按首拼音）
将各个汉字各自存起

### 把svg当做字体


### 为什么IE8不能使用webpack？
 - IE8不怎么兼容ES5
 - 不支持__proto__
 - 不支持default关键字



### 如何限定只接收10个http响应？

### 对前后端分离的理解？
![alt](./img/img-13.png)

部署方式：前后端分开部署，利用中间件（如Nginx）进行代理转发

各端职责：
  - 前端
    - 负责控制页面的跳转、异步请求数据
    - 存放css、js等静态资源，并使用CDN加速；

  - 后端
    - 返回数据

优势：
  - 提升开发效率
  - 减少后端的负载压力
  - 增强项目代码的可读性和维护性

缺点：
  - 部署顺序（后端先部署）
  - 文档重要性

### [H5]兼容性

### [web]前端项目搭建
 - 安装Node
 - npm init -y
  - 生成`package.json`
 - npm install --save-dev webpack
 - 安装插件（babel-core、loaders、vue...）
 - 进入webpack.config.js进行配置
  ```js
  module.exports = {
    entry: './index.js',
    devServer: {
      port: 8083,
      hot: true
    }
  }
  ```
 - 新建index.js、index.html
 - 进入package.json修改script
 ```json
 {
   start: "webpack-dev-server"
 }
 ```
 以下是结合vue的：
 - 新建src
  - 里面还有assets、pages、index.js、app.vue...
 - 配置webpack.config.js（特别是output、loaders）
 - 在index.html新增
 ```js
 <div id="root"></div>
 ```
 - 在app.vue新增
 ```js
 import vue from 'Vue'
 new Vue({...})
 ```
 - npm start

### [移动端]滚动性能优化
因为一般`事件处理函数`（耗时）会比`默认行为`先执行。对于滚动事件，也是一样。所以看上去可能会出现一些卡顿。

解决方法：`Passive event listeners`（被动事件监听器）
```js
elem.addEventListener('touchstart', fn, { passive: false })
```
通过给第三个参数传递`passive`为`false`（被动为假，即主动。）来明确告诉浏览器：**事件处理程序**自己会调用`preventDefault`来阻止默认行为，你不用等了。

如果能提前告诉浏览器：**“我不调用preventDefault来阻止默认行为”**，那么浏览器就能快速生成事件，从而提升页面性能。

### [Vue.js]slot-scope

### [移动端]判断是否为Retina屏
```js
if (window.devicePixelRatio && window.devicePixelRatio >= 2)
```
### [weppack]webpack常用的loader和plugins
loader:
 - vue-loader、sass-loader、babel-loader、url-loader

plugins:
 - html-webpack-plugin
    - 用于生成一个html文件，并将最终生成的js、css以及一些静态资源以`script`、`link`的形式动态插入其中。
 - webpack-dev-middleware
    - 生成一个和webpack的compiler绑定的中间件
 - webpack-dev-server
    ```js
    // 配置 webpack-dev-server 行为
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8081,
        https: false,
        proxy: null
    }
    ```

### [webpack]webpack插件是怎么实现的
webpack插件有以下特点：
 - 独立的JS模块，暴露相应函数
 - 函数原型上的apply方法会注入compiler对象
 - compiler对象上挂载了相应的webpack事件钩子
 - 事件钩子的回调函数里能拿到编译后的compilation对象（如果是异步钩子还能拿到相应的callback）

#### 为什么要定义apply方法？
底层源码是通过`plugin.apply()`调用插件的。

#### compiler对象
开发插件时，可以从`compiler`对象里拿到`所有和webpack主环境相关`的内容。

#### webpack常见的事件钩子
 - after-plugins
    - 设置完一组插件的初始化之后
 - run
    - 在读取记录之前
 - compile
    - 在创建新的compilation之前
 - emit
    - 在生成资源、并输出到目录之前
 - after-emit
    - 在生成资源、并输出到目录之后
 - done
    - 完成编译

### [移动端]移动端适配1px问题
问题：在移动端上，有时候设置`border: 1px`，但实际上显示的是2px（或3px）

原因：
 - 1、`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`，定义了初始值、最大缩放值为1，并禁止用户缩放。一刀切。
 - 2、`devicePixelRatio = 设备物理像素 / 设备独立像素`，其中*设备独立像素*就是设置的css像素，`设备物理像素`就是实际显示像素。（对于Retina屏，该值为2或者3）

 解决：
 - 1、配体查询、小数（不推荐）
    - 安卓、低版本IOS（8以下）不兼容小数。
        ```css
        .border {
            border: 1px solid red;
        }
        @media screen and (-webkit-min-device-pixel-ratio: 2) {
            .border {
                border: 0.5px solid red;
            }
        }
        @media screen and (-webkit-min-device-pixel-ratio: 3) {
            .border {
                border: 0.33333px solid red;
            }
        }
        ```
 - 2、flexible.js
    - 检测IOS机型，计算出`scale = 1/devicePixelRatio`，然后`设置viewport`
    ```js
    scale = 1 / devicePixelRatio

    metaElem = document.createElement('meta')
    metaElem.setAttribute('name', 'viewport')
    metaElem.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
    ```
 - 3、伪类+transform
    - 利用js判断是否Retina屏；把`原先元素border去掉`，利用:before和:after`重做border`，并`transform: scale(0.5)`
    ```js
    // 利用js判断是否Retina屏
    if (window.devicePixelRatio && devicePixelRatio >= 2) {
        document.querySelector('div').className = 'scale-1px'
    }
    ```
    ```css
    .scale-1px {
        position: relative;
        border: none;
    }
    .scale-1px:after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid red;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform: scale: left top;
    }
    ```
### [移动端]a标签点击出现灰色背景
解决：
 - 1、IOS和部分安卓
    ```css
    .child {
        -webkit-tab-highlight-color: rgba(0, 0, 0, 0);
    }
    ```
 - 2、部分安卓、winphone
    ```html
    <meta name="msapplication-tap-highlight" content="no">
    ```
 - 3、小米2
    使用`div`标签

### [移动端]滚动卡顿问题
原因：
 - 1、`事件处理函数`会比`默认行为`先触发（除了checkbox）
 - 2、浏览器无法预知用户是否禁止默认行为

解决：
通过`passive为true`来明确告诉浏览器：**事件处理函数不会调用preventDefault来阻止默认滚动行为。**（浏览器就能快速生成事件，从而提升页面性能。）
```js
elem.addEventListener('touchstart', fn, { passive: true })
```

### [移动端]click延时问题
原因：移动端双击会放大，在第一次点击后需等待200ms左右来判断是否会进行下次双击

解决：
 - 1、利用zepto.js
    - 优点：利用tab事件来监听click
    - 缺点：点透事件（移动端的事件冒泡机制：touchstart、touchmove、touchend、click）
 - 2、原生js实现
    - 思路：监听touchstart事件。若无移动，且在离开屏幕时，触发touchend时计算时间差，若很短，则主动进行click事件，并preventDefault在touchend上的冒泡。

### [pc]keep-alive不能正常销毁
问题：设置了`<keep-alive>`组件的include属性后，keep-alive组件不能正常销毁，且会占用内存。

解决：
 - 1、给所有vue实例增加name实例选项（未解决）
 - 2、查看keep-alive源码：
 ```js
  // created时，创建cache对象
  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  // destroyed时，遍历cache对象，并删除
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  
  // mounted时，会监听include、exclude这两个字段
  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  }

  // pruneCache函数用于判断缓存规则，若不符合，则去除该keep-alive组件
 ```
 通过断点，发现destroyed没有进入。查看该组件，发现是手动触发了this.$destroy方法，使得缓存组件无法正常摧毁。

 ### [pc]庞大数据的渲染、校验、保存问题
 问题：庞大的数据导致前端的渲染、保存卡顿
 
 解决：
  - 1、后端真分页、后端校验、单条保存
    - 缺点：HTTP请求增多
  - 2、前端假分页、前端校验、整体保存
    - 优点：减少HTTP请求、校验快
  - 3、利用vue-virtual-scroller
    - 优点：懒加载
    - 原理：将加载事件绑定在scroll事件上，并记录上次渲染item的startIndex、endIndex，利用一个buffer进行存储。
 



