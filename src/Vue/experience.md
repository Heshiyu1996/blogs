# Vue.js的最佳实践
> Vue.js的最佳实践

## 定义
写Vue时间也不短了。入职后也更是学到很多优秀的代码，打算开一篇文章记录下来，经常看看，也希望能够融会贯通，以后遇到可以想到。

 ------
## 运用 && 实践
假设有一个父组件`u-input-parent.vue`引用了`u-input.vue`
```js
// u-input-parent.vue
<template>
    <div class="u-input-parent">
        <u-input :disabled="true" no-show="noShow" maxLength="18" />
    </div>
</template>
```

```js
// u-input.vue
<template>
    <div class="u-input">
        <input v-bind="$attrs" :disabled="disabled" />
        <textarea v-bind="attrs" />
    </div>
</template>

<script>
export default {
    props: {
        // 这里接收了disabled、noShow
        disabled: { type: Boolean, default: false },
        noShow: { type: String, default: ''},
    }
}
</srcipt>
```
那么最后的`u-input.vue`里的`input`标签是这样的：
```html
<input maxLength="18" disabled="disabled" / >
// 对于maxLength，是通过$attrs传过来的
// 对于disabled，是通过prop传过来的，就不属于$attrs里了
// 对于noShow，也是通过prop传过来的，就不属于$attrs里了，只是这里它没有运用到标签上
```
