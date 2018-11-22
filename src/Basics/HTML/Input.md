# Input 
> input

## 文件上传(type=file)
```html
<input ref="nodeFile" type="file" name="file" @change="changeFile($event)" />

checkFile(ev) {
    let file = ev.tartget.files[0]
    if(!file) return
}
```
问题：每次上传文件时，都会将文件存放在ev.target.value中。导致当第二次选择文件时，由于两次ev.target.value相同，而不会触发change事件

解决方案：在input绑定的change事件中，在最后将ev.target.value置空，例如：
```js
ev.target.value = null
```