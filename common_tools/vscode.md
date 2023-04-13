# about vscode

## vscode questions

### vscode terminal command

- vscode terminal command: code

### 设置自动保存
settings(ui) -> autosave 

### 新版vscode打开分栏的settings设置界面
- 左下角点击齿轮打开设置（setting）
- 搜索栏搜索 use split
- 在 Use Split JSON 上打上对勾
- 点击Ctrl+Shift+P，在弹框中输入setting，选择打开setting(JSON)


### 关闭输入时代码说明 

- vscode 左下角打开 setting -> 搜索 editor.quickSuggestions -> 将对应的项目的 value 改为 no
- 在 Keyboard Shortcuts 中设置 suggestions 的快捷键，默认为 ctrl + space

### 代码提示时上下移动被选的提示代码

- 设置 selectPrevSuggestion 的热键为 alt + p

- 设置 selectNextSuggestion 的热键为 alt + n

### 打开关闭Terminal窗口，与Editor窗口互换

- 设置 workbench.action.terminal.toggleTerminal -> alt + t

- 设置 View: Focus First Editor Group -> ctrl + 2

### vscode 必备插件
- Auto Close Tag (必备) 　　自动闭合HTML/XML标签
- Auto Rename Tag (必备) 　　自动完成另一侧标签的同步修改
- Beautify (必备) 格式化 html ,js,css
- Prettier 格式化JavaScript / TypeScript / CSS 
- Bracket Pair Colorizer (必备) 　　给括号加上不同的颜色，便于区分不同的区块，使用者可以定义不同括号类型和不同颜色 
- GitLens(使用git的必备) 　　方便查看git日志，git重度使用者必备
- HTML CSS Support (必备) 　　智能提示CSS类名以及id 
- HTML Snippets (必备) 　　智能提示HTML标签，以及标签含义
- JavaScript(ES6) code snippets (必备) 　　ES6语法智能提示，以及快速输入，不仅仅支持.js，还支持.ts，.jsx，.tsx，.html，.vue，省去了配置其支持各种包含js代码文件的时间
- open in browser (必备) 　　vscode不像IDE一样能够直接在浏览器中打开html，而该插件支持快捷键与鼠标右键快速在浏览器中打开html文件，支持自定义打开指定的浏览器，包括：Firefox，Chrome，Opera，IE以及Safari
- Path Intellisense (必备) 　　自动提示文件路径，支持各种快速引入文件
- React/Redux/react-router Snippets (推荐)(react必备) 　　React/Redux/react-router语法智能提示
- Vetur (推荐)(vue必备) 　　Vue多功能集成插件，包括：语法高亮，智能提示，emmet，错误提示，格式化，自动补全，debugger。vscode官方钦定Vue插件，Vue开发者必备。
-  Npm Intellisense(node必备) require 时的包提示
-  Live Server: 自动刷新页面的插件
-  remote-wsl: 链接wsl的插件

### vscode 推荐 plugins

- Debugger for Chrome (推荐) 　　映射vscode上的断点到chrome上，方便调试
- ESLint (推荐) 　　js语法纠错，可以自定义配置，不过配置较为复杂，建议使用网上一些广泛使用的eslint配置，日后我也会专门针对eslint配置写一篇文章。 
- jQuery Code Snippets (推荐) 　　jQuery代码智能提示
- Markdown Preview Enhanced (推荐) 　　实时预览markdown，markdown使用者必备
- markdownlint (推荐) 　　markdown语法纠错
- Material Icon Theme (推荐) 　　vscode图标主题，支持更换不同色系的图标，值得点出的是，该插件更新极其频繁，基本和vscode更新频率保持一致
- React-Native/React/Redux snippets for es6/es7 react代码片段，下载人数超多
- react-beautify 格式化 javascript, JSX, typescript, TSX 文件
- VueHelper vue代码片段
- Vue TypeScript Snippets vue的 typescript 代码片段
- Vue 2 Snippets vue 2代码片段
- Dracula Official (推荐) 　　很好看的一款主题风格
- filesize (了解) 　　查看文件大小
- HTMLHint(了解) 　　 静态检查规则 具体规则戳这
- Class autocomplete for HTML (推荐) 智能提示HTML class =“”属性（必备） 
- IntelliSense for CSS class names (推荐) 智能提示 css 的 class 名