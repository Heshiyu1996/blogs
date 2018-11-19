# SourceMap
> SourceMap

## 目前状况
JavaScript脚本变得越来越复杂，大部分源码（尤其是各种函数库、框架）都要经过转换，才能投入生产环境。

## 为什么源码要转换？
 * 减小体积
 * 多个文件合并，减少HTTP请求数
 * 方便其他语言编译成JavaScript

综上，都会使得 **实际运行的代码** 和 **开发代码** 不一样，debug变得困难重重。

## 什么是SourceMap？
SourceMap是一个信息文件，里面记录着位置信息（即，转换后的代码的每一个位置，所对应的转换前的位置）

有了它，出错的时候，debug工具就直接显示 **开发代码** ，而不是转换后的代码，给开发者带来了极大的方便！

## SourceMap的格式
```js
{
   version: 3, // SourceMap的版本
   file: "out.js", // 转换后的文件名
   sourceRoot: "", // 转换前的文件所在目录
   sources: ["foo.js", "bar.js"], // 转换前的文件，数组表示可能存在多个文件合并
   names: ["src", "maps", "are", "fun"], // 转换前的所有变量名和属性名
   mappings: "AAgBC, SAAQ, CAAEA" // 记录位置信息的字符串
}
```

## 运用 && 实践
在vue-cli 3.0的vue.config.js文件中，有个选项“productionSourceMap”
```js
module.exports = {
   productionSourceMap: false // 生产环境是否生成sourceMap文件
}
```

原文地址：
[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)