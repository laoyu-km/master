## common question


### Ubuntu 20.04 sudo 设置软件源

- 编辑/etc/apt/sources.list文件, 将原来的镜像地址全部注释掉，新写入如下地址
```
// 阿里源
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

- 最后执行命令

```bash
# update 实际上相当于软件管家的“查找更新”操作。它会同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引信息（软件包的版本信息、系统要求、翻译、依赖关系等等）。
sudo apt update

# upgrade: 实际上相当于软件管家的“一键更新”操作。它会对已经安装有更新的软件进行自动升级。由于确定要更新的软件包需要对本地安装的版本和列表的版本进行比较，所以要在update以后运行这一条。 
sudo apt upgrade
```


### Ubuntu 20.04 sudo 设置root密码

```bash
sudo passwd root
```


### Ubuntu 20.04 sudo 免密码

- 使用visudo来修改sudoers文件`sudo visudo`

- 在最后添加 `username ALL=(ALL:ALL) NOPASSWD: ALL`

- <font color="red">**注意：必须使用visudo来修改sudoers文件。NOPASSWD不要写成NOPASSWORD**</font>


### Ubuntu20.04 修改/etc/sudoers文件出错后，sudo命令报错，又没有设置root密码

<font color="red">** 最好的办法是在安装好Ubuntu后，首先设置root的密码 `sudo passwd root`**</font>

#### 1. wsl 环境
- 以管理员身份打开windows的powershell，输入`wsl -u root`,就可以root身份登陆wsl

- `passwd root ` -> 设置root密码

- visudo 修改 sudoer 文件 -> 直到修改正确

#### 2. Ubuntu 系统环境

- 进入/ect/目录，键入命令：pkexec visudo

- 根据命令提示执行

### /etc/sudoers 语法

> 配置sudo必须经过编辑/etc/sudoers文件，并且只有root才能够修改它，还必须使用visudo命令编辑。之因此使用visudo有两个缘由，一是它可以防止两个用户同时修改它；二是它也能进行有限的语法检查。

- 帐号 登录者的来源主机名（可切换的身份） 能够经过sudo执行的命令

```bash
jacky ALL=(root) /usr/bin/passwd
# 这表示从任何主机访问过来的本地用户jacky容许切换到root用户来执行/usr/bin/passwd命令
```

```bash
exmaple2： jacky ALL=(root) ALL
# 表示容许任意主机的本地用户jacky切换到root用户执行全部命令
# ALL表明全部，必须大写
# 若是后面是命令必须为绝对路径,多个命令用逗号隔开
```

- 前面的使用者帐号能够是一个组，这样表示：%GROUP_NAME，例如%dockeruser

- 若是在执行sudo的时候不须要输入密码，则能够在命令前面这样表示： NOPASSWD: COMMAND

- 强制密码验证则使用: PASSWD: COMMAND

```bash
%wheel ALL=(ALL) NOPASSWD: ALL
# 表示wheel组内的全部用户能够经过任何主机切换到任何用户，能够免密执行任何命令
```

- 若是能够同时切换多个用户如何表示：
```bash
foobar linux=(jimmy,rene) /bin/kill
# 主机名为linux上的用户 foobar能够切换到jimmy,rene这两个用户下，容许执行/bin/kill命令
# 切换的的时候须要使用-u选项
```

- 若是不想使用-u选项，能够设置默认切换用户，以下
```bash
Defaults:foobar runas_default=jimmy
```

### Ubuntu 虚拟机提示侧通道缓解问题，如何关闭侧通道

- 在Ubuntu虚拟机关机状态下，右键虚拟机选项卡 -> 设置 -> 选项 -> 高级 -> 为启用了 Hyper-V 的主机禁用侧通道缓解



### question about Ubuntu install nvm can't 

- 描述：

```bash
# 安装命令
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# error:  curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

- 原因办法

    从以上错误可以发现，脚本需要到 raw.githubusercontent.com 上拉取代码。

    网上搜索了一下，发现是 github 的一些域名的 DNS 解析被污染，导致DNS 解析过程无法通过域名取得正确的IP地址。

- 解决办法

打开 https://www.ipaddress.com/ 输入访问不了的域名

查询之后可以获得正确的 IP 地址

在本机的 host 文件中添加以下语句

```bash
199.232.68.133 raw.githubusercontent.com
199.232.68.133 user-images.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
```




