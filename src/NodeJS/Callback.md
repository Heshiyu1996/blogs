# 回调函数
> Node.js异步编程的直接体现就是：回调
>
> 更新时间：2019-01-24


### 什么是回调函数
回调函数：在完成任务后就会被调用，并且 **读取到的内容** 会作为 **回调函数的参数** 返回。

 - Node.js所有API都支持回调函数

#### 阻塞代码实例
有一个 input.txt，内容如下：
```
name: heshiyu
```
```js
var fs = require('fs')

var data = fs.readFileSync('input.txt')

console.log(data.toString())
console.log('执行结束！')
```
> node main.js
> 
> name: heshiyu
> 
> 执行结束

#### 非阻塞代码实例
```js
var fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) return err
    console.log(data.toString())
})

console.log('执行结束！')
```
> node main.js
> 
> 执行结束
> 
> name: heshiyu

