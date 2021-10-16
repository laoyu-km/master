# Vue Devtools

## 扩展程序安装

## 手动编译安装

```bash
git clone https://github.com/vuejs/vue-devtools

cd vuedevtools

npm install

// 安装完毕后进行编译打包
npm run build

// 编译后生成chrome文件夹，此文件夹就是用来放入chrome的扩展程序。
```

# vite & cdn

- vue 在测试时需要一个开发时服务器，vite 充当了这个角色

1. npm init -y
2. npm add vite -D
3. package.json
4. 具体代码看 01vite-cdn

## vite&cdn main.js 的几种写法

```js
//vue2 01
const App = {
  data() {
    return {
      text: "foxxx",
    };
  },
  template: `
                    <div>
                        <div>{{ text }}</div>
                        <button @click="change">change</button>
                    </div>
                  `,
  methods: {
    change() {
      this.text = "white";
    },
  },
};

new Vue({
  render: (h) => h(App),
}).$mount("#app");

//vue2 02
const App = {
  el: "#app",
  data() {
    return {
      name: "jayden",
    };
  },
  template: `
           <div>
            <div>{{ name }}</div>
            <button @click="change">change</button>
           </div>
        `,
  methods: {
    change() {
      this.name = this.name === "jayden" ? "alexis" : "jayden";
    },
  },
};

new Vue(App);

// Vue3 01
const { createApp, ref } = Vue;

const App = {
  template: `
            <div>
                <h2>{{ name }}</h2>
                <button @click="change">change</button>
            </div>
        `,
  setup() {
    const name = ref("elle");

    const change = () => {
      name.value = name.value === "jayden" ? "alexis" : "jayden";
    };

    return {
      name,
      change,
    };
  },
};

createApp(App).mount("#app");

// vue3 02
const { createApp } = Vue;

const App = {
  data() {
    return {
      text: "jayden",
    };
  },
  template: `
                   <h1>{{ text }}</h1>
                   <button @click="change">change</button>
                  `,
  methods: {
    change: function () {
      this.text = this.text === "jayden" ? "alexis" : "jayden";
    },
  },
};

createApp(App).mount("#app");
```

# vite

- 只能开发 vue3

```sh
$ npm init vite <project-name> -- --template vue
$ cd <project-name>
$ npm install
$ npm run dev
```

# 脚手架 cli 建议使用

```sh
npm install -g @vue/cli

vue create vue-vue-cli
```

- Manually select features
- vue 3.x
- Sass/SCSS (with dart-sass)

## cli 中使用 cdn 减小体积

- 在 /public/index.html 中引入 vue.global.js
- 在 main.js 中 { createApp} = Vue
- 使用 cdn 后不能正确显示报错
  - resolveComponent can only be used in render() or setup().
  - Invalid VNode type: Symbol(Fragment) (symbol) at <App>
- 设置了 vue.config.js 的 configureWebpack -> externals -> vue: 'Vue' 后就可以使用，不知道为什么

```js
module.exports = {
    configureWebpack: {
        externals: {
            vue: 'Vue'
        }
    }
```

## vue-cli webpack

- 使用 webpack 模板： vue init webpack projectname(不能用大写)
- 查看 npm 不需要 run 就可以运行的命令 -> npm ddd 回车就可以看到有哪些命令可以省略 run
