# common question

## Ubuntu

### 1. Ubuntu 20.04 sudo 设置软件源

- 编辑/etc/apt/sources.list 文件, 将原来的镜像地址全部注释掉，新写入如下地址

```
// 阿里源 Ubuntu 20.04
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

// 阿里云 Ubuntu 22.04
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse

```

- 最后执行命令

```bash
# update 实际上相当于软件管家的“查找更新”操作。它会同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引信息（软件包的版本信息、系统要求、翻译、依赖关系等等）。
sudo apt update

# upgrade: 实际上相当于软件管家的“一键更新”操作。它会对已经安装有更新的软件进行自动升级。由于确定要更新的软件包需要对本地安装的版本和列表的版本进行比较，所以要在update以后运行这一条。
sudo apt upgrade
```

### 2. Ubuntu22.04 上启用 ssh

1. install openssh-server

   ```bash
   sudo apt install openssh-server
   ```

2. 检测是否安装成功

   ```bash
   # 方式1
   sudo systemctl status ssh

   # 方式2
   dpkg -l | grep ssh
   ```

### 3. 安装 openssh-server 提示依赖未安装如何解决

1. 打开设置中的 Software&update

2. 将 Ubuntu Software 的如下四个选项勾选，分别是

   - Canonical 支持的免费和开源软件
   - 社区维护的免费和开源软件
   - 有版权和合法性问题的软件
   - 源代码

3. 选择合适站点

4. Terminal 执行更新

   ```bash
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get dist-upgrade
   ```

### 4. update, upgrade, dist-upgrade 的区别

- update：当执行 apt-get update 时，update 重点更新的是来自软件源的软件包的索引记录（即 index files）。

- upgrade：当执行 apt-get upgrade 时，upgrade 是根据 update 更新的索引记录来下载并更新软件包。

- dist-upgrade:当执行 apt-get dist-upgrade 时，除了拥有 upgrade 的全部功能外，dist-upgrade 会比 upgrade 更智能地处理需要更新的软件包的依赖关系。

- 执行顺序: update -> upgrade -> dis-upgrade

### 5. WIN10 系统下 vmware-vmx.exe 进程 CPU 占用率高、进程无法杀掉的问题解决

- 原因： 是由于 VMware 和 Hyper-V 不兼容导致

- 解决办法： 关闭 windows10 的 Hyper-V 服务

- Win10 专业版解决方法：

  1. 控制面板—程序——打开或关闭 Windows 功能，取消勾选 Hyper-V，确定禁用 Hyper-V 服务。 2.之后重新启动计算机，再运行 VM 虚拟机即可。

- Win10 家庭版解决方法：（本人的）

  1. 按下 WIN+R 打开运行，然后输入 services.msc 回车；
  2. 在服务中找到 HV 主机服务，禁用

- 禁止服务后， 以管理员权限运行 cmd： bcdedit /set hypervisorlaunchtype off

- 最后重启电脑

### 6. 解决虚拟机上安装 Ubuntu 显示太小的问题

- 安装 VMware Tools

1. 关闭虚拟机 -> 右键虚拟机选项卡 -> 设置 -> CD/DVD(SATA) -> 使用 ISO 映像文件 -> 浏览 -> C:\Program Files (x86)\VMware\VMware Workstation\linux.iso

2. 打开虚拟机 -> 点击 VMware Workstation 虚拟机 -> 重新安装 vmware tools -> 在虚拟机的 cd 中就会加载 linux.iso -> 拷贝其中
3. 的虚拟机安装文件 **_.pl 到自己指定的目录，这里是 /home/laoyu/Downloads ->转到/home/laoyu/Downloads 执行 `sudo ./_**.pl` 进行安装

4. 安装完成后重启虚拟机

5. 虚拟机中点击 setting -> displayer -> 选择合适的分辨率

### 7. Ubuntu22.04 安装 ffmpeg 提示 The following packages have unmet dependencies 错误

