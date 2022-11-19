# webpack

## webpack 初识

- global install Node.js

- `npm init -y`

- `npm install webpack@4.44.2 webpack-cli@3.3.12 -D` 安装不使用全局安装

- 安装完成后，运行`npx webpack ./js/index.js`

  - 例子中的项目入口是 ./js/index.js -> 其他还有 Header.js Footer.js Content.js

  - 运行后在根目录下生成./dist/main.js, 这个文件就是打包后的文件

- webpack 是一个 module bundler (模块打包工具)

  - 支持的模块： js css png jpg 等等
  - 默认可打包 js 模块， 因为有默认配置
  - 其他类型模块需要进行配置

- webpack 配置文件 webpack.config.js

  - webpack.config.js 是默认的配置文件名
  - 如果配置文件名不是 webpack.config.js 在打包的时候要使用 --config 参数,如下
    `npx webpack --config ./webpack.dev.config.js`

- 在实际项目中打包命令并不是使用的 npx webpack,为什么

  因为在 package.json 中进行了配置, 然后使用 `npm run build`就可以了

  ```json
  "scripts": {
      "build": "webpack"
    },
  ```

- src 文件夹： 源代码，不是运行在浏览器上的代码

- dist 文件夹： 打包后的代码，运行在浏览器上的代码

## webpack 基础

## Loader

- webpack 使用 loader 来预处理文件
- 通过在 require() 语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用
- 要是用哪个 loader，就需要安装这个 loader，例如要使用 url-loader，style-loader,css-laoder, 就需要安装这三个 loader

```bash
npm install --save-dev url-loader style-loader css-loader
```

### file-loader

- 作用：以图片为例，将图片复制到 dist 文件夹中，并重命名为一串随机码(可以手动设置重命名)
- npm install file-loader --save-dev
- 配置文件 webpack.config.js 中

```js
 use: [
   {
     loader: 'file-loader',
     options: {
       name: '[name].[ext]', // webpack打包文件后使用原文件名
       outputPath: 'imgs/',
     },
   },
 ],
```

### url-loader

- url-loader 类似 file-loader
- url-lodader 会将文件转化成 base64 类型的代码，所以需要设置 limit
- 超过 limit 的文件会以引入文件的形式存在，多一次请求，但是 bundle.js 体积小
- 不超过 limit 的文件会被转化成 base64 代码，放在 bundle.js 中，bundle.js 体积变大，但是少一次请求

```js
module.exports = {
  mode: 'development', // 设置webpack的打包模式，默认是生产模式，代码压缩没有格式化，development是开发模式，打包后的代码会格式化
  entry: './src/index.js', // 入口文件
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]', // webpack打包文件后使用原文件名
              outputPath: 'imgs/',
              limit: 20480,
            },
          },
        ],
      },
    ],
  },
  output: {
    // 出口
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'), // 必须是绝对路径
  },
};
```

### style-loader css-loader sass-loader 链式调用

- loader 的链式调用： 链式调用就是让这个前一个 loader 的执行结果，在让当前 loader 使用，只是这个过程是<font color="red">**从后往前， 从下往上**</font>

```js
module.exports = {
  mode: 'development', // 设置webpack的打包模式，默认是生产模式，代码压缩没有格式，development是开发模式，打包后的代码会格式化
  entry: './src/index.js', // 入口文件
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              name: '[name].[ext]', // webpack打包文件后使用原文件名
              outputPath: 'imgs/',
              // limit: 20480,
            },
          },
        ],
      },
      {
        test: /\.scss$/, // sass 文件的编译
        // loader 链式调用写法1
        // loader 执行顺序： 从后往前， 从下往上
        use: ['style-loader', 'css-loader', 'sass-loader'], // 写法1
        // // 写法2
        // use: [
        //   {
        //     loader: 'style-loader',
        //   },
        //   {
        //     loader: 'css-loader',
        //   },
        //   {
        //     loader: 'sass-loader',
        //     options: {},
        //   },
        // ],
      },
    ],
  },
  output: {
    // 出口
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'), // 必须是绝对路径
  },
};
```

### postcss-loader

