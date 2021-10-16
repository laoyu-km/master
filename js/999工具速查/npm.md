# npm common commands and use tips
## How to see version

1,2.0 -> 1: 大版本.小版本.次要版本
大版本
小版本
次要版本
">=2.0.0" -> 向上兼容
"^2.1.3" -> 向上兼容且不可改变大版本号
"~2.0.0" -> 大版本和小版本都不可变
"<2.0.0" -> 向下兼容

=======================

## npm common commands

- offcial website：https://www.npmjs.com

- How to find a package when you don't know the name (不知道包名字的情况下怎么搜包)

- npm common commands
   - npm -v(--version)
   - npm run(run-script)
   - npm -h(--help, -H, -?)
   - npm -S(--save)
   - npm init [-y]
   - npm root -> npm 当前安装安装路径
   - npm root -g -> npm 全局安装安装路径
   - npm ls packagename  -> 查看当前已安装的package的版本号
   - npm info packagename

- The  begin with "-" or "--" commands is use to access "config" file （所有- 或者 -- 开头的命令都是访问的 config 文件）

- npm install
   ```bash
   npm install(i) packagename -g(--global)/-D(--save-dev)/-S(--save)
   -D : 安装信息放在 rootpath -> package.json -> devDependencies
   -s : 安装信息放在 rootpath -> package.json -> dependencies
   -g : 安装信息放在 rootpath -> package.json -> not sure
   ```

- 在另一台机器上安装配置相同的 npm:
   1. 只需要将 package.json 文件复制到安装文件根目录
   2. 执行 npm install 即可

- npm uninstall
```bash
npm uninstall -D(--save-dev)/-S(--save)/-g(--global) packagename
```

- npm init [-y]
"-y" : 忽略配置过程 -> 小项目或者配置少的项目使用

npm 安装配置工具 n, nvm


- 模块安装前查看有哪些版本 (nodemon 为例)
  `npm view nodemon versions`, version 后面一定要加 s, 否则 npm 最新版本

- 安装模块时需要注意安装信息，以保证所安装的模块符合当前版本使用


## how to change npm mirror source

1. npm mirror source link change

- global change: `npm config set registry http://registry.npm.taobao.org`

- view the status of the mirror source: `npm get registry` 

- chang global mirror source to offcial source
   ```js
    npm config set registry http://www.npmjs.org
   ```

2. temporary use taobao mirror source
```js
npm install packagename --save/--save-dev  --registry=https://registry.npm.taobao.org
```

3. use `nrm` switch mirror source
- install nrm: `npm install nrm -g`

- view mirror sources: `nrm ls`

- use mirror source: `nrm use tao`

   