- 原因: Ubuntu20.04 更换阿里云源后安装软件都会报错：The following packages have unmet dependencies, 大概是 ubuntu 本身的源比较版本较老，而阿里云的源比较新，因此版本不匹配造成依赖的库不匹配，所以只要将阿里云的源换回 Ubuntu 官方源

- 解决办法： 将阿里云源替换为了清华大学源

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

- Ubuntu 的软件源配置文件是 /etc/apt/sources.list，在配置之前最好做个备份

### 8. Ubuntu22.04 虚拟机挂载本地硬盘的方法

- 1. vm ubuntu install open-vm-tools

  ```bash
  sudo apt install open-vm-tools

  sudo apt install open-vm-tools-desktop #支持桌面环境的双向拖放文件
  ```

- 3. vmware workstation 环境下右键虚拟机选项卡 -> 设置 -> 选项 -> 共享文件夹 -> 启用 -> 选择需要挂载的文件夹

- 4. 查看共享文件夹是否可以挂载

  ```bash
  vmware-hgfsclient # 出现共享的文件夹名称就说明可以挂载
  ```

- 5. 创建共享文件夹专用挂载目录

  ```bash
  sudo mkdir -p /mnt/hgfs
  ```

- 6. 挂载共享文件夹

  ```bash
  sudo /usr/bin/vmhgfs-fuse .host:/ /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other

  # 查看是否挂载上
  ls -l /mnt/hgfs
  ```

- 7. 设置开机时自动挂载

  ```bash
  vim /etc/fstab

  # 在末尾插入如下命令：
  .host:/ /mnt/hgfs  fuse.vmhgfs-fuse allow_other,defaults  0  0
  ```

### 9. Ubuntu 20.04 sudo 设置 root 密码

```bash
sudo passwd root
```

### 10. Ubuntu 20.04 sudo 免密码

- 使用 visudo 来修改 sudoers 文件`sudo visudo`

- 在最后添加 `username ALL=(ALL:ALL) NOPASSWD: ALL`

- <font color="red">**注意：必须使用 visudo 来修改 sudoers 文件。NOPASSWD 不要写成 NOPASSWORD**</font>

### 11. Ubuntu20.04 修改/etc/sudoers 文件出错后，sudo 命令报错，又没有设置 root 密码

<font color="red">** 最好的办法是在安装好 Ubuntu 后，首先设置 root 的密码 `sudo passwd root`**</font>

#### 1. wsl 环境

- 以管理员身份打开 windows 的 powershell，输入`wsl -u root`,就可以 root 身份登陆 wsl

- `passwd root ` -> 设置 root 密码

- visudo 修改 sudoer 文件 -> 直到修改正确

#### 2. Ubuntu 系统环境

- 进入/ect/目录，键入命令：pkexec visudo

- 根据命令提示执行

### 12. /etc/sudoers 语法

> 配置 sudo 必须经过编辑/etc/sudoers 文件，并且只有 root 才能够修改它，还必须使用 visudo 命令编辑。之因此使用 visudo 有两个缘由，一是它可以防止两个用户同时修改它；二是它也能进行有限的语法检查。

- 帐号 登录者的来源主机名（可切换的身份） 能够经过 sudo 执行的命令

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

- 若是在执行 sudo 的时候不须要输入密码，则能够在命令前面这样表示： NOPASSWD: COMMAND

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

- 若是不想使用-u 选项，能够设置默认切换用户，以下

```bash
Defaults:foobar runas_default=jimmy
```

### 13. Ubuntu 虚拟机提示侧通道缓解问题，如何关闭侧通道

- 在 Ubuntu 虚拟机关机状态下，右键虚拟机选项卡 -> 设置 -> 选项 -> 高级 -> 为启用了 Hyper-V 的主机禁用侧通道缓解

### 14. question about Ubuntu install nvm can't

- 描述：

