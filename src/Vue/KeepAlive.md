# KeepAlive
> 做小功科技的时候就用过KeepAlive，当时是缓存组件的状态觉得挺新颖，但是一直没有写成文字记录下来
> 
> 更新时间：2019-01-30

我是导航条：
[KeepAlive是什么？](#KeepAlive是什么？) -> [执行规则](#执行规则) -> [利用router保留滚动条位置](#利用router保留滚动条位置) 
### KeepAlive是什么？
```html
<keep-alive>
    <router-view></router-view>
</keep-alive>
```
用`<keep-alive>`包裹动态组件时，它会缓存不活动的组件实例。

因此它只会执行一次`created`、`mounted`（即数据不会进行相应刷新，除非手动触发），且在`跳转到下一个keepAlive之前`，才会执行beforedestroy


### 执行规则
 - 首次执行该keep-alive组件
    - 进入：beforeCreate -> created -> beforeMount -> mounted -> activated
    - 离开：deactivated

 - 第二次执行该keep-alive组件
    - 进入：activated
    - 离开：deactivated

 - 没有keep-alive的组件([Vue实例生命周期](#Vue实例生命周期))
    - 进入：beforeCreate -> created -> beforeMount -> mounted
    - 离开：beforeDestroy -> destroyed

### 利用router保留滚动条位置
有时候会有需求：从 **列表** 跳转到 **详情** ，再从 **详情** 跳回来，需要回到 **跳转前滚动条的位置**。

解决思路：

1、使用全局前置守卫`router.beforeEach`在导航切换前，记录**scrollTop**

2、使用vue-router里的`scrollBehavior`方法（设置回退位置）


#### router.beforeEach
router.beforeEach是 **全局前置守卫**，当一个导航触发时，它按照创建顺序调用。
> 守卫是异步解析执行，此时导航在所有守卫 resolve 之前一直处于 `等待中`
```js
router.beforeEach((to, from, next) => {
    // 若离开的页面keepAlive为true，则记录scrollTop
    if (from.name && from.meta.keepAlive) {
        let contentElem = document.querySelector('tbody')
        let scrollTop = contentElem ? contentElem.scrollTop : '0'
        sessionStorage.setItem(from.name, scrollTop)
    }
    next()
})
```
每个守卫方法接收三个参数：
 - to `{Object}`
    - 即将要进入的路由对象
 - from `{Object}`
    - 当前导航正要离开的路由对象
 - next `{Function}`
    - next(): 进行管道中的下一个钩子。（若全部钩子执行完，那导航就是 `confirmed` 的）
    - next(false): 中断当前的导航（不跳转）。（URL地址会重置到 `from` 路由对象对应的地址）
    - next('/): 中断当前的导航，然后进行一个新的导航
    
> 确保最后要调用 next 方法，否则钩子就不会被 resolved。

#### scrollBehavior

`scrollBehavior`是实例化VueRouter时，传入的一个实例选项，它接受一个函数：
```js
new VueRouter({
    scrollBehavior: function(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
    // 也可以写成：
    // scrollBehavior(to, from, savedPosition) {
    //     return savedPosition || { x: 0, y: 0 }
    // }
})
```
其中 `savedPosition` 可以用来判断：是否进行了浏览器原生表现中的 **后退/前进**
 - 是，则会返回 `{ x: 0, y: 0 }`
 - 否，则会返回 `null`

所以可以这样写，设置一个异步任务，在执行了浏览器的 **后退/前进** 后，马上设置滚动条的scrollTop值：
```js
new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition && to.meta.keepAlive) {
            // 从sessionStorage里取出这个页面的scrollTop
            let scrollTop = sessionStorage.getItem(to.name) || 0
            if (!scrollTop) return
            // 对scroll元素进行设置
            setTimeout(() => {
                let documentElem = document.querySelector('tbody')
                documentElem && (documentElem.scrollTop = scrollTop)
            }, 0)
        }
    },
})
```

### Vue实例生命周期
![alt](./img/keepAlive-1.png)

### 参考链接
[用 vue-route 的 beforeEach 实现导航守卫（路由跳转前验证登录）](https://blog.csdn.net/latency_cheng/article/details/78580161)

[Vue scrollBehavior 滚动行为](https://www.cnblogs.com/sophie_wang/p/7880261.html)