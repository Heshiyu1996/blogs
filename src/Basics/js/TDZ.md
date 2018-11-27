## 暂时性死区（TDZ）
> Temporal Dead Zone

let、const是块级作用域；var是函数作用域

 => 只要块级作用域存在let命令，它所声明的变量就“绑定”在这个区域，不再受外部影响
```js
var tmp = 123

if (true) {
    tmp = 'hsy' // ReferenceError
    let tmp
}
```
上面代码中，虽然在全局变量有声明tmp的值是123，但是在`let tmp`所处的块级作用域中，let又声明了一个同名的局部变量tmp，导致了后面的这个tmp绑定了这个块级作用域。所以在这个区域中，**只要是提前使用了tmp，就会报错**。

 => 总之，在代码块内，使用let声明变量之前，该变量都是不可用的。这就是**暂时性死区**（temporal dead zone，简称TDZ）