## vim的几种文件备份

### .swp文件
- 默认交换文件在打开文件的时候就会产生交换文件，正常退出的时候才会删除交换文件（断电，Ctrl+Z强制退出就不会删除)。
- 通过在 Vim 配置文件设置 set noswapfile 来关闭交换文件

### vim 的备份文件 filename~
- 默认关闭，需要通过设置 set backup 来开启，Unbuntu的Vim配置文件是 /etc/vim/vimrc;
- 开启后，对文件进行修改后会保存修改之前的一个副本;
- 如果不喜欢 ~ 作为备份文件的后缀，可以使用 set backupext=.bak 来设置备份文件的扩展名
- 可以通过设置 set nobackup 来关闭备份文件.

### undo 备份文件 .filename.un.~
- 默认关闭，需要设置 set undofile 来开启 undo 备份文件;
- vim官方解释是：在 Vim 中编辑文件是使用了 撤销更改（u命令）的操作，会把撤销更改的那部分保存到缓存文件 ..un.~ 中。 测试发现这个 undo 缓存文件是追加写入的，所以你所有的撤销操作都会在这个文件中找到。
- 可以通过设置 set noundofile 来关闭这个文件。

### vim 的备份文件设置
- 关闭备份文件
```vimrc
set nobackup       "不生成备份文件 filename~
set noswapfile     "不生成交换文件 .filename.swp
set noundofile     "不生成undo备份 .filename.un~
```
- 设置备份文件
```vimrc
set backup       "生成备份文件 filename~
set swapfile     "生成交换文件 .filename.swp
set undofile     "生成undo备份 .filename.un~
```
- 设置备份文件路径
```vimrc
set dir=d:\vimtmp  "生成的swap交换文件在d盘\vimtmp,这个文件需要事先存在   =两端不能有空格
set udir=d:\vimtmp "生成的undo文件在d盘\vimtmp,这个文件需要事先存在,   =两端不能有空格
set bdir=d:\vimtmp "生成的backup文件在d盘\vimtmp,这个文件需要事先存在   =两端不能有空格
```

## vim 正则表达式
### 应用
1. 将下行中|，| 之间的文字替换为：---：
|第一段|第二段|第三段|第四大|第五段|第六段|第七段|第八段|

## vim文件句尾带^M的问题
- 原因：
  1. 在windows下的文本文件的每一行结尾，都有一个回车('\n')和换行('\r')
  2. 在linux下的文本文件的每一行结尾，只有一个回车('\n');
  3. 在Mac下的文本文件的每一行结尾，只有一个换行('\r');
  4. 在Linux下打开windows编辑过的文件，就会在行末尾显示^M; 
  5. 这个^M的在vim下的输入是：
      ctrl+v -> ^
      ctrl+m -> M
- 解决办法
1. 字符串替换
```vim
" ^M 要用 Ctrl+v 和 ctrl+m 来输入
%s/^M$//g
```
2. dos2unix 工具
```linux
dos2unix filename
```
3. 批量转换 
```linux
find ./ -type f -print0 | xargs -0 dos2unix
# 或者
find ./ -type f -print0 | xargs -0 sed -i 's/^M$//'
```


## vim 宏命令的使用

### vim 宏命令的简单使用
```
qa    -> 开始录制
Yp    -> 复制行
<C-a> -> 增加1
q     -> 停止录制
```

### 为Linux目录树添加序号
```
qa
0 yw j 0 i <space> <esc> p a | <space> <esc> 0 x <ctrl-a>
q
16 @ a
```
01| /              根目录
02| ├── bin     存放用户二进制文件
03| ├── boot    存放内核引导配置文件
04| ├── dev     存放设备文件
05| ├── etc     存放系统配置文件
06| ├── home    用户主目录
07| ├── lib     动态共享库
08| ├── lost+found  文件系统恢复时的恢复文件
09| ├── media   可卸载存储介质挂载点
10| ├── mnt     文件系统临时挂载点
11| ├── opt     附加的应用程序包
12| ├── proc    系统内存的映射目录，提供内核与进程信息
13| ├── root    root 用户主目录
14| ├── sbin    存放系统二进制文件
15| ├── srv     存放服务相关数据
16| ├── sys     sys 虚拟文件系统挂载点
17| ├── tmp     存放临时文件
18| ├── usr     存放用户应用程序
19| └── var     存放邮件、系统日志等变化文件
```

## vim 设置tab
```vim
set tabstop=4 "其中 tabstop 表示一个 tab 显示出来是多少个空格的长度，默认 8。
j
set softtabstop=4 "softtabstop 表示在编辑模式的时候按退格键的时候退回缩进的长度，当使用 expandtab 时特别有用。

set shiftwidth=4 "shiftwidth 表示每一级缩进的长度，一般设置成跟 softtabstop 一样。
set noexpandtab / expandtab "当设置成 expandtab 时，缩进用空格来表示，noexpandtab 则是用制表符表示一个缩进。
``` 

## 回到光标之前所在位置的快捷键
manual里面描述 ctrl-o 和 ctrl-i 但是不是很好用常常会跳到其他文件，还有如 `.  和 '. 并不能记录多次的。在豆瓣看到一个解决方案用 g, 和 g; 。完美解决！

