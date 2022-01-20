## 01 CJS,UMD,ESM和IIFE分别是什么意思

> CJS,UMD,ESM 和 IIFE 是JavaScript用来实现模块化的不同规则

### CJS

- CommonJS的简写，只能在NodeJS上运行CommonJS的简写，只能在 NodeJS 上运行，使用 require("module") 读取并加载模块。

- 缺点：不支持浏览器，执行后才能拿到依赖信息，由于用户可以动态 require，无法做到提前分析依赖以及Tree-Shaking 。

- CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

- 用法
```js
// 导出
module.exports = ...
exports = ...

// 导入
const/var/let varname = require('module');
```

### AMD

- Asynchronous Module Definition的缩写（代表异步模块定义），可以看作 CJS 的异步版本，制定了一套规则使模块可以被异步 require 进来并在回调函数里继续使用，然后 require.js 等前端库也可以利用这个规则加载代码了。

- 用法如下
```js
define(['jquery'], function ($) {
    // 方法
    function myFunc(){};

    // 暴露公共方法
        return myFunc;
});
```

- 定义的第一个部分是一个依赖数组，第二个部分是回调函数，只有当依赖的组件可用时（像RequireJS这样的脚本加载器会负责这一部分，包括找到文件路径）回调函数才被执行。

- 理想状态下，期望其依赖是异步加载的，通过在其中注入script，不阻塞浏览器的加载和渲染，但实际环境下，其表现的没有那么好，因此需要 amd 模块为一个单文件模块并与require.js 优化器配合来进行渲染。

### UMD

- Universal Module Definition的缩写（代表通用模块定义），同时兼容 CJS 和 AMD，并且支持直接在前端用 <script src="lib.umd.js"></script> 的方式加载。现在还在广泛使用，不过可能将被 ESM 和 IIFE 逐渐代替。

- 用法：
```js
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function($) {
    // 方法
    function myFunc() {};

    // 暴露公共方法
    return myFunc;
}));
```

### ESM

ECMAScript Module​的缩写，使用 import export 来管理依赖。由于它们只能写在所有表达式外面，所以打包器可以轻易做到分析依赖以及 Tree-Shaking。ESM 也支持动态加载（import ）。

浏览器直接通过 `<script type="module">` 即可使用该写法。

**注意：import的文件必须写明后缀名 -> import Vue from './vue.esm-browser.js'**

### IIFE

- Immediately Invoked Function Expression​的缩写（立即调用函数表达式），只是一种写法，可以隐藏一些局部变量，可以用来代替 UMD 作为纯粹给前端使用的写法。

### 总结

- 由于 ESM 具有简单的语法，异步特性和可摇树性，因此它是最好的模块化方案
- UMD 随处可见，通常在 ESM 不起作用的情况下用作备用
- CJS 是同步的，适合后端
- AMD 是异步的，适合前端
