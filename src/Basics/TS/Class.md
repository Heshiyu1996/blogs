## 类 Class
> 在前端，创建可重用组件的方法有两种：
> 
> 方法一：使用函数 和 基于原型的继承来创建（传统的JavaScript）
> 
> 方法二：基于类的继承，并且对象是由类构建出来的
> 
> 更新时间： 2019-01-17

### 类的例子
```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return 'Hello, ' + this.greeting
    }
}

let greeter = new Greeter('world') // 使用new构造了Greeter类的一个实例，会调用之前定义的构造函数，并用构造函数初始化它
```
上面的例子，声明了一个`Greeter`类。这个类有3个成员：
 - 1、greeting属性
 - 2、构造函数
 - 3、greet方法

而`this`，则表示我们要访问的是 **类的成员**

### 基于类的继承
在TypeScript，可以使用常用的面向对象模式（和java一样的）。

一个最简单的继承例子：
```ts
class Animal {
    move(distanceInMeter: number = 0) {
        console.log(`Animal moved ${distanceInMeter} m`)
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof!')
    }
}

const dog = new Dog()
dog.bark() // Dog继承了Animal的功能，因此一个Dog实例，它能够bark() 和 move()
dog.move(10)
dog.bark()
```
类从基类中继承了`属性`和`方法`。`Dog`是一个派生类（也叫“子类”），它通过`extends`关键字，派生自`Animal`基类（也叫“父类”）。

#### 当`父类`有构造函数时，应该怎么写？
```ts
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName }
    move(distanceInMeter: number = 0) {
        console.log(`${this.name} move ${distanceInMeter} m`)
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name) }
    move(distanceInMeter = 5) {
        console.log('slithering...')
        super.move(distanceInMeters) // 调用父类的move方法
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name) }
    move(distanceInMeter = 45) {
        console.log('galloping...')
        super.move(distanceInMeters) // 调用父类的move方法
    }
}

let heshiyu = new Snake('hhh')
let caozuoxiao: Animal = new Horse('ccc')
heshiyu.move()
// 输出：
// "slithering"
// "heshiyu move 5 m"

caozuoxiao.move(3333)
// 输出：
// "galloping"
// "caozuoxiao move 3333 m"
```
由上面例子可知，
 - `子类`拥有构造函数时（或要在构造函数里访问`this`属性前），一定要调用`super()`
 - `子类`重写了`父类`继承而来的方法，使得这些方法具有不同的功能（即重写）
 - 即使`caozuoxiao`被声明为`Animal`类型，但他是`Horse`实例，调用`move`时会调用`Horse`里的方法（以实例的类为准）

 ### public、protected和private
 在TypeScript里，成员默认为`public`。

| 修饰符 | public(默认) | protected | private |
|--|--|--|--|
| 作用 | 可以在声明它的类的外部访问 | 能在声明它的类的内部、子类的内部访问 | 能在声明它的类的内部访问 |

有一些注意的点，先看下例子：

```ts
class Person {
    protected name: string
    protected constructor(theName: string) { this.name = theName } 
}

class Employee extends Person {
    private department: string
    constructor(name string, department: string) {
        super(name)
        this.department = department
    }
    public getElevatorPitch() {
        return `${this.name} , ${ this.department }`
    }
}

let heshiyu = new Employee('heshiyu', 'NEAI')
let caozuoxiao = new Person('caozuoxiao', 'YX') // error, “Person”的构造函数时被保护的，无法在包含它的类外被实例化（可以再Employee里被实例化）
console.log(heshiyu.name) // error，name是protected修饰符，故不能在类的外部访问！
```
由上面例子可知，
 - 在`类的内部`能够访问，在类的外部就不行了，但是可以在类的内部、通过 **实例方法来get**
 - 构造函数若为protected，则表示这个类不能 **在包含它的类以外** 被实例化，但能 **被继承**

### readonly修饰符
利用`readonly`关键字将属性设置为 **只读**，这些只读属性 必须在 **声明时** 或 **构造函数** 里被初始化：
```ts
class Person {
    readonly name: string
    readonly department: string = 'NEAI' // 在“声明时”被初始化

    constructor (theName: string) {
        this.name = theName // 在“构造函数”里被初始化
    }
}
```
好处：在`.d.ts`文件汇总，利用了这个属性的开发者，能够清除看到标记着`readonly`的则表示不允许改变它的值。

