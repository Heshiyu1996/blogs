# Webpack4
> Webpack4

## webpack 4.0 的新特性
### mode 属性
通过mode，可以设置打包环境，可以是development 或 production
```js
"scripts": {
   "dev": "webpack --mode development",
   "build": "webpack --mode production"
}
```
#### 设置为“development”时，webpack提供以下特性：

1、浏览器调试工具

2、注释、开发阶段的详细错误日志和提示

3、快速和优化的增量构建机制

#### 设置为“production”时，webpack提供以下特性：

1、开启所有的优化代码

2、更小的bundle体积

3、去除掉只在开发阶段运行的代码

4、Scope hoisting和Tree-shaking

### 开箱即用WebAssembly
WebAssembly会带来运行时性能的大幅度提升，webpack4对它做了开箱即用的支持。

也就是说，可以对本地的wasm模块进行直接的import或者export操作，也可以通过编写loaders来直接import C++

### 0CJS
0CJS的含义是0配置，webpack4尽可能地让开发者运行项目的成本变得更低。webpack4不再强制需要webpack.config.js作为 **打包的入口配置文件**，它默认的入口为'./src/'和默认出口'./dist'，这对小项目来说很方便。

当项目里包含'./src/index.js'文件的时候，执行webpack命令，webpack就会将该文件作为项目的入口文件进行打包配置。

### 新的插件系统

webpack4最大的突破就是有了 **新的插件系统**。
#### 旧的插件系统：

1、Performance（定义上）

2、Typings（类型上）

3、异步

4、循环钩子和执行顺序

5、检查和分析

6、继承的方式（旧的需要`extend Tapable`，然后去用它的功能）

#### 新的API：

1、所有的hooks都存放到`hooks`这个对象里，作为扩展来的属性

2、有多个`Hook类`：`sync/async normal/bailing/waterfall/looping`，他们都是取决于钩子的类型

3、当注册多个hooks的时候，可以通过新建一个 **新的Hook对象**，然后每个hook作为这个对象的属性来注册，例：`this.hooks = { myHook: new SyncHook(...), myHook2: new SyncHook(...) }`

4、每一个hook都有一定数量的参数（带名字）

5、当新增插件时，**必须** 提供名字

6、当新增插件时，可以选择插件的类型（sync/callback/promise）：`.tap`、`.tapAsync`、`tapPromise`

7、当新增插件时，你可以提供执行顺序，比如`before`、`stage`

8、当调用插件时，你可以选择 **异步的类型**：.call（对于异步的hooks）、.callAsync（带有回调参数的hooks）、.callPromise（返回一个promise的hooks）
