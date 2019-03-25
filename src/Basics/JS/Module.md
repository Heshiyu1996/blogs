# ES6模块 & CommonJS模块
> ES6模块是什么？它和CommonJS模块有什么区别？一共有哪些模块规范？
> 
> 更新时间： 2019-03-25

## 四种模块规范
 - AMD（是RequireJS在推广过程中，对模块定义的规范化产出）
 - CMD（是SeaJS在推广过程中，对模块定义的规范化产出）
 - CommonJS
 - ES6 模块

`ES6模块`的设计思想是尽量静态化，使得编译时就能确定模块的依赖关系。

`CommonJS`只能在**运行时**确定这些东西
## ES6模块

### export
`export`命令指定了**模块的对外接口**，它可以输出变量、函数或类，但不能输出值
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
`import`命令是Singleton模式，是静态执行的（所以不能使用“表达式”、“变量”这些需要在**运行时**才能得到结果的结构），并且`输入的变量是一个只读的接口`，不能对其重新赋值。
```js
import { foo, bar } from 'my_module'
// 对于foo、bar对应的是同一个my_module实例

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