## sav
文件另存为命令，并且存储后工作文档自动切换到另存为的文档

## buffer
|buffer命令|说明|
|:--:|:--:|
|:badd|增加缓冲区|
|:ls|列式缓冲区状态|
|:files|列式缓冲区状态|
|:buffers|列式缓冲区状态|
|:buffer|编辑指定缓冲区|
|:ball|编辑说有缓冲区|
|:bnext|到下一个缓冲区|
|:previous|到前一个缓冲区|
|:blast|到最后一个缓冲区|
|:bfirst|到第一个缓冲区|
|:bmodified|到修改过的缓冲区|
|:bdelete|删除缓冲区|
|:bunload|卸载缓冲区|

## g 命令的用法
> 参考链接： [http://vim.wikia.com/wiki/Power_of_g](http://vim.wikia.com/wiki/Power_of_g)

- :一般格式 -> ：[range]g/pattern/cmd

1. 删除包含某个Pattern的行 
:g/pattern/d, 实际上作者更推荐这种用法： :g/pattern/d_，原因请看原文

2. 删除不包含某个Pattern的行
:g!/pattern/d 或者 :v/pattern/d，v表示inverse

3. 删除所有空行 
:g/^\s*$/d，其中 \s* 表示0个或者多个空格；似乎用 :g/^$/d 也行

## vim使用技巧


### 拷贝从当前位置到第二个foo之间的内容

> y n /needword -> 从当前位置到第n个needWord之间的内容

例： `angel white foo jayden james  foo alexis texas foo nina ella` 光标在最前

解： y2/foo<enter> -> `angel white foo jayden james`  


## s 使用技巧

### {range}

- :n,$ -> n 行到最后一行

- ：%  -> 所有行

- :n,m -> n 到 m 行

### 每行前添加星号，但是不包括空行
- `{range}s/^\w/*&/`

- `{range}s/./*&/`

### 在每一行后添加一行空行，空行除外

```
- `:%s/\([^\n]\)\n\([^\n]\)/\1\r\r\2/g`

- `%s/\(.\)\n\(.\)/\1\r\r\2/`

- `:%s/\n\@<!\n\n\@!/\r\r/g`

- `:g/.\n\n\@!/norm o`
```

### 在每一行后添加一行空行，包含空行

- `%s/\n/\r\r/g`


## vim 正则

### flags 四个选项

- c confirm，每次替换前询问；

- e error， 不显示错误；

- g globle，不询问，整行替换。如果不加g选项，则只替换每行的第一个匹配到的字符串；

- i ignore，忽略大小写。

- 这些选项可以合并使用，如cgi表示不区分大小写，整行替换，替换前询问。

### 元字符

|元字符|说明|
|:---:|:---:|
|.|匹配任意字符|
|[abc]|匹配方括号中的任意一个字符，可用-表示字符范围。如[a-z0-9]匹配小写字母和数字|
|[^abc]|匹配除方括号中字符之外的任意字符|
|\d|匹配阿拉伯数字，等同于[0-9]|
|\D|匹配阿拉伯数字之外的任意字符，等同于[^0-9]|
|\x|匹配十六进制数字，等同于[0-9A-Fa-f]|
|\X|匹配十六进制数字之外的任意字符，等同于[^0-9A-Fa-f]|
|\l|匹配[a-z]|
|\L|匹配[^a-z]|
|\u|匹配[A-Z]|
|\U|匹配[^A-Z]|
|\w|匹配单词字母，等同于[0-9A-Za-z_]|
|\W|匹配单词字母之外的任意字符，等同于[^0-9A-Za-z_]|
|\t|匹配<TAB>字符|
|\s|匹配空白字符，等同于[\t]|
|\S|匹配非空白字符，等同于[^\t]|

### 需转义的普通字符

元字符	说明
\*	匹配* 字符
.	匹配. 字符
\/	匹配 / 字符
\	匹配 \ 字符
\[	匹配 [ 字符
\]	匹配 ] 字符

### 表示数量的元字符

元字符	说明
*	匹配0-任意个
\+	匹配1-任意个
\?	匹配0-1个
\{n,m}	匹配n-m个
\{n}	匹配n个
\{n,}	匹配n-任意个
\{,m}	匹配0-m个

### 表示位置的元字符

元字符	说明
$	匹配行尾
^	匹配行首
\<	匹配单词词首
\>	匹配单词词尾
a
### 表示【非打印字符】的元字符

正则表达式中比较常用的非打印元字符主要包括：

\n              表示匹配 一个换行符。
\r              表示匹配 一个回车符。
\t              表示匹配 一个制表符 ( Tab 键)。
\s              表示匹配 任意一个空白字符，包括空格、制表符、换页符等。
\S              表示匹配 任意一个非空白字符。

### 替换变量

- 在正则式中以\(和\)括起来的正则表达式，在后面使用的时候可以用\1、\2等变量来访问\(和\)中的内容

- '&' 表示匹配出来的值 -> 例如：

```
jaydenalexis2021

:s/\d\+/alexis&/

得到：jaydenalexis2021 -> & 代表匹配到的2021

```

