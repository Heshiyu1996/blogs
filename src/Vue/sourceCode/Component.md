# Data Driven
> Vue.js的另一个核心思想：组件化
> 
> 更新时间： 2019-04-11

## 什么是组件化
`组件化`就是把页面拆分成多个组件，每个组件依赖的CSS、JavaScript、模板、图片等放在一起开发、维护（即**资源独立**）。

特点：**可复用、也可嵌套**

## 普通VNode、组件VNode
在`vm._render()`时（将实例渲染成VNode），执行`createElement`会涉及到**children规范化**、**VNode创建**。那么在**VNode创建**时，会判断`tag`：
 - String：当成`普通VNode的目的`去渲染
 - 非String：当成`组件VNode的目的`去渲染

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
})

// ① 此时tag是一个组件（App）
```
```js
vnode = createComponent(Ctor, data, context, children, tag)
// ② 直接通过createComponent来创建vnode
```

## createComponent
`src/core/vdom/create-component.js`
```js
function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
    // ...
}
```
主要3件事：
 - 构造子类构造函数`Sub`
 - 安装组件钩子函数
 - 实例化VNode

#### 构造子类构造函数Sub
目的：对`Sub`这构造函数做了缓存，避免多次执行`Vue.extend`的时候对同一个子组件重复构造。

```js
Ctor = baseCtor.extend(Ctor) // 相当于Vue.extend(Ctor)，返回一个实例构造器
```

对于`App.vue`，导出的是一个`实例选项对象`
```js
export default {
    // ...实例选项
}
```
此时，新的`Ctor`就是

#### 安装组件钩子函数
```js
// install component management hooks onto the placeholder node
installComponentHooks(data)
```

`componentVNodeHooks`是个对象，里面有各种钩子函数：**init、prepatch、insert和destroy**，

`installComponentHooks`的过程，就是把`componentVNodeHooks`的钩子函数合并到`data.hook`里，然后在VNode执行`patch`过程中执行相关的钩子函数。

#### 实例化VNode
```js
const name = Ctor.options.name || tag
const vnode = new VNode(
  `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
  data, undefined, undefined, undefined, context,
  { Ctor, propsData, listeners, tag, children },
  asyncFactory
)

return vnode

// 可见，组件VNode是没有children的
```

无论是`普通VNode`，还是`组件VNode`，它们都会走到`vm._update`方法，然后执行`patch`函数。