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

4个常用的方法：
 - src（）：获取流
 - dest（）：写文件
 - task（）：定义任务
 - watch（）：用来监听事件

webpack：是一个前端模块化的方案，侧重模块打包。把开发的资源看成模块，通过`loader`、`plugins`对资源进行处理，最后打包成符合生产环境部署的前端资源。

使用方法：
 - 不同环境下全局安装的webpack版本可能不符合这个项目，所以还是用局部依赖
 - ./node_modules/.bin/webpack input.js output.js
 - 从入口文件`input.js`开始，找出所有依赖的文件，然后用对应的loaders去处理它们
 - 最后打包成为一个浏览器可识别的js文件`output.js`

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
 - 新增盒模型——弹性盒模型（Flexbox）
 - 新增box-sizing：content-box（即标准盒模型）、border-box（即IE盒模型）

### 盒模型
 - 标准盒模型
 width、height、padding、border、margin 五个独立，所设及所得

 - IE盒模型
 width（height）包括了padding、border，（`margin依旧独立`），故最终width会小一些

### 弹性盒模型
采用Flex布局的元素，成为`Flex容器`，它的子元素自动成为`Flex项目`

容器存在两根轴：`主轴（水平）`、`交叉轴（垂直）`。`项目`默认沿主轴排列
 - 容器的属性
    - **justify-content** // 主轴上项目的对齐方式 { flex-start | flex-end | center | space-between }
    - **align-items** // 交叉轴上项目的对齐方式 { flex-start | flex-end | center }
    - flex-direction // 主轴的方向
    - flex-wrap // 主轴是否换行
    - flex-flow // 上两个缩写

 - 项目的属性
    - order // 项目各自的排列顺序
    - flex-grow // 放大比例
    - flex-shrink // 缩小比例
    - flex-basis
    - **flex** // 上三个的缩写

### 完美居中的方案
 详见[2019-03-10](./2019-03-10.md)里的居中
### [CSS]CSS定位
 - 绝对定位
    - position: absolute | fixed（前者相对非static的父元素、后者相对浏览器的左上角）
 - 相对定位
    - position: relative（相对本身所在位置）

### 闭包
`闭包`就是一个函数，这个函数能够访问 **其他函数的作用域** 中的变量。

当函数可以记住并访问所在的词法作用域时，就产生了闭包。

原理：内部函数的作用域链包含这个函数的作用域

特点：
 - 可以读取另外一个函数作用域里的变量
 - 可以将这些变量保存在内存中
 - 可能会导致内存泄露（因为闭包会携带：包含它的函数作用域）
 - 创建一些特权方法

#### 为什么闭包可以访问其他函数的作用域链？
当调用一个函数时，
 - 创建该函数的执行环境
 - 在环境中创建它的作用域链
 - 通过arguments和命名参数来初始化一个活动对象，push到作用域链顶端
 - 再往作用域链后面push其他活动对象

```js
function outer() {
    var a = 'heshiyu'
    var inner = function() {
        console.log(a)
    }
    return inner // 注意这里只是返回对这个方法的引用
}
var inner = outer() // 获得：闭包函数inner
inner() // 'heshiyu'
```
当程序执行完`var inner = outer()`，其实`outer`的执行环境并没有销毁。因为它里面的**变量a仍然被inner函数的作用域链所引用**，当程序执行完`inner()`，`inner`和`outer`的执行环境才被销毁。

### 事件委托

### 移动端H5适配
#### video里的子标签的track
在不同的手机系统、不同的浏览器都不兼容

## 2019-03-05
### [JS]回调函数
把函数作为参数传递，等待请求完成之后执行callback函数

需求：创建100个div节点，然后把这些div节点都**设置为隐藏**。
```js
var appendDiv = function() {
    for ( let i=0; i< 100; i++) {
        var div = document.createElement('div')
        div.innerHTML = i
        document.body.appendChild(div)
        div.style.display = 'none' // 这句不合理，影响复用
    }
}
appendDiv()
```
可以看出`div.style.display = 'none'`的硬编码放在`appendDiv`中显然是不合理的。因为并不是每个人创建了节点都希望他们立刻被隐藏。

