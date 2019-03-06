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
 width、height、padding、margin 四个独立，所设及所得

 - IE盒模型
 width（height）包括了padding、margin，最终width会小一些

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
 - 父节点position: relative、子节点position: absolute搭配transform
 ```css
 .parent {
     position: relative;
 }
 .child {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
 }
 ```
 - 父节点flexbox，子节点margin: auto
 ```css
 .parent {
     display: flex;
     width: 200px;
     height: 200px;
 }
 .child {
     margin: auto;
 }
 ```
### [CSS]CSS定位
 - 绝对定位
    - position: absolute | fixed（前者相对非static的父元素、后者相对浏览器的左上角）
 - 相对定位
    - position: relative（相对本身所在位置）

### 

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
    - 减少HTTP请求
    - 减少DNS查询
    - 减少DOM元素数量
    - 非必需组件延迟加载
    - 未来所需组件预加载
 
 - Server方面
    - 使用CDN
    - 使用Expires、Cache-Control响应头，配置ETag

 - Cookie方面
    - 减小cookie大小
    - 引入资源的域名不要包含cookie

 - css方面
    - 将样式表放到页面顶部
    - 不使用CSS表达式

 - js方面
    - 将脚本放到页面底部
    - 减少DOM访问

 - 图片方面
    - css精灵

### [Web]渐进增强
渐进增强是指，在web设计时，注重`可访问性`、`语义化HTML标签`、`外部样式表和脚本`

### [VueConf]Make Your Vue App Accessible

### [js]原型对象与原型链
`prototype`是指原型对象，函数才有的属性；
 - 值取决于对象创建时的实现方式
    - 字面量方式
    ```js
    // a是一个对象
    var a = {}
    console.log(a.prototype) // undefined
    console.log(a.__proto__) // Object {}
    ```
    - 构造器方式
    ```js
    // A是一个函数
    var A = function() {}
    console.log(A.prototype) // A {}
    console.log(A.__proto__) // function() {}
    ```


`__proto__`是指原型指针，每个对象都有的属性，js里万物皆对象；
 - 指向取决于对象创建时的实现方式
    - 字面量方式
    ```js
    var a = {}
    console.log(a.__proto__) // Object {}
    ```
    - 构造器方式
    ```js
    var A = function() {}
    var a = new A()
    console.log(a.__proto__) // A {}
    ```

`原型链`是作为 **实现继承** 的主要方法，其基本思想是：`利用原型，让一个引用类型继承另一个引用类型的属性和方法`。

 > 它实际上是`__proto__连起来的链条`

 ### URS

 ### NOS

 ### 单例模式

 ### [vuelidate]表单校验
 vuelidate的调研思路：
  - 引入方式（可全局、可局部）
  - 基于数据模型
    - 先获取Vue实例中的`validations选项`（通过`this.$options`）
    - 再把选项里的配置规则解析为`$v`属性
    - 将`$v`属性加入到Vue实例中的`computed选项`以便观察其响应变化
  - 支持自定义函数
  - 支持嵌套
  - 支持Promise

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
Node.js 采用了`单线程`、`异步式I/O`、`事件驱动`的程序设计模型，实现了：`文件系统`、`模块`、`包`、`操作系统API`、`网络通信`等功能

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
  - 主导引入 登录功能、对象存储组件

 #### 项目亮点
  - 重components、轻pages
    - 页面结构清晰
  - 原生组件可复用
    - 尤其u-icon，可直接传svg、图片url
  - 资源模块化
    - vuex，模块化
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
    - 第三方库分页工具。劣势：固定宽高。

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

 ### IE兼容性问题

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