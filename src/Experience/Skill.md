## Skill
> 平时做项目的时候经常会碰到一些零散的小技巧！虽然不成体系，也不知道收纳到哪里才好，也想记录下来，那就都先放在这里吧！

### Vue.filter的返回值可以当做方法来用
![alt](./img/skill-1.png)

### const和map
有时候const定义常量时，需要status对应的text的话可以这样写：
```js
const TRAIN_STATUS = {
    NEW: '0',
    SUCCESS: '1',
    FAILED: '2'
}

const MAP_TRAIN_STATUS_TXT = {
    [TRAIN_STATUS.NEW]: '未训练',
    [TRAIN_STATUS.SUCCESS]: '训练成功',
    [TRAIN_STATUS.FAILED]: '训练失败',
}
```

### Vue里的v-for数组和对象
v-for ... in里对于数组和对象遍历的是不一样的
```js
// array
<div v-for="(item, index) in array"></div>

// obj
<div v-for="(val, key, index) in object"></div>
```

### Vue的data()实例选项
data实例选项里的字段只能用作初始化，而且这个初始化只能初始化静态的内容
```js
// parent.vue
<child :startTime="searchParam.startTime"></child>

data() {
    return {
        searchParam: {
            startTime: '2010-11-11'
        }
    }
},
methods: {
    // 拉取接口后，searchParam.startTime变成了'2012-12-12'
}


```

```js
// child.vue
props: [
    startTime: { type: String }
],
data() {
    return {
        // 1、startTime变化时，这里earliestDay能不能收到??答案：收不到，只是初始化
        // 2、而且，这个初始化只能是收到'2010-11-11'
        earliestDay: this.startTime
    }
}
```

### 下载时自定义文件名（?download=）
需要下载的文件要自定义文件名，可以在url后面跟一个参数`?download=我要的名字.png`

 - 如果是中文，还要担心encode问题，可以使用 `encodeURIComponent` 来转码：
```js
`https://www.baidu.com/heshiyu.png?download=${encodeURIComponent('麦当劳.png')}`
```

### package.json中的^和~
#### ~
    "vue": "~2.5.17"
    // 意思是[2.5.17, 2.6.0)

#### ^
    "jquery": "^3.3.1",
    // 意思是[3.3.1, 4.0.0)