```bash
# 安装命令
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# error:  curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

- 原因办法

  从以上错误可以发现，脚本需要到 raw.githubusercontent.com 上拉取代码。

  网上搜索了一下，发现是 github 的一些域名的 DNS 解析被污染，导致 DNS 解析过程无法通过域名取得正确的 IP 地址。

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

### 15. Ubuntu 虚拟机如何挂载本机文件夹

```bash
# 1. 打开虚拟的共享文件夹： 虚拟机(关机状态) -> 设置 -> 选项 -> 共享文件夹 -> 总是启用 -> 添加需要共享的文件夹

# 2. Ubuntu 中安装 vmtools: 安装后最好重启
sudo apt install open-vm-tools open-vm-tools-desktop

# 3. 执行 vmware-hgfsclient,列出共享文件夹名称，说明可以挂载
vmware-hgfsclient

# 4. 在 /mnt 文件夹中创建 hgfs 文件夹
sudo mkdir -p /mnt/hgfs

# 5. 执行以下命令挂载共享文件夹
sudo /usr/bin/vmhgfs-fuse .host:/ /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other

# 6. 要在开机时自动挂载共享文件夹，则需要更改/etc/fstab文件夹
vim /etc/fstab # 末尾插入如下命令：
~$ .host:/         /mnt/hgfs  fuse.vmhgfs-fuse allow_other,defaults  0      0

```

### 16. Ubuntu22.03 调换 esc 和 cpas 以及 左边 alt 和 ctl 键位

```bash
# 最直接方法修改系统键位配置文件
# 1. 备份系统键位配置文件
sudo cp /usr/share/X11/xkb/keycodes/evdev /usr/share/X11/xkb/keycodes/evdev.bak

# 2. 打开配置文件修改对应的值, 由于系统文件只有root权限可以进行修改，root组成员都不行
su root
vim /usr/share/X11/xkb/keycodes/evdev #修改需要的键值就可以
```

### 17.Ubuntu22.04 vscode 不能输入中文的问题

- 原因是在 ubuntu software 里下载的应用，它缺少一个插件

- 解决方案就是去官网下一个 deb 的文件，然后安装就可以 `sudo dpkg -i vscodeXXXX`

### 18. Ubuntu22.04 安装迅雷

- 在百度网盘下载 .deb 的迅雷

- `sudo dpkg -i com.xunleiXXXX`

### 19. Ubuntu22.04 安装 Windows 字体

```bash
# 1. 将 Windows 字体拷贝到 Ubuntu 系统中(/home/laoyugou/Downloads)

# 2. 在 /usr/share/fonts/truetype/ 下创建 windows-fonts 文件夹
mkdir /usr/share/fonts/truetype/windows-fonts

# 3. 拷贝字体文件到Windows-fonts文件夹
cp /home/laoyugou/Downloads/XXX.ttf /usr/share/fonts/truetype/windwos-fonts

# 4. 安装字体
sudo chmod -R 777 /usr/share/fonts/truetype/windows-fonts
cd /usr/share/fonts/truetype/windows-fonts
sudo mkfontscale
sudo mkfontdir
sudo fc-cache -fv

# 如果提示 fc-cache: command not found, 说明没有安装字体管理
# Ubuntu 下执行下面语句
sudo apt-get install fontconfig
# CentOS 下执行下面语句
yum install fontconfig
```

### 20. Ubuntu22.04 install youdao 词典

- 在有道下载正确版本的 deb 安装包

- 执行安装命令，sudo dpkg -i youdao-dict_6.0.0-ubuntu-amd64.deb 正常会报错，说缺少很多 python pyqt5 相关的依赖包

- 执行命令 sudo apt install -f 安装相关依赖，有 170+m，如果还有缺失的包，就逐个安装

- 再执行 2 的安装命令，安装包成功，可是运行命令 youdao_dict & 还是没有界面出来，再坚持一下，马上就好

- ps aux | grep youdao 查出两个相关的进程，kill -9 进程 id

- 修改词典的源码 1， sudo vim /usr/share/youdao-dict/app/plugins/youdao/window.py 跳转到 287 行，

```bash
geometry = desktop.screenGeometry(desktop.primaryScreen())
 x = geometry.x() + (geometry.width() - self.width())/2
 y = geometry.y() + (geometry.height() - self.height())/2
