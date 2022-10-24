# linux Recitation

##  command recitation

```bash
# 1 强大好用的SHELL
#a：通过上下方向键来调取过往执行过的Linux命令；
#b：命令或参数仅需输入前几位就可以用Tab键补全；
#c：具有强大的批处理脚本；
#d：具有实用的环境变量功能。

# 2 执行查看帮助命令
# NAME	命令的名称
# SYNOPSIS	参数的大致使用方法 -> synopsis: 书、剧本或电影等的）概要，摘要，梗概；
# DESCRIPTION	介绍说明
# EXAMPLES	演示（附带简单说明）
# OVERVIEW	概述
# DEFAULTS	默认的功能
# OPTIONS	具体的可用选项（带介绍）
# ENVIRONMENT	环境变量
# FILES	用到的文件
# SEE ALSO	相关的资料
# HISTORY	维护历史与联系方式
man command

command --help

command -h

# ==============================================================

# 常用系统工作命令

# 1. echo
echo jayden james
echo $SHELL

# 2. date
date

date "%Y-%m-%d %H:%M:%S"

date -s "20221008 10:30:00" # 设置当前时间为20221008 10:30:00

date "+%j" # 查看今天是当年的第几天

# 3. reboot
reboot

# 4. poweroff
poweroff

#5. wget
-b -> back
-P -> 

# ==============================================================

# 4 系统状态检测命令
# 5 工作目录切换命令
# 6 文本文件编辑命令
# 7 文件目录管理命令
# 8 打包压缩与搜索命令

```

---

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
- duration: n.  持续，持续时间
- stream: 流信息
- metadata: n.  元数据

--- 

## Ubuntu question

### Ubuntu22.04 上启用ssh

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

### 安装 openssh-server 提示依赖未安装如何解决

1. 打开设置中的Software&update

2. 将Ubuntu Software的如下四个选项勾选，分别是
   - Canonical支持的免费和开源软件
   - 社区维护的免费和开源软件
   - 有版权和合法性问题的软件
   - 源代码

3. 选择合适站点

4. Terminal执行更新

   ```bash
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get dist-upgrade
   ```

### update, upgrade, dist-upgrade 的区别

- update：当执行apt-get update时，update重点更新的是来自软件源的软件包的索引记录（即index files）。

- upgrade：当执行apt-get upgrade时，upgrade是根据update更新的索引记录来下载并更新软件包。

- dist-upgrade:当执行apt-get dist-upgrade时，除了拥有upgrade的全部功能外，dist-upgrade会比upgrade更智能地处理需要更新的软件包的依赖关系。

- 执行顺序: update -> upgrade -> dis-upgrade

### WIN10系统下vmware-vmx.exe进程CPU占用率高、进程无法杀掉的问题解决

- 原因： 是由于VMware和Hyper-V不兼容导致

- 解决办法： 关闭windows10的 Hyper-V 服务

- Win10专业版解决方法：
  1. 控制面板—程序——打开或关闭Windows功能，取消勾选Hyper-V，确定禁用Hyper-V服务。
  2.之后重新启动计算机，再运行VM虚拟机即可。

- Win10家庭版解决方法：（本人的）
  1. 按下WIN+R打开运行，然后输入services.msc回车；
  2. 在服务中找到 HV主机服务，禁用

- 禁止服务后， 以管理员权限运行cmd： bcdedit /set hypervisorlaunchtype off

- 最后重启电脑

### 解决虚拟机上安装Ubuntu显示太小的问题

- 安装 VMware Tools

1. 关闭虚拟机 -> 右键虚拟机选项卡 -> 设置 -> CD/DVD(SATA) -> 使用ISO映像文件 -> 浏览 -> C:\Program Files (x86)\VMware\VMware Workstation\linux.iso

2. 打开虚拟机 -> 点击 VMware Workstation 虚拟机 -> 重新安装vmware tools -> 在虚拟机的 cd 中就会加载 linux.iso -> 拷贝其众的虚拟机安装文件 ***.pl 到自己指定的目录，这里是 /home/laoyu/Downloads ->转到/home/laoyu/Downloads 执行 `sudo ./***.pl` 进行安装

3. 安装完成后重启虚拟机

4. 虚拟机中点击 setting -> displayer -> 选择合适的分辨率

### Ubuntu22.04 安装 ffmpeg 提示 The following packages have unmet dependencies 错误

- 原因: Ubuntu20.04更换阿里云源后安装软件都会报错：The following packages have unmet dependencies, 大概是ubuntu本身的源比较版本较老，而阿里云的源比较新，因此版本不匹配造成依赖的库不匹配，所以只要将阿里云的源换回Ubuntu官方源

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

### Ubuntu22.04 虚拟机挂载本地硬盘的方法

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