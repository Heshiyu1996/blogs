## setTimeout搭配var
### 使用setTimeout搭配var
快速地猜一下下面的代码会返回什么？
```js
for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i)
    }, 100 * i)
    console.log('inside')
}
console.log('outside')
```

结果：
```
inside (*10)
outside
10
10
10
10
10
10
10
10
10
10
```

原因：

1、`setTimeout` 会在若干毫秒的延时后，执行一个函数（前提是，等待`其他同步代码（包括for循环外面的同步代码）`执行完毕）

2、实际上都引用了相同作用域里的`同一个i`。（因为var声明它不在乎你声明了多少次，都只会得到1个）

### 改用let：
```js
for (let i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i)
    }, 100 * i)
}
```
结果：
```
inside (*10)
outside
0
1
2
3
4
5
6
7
8
9
```

原因：

`let`声明在循环里引入了一个新的变量环境，并且针对`每次迭代`都会创建这样一个新作用域