## ;-print0 和 xargs -0
> 起因：当前文件夹下有 'file 1.log' 和 'file 2.log'两个文件，使用 `find ./ -name '*.log' | xargs rm` 提示错误
```
rm: cannot remove './file': No such file or directory
rm: cannot remove '2.log': No such file or directory
rm: cannot remove './file': No such file or directory
rm: cannot remove '1.log': No such file or directory
```

- 原因：
  1. 默认情况下, find命令每输出一个文件名, 后面都会接着输出一个换行符 ('\n'), 因此find 的输出都是一行一行的.
  2. xargs 默认是以空白字符 (空格, TAB, 换行符) 来分割记录的, 因此文件名 ./file 1.log 被解释成了两个记录 ./file 和 1.log, 不幸的是 rm 找不到这两个文件, 所以报无法移除。

- 解决办法：
  - 让 find命令在打印出一个文件名之后接着输出一个 NULL 字符 ('') 而不是换行符 (-print0), 然后再告诉 xargs 也用 NULL 字符来作为记录的分隔符 (xargs -0). 这就是 find 的 -print0 和 xargs 的 -0 的来历.
  - 为什么要使用'',而不是其他字符做分隔符呢? 因为: 一般的编程语言中都用 '' 来作为字符串的结束标志, 文件的路径名中不可能包含 '' 字符.
```
find ./ -name '*.log' -print0 | xargs -0 rm
```

## xargs
> 之所以能用到这个命令，关键是由于很多命令不支持|管道来传递参数，而日常工作中有有这个必要，所以就有了xargs命令
> xargs 可以读入 stdin 的资料，并且以空白字元或断行字元作为分辨，将 stdin 的资料分隔成为 arguments 。 因为是以空白字元作为分隔，所以，如果有一些档名或者是其他意义的名词内含有空白字元的时候， xargs 可能就会误判了,如果需要处理特殊字符，需要使用-0参数进行处理。

### xargs 常用选项
- -a 
    从文件读入作为stdin
```
xargs -a filename.log echo
```

- -t
    表示先打印命令在执行
```
cat filename.log | xargs -t echo
```

- -d
    默认情况下xargs将其标准输入中的内容以空白(包括空格、Tab、回车换行等)分割成多个之后当作命令行参数传递给其后面的命令，并运行之，我们可以使用 -d 命令指定分隔符
```
echo 'aa@bb@cc' | xargs -d '@' echo
find ./ -name '*.log' print0 | xargs -d '\0' rm
```

- -p
    操作具有可交互性，每次执行comand都交互式提示用户选择，当每次执行一个argument的时候询问一次用户
```
cat ./01file.log | xargs -p echo
```

- -n
    -n num 后面加次数，表示命令在执行的时候一次用的argument的个数，默认是用所有的。
```
cat ./01file.log | xargs -n 2 echo
```

- -E
    有的系统的xargs版本可能是-e  eof-str, 该选项指定一个字符串，当xargs解析出多个命令行参数的时候，如果搜索到-e指定的命令行参数，则只会将-e指定的命令行参数之前的参数(不包括-e指定的这个参数)传递给xargs后面的命令
```
echo 'aa bb cc dd' | xargs -E 'dd' echo // 输出 'aa bb cc'
```
注意：-E只有在xargs不指定-d的时候有效，如果指定了-d则不起作用，而不管-d指定的是什么字符，空格也不行。


- -0
     -0选项表示以 '\0' 为分隔符，一般与find结合使用
```
find ./ -name '*.log' -print0 | xargs -0 rm
```

- -i 或 -I
    用于将参数用{}替代,注意，-I 必须指定替换字符　－i 是否指定替换字符-可选
```
find . | xargs -i cp {} /home/akd
find . | xargs {} -i cp {} /home/akd
```

- -r
    no-run-if-empty 如果没有要处理的参数传递给xargsxargs 默认是带 空参数运行一次，如果你希望无参数时，停止 xargs，直接退出，使用 -r 选项即可，其可以防止xargs 后面命令带空参数运行报错。
```
echo "" | xargs -t -r mv /home/akd
```

- -s
    num xargs后面那个命令的最大命令行字符数(含空格)
```
cat ./01file.log | xargs -s 9 echo
cat ./01file.log | xargs -s 8 echo // false 参数超过最大字符数就报错
cat ./01file.log | xargs -s 5 echo // false
```

- -l 或 -L
    从标准输入一次读取num行送给Command命令，-l和-L功能一样
```
cat ./01file.log | xargs -l 3 cho
```

- -x
    exit的意思，如果有任何 Command 行大于 -s Size 标志指定的字节数，停止运行 xargs 命令，-L -I -n 默认打开-x参数，主要是配合-s使用.

