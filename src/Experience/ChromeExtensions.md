## Chrome插件开发经验
> 
> 更新时间： 2019-05-04

### todoList
 - pageAction使得图标无法实现真正变灰

### pageAction和browserAction
谷歌对插件按钮的显示做了改版（48）。在新的设计下，对Page Action进行hide不会像以前那样将图标真的隐藏，而转为变灰表示其不可用。

好处：即使插件不用Browser Action和Page Action，也会在Toolbar上显示灰色的图标已表示其被安装使用着。这样可以更明显的提醒用户在浏览器上现在都有哪些插件，来防止恶意插件被用户忽略。

### Chrome插件的作用
 - 捕捉特定网页的内容
 - 捕捉HTTP报文
 - 捕捉用户浏览动作
 - 改变浏览器地址栏/起始页/书签/Tab等界面元素的行为
 - 与别的站点通信
 - 修改网页内容

### Chrome插件的缺点
 - 让浏览器变得缓慢、不稳定

### manifest.json
```json
{
    "manifest_version": 2, // 固定
    "name": "hehsiyu", // 插件名称
    "version": "1.0", // 插件版本
    "description": "The first extension.", // 插件描述
    "browser_action": {
        "default_icon": "icon.png", // 图表图片
        "default_title": "Hello", // 图标title
        "default_popup": "popup.html" // 单击图标会执行的文件
    },
    // 允许插件访问的url
    "permissions": [
        "http://*/",
        "tabs",
        "storage" // 如果需要通过popup页面保存数据，可以通过通信将数据交给后台页面处理；或者通过chrome.storage保存到用户的硬盘上。
    ],
    // background script，即插件运行的环境。
    // 因为popup页面在关闭后，就相当于用户关闭了相应的标签页，这个页面再次打开时，所有DOM和JS空间变量都将被重新创建。所以需要扩展实时处理数据，而不是在用户打开时才运行
    "background": {
        "page": "background.html",
        // "scripts": ["js/jquery-1.9.1.min.js","js/background.js"]//数组.chrome会在扩展启动时自动创建一个包含所有指定脚本的页面
    },
    // 对页面内容进行操作的脚本
    "content_scripts": [{
        "matches": ["http://*/*", "https://*/*"],
        "js": ["js/jquery-1.9.1.min.js", "js/js.js"],
        "run_at": "document_start" // 在document加载时执行该脚本
    }]
}
```
注意：不允许扩展中的HTML页面里`内嵌JS`，而是都用`外部JS引入`

### chrome的Cookie API
要使用Cookie API，需要在manifest.json文件中生命权限和相应的域
```json
permissions: ['*://*/', "cookies"]
```
以上代表所有域。

Chrome里定义的Cookie包含如下属性：
 - name
 - value
 - domain
 - hostOnly（是否只允许完全匹配domain的请求访问）
 - path
 - secure
 - httpOnly（是否禁止客户端调用）
 - session（是否为session Cookie）
 - expirationDate（过期时间）
 - storeId（包含此Cookie的Cookie Store的id）

#### 读取Cookie
读取Cookie有两种方法：`get`、`getAll`
 - get可以获取符合条件的1个Cookie，
 ```js
    chrome.cookies.get({ url: 'myUrl', name: 'myName' }, cookie => {
        console.log(cookie.value)
    })
    // 第一个参数：搜索条件（url、name必填）
    // 回调里返回的只是一个cookie对象
 ```

 - getAll可以获取所有符合条件的Cookie
 ```js
    chrome.cookies.getAll({ url: 'myUrl' }, cookies => {
        console.log(cookies, 'cookies')
        // 第一个参数：搜索条件（可以按url、name、domain、path搜索；不指定则返回所有Cookie）
        // [{}, {}, {}...]
        // 回调里返回的是个cookies对象数组
    })

 ```

#### 设置Cookie
通过set来设置Cookie
```js
chrome.cookies.set({
    url: 'myUrl', // 必填，其他都是选填
    name: 'myName',
    value: 'myValue'
}, cookie => {
    console.log(cookie)
})
// 还有其他字段可以写，例如secure、httpOnly、expirationDate
```

#### 删除Cookie
通过remove来删除Cookie
```js
chrome.cookies.remove({
    url: 'myUrl',
    name: 'myName'
}, cookie => {
    console.log(cookie) // 这就是那个被删除的cookie
})
```