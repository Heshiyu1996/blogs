## 函数 Functions
> 函数分为：具名函数 和 匿名函数。
> 
> 更新时间： 2019-01-10

我是导航条：
[函数类型](#函数类型) -> [可选参数](#可选参数) -> [默认参数](#默认参数) -> [rest参数](#rest参数) -> [this](#this)

回顾js里的两种函数的写法：
```js
// 具名函数
function add(x, y) { return x + y}

// 匿名函数
let addition = function(x, y) { return x + y }
```
### 函数类型
#### 定义类型
```js
// 给具名函数定义类型
function add(x: numnber, y:number): number { return x + y }

// 给匿名函数定义类型（简单版）
let addition = function(x: number, y: number): number { return x + y }
// 给匿名函数定义类型（完整版）
let addition: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y }
```
可以看出，**完整版** 和 **简单版** 的区别是：多了参数类型 和 返回值类型。
 - 参数类型：
    - 以参数列表的形式写出，为每个参数指定一个名字（随意起也行）和类型
    - 只要参数类型匹配，就认为它是有效的函数类型（不管参数名是否正确）
 - 返回值类型：
    - 是函数类型的必要部分，若没有返回任何值，也必须指定返回值类型为`void`而不能留空
    - 在函数和返回值类型之前使用`（ => ）`符号

### 可选参数
TypeScript里的每个函数参数都是**必须**的，即`参数的个数` === `函数期望的参数个数`。
对于可选参数，可在参数名旁使用`（ ? ）`实现可选参数的功能。
```ts
function buildName(firstName: string, lastName?: string) {
    /* ... */
}

let result1 = buildName('heshiyu') // ok
let result2 = buildName('heshiyu', 'caozuoxiao') // ok
let result3 = buildName('heshiyu', 'caozuoxiao', 'chenruihui') // error
```
 > 注意： 可选参数 必须跟在 必须参数 后面

### 默认参数
对于默认参数，当用户没有传递这个参数或传递的值是`undefined`时，会自动设置它的默认值。
```ts
function buildName(firstName: string, lastName = 'heshiyu') {
    return firstName + ' ' + lastName
}

let result1 = buildName('heshiyu') // 'heshiyu heshiyu'
let result2 = buildName('heshiyu', undefined) // 'heshiyu heshiyu'
let result4 = buildName('heshiyu', 'caozuoxiao') // 'heshiyu caozuoxiao'
let result3 = buildName('heshiyu', 'caozuoxiao', 'chenruihui') // error
```
可见，在**所有必须参数后面跟着的**、默认参数都是可选的

与可选参数不同的是，默认参数不一定放在必须参数的后面（代价是明确传入`undefined`值来获得默认值）

另外注意的一点是：可选参数与末尾的默认参数**共享参数类型**。
```ts
function buildName(firstName: string, lastName?: string) { /* ... */ }

function buildName(firstName: string, lastName = 'heshiyu') { /* ... */}
```
他们共享同样的类型`(firstName: string, lastName?: string) => string`。默认参数的默认值消失了，只保留了他是一个可选参数的信息。

### rest参数
想同时操作多个参数，或并不知道有多少个参数传递进来，可以使用rest参数
```ts
function buildName(fisrtName: string, ...restOfName: string[]) {
    return firstName + ' ' + restOfName.join(' ')
}

let names = buildName('heshiyu', 'caozuoxiao', 'chenruihui')
```

### this
箭头函数能保存函数创建时的`this`值，而不是调用时的值