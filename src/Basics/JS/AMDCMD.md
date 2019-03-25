# AMD & CMD
> 一共有4种模块规范，这里主要讲的是前两种：AMD和CMD
> 
> 更新时间： 2019-03-25

### 四种模块规范
 - AMD（是RequireJS在推广过程中，对模块定义的规范化产出）
 - CMD（是SeaJS在推广过程中，对模块定义的规范化产出）
 - CommonJS
 - ES6 模块

### AMD
在了解AMD规范之前，先看看require.js的使用方式

```js
// main.js
require(['./add', './square'], function(addModule, squareModule) {
    console.log(addModule.add(1, 1))
    console.log(squareModule.add(1, 1))
})
```
require 的第一个参数表示：`依赖的模块路径`，第二个参数表示`此模块的内容`

可以看出，`主模块main.js`依赖`add 模块`和`square`模块

其中，`add模块`的内容如下：
```js
// add.js
define(function() {
    console.log('加载了 add 模块')
    var add = function(x, y) {
        return x + y
    }

    return {
        add: add
    }
})
```
`requirejs`为全局添加了`define`函数，我们只要按照这种约定的方式来书写模块即可

`square模块`的内容如下：
```js
// square.js
define(['./multiply'], function(multiplyModule) {
    console.log('加载了 square 模块')
    return {
        square: function(num) {
            return multiplyModule.multiply(num, num)
        }
    }
})
```
`multiply模块`的内容如下：
```js
// multiply.js
define(function() {
    console.log('加载了 multiply 模块')
    var multiply = function(x, y) {
        return x * y
    }
    return {
        multiply: multiply
    }
})
```
那么，最后的打印顺序为：
```js
加载了 add 模块
加载了 multiply 模块 // 注意，是multiply先！！
加载了 square 模块
2
9
```

综上，`AMD规范`的主要内容就是定义了 `define`函数该如何书写，只要按照这个规范书写模块和依赖，require.js就能正确地解析。


### CMD
在了解CMD规范之前，先看看sea.js的使用方式

```js
// main.js
define(function(require, exports, module) {
    var addModule = require('./add') // 注意，这里开始使用require语法了
    console.log(addModule.add(1, 1))

    var squareModule = require('./square')
    console.log(squareModule.square(3))
})
```

```js
// add.js
define(function(require, exports, module) {
    console.log('加载了 add 模块')
    var add = function(x, y) {
        return x + y
    }
    module.exports = { // 注意，这里开始使用module.exports语法了
        add: add
    }
})
```
**注意**：这里第一次出现了`module.exports`，先解释一下它的含义：

`module` 是一个变量，代表当前模块；`exports`属性 是对外的接口。我们说的“加载某个模块”，实际上就是加载该模块的`module.exports`属性。其中，`require`方法用于加载模块

```js
// square.js
define(function(require, exports, module) {
    console.log('加载了 square 模块')
    var multiplyModule = require('./multiply')
    module.exports = {
        square: function(num) {
            return multiplyModule.multiply(num, num)
        }
    }
})
```

```js
// multiply.js
define(function(require, exports, module) {
    console.log('加载了 multiply 模块')
    var multiply = function(x, y) {
        return x * y
    }
    module.exports = {
        multiplly: multiply
    }
})
```

同样的，`main`依赖`add`和`square`，`square`依赖`multiply`

此时的打印顺序为：
```js
加载了 add 模块
2
加载了 square 模块
加载了 multiply 模块
9
```
综上，`CMD规范`的主要内容就是描述该如何定义模块、如何引入模块、如何导出模块，只要按照这个规范书写代码，sea.js就能正确地解析。

注意：这时候引入了`require('')`、`module.exports = {}`

### AMD与CMD的区别
 - AMD喜欢**依赖前置**（即一开始就写好要依赖的模块），CMD喜欢**依赖就近**（即用到的时候再加载）
 - AMD喜欢**提前执行**（先加载完再执行代码），CMD喜欢**延迟执行**（即require的时候才去加载）

```js
// AMD
加载了 add 模块
加载了 multiply 模块
加载了 square 模块
2
9
```
```js
// CMD
加载了 add 模块
2
加载了 square 模块
加载了 multiply 模块
9
```

### CommonJS
`AMD`和`CMD`都是用于浏览器端的模块规范，在服务器端（node），采用的是`CommonJS规范`
```js
// 导出模块
var add = function(x, y) {
    return x + y
}

module.exports.add = add
```

```js
// 引入模块
var add = require('./add.js')
console.log(add.add(1, 1))
```
