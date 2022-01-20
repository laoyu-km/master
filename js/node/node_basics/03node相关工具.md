# node相关工具

## 常用的包

### node 进程管理工具

- supervisor

- nodemon

- forever

- pm2 重点

### underscore

### lodash

### gulp

### log4js

```js
const log4js = require('log4js');

log4js.configure({
  appenders: { log: { type: 'file', filename: 'info.log' } },
  categories: { default: { appenders: ['log'], level: 'ALL' } },
});

const logger = log4js.getLogger('log');

module.exports = logger;
```

## 1. nvm

- NVM：Node Version Manager

### nvm 的安装

#### install in linux (Ubuntu20.04) || MacOS

- install

```bash
# install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

- attempts to add the source lines from the snippet below to the correct profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- wsl 下，执安装命令后，在~/.bashrc文件下已经添加了export语句。

- 在wsl或者linux下，要让nvm命令有效，需要执行`source ~/.bashrc`

#### question about Ubuntu install nvm can't 

- 描述：

```bash
# 安装命令
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# error:  curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

- 原因办法

    从以上错误可以发现，脚本需要到 raw.githubusercontent.com 上拉取代码。

    网上搜索了一下，发现是 github 的一些域名的 DNS 解析被污染，导致DNS 解析过程无法通过域名取得正确的IP地址。

- 解决办法

   1. 打开 https://www.ipaddress.com/ 输入访问不了的域名
   
   2. 查询之后可以获得正确的 IP 地址
   
   3. 在本机的 hosts 文件中添加以下语句, on Ubuntu20.04 modify /etc/hosts
   
   ```bash
   199.232.68.133 raw.githubusercontent.com
   199.232.68.133 user-images.githubusercontent.com
   199.232.68.133 avatars2.githubusercontent.com
   199.232.68.133 avatars1.githubusercontent.com
   ```


#### install in windows

waiting...


### nvm 命令

- nvm --help

- nvm list -> 当前已安装的nodejs 版本

- nvm ls-remote -> 列出nodejs的所有版本

- nvm install 8.0.0                     Install a specific version number

- nvm use 8.0                           Use the latest available 8.0.x release

- nvm run 6.10.3 app.js                 Run app.js using node 6.10.3

- nvm exec 4.8.3 node app.js            Run `node app.js` with the PATH pointing to node 4.8.3

- nvm alias default 8.1.0               Set default node version on a shell

- nvm alias default node                Always default to the latest available node version on a shell

- nvm install node                      Install the latest available version

- nvm use node                          Use the latest version

- nvm install --lts                     Install the latest LTS version

- nvm use --lts                         Use the latest LTS version

- nvm set-colors cgYmW                   Set text colors to cyan, green, bold yellow, magenta, and white

- nvm uninstall <version>                     Uninstall a version
- nvm uninstall --lts                         Uninstall using automatic LTS (long-term support) alias `lts/*`, if availab


## npm

- npm -> node package manageer

- 官网：https://www.npmjs.com

- 不知道包名字的情况下怎么搜包




### 全局安装包的目录

#### Ubuntu20.04

-  通过/home/username/.nvm/versions/node/各版本/bin进行查找

- 查找后得到的实际目录是/home/username/.nvm/sersions/node/各版本/lib/node_modules/

#### windows10

- C:\Users\你的用户名\AppData\Roaming\npm\node_modules

### npm commands

> 所有- 或者 -- 开头的命令都是访问的config文件

- npm -v(--version)

- npm run(run-script)

- npm -h(--help, -H, -?)

- npm -S(--save)

- npm init [-y] : 忽略配置过程 -> 小项目或者配置少的项目使用

- npm root -> npm当前安装安装路径

- npm root -g -> npm全局安装安装路径

- npm info packagename -> package infomation

- npm view packagename versions: 查看package的所有版本号

- npm outdated -> 查看过期包

- npm list : 列出包关系 = npm ls
```bash
npm list
npm list | grep underscore
npm list | grep glup
```

- npm clear cache --force -> 清楚缓存

