// ES6
// ECMAScript 的进化历史
// HTML 1， HTML2， HTML3 1991 - 1997 IETF(The Internet Engineering Task Force) 国际互联网工程任务组

// 1997.1 HTML3 .2 W3C - > IETF 解散

// ECMA ECMA - 262 ECMAScript 脚本语言规范

// 1995 LiveScript - > JAVASCRIPT
// 1996 javascript 1.0 1.1
// 1997 Jscript

// 1997.6 ECMAScript 1.0
// 1998.6 ECMAScript 2.0
// 1999.12 ECMASCRIPT 3.0
// 2000 ECMAscript 4.0 草案不通过： TC39(technical committe 39) 成员不通过(google, yahoo, 等等)

// 2007 ECMASCRIPT 4.0 准备发布， 不发布；
// 2008.7 ECMASCRIPT 3.1 - > ECMASCRIPT5(改名), ECMASCRIPT4 被分解成了 JAVASCRIPT.NEXT JAVASCRIPT.NEXT.NEXT 大会项目代号： HAMONY

// 2009.12 ECMA(正式发布), 决定javascript.next(放入草案) javascript.next.next(放入草案)

// 2011.6 ECMASCRIPT5 .1

// 2013.3 javascript.next(草案冻结)
// 2013.12 javascript.next (草案发布)

// 2015.6 ECMASCRIPT6 正式发布

// ES6以后每一年的6月份都出一个小更新的版本这些小本都输入ESMAScript6 ECMAScript2016 ECMAScript2017 ECMAScript2018

// ================================================================
// ES6 及以上编译为 ES5 的方法

// babel 实际工作中需要将ES6及以上编译为ES5

// 转义工具，将ES6及以上版本转义为ES5
// npm 包管理工具
// npm 与 node 相捆版，安装node也就安装了npm，应为运行node必须有npm

/**
 * 安装node
 * https://nodejs.org/zh-cn/
 * windows 下设置环境变量
 * mac下：https://brew.sh 下安装homebrew, 再homebrew下安装nodejs
 * 安装命令：brew install node
 * 检查安装是否成功：npm -v     node -v
 */

// npm 切换源
// 方法1: 使用淘宝源
// 临时使用: npm --registry https://registry.npm.taobao.org install node-red-contrib-composer@latest

// 全局配置切换到淘宝源: npm config set registry http://registry.npm.taobao.org/

// 全局配置切换到原本地址：npm config set registry https://registry.npmjs.org/

// 查看当前镜像地址：npm get registry https://registry.npmjs.org/


// 方法2：nrm
// nrm: nrm(npm registry manager )是npm的镜像源管理工具

// 安装nrm
//在命令行执行命令，npm install -g nrm，全局安装nrm。

// 使用nrm
// nrm ls : 查看可选的源
// nrm use taobao : 切换源
// nrm add registry http://registry.npm.frp.trmap.cn : 增加源
// nrm del <registry> : 删除源
// nrm test npm : 测试速度


// // 安装babel
// // https://www.babeljs.cn/
// // 在项目文件夹安装babel, 使用gitbash
// // 1. 进入项目文件夹，调用gitbash
// // 2. npm init //初始化项目文件，根据提示输入相应的配置
// // 3. 在babel官网中找到babel文档，查看preset，找到转码规则
// // 4. 新建.babelrc文件, json格式设置presets// babel配置文件
// {
//     "presets": []
// }
// // 5. 安装preset配置
// // (1) 安装babel-preset
// npm install babel-preset-env --save-dev //--save-dev 安装到当前文件夹, env 兼容所有版本
// npm i babel-preset-env --save-dev
// 安装好后在package.json中会多出
// "devDependencies": {
//    "babel-preset-env": "^1.7.0" //这个就是规则及
//  }

// //(2)将"babel-preset-env"复制到.babelrc文件中，如下
// "presets": ["babel-preset-env"]

// // (3) 安装babel脚手架(工具集) -> babel-cli
// npm install babel-cli --save-dev
// npm i babel-cli --save-dev // 2
// // 安装好后，在package.json中会添加babel-cli配置信息
// "devDependencies": {
//         "babel-cli": "^6.26.0",
//         "babel-preset-env": "^1.7.0"
//     }
// // (4) 安装好后babel-cli后需要配置babel的build信息，该信息在package.json文件的script属性中添加
// "scripts": {
//         "test": "echo \"Error: no test specified\" && exit 1",
//         "build": "babel demo.js -o bundle.js"
//         "build": "babel demo.js -out-file bundle.js" // 命令全写
//     },
// (5) 在 git-bash 运行 npm run build

// // (6) 文件夹 转 文件夹 -> 在重新配置package.json的script属性, 然后再运行npm run build. 配置如下
//  "scripts": {
//         "test": "echo \"Error: no test specified\" && exit 1",
//         "文件": "转文件 -> 多加一个中文说明属性，是json的一种注释方法",
//         "build-stop": "babel demo.js -o bundle.js",
//         "目录": "转目录",
//         "build": "babel src -d lib "
//     },

// // (7) 运行文件 -> 需要先配置package.json的script属性，添加script-name属性, 然后再git-bash运行 npm run script-name. 配置如下
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "文件": "转文件",
//     "build-stop": "babel demo.js -o bundle.js",
//     "目录": "转目录",
//     "build-stop": "babel src -d lib ",
//     "文件": "转目录",
//     "build": "babel ./*.js -d lib",
//     "script-name": "babel-node ./src/demo.js"
// },

// // (8) 使用node 命令来执行方法:
// node ./src/node.js

// 注意项：由于babel环境是安装再项目文件夹，不是再操作系统全局，所以babel命令的实际执行需要使用npm来执行或者直接使用node命令来执行。安装再全局环境是不建议的

// 注意项: .babelrc(rc=run command), 是babel运行前需要加载的文件，里面配置了Babel运行时所需要的配置项

// ================================================================

// babel-register
// node 后续运行时所需要 require 进来的扩展名为 .es6、.es、.jsx、 .mjs 和 .js 的文件将由 Babel 自动转换。
// // 安装
// npm install @babel/core @babel/register --save-dev
// // 用法
// requestAnimationFrame("@babel/register");

//=========================================

// babel-core
// 让js文件中的某一段代码进行转码

//=========================================

// 在线转义，babel首页就可以进行在线转码

//=========================================

// 再页面中引入babel html支持
{
    /* <div id="output"></div>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- Your custom script here -->
    <script type="text/babel">
    const getMessage = () => "Hello World";
    document.getElementById('output').innerHTML = getMessage();
    </script> */
}

// ================================================================

// // Traceur 转码器，也是将ES6 及以上版本代码转换为ES5 代码
// <body>
//     <div id="output"></div>
//     <script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
//     <script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
//     <script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>

//     <script type="module">
//         const getMessage = () => "Hello Jayden"; document.getElementById('output').innerHTML = getMessage();
//     </script>
// </body>

// Traceur 本地引入 -> bootstrap.js 和 traceur.js 引入两个文件

//=========================================

// // chrome 浏览器达到90%以上的支持, 可以直接编译
// const getMessage = () => "Hello Jayden";
// document.getElementById('output').innerHTML = getMessage();

//=========================================

// 查看node对ES的支持情况： https://node.green