- -P
    修改最大的进程数，默认是1，为0时候为as many as it can 。



## grep
> grep (global search regular expression(RE) and print out the line,全面搜索正则表达式并把行打印出来)是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。
> Unix的grep家族包括grep、egrep和fgrep。egrep和fgrep的命令只跟grep有很小不同。egrep是grep的扩展，支持更多的re元字符， fgrep就是fixed grep或fast grep，它们把所有的字母都看作单词，也就是说，正则表达式中的元字符表示回其自身的字面意义，不再特殊。linux使用GNU版本的grep。它功能更强，可以通过-G、-E、-F命令行选项来使用egrep和fgrep的功能。

### 常用用法
```
[root@www ~]# grep [-acinv] [--color=auto] '搜寻字符串' filename
选项与参数：
-a ：将 binary 文件以 text 文件的方式搜寻数据
-c ：计算找到 '搜寻字符串' 的次数
-i ：忽略大小写的不同，所以大小写视为相同
-n ：顺便输出行号
-v ：反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行！
--color=auto ：可以将找到的关键词部分加上颜色的显示喔！
```
- 在关键字的显示方面，grep 可以使用 --color=auto 来将关键字部分使用颜色显示。 这可是个很不错的功能啊！但是如果每次使用 grep 都得要自行加上 --color=auto 又显的很麻烦～ 此时那个好用的 alias 就得来处理一下啦！你可以在 ~/.bashrc 内加上这行：『alias grep='grep --color=auto'』再以『 source ~/.bashrc 』来立即生效即可喔！ 这样每次运行 grep 他都会自动帮你加上颜色显示啦

### 练习
```
// 将/etc/passwd，有出现 root 的行取出来
grep root /etc/passwd

// 将/etc/passwd，有出现 root 的行取出来,同时显示这些行在/etc/passwd的行号
grep -n root /etc/passwd

// 将/etc/passwd，将没有出现 root 的行取出来
grep -v root /etc/passwd

// 将/etc/passwd，将没有出现 root 和nologin的行取出来
grep -v root /etc/passwd | grep -v nologin

// 用 dmesg 列出核心信息，再以 grep 找出内含 eth 那行,要将捉到的关键字显色，且加上行号来表示：
dmesg | grep -n --color=auto 'eth'

// 用 dmesg 列出核心信息，再以 grep 找出内含 eth 那行,在关键字所在行的前两行与后三行也一起捉出来显示
dmesg | grep -n -A3 -B2 --color=auto 'eth'

// 根据文件内容递归查找目录
grep 'javascript' ./* //在当前目录搜索内容包括javascript的文件

grep -r 'javascript' ./* // 在当前目录及其子目录下搜索'javascript'行的文件

grep -l -r 'javascript' ./* // 在当前目录及其子目录下搜索'energywise'行的文件，但是不显示匹配的行，只显示匹配的文件
```

## find 命令
### 命令格式
find [查找目录] [查找规则] [查找完后的操作]
即：find pathname -option [-print -exec -ok …]

2、命令功能
用于在文件树中查找文件，并做相应的处理，(有可能访问磁盘)。

3、命令参数
（1）pathname：表示所要查找的目录路径,例如”.”表示当前目录，”/”表示根目录。
（2）-print:将find找到的文件输出到标准输出。
（3）-exec:对找到的文件执行exec这个参数所指定的shell命令，相应的形式为：-exec command {} \; 将查到的文件进行command操作，”{}”就代替查到的文件。

注意：
1）”{}”和”\”之间有一个空格。
2）-ok:和-exec的作用相同，只不过-ok更加安全一点，在执行每一个命令之前，系统会让用户确定是否执行。

### 查找规则：
#### 1. 根据文件名查找
（1）-name ：根据文件名进行查找,区分大小写精确查找。
```
find ./ -name 'filename'
```

（2）-iname：根据文件名查找，不区分大小写
```
find ./ -iname 'FileName'
```

（3）文件名通配符：
“*”：通配任意的字符，可以是任何东西。
```
find ./ -name 'file*'
```

（4）”?”：可表示任意单个字符
```
find ./ -name 'file?'
```
注：与上例比较得知，空不为单字符，所以不能查找“file”文件。

（5）”[]”表示通配括号里面的任意一个字符，注意[]里面的内容会被解析成单个字符。
```
find ./ -name 'd[abcdefg]mo.js'
```


