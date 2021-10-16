// 模块和模块间的依赖关系机制

// npm 
// nodeJS 的包管理不完全符合commonjs 规范
// 所以使用npm来进行包管理
// npm是包管理工具

// 包结构

// commonjs 的包规范
// 1. 文件夹 -> 包名
// 2. package.json -> 
// 3. bin -> 存放二进制文件的目录
// 4. lib -> 存放JavaScript文件的目录
// 5. doc -> 存放文档目录
// 6. test -> 存放单元测试的代码

// package.json: -> 本地的npm包的管理文件
// 根目录 和 每个包下面都有package.json
// 必须有的字段
// name -> 包名称
// version -> 版本号
// description -> 包描述
// keywords
// auhtor -> 作者
// maintainers: [] -> 包的维护者
// contributors: "" -> 社区贡献者
// bugs
// licenses : [] -> 许可证
// homepage : "" -> 主页
// os : ["linux", "windows", "macos", "vxworks", "freebsd", "aix"] -> 系统要求
// cpu : [] -> cpu 要求
// engine : [] -> 引擎要求 
// scripts :{} -> 脚本对象 -> npm run + scripts中的字段名就可以在命令行执行, run 命令会找node_modules文件夹下的bin文件夹
// main : "" -> 入口文件的地址
// _字段 : "" -> 非规范要求，自己定义

// 重点
// dependencies -> 依赖 -> 使用时需要的依赖必须

// devDependencies -> 生产依赖 -> 和包没有关系，放的是相应的工具，用来方便开发(比如打包)

// 版本号
// 1,2.0 -> 1: 大版本.小版本.次要版本
// 大版本
// 小版本
// 次要版本
// ">=2.0.0" -> 向上兼容
// "^2.1.3" -> 向上兼容且不可改变大版本号
// "~2.0.0" -> 大版本和小版本都不可变
// "<2.0.0" -> 向下兼容

//  =======================

// npm
// 官网：https://www.npmjs.com

// 不知道包名字的情况下怎么搜包

// npm 常用的命令
// npm -v(--version)
// npm run(run-script)
// npm -h(--help, -H, -?)
// npm -S(--save)
// npm init [-y]
// npm root -> npm当前安装安装路径
// npm root -g -> npm全局安装安装路径
// npm ls packagename
// npm info packagename 
// 所有- 或者 -- 开头的命令都是访问的config文件

// npm install
// npm install(i) packagename -g(--global)/-D(--save-dev)/-S(--save)
// -D : 安装信息放在 rootpath -> package.json -> devDependencies
// -s : 安装信息放在 rootpath -> package.json -> dependencies
// -g : 安装信息放在 rootpath -> package.json -> not sure

// 在另一台机器上安装配置相同的npm:
// 1. 只需要将package.json 文件复制到安装文件根目录
// 2. 执行 npm install 即可

// npm uninstall
// npm uninstall -D(--save-dev)/-S(--save)/-g(--global) packagename

// npm init [-y]
// -y : 忽略配置过程 -> 小项目或者配置少的项目使用

// npm 安装配置工具 n, nvm