- postcss-loader 应该是 Webpack 配置中不可或缺的一个 CSS loader。它负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等。

- postcss-loader 不像 sass-loader, css-loader 是对文件进行编译，它是引入其他包对文件进行处理

- 安装

  ```bash
   # 如果要使用最新版本的话，你需要使用 webpack v5。如果使用 webpack v4 的话，你需要安装 postcss-loader v4。
   npm install --save-dev postcss-loader postcss
  ```

- postcss-loader 要放在 style-loader, css-laoder 之后，sass-laoder 或 less-loader 之前

- postcss-loader 要能够自动在 css 中添加浏览器前缀需要安装 autoprefixer

  ```bash
  npm install autoprefixer -d(--save-dev)
  ```

- 安装了 autoprefixer 后还需要设置 postcss.config.js 文件，来对 autoprefixer 进行引入

  ```js
  module.exports = {
    plugins: [require('autoprefixer')],
  };
  ```

- <font color="red">**特别注意：这里 postcss-loader 安装的版本是^4.0.4**</font>, 新版本使用会报错

- 安装后可能不会自动添加浏览器前缀，是因为识别了浏览器可以兼容所以不自动添加，这样需要修改 package.json 文件，添加浏览器说明如下

```json
{
  "browserslist": ["> 1%", "last 2 versions"]
}
```

<font color="red">**browserslist:作用非常简单，就是在你的项目中提供共享的浏览器支持信息。 比如我们项目构建的时候一般会用到 babel，postCss 等等，提供了对应的浏览器信息后，他们就会针对浏览器信息采取不同的编译策略。 **</font>

- 如果 src 中使用的是 sass 语法,且.scss 文件中使用了@import 引入了其他.scss 文件，可能会引起不能正确解析，这时需要设置 css-loader 的 importLoaders 值为 2

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 在新版本中已经自动设置了该属性，使用时需注意
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

- postcss-loader 的配置方法

```js
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
};
```

## webpack and loader 及其工具安装时的配置兼容性问题

1. 版本信息 nodejs 14时的安装信息
   - webpack: webpack@4.44.2
   
   - webpack-cli: webpack-cli@3.3.12
   
   - style-loader: style-loader@2.0.0
   
   - css-loader: css-loader@5.2.7
   
   - sass-loader: sass-loader@7.3.1
   
   - postcss-loader: postcss-loader@^4.0.4
   
   - node-sass: node-sass@4.14.1
   
     ---
   
2. 版本信息 nodejs 16 时的安装信息
    "devDependencies": {
    "autoprefixer": "^10.3.6",
    "css-loader": "^5.2.7",
    "file-loader": "^6.2.0",
    "postcss-loader": "^4.3.0",
    "sass-loader": "^10.4.1",
    "style-loader": "^2.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
    },
    "dependencies": {
    "sass": "^1.56.1"
    }


### node-sass 安装时提示错误的解决办法

> error: gyp ERR! stack Error : can‘t find python executable “python“,you can set the PYTHON env variable.

solution：

1. 在管理员模式下打开 vscode， 安装 windows-build-tools
   ```bash
   npm install --global --production windows-build-tools
   ```
2. 然后再安装 node-gyp
   ```bash
   npm install --global node-gyp
   ```
3. 再安装 node-sass

### webpack 编译.scss 文件时的配置

```js
module.exports = {
  mode: 'development', // 设置webpack的打包模式，默认是生产模式，代码压缩没有格式，development是开发模式，打包后的代码会格式化
  entry: './src/index.js', // 入口文件
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              name: '[name].[ext]', // webpack打包文件后使用原文件名
              outputPath: 'imgs/',
              // limit: 20480,
            },
          },
        ],
      },
      {
        test: /\.scss$/, // sass 文件的编译
        // loader 链式调用写法1
        // loader 执行顺序： 从后往前， 从下往上
        use: ['style-loader', 'css-loader', 'sass-loader'], // 写法1
        // // 写法2
        // use: [
        //   {
        //     loader: 'style-loader',
        //   },
        //   {
        //     loader: 'css-loader',
        //   },
        //   {
        //     loader: 'sass-loader',
        //     options: {},
        //   },
        // ],
      },
    ],
  },
  output: {
    // 出口
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'), // 必须是绝对路径
  },
};
```