#### 2. 根据文件的时间戳信息查找文件
在根据时间戳信息查找的时候，所有的time都是以天为单位，min都是以分钟为单位。+n表示n以前，-n表示n以内。

（1）以最近一次存取的时间为参数
1）-atime：
A、find pathname -atime +n //表示n天前存取过的文件
B、find pathname -atime -n //表示以当前时间为起点前n天内存取过的文件

2）-amin ：
A、find pathname -amin +n //表示n分钟前存取过的文件。
B、find pathname -amin -n //表示以当前时间为起点前n分钟内存取过的文件。
【例】


（2）以最近一次修改的时间为参数
1）-mtime：
A、find pathname -mtime +n //表示n天前修改过的文件
B、find pathname -mtime -n //表示以当前时间为起点前n天内修改 过的文件

2）-mmin：
A、find pathname -mmin +n //表示n分钟前存取过的文件
B、find pathname -mmin -n //表示以当前时间为起点前n修改 内存取过的文
【例】


（3）以最近一次更改的属性为参数
1）-ctime：
A、find pathname -ctime +n //表示n天前更改 过的文件
B、find pathname -ctime -n //表示以当前时间为起点前n天内更改 过的文件

2）-cmin：
A、find pathname -cmin +n //表示n分钟前更改过的文件
B、find pathname -cmin -n //表示以当前时间为起点前n分钟内更改 过的文件

#### 3. 根据文件所属用户和所属组来查找文件
（1）根据文件所有者查找文件：-user
```
find ./ -user root
```

（2）根据所有者所在的组查找：-group
```
find ./ -group root
```


#### 4. 根据nouser或nogroup查找
（1）查找无有效属主的文件：-nouser
find pathname -nouser
（2）查找无有效属组的文件：-nogroup
find pathname -nogroup

#### 5、-perm ：根据权限来查找文件
```
find ./ -perm 664
```

#### 6、根据uid和gid查找文件
（1）根据文件的uid查找：-uid
（2）根据文件所在组的gid查找：-gid

#### 7、-type：根据文件类型查找文件
（1）普通文件：f
find pathname -type f

（2）目录文件：d
find pathname -type d

（3）链接文件：l
find pathname -type l

（4）块设备文件：b
find pathname -type b

（5）字符设备文件：c
find pathname -type c

（6）管道设备文件：p
find pathname -type p

（7）套接字文件：s
find pathname -type s

#### 8、根据文件大小查找文件：-size [+-]n[bkMG]
（1）find pathname -size +n //表示大于n字节的文件
（2）find pathname -size -n //表示小于n字节的文件
（3）find pathname -size n //表示等于n字节的文件
【例】


#### 9、按照参考文件的更改时间查找 -newer file / !file
-newer ：file1//查找更改时间比file1的更改时间距离当前时间近的文件
```
// 查找更改时间比file1.log的更改时间距离当前时间近的文件
find ./ -newer 'file1.log'
```

#### 10、maxdepth和mindepth
（1）-maxdepth
1）-maxdepth n : 搜索深度距离当前目录最多n个子目录深度
```
find ./ -maxdepth -name 'filename'
```

（2）-mindepth
2）-mindepth n :搜索深度距离当前目录至少n个子目录深度
```
find ./ -mindepth -name 'filename'
```

#### 11、查找路径下为空的文件或文件夹：-empty
```
find -empty
```

#### 12、按照硬连接的数目进行查找
（1）-link n ：硬连接连接数等于n的文件或目录

（2）-link +n ：硬连接连接数大于n的文件或目录

（3）-link -n ：硬连接连接数小于n的文件或目录

#### 13、-a、-o，-not(也就是与、或、非)
（1）-a：连接两个不同的条件(即两个条件必须同时为真)
```
find ./ -size +0 -a -size -2b
```

（2）-o：连接两个不同的条件(两个条件只要满足一个即可)
```
find ./ size 8 -o -name '*.js'
```

（3）-not：对条件进行取反
```
find ./ -not -type f
```

#### 14、查找完成之后的操作
（1） -exec command {} \;: 其中，”{}”就代表查找之后返回的文件。
```
find ./ -name file -exec ls -l {} \;
find ./ -name test -exec cp {} /home/akd \;
```

（2）-ok command {} \;-ok相对于-exec而言更安全一点，会让用户确定所要执行的操作。
```
find ./ name file -ok ls -l {} \;
find ./ name file cp {} /home/akd \;
```