做法：把`div.style.display = 'none'`抽离出来，用**回调函数**的形式传入appendDiv：
```js
var appendDiv = function(callback) {
    for( let i=0; i< 100; i++ ) {
        var div = document.createElement('div')
        div.innerHTML = i
        document.body.appendChild(div)
        // 节点创建好了，还有其他需求吗？
        if (typeof callback === 'function') {
            callback(div)
        }
    }
}

appendDiv(function(node) {
    node.style.display = 'none' // vip客户说：我还要增加一个功能，隐藏掉div
})
```
把`“隐藏节点”`的逻辑放在回调函数中，委托给appendDiv方法，在指定时刻执行这个“客户定义的”回调函数。

### vuex、redux

### 设计模式
#### 发布-订阅模式
发布-订阅模式（也称：观察者模式），它定义了**对象间的一对多依赖**关系（即，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知）

优点：
 - 时间上（广泛应用于异步编程，是一种代替传递回调函数的方案）
 - 对象间（不需强耦合再一起。虽然不清楚彼此细节，但不影响它们之间通信）

 ### [HTTP]HTTP、HTTPS

## 2019-03-06
 ### [浏览器]内核
 - Trident （IE内核）
 - Gecko （Firefox内核）
 - Presto（Opera，已废弃）
 - Webkit（Safari、Chrome28前）
 - Blink（Chrome28后）

 ### [浏览器]强缓存和协商缓存
 第一次请求成功后，再次请求同一个网页：
  - 获取第一次请求成功后缓存下来的`Header`，里面包括：`Expires`、`Cache-control`、`Last-Modified`和`ETag`。前两者属于强缓存，后两者属于协商缓存
  - 先看`Expires`和`Cache-control`，检查是否命中 `强缓存`
    - 若是，直接从本地磁盘获取资源（200）
    - 若不是，再看`Last-Modified`、`ETag`检查是否命中 `协商缓存`
        - 若是，浏览器会响应新的Header信息给客户端（但不会返回资源内容），没有新修改的地方（304）
        - 若不是，响应全新的资源内容给客户端

### [HTML]HTML5 本地存储
  * [sessionStorage、localStorage、cookies的区别（2019-01-13）](/src/Browser/webStorage.md)

### [WEB]XSS、CSRF、SQL注入
针对Web服务器的攻击，常见的有：`XSS（跨站脚本攻击）`、`CSRF（跨站请求伪造）`、`SQL注入`

#### XSS（跨站脚本攻击）
依赖JS。

攻击者向某个web页面插入恶意的js脚本。当普通用户访问时，恶意脚本会自动执行，然后盗取用户cookie

解决方法：
 - 对于`输入点`，前端将`特殊字符进行编码`（例如Html标记的<>）
 - 对于`输出点`，后端将`关键字符进行过滤`
 - 对于`cookie`设置为`httpOnly`（防止客户端通过document.cookie读取cookie）

#### CSRF（跨站请求伪造）
攻击者盗用你的身份，以你的名义发送恶意请求。

解决方法：
 - 验证`HTTP Referer`字段
 - 在请求地址中`添加token并验证`
 - 在HTTP头中`添加自定义属性并验证`

#### SQL注入
攻击者把SQL命令插入到web表单的输入框，欺骗服务器执行恶意的SQL命令。

解决方法：对用户的输入进行检查

### [浏览器]输入URL，会发生什么？
1、浏览器输入url

2、浏览器检查`强缓存`（Expires、Cache-control）

3、解析url、获取主机ip

4、组装Http报文

5、打开socket与目标ip，端口建立TCP连接

6、TCP连接建立后，发送HTTP请求

7、服务器接收并解析，检查`协商缓存`（ETag、Last-Modified）

8、通过TCP返回响应报文

9、浏览器缓存响应

10、浏览器进行`解析HTML（构造DOM树）`、`下载资源`、`构造CSSOM树`、`执行JS脚本`

### [Web]性能优化
 - content方面
    - 减少DOM元素数量
    - 减少DNS查询
    - 减少HTTP请求
 
 - Server方面
    - 使用CDN
    - 使用Expires、Cache-Control响应头，配置ETag

 - Cookie方面
    - 减小cookie大小

 - css方面
    - 将样式表放到页面顶部
    - 不使用CSS表达式

 - js方面
    - 将脚本放到页面底部
    - 减少DOM访问

 - 图片方面
    - css精灵