- npm install(i) packagename -g(--global)/-D(--save-dev)/-S(--save)
   -D : 安装信息放在 rootpath -> package.json -> devDependencies
   -s : 安装信息放在 rootpath -> package.json -> dependencies
   -g : 安装信息放在 rootpath -> package.json -> not sure

- npm uninstall -D(--save-dev)/-S(--save)/-g(--global) packagename

- 在另一台机器上安装配置相同的npm:
   1. 只需要将package.json 文件复制到安装文件根目录
   2. 执行 npm install 即可


#### 重点字段
- dependencies -> 生产环境依赖 -> 生产使用时需要的依赖必须

- devDependencies -> 开发环境依赖 -> 开发环境依赖->和生产没有关系，放的是相应的工具，用来方便开发(比如打包)

- 如何只安装生产环境依赖包，不安装开发环境依赖包
   - 场景，将项目发送给其他人员查看时，他们只需要查看项目即可，不需要查看开发环境
   - 办法： npm install --production

### 上传自己的包

#### 自己定义包

1. 先创建package.json -> 项目下 npm init -y

2. 正常开发，设置入口文件 

#### 上传包

1. 在npm官网注册账号

2. 在命令行使用命令 npm adduser 登陆

3. 发布直接在自己创建的包项目根目录下运行npm publish

