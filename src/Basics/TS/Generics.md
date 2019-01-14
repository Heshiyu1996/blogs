## 泛型 Generics
> 我们可以使用`泛型` 去创建这些`可重用的组件`，使得这种组件可以支持 **多种类型的数据**，同时用户也可以以 **自己的数据类型** 来使用这个组件。
> 
> 更新时间： 2019-01-14

我是导航条：
[any类型VS泛型](#any类型VS泛型) -> [使用泛型变量](#使用泛型变量) -> [泛型类型](#泛型类型) -> [泛型类](#泛型类) -> [泛型约束](#泛型约束)

### any类型VS泛型
如果有个函数，它会返回任何传入它的值，你会怎么写？

#### 1、用any类型来定义
```ts
function identity(arg: any): any {
    return arg
}
```
坏处：没有精确约束好 【**传入的类型** 与**返回的类型** 是相同的】这一规则。（因为`any`它只能说明这个函数对于任何类型的值都能接受、都能返回。）

#### 2、用类型变量T来定义

```ts
function identity<T>(arg: T): T {
    return arg
}
// < >里面“声明”的是类型变量。它帮我们捕获用户传入的类型
// 同时，我们也可以使用T当作返回值类型。
```
使用时：
```ts
let output = identity('myString')
// 通过传入的参数myString，它的类型是由myString的类型string来自动地推断出T的类型
```

### 使用泛型变量
使用泛型，并创建泛型函数时，需要在函数内必须正确地使用这个通用的类型T。即必须要把这些参数“当作”是任意（或所有）类型。

比如，你往下面这个函数传入`number`，会报错
```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length) // Error： T doesn't have .length
    return arg
}
```
请记住，这些`类型变量`代表的是任意类型，所以要兼顾各种数据类型的情况。

### 泛型类型
**泛型函数的类型** 与 **非泛型函数的类型** 没什么不同，只是有一个类型参数（`<T>`）在函数名字后面，像函数声明一样：
```ts
function identity<T>(arg: T): T {
    return arg
}

let myIdentity: <T>(arg: T) => T = identity
// 我们还可以使用带有调用签名的对象字面量来定义泛型函数：
// let myIdentity: { <T>(arg: T): T } = identity
```
看注释部分，我们可以将 **对象字面量** 那部分提取出来作为接口：
#### 泛型接口
```ts
interface GenericIdentityFn {
    <T>(arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: GenericIdentityFn = identity
```
如果想把 **泛型参数** 当作 **整个接口** 的一个参数，则改为
```ts
interface GenericIdentityFn<T> {
    (arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: GenericIdentityFn<number> = identity
```
如果是这样的话，那我们使用`GenericIdentityFn`的时候，还要传入一个类型参数来指定泛型类型（这里是：`number`），锁定了之后代码里使用的类型。

### 泛型类
泛型类看上去与泛型接口差不多，使用（`< >`）括起泛型类型，跟在类名后面。
```ts
class GenericNumber<T> {
    value: T
    add: (x: T, y: T) => T
}

// 传入number
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.value = 0
myGenericNumber.add = function(x, y) { return x + y }

// 传入string
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y }
```
注意：类有两部分：静态部分、实例部分。泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

### 泛型约束
在`loggingIdentity`例子中，我们想访问`arg`的length属性，但是编译器并不能保证每种类型都有length属性，所以就报错了。

如果我们要去限制（即，传入的类型有这个length属性，我们就允许），那我们就要列出对于T的约束要求。

定义一个接口来描述约束条件
```ts
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T{
    console.log(arg.length)
    return atg
}

loggingIdentity(3) // Error, number doesn't have a .length property

loggingIdentity({ length: 10, value: 3 }) // ok，我们需要传入符合约束类型的值，必须包含必须的属性
```

#### 在泛型约束中使用类型参数
声明一个类型参数，且它被另一个类型参数所约束。
```ts
function getProperty(obj: T, key: K) {
    return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a') // ok
getProperty(x, 'm') // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

#### 在泛型里使用类类型
使用泛型创建工厂函数时，需要引用构造函数的类类型
```ts
function create<T>(c: { new(): T }): T {
    return new c()
}
```