### [Web]渐进增强、优雅降级
渐进增强是指，针对`低版本浏览器`进行构建（先保证最基本的功能），然后再针对`高级浏览器`进行改进。

优雅降级是指，一开始就构建`完整的功能`，然后再针对`低版本浏览器`进行兼容。


### [VueConf]Make Your Vue App Accessible

### [js]原型对象、原型指针与原型链
`prototype`是指原型对象。
 - 作用：
    存放着所有实例对象的公用属性和方法（即原型属性和方法）
 - 原理：
     - 因为每个构造函数都有`prototype`属性，它指向的是该构造函数的原型对象；
     - 再者，原型对象也有一个`constructor`属性，它指向的是该构造函数本身
     - 也就是说，当实例化一个对象的时候，我们不仅可以获得这个`对象的实例属性（和方法）`，还可以获得`原型对象上的原型属性（和方法）`

`原型链`是作为 **实现继承** 的主要方法，其基本思想是：`利用原型，让一个引用类型继承另一个引用类型的属性和方法`。

`__proto__`是原型指针，指向原型。（每个对象有都有的属性）

 > 原型链实际上是`__proto__连起来的链条`

 ### URS

 ### NOS

 ### 单例模式

 ### [vuelidate]表单校验
 #### 调研思路：
  - 基于数据模型
  - 支持自定义函数
  - 支持嵌套
  - 支持Promise
  - 引入方式（可全局、可局部）
 
 #### 源码实现（数据响应）
  - 先获取Vue实例中的`validations`选项（通过`this.$options`）
  - 再把选项里的配置规则转化为`$v`属性
  - 将`$v`的代理通过`mixin`的方式，加入到Vue实例中的`computed选项`
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
 - 摧毁watcher、子组件、事件绑定
 - `destroyed`（摧毁成功！）


### vuex

### [jQuery]源码
 - 首先，是从`闭包` + `立即执行函数`开始的（传入了window对象）
    - 目的：避免变量冲突
 - 然后，`重载`很常用
    - 原因：单单为了实例化一个jQuery对象，就有9种不同的方法
 - 最后，`链式调用`实现原理
    - 原因：实现很简单。只需在实现链式调用的方法的返回结果里，返回this即可解决

### [babel]
在vue-cli 3.0根目录下，有`babel.config.js`（采用babel7的新配置格式）。
 - 里面预先配置了`preset`，它的值是`['@vue/app']`
 - 也可以配置`plugins`（引用插件来处理代码的转换。和`preset`平级。）

### [npm]和yarn的区别

### [Node.js]
Node.js 采用了`单线程`、`异步式I/O`、`事件驱动`的程序设计模型，实现了：`包和模块`、`文件系统`、`网络通信`、`操作系统API`等功能

#### 异步式I/O
 - `线程1` 将 **I/O操作** 发送给 `操作系统`，继续执行后面的语句；
 - 执行完后，会马上进入 **事件循环**（不断地检查 **事件队列** 有没有未处理的事件）
 - 当操作系统完成 **I/O操作** 时，以 **事件** 的形式发送到 **事件队列**
 - `线程1` 在 **事件循环** 中，检查到 **事件队列** 存在未处理的事件；**事件循环** 会 **主动调用回调函数** 来完成后续工作

#### 事件驱动events
 > `events`模块提供了唯一的接口，它几乎被所有的模块依赖。
`events`模块只提供一个对象：`events.EventEmitter`，其核心就是 **事件发射** 和 **事件监听** 功能的封装。
```js
var events = require('events')
var emitter = new events.EventEmitter()

emitter.on('someEvent', name => console.log(name))
emitter.emit('someEvent', 'name')
```

#### [浏览器]WebSocket
`WebSocket`是一种浏览器的API，它可以在一个单独的持久连接上建立双向通信

优点：
 - 支持服务端及时的消息推送；
 - 复用长连接；
 - 同一条`WebSocket`上能同时并发多个请求

缺点：
 - 需要维护`WebSocket`连接
 - 消息推送比较复杂


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
    - 尤其u-icon，可直接传svg、图片url
  - 资源模块化
    - vuex
        - 将vuex实例按模块归类，引入命名空间
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
  - 开发登录、图片上传部分
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


### [HTTP]状态码
 - 200：ok，正常返回
