## vue 各版本介绍

1. cjs（两个版本都是完整版，包含编译器）

   - vue.cjs.js
   
   - vue.cjs.prod.js（开发版，代码进行了压缩）

2. global（这四个版本都可以在浏览器中直接通过scripts标签导入，导入之后会增加一个全局的Vue对象）

   - vue.global.js（完整版，包含编译器和运行时）

   - vue.global.prod.js（完整版，包含编译器和运行时，这是开发版本，代码进行了压缩）

   - vue.runtime.global.js

   - vue.runtime.global.prod.js

3. browser（四个版本都包含esm，浏览器的原生模块化方式，可以直接通过`<script type="module" />`的方式来导入模块）

   - vue.esm-browser.js

   - vue.esm-browser.prod.js

   - vue.runtime.esm-browser.js

   - vue.runtime.esm-browser.prod.js

4. bundler（这两个版本没有打包所有的代码，只会打包使用的代码，需要配合打包工具来使用，会让Vue体积更小）

   - vue.esm-bundler.js

   - bue.runtime.esm-bundler.js