## ls -l 命令显示结果各段代表的意义
|第一段|第二段|第三段|第四大|第五段|第六段|第七段|第八段|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|文件类型|所有者权限,所有组权限,其他人权限|硬连接数（子目录数）|所有人|所有组|文件大小(默认以字节为单位)|文件(目录)最近范围(修改)的时间|文件(目录)名|
> 第三段，文件类型是文件时代表文件的硬链接书，文件类型是目录时代表目录下的子目录数


## linux 下查看文件和文件夹的大小
- df可以查看一级文件夹大小、使用比例、档案系统及其挂入点，但对文件却无能为力。
- du可以查看文件及文件夹的大小。

- 两者配合使用，非常有效。比如用df查看哪个一级目录过大，然后用df查看文件夹或文件的大小，如此便可迅速确定症结。

### df命令
- df命令可以显示目前所有文件系统的可用空间及使用情形
```linux
[yayug@yayu ~]$ df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/sda1             3.9G  300M  3.4G   8% /
/dev/sda7             100G  188M   95G   1% /data0
/dev/sdb1             133G   80G   47G  64% /data1
/dev/sda6             7.8G  218M  7.2G   3% /var
/dev/sda5             7.8G  166M  7.2G   3% /tmp
/dev/sda3             9.7G  2.5G  6.8G  27% /usr
tmpfs                 2.0G     0  2.0G   0% /dev/shm
```
#### df命令全部参数使用说明 
```
-a或--all：包含全部的文件系统；
--block-size=<区块大小>：以指定的区块大小来显示区块数目；
-h或--human-readable：以可读性较高的方式来显示信息；
-H或--si：与-h参数相同，但在计算时是以1000 Bytes为换算单位而非1024 Bytes；
-i或--inodes：显示inode的信息；
-k或--kilobytes：指定区块大小为1024字节；
-l或--local：仅显示本地端的文件系统；
-m或--megabytes：指定区块大小为1048576字节；
--no-sync：在取得磁盘使用信息前，不要执行sync指令，此为预设值；
-P或--portability：使用POSIX的输出格式；
--sync：在取得磁盘使用信息前，先执行sync指令；
-t<文件系统类型>或--type=<文件系统类型>：仅显示指定文件系统类型的磁盘信息；
-T或--print-type：显示文件系统的类型；
-x<文件系统类型>或--exclude-type=<文件系统类型>：不要显示指定文件系统类型的磁盘信息；
--help：显示帮助；
--version：显示版本信息。
```
- 参数 -h 表示使用「Human-readable」的输出，也就是在档案系统大小使用 GB、MB 等易读的格式。

- 上面的命令输出的第一个字段（Filesystem）及最后一个字段（Mounted on）分别是档案系统及其挂入点。我们可以看到 /dev/sda1 这个分割区被挂在根目录下。

- 接下来的四个字段 Size、Used、Avail、及 Use% 分别是该分割区的容量、已使用的大小、剩下的大小、及使用的百分比。 FreeBSD下，当硬盘容量已满时，您可能会看到已使用的百分比超过 100%，因为 FreeBSD 会留一些空间给 root，让 root 在档案系统满时，还是可以写东西到该档案系统中，以进行管理。

### du：查询文件或文件夹的磁盘使用空间
- du是用来查看文件和目录大小用的，和df略有区别, 默认情况下du只显示目录大小。
#### du 命令的参数使用说明
```
-a或-all 显示目录中个别文件的大小。
-b或-bytes 显示目录或文件大小时，以byte为单位。
-c或--total 除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
-k或--kilobytes 以KB(1024bytes)为单位输出。
-m或--megabytes 以MB为单位输出。
-s或--summarize 仅显示总计，只列出最后加总的值。
-h或--human-readable 以K，M，G为单位，提高信息的可读性。
-x或--one-file-xystem 以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。
-L<符号链接>或--dereference<符号链接> 显示选项中所指定符号链接的源文件大小。
-S或--separate-dirs 显示个别目录的大小时，并不含其子目录的大小。
-X<文件>或--exclude-from=<文件> 在<文件>指定目录或文件。
--exclude=<目录或文件> 略过指定的目录或文件。
-D或--dereference-args 显示指定符号链接的源文件大小。
-H或--si 与-h参数相同，但是K，M，G是以1000为换算单位。
-l或--count-links 重复计算硬件链接的文件.
```
#### 示例
1. 查看/home目录总大小
```
du -sh /home
du -sh #在/home目录中
```
2. 查看/home目录下各个子目录大小,包含/home目录本身和除目录外的其他文件大小
```
du -h
```
3. 查看/home目录下各个子目录以及子目录的子目录（所有子目录的）大小和/home下其他文件大小（不包含子目录文件和/home目录）
```
du -h *
```
4. 查看 /home 目录下各个子目录的大小不包括子目录的子目录
```
du -h --max-depth=0 *
du -h --max-depth=1
```
5. 查看/home目录下各个子目录的大小包括子目录但不包括2层一下的目录
```
du -h --max-depth=1 *
du -h --max-depth=2
```
6. 查看目录下各个子目录以及目录下所有文件的大小
```
du -ah ./ # 指定路径内的
du -ah    # 当前路径下的
```

