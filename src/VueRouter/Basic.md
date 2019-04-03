# Vue Router的基本使用方法

## new VueRouter()
### HTML方面
通过`router-link`组件（配置`to`属性）进行导航
```html
<!-- 使用router-link组件来导航 -->
<router-link to="/foo">Go to FOO</router-link>

<!-- 路由出口 -->
<router-view></router-view>
```

### JavaScript方面
```js
import Vue from 'vue'
import VueRouter from 'VueRouter'

Vue.use(VueRouter) // 通过Vue.use注册插件

// ② 创建router实例
const router = new VueRouter({
    // ① 定义路由（通过VueRouter的实例选项routes）
    // 【路径优先级】若同路径，则最先定义匹配的组件，优先级最高
    // 【路由命名】可以通过name属性给某个路由设置名称，可以利用它进行router.push({ name: 'foo' })
    routes: [{
        path: '/',
        name: main,
        redirect: '/foo' // 重定向。访问'/'，会重定向到'/foo'，也可以通过传入{ name: 'foo'}的方式
    }, {
        path: '/foo',
        name: foo,
        alias: '/trueFoo', // 别名。访问'/trueFoo'，URL显示的是/trueFoo，但效果和访问/foo一样
        component: Foo
    }, {
        path: '/bar',
        name: bar,
        component: Bar
    }]
})

// ③ 创建和挂载根实例
new Vue({
    // Vue的实例选项router
    router
}).$mount('#app')
```
一旦注入了路由器`router`，就可以在任何组件里：
 - 通过`this.$router`访问路由器
 - 通过`this.$route`访问当前路由

## 动态路由
### 使用方式
在`vue-router`的路由路径中使用`动态路径参数`
```js
const router = new VueRouter({
    routes: [{
        path: '/user/:id', // 动态路径参数 以冒号:开头
        component: User
    }]
})
```
这样的效果是`/user/heshiyu`和`/user/caozuoxiao`都将映射到相同的路由。同时参数值（`id`）也会被设置到`this.$route.params.id`上

### 组件复用
由上面例子可知，`/user/heshiyu`和`/user/caozuoxiao`渲染的都是同个组件，（如果本身在该组件的`id为heshiyu`时，直接切换`id为caozuoxiao`）那`这个组件实例会被复用`（**组件的生命周期钩子不会再被调用**）。
> 当然，如果你是切换回其他组件，再切换回来那就是正常的组件销毁了

解决方法：
 - 利用`watch`，**监听路由的参数变化**
```js
// User.vue
export default {
    watch: {
        '$route'(to, from) {
            // 响应（例如重新拉取详情）
        }
    }
}
```
 - 利用`导航守卫beforeRouteUpdate`，**监听路由更新**
```js
export default {
    beforeRouteUpdate(to, from, next) {
        next() // 记得最后要执行next()才能成功跳转
    }
}
```

## 捕获404 Not found路由
匹配任意路径：`*`
```js
routes = [{
    path: '*'
}, {
    path: '/user-*' //这个可以匹配'/user-admin'、'/user-heshiyu'
}]
```
对于下方的`/user-*`的匹配部分，可以通过`this.$route.params.pathMatch`获得

## 嵌套路由
（待补……）

## 编程式的导航
### router.push()
效仿`window.history.pushState`

| 声明式 | 编程式 |
| - | - |
| `<router-link to="/Foo">` | `router.push('/Foo')` |

对于`router.push()`的参数：
```js
 //字符串
    router.push('home')

 //对象
    router.push({ path: 'home' })

 //命名的路由
    router.push({ name: 'user', params: { userId: '123' } })

 //带查询参数(`/register?plan=private`)
    router.push({ path: 'register', query: { plan: 'private' } })
```
注意（**“二P”要不得**）：
 - `path`搭配`query`
 - `name`搭配`params`

### router.replace()
效仿`window.history.replaceState`

和`router.push`很像，但不会向`history`添加新纪录，后退不回去。
| 声明式 | 编程式 |
| - | - |
| `<router-link to="/Foo" replace>` | `router.replace('/Foo')` |

### router.go()
效仿`window.history.go`

这个方法的参数是一个整数，意思是在`history`记录中 **前进** 或 **后退** n步

无论是`router.push()`、`router.replace()`和`router.go()`在**不同的路由模式**（`history`、`hash`、`abstract`）下表现都是一样的

## 一些其他功能