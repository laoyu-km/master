# ESlint 使用流程
1. 安装ESLlint库(在项目本地或全局安装，看具体项目需要)
2. 创建.eslintrc配置文件(手动创建或者复制其它已有配置文件均可，看具体项目需求)
3. 根据文档设置完，保存文件时即可进行eslint修复(MacOS：快捷键是 command + s )


# 安装
1. ESlint 也可以不安装插件，而是直接进行npm安装
```bash
npm install eslint
npm install -g eslint
```

2. 在项目文件夹根目录上创建 .eslintrc 配置文件
```bash
# 使用VScode命令
Create ESLint configuration

# ESlint 如果是全局安装
eslint --init

# ESlint 本地安装
./node_module/.bin/eslint --init  # windows
./node_module/.bin/eslint --initLinux # Mac
```