#以上代码方便你查找
self.setX(x)
self.setY(y)

#修改成
self.setX(int(x))
self.setY(int(y))
```

- 修改词典的源码 2，sudo vim /usr/share/youdao-dict/dae/window.py

```bash
geometry = screen.availableGeometry()
 x = geometry.x() + (geometry.width() - self.width())/2
 y = geometry.y() + (geometry.height() - self.height())/2
# 以上方便定位ie

self.move(x, y)

#改成
self.move(int(x), int(y))
```

- 再运行有道词典，OK 了

### 21. Ubuntu22.04 vscode CPU 占用过高问题

```bash
# 查看： vscode 中help --》open Process Explorer 打开这个可以直接看到那一项 cpu使用率高

# 解决办法： setting(UI) -> 将 search.followSymlinks 设置为false，进行关闭就可以了，因为在使用VScode的时候会有很多的搜索操作，造成 CPU 使用率过高
```

## CentOS8 相关问题

### 开机打开网络的设置方法

```bash
  # 查看虚拟机使用的网卡名称 ifconfig
  cd /etc/sysconfig/network-scripts

  # 编辑ifcfg-enp0s3文件
  # 将ONBOOT设置为yes
  # 保存文件并退出
  # 重启网络
  # service network restart 老版本
    #start ←启动
    #stop ←停止
    #restart ←再启动
    #reload ←和再启动一样（..）
    #status ←状态表示

  # CentOS8 新命令
  nmcli c reload # 重新载入配置文件
  nmcli device  # 查看网卡链接状态
  # 重启⽹卡(下⾯的三条命令都可以)
  nmcli c up System\ ens3
  nmcli d reapply ens3
  nmcli d connect ens3
```

### SecureCRT 连接虚拟机报错：All available gssapi mechanisms failed

```bash
  # 打开sshd_config文件
  vi /etc/ssh/sshd_config
  # 将PasswordAuthentication 的属性 no 改为 yes
  # 然后重启sshd：service sshd restart || systemctl restart sshd.service
  # 再使用CRT连接就可以连接上
