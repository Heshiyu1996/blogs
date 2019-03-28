# ES6模块 & CommonJS模块
> ES6模块是什么？它和CommonJS模块有什么区别？一共有哪些模块规范？
> 
> 更新时间： 2019-03-25

## 四种模块规范
 - AMD（是RequireJS在推广过程中，对模块定义的规范化产出）
 - CMD（是SeaJS在推广过程中，对模块定义的规范化产出）
 - CommonJS
 - ES6 模块

`ES6模块`的设计思想是尽量静态化，使得**编译时**就能确定模块的依赖关系。

`CommonJS`只能在**运行时**确定这些东西。
## ES6模块

### export
`export`命令指定了**模块的对外接口**，它可以输出**变量**、**函数**或**类**，但**不能输出值**。
 - 用法：
 ```js
 // 写法一：
 export var name = 'heshiyu'

 // 写法二：
 var name = 'heshiyu'

 export {
     name
 }
 ```
 #### 重命名
 ```js
 export {
     name as mingzi
 }
 ```
 
### import
`import`命令是**Singleton模式**，是静态执行的（所以不能使用**表达式**、**变量** 这些需要在**运行时**才能得到结果的结构），并且`输入的变量是一个只读的接口`，不能对其重新赋值。
 > 无法取代`require()`，因为`require`是运行时加载模块，`import`是在编译时处理模块
 > 
 > 多次加载，只会执行一次
```js
import { foo } from 'my_module'
import { bar } from 'my_module'

// 对于foo、bar对应的是同一个my_module实例（即多次加载，只会执行一次）
// 等价于：
import { foo, bar } from 'my_module'

import 'lodash'
// 仅仅执行lodash模块，但不会输入任何值

import * as circle from './circle'
// 模块的整体加载（应该是静态分析的，不允许运行时改变）
```
#### 重命名
```js
import { name as mingzi } from 'my_module'
```

### export default
同一个模块可以有`多个export`导出语句，但只能有`一个export default`默认导出语句。
```js
 // 导出
 export default name

 // 等价于：
 var name = 'heshiyu'

 export {
     name as default
 }

 // 导入（对于export default，import不需要使用大括号）
 import name from 'my_module'
```

### export与import的复合写法
```js
export { foo, bar } from 'my_module'

//等价于
import { foo, bar } from 'my_module'
export { foo, bar }
```
```js
// 整体输出
export * from 'my_module'
// export *表示输出my_module模块的所有属性和方法（除了default）
```

### 在浏览器中加载ES6模块
需要加入`type="module"`属性（默认`异步加载`，带`defer`）


 - 插入一个外部的模块脚本：
```js
<script type="module" src="foo.js"></script>

// 等价于
<script type="module" src="foo.js" defer></script>
```
 - 内嵌在网页中：
```js
<script type="module">
    import utils from "./utils.js"

    // other code...
</script>
```
注意：
 - 代码是在`模块作用域`中运行，而不是`全局作用域`
 - 模板脚本采用`严格模式`
 - import加载其他模块时，后缀`.js`不可省略
 - `顶层this`会返回`undefined`

### ES6模块和CommonJS模块的差异
 - CommonJS模块输出的是一个`值的复制`，ES6模块输出的是`值的引用`
 - CommonJS模块是`运行时加载`，ES6模块是`编译时输出接口`
 - CommonJS模块的顶层this`指向当前模块`，ES6模块的顶层this`指向undefined`

> 第二个差异是因为CommonJS加载的是一个对象（module.exports属性），该对象只有在运行时才会生成；而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

 - CommonJS模块（**具有缓存机制**）：
 `require`命令 **第一次加载该脚本时** 就会执行整个脚本，然后在内存中生成一个对象：
 ```js
 {
     id: '...', // 模块名
     exports: { ... }, // 模块输出的各个接口
     loaded: true // 该模块是否执行完毕
 }
 ```
以后需要用到这个模块时，就会到`exports`属性上取值（即使多次执行`require`，也不会再次执行该模块，而是到缓存中取值）。所以CommonJS是有**缓存机制**、**模块内/外部都是相互独立**的，就像下面例子一样：

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
var mod = require('./lib')

console.log(mod.counter) // 3
mod.incCounter()
console.log(mod.counter) // 3
```
 - ES6模块（**没有缓存机制**）：
```js
// lib.js
export var counter = 3

export function incCounter() {
    counter++
}
```
```js
// main.js
import { counter, incCounter } from './lib'

console.log(counter) // 3
incCounter()
console.log(counter) // 4
```
ES6模块的运行机制：JS引擎对脚本**静态分析**时，遇到模块加载`import`就会生成一个**只读引用**。`等脚本真正执行时`，再根据这个`只读引用`到`被加载的模块中`取值。（即：ES6模块会 **动态地** 去被加载的模块取值）

再看一个例子，表明ES6模块是动态取值
```js
// mod.js
function Person(name) {
    this.name = name
}

export let person = new Person('heshiyu')
```

对于不同的脚本加载这个模块，得到的都是`同一个实例`

### 循环加载
#### CommonJS的循环加载
脚本代码在`require`时就会全部执行。一旦某个模块被“循环加载”，只输出已执行的部分，还未执行的部分不会输出。
```js
// a.js
exports.done = false // 2、先输出一个变量done
var b = require('./b.js') // 3、加载另一个脚本文件b.js。此时a.js的代码暂停在这里了
console.log('在a.js中， b.done = ' + b.done) // 9、b.js执行完了，此时的b是b.js最后的结果。故b.done = true
exports.done = true // 10、再输出一个变量done
console.log('a.js执行完毕') // 11、输出a.js执行完毕

// b.js
exports.done = false // 4、先输出一个变量done
var a = require('./a.js') // 5、因为缓存机制，b.js会去a.js模块对应对象的exports属性中取值（只能取目前已执行的部分，即a.done为false）
console.log('在b.js中，a.done = ' + a.done) // 6、输出a.done = false
exports.done = true // 7、再输出一个变量done
console.log('b.js执行完毕') // 8、输出'b.js执行完毕'

// main.js
var a = require('./a.js') // 1、开始执行a.js；12、此时a拿到的是a.js最后的结果
var b = require('./b.js') // 13、因为b.js已执行完，此时会输出缓存的b.js的执行结果
console.log('在main.js中，a.done = ' + a.done + '，b.done = ' + b.done) // 13、输出a.done = true；b.done = true
```
执行`node main.js`，输出结果
```
在b.js中，a.done = false
b.js执行完毕
在a.js中， b.done = true
a.js执行完毕
在main.js中，a.done = true，b.done = true
```

#### ES6的循环加载
`ES6模块`的循环加载
`import`从一个模块中加载变量，这个变量会成为 **指向被加载模块** 的引用
```js
// a.js
import { bar } from './b.js' // 1、看到import，先加载并运行b.js
console.log('a.js') // 6、b.js加载并执行完了，输出'a.js'
console.log(bar) // 7、从b.js里导入变量bar，输出'bar'
export let foo = 'foo' // 8、需要从a.js里输出一个变量foo（但已无人需要了）

// b.js
import { foo } from './a.js' // 2、因为a.js已开始执行，所以不会重复执行
console.log('b.js') // 3、输出'b.js'
console.log(foo) // 4、输出foo，但目前a.js还没执行完，拿到的是undefined
export let bar = 'bar' // 5、需要从b.js里输出一个变量bar
```
执行`node a.js`，输出结果：
```
b.js
undefined
a.js
bar
```

### ES6模块的转码
除了`Babel`可以将ES6转为ES5的写法，还有以下两个方法：
 - ES6 module transpiler
 - SystemJS