# windows 使用问题

## windows 键位对照表

|按键|编码| 
|:---:|:---:|
|Escape |01 00|
|Tab|0F 00|
|Caps Lock|3A 00|
|Left Shift|2A 00|
|Left Ctrl|1D 00|
|Left Windows|5B E0|
|Left Alt|38 00|
|Space|39 00|
|Right Alt|38 E0|
|Right Windows|5C E0|
|Right Ctrl|1D E0|
|Right Shift|36 00|
|Enter|1C 00|
|Backspace|0E 00|
|Insert|52 E0|
|Delete|53 E0|
|HOME|47 E0|
|End|4F E0|
|Page Up|49 E0|
|Page Down|51 E0|
|Num Lock|45 00|
|Scroll Lock|46 00|



## windows 10 问题

### Microsoft Store 链接不上网络的办法

- 打开 IE 浏览器 -> Internet 选项 -> 高级选项卡 -> 勾选使用 TLS 1.0 / 1.1 / 1.2

### windows 10 登陆不了 Microsoft 账户的问题

- 使用如下的 DNS 地址：4.2.2.1 和 4.2.2.2
- Microsoft 账户登陆后在将 DNS 地址改为原来的设置

### 联想拯救者 Y7000 2019 内装 office 更新不了，修复时被无故删除的问题

- 访问 [联想知识库](https://iknow.lenovo.com.cn/detail/dc_172545.html),下载 Quick Fix 工具中的 Office 2019 家庭和学生版安装工具。
- 运行工具，按照工具提示执行重装就可以
- 重装后点开任意一款 office 工具，使用激活 office 时的 Microsoft 账号登陆进行激活就可

### 常用文件夹或文件添加到快速访问或者从快速访问中删除

- **固定到快速访问**： 右键单击任何文件夹，然后选择**“固定到快速访问”**
- **从“快速访问”中移除**： 如果出现了你不想再看到的内容，右键单击它并选择**从“快速访问”中移除。**
- **windows10怎么设置常用文件夹不显示**: 

   1. 在桌面单击此电脑，会打开资源管理器。
   2. 在资源管理器的左上方，有一个查看的选项。点击它。
   3. 在弹出的选项卡里，打击最右边的选项按钮。
   4. 在弹出的选项按钮里，将快速访问的两个勾给去掉。完成。
- **Win10常用文件夹和最近使用的文件怎么不让显示**：执行上面的相反操作

---




## wsl 问题（windows10 环境）

### wsl 最佳开发环境配置

- 安装wsl2

- 安装 Ubuntu20.04 LTS

- vscode 安装remote-wsl插件

- 就可以在windows 环境使用vscode来对wsl内的文件进行编程