#### 参数属性——通过构造函数的参数直接定义属性
```ts
// before
class Person {
    readonly name: string
    private age: number

    constructor(theName: string, theAge: number) {
        this.name = theName
        this.age = theAge
    }
}

// after
class Person {
    constructor( readonly name: string, private age: number ) { }
}

let hsy = new Person('heshiyu', 21)
console.log(hsy.name) // 'heshiyu'
console.log(hsy.age) // error，因为age的修饰符是private，不能在类外面被访问
hsy.name = 'hhh' // error，因为name是readonly的
```
看上去`Person`这个类不像是有属性的，但它确实有。并且这两种写法是 **等效** 的

### 存取器
一个没有存取器的例子：
```ts
class Employee {
    fullName: string
}

let emplyee = new Employee()
employee.fullName = 'heshiyu' // 实际上调用的是employee的 set方法

if (employee.fullName) { // 实际上调用的是employee的 get方法
    console,log(employee.fullName)
}
```
对象里的每一个属性它都有自己`get`、`set`方法。

默认不设置时：
 - `get`方法会在 读取 时调用；
 - `set`方法会在 赋值 时调用

设置时：
```ts
let passcode = 'secret passcode'

class Employee {
    private _fullName: string

    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        if (passcode && passcode === 'secret passcode') {
            this._fullName = newName // 这里才是普通的赋值操作
        } else {
            console.log('Error: Unauthorized')
        }
    }
}

let employee = new Employee()
employee.fullName = 'heshiyu' // 调用的是 set方法
if (employee.fullName) {
    alert(employee.fullName) // 调用的是 get方法
}
```

注意：只有`get`，没有`set`的存取器会自动被推断为`readonly`。

### 静态属性
**类的实例成员**：只有当类被实例化时才会被初始化的属性；

**类的静态成员**：存在于类本身上，而不是类的实例上（用`static`定义）

```ts
class Person {
    static discount = { min: 0.5, max: 0.8 }

    constructor(public isVip: boolean) { }

    calculateDiscountPrice(price: number) {
        return price * (this.isVip ? Person.discount.min : Person.discount.max)
        // 此处调用了类的静态属性discount
    }
}

let heshiyu = new Person(true)
let caozuoxiao = new Person(false)

console.log(heshiyu.calculateDiscountPrice(1000)) // 500
console.log(caozuoxiao.calculateDiscountPrice(1000)) // 800
```

### 抽象类
**抽象类** 是作为其他子类的父类来使用的，它们一般不会直接被实例化（即，不能传建一个抽象类的实例）。

`abstract` 关键字的用途：
 - 定义抽象类
 - 在抽象类内部定义抽象方法

 **抽象类** 和 **接口** 的区别：抽象类可以包含成员的实现细节。

 ```ts
 abstract class Animal {
     abstract makeSound(): void // 抽象类中的抽象方法，特点如下
     move(): void {
         console,log('roaming the earch...')
     }
 }
 ```
 抽象类中的抽象方法的特点：
  - 不包含具体实现
  - 必须在子类中实现
  - 必须包含`abstract`关键字 、并且 **可以包含** 访问修饰符
  - 定义方法签名，但不包含方法体（与接口方法类似）
  
  ```ts
  abstract class Department {
      constructor(public name: string) { }

      printName(): void {
          console.log('Department name: ' + this.name)
      }

      abstract printMeeting(): void // 此处为抽象方法，必须在子类中实现
  }

  class AccountingDepartment extends Department {
      constructor() {
          super('Accounting and Auditing') // 在子类的构造函数中必须调用super()
      }

      printMeeting(): void {
          console.log('The Accounting Department meets each Monday at 10am.')
      }

      generateReports(): void {
          console.log('Generating accounting reports...')
      }
  }

  let department: Department // 允许创建一个对抽象类型的引用。（正因如此，不允许调用那些 在声明的抽象类中不存在的方法，如最后一行）
  // department = new Department() // Error，不允许创建一个抽象类的实例
  department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
  department.printName() // Department name: Accounting and Auditing
  department.printMeeting() // 'The Accounting Department meets each Monday at 10am.'
  // department.generateReports() // error，方法在声明的抽象类中不存在。（因为department是对抽象类型的引用）
  ```