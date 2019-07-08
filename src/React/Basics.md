# React-基础知识

### 建立页面
在浏览器中使用React，需要引用两种类库：React、ReactDOM。
 - 前者用来创建视图；
 - ReactDOM包含在浏览器中渲染React元素必需的工具。

### 虚拟DOM
整个WEB应用程序可以只使用一个页面，并且依靠JavaScript更新用户界面。

在一个单页应用中，浏览器初始化时会载入一个HTML文档。虽然用户也可以进行网站页面导航访问，但是他们实际上仍然停留在相同的页面上。JavaScript会根据用户的交互操作销毁或者创建一个新的用户界面，使得用户感觉自己从一个页面上跳转到另一个页面，实际上用户仍然在相同的HTML页面。

虚拟DOM是由React元素组成的，实际上是一个JavaScript对象。React通过DOM API为用户尽可能高效地渲染这些变更。

### React元素
React元素是表示：应该如何创建浏览器DOM的一组指令。

通过`React.createElement`创建React元素。
```js
React.createElement(类型, 特性, 子节点)
// 参数一：元素类型：{ String | React组件 }
// 参数二：元素特性：{ Object }，（1、被当做属性添加到标签中；2、可以通过this.props读取）
// 参数三：元素的子节点：{ React元素 [, React元素...] | Array }（会被插入到 开闭标签 之间）

// 若子节点不止一个，可以有第4、第5...个参数；又或者是第3个参数是[]
```
```js
React.createElement("h1", 
    { id: "myH1", title: "myTitle" },
    "myChildren"
)
```
会渲染成实际的DOM元素：
```html
<h1 id="myH1" title="myTitle">myChildren</h1>
<!-- 注意：根元素会有data-reactroot这个属性 -->
```

`React元素的实际内容`：
```js
{
    $$typeof: Symbol(React.element),
    "type": "h1",
    "key": null,
    "ref": null,
    "props": { "id": "myH1", "title": "myTitle", "children": "myChildren" }, // 这props包含特性、子元素
    "_owner": null,
    "_store": {}
}
```

### ReactDOM
通过`ReactDOM.render`渲染一个React元素：
```js
ReactDOM.render(React元素, 挂载点)
```
```js
var dish = React.createElement("h1", 
    { id: "myH1", title: "myTitle" },
    "myChildren"
)
ReactDOM.render(dish, document.getElementById('react-container'))
```
总结：
 
 React.createElement()
 
 -> React元素

 -> ReactDOM.render

 > React中所有和DOM渲染有关的功能都移动到了ReactDOM中，因为也可以使用React来构造原生的移动应用，而浏览器只是React其中一个运行环境。

### React组件
通过`React.createClass`创建一个组件：
```js
const Component1 = React.createClass({
    displayName: '组件名字',
    render() {
        return React.createElement('ul', { 'className': 'parent-container' },
            React.createElement('li', null, "No 1"),
            React.createElement('li', null, "No 2"),
            React.createElement('li', null, "No 3")
        )
    }
})
```
随后，`组件Component1`可作`元素类型`使用：
```js
const list = React.createElement(Component1, null, null) // 此处list是一个React元素

ReactDOM.render(
    list，
    document.getElementById('react-container')
)
```

可以通过`this`关键字来访问组件实例：
```js
const Component1 = React.createClass({
    displayName: '组件名字',
    render() {
        return React.createElement('ul', { 'className': 'parent-container' }, 
            this.props.items.map((item, i) => 
                React.createElement('li', { key: i }, item))
        )
        // this.props表示 这个组件实例 的props属性（即React.createElement的第2个参数props特性）
    }
})
const list = React.createElement(Component1, { items: ['No 1', 'No 2'] }, null)

ReactDOM.render(
    list,
    document.getElementById('react-container')
)
```

![alt](./img/img-1.png)

### React.Component
除了`React.createClass`外，`React.Component`也可以创建新的React组件。

优点：
 - 兼容ES6
 - 支持继承

使用`React.Component`：
```js
class Component1 extends React.Component {
    // 里面的写法和React.createClass的一样（移除displayName）
    render() {
        return React.createElement('ul', { 'className': 'parent-container' }, null)
    }
}
```

### 无状态函数式组件
`无状态函数式组件`是个函数，而不是对象。

用法：
```js
// 属性参数结构（将 属性作用域 直接限定在 函数内部）
const Component1 = ({ items }) =>
    React.createElement('ul', { className: 'parent-container' },
        items.map((item, i) =>
            React.createElement('li', { key: i }, item)
        )
    )
```

### 有关渲染
`ReactDOM.render`可以保留当前DOM，适时更新需要更新的DOM元素，来达到更新UI的目的。

每次修改State后，都必须依赖`ReactDOM.render`高效地完成UI重绘的工作。

### 工厂类
#### 使用工厂类创建React元素
```js
React.DOM.h1(null, "myChild")

React.DOM.ul(
    { "className": "parent-container" }, // props特性
    React.DOM.li(null, "No 1"), // 子元素1
    React.DOM.li(null, "No 2"), // 子元素2
    React.DOM.li(null, "No 3") // 子元素3
)
```

