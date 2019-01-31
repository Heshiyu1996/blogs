## 接口 Interfaces
> 接口的作用就是对值所具有的结构进行类型检查。
> 
> 更新时间： 2019-01-14、2019-01-31

我是导航条：
[什么是接口？](#什么是接口？) -> [使用方法](#使用方法) -> [可选属性](#可选属性) -> [任意属性](#任意属性) -> [只读属性readonly](#只读属性readonly)

### 什么是接口？
在面向对象语言中，接口（Interfaces）是对行为的抽象，类（Class）是对行为的具体实现。

在TypeScript中，除了可用于 **对类的一部分行为进行抽象** 以外，也常用于对 **对象的形状（Shape）进行描述**。下面主要讲的是后者。

### 使用方法
```ts
interface Person {
    name: string;
    age: number;
}

let heshiyu: Person = {
    name: 'Heshiyu',
    age: 23
}
```
上面例子，定义了一个接口 `Person`，然后定义了一个变量 `heshiyu`，它的类型是 `Person`。

这样的效果就是：约束了 `heshiyu` 的形状必须和接口 `Person` 一致。

一致的意思是：**赋值时，变量里的属性要和接口里的属性保持一致**！

 ### 可选属性
 有时我们希望不要完全匹配一个形状，那么可以使用 **可选属性**：
 ```ts
 interface Person {
     name: string;
     age?: number;
 }

 let heshiyu: Person = {
     name: 'Heshiyu' // ok
 }
 ```
 `age?`代表的意思是，该属性`age`是 **可以不存在** 的。
  - 注意：这时，**仍然不允许添加未定义的属性**！

```ts
interface Person {
    name: string;
    age?: number;
}

let heshiyu: Person = {
    name: 'Heshiyu',
    age: 23,
    gender: 'male' // error
}
// error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
```

### 任意属性
有时我们希望一个接口 **允许有任意的属性**，可以使用：
```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let heshiyu: Person = {
    name: 'Heshiyu',
    gender: 'male'
}
```
可以通过 `[propName: string]` 定义任意属性，它们取 `any` 类型的值。

> 那如果不是`any`，而是`string`呢？
注意：一旦定义了 **任意属性**，那么 **确定属性** 和 **可选属性** 都必须和他是一样的属性类型（官方说法是：必须是 **任意属性的属性类型的子属性**）。
```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string; // 任意属性的属性类型是 string
}

let heshiyu: Person = {
    name: 'Heshiyu',
    gender: 'male'
}

// error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'
```
上面例子，任意属性的属性类型是`string`，但可选属性`age`的值却是`number`类型，`number`不是`string`的子属性，所以报错了

### 只读属性readonly
  有时我们希望对象中的一些字段只能在创建的时候被赋值，后面不能被修改，可以使用 `readonly` 来定义只读属性。
  ```ts
  interface Person {
      readonly id: number;
      name: string;
      age?: number;
      [propName: string]: any;
  }

  let heshiyu: Person = {
      id: 17018,
      name: 'Heshiyu',
      gender: 'male'
  }

  heshiyu.id = 12222 // error

  // error TS2540: Cannot assign to 'id' because it is a constant or a read-only property
  ```
- 注意，**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**
  
### 参考链接
[对象的类型——接口](https://ts.xcatliu.com/basics/type-of-object-interfaces.html)