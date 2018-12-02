## 解构赋值 Destructuring
TypeScript支持解构赋值。

### 解构数组
> 解构赋值用在数组上一般有：1、交换变量的值；2、用在函数参数上；3、rest语法

解构数组的用法：
```js
// before
let input = [1, 2]

first = input[0]
second = input[1]

// after
let input = [1, 2]

let [first, second] = input
```
以上就相当于创建了两个命名变量`first` 和 `second`，比使用索引时更加方便

#### 交换变量的值
利用解构赋值可以在不引入其他变量下，交换两个变量的值
```js
[first, second] = [second, first]
```
#### 用在函数参数上
```js
function f([first, second]: [number, number]) {
    console.log(first)
    console.log(second)
}
f(input)
```
#### rest语法
可以使用`...`语法来创建剩余的变量
```js
let [first, ...rest] = [1, 2, 3, 4]
console.log(first) // 1
console.log(rest) // [2, 3, 4]
```
同时，变量还可以挑着来创建：
```js
let [, second, , fourth] = [1, 2, 3, 4]

console.log(second) // 2
console.log(fourth) // 4
```

### 解构对象
> 解构赋值用在对象上一般有：1、rest语法；2、属性重命名；3、默认值；4、函数声明

解构对象的用法：
```js
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
}
let { a, b } = o
// p1： 此处let可以去掉，那就是var全局声明了：
// ( { a, b } = o )
// 需要用括号括起来，因为JavaScript会以`{`起始的语句解析为一个块

// p2：若要通过TypeScript来指定类型，需要在其后写上完整的模式
let { a, b }: { a: string, b: number } = o
```
#### rest语法
```js
let { a, ...passthrough } = o
console.log(passthrough) // { b: 12, c: 'bar' }
// 注意，rest语法的那个变量可以不按照“key值是否匹配”来拿值
```

#### 属性重命名
```js
let { a: newName1, b: newName2 } = o
console.log(newName1) // 'foo'
console.log(newName2) // 12
```

#### 默认值
```ts
let { a, d = 1001 } = o
console.log(d) // 1001
```

#### 函数声明
```ts
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```

### 展开操作符
展开操作符和解构相反。（所以它是写在**等号右边**的，哈哈哈哈！！！）
#### 展开数组
```js
let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5]

console.log(bothPlus) // [0, 1, 2, 3, 4, 5]
// 由此可见，展开操作可以创建first、second的一份浅拷贝（意思是原来的first、second不会被展开操作所改变）
```

#### 展开对象
```js
// 展开对象写法：
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' }
let search = { ...defaults, food: 'rich' }
console.log(search) // { food: 'rich', price: '$$', ambiance: 'noisy' }

// Object.assign()写法：
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' }
let search_copy = Object.assign({}, defaults, { food: 'rich' })

```
由此可见，展开对象时，**从左到右**处理（Object.assign()也是），**排在后面的属性**优先！

#### “展开对象”的不足
1、 只包含对象 **自身的可枚举属性**（即，展开一个对象实例时，会丢失对象里面的方法）
```js
class C() {
    p = 12
    m() { }
}

let c = new C()
let clone = { ...C }
clone.p // 12
clone.m() // error
```
2、TypeScript编译器**不允许展开泛型函数上的类型参数**