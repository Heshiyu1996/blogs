# Module
> 模块

### 四种模块加载规范
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

### 例子改成CommonJS规范
```js
// main.js
var add = require('./add.js')
console.log(add.add(1, 1))

var square = require('./square.js')
console.log(square.square(3))
```

```js
// add.js
console.log('加载了 add 模块')

var add = function(x, y) {
    return x + y
}

module.exports.add = add
```

```js
// square.js
console.log('加载了 square 模块')

var multiply = require('./multiply.js')

var square = function(num) {
    return multiply.multiply(num, num)
}

module.exports.square = square
```

```js
// multiply.js
console.log('加载了 multiply 模块')

var multiply = function(x, y) {
    return x * y
}

module.exports.multiply = multiply
```

打印顺序为：
```js
加载了 add 模块
2
加载了 square 模块
加载了 multiply 模块
9
```
和CMD（sea.js）的执行结果一致，即`在 require 的时候，才去加载模块文件，加载完再执行`

### CommonJS和AMD的区别
 - `CommonJS` 加载模块是同步的（即加载完成，才能执行后面的操作），`AMD` 规范加载模块是异步的（可以指定回调函数，加载完去执行指定回调代码）
 - `AMD` 使用define方法定义模块
 - `CommonJS` 主要用于服务端，因为模块文件一般都存在本地硬盘，加载起来比较快，AMD主要用于浏览器端，此时模块文件存在于服务端

> 以下讲的是CommonJS规范

### module对象

### require命令
`require`命令的基本功能是，读入并执行一个js文件，然后返回该模块的`exports`对象。

#### 加载规则
##### 对于文件
后缀名默认为`.js`
 - 以`/`开头，表示：加载绝对路径的模块文件
    - 例如`require('/user/heshiyu/foo.js')`
 - 以`./`开头，表示：加载相对当前脚本的相对路径的模块文件
    - 例如`require('./foo.js')`
 - 没有开头，表示：加载默认提供的核心模块（或位于各级的node_modules目录的已安装模块）
    - 例如`require('foo.js')`
        > /usr/local/lib/node/bar.js // 这是Node的系统安装目录
        > 
        > /home/user/projects/node_modules/bar.js // 这是最近第一个node_modules
        > 
        > /home/user/node_modules/bar.js // 这是最近第二个node_modules
        > 
        > /home/node_modules/bar.js // 这是最近第三个node_modules
        >
        > /node_modules/bar.js // 这是最近第四个node_modules
 - 找不到指定模块，会尝试`.json`、`.node`再去搜索
 - 想得到`require`命令加载的确切文件名，可以用`require.resolve()`方法

##### 对于目录
 - 找`package.json`文件的`main`字段
 ```json
 {
     "name": "some-dir",
     "main": "./lib/some-lib.js" // 通过main字段来指定入口文件
 }
 ```
 - 找不到`package.json`，找`index.js`、`index.node`文件

#### 模块缓存
第一次加载某个模块，Node会缓存该模块。以后再加载时，直接从缓存中取出。

并且输入的是一个拷贝。也就是说，一旦输出一个值，模块内部的变化影响不到这个值

```js
// lib.js
var counter = 3
function incCounter() {
    counter++
}
module.exports = {
    counter: counter,
    incCounter: incCounter
}
```

```js
// main.js
var counter = require('./lib').counter
var incCounter = require('./lib').incCounter

console.log(counter) // 3
incCounter()
console.log(counter) // 3
```
可以看出，counter输出后，`lib.js`模块内部的变化就影响不到`counter`了

##### 删除缓存
```js
delete require.cache[moduleName]
```