## sort 排序命令
- sort命令可以用于将文件内容排序并输出，也可以用于将某些查询命令的执行结果排序后输出
- sort 默认是按从小到大的顺序进行排序

### sort 参数说明
```
-b：忽略每行前面开始出的空格字符；
-c：检查文件是否已经按照顺序排序；
-d：排序时，处理英文字母、数字及空格字符外，忽略其他的字符；
-f：排序时，将小写字母视为大写字母；
-i：排序时，除了040至176之间的ASCII字符外，忽略其他的字符；
-m：将几个排序号的文件进行合并；
-M：将前面3个字母依照月份的缩写进行排序；
-n：依照数值的大小排序；
-o<输出文件>：将排序后的结果存入制定的文件；
-r：以相反的顺序来排序；
-t<分隔字符>：指定排序时所用的栏位分隔字符；
+<起始栏位>-<结束栏位>：以指定的栏位来排序，范围由起始栏位到结束栏位的前一栏位。
```
### sort 应用示例
1. 将文件夹中的子文件夹的子文件夹(不含3级文件夹及以下文件夹)按从大到小排序
```
du --max-depth=2 | sort-rn
du --max-depth=1 * | sort -rn
```

## ls 命令的实用示例
1. 按修改时间排序
```
ls -t # t:time
```
2. 按文件大小排序显示
```
ls -S # S: sort by file size, largest first
```
3. 按文件大小排序并显示文件大小 in block
```
ls -Ss # s:size
```
4. 按文件大小反序排列显示
```
ls -Sr # r:reverse
```
5. 递归显示当前文件夹下所有文件
```
ls -R # R:recursive
```
6. 显示当前文件夹信息
```
ls -d
ls -ld
```
7. 路径后面加*的作用
```
ls -ld /home/akd/  # 只显示akd目录具体信息
ls -ld /home/akd/* # 显示akd子目录的具体信息
ls -l /home/akd/*  # 显示akd下的所有目录和文件
```
8. 查看文件的inode
```
ls -i
```

## Linux硬链接和软链接
### 硬链接特点
- 文件有相同的 inode 及 data block；
- 只能对已存在的文件进行创建；
- 不能交叉文件系统进行硬链接的创建；
- 不能对目录进行创建，只可对文件创建；
- 删除一个硬链接文件并不影响其他有相同 inode 号的文件。
### 软链接特点
- 软链接有自己的文件属性及权限等；
- 可对不存在的文件或目录创建软链接；
- 软链接可交叉文件系统；
- 软链接可对文件或目录创建；
- 创建软链接时，链接计数 i_nlink 不会增加；
- 删除软链接并不影响被指向的文件，但若被指向的原文件被删除，则相关软连接被称为死链接（即 dangling link，若被指向路径文件被重新创建，死链接可恢复为正常的软链接）。
### 链接常用命令
1. 创建硬链接
```
link oldfile newfile
ln oldfile newfile
```
2. 创建软链接
```
link -s basefile linkfile
ln -s basefile linkfile
```
3. 在 Linux 中查看当前系统已挂着的文件系统类型
```
 df -i --print-type
 mount
 cat /proc/mounts
```
4. 使用命令 find 查找软链接与硬链接
```
# 查找在路径 ./ 下的文件 linkfile 的软链接
 find ./ -lname linkfile 
# 查看路径 ./ 有相同 inode 的所有硬链接
# 方法1.
 find /. -samefile linkfile

# 方法2.
 ls -i linkfile //1048663
 find /home -inum 1048663 
 
# 列出路径 ./ 下的所有软链接文件
 find ./ -type l -ls 
```

### 参考
[理解 Linux 的硬链接与软链接-网络](https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/index.html)
[理解 Linux 的硬链接与软链接-本地](/home/akd/Documents/master/linux_hardlinkAndsoftlink.md)


## Centos8 安装gitlab
- [Centos8 安装gitlab](https://help.aliyun.com/document_detail/52857.html)
