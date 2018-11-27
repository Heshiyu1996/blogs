## Skill
> 平时做项目的时候经常会碰到一些零散的小技巧！虽然不成体系，也不知道收纳到哪里才好，也想记录下来，那就都先放在这里吧！

### 下载时自定义文件名（?download=）
需要下载的文件要自定义文件名，可以在url后面跟一个参数`?download=我要的名字.png`

 - 如果是中文，还要担心encode问题，可以使用 `encodeURIComponent` 来转码：
```js
`https://www.baidu.com/heshiyu.png?download=${encodeURIComponent('使用手册_七鱼一触即达.pptx')}`
```