<font color="red">**自定义包并且上传时必须将源切换回[npm官方源](https://registry.npmjs.org)**</font>


### npm 切换源

#### 查看和设置源

1. npm config get registry -> https://registry.npmjs.org

2. npm config set registry https://registry.npm.taobao.org

#### use nrm to change source

- nrm: node registry manager

1. npm install nrm -g

2. ln -s /usr/software/nodejs/bin/nrm   /usr/local/bin/
 
3. nrm ls -> 列出可用下载地址列表

4. nrm use 下载源名称 ->  切换npm下载源

####  npm 不按装nrm直接使用淘宝镜像

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### NPM 脚本

- 就是package.json 中的scripts字段

#### 脚本的使用
```json
"script": {
    "dev": "./node_modules/.bin/gulp -v" // 
}
```

- 最简单的npm脚本
```json
"script": {
    "jiandan": "echo Jayden" // npm run jiandan 来运行
}
```

- 同时运行两个js
```json
"script": {
    "first": "node ./first.js",
    "second": "node ./second/index.js"
}
```

   - 并行运行：如果是并行执行（即同时的平行执行），可以使用 & 符号 
   ```bash
   npm run first & second
   ```
   
   - 继发运行： 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 && 符号。
   
   ```bash
   npm run first && second
   ```

#### 脚本的简写

- 使用 npm -h 看到的命令都可以简写

- 简写就是运行命令的时候不用加run

```bash
npm run first #非简写
npm start # jianxie
npm test  # jianxie
```

#### 脚本变量

- npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

- 首先，通过 npm_package_ 前缀，npm 脚本可以拿到 package.json 里面的字段。比如，下面是一个 package.json。

> 注意：一定要在 npm 脚本中运行（如：npm run view）才可以，直接在命令行中运行JS（如：node view.js）是拿不到值的

```json
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

- 那么，变量 npm_package_name 返回 foo，变量 npm_package_version 返回 1.2.5。
```js

// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
// 我们通过环境变量 process.env 对象，拿到 package.json 的字段值。如果是 Bash 脚本，可以用$npm_package_name 和 $npm_package_version 取到这两个值。
```

#### npmpackage前缀也支持嵌套的package.json字段。

```json
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```

- 上面代码中，repository 字段的 type 属性，可以通过 npm_package_repository_type 取到。

- 下面是另外一个例子。

```json
"scripts": {
  "install": "foo.js"
}
```
    上面代码中，npm_package_scripts_install 变量的值等于 foo.js。

    然后，npm 脚本还可以通过 npmconfig 前缀，拿到 npm 的配置变量，即 npm config get xxx 命令返回的值。比如，当前模块的发行标签，可以通过 npm_config_tag 取到。
```json
"view": "echo $npm_config_tag",
```

注意，package.json 里面的 config 对象，可以被环境变量覆盖。

```json
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```
    上面代码中，npm_package_config_port 变量返回的是 8080。这个值可以用下面的方法覆盖。

```json
$ npm config set foo:port 80
```

-最后，env命令可以列出所有环境变量。

"env": "env"

### npm pm 安装 git 上发布的包

```bash
# 这样适合安装公司内部的git服务器上的项目
npm install git+https://git@github.com:lurongtao/gp-project.git

# 或者以ssh的方式
npm install git+ssh://git@github.com:lurongtao/gp-project.git
```

###  cross-env 使用

#### cross-env是什么

- 运行跨平台设置和使用环境变量的脚本

#### 出现原因
- 当您使用 NODE_ENV=production, 来设置环境变量时，大多数 Windows 命令提示将会阻塞(报错)。（异常是Windows上的Bash，它使用本机Bash。）换言之，Windows 不支持 NODE_ENV=production 的设置方式。

#### 解决

- cross-env 使得您可以使用单个命令，而不必担心为平台正确设置或使用环境变量。这个迷你的包(cross-env)能够提供一个设置环境变量的 scripts，让你能够以 Unix 方式设置环境变量，然后在 Windows 上也能兼容运行。

#### 安装
```bash
npm install --save-dev cross-env
```

#### 使用
```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

- NODE_ENV环境变量将由 cross-env 设置 打印 process.env.NODE_ENV === 'production'


### package.json 

> 本地的npm包的管理文件

- 根目录 和 每个包下面都有package.json


#### 必须有的字段

- name -> 包名称

- version -> 版本号

- description -> 包描述

- keywords

- auhtor -> 作者

- maintainers: [] -> 包的维护者

- contributors: "" -> 社区贡献者

- bugs

- licenses : [] -> 许可证

- homepage : "" -> 主页

- os : ["linux", "windows", "macos", "vxworks", "freebsd", "aix"] -> 系统要求

- cpu : [] -> cpu 要求

- engine : [] -> 引擎要求 

- scripts :{} -> 脚本对象 -> npm run + scripts中的字段名就可以在命令行执行, run 命令会找node_modules文件夹下的bin文件夹

- main : "" -> 入口文件的地址

- _字段 : "" -> 非规范要求，自己定义

## NPX: npm package extention

- npm 从5.2版开始，增加了 npx 命令。它有很多用处，本文介绍该命令的主要使用场景。

- Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下。

```bash
$ npm install -g npx
```


### 调用项目安装的模块
- npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了Mocha。

```bash
$ npm install -D mocha
```
一般来说，调用 Mocha ，只能在项目脚本和 package.json 的scripts字段里面，如果想在命令行下调用，必须像下面这样。

```bash
# 项目的根目录下执行
$ node-modules/.bin/mocha --version
```

- npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了。

```bash
$ npx mocha --version
```

- npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。

```bash
# 等同于 ls
$ npx ls
```

- 注意，Bash 内置的命令不在$PATH里面，所以不能用。比如，cd是 Bash 命令，因此就不能用npx cd。

### 避免全局安装模块

- 除了调用项目内部模块，npx 还能避免全局安装的模块。比如，create-react-app 这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

```bash
$ npx create-react-app my-react-app
```

- 上面代码运行时，npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app。

- 注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

```bash
$ npx http-server
```

### --no-install 参数和 --ignore-existing 参数

- 如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install参数。如果本地不存在该模块，就会报错。

```bash
$ npx --no-install http-server
```

- 反过来，如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing参数。比如，本地已经安装了http-server，但还是想使用远程模块，就用这个参数。

```bash
$ npx --ignore-existing http-server
```



## 版本号

> 版本号主要搭配update命令使用 -> npm update

- 1,2.0 -> 1: 大版本.小版本.次要版本


- "^2.1.3" -> 向上兼容且不可改变大版本号

- "~2.0.0" -> 大版本和小版本都不可变

- "*" -> 表示最新版本

- ">=2.0.0" -> 向上兼容

- "<2.0.0" -> 向下兼容


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

// package.json: -> 

//  =======================


