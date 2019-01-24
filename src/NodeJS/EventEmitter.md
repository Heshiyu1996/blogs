# EventEmitter
> Node.js所有的异步I/O操作都在完成时，会发送一个事件到事件队列
> 
> Node.js许多对象都会分发事件
> 
> 所有这些产生事件的对象，都是events.EventEmitter的实例
>
> 更新时间：2019-01-24


### EventEmitter 类
events模块只提供了一个对象：events.EventEmitter，它的核心就是 **事件触发 与 事件监听器 功能的封装**
```js
var events = require('events')

var eventEmitter = new events.EventEmitter() // 创建一个eventEmitter对象
```

EventEmitter的用法：
```js
var events = require('events')
var EventEmitter = events.EventEmitter
var event = new EventEmitter()
event.on('some_event', name => console.log('some_event事件触发', name))

setTimeout(() => event.emit('some_event', 'heshiyu'), 1000)
// event.emit('事件名', 'arg1 参数')
```
原理：event对象注册了 **“事件 some_event”** 的一个监听器，然后通过setTimeout **向 event对象发送事件“some_event”** ，最后就会 **调用some_event的监听器**。
 - 每个事件由 一个事件名 和 若干个参数 组成。
 - 当事件触发时，注册到这个事件的事件监听器被一次调用，事件参数 作为回调函数参数传递
 - 其实就是：“注册监听器 - 触发事件 - 调用监听器” 的这么一个过程

### 方法
#### 添加
 - addListener(event, listener)
    - 为指定事件添加一个监听器（在监听器数组的尾部）

 - on(event, listener)
    - 为指定事件注册一个监听器

 - once(event, listener)
    - 为指定事件注册一个单次监听器（触发后立即解除）

注意：

1、addListener和on没有区别（只是addListener方便移除监听器）

2、一个事件可以绑定多个回调函数
#### 移除
 - removeListener(event, 回调函数名称)
    - 为指定事件移除某个监听器
```js
server.removeListener('connection', callback) // callback是函数名称！
```
 - removeAllListeners([event])
    - 移除所有事件的所有监听器（如有指定事件，则移除指定事件的所有监听器）

#### 其他
 - setMaxListeners(n)
    - 设置监听器的最大数量（超出会输出警告信息）

### error事件
当error被触发时，如果没有相应的监听器，Node.js会把它当做异常，退出程序并输出错误信息。
> 一般要为触发error事件的对象设置监听器，来避免遇到错误后整个程序崩溃。

### 继承EventEmitter
大多数时候我们 **不会直接使用** EventEmitter，而是在对象中继承它（包括fs、net、http等）。只要是支持事件响应的核心模块，都是EventEmitter的子类

原因有两点：

1、出于语义化，事件的监听和发生，应该是一个对象的方法；

2、JavaScript的对象机制是属于原型的，支持部分多重继承，继承EventEmitter不会打乱对象原有的继承关系。