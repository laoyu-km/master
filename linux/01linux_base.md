# 必须掌握的linux命令

## 常用系统工作命令

> 三个快捷键:
> ctrl+c -> 终止当前进程
> ctrl+d -> 表示键盘输入结束
> ctrl+l -> 清空当前终端中已有的内容

### man

|结构名称|代表意义|
|:---:|:---:|
|NAME|命令的名称|
|SYNOPSIS|参数的大致使用方法|
|DESCRIPTION|介绍说明|
|EXAMPLES|演示（附带简单说明）|
|OVERVIEW|概述|
|DEFAULTS|默认的功能|
|OPTIONS|具体的可用选项（带介绍）|
|ENVIRONMENT|环境变量|
|FILES|用到的文件|
|SEE ALSO|相关的资料|
|HISTORY|维护历史与联系方式|

### echo

echo命令用于在终端设备上输出字符串或变量提取后的值，语法格式为“echo [字符串] [$变量]”
```bash
echo puba.com

# 提取变量的值
echo $SHELL
```

### date

|参数|作用|
|:---:|:---:|
|%S|秒（00～59）|
|%M|分钟（00～59）|
|%H|小时（00～23）|
|%I|小时（00～12）|
|%m|月份（1~12）|
|%p|显示出AM或PM|
|%a|缩写的工作日名称（例如：Sun）|
|%A|完整的工作日名称（例如：Sunday）|
|%b|缩写的月份名称（例如：Jan）|
|%B|完整的月份名称（例如：January）|
|%q|季度（1~4）|
|%y|简写年份（例如：20）|
|%Y|完整年份（例如：2020）|
|%d|本月中的第几天|
|%j|今年中的第几天|
|%n|换行符（相当于按下回车键）|
|%t|跳格（相当于按下Tab键）|
** 注意: 需在强大的date命令后输入以“+”号开头的参数才能有效使用 -> 示例 "+%j"**

```bash
# 显示当前时间
date

# 设置日期时间格式
date "+%Y-%m-%d %H:%M:%S"

# 设置当前系统时间为2021年10月7日8点30分
date -s "20211007 8:30:00"

#查看今天是当年中第几天
date "+%j"
```

### timedatectl

> timedatectl命令用于设置系统的时间，英文全称为“time date control”，语法格式为“timedatectl [参数]”

|参数|作用|
|:---:|:---:|
|status|显示状态信息|
|list-timezones|列出已知时区|
|set-time|设置系统时间|
|set-timezone|设置生效时区|

```bash
# 查看系统时间与时区
timedatectl status

# 手动设置时区
timedatectl set-timezone Asia/Shanghai

# modify date
timedatectl set-time 2021-10-07

# modify time
timedatectl set-time 8:30

```

### reboot

```bash
reboot now;
```

### poweroff

```bash
poweroff now;
```

### wget

|参数|作用|
|:---:|:---:|
|-b|后台下载模式|
|-P|下载到指定目录|
|-t|最大尝试次数|
|-c|断点续传|
|-p|下载页面内所有资源，包括图片、视频等|
|-r|递归下载|

```bash
# 下载linuxprobe.pdf
wget https://www.linuxprobe.com/docs/LinuxProbe.pdf

# 递归下载www.test.com的内容到指定目录
wget -r -p -P https://www.test.com/ /home/akd/webtest/

```

### ps

> ps命令用于查看系统中的进程状态，英文全称为“processes”，语法格式为“ps [参数]”

|参数|作用|
|:---:|:---:|
|-a|显示所有进程（包括其他用户的进程）|
|-u|用户以及其他详细信息|
|-x|显示没有控制终端的进程|

- 5 种常见进程

|进程名|描述|
|:---:|:---:|
|R（运行）|进程正在运行或在运行队列中等待。|
|S（中断）|进程处于休眠中，当某个条件形成后或者接收到信号时，则脱离该   状态。|
|D（不可中断）|进程不响应系统异步信号，即便用kill命令也不能将其中断。|
|Z（僵死）|进程已经终止，但进程描述符依然存在, 直到父进程调用wait4()系统函数后将进程释放。|
|T（停止）|进程收到停止信号后停止运行。|

- 5种补充进程
除了上面5种常见的进程状态，还有可能是高优先级（<）、低优先级（N）、被锁进内存（L）、包含子进程（s）以及多线程（l）这5种补充形式。

- 进程常用查看方式
```bash
ps -aux
```






## 常用状态检测命令
## 查找定位文件命令
## 文本文件编辑命令
## 文件目录管理命令