```

### 修改 Centos8 的 yum 源

```bash
# 备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
#下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/ , centos8（centos8官方源已下线，建议切换centos-vault源）
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
# 运行 yum makecache 生成缓存 || yum clean all && yum makecache
#其他
sed -i -e '/mirrors.cloud.aliyuncs.com/d' -e '/mirrors.aliyuncs.com/d' /etc/yum.repos.d/CentOS-Base.repo
```

## Linux 命令相关

### ;-print0 和 xargs -0

> 起因：当前文件夹下有 'file 1.log' 和 'file 2.log'两个文件，使用 `find ./ -name '*.log' | xargs rm` 提示错误

```
rm: cannot remove './file': No such file or directory
rm: cannot remove '2.log': No such file or directory
rm: cannot remove './file': No such file or directory
rm: cannot remove '1.log': No such file or directory
```

- 原因：

  1. 默认情况下, find 命令每输出一个文件名, 后面都会接着输出一个换行符 ('\n'), 因此 find 的输出都是一行一行的.
  2. xargs 默认是以空白字符 (空格, TAB, 换行符) 来分割记录的, 因此文件名 ./file 1.log 被解释成了两个记录 ./file 和 1.log, 不幸的是 rm 找不到这两个文件, 所以报无法移除。

- 解决办法：
  - 让 find 命令在打印出一个文件名之后接着输出一个 NULL 字符 ('') 而不是换行符 (-print0), 然后再告诉 xargs 也用 NULL 字符来作为记录的分隔符 (xargs -0). 这就是 find 的 -print0 和 xargs 的 -0 的来历.
  - 为什么要使用'',而不是其他字符做分隔符呢? 因为: 一般的编程语言中都用 '' 来作为字符串的结束标志, 文件的路径名中不可能包含 '' 字符.

```
find ./ -name '*.log' -print0 | xargs -0 rm
```

### xargs

> 之所以能用到这个命令，关键是由于很多命令不支持|管道来传递参数，而日常工作中有有这个必要，所以就有了 xargs 命令
> xargs 可以读入 stdin 的资料，并且以空白字元或断行字元作为分辨，将 stdin 的资料分隔成为 arguments 。 因为是以空白字元作为分隔，所以，如果有一些档名或者是其他意义的名词内含有空白字元的时候， xargs 可能就会误判了,如果需要处理特殊字符，需要使用-0 参数进行处理。

### xargs 常用选项

- -a
  从文件读入作为 stdin

```
xargs -a filename.log echo
```

- -t
  表示先打印命令在执行

```
cat filename.log | xargs -t echo
```

- -d
  默认情况下 xargs 将其标准输入中的内容以空白(包括空格、Tab、回车换行等)分割成多个之后当作命令行参数传递给其后面的命令，并运行之，我们可以使用 -d 命令指定分隔符

```
echo 'aa@bb@cc' | xargs -d '@' echo
find ./ -name '*.log' print0 | xargs -d '\0' rm
```

- -p
  操作具有可交互性，每次执行 comand 都交互式提示用户选择，当每次执行一个 argument 的时候询问一次用户

```
cat ./01file.log | xargs -p echo
```

- -n
  -n num 后面加次数，表示命令在执行的时候一次用的 argument 的个数，默认是用所有的。

```
cat ./01file.log | xargs -n 2 echo
```

- -E
  有的系统的 xargs 版本可能是-e eof-str, 该选项指定一个字符串，当 xargs 解析出多个命令行参数的时候，如果搜索到-e 指定的命令行参数，则只会将-e 指定的命令行参数之前的参数(不包括-e 指定的这个参数)传递给 xargs 后面的命令

```
echo 'aa bb cc dd' | xargs -E 'dd' echo // 输出 'aa bb cc'
```

注意：-E 只有在 xargs 不指定-d 的时候有效，如果指定了-d 则不起作用，而不管-d 指定的是什么字符，空格也不行。

- -0
  -0 选项表示以 '\0' 为分隔符，一般与 find 结合使用

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
  no-run-if-empty 如果没有要处理的参数传递给 xargsxargs 默认是带 空参数运行一次，如果你希望无参数时，停止 xargs，直接退出，使用 -r 选项即可，其可以防止 xargs 后面命令带空参数运行报错。

```
echo "" | xargs -t -r mv /home/akd
```

- -s
  num xargs 后面那个命令的最大命令行字符数(含空格)

```
cat ./01file.log | xargs -s 9 echo
cat ./01file.log | xargs -s 8 echo // false 参数超过最大字符数就报错
cat ./01file.log | xargs -s 5 echo // false
```

- -l 或 -L
  从标准输入一次读取 num 行送给 Command 命令，-l 和-L 功能一样

```
cat ./01file.log | xargs -l 3 cho
```

- -x
  exit 的意思，如果有任何 Command 行大于 -s Size 标志指定的字节数，停止运行 xargs 命令，-L -I -n 默认打开-x 参数，主要是配合-s 使用.

- -P
  修改最大的进程数，默认是 1，为 0 时候为 as many as it can 。

### grep

> grep (global search regular expression(RE) and print out the line,全面搜索正则表达式并把行打印出来)是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。
> Unix 的 grep 家族包括 grep、egrep 和 fgrep。egrep 和 fgrep 的命令只跟 grep 有很小不同。egrep 是 grep 的扩展，支持更多的 re 元字符， fgrep 就是 fixed grep 或 fast grep，它们把所有的字母都看作单词，也就是说，正则表达式中的元字符表示回其自身的字面意义，不再特殊。linux 使用 GNU 版本的 grep。它功能更强，可以通过-G、-E、-F 命令行选项来使用 egrep 和 fgrep 的功能。

#### 常用用法

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

#### 练习

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

### ls -l 命令显示结果各段代表的意义

|  第一段  |              第二段              |        第三段        | 第四大 | 第五段 |           第六段           |             第七段             |    第八段    |
| :------: | :------------------------------: | :------------------: | :----: | :----: | :------------------------: | :----------------------------: | :----------: |
| 文件类型 | 所有者权限,所有组权限,其他人权限 | 硬连接数（子目录数） | 所有人 | 所有组 | 文件大小(默认以字节为单位) | 文件(目录)最近范围(修改)的时间 | 文件(目录)名 |

> 第三段，文件类型是文件时代表文件的硬链接书，文件类型是目录时代表目录下的子目录数

### linux 下查看文件和文件夹的大小

- df 可以查看一级文件夹大小、使用比例、档案系统及其挂入点，但对文件却无能为力。
- du 可以查看文件及文件夹的大小。

- 两者配合使用，非常有效。比如用 df 查看哪个一级目录过大，然后用 df 查看文件夹或文件的大小，如此便可迅速确定症结。

#### df 命令

- df 命令可以显示目前所有文件系统的可用空间及使用情形

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

##### df 命令全部参数使用说明

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

- 接下来的四个字段 Size、Used、Avail、及 Use% 分别是该分割区的容量、已使用的大小、剩下的大小、及使用的百分比。 FreeBSD 下，当硬盘容量已满时，您可能会看到已使用的百分比超过 100%，因为 FreeBSD 会留一些空间给 root，让 root 在档案系统满时，还是可以写东西到该档案系统中，以进行管理。

#### du：查询文件或文件夹的磁盘使用空间

- du 是用来查看文件和目录大小用的，和 df 略有区别, 默认情况下 du 只显示目录大小。

##### du 命令的参数使用说明

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

##### 示例

1. 查看/home 目录总大小

```
du -sh /home
du -sh #在/home目录中
```

2. 查看/home 目录下各个子目录大小,包含/home 目录本身和除目录外的其他文件大小

```
du -h
```

3. 查看/home 目录下各个子目录以及子目录的子目录（所有子目录的）大小和/home 下其他文件大小（不包含子目录文件和/home 目录）

```
du -h *
```

4. 查看 /home 目录下各个子目录的大小不包括子目录的子目录

```
du -h --max-depth=0 *
du -h --max-depth=1
```

5. 查看/home 目录下各个子目录的大小包括子目录但不包括 2 层一下的目录

```
du -h --max-depth=1 *
du -h --max-depth=2
```

6. 查看目录下各个子目录以及目录下所有文件的大小

```
du -ah ./ # 指定路径内的
du -ah    # 当前路径下的
```

### sort 排序命令

- sort 命令可以用于将文件内容排序并输出，也可以用于将某些查询命令的执行结果排序后输出
- sort 默认是按从小到大的顺序进行排序

#### sort 参数说明

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

#### sort 应用示例

1. 将文件夹中的子文件夹的子文件夹(不含 3 级文件夹及以下文件夹)按从大到小排序

```
du --max-depth=2 | sort-rn
du --max-depth=1 * | sort -rn
```

### ls 命令的实用示例

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

7. 路径后面加\*的作用

```
ls -ld /home/akd/  # 只显示akd目录具体信息
ls -ld /home/akd/* # 显示akd子目录的具体信息
ls -l /home/akd/*  # 显示akd下的所有目录和文件
```

8. 查看文件的 inode

```
ls -i
```

## Linux 硬链接和软链接

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

## Centos8 安装 gitlab

- [Centos8 安装 gitlab](https://help.aliyun.com/document_detail/52857.html)

## ffmpeg

```bash
# 查看视频信息
ffmpeg -i input.mp4
```

### 相关参数

- major brand: 主导品牌主要品牌各大品牌
- minor version: 次要版本
- compatible brands: 兼容的品牌
- bitRate: 比特率；位率；位速率: 码率
- maxrate:速率
- te_is_reencode
- encoder: n. 编码器
- duration: n. 持续，持续时间
- stream: 流信息
- metadata: n. 元数据

---