## CSS 模块化 (CSS Modules)

- 是一种规范
- 必须配置 -> webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true, // css 模块化必须的设置
              //未设置时,app.scss类似全局css, 对createLogo()有效
              //设置后,app.scss需要手动指定，如果不指定，对img01 和 createLogo() 都无效
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

- css 模块化文件的写法

```html
<body>
  <div id="app"></div>
</body>
```

```scss
// 在使用scss时，不能是用.app或者#app来包裹，因为模块化会对.name 或者 #name 进行重命名，导致打包后类名不能对应上，css渲染不成功
// 外部可以包裹元素名称，一般使用body, 或者不使用元素包裹，如下所示
.container {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  background-color: pink;

  .logo {
    width: 100%;
    // height: 100%;
    border: 1px solid #333;
    border-radius: 50%;
    transform: rotate(-45deg);
  }
}

// 两个.logo都有效，一个是.container .logo, 一个是 .logo
.logo {
  width: 200px;
  border: 3px solid orange;
  border-radius: 10%;
  transform: rotate(45deg);
}
```

- css 模块化的使用方法

```js
//必须引入css模块
import styles from './css/app.scss';

// 使用css
import doudou from './images/doudou.jpg';
let img = new Image();
img.src = doudou;
img.className = `${styles.logo}`; // 引入方法1

let container = document.createElement('div');
container.className = styles.container; // 引入方法2
container.appendChild(img);
```

```js
// js模块中同样也需要引入, 才可以有css效果
import styles from './css/app.scss';
import doudou03 from './images/doudou03.jpg';

function createLogo() {
  let img03 = new Image();
  img03.src = doudou03;
  img03.className = `${styles.logo}`;

  let app = document.getElementById('app');
  app.appendChild(img03);
}

export default createLogo;
```

- 模块时，icon-yuanbao 这类className的处理

  ```js
  rules: [
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: {
              mode: 'local', // === modules: true
              // 当modules为true时处理 icon-yuanbao 这样的类名，将其转换为驼峰
              exportLocalsConvention: 'camelCase',
              //exportLocalsConvention: 'camelCaseOnly',
            },
          },
        },
        'postcss-loader',
        'sass-loader'
      ],
    }
  ],
  ```

## 图标的使用

- webpack5 中，图标达标不需要配置webpack.config.js, 直接打包就可以 或者如下

  ```js
   module: {
      rules: [
        ...
        {
          test: /\.ttf$/,
          type: 'asset/resource',
          generator: {
            filename: 'resources/[hash:10][ext][query]'
          }
        }
      ]
    },
  ```

  

- webpack4 中需要如下

  ```js
  rules: [
      {
          test: /\.(ttf|woff|woff2)$/,
          loader: 'file-loader', // 使用file-loader直接将字体文件传过去
      }
  ]
  ```

  

## Plugins

### HtmlWebpackPlugin: 自动生成index.html文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板文件
    }),
  ],
```



```bash
npm install --save-dev html-webpack-plugin
```

​      

### clean-webpack-plugin: 自动清空dist文件夹

```bash
npm install --save-dev clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板文件
    }),
    new CleanWebpackPlugin()
  ],
```

## 关于出口，入口文件的一些配置

### 多入口，多出口

```js
const { resolve } = require('path');
module.exports = {
  mode: 'production',
  entry: { // 多入口写法
    main: './src/app.js', 
    index: './src/app.js'
  },
  output: {// 出口文件名如果不写, 默认会按照入口文件的 key 来输入文件
    filename: '[name].js',  // [name] -> 直接使用入口文件的name 作为出口文件的name
    path: resolve(__dirname, 'dist');
  }
};
```

### 如果 js 文件引用的是其他链接的文件(比如 cdn)

```js
output: {
  publicPath: 'http://cdn.com.cn/',
  filename: '[name].js',
  path: resolve(__dirname, 'dist');
}
```
生成的html文件中的js引入语句就会改变为 <script src='http://cdn.com.cn/app.js'>;