----
 - 301：永久性重定向
 - 302：临时性重定向
    - 相同点：以上两个都会跳转，搜索引擎会抓取最新内容
    - 不同点：搜索引擎会保存 `新地址（301）` / `旧地址（302）`
 - 304：Not Modified，响应内容没有改变（在协商缓存 - 有效后触发）
----
 - 400：Bad Request，服务器无法理解请求格式
 - 401：Unauthorized，请求未授权
 - 403：Forbidden，禁止访问
 - 404：Not Found，找不到匹配资源
----
 - 500：常见服务端错误
 - 503：服务端暂时无法处理请求

### 正向代理 和 反向代理
#### 正向代理
一般说的 **代理** 指的是**正向代理**（如：VPN）

正向代理的对象是 `客户端`

```js
// 在vue里的config/index.js中dev对象的proxyTable上设置，来解决开发时跨域问题
dev: {
    proxyTable: {
        '/api': {
            target: 'http://192.168.5.2',
            changeOrigin: true
        }
    }
}
```

#### 反向代理
反向代理的对象是 `服务端`

 - 在“反向代理”中，客户端做域名解析时，实际上得到的是 `反向代理服务器的IP`，而不是`服务器IP`
 - `Nginx`接收客户端请求，根据`server_name`去匹配对应的`server节点`；再找到里面的`proxy_pass`转发过去

 ```js
 // 客户端 部分
 192.168.72.49 8081.max.com
 192.168.72.49 8082.max.com
 --------------------------

 // 服务端 部分
 server {
     listen 80;
     server_name 8081.max.com // 根据这个字段进行匹配

     location / {
         proxy_pass http://192.168.72.49:8081 //再根据这个字段进行转发
     }
 }

 server {
     listen 80;
     server_name 8082.max.com

     location / {
         proxy_pass http://192.168.72.49:8082
     }
 }
 ```

 ### [HTTP]请求头



 ### TypeScript接口用途

 ### [小程序]登录过程
  - 小程序端调用`wx.login()`获取`code`
  - 带着`code`，传递给开发者后端
  - 开发者后端带着`code + appid + appsecret`跟微信后端换取`session_key + openid`
  - 开发者后端将自定义登录态与`session_key + openid`关联，并响应给小程序`登录态`
  - 小程序把`登录态`写入Storage，等到下次有需要登录权限时，从Storage获取
  - 开发者后端通过`自定义登录态`去查询`session_key + openid`，返回业务数据

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

 ### [ES7] callback、Async/Await和Promise
 #### 回调函数
 如果是以前，可以用`回调函数`实现：
 ```js
 function runAsync(callback){
     if(/* 异步操作成功 */) {
         callback(value)
     }
 }

// 传入一个匿名函数作为回调函数
 runAsync(funtion(data) {
     console.log(data)
 })
 ```
 缺点：
  - 容易造成 **回调地狱**
  - 影响阅读体验

 #### Promise
 Promise是一个容器，而且代表的是一个异步操作，有3种状态：
  - `Pending（进行中）`
  - `Fulfilled（已成功）`
  - `Rejected（已失败）`
  
  只有 **异步操作的结果** 可以决定当前是哪一种状态，任何其他操作都无法改变这个状态（也就是“承诺”的意思）。
  
  并且，**它的状态可以影响后续的then行为**
 ```js
 // Promise的构造函数接收一个函数作为参数，这个函数又可以传入两个参数：resolve、reject；
 // 它们分别表示：异步操作执行后，Promise的状态变为Fulfilled/Rejected的回调函数。
 var promise = new Promise(function (resolve, reject) {
     // ...
     if(/* 异步操作成功 */) {
         resolve(value) // 这个value表示的是异步操作后获得的数据
     } else {
         reject(error) // 这个error表示的是异步操作后报出的错误
     }
 })
 ```
 优点：
  - 解决了 **回调地狱**
  - 方便阅读

 缺点：
  - 返回值传递
    - 仍然需要创建`then`调用链，需要创建匿名函数，把返回值一层层传递给下一个`then`
  - 异常不会向上抛出
    - `then`里函数有异常，`then调用链`外面写`try-catch`没有效果
  - 不方便调试
    - 在某个`.then`设置断点，不能直接进到下一个`.then`方法

 #### Async、Await
