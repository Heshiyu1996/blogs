## 函数 Functions
> 函数分为：具名函数 和 匿名函数。
> 
> 更新时间： 2019-01-10

我是导航条：
[函数类型](#函数类型) -> [用接口定义函数的形状](#用接口定义函数的形状) -> [可选参数](#可选参数) -> [默认参数](#默认参数) -> [rest参数](#rest参数) -> [函数重载](#函数重载)

回顾js里的两种定义函数的方式————函数声明（Function Declaration）和函数表达式（Function Expression）：
```js
// 函数声明
function add(x, y) { 
    return x + y 
}

// 函数表达式
let addition = function(x, y) { 
    return x + y 
}
```
### 函数的类型定义
#### 函数声明
```ts
// 给“函数声明”定义类型
function sum(x: numnber, y:number): number { 
    return x + y 
}
```
- 注意：**输入多余的（或者少于的）参数，都是不允许的！**

```ts
// 给“函数声明”定义类型
function sum(x: numnber, y:number): number { 
    return x + y 
}

sum(1, 2, 3) // error TS2346: Supplied parameters do not match any signature of call target.
```

#### 函数表达式
```ts
let mySum = function (x: number, y: number): number {
    return x + y
}
```
 - 注意：虽然可以通过编译，但是原理不同！因为上面的代码只对等号右边的 **匿名函数** 进行了类型定义，而等号左边的 `mySum` ，是通过赋值操作进行 **类型推论** 而推断出来的
 - 下面是手动给 `mySum` 添加类型的方式：
```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
}
```
 - 注意：TypeScript中的 `=>` 和 ES6中的 `=>`不一样。
 - 前者代表函数的定义，左边是输入类型（需要用括号括起来），右边是输出类型
 - 后者代表箭头函数

### 用接口定义函数的形状
可以使用接口的方式来定义一个函数需要符合的形状：
```ts
interface SumFunc {
    (x: number, y: number): number
}

let mySum: SumFunc
mySum = function(x: number, y: number) {
    return x + y
}
```


### 可选参数
TypeScript里的每个函数参数都是**必须**的，即 `参数的个数` === `函数期望的参数个数`。

对于可选参数，可在参数名旁使用`（ ? ）`实现可选参数的功能。（与接口中的可选属性类似）
```ts
function buildName(firstName: string, lastName?: string) {
    /* ... */
}

let result1 = buildName('heshiyu') // ok
let result2 = buildName('heshiyu', 'caozuoxiao') // ok
let result3 = buildName('heshiyu', 'caozuoxiao', 'chenruihui') // error
```
 - 注意： 可选参数 必须跟在 必须参数 后面（即，可选参数 后面 **不允许再出现必须参数**）


### 默认参数
对于ES6，允许给函数的参数添加默认值；

对于TypeScript，**会把添加了默认值的参数，识别为可选参数**。

```ts
function buildName(firstName: string, lastName: string = 'heshiyu') {
    return firstName + ' ' + lastName
}

let result1 = buildName('heshiyu') // 'heshiyu heshiyu'
let result2 = buildName('heshiyu', undefined) // 'heshiyu heshiyu'
let result4 = buildName('heshiyu', 'caozuoxiao') // 'heshiyu caozuoxiao'
let result3 = buildName('heshiyu', 'caozuoxiao', 'chenruihui') // error
```
 - 注意：此时就 不一定要必须遵守 **可选参数必须接在必须参数后面** 这条限制了

```ts
function buildName(firstName: string = 'he', lastName: string) {
    return firstName + ' ' + lastName
}

let result1 = buildName('heshiyu', 'caozuoxiao') // 'heshiyu caozuoxiao'
let result2 = buildName(undefined, 'caozuoxiao') // 'he caozuoxiao'
```

### rest参数
想同时操作多个参数，或并不知道有多少个参数传递进来，可以使用rest参数
```ts
function buildName(fisrtName: string, ...restOfName) {
    return firstName + ' ' + restOfName.join(' ')
}

let names = buildName('heshiyu', 'caozuoxiao', 'chenruihui')
```
 - 注意：rest参数实际上是一个数组，所以我们可以用数组的类型定义它：
 - rest参数只能是最后一个参数
```ts
function buildName(fisrtName: string, ...restOfName: any[]) {
    return firstName + ' ' + restOfName.join(' ')
}

let names = buildName('heshiyu', 'caozuoxiao', 'chenruihui')
```

### 函数重载
重载允许 **一个函数接受不同数量或类型的参数时** ，作出不同的处理。

比如，有一个函数`reverse`：输入数字`123`时，输出反转的数字`321`；输入字符串`hello`时，输出翻转的字符串`olleh`

#### 利用联合类型
```ts
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}
```
 - 缺点：表达不够精确。
 - 应该是输入数字的时候，输出也应该为数字；
 - 输入字符串的时候，输出也应该为字符串

#### 利用重载
```ts
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}
```
上面虽然重复定义了多次函数`reverse`，但前几次都是函数定义，最后一次是函数实现。

 - 注意：TypeScript会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面