#### 使用工厂类创建React组件
一般需要配合**无状态函数式组件**
```js
const { render } = ReactDOM

// 无状态函数式组件
const Component1 = ({ items }) =>
    React.createElement('ul', { className: 'parent-container' },
        items.map((item, i) =>
            React.createElement('li', { key: i }, item)
        )
    )

const Func1 = React.createFactory(Component1)

const items = ['No 1', 'No 2']

render(
    Func1({ items }),
    document.getElementById('react-container')
)
```
> 如果你曾经在React里使用过JSX，那么也许永远也不会使用工厂类了。

### JSX
创建React元素的方法：
 - React.createElement
 - 工厂类
 - JSX

```js
// React Element
React.createElement(Component1, { items: ['No 1', 'No 2'] }, null)

// 等价于
// JAX
<Component1 items={['No 1', 'No 2']} />
```

### JSX小技巧

#### 组件嵌套
JSX支持嵌套：
```js
<Component1>
    <child1 />
    <child2 />
    <child3 />
</Component1>
```

#### className
`class`是JavaScript的保留字，改用`className`
```js
<h1 className="title-wrapper">Title</h1>
```

#### JavaScript表达式
JavaScript用花括号括起，其中声明的变量会**进行求值，并返回结果**。

```js
// 要使用JS代码，记得{ }括起
<ul>
    {
        this.props.items.map((item, i) =>
            <li key={i}> {item} </li>
        )
    }
</ul>
```

JSX无法被浏览器解析，必须（通过*Babel*）转换成*createElement或者工厂类*，这个过程叫做：`转译`。

### Babel
#### 直接引入babel-core
转译时机：*在浏览器执行这些源代码前，进行转译*

 - 在HTML引入一个babel-core
 - 将脚本代码块的类型设置为`text/babel`
 ```js
 <script type="text/babel"></script>
 ```

#### 和webpack搭配
转译时机：提前对JS文件进行静态转译

（后续讲解...）

### Babel的presets模块
常用的：
 - babel-preset-env
    - 对属于ES2015、ES2016和ES2017规范的内容进行转译（包含了：babel-preset-es2015、babel-preset-es2016、babel-preset-es2017三个模块的功能）
 - babel-preset-react
    - 将JSX格式转译成React.createElement调用。

### 事件处理函数的绑定方式
class方法默认不会绑定this，所以一般绑定`onClick`事件处理函数时，注意绑定`this`，否则会为undefined

解决方法：
 - Class fields（定义方法为箭头函数）
```jsx
handleClick = () => {
    console.log('this', this)
}

<button onClick={this.handleClick} />
```
第一种方式的缺点：不能带参数；且类似antd组件库，他的一些内置方法（onCancel）有内置参数的要注意

  - 箭头函数（调用方法为箭头函数）
```jsx
handleClick(e) {
    console.log(console.log(e))
}
<button onClick={(e) => this.handleClick(e)} />
```
第二种方式的缺点：若将该回调函数通过props传入子组件可能会使得子组件重新渲染。

第二种方式的好处：可以传递参数
```jsx
<button onClick={(e) => this.this.handle(id, e)} />
```
 - 在constructor里显式bind
```jsx
constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
}
```

### React里的key
#### 何时加key
一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。

#### key全局唯一吗？
不是全局唯一的，同一个数组里面唯一就行


#### 子组件可以通过props读取的key吗
不可以，key是传给React的

### React中的反向传递
组件B是组件A的子组件：
```jsx
// A
class A extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentName: 'A'
        }
    }
    // ③ 父组件接收到参数，进行setState
    handleChangeInParent = parentName => {
        this.setState({ parentName })
    }

    render() {
        return (
            <div>
                {/* ①父组件将 能够触发state改变的回调函数（callback）传递给子组件 */}
                <B callback={this.handleChangeInParent}></B>
            </div>
        )
    }
}
```

```jsx
// B
class B extends React.Component {
    handleChangeInChild = e => {
        e.preventDefault()
        //② 子组件调用 父组件传过来的回调函数，并传实参
        this.props.callback(this.refs.todo.value.toString())
    }

    render() {
        return (
            <input type="text" ref="todo" />
            <button onClick={this.handleChangeInChild}></button>
        )
    }
}
```

### 在React里使用hot-loader
webpack-dev-server是热加载，指的是保存后，刷新整个页面；

react-hot-loader是热加载，同时也支持局部更新（需依赖HotModuleReplacement热加载插件）

1、安装`react-hot-loader`
```
npm install --save-dev react-hot-loader
```

2、将webpack.config.js中的devServer的hot设为true
```js
devServer: {
    hot: true
}
```

3、在`.babelrc`里添加plugin
```json
{
    "presets": ["es2015", "react"],
    "plugins": ["react-hot-loader/babel"]
}
```

4、在`webpack.config.js`的plugins里添加依赖的`HotModuleReplacement`插件
```js

plugins: [
    new webpack.HotModuleReplacementPlugin() //设置这里
]
```

5、在项目主入口`main.js`添加代码
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Greeter from './greeter';
import "./main.css";
import { AppContainer } from 'react-hot-loader'; //设置这里
 
const render = (App) => {
	ReactDOM.render(
		<AppContainer>
			<App />
		</AppContainer>,
	document.getElementById('root')
	)
}
 
render(Greeter)
 
// Hot Module Replacement API 
if (module.hot) {
    module.hot.accept('./greeter', () => {
        render(require('./greeter').default)
    })
}
```