# WebAssembly
> webAssembly

## 目前状况
WebAssembly在2017年受到主流浏览器的支持，并发布了MVP版本（Minimum Viable Product，最简可行产品），单并非最终版本。

## MVP版本的特点（4个基本技能要求）
 * 编译
    
    能够将许多不同的语言编译成WebAssembly

 * 快速执行

   编译成WebAssembly后的应用能够快速执行

 * 压缩
    
    为了加速载入速度

 * 线性内存分配

    和JavaScript使用内存的方式有区别，它能够直接管理使用的内存

## 未来WebAssembly的“新技能”
包括：多线程、隐式HTTP缓存、64位寻址、分层编译器等等；

一旦以上功能全部就位，WebAssembly就可以和JavaScript互操作了，包括JS和WebAssembly之间的快速调用、简单的数据交换、ES模块集成、工具链集成和向后兼容性。


目前WebAssembly还不支持高阶的语言功能，包括垃圾回收、异常处理、调试一级尾调用（Tail calls）。