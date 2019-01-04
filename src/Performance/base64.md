## Base64
> 最近听说对于存储图片有两种方式，一种是最常见的url，另一种是base64

**base64编码** 可以将 一张图片数据 编码成 一串字符串，这个字符串可以替代图像地址。
 - 每一张图片都有 **固定的base64编码**，所以不用上传到服务器

### 意义
最大好处：减少https请求

### 使用方法
```html
<img src="data:image/png; base64, R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP">

// css同理 
```

### 适用范围
1、图片足够小

2、复用性高，且基本不会被更新

3、无法被制作成css sprites

### 如何转为base64编码？
1、在线地址：
 http://www.pjhome.net/web/html5/encodeDataUrl.htm

2、在chrome直接拖入一张图片，F12，Source，点击图片即可