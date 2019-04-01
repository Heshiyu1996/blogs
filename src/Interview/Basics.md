# 基础知识
转载请注明出处: [https://github.com/Heshiyu1996/blogs](https://github.com/Heshiyu1996/blogs)

- HTML部分
    - [Web-Worker](#[HTML]Web-Worker)
    - [HTML5的新语法](#[HTML]HTML5的新语法)
    - [WebStorage](#[HTML]WebStorage)
    - [行内元素、块级元素有哪些](#[HTML]行内元素、块级元素有哪些)
- CSS部分
    - [CSS3的新属性](#[CSS]CSS3的新属性)
    - [盒模型](#[CSS]盒模型)
    - [弹性盒模型](#[CSS]弹性盒模型)
    - [完美居中的方案](#[CSS]完美居中的方案)
    - [CSS定位](#[CSS]CSS定位)
    - [rem](#[CSS]rem)
    - [Css-Hack](#[CSS]Css-Hack)
    - [粘性定位（Sticky）](#[CSS]粘性定位（Sticky）)
    - [设置元素不可见的方法](#[CSS]设置元素不可见的方法)
    - [CSS布局格式](#[CSS]CSS布局格式)
    - [浮动](#[CSS]浮动)
    - [块级格式化上下文（BFC）](#[CSS]块级格式化上下文（BFC）)
    - [margin重叠问题](#[CSS]margin重叠问题)
    - [z-index和position的关系](#[CSS]z-index和position的关系)
    - [纯CSS画三角形](#[CSS]纯CSS画三角形)
    - [【布局题】利用margin/padding实现宽高自适应](#[CSS]【布局题】利用margin/padding实现宽高自适应)
- JavaScript部分
    - [闭包](#[JS]闭包)
    - [事件委托](#[JS]事件委托)
    - [回调函数](#[JS]回调函数)
    - [设计模式](#[JS]设计模式)
    - [原型、构造函数、对象和原型链](#[JS]原型、构造函数、对象和原型链)
    - [callback、Async/Await和Promise](#[JS]callback、Async/Await和Promise)
    - [函数防抖、函数节流](#[JS]函数防抖、函数节流)
    - [call、apply、bind](#[JS]call、apply、bind)
    - [new操作符经历了哪些步骤](#[JS]new操作符经历了哪些步骤)
    - [window对象和document对象的区别](#[JS]window对象和document对象的区别)
    - [let、var](#[JS]let、var)
    - [Promise.all()的用法、异常处理](#[JS]Promise.all()的用法、异常处理)
    - [ES5、ES6、ES7的区别](#[JS]ES5、ES6、ES7的区别)
    - [DOM节点的操作](#[JS]DOM节点的操作)
    - [JS交换两个节点的方法](#[JS]JS交换两个节点的方法)
    - [正则表达式](#[JS]正则表达式)
    - [js数组的方法](#[JS]js数组的方法)
    - [去重](#[JS]去重)
    - [for...in和for...of](#[JS]for...in和for...of)
    - [生成器、迭代器](#[JS]生成器、迭代器)
    - [Math.floor、parseInt](#[JS]Math.floor、parseInt)
    - [this的指向](#[JS]this的指向)
    - [Ajax](#[JS]Ajax)
    - [DOM绑定事件的三种方式](#[JS]DOM绑定事件的三种方式)
    - [三种事件流模型](#[JS]三种事件流模型)
    - [target、currentTarget](#[JS]target、currentTarget)
    - [检测变量类型](#[JS]检测变量类型)
    - [script标签的加载规则](#[JS]script标签的加载规则)
    - [通过defineProperty给对象添加属性](#[JS]通过defineProperty给对象添加属性)
    - [扩展运算符（...）、Object.assign()](#[JS]扩展运算符（...）、Object.assign())
    - [模块规范一：AMD和CMD](#[JS]模块规范一：AMD和CMD)
    - [模块规范二：ES6模块和CommonJS模块](#[JS]模块规范二：ES6模块和CommonJS模块)
    - [Generator](#[JS]Generator)
    - [暂时性死区](#[JS]暂时性死区)
    - [EventLoop](#[JS]EventLoop)
- 浏览器部分
    - [浏览器内核](#[浏览器]浏览器内核)
    - [浏览器缓存](#[浏览器]浏览器缓存)
- Web部分
    - [XSS、CSRF、SQL注入](#[WEB]XSS、CSRF、SQL注入)
    - [Web性能优化](#[WEB]Web性能优化)
    - [CDN](#[WEB]CDN)
    - [渐进增强、优雅降级](#[WEB]渐进增强、优雅降级)
    - [正向代理、反向代理](#[WEB]正向代理、反向代理)
    - [跨域资源共享（CORS）](#[WEB]跨域资源共享（CORS）)
    - [JSONP和CORS的区别](#[WEB]JSONP和CORS的区别)
    - [与后台保持不断的通信的方法](#[WEB]与后台保持不断的通信的方法)
    - [cookie和session的区别](#[WEB]cookie和session的区别)
    - [HTTP](#[WEB]HTTP)
    - [移动端H5适配](#[WEB]移动端H5适配)
    - [webpack](#[WEB]webpack)
    - [gulp与webpack的区别](#[WEB]gulp与webpack的区别)
- Node.js部分
    - [异步式I/O和事件驱动](#[Node.js]异步式I/O和事件驱动)
    - [require的过程](#[Node.js]require的过程)
    - [回调函数](#[Node.js]回调函数)
    - [EventEmitter](#[Node.js]EventEmitter)
- 算法
    - [八大排序](#[算法]八大排序)
    - [二分查找](#[算法]二分查找)

### [HTML]Web-Worker
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
#### WebWorker 会用在哪些场景？
 - 完成轮询，以便第一时间得知状态改变

### [HTML]HTML5的新语法
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

### [HTML]WebStorage
  * [sessionStorage、localStorage、cookies的区别（2019-01-13）](/src/Browser/webStorage.md)

### [HTML]行内元素、块级元素有哪些
#### 行内元素
`a`、`img`、`input`、`label`、`select`、`span`、`textarea`

#### 块级元素
`div`、`form`、`h1`、`ol`、`ul`、`li`、`p`、`table`

 > 行内替换元素（例如`img`）。`height`、`width`、`padding`、`margin`均可用（效果等于块元素）



### [CSS]CSS3的新属性
CSS3样式提纲：
 - 圆角（border-radius）、阴影（box-shadow、text-shadow）、渐变（gradient）、滤镜（filter）、文字省略（text-overflow: ellipsis）
 - 动画（animation）
 - 过渡（transition）、变换（transform）
 - 新增盒模型——弹性盒模型（Flexbox）
 - 新增box-sizing：content-box（即标准盒模型）、border-box（即IE盒模型）

### [CSS]盒模型
 - 标准盒模型
 width、height、padding、border、margin 五个独立，所设及所得

 - IE盒模型
 width（height）包括了padding、border，（`margin依旧独立`），故最终width会小一些

### [CSS]弹性盒模型
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

兼容性：IE10 `及以上`

### [CSS]完美居中的方案
#### `行内元素`：
 - 水平居中：
```css
/* A1 */
.parent {
    text-align: center;
}
```
 - 垂直居中：
```css
/* B1 */
.parent {
    height: 100px;
    line-height: 100px;
}

/* B2 */
.parent {
    display: table-cell;
    vertical-align: middle;
}
```
 - 水平垂直居中：
 ```css
 /* 不兼容flexbox */
    /* `A1` 与 `B1/B2`混合搭配  */
 
 /* 兼容flexbox */
    .parent {
        display: flex;
        justify-content: center;
        align-items: center;
    }
 ```

#### 块级元素：
 - 水平居中：
 ```css
 /* C1 */
 .child {
     margin: 0 auto;
 }
 /* C2 */
 .child {
     position: relative;
     margin: auto;
     left: 0;
     right: 0;
 }
 /* C3 */
 .parent {
     display: flex;
     justify-content: center;
 }
 ```
 - 垂直居中：
 ```css
 /* D1 */
 .parent {
     display: table-cell;
     vertical-align: middle;
 }
 ```
 - 水平垂直居中：
 ```css
 /* 不兼容flexbox */
    /* `C1/C2/C3` 与 `D1`混合搭配  */
 
 /* 兼容flexbox */
    .parent {
        display: flex;
        justify-content: center;
        align-items: center;
    }
 ```

### [CSS]CSS定位
 - 绝对定位
    - position: absolute | fixed（前者相对非static的父元素、后者相对浏览器的左上角）
 - 相对定位
    - position: relative（相对本身所在位置）

### [CSS]rem
`rem`是相对于（相对于`html`的字体大小）

默认：1rem = 16px

要设置成：1rem = 10px，则需要：

```css
html {
    font-size: 62.5% /* 10 / 16 * 100% */
}
```

### [CSS]Css-Hack
`Css Hack`，指的是当不同浏览器对某些css属性做解析的时候，出现差异；然后去弥补这些差异的过程。

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


### [CSS]粘性定位（Sticky）
 `Sticky`是position的粘性属性。它是在`relative`和`fixed`中切换，具体看是否要移出`viewPort`。
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


### [CSS]设置元素不可见的方法
```css
/* 1 */
.child {
   display: none;
}

/* 2 */
.child {
   visibility: hidden;
}

/* 3 */
.child {
   position: absolute;
   top: -999999px;
}

/* 4 */
.child {
   opacity: 0;
}
```

### [CSS]CSS布局格式
 - 标准流
   - 行内元素在同一行，块级元素上下显示
 - 浮动流
   - 脱离标准流的第一种方式，但 **会影响** 标准流的排列
 - 定位流
   - 脱离标准流的第二种方式，**不会影响** 标准流的排列

### [CSS]浮动
浮动的目的：**一行显示多个div元素**

 规则：若元素A是浮动的：
 - 若他前一个元素也是浮动的，那会跟随前一个元素的**后边**
 - 若他前一个元素是在标准流的，那会和前一个元素的**底部对齐**

 牢记：`clear`规则只能影响`使用清除的元素本身`（**可以使xx元素的左/右边不允许出现浮动元素**）
 
 例子：
 `div1`、`div2`都是浮动的，希望做到`div2`紧跟`div1`底部对齐
 ![alt](././img/img-3.png)

 解决方法：
 ```css
 .div2 {
    clear: left; /* 指定 div2元素左边 不允许出现浮动元素 */
 }
 ```
 ![alt](././img/img-4.png)
 
 #### 浮动会带来什么问题？
  - 多个浮动元素可能导致父元素高度无法撑开
  - 浮动元素后面的非浮动元素（内联元素），会跟随其后
  - 浮动元素前面的非浮动元素，会影响页面的结构

 #### 清除浮动
  - 在父元素最后一个子元素后，再加一个子元素，属性为`clear: both;`
  - 在父元素新增伪类：
  ```css
  .parent:after {
     display: block;
     content: ' ';
     clear: both;
  }
  ```
  - 给父元素设为`overflow: hidden;`（利用BFC的原理）
  - 给父容器设为`float: left;`（利用BFC的原理）

### [CSS]块级格式化上下文（BFC）
`BFC`指的是`块级格式化上下文`，可以把BFC理解为一个封闭的大箱子，箱子内部的元素无论如何都不会影响到外部。

#### 触发BFC的条件
 - 根元素（body）
 - 浮动元素
 - 绝对定位元素（absolute、fixed）
 - display为`inline-block`、`table-cell`、`flex`
 - overflow为`hidden`、`scroll`、`auto`

 触发某元素的BFC特性 = 将某元素放到BFC容器中

#### BFC的特性及应用
 - `在同一个BFC里`的元素的`外边距`会发生重叠
 ```html
 <style>
    div {
       width: 100px;
       height: 100px;
       background: blue;
       margin: 100px;
    }
 </style>
 <body>
    <div></div>
    <div></div>
 </body>
 ```
 由下图可知，两个div元素都`处于同一个BFC容器下`（指body元素）。
 
 上一个div的`margin-bottom: 100px;`，下一个div的`margin-top: 100px;`，可看出margin是重叠过的（即两个100px只算一个）

 ![alt](././img/img-5.png)

 > 解决方法：为了 避免外边距（margin）重叠，可以将它们放到 `不同的BFC容器`中（每个div外包一个`overflow: hidden;`的父容器）

- `BFC`可以阻止元素`被浮动元素覆盖`
```html
 <style>
    .first {
       float: left;
       width: 100px;
       height: 100px;
       background: blue;
    }
    .second {
       width: 200px; /* 不设定宽度可以实现 两列自适应布局 */
       height: 200px;
       background: red;

       overflow: hidden; /* 该元素放在一个新的BFC容器 */
    }
 </style>
 <body>
    <div class="first">我是第一个</div>
    <div class="second">我是第二个</div>
 </body>
```
由下图可知，第一个div元素有自己的BFC容器，但是对于第二个div元素处于标准流会被覆盖。

> 解决办法：为了 阻止浮动元素（float）的覆盖，可以触发该元素的BFC特性。

 - before

 ![alt](././img/img-6.png)
 
 - after

 ![alt](././img/img-7.png)

 - `BFC`可以包含浮动的元素（即通常说的`清除浮动`）
```html
<style>
   .parent {
      border: 1px solid gray;
   }
   .child {
      float: left;
      width: 100px;
      height: 100px;
      background: orange;
   }
</style>
<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>
```
 由下图可知，BFC容器内的浮动元素脱离标准流后，容器只剩下2px的边距高度。

 > 解决办法：为了 包含浮动元素（float），可以触发父元素的BFC特性（overflow: hidden;）

 - before

 ![alt](././img/img-8.png)

 - after

 ![alt](././img/img-9.png)
 

### [CSS]margin重叠问题
在css中，`同一个BFC`下相邻的两个盒子的外边距（margin）可以结合成一个单独的外边距，这种合并的方式叫`折叠`
 - 若两个相邻的外边距`都是正数（+）`，结果是`最大值`
 - 若两个相邻的外边距`都是负数（-）`，结果是`两者绝对值较大的那个数`
 - 若两个相邻的外边距`一正（+）一负（-）`，结果是`两者之和`

### [CSS]z-index和position的关系
`z-index`用于设置元素的堆叠顺序，堆叠顺序高的会处于堆叠顺序底的前面

它只在`position`为`absolute`、`relative`或`fixed`的元素上有效

### [CSS]纯CSS画三角形
 原理：
  - 1、看清`border`的四条边界
  ```css
  .child {
    width: 50px;
    height: 50px;
    border-top: 50px solid red;
    border-right: 50px solid green;
    border-bottom: 50px solid blue;
    border-left: 50px solid orange;
  }
  ```
 ![alt](./img/img-14.png)

  - 2、去除中间内容
  ```css
  .child {
    width: 0;
    height: 0;
    border-top: 50px solid red;
    border-right: 50px solid green;
    border-bottom: 50px solid blue;
    border-left: 50px solid orange;
  }
  ```
 ![alt](./img/img-15.png)

  - 3、再去除一部分（例如：左边）
  ```css
  .child {
    width: 0;
    height: 0;
    border-top: 50px solid red;
    border-right: 50px solid green;
    border-bottom: 50px solid blue;
    border-left: 50px solid transparent;
  }
  ```
 ![alt](./img/img-16.png)

  - 4、可以利用这个特性，画出`三角形`、`直角三角形`、`梯形`等等
 ```css
 .child {
    width: 0;
    height: 0;
    /* border-top: 50px solid red; */
    border-right: 50px solid transparent;
    border-bottom: 50px solid blue;
    border-left: 50px solid transparent;
 }
 ```

### [CSS]【布局题】利用margin/padding实现宽高自适应
如图：实现一个**宽度、高度、间隙**随屏幕大小**自适应**的布局：

 ![alt](./img/img-17.png)

```html
<div id="app">
    <div class="top-wrapper">
        <div class="user-wrapper" v-for="item in arr" :key="item.id"></div>
    </div>
    <div class="bottom-wrapper">
        <div class="btn">底部按钮</div>
    </div>
</div>
```
```scss
.top-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;

    .user-wrapper {
        display: inline-block;
        width: 23%; // 相对于父容器（即top-wrapper）宽度
        margin-top: 2.67%; // 相对于父容器（即top-wrapper）宽度
        background: green;
        overflow: hidden; // 触发BFC条件，撑开该容器

        &::after{
            content: '';
            display: block;
            margin-top: 100%; // 相对父容器（即user-wrapper）宽度
        }

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
            margin-top: 0;
        }

        .user-text {
            position: absolute; // 文字需额外放到一个脱离标准流的容器中
        }
    }
}
```
大致思路：把`参照物`都设置成`父容器的宽度`
 - 对于小方块的宽度自适应：
    - 每行4个小方块，它们各自的宽度百分比`（相对于父容器top-wrapper宽度）`，单个为`23%`，所以父容器（top-wrapper）还剩余`8%`的宽度。

 - 对于小方块的高度自适应：
    - 因为每个小方块的高度参考物不是父容器宽度，不能直接设置百分比（因为画正方形，可`将高度的百分比参考物`设置为`也相对于父容器top-wrapper的宽度`，可用`margin/padding百分比`）。
    - 又因为每个小方块里面没有内容，所以需要用一个`伪类after`把父容器高度撑开（`此时每个小方块就是伪类的父容器`），将伪类设为`margin-top: 100%`，这时伪类相对父容器（即小方块）宽度`100%`，自动撑开高度，数值和宽度一样。
    - 有个要注意的点是，要触发小方块的BFC特性，才能把高度撑开。

 - 对于小方块的水平间距：
    - 可以通过`justify-content: space-between`来实现块与块之间的水平间距。

 - 对于小方块的垂直间距：
    - 因为每一行有3条间隙，平分上面算的剩余`8%`的宽度，算得约每条`2.67%`
    - 因为`高度不能直接设置百分比`。把参考物换成`父容器top-wrapper`可以通过`margin-top`实现，即每个小方块`margin-top: 2.67%`（也是相对于父容器top-wrapper宽度），实现垂直间距

### [JS]闭包
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

### [JS]事件委托

#### video里的子标签的track
在不同的手机系统、不同的浏览器都不兼容

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


### [JS]设计模式
#### 发布-订阅模式
发布-订阅模式（也称：观察者模式），它定义了**对象间的一对多依赖**关系（即，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知）

优点：
 - 时间上（广泛应用于异步编程，是一种代替传递回调函数的方案）
 - 对象间（不需强耦合再一起。虽然不清楚彼此细节，但不影响它们之间通信）

### [JS]原型、构造函数、对象和原型链
 - `原型`（prototype）包含着：`某一种特定类型`（如Person类型）中**所有实例共享的属性**和**方法**。
每个`原型`都有一个`.constructor`属性，它指向的是构造函数本身（constructor）

 - `构造函数`都有一个`.prototype`属性，它指向的是该构造函数的原型（prototype）

 - `对象`是通过`构造函数`实例化new出来的，每个对象都有`__proto__`属性，指向它的原型（prototype）

 - `原型链`是作为 **实现继承** 的主要方法，它基本思想是：`利用原型，让一个引用类型继承另一个引用类型的属性和方法`。**（实际上是`__proto__连起来的链条`）**

 > 当实例化一个对象的时候，我们不仅可以获得这个`对象的实例属性（和方法）`，还可以获得`原型对象上的原型属性（和方法）`

![alt](./img/img-12.png)


### [JS]callback、Async/Await和Promise
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
`async`是一个函数修饰符，表示函数里有异步操作
 > `async`函数会返回一个`Promise`对象，可以使用`then`添加回调函数；

`await`表示紧跟在后面的表达式需要等待结果；
 > 后面跟也是`Promise`，

 好处：
  - 简洁。易于阅读和理解
  - 错误处理。
    - 可以被`try-catch`捕捉到
  - 方便调试。


### [JS]函数防抖、函数节流
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

var func1 = function(y) {
    console.log(y)
}

var myFunc1 = debounce(func1, -2)
myFunc1('caozuoxiao')
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

var func = function(x) {
    console.log(x)
}

var myFunc = throttle(func, -1) // 为了test，delay设为-1
myFunc('heshiyu') // 'hehsiyu'
 ```


### [JS]call、apply、bind
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

### [JS]new操作符经历了哪些步骤
 - 创建了一个`新的对象`
 - 将`构造函数的作用域`赋值给`新的对象`（此时this指向新的对象）
 - 执行`构造函数`里的代码（为这个新对象添加属性）
 - 返回一个`新的对象`

### [JS]window对象和document对象的区别
 `window`对象表示：浏览器中打开的窗口；

 `document`对象表示：当前页面；它是`window`的一个对象属性


### [JS]let、var
（待补）
`setTimeout`与`var/let`：
```js
for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i) // 10 10 10 10 10
    }, 100 * i)
}
```

```js
for (let i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i) // 0 1 2 3 4 ...
    }, 100 * i)
}
```

原因：
 - `setTimeout`是在`下一轮事件循环开始时`触发
 - `let`在循环里`每次迭代`都会创建一个新的作用域

### [JS]Promise.all()的用法、异常处理
#### `Promise.all([])`接收一个数组，数组中每个元素都是`Promise的实例`。
例如：
```js
var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'first')
})
var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 0, 'second')
})
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'third')
})

var p = Promise.all([p1, p2, p3])
p.then(data => console.log(data)) // ['first', 'second', 'third']
```

 - 当`p1、p2、p3`都为fulFilled，按`参数的顺序`传给p的回调函数（then）
 - 当`p1、p2、p3`其中一个为rejected，会把`第一个变rejected`的值传给p的回调函数（catch）
> 注意：如果

#### 异常处理
因为`Promise.all()`方法是**一旦抛出其中一个异常**，那其他正常返回的数据也无法使用了

 ![alt](././img/img-2.png)

解决办法：
 - 方法一：改为串行调用（失去了并发优势）
 - 方法二：将p1、p2、p3这些promise`自身定义一个catch方法`。
    - 那它被rejected时，也`不会触发Promise.all()的catch`。而是会`触发自身定义的catch`。因为他们自身定义的catch方法`返回的是一个新Promise实例`，`作为参数的这个promise`实际上指的是这个新实例，这个`新实例会变成resolved`。
 - 方法三：在Promise内，先用try-catch吃掉这个异常。在其catch内再调用resolve(err)，让外面的Promise“感觉”像是调用成功（和方法二的区别是，方法二是个新实例）
 ```js
 // 方法二：
 var p2 = new Promise((resolve, reject) => {
     setTimeout(resolve, 0, xxx)
 })
 .then(result => result)
 .catch(err => err)
 ```
 ```js
 // 方法三：
 var p2 = new Promise((resolve, reject) => {
     setTimeout(() => {
         try {
             console.log(xxx) // xxx未声明，会抛出异常给下面的catch块
         } catch(err) {
             resolve(err) // 在内部的catch里调用resolve(err)
         }
     })
 })
 ```
 ![alt](./img/img-1.png)


### [JS]ES5、ES6、ES7的区别
#### ES7
 - Async、Await
 - 求幂运算符（`**`）
 - Array.prototype.includes()

### [JS]DOM节点的操作
[DOM节点](./../Basics/JS/DOM.md)

### [JS]JS交换两个节点的方法
```html
<div id="a">啊</div>
<div id="b">波</div>
```
```js
 var obj = document.createElement('a')
 var div1 = document.getElementById('a')
 var div2 = document.getElementById('b')

 div2.parentNode.appendChild(obj)
 div2.parentNode.replaceChild(div1, obj) // (newElement, oldElement)，newElement在替换后会从原位置中被删除
```

### [JS]正则表达式
 #### 创建正则表达式（两种方式）
  - 正则表达字面量
  ```js
  var reg = /ab+c/
  // 优点：可以让js解析器提高性能
  ```
  
  - 构造函数
  ```js
  var reg = new RegExp('ab+c')
  // 优点：在runtime时动态确定正则表达式，更灵活（即可引入变量）
  ```

 #### 修饰符
  - `i`：对大小写不敏感
  - `g`：执行全局匹配
  - `m`：执行多行匹配

 #### 常用的特殊字符
 ```js
 匹配数量：`*`、`+`、`?`、`{n}`、`{n,}`、`{n,m}`
 匹配位置：`^`、`$`
 匹配条件：`|`
 匹配集合：`[]`
 匹配非集合：`[^]`

 `\d`：0-9之间的任意一个数字
 `\D`：除了\d

 `\w`：数字、字母、下划线（即0-9 a-z A-Z _）
 `\W`：除了`\w`

 `\s`：空白
 `\S`：除了空白
 ```
 - 
 #### js中和正则有关的所有方法
 - `RegExp`
    - exec
    - test
 - `String`（注意，以下是字符串的方法）
    - match
    - replace
    - search
    - split

 ##### exec
 对string进行正则匹配，并返回匹配结果（若需所有，执行white，结束标志为null）

 - 参数：string
 - 返回：['匹配结果', '由括号括起来的小分组匹配值', index, input]

```js
var regex = /d(b+)d/g; 
regex.exec('cdbbdbsdbdbz')
// ["dbbd", "bb", index: 1, input: "cdbbdbsdbdbz"] 

regex.exec('cdbbdbsdbdbz')
// ["dbd", "b", index: 7, input: "cdbbdbsdbdbz"] 

regex.exec('cdbbdbsdbdbz')
// null 
```
 ##### test
测试string是否包含匹配结果，若包含返回true；否则返回false
 - 参数：string
 - 返回：true | false
```js
var regex = /he/
regex.test('heshiyu')
// true
```

##### match
根据pattern进行正则匹配，如果匹配到，返回匹配结果；否则返回null

若正则表达式是 **全局匹配**：
 - 参数：regex
 - 返回：[匹配到的内容1, 匹配到的内容2, ...]
```js
var str = 'hi, heshiyu'
var regex = /i/g
str.match(regex)
// ['i', 'i']
```
若正则表达式是 **非全局匹配**：（和`exec`有点像）
 - 参数：regex
 - 返回：[匹配到的内容1, 匹配到的内容2, ...]
```js
var str = 'hi, heshiyu'
var regex = /i/
str.match(regex)
// ['i', groups: undefined, index: 1, input, heshiyu]
```

##### search
根据pattern进行正则匹配，如果匹配到一个结果，则返回他的索引；否则返回-1
 - 参数：regex | string
 - 返回：numer
```js
var str = 'hi, heshiyu'
var regex = /i/
str.search(regex)
// 1
```

##### replace
根据pattern进行正则匹配，把匹配结果替换为replacement
 - 参数1：regex | string
 - 参数2：string
 - 返回：替换结果
 ```js
var str = "i love china!"
var pattern = /i/g
var ret = str.replace(pattern, "I")
alert(ret)
//I love chIna!
 ```

##### split
根据pattern进行正则分割，返回一个分割数组
 - 参数1：regex | string
 - 返回：分割结果
```js
var  str = 'http://www.baidu.com/'
var  reg = /\W/
var  ret = str.split(reg)
console.log(ret)
//["http", "", "", "www", "baidu", "com", ""] 
```
#### 例子：正则匹配邮箱
 `/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/`

### [JS]js数组的方法
#### 变异方法
 - push()
 - pop()
 - shift()
 - unshift()
 - splice()
    - 参数1：要操作的下标
    - 参数2：要`删除`的项目数量
    - 参数3：要新加入的项目
    - 返回：被移除掉的项（array）
 - sort()
    - 参数：比较函数（function）
 - reverse()

#### 非变异方法
 - slice()
    - 参数1：截取的起始下标，闭区间
    - 参数2：截取的终止下标，开区间（不指定，就是后面所有）
    - 返回：被截走的数组（array）

 - concat()
    - 参数：要收录进数组的项（也可以是数组）
    - 返回：合并后的数组

 - filter()
    - 参数：当前值为true，则会被返回
    - 返回：符合条件的数组
    ```js
    var arr = [1, 3, 5]
    arr.filter(item => item === 5) // [5]
    ```

 - join()
    - 参数：分隔符
    - 返回：字符串

 - forEach()
    - 参数1：当前项
    - 参数2：当前项索引
    - 参数3：数组本身
    - 返回：undefined

 - map()
    - 参数1：当前项
    - 参数2：当前项索引
    - 参数3：数组本身
    - 返回：一个新数组，旧数组不变

### [JS]去重
```js
function func1(arr) {
    let map = {}
    for (let i = arr.length - 1; i >= 0; i--) {
        arr[i] in map ? arr.splice(i, 1) : (map[arr[i]] = true)
    }
    return arr
}
```

### [JS]for...in和for...of
 - for...in
    ```js
        var arr = [1, 9, 6, 7]
        var obj = {
            name: 'heshiyu'
        }

        for (var i in arr) {
            console.log(i)
        }
        // 依次输出：0 1 2 3

        for (var i in obj) {
            console.log(i)
        }
        // name
    ```
 - for...of
    ```js
        var arr = [1, 9, 6, 7]
        var obj = {
            name: 'heshiyu'
        }

        for (var i of arr) {
            console.log(i)
        }
        // 依次输出：1 9 6 7

        for (var i of obj) {
            console.log(i)
        }
        // error
    ```
注意：`for...of`只适用于`拥有迭代器对象`的集合（例如：数字、字符串、map、set等），`不能遍历对象`
 
### [JS]生成器、迭代器
 `生成器（Generator）`是一个`能返回迭代器对象`的函数

 `迭代器（Iterator）`是一个`拥有next方法`的对象，这个方法返回一个对象：
 ```js
 {
     value: 2 , // 当前值
     done: true // 表示当前迭代器是否迭代完成
 }
 ```

 #### Generator的实现
  - ES5
  ```js
  function makeIterator(arr) {
      var index = 0

      return {
          next: function() {
              var done = index >= arr.length
              return {
                  value: done ? undefined : arr[index++], // 注意，index++为“先人后己”，读取的是arr[index]，随后index++
                  done: done
              }
          }
      }
  }

  var iterator = makeIterator([1, 9, 7, 6])
  // iterator是迭代器，makeIterator是生成器

  iterator.next() // { value: 1, done: false }
  iterator.next() // { value: 9, done: false }
  iterator.next() // { value: 7, done: false }
  iterator.next() // { value: 6, done: false }
  iterator.next() // { value: undefined, done: true }
  ```
  - ES6
  ```js
  function* createIterator(arr) {
      for(let i=0; i< arr.length; i++) {
          yield arr[i]
      }
  }

  var iterator2 = createIterator([1, 9, 7, 6])

  iterator2.next() // { value: 1, done: false }
  iterator2.next() // { value: 9, done: false }
  iterator2.next() // { value: 7, done: false }
  iterator2.next() // { value: 6, done: false }
  iterator2.next() // { value: undefined, done: true }
  ```
 #### yield的特点
  - 用来说明`next函数`返回的`value值`
  - 每个`yield`调用后，后面的代码都会停止执行
  - `yield`不能穿透函数（即`不能使用forEach`来遍历声明yield，`必须用for`！！）

 迭代器对象可以任意具有.next方法的对象

### [JS]Math.floor、parseInt
 相同：都能实现数字的向下取整

 不同：
 ```js
    // Math.floor 不能解析（非纯数字的）字符串
    Math.floor(0.89) // 0
    Math.floor("3") // 3
    Math.floor("760px") // NaN

    // parseInt不能解析（非数字开头的）字符串
    parseInt(0.89) // 0
    parseInt("3") // 3
    parseInt("760px") // 760
 ```

### [JS]this的指向
 `this`是运行时基于函数的执行环境所决定的。
  - 在全局函数中，this为window
  - 当函数被作为某个对象的方法调用时，this为那个对象

 #### 闭包里this的作用域

### [JS]Ajax
 原理：
  - 实例化一个`XMLHttpRequest`对象
  - 设置回调函数`onreadystatechange`
  - 使用`open`、`setRequestHeader`、`send`结合发送请求

  其中`xhr.readyState`有如下5种状态：
   - 0：请求还未初始化
   - 1：连接已建立
   - 2：请求已接收
   - 3：请求处理中
   - 4：请求已完成，且响应已收到

 ```js
    var url = 'http://www.api.com/checkLogin'
    var xhr = new XMLHttpRequest() // 或ActiveXObject

    xhr.open('GET', url, true) // true表明该请求是异步的
    xhr.setRequestHeader('x-from', 'pc')

    xhr.onreadystatechange = function(res) {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.response)
            if (response.success == false) {
                alert('您的账号暂无权限，请先注册~')
            } else if (response.success == true) {
                location.href = '/index/0'
            }
        }
    }

    xhr.withCredentials = true
    xhr.send()
 ```

### [JS]DOM绑定事件的三种方式
  - 【HTML 事件处理】在DOM元素上直接绑定
    ```html
    <div onclick="test()"></div>
    ```

  - 【DOM 0级事件处理】在JavaScript代码中绑定
    ```js
    document.getElementById('myID').onclick = function() {
        // ...
    }
    ```
  - 【DOM 2级事件处理】绑定事件监听函数
    ```js
    element.addEventListener(type, handle, useCapture)
    // 第一个参数：事件名称
    // 第二个参数：事件处理函数
    // 第三个参数：是否使用捕获（默认false，即事件冒泡）
    ```

### [JS]三种事件流模型
  - IE的事件冒泡
  - Netscape的事件捕获
  - DOM的事件流
    - DOM 2级事件规定，事件流包括三个阶段：`事件捕获`、`目标阶段`、`事件冒泡`

### [JS]target、currentTarget
  - event.target：返回的是`触发事件`的元素
  - event.currentTarget：返回的是`绑定事件`的元素
 
### [JS]检测变量类型
（待补）
- 方法一：
 `Object.prototype.toString.call(obj)`
 
 原因：`Array`、`function`是Object的实例，都重写了toString方法。根据原型链，调用的话，是对应的重写之后的toString方法，而不会去调用Object上原型的toString方法

 ```js
 Object.prototype.toString.call([]) // [object array]
 ```
- 方法二：
```js
let arr = []
arr.constructor === Array // true
```

### [JS]script标签的加载规则
 默认情况下，浏览器**同步加载JavaScript脚本**，（即渲染引擎遇到`<script>`标签就会停下来，等脚本执行完毕再继续向下渲染）

 当然，浏览器也**允许脚本异步加载**，下面是两种 **异步加载** 的语法：
 ```js
 <script src="path/to/myModule.js" defer></script>
 <script src="path/to/myModule.js" async></script>
 ```
前者（`defer`）指的是：当页面渲染完成，再执行；

后者（`async`）指的是：一旦下载完成，渲染引擎就中断渲染，**执行这个脚本之后** 再继续渲染。

另外，`defer`会按照它在页面中出现的顺序加载，`async`不能保证按顺序。

### [JS]通过defineProperty给对象添加属性
 对象里的属性并不只有`属性名`和`属性值`那么简单。

 JavaScript属性大致可以分为两类：
  - 数据属性
  - 访问器属性
  
 #### 数据属性
 `数据属性`具有4个描述其轻微的特征：


 [configurable、enumerable和writable](http://www.softwhy.com/article-9359-1.html)

### [JS]扩展运算符（...）、Object.assign()
 `扩展运算符（...）`和`Object.assign()`可以对一个对象A进行`深拷贝`，但如果对象A里面还包含子对象/子数组，那么这部分就只是`浅拷贝`！！
 
 **(...)和Object.assign()这两个方法是等价的**

 > 深拷贝：拷贝的是`值的副本`
 > 
 > 浅拷贝：拷贝的是`值的引用`

```js
let o1 = { 
    name: 'I am o1',
    address: {
        province: 'gd',
        city: 'qy'
    }
}
let o4 = { ...o1 }

o4.name = 'I am o4'
console.log(o4)
console.log(o1)

o1.name = 'I am new o1'
o1.address.province = 'hz'
console.log(o4)
console.log(o1)

// { name: 'I am o4', address: { province: 'gd', city: 'qy' } }
// { name: 'I am o1', address: { province: 'gd', city: 'qy' } }
// { name: 'I am o4', address: { province: 'hz', city: 'qy' } }
// { name: 'I am new o1', address: { province: 'hz', city: 'qy' } }
```

### [JS]模块规范一：AMD和CMD
[模块规范一：AMD和CMD（2019-03-25）](/src/Basics/JS/AMDCMD.md)

### [JS]模块规范二：ES6模块和CommonJS模块
[模块规范二：ES6模块和CommonJS模块（2019-03-25）](/src/Basics/JS/Module.md)

### [JS]Generator
[Generator](/src/Basics/JS/Generator.md)

### [JS]暂时性死区
[暂时性死区](/src/Basics/JS/TDZ.md)

### [JS]EventLoop
[EventLoop](/src/Basics/JS/EventLoop.md)

### [浏览器]浏览器内核
 - Trident （IE内核）
 - Gecko （Firefox内核）
 - Presto（Opera，已废弃）
 - Webkit（Safari、Chrome28前）
 - Blink（Chrome28后）

### [浏览器]浏览器缓存
 第一次请求成功后，再次请求同一个网页：
  - 获取第一次请求成功后缓存下来的`Header`，里面包括：`Expires`、`Cache-control`、`Last-Modified`和`ETag`。前两者属于强缓存，后两者属于协商缓存
  - 先看`Expires`和`Cache-control`，检查是否命中 `强缓存`
    - 若是，直接从本地磁盘获取资源（200）
    - 若不是，再看`Last-Modified`、`ETag`检查是否命中 `协商缓存`
        - 若是，浏览器会响应新的Header信息给客户端（但不会返回资源内容），没有新修改的地方（304）
        - 若不是，响应全新的资源内容给客户端

### [WEB]XSS、CSRF、SQL注入
针对Web服务器的攻击，常见的有：`XSS（跨站脚本攻击）`、`CSRF（跨站请求伪造）`、`SQL注入`

#### XSS（跨站脚本攻击）
依赖JS。

攻击者向某个web页面插入恶意的js脚本。当普通用户访问时，恶意脚本会自动执行，然后盗取用户cookie

防止：
 - `编码`，把用户的输入`转化为数据`，而不是代码
 - `校验`，对用户的输入和请求都进行`关键字过滤`
 - 对于`cookie`设置为`httpOnly`（防止客户端通过document.cookie读取cookie）

#### CSRF（跨站请求伪造）
攻击者盗用你的身份，以你的名义发送恶意请求。

防止：
 - 检查`HTTP请求头的Referer`字段
 - 设置`token`并验证
 - 在HTTP头中`添加自定义属性并验证`

#### SQL注入
攻击者把SQL命令插入到web表单的输入框，欺骗服务器执行恶意的SQL命令。

防止：对用户的输入进行检查、过滤

### [WEB]Web性能优化
 - content方面
    - 减少DOM元素数量
    - 减少DNS查询
    - 减少HTTP请求
        - 原因
        ```js
        影响页面呈现有3个因素：
            1、服务端连接数据库，并返回数据
            2、http请求以及数据在网络中的传输（消耗80%）
            3、文件在浏览器中渲染呈现
        
        具体实践（减少HTTP请求）：
            1、充分利用浏览器缓存（使用Expires、Cache-Control响应头，配置ETag）
            2、CSS Sprites：把多张图片整合到一张图片中，再利用CSS的background属性进行定位
            3、合并CSS和JS文件：把多个js（css）合并为一个js（css）
            4、图片地图：允许在一张图片上关联多个URL，目标URL取决于点击的坐标
            5、对HTTP传输内容进行压缩（配置`Accept-Encoding`）
            6、
        ```
        另外还可以通过[图片转成base64](/src/Performance/base64.md)达到减少HTTP请求效果
 
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

### [WEB]CDN
`CDN`指的是内容分发网络。

当用户获取数据时，不需要直接从`源站`获取，而是通过`CDN`的内容分发，使得用户可以以`最短的路径`、`最快的速度`对网站进行访问，并减少`源站`的**负载压力**。
 
 - 未使用CDN
    - 1、用户输入域名
    - 2、DNS服务器解析该域名
    - 3、DNS服务器返回域名的IP地址
    - 4、浏览器向该IP发送请求
    - 5、服务器响应用户请求

    ![alt](./img/img-10.png)
 
 - 使用CDN
    - 1、用户输入域名
    - 2、DNS服务器`将解析权`交给`CDN专用DNS服务器`
    - 3、`CDN专用DNS服务器`将会返回`CDN负载均衡设备`的IP地址
    - 4、浏览器向该IP发送请求
    - 5、`CDN负载均衡设备`会为用户选择一台合适的`缓存服务器`（根据距离、需求、负载情况），并返回`缓存服务器`的IP
    - 6、浏览器向`缓存服务器`发出请求
    - 7、缓存服务器响应用户请求

    ![alt](./img/img-11.png)



### [WEB]渐进增强、优雅降级
渐进增强是指，针对`低版本浏览器`进行构建（先保证最基本的功能），然后再针对`高级浏览器`进行改进。

优雅降级是指，一开始就构建`完整的功能`，然后再针对`低版本浏览器`进行兼容。


### [WEB]正向代理、反向代理
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




### [WEB]跨域资源共享（CORS）
 `CORS`是W3C标准，叫“跨域资源共享”。它允许`浏览器`向`跨源服务器`发出`XMLHttpRequest`请求，从而克服AJAX只能`同源使用`的限制。

 需要`浏览器`+`服务端`同时支持（IE10+），主要是在服务端增加一个 **过滤拦截器**。

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

 注意：只要通过了“预检请求”，以后每次正常的CORS请求，都会跟`简单请求`一样了：
  - 对于请求头部，会有一个`Origin`字段
  - 对于响应头部，也会有`Access-Control-Allow-Origin`
  
### [WEB]JSONP和CORS的区别
 `JSONP`的特点：
  - 只支持`GET`
  - 服务端返回的数据不能是标准的json格式，而是通过callback包裹（需要客户端和服务端定制开发）
  - 安全问题
  - 要确定jsonp请求是否失败并不容易
  ```js
  $.ajax({
      url: 'http://www.baidu.com',
      async: false,
      type: 'get',
      dataType: 'jsonp', // 1、请求类型设置`jsonp`
      data: {
          'id': 1
      },
      jsonp: 'callback', // 3、默认callback
      jsonpCallback: 'fn', // 2、设置回调函数名称，要与服务器响应包含的callback名称相同
      success: function(data) {
          alert(data)
      },
      error: function(err) {
          alert(err)
      }
  })
  ```
 
 `CORS`的特点：
  - 支持所有请求类型
  - 服务端只需将处理后的数据直接返回，不需特殊处理




### [WEB]与后台保持不断的通信的方法
 - 不断轮询
 - 长时间连接
 - WebSocket

### [WEB]cookie和session的区别
`cookie`
 - `保存在客户端`的小文本
 - 可保存sessionID
 - 不安全
 
`session`
 - `保存在服务端`的有关浏览器会话的信息
 - 运行依赖sessionID
    - 创建前，服务端会先检查请求头里是否包含session id。若有，且未过期，则直接用旧的）
 - 有失效时间
 - 安全

 一句话：`session`的实现一般需要借助`cookie`来发送`sessionID`


### [WEB]HTTP
 [HTTP](./../Browser/HTTP.md)

### [WEB]移动端H5适配

 #### [css]媒体查询
 ```css
 /* 分辨率大于960px且小于1280px */
 @media screen and (min-width: 960px) and (max-width: 1280px) {

 }
 ```
 #### [css] rem

### [WEB]webpack
`webpack`是模块打包的机制，它是通过`loader`、`plugins`对资源进行处理，最后打包成浏览器成识别的js等文件。

原理：
 - 识别入口文件
 - 分析模块依赖
 - 解析模块（通过不同`Loader`）
 - 编译模块，生成抽象语法树`AST`
 - 循环遍历`AST`
 - 打包成`bundle.js`

#### bundle.js
`bundle.js`实际上是一个`立即执行的匿名函数`。
 - 函数的参数是一个数组，数组中的每一项都是一个`function`
 - 每个`function`就对应每个`模块`的内容，会按照`require`的顺序排列，
 - 每个模块都有一个唯一的id（从0递增）

[查看bundle.js](./../../example/webpack/bundle.js)

#### Loader
`Loader`是对加载的文件进行处理。

本质上是一个函数，输入参数是一个`字符串`，输出参数也是一个`字符串`。（但是输出参数会被当成是JS代码，随后会解析成`抽象语法树AST`）

#### Plugins
`Plugins`是用来扩展webpack功能的，会在整个构建过程中生效，执行相关的任务。

和`Loader`的区别：
 - `Loader`是在打包构建过程中，用来处理源文件的（JSX、SCSS...），一次处理一个；
 - `Plugins`并不是直接操作单个文件，而是会`对整个构建过程都起作用`

#### 使用方法
 - ./node_modules/.bin/webpack `input.js` `output.js`
    - 不同环境下全局安装的webpack版本可能不符合这个项目，所以还是用局部依赖
 - 从入口文件`input.js`开始，找出`所有依赖`的文件，然后用对应的`loaders`去处理它们
 - 最后打包成为一个浏览器可识别的js文件`output.js`

### [WEB]gulp与webpack的区别
`gulp`强调的是前端开发流程。

用法：通过定义一系列的task，再定义task处理的事物、顺序，最后让gulp执行task，从而构建前端项目。

4个常用的方法：
 - src（）：获取流
 - dest（）：写文件
 - task（）：定义任务
 - watch（）：用来监听事件

 IE8下最好用`gulp`，IE9用`webpack`

### [Node.js]异步式I/O和事件驱动
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

### [Node.js]require的过程
`require`命令的基本功能是，读取并执行一个指定的文件，然后返回 **该模块** 的`exports`对象。

他的加载规则：
 - 加载目录
    - 找到目录下`package.json`的`main`字段
    ```json
    {
        "name": "some-dir",
        "main": "./lib/some-lib.js"
    }
    ```
    - 找不到`package.json`，会找`index.js`、`index.node`
 
 - 加载文件（最初是以`.js`为后缀）
    - 以`/`开头，则按绝对路径去加载该模块
    - 以`./`开头，则按相对该脚本的路径去加载该模块
    - 没有开头
        - 按加载`核心模块`的方式去加载该模块
        - 找不到，再按`第三方模块`的方式去加载该模块
            - 例如`require('foo.js')`
            ```js
            // 按`核心模块`的方式去加载
            /usr/local/lib/node/foo.js

            // 按`第三方模块`的方式去加载(最近一个node_modules)
            /home/user/projects/node_modules/foo.js
            // 按`第三方模块`的方式去加载(最近第二个node_modules)
            /home/user/node_modules/foo.js
            // 按`第三方模块`的方式去加载(最近第三个node_modules)
            /home/node_modules/foo.js
            // 按`第三方模块`的方式去加载(最近第四个node_modules)
            /node_modules/foo.js
            ```

### [Node.js]回调函数
[回调函数](/src/NodeJS/Callback.md)

### [Node.js]EventEmitter
[EventEmitter（2019-01-24）](/src/NodeJS/EventEmitter.md)

### [算法]八大排序
 [八大排序](./../Algorithm/Sort.md)

### [算法]二分查找
 思想：在一个`有序序列`当中，把要`查找的值`，与`中间值`比较：
 
 若大于中间值，则在右边进行`相同查找`；否则在左边进行查找。找到后返回索引值，否则返回`-1`

  - 利用递归（数据量较少时）
  ```js
  function binary_search(arr, key) {
      var low = 0 // 最左端
      var high = arr.length - 1 // 最右端
      
      while(low < high) {
          var mid = Math.floor((low + high) / 2)
          if (key === arr[mid]) {
              return mid
          } else if (key > arr[mid]) {
              low = mid + 1
          } else if (key < arr[mid]) {
              high = mid - 1
          } else {
              return - 1
          }
      }
  }

  var arr = [1, 9, 7, 6]
  binary_search(arr, 7)
  ```
 #### 时间复杂度的计算
 `时间复杂度 = while的循环次数`
 假设共n个数，那下一轮是n/2，再下一轮是n/4（即n/2²）...最后是n/(2的k次方)。其中`k`是`循环的次数`
 故，要计算：n/(2的k次方) >= 1
 
 解，得：n = (2的k次方)

 **k = logn**


### [CSS]多列布局、伸缩布局、网格布局
### [JS]async/await