# vue2 webpack

1. npm init -y
2. npm install webpack@4.44.2 -D -> 不选择 webpack5 是因为 5 才出，稳定性不确定
3. npm install webpack-cli@3.3.12 -D
4. npm install webpack-dev-server@3.11.2 -D
5. 连写 npm install webpack@4.44.2 webpack-cli@3.3.12 webpack-dev-server@3.11.2 -D

6 webpack 构建 vue2 时，还需要的支持

- vue-loader: ^16.2.0
- vue-template-compiler: ^2.6.14
- html-webpack-plugin: ^4.5.0

7. npm install vue-loader vue-template-compiler html-webpack-plugin@4.5.0 -D

8. 配置 webpack.config.js

```js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
  },
  externals: {
    vue: "Vue",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html"),
    }),
  ],
};
```

# vue 3 webpack

- @vue/compiler-sfc: ^3.1.2 替换 vue-template-compiler
- vue-loader@next 替换 vue-loader

1. npm install -D @vue/compiler-sfc
2. npm install vue-loader@next -D
3. webpack.config.js

```js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
  },
  externals: {
    vue: "Vue",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html"),
    }),
  ],
};
```