`async`是一个函数修饰符。如果是`async`关键词声明的函数会**隐式**返回一个`Promise`；

`await`后面跟也是`Promise`，它的语义是：必须等到`await`后面跟的`Promise`有了返回值，才能继续执行`await`下一行代码；

 好处：
  - 简洁。易于阅读和理解
  - 错误处理。
    - 可以被`try-catch`捕捉到
  - 方便调试。

 ### [mpVue]mpVue的源码
 开发微信小程序，如果使用mpVue会带来一些好处：
  - 提高代码复用性
  - 减少学习成本
  - 组件化
  - 状态的统一管理

#### mpVue的实现原理
 - 将`Vue.js实例`与`小程序Page实例`进行关联
 - 【生命周期关联】小程序和Vue.js的生命周期建立映射关系
    - 能在小程序生命周期中触发Vue.js的生命周期
 - 【事件代理机制】小程序建立事件代理机制，能在 **事件代理函数** 中触发对应的Vue.js组件事件响应
 - 【数据同步机制】vue和小程序的数据同步
    - 在实例化vue的时候，会执行`initState`，将props、data、computed通过`Object.defineProperty`转化成`getter/setter`的形式
    - 给每一个响应式属性实例化一个`observer`对象，对象里面也有一个`dep`对象，用来存储所有依赖的数据
    - 当`setter`触发时，会触发`dep.notify()`方法，通知`dep`中所依赖的数据
    - 最后再通过`diff算法`，patch到真实DOM中

### IE8兼容性
 - 兼容`addEventListener`和`attachEvent`
    - 解决方法：
        - 新增一个`EventUtils`对象
        - 里面封装一个`add`方法
        ```js
            vae EventUtils = {
                add: function(elem, type, listener) {
                    if (elem.addEventListener) {
                        elem.addEventListener(type, listener, false)
                    } else if (elem.attachEvent) {
                        elem.attachEvent('on' + type, listener)
                    } else {
                        elem['on' + type] = listener
                    }
                }
            }
        ```

 - IE8不支持`placeholder`
    - 解决方法：
        - 读取input里面的`placeholder`属性；
        - 在input表面覆盖一个`label`节点，并在页面加载时将`placeholder`的内容赋值进去；
        - 当：`label`被点击、`input`聚焦时，label隐藏；
        - 当：`input`失焦时，判断输入框中value长度，来控制`label`显示隐藏

 - IE8不支持`rem`
    - 解决办法：
        - 引入rem.js库（在body末尾）

### [css]rem
`rem`是相对于（相对于`html`的字体大小）

默认：1rem = 16px

要设置成：1rem = 10px，则需要：

```css
html {
    font-size: 62.5% /* 10 / 16 * 100% */
}
```



### [H5]兼容性

### [css]清除浮动
 - 在父容器里最后一个子节点设为`clear: both`
 - 对父容器添加伪类`after`
    ```css
    .container :after {
        content: ' ',
        clear: both
    }
    ```
 - 对父容器设为`overflow: hidden`

### [css]css hack
`css hack`，指的是当不同浏览器对某些css属性做解析的时候，出现差异；然后去弥补这些差异的过程。

