## 基础类型 BasicType
TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型。

### 布尔值
```js
let isDone: boolean = false
```

### 数字
```js
let totalCount: number = 6
```

### 字符串
```js
let name: string = 'heshiyu'
```

### 数组
```js
let list: number[] = [1, 2, 3]
```

### 元组
表示一个 **已知元素数量和类型** 的数组，各个元素的类型不需相同
```js
let x: [string, number]

x = [ 'heshiyu', 22 ] // OK
x = [ 22, 'heshiyu' ] // Error
```
当访问一个 **已知索引** 的元素，会得到正确的值
```js
console.log(x[0]) // 'heshiyu'
```

### 枚举
`enum` 类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字。
```js
enum Color { Red, Green, Blue }
let c: Color = Color.Green // 1
```
因为默认情况下，从`0`开始为元素编号（可以手动指定）
```js
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green // 2
```
枚举类型的便利是，你可以由 **下标（或者你手动指定后的值）** 来得到他对应的 **名字（key值）**
```js
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2]

console.log(colorName) // 'Green'
```

### Any
不希望类型检查器对这些值进行检查，而是直接让他们通过，可以使用`Any`
```js
let notSure: any = 4
notSure = 'I want to change' // ok
notSure = false // ok
```
也可以当做一个数组来用：
```js
let list: any[] = [1, true, 'free']
list[1] = 100 // ok
```

### Void
`void`和`any`类型相反，它表示没有任何类型。
```js
function say(): void {
    console.log('Hi')
}
```
声明一个`void`的变量没有什么作用，因为只能赋值`undefined`和`null`
```js
let iAmVoid: void = undefined
```

### Null 和 Undefined
在TypeScript里，`undefined`和`null`两者各自有自己的类型，分别叫做`undefined`和`null`。和`void`相似，它们本身的类型用处不大：
```js
let u: undefined = undefined
let n: null = null
```

### Never
`never`类型表示那些总是会抛出异常，或根本不会有返回值的函数表达式或箭头函数表达式的返回值类型。
```js
function error(message: string): never {
    throw new Error(message)
}
```

### Object
`object`表示非原始类型，也就是除了`number`、`string`、`boolean`、`symbol`、`null`或`undefined`之外的类型

### 类型断言
有时候需要 **强制类型转换** 的时候，可以这样写：
```js
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```