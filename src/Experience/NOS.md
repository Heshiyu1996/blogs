## NOS
> 在网易参与的三个项目中都有用到NOS，但也只是简单的会使用。今天刚好有时间，想系统化地整理一下有关NOS方面的只是
> 
> 更新时间： 2019-02-25

### 什么是NOS？
NOS（Netease Object Storage）是网易对象存储，它为用户提供基于互联网的数据存取服务。

#### 重要概念
 - 桶（Bucket）：NOS的对象容器，所有的对象（文件）必须放入桶中。
 - 对象（Key）：每个对象（文件）拥有桶内唯一的key，就像文件名。对象的存取接口通过 key 来操作。
> 桶名称NOS 全局唯一，桶内对象Key 唯一

### nos-js-sdk
NOS JS SDK 是用于浏览器端上传文件到nos的软件开发工具包，它提供了简单、便捷的方法，方便用户实现上传功能。

[nos-js-sdk](https://github.com/NetEase-Object-Storage/nos-javascript-sdk)

#### 前置条件
 - 开通NOS服务
 - 拥有一个有效的Access Key（用来生成上传凭证）

#### 支持功能
 - 客户端直传
 - 断点续传
 - 全国加速节点
 - 中断上传

#### 使用方法