分为：
 - 条件hack
 ```html
 <!--[if le IE 8]>
 <style>
    .test2 {
        width: 100px;
    }
 </style>
 <![endif]--

 /* 上面是表示当浏览器是小于ie8以下的 */
 ```
 - 属性hack
 ```css
 #test {
     color: #c30; /* For Firefox */
     color: red\0; /* For Opera */
     color: yellow\9; /* For IE8 */
     *color: blut; /* For IE7 */
     _color: #ccc; /* For IE6 */
 }
 ```
 - 选择符hack
 ```css
 * html .test {
     color: red; /* For IE6 and earlier */
 }
 * + html .test {
     color: yellow; /* For IE7 */
 }
 .test:lang(zh-cn) {
     color: white; /* For IE8+ and not IE */
 }
 .test:nth-child(1) {
     color: black; /* For IE9+ and not IE */
 }
 ```

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
 `M`：Model层，存放数据
 
 `V`：View层，视图层
 
 `C`：Controller层，控制层

 本质：所有通信都是单向的；
 本质是：将**数据展示** 和 **数据** 进行隔离，提高代码的复用性和扩展性；

 特点：职责明确、相互分离；
 
 ### [MVVM] 什么是MVVM？
 `M`：Model层，存放数据
 `V`：View层，视图层
 `VM`：ViewModel层，负责：
   - 将Model层的数据`同步`到View层，进行呈现
   - 将View层的修改`同步`到Model层，进行存储

 ### [js] 函数防抖与函数节流
 `函数防抖`（debounce），指的是在上次触发之后、再过N毫秒，才能执行该动作
 
 原理：在N毫秒内重复触发，会重新计时

 简单实现：
 ```js
 function debounce(fn, delay = 500) {
     let timer
     return function() {
         let args = arguments
         if (timer) {
             clearTimeout(timer)
         }
         timer = setTimeout(() => {
             fn.apply(this, args)
         }, delay)
     }
 }
 ```

 `函数节流`（throttle），指的是函数按照一个周期N毫秒执行
 
 原理：判断上次操作、这次操作的时间间距

 简单实现：
 ```js
 function throttle(fn, delay = 500) {
     let startTime = Date.now()
     return function() {
         let args = arguments
         let currentTime = Date.now()
         if (currentTime - startTime > delay) {
             fn.apply(this, args)
             startTime = currentTime // 刷新旧的startTime
         }
     }
 }
 ```

 ### [js] let/var

 ### [js] call、apply、bind
 3个方法的作用：
   - 改变`this`的指向；
   - 支持`传入参数`；
   - `call`、`apply`返回函数结果；`bind`返回新函数
 
 特点：
   - `call`：只能一个参数一个参数传
   - `apply`：只支持传一个数组（`arguments`）

 #### 实现call
 ```js
 Function.prototype.myCall = function(obj, ...arg) {
     let result
     // 0、传参检测
     if (obj === null || obj === undefined) {
         obj = window
     } else {
         obj = Object(obj)
     }
     // 1、改变`this`指向
     // 要让传入的obj成为：函数调用时的this值
     obj._fn_ = this
     result = obj._fn_(...arg) // 2、支持`传入参数`
     delete obj._fn_
     return result // 3、利用变量保存函数的返回值
 }
 ```
 #### 实现apply
 ```js
 // 注意，第二个参数是一个数组
 Function.prototype.myApply = function(obj, arr) {
     return this.myCall(obj, ...arr)
 }
 ```
 #### 实现bind
 ```js
 Function.prototype.myBind = function(obj, ...arg) {
     return (...arg2) => {
         let args = arg.concat(arg2)
         // 以下和实现call的一样
         let result
         // 0、传参检测
         if (obj === null || obj === undefined) {
             obj = window
         } else {
             obj = Object(obj)
         }
     // 1、改变`this`指向
     // 要让传入的obj成为：函数调用时的this值
         obj._fn_ = this
         result = obj._fn_(...args) // 2、支持`传入参数`
         delete obj._fn_
         return result // 3、利用变量保存函数的返回值
     }
 }
 ```

 ### [http]HTTP和HTTPS的区别
 `http`是无状态的超文本传输协议，是明文传输；
  - 标准端口：80
  - 不需要ca证书

 `https`是由SSL + http协议构建的加密传输协议
  - 标准端口：443
  - 需要ca证书
  - 增加cpu、带宽消耗
  - 首次连接比较慢

 ### [TCP]三次握手、四次挥手
 三次握手：
  - `客户端`发送syn给`服务端`
  - `服务端`收到syn后，会给`客户端`发送syn + ack
  - `客户端`收到syn + ack后，会给`服务端`发送ack表示已收到

 四次挥手：
  - `主动方`会发送FIN给`被动方`
  - `被动方`收到FIN后，会发送ack给`主动方`
  - `被动方`再发送FIN给`主动方`
  - `主动方`收到FIN，发送ack给`被动方`

