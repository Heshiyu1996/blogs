# vm.$attrs
> vm.$attrs

## 定义
包含了父作用域中不作为`prop`被识别（且获取）的特性绑定（class和style除外）。也就是说，当一个组件内部没有声明任何`prop`时，这里会包含所有父作用域的绑定（class和style除外），并且再可以通过`v-bind="$attrs"`来传入给自己的内部组件——在创建高级别的组件时非常有用。

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
