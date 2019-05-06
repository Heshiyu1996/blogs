## Chrome插件开发经验
> 
> 更新时间： 2019-05-04

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
        "tabs"
    ],
    // background script，即插件运行的环境
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