### [js]new操作符经历了哪些步骤？
 - 创建了一个`新的对象`
 - 将`构造函数的作用域`赋值给`新的对象`（此时this指向新的对象）
 - 执行`构造函数`里的代码（为这个新对象添加属性）
 - 返回一个`新的对象`

 ### [js]window对象和document对象的区别
 `window`对象表示：浏览器中打开的窗口；

 `document`对象表示：当前页面；它是`window`的一个对象属性

 ### [算法] 八大算法
 不稳定：
 - 简单选择排序
 - 希尔排序
 - 快速排序
 - 堆排序

 稳定：
 - 冒泡排序
 - 归并排序
 - 插入排序
 - 基数排序

 #### 稳定性的意义
 目的：`保证两次排序的结果相同`
  - 比如先按ID（从小到大排序），已经排好了；
  - 再按体重排序（轻的在前面、重的在后面），遇到体重相等时，就按ID排
  - 如果是稳定性的算法，结果是相同的（体重相同者，ID小的在前面）
  - 如果是不稳定的算法，结果可能是（体重相同者，ID小的在后面）
 
 ### [css]sticky
 `sticky`是position的粘性属性。它是在`relative`和`fixed`中切换，具体看是否要移出`viewPort`。
 ```css
 div.sticky {
     position: sticky;
     top: 10px;
 }
 ```
 也就是说：当滚动时，这个元素有移出的倾向，则切换为`fixed`（通过阈值来进行一些buff的作用）
 - 阈值是：`top`、`bottom`、`left`、`right`，必须设置四者之一
 - 若设定了阈值为`top: 10px`，则表示：当距离`viewPort的顶部`提前到`10px`的位置就切换`fixed`
 - 该元素并不脱离文档流，仍然保留元素原本在文档流中的位置

 ### [浏览器]CORS跨域资源共享
 `CORS`是W3C标准，叫“跨域资源共享”。它允许`浏览器`向`跨源服务器`发出`XMLHttpRequest`请求，从而克服AJAX只能`同源使用`的限制。

 需要`浏览器`+`服务端`同时支持（IE10+）

 一共2类CORS请求：`简单请求`、`非简单请求`

 #### 简单请求
 同时满足以下两种条件：

 条件一：请求方法：`HEAD`、`GET`、`POST`

 条件二：HTTP头部信息（不能多于以下字段）
 - `Accept`
 - `Accept-Language`
 - `Content-Language`
 - `Last-Event-ID`
 - `Content-Type`
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain

**简单请求的HTTP头部**会自动添加一个`Origin`字段（表明请求来自哪个源）。

若`Origin`指定的源：
 - 在许可范围
    - 响应头信息**会有**`Access-Control-Allow-Origin`（其值要么是`Origin`的值，要么是`*`）
 - 不在许可范围
    - 响应头信息**没有**`Access-Control-Allow-Origin`（能被`XMLHttpRequest`的`onerror`捕获）

> 有关Cookie**（前提：源在许可范围内）**
>    - 响应头信息会有`Access-Control-Allow-Credentials`（`true`：请求可以带Cookie；`false`：相反）
>    - 响应头信息的`Access-Control-Allow-Origin`不能设为`*`，必须指定明确
>    - 浏览器要设置`xhr.withCredentials = true`才可以发Cookie，且只有用`服务器域名`设置的Cookie才会上传（其他域名的Cookie不会上传）

#### 非简单请求
`非简单请求`是指请求方法：`PUT`、`DELETE` 或者 Content-Type：`application/json`的请求，它会先发送一个`预检请求`（`OPTIONS`）。

`预检请求`的HTTP头部会自动添加一个`Origin`字段（表明请求来自哪个源），以及以下两个特殊字段：
 - `Access-Control-Request-Method`
    - 列出**接下来的CORS请求**会用到哪些方法
 - `Access-Control-Request-Headers`
    - 指定**接下来的CORS请求**会额外发送哪些自定义头部

 服务器收到`预检请求`后，
 - 允许跨域
    - `Access-Control-Allow-Origin`
        - 表示允许访问的源（其值要么是`Origin`的值，要么是`*`）
    - `Access-Control-Allow-Methods`: GET, POST, PUT
        - 表示允许的方法
    - `Access-Control-Allow-Headers`
        - 表示允许访问的头部属性
 - 不允许跨域
    - 响应头信息没有任何CORS相关头信息字段(能被`XMLHttpRequest`的`onerror`捕获)

 只要通过了“预检请求”，以后每次正常的CORS请求，都会跟`简单请求`一样了：
  - 对于请求头部，会有一个`Origin`字段
  - 对于响应头部，也会有`Access-Control-Allow-Origin`