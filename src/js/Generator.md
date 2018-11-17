# Generator
> generator

## 定义
### 生成器 (Generator)
Generator（生成器）是由一个generator function返回的，并且它符合**可迭代协议**和**迭代器协议**。

也就是说，**生成器 === 一个 能够返回迭代器 的函数**。

### 迭代器 (Iterator)
其中，迭代器就是专门用于迭代的对象，并且每个迭代的对象都有一个next方法，这个方法会返回一个对象:
```js
{
    value: 2, // 当前值
    done: true // 表示当前迭代器是否迭代完成
}
```
也就是说，**迭代器 ==== 一个 带有next函数 的对象**

## Generator 的实现（用ES5）
```js
function makeIterator(array) {
    var index = 0;

    return {
        next: function() {
            var done = index >= array.length;
            return {
                value : done ? array[index++] : undefined,
                done: done
            }
        }
    }
}

var iterator = makeIterator([2, 5, 7]); 
// iterator是迭代器；makeIterator是生成器

iterator.next() // {value: 2, done: false}
iterator.next() // {value: 5, done: false}
iterator.next() // {value: 7, done: false}
iterator.next() // {value: undefined, done: true}
```

## Generator 的实现（用ES6）
ES6引入了generator，可以使用轻松地创建迭代器。

```js
function* createIterator() {
    yield 1
    yield 2
    yield 3
}

var iterator2 = createIterator()
// iterator2是迭代器；createIterator是生成器；

iterator2.next() // {value: 1, done: false}
iterator2.next() // {value: 2, done: false}
iterator2.next() // {value: 3, done: false}
```

上面的例子是在生成器里面写yield，那如果要传入特定的数组呢？
```js
// 这样改写生成器，调用时传入特定的参数就行了
function* createIterator2(array) {
    // 遍历只能用for
    for(let i=0; i < array.length; i++) {
        yield array[i]
    }
}

var iterator3 = createIterator2([2, 5, 7])
```

## yield的特点
 * 用来说明next函数返回的value
 * 每个yield调用后，后面的代码都会停止执行
 * yield不能穿透函数，也就是说，不能用forEach遍历来声明yield（改用for）
