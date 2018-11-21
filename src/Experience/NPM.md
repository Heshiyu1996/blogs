# NPM
> npm

## 修改全局模块的安装路径
之前遇到的问题：想把shell从bash换成zsh（有炫酷的UI以及其他优点【待补充】），后来发现npm全局安装的包居然用命令行执行不起来，显示：`zsh: command not found: xxx`

解决方法：

1、新建另外一个存放全局包的文件夹（因为考虑到npm默认的全局安装文件夹可能在MAC上会出现权限问题）
```
mkdir ~/.npm-global
```

2、设置npm的安装目录
```
npm config set prefix '~/.npm-global'
```

3、进入~/.zshrc，并加入
```
export PATH=~/.npm-global/bin:$PATH
```

4、使环境变量生效
```
source ~/.profile
```

综上，`npm install -g`安装的模块就会到该用户名字下面的`~/.npm-global`目录了，还有一个好处是做到了用户隔离。