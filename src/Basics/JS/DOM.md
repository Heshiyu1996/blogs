## DOM
> 原生JS DOM操作方法

### 创建节点（由document）
 - document.createElement(tagname)
    - 创建一个由tagName决定的HTML元素
 - document.createTextNode(data)
    - 创建一个由data决定的文本节点
 - document.createDocumentFragment()
    - 创建一个空白的文档片段

### 操作节点
 - Node.appendChild()
    - 加入到指定节点的子节点列表末尾
 - Node.insertBefore(newElement, referenceElement)
    - 加入到指定节点的子节点（referenceElement作为参考节点）的前面；若referenceElement为空，则最后（和appendChild一样）
 - Node.removeChild()
    - 将某个节点，从指定节点的子节点列表中移除
 - Node.replaceChild(newElement, oldElement)
    - 用指定节点（newElement），替换掉当前节点的一个旧子节点（oldElement）
    - newElement在替换后，他`原来的位置会从DOM中删除`

### 选择节点
 - document.querySelector()
 - document.querySelectorAll()
 - document.getElementById()
 - document.getElementsByTagName()
 - document.getElementsByClassName()
 - document.getElementsByName()

### 操作属性
 - element.setAttribute()
 - element.getAttribute()
 - element.removeAttribute()
 - element.hasAttribute()

### DOM事件
 - element.addEventListener()
 - element.removeEventListener()
 - element.createEvent()
 - element.dispatchEvent()

### 通过节点关系获取节点
 - parentNode
 - childNodes
 - children
 - nextSibling
 - previousSibling
 - firstChild
 - lastChild

注意：
 - `NodeList`不是`array`，它只是只读的，反映的是文档节点的实时结构
 - `parentNode`和`parentElement`区别：前者是W3C标准，且`node`是`element`的超集
    - Node（节点）的类型有很多：元素（Element）、属性（Attr）、文本（Text）……