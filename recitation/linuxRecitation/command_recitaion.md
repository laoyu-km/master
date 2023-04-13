# linux Recitation

## 必须记住的命令

### 快捷命令

- Tab: 补足命令，文件名

- Ctrl+c -> 终止当前进程的运行

- Ctrl+d： 键盘输入结束

- Ctrl+l：清空当前终端中已有的内容（相当于清屏操作）

- Ctrl+u : 剪切(删除)光标处到行首的所有字符

- Ctrl+k : 剪切(删除)光标处到行尾的所有字符

- 如果有些命令在执行时不断地在屏幕上输出信息，影响到后续命令的输入，则可以在执行命令时在末尾添加一个&符号，这样命令将进入系统后台来执行

  ```bash
    # 例如
    nice -n 10 vi&
  ```

### 常用系统工作命令

47.108.63.89

- 1. echo:

  ```bash
    echo Jayden James
    echo $variable
  ```

- 2. date:

  ```bash
    date #当前系统时间
    date "+%Y-%m-%d %H:%M:%s" # 按格式查看当前系统时间
    date -s "20230327 8:30:00" # 设置当前系统时间
    date "+%j" # 查看今天是当年中的第几天
  ```

- 3. timedatectl

  ```bash
    timedatectl status #查看系统时间与时区
    timedatectl list-timezones # 列出已知时区
    timedatectl set-timezone Asia/Shanghai # 设置生效时区
    timedatectl set-time 8:30 # 设置系统时间
  ```

- 4. reboot

- 5. poweroff

- 6. wget

  ```bash
    wget -b # ( background )后台下载模式
         -P # ( prefix --directory-prefix=prefix )下载到指定目录
         -t # ( tries=number ) 最大尝试次数
         -c # ( continue )断点续传
         -p # ( --page-requisites )下载页面内所有资源，包括图片、视频等
         -r # ( recursive )递归下载
         -O # (--output-document=file)重命名保存

    wget  https://www.linuxprobe.com/docs/LinuxProbe.pdf # 下载单一文件
    wget -r -p https://www.linuxprobe.com # 下载www.linuxprobe.com网站内的所有页面数据以及文件
  ```

- 7. ps: processes

  ```bash
    ps -a #显示所有进程（包括其他用户的进程）
    ps -u #用户以及其他详细信息
    ps -x #显示没有控制终端的进程
    ps -l #查看当前登录产生了哪些进程 & 长格式显示更加详细的信息
    ps -e #显示所有进程

    ps -aux  = ps -le

   # 进程状态
   #   R（run: 运行）：进程正在运行或在运行队列中等待。
   #   S（sleep: 中断）：进程处于休眠中，当某个条件形成后或者接收到信号时，则脱离该   状态。
   #   D（dead: 不可中断）：进程不响应系统异步信号，即便用kill命令也不能将其中断。
   #   Z（zobie: 僵死）：进程已经终止，但进程描述符依然存在, 直到父进程调用wait4()系统函数后将进程释放。
   #   T（stop: 停止）：进程收到停止信号后停止运行。
   #   < : 高优先级
   #   N : 低优先级
   #   L : 被锁进内存
   #   s : 包含子进程
   #   l : 多线程
  ```

- 8. pstree: process tree, 以树状图的形式展示进程之间的关系

- 9. top: 动态地监视进程活动及系统负载等信息(类似 Windows 的任务管理器)

  ```bash
    #top 命令执行结果解析

    #  1行：系统时间、运行时间、登录终端数、系统负载（3个数值分别为1分钟、5分钟、15分钟内的平均值，数值越小意味着负载越低）。

    #  第2行：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数。

    #  第3行：用户占用资源百分比、系统内核占用资源百分比、改变过优先级的进程资源百分比、空闲的资源百分比等。其中数据均为CPU数据并以百分比格式显示，例如“99.9 id”意味着有99.9%的CPU处理器资源处于空闲。

    #  第4行：物理内存总量、内存空闲量、内存使用量、作为内核缓存的内存量。
      第5行：虚拟内存总量、虚拟内存空闲量、虚拟内存使用量、已被提前加载的内存量
  ```

- 10. nice: (niceness -> 友善度、谦让度, 表示进程的优先级，也即进程的友善度) 调整进程的优先级, 语法格式为“nice 优先级数字 服务名称”

  ```bash
  nice # 没有选项时，输出值表示系统进程缺省的niceness值，一般为0

  nice vi& # 当nice命令中没有给出具体的niceness值时，默认为10, 设置vi进程的niceness为10

  nice -n 10 vi& # niceness值的范围-20~19，小于-20或大于19的值分别记为-20和19

  nice -n -20 bash # 如果设置的niceness值为负，那么必须要有管理员权限, 当niceness为负时，意味着该进程要抢占其他进程的资源，必须要有权限才行；如果niceness为正，即表示谦让度高，这对其他进程来说是喜闻乐见的，也当然就不用权限认证了

  ps -l # 查看进程的niceness值， NI列即表示进程的niceness值。vi进程对应的NI值正好为刚设置的10， PRI表示进程当前的总优先级，值越小表示优先级越高，由进程默认的PRI加上NI得到，即PRI(new) = PRI(old) + NI，NI即niceness的值只是进程优先级的一部分，不能完全决定进程的优先级，但niceness值的绝对值越大，效果越显著

  nice --adjustment=-20 vi& # --adjustment选项和-n选项的效果是一样的，在等号右边设置对应的niceness值,

  nice -12 vi& # 直接使用“-N”也可以设置niceness值, 将vi的niceness值设置为12, 如果是nice --12 vi&的话，则设置niceness的值为-12。这很容易混淆，建议使用-n或--adjustment选项，不易出错

  nice --help
  nice --version
  ```

- renice -> renice [优先等级][-g<程序群组名称>...][-p<程序识别码>...][-u <用户名称>...]

  > nice 命令是为即将运行的进程设置 niceness 值.
  > renice 用于改变正在运行的进程的 niceness 值, 字面意思即重新设置 niceness 值，进程启动时默认的 niceness 值为 0，可以用 renice 更新

  ```bash
  renice -5 -p 5200  #将PID为5200的进程的niceness设为-5
  renice -5 -u jayden   #将属于用户xie的进程的niceness设为-5
  renice -5 -g group1 #将属于group1组的程序的niceness设为5
  ```

- 11. pidof -> 用于查询某个指定服务进程的 PID 号码值

  ```bash
    pidof sshd # 查询本机上sshd服务程序的PID, 每个进程的进程 PID 是唯一的
  ```

- 12. kill -> 终止某个指定 PID 值的服务的进程

  ```bash
  kill 2156

  kill -9 2156 # 有时系统会提示进程无法被终止，此时可以加参数-9，表示最高级别地强制杀死进程
  ```

- 13. killall -> 用于终止某个指定名称的服务所对应的全部进程

  ```bash
  pidof httpd
  killall httpd
  pidof httpd
  ```

### 系统状态检测命令

- 1. ifconfig (interface config) -> 获取网卡配置与网络状态等信息

  ```bash
  ifconfig： 主要查看的就是网卡名称、inet参数后面的IP地址、ether参数后面的网卡物理地址（又称为MAC地址），以及RX、TX的接收数据包与发送数据包的个数及累计流量
  ```

- 2. uname (unix name) -> 用于查看系统内核版本与系统架构等信息

  ```bash
  uname -a # 使用uname命令时，一般要固定搭配上-a参数来完整地查看当前系统的内核名称、主机名、内核发行版本、节点名、压制时间、硬件名称、硬件平台、处理器类型以及操作系统名称等信息

  cat /etc/redhat-release # 如果要查看当前系统版本的详细信息，则需要查看redhat-release文件

  cat /etc/centos-release
  ```

- 3. uptime -> 查看系统的负载信息

  ```bash
  uptime # 可以显示当前系统时间、系统已运行时间、启用终端数量以及平均负载值等信息。平均负载值指的是系统在最近1分钟、5分钟、15分钟内的压力情况（下面加粗的信息部分），负载值越低越好
  ```

- 4. free -> 显示当前系统中内存的使用量

  ```bash
  free -h # 使用free命令时，可以结合使用-h参数以更人性化的方式输出当前内存的实时使用量信息, 如果不使用-h（易读模式）查看内存使用量情况，则默认以KB为单位。这样一来，服务器如果有几百GB的内存，则换算下来就会是一大长串的数字

  free -h -s 3 # 每隔 3 秒输出一次内存的使用情况

  # -b: 以 Byte（字节）为单位，显示内存使用情况。
  # -k: 以 KB 为单位，显示内存使用情况，此选项是 free 命令的默认选项。
  # -m: 以 MB 为单位，显示内存使用情况。
  # -g: 以 GB 为单位，显示内存使用情况。
  # -t: 在输出的最终结果中，输出内存和 swap 分区的总量。
  # -o: 不显示系统缓冲区这一列。
  # -s: 间隔秒数,根据指定的间隔时间，持续显示内存使用情况。
  ```

- 5. who -> 查看当前登入主机的用户终端信息, 远程用户，还会显示出来访者的 IP 地址

- 6. last -> 调取主机的被访记录, Linux 系统会将每次的登录信息都记录到日志文件中，如果哪天想翻阅了，直接执行这条命令就行

- 7. ping -> 测试主机之间的网络连通性

  ```bash
  ping -c 4 www.163.com
  ping -c 5 192.163.21.1

  # -c (count): 总共发送次数
  # -s (size): packetsize
  # -l (preload):
  # -I (interface): 指定网卡名称
  # -i (interval): 每次间隔时间（秒）
  # -W: 最长等待时间（秒）
  ```

- 8. tracepath -> 显示数据包到达目的主机时途中经过的所有路由信息

  ```bash
  tracepath www.baidu.com
  ```

- 9. netstat (network status) -> 用于显示如网络连接、路由表、接口状态等的网络相关信息

  ```bash
  netstat -a
  netstat -i

  # -a: 显示所有连接中的Socket
  # -p: 显示正在使用的Socket信息
  # -t: 显示TCP协议的连接状态
  # -u: 显示UDP协议的连接状态
  # -n: 使用IP地址，不使用域名
  # -l: 仅列出正在监听的服务状态
  # -i: 显示网卡列表信息
  # -r: 显示路由表信息
  ```

- 10. history -> 显示执行过的命令历史

  ```bash
  history
  history -c

  # 执行history命令能显示出当前用户在本地计算机中执行过的最近1000条命令记录。如果觉得1000不够用，可以自定义/etc/profile文件中的HISTSIZE变量值

  # 在使用history命令时，可以使用-c参数清空所有的命令历史记录。还可以使用“!编码数字”的方式来重复执行某一次的命令

  # 历史命令会被保存到用户家目录中的.bash_history文件中。Linux系统中以点（.）开头的文件均代表隐藏文件，这些文件大多数为系统服务文件，可以用cat命令查看其文件内容
  ```

- 11. sosreport -> 用于收集系统配置及架构信息并输出诊断文档

  ```bash
  sosreport

  # 当Linux系统出现故障需要联系技术支持人员时，大多数时候都要先使用这个命令来简单收集系统的运行状态和服务配置信息，以便让技术支持人员能够远程解决一些小问题
  ```

### 查找定位文件命令

- 1. pwd (print working directory)

- 2. cd (change directory)

  ```bash
  cd - # 返回到上一次的目录
  cd ~ # 切换到用户的家目录
  ```

- 3. ls (list)

  ```bash
  ls -al
  ls -ld /etc # 查看目录属性信息
  ls -s # 查看文件大小
  ls -lh/-sh # 人行化查看
  ```

- 4. tree -> 以树状图的形式列出目录内容及结构

- 5. find -> 按照指定条件来查找文件所对应的位置

  ```bash
  # # find pathname -options [-print, -exec / -ok command {}\;]
  find ./ -name 'jayden*' -type f -exec cp -a {} ./findtest/ \;
  find ./ -name 'jadyen*' -type b -ok cp -a {} ./findtest/ \;

  # # find 参数
  # # -name: 匹配名称
  find ./ -name 'jayden'
  find ./ -name 'jay*'
  find ./ -name 'jayd??'
  find ./ -name 'jay[a-z]'
  find ./ -name 'j[a-z]yden'

  # # -iname: 匹配名称，不区分大小写
  find -iname 'jayden' # output -> jayden Jayden

  # # -regex: 正则，搜索应用于整个路径
  find -regex 'jayden' # 无结果
  find -regex '.*jayden.*' # -regex 搜索'jayden'无结果，因为实际匹配的是 /home/laoyu/Documents/jayden, -regex 的匹配包含了路径，所以要使用 '.*jadyen', -regex 需跟正则表达式，如果是 '*jayden' 也是无结果

  # # -iregex: 同上，不区分大小写
  find -iregex '.*jayden.*'

  # # -perm: 匹配权限（mode为完全匹配，-mode为包含即可）
  find ./ -perm 777 # 查找777权限的文件
  find ./ -perm -4000 -print # 搜索权限中包括SUID权限的所有文件

  # # -user: 匹配所有者
  find ./ -user laoyu

  # # -uid: 匹配用户ID
  id -u username # get uid -> 1000
  find ./ -uid 1000

  # # -group: 匹配所有组
  find ./ -group 1000

  # # -gid: 匹配组ID
  id -g username # get gid -> 1000
  find ./ -gid 1000

  # # -mtime: -n +n	匹配修改内容的时间（-n指n天以内，+n指n天以前）
  find ./ -mtime -3
  find ./ -mtime +3

  # # -atime: -n +n	匹配访问文件的时间（-n指n天以内，+n指n天以前）
  find ./ -atime -3
  find ./ -atime +3

  # # -ctime: -n +n	匹配修改文件权限的时间（-n指n天以内，+n指n天以前）
  find ./ -ctime -3
  find ./ -ctime +3

  # # -mmin: -n +n	匹配修改内容的时间（-n指n分钟以内，+n指n分钟以前）
  find ./ -mmin -30
  find ./ -mmin +30

  # # -amin: -n +n	匹配访问文件的时间（-n指n分钟以内，+n指n分钟以前）
  find ./ -amin -30
  find ./ -amin +30

  # # -cmin: -n +n	匹配修改文件权限的时间（-n指n分钟以内，+n指n分钟以前）
  find -cmin +30
  find -cmin -30

  # # -nouser: 匹配无所有者的文件
  # # -nogroup: 匹配无所有组的文件
  # # -newer: 匹配比文件f1新但比f2旧的文件
  find ./ -newer f1 ! -newer f2

  # # -type: b(block)/d(dir)/c(character)/p(pipe)/l(link)/f(file)/s(socket)	匹配文件类型（后面的字幕字母依次表示块设备、目录、字符设备、管道、链接文件、文本文件）
  find ./ -type f o -type b

  # # -size: 匹配文件的大小（+50KB为查找超过50KB的文件，而-50KB为查找小于50KB的文件）
  dd if=/dev/zero of=./jayden.log bs=2MB count=5
  dd if=/dev/zero of=./jayden.log2 bs=20MB count=1
  find ./ -size +10M
  find ./ -size -10M

  # # -prune: 忽略某个目录

  # # -depth:

  # # -maxdepth: 查找的子目录最大深度，1 为当前目录，数字越大越深入
  find ./ -maxdepth
  find ./ -maxdepth 1 ! -newer jayden.log -size -2M -exec rm {} \;

  # # -mindepth: 查找的子目录最小深度，1 为当前目录，数字越大越深入
  find ./ -mindepth

  # # -exec: …… {}\;	后面可跟用于进一步处理搜索结果的命令
  find ./ -name 'jayden*' -exec mv {} ./test/ \;

  # # -ok: …… {}\;	和-exec的作用相同，只不过以一种更为安全的模式来执行该参数所给出的shell命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行
  find ./ -name 'jayden*' -ok cp -a {} ./test/ \;

  # # find命令的集合运算
  # # -a 表示求两个条件的交集 与
  find ./ -cmin +600 -a -size -5M -exec rm {} \; # 当前文件夹下删除10小时之前创建的小于5M的文件
  find ./ -maxdepth 1 -name 'elle[1-3]*' -a -name 'elle[4-6]*'; # 无结果，因为无交集

  # # -o 表示求两个条件的并集 或
  find ./ -maxdepth 1 -name 'elle[1-3]*' -o -name 'elle[4-6]*' -exec rm {} \; # 查找到 elle1-6, 但是删除只删除 -o 后面的部分

  # # ! 表示求条件的补集 非
  find ./ -maxdepth 1 ! -newer jayden.log -size -2M -exec rm {} \; # 删除当前文件夹下比 jayden.log 创建时间长且小于2M的文件

  # # find 操作参数, 这类参数都用在查找表达式最后
  # # -delete
  find ./ -maxdepth 1 -name 'elle*' -delete

  # # -print
  find ./ -maxdepth 1 ! -newer jayden.log -print

  # # -ls
  find ./ -name 'jayden*' -ls

  # # -fls 将查找的结果以长格式保存到文件中
  find ./ -name 'jadyen' -fls ./jayden.log # 保存到jayden.log中

  # # find 和xargs 删除文件的坑
  # # 有三个文件：lust jayden.txt 'lust jayden.txt' , 需要删除.txt文件
  find ./ -type f -name '*.txt' | xargs rm -rf # 删除了lust 和 jayden.txt
  # # xargs默认将空格作为分隔符，所以不太适合处理文件名，因为文件名可能包含空格, 所以将 'lust jayden.txt' 看做了 lust 和 jayden.txt

  find ./ -type f -name '*txt' -print0 | xargs -0 rm -rf # 这样就不会出问题
  # # -print0: 指定输出的文件列表以null分隔
  # # xargs -0 表示用null当作分隔符
  ```

  - 6. locate

  ```bash
  # #使用find命令进行全盘搜索虽然更准确，但是效率有点低, 试试locate
  # #在使用locate命令时，先使用updatedb命令生成一个索引库文件
  updatedb

  locate filename
  ```

  - 7. whereis

  ```bash
  # #whereis命令用于按照名称快速搜索二进制程序（命令）、源代码以及帮助文件所对应的位置，语法格式为“whereis命令名称”
  whereis ls
  whereis xargs
  ```

  - 8. which

  ```bash
  # #which命令用于按照指定名称快速搜索二进制程序（命令）所对应的位置，语法格式为“which命令名称”
  which locate
  which whereis
  ```

### 文本文件编辑命令

===

## 名词解释

- TTY: tty1 ~ tty7 代表本地控制台终端（可以通过 Alt+F1 ~ F7 快捷键切换不同的终端），tty1~tty6 是本地的字符界面终端，tty7 是图形终端。pts/0 ~ 255 代表虚拟终端，一般是远程连接的终端，第一个远程连接占用 pts/0，第二个远程连接占用 pts/1，依次増长

- RSS: 代表实际物理内存

- MTU: 最大传输单元

### ps 命令输出信息的含义

- F: 进程标志，说明进程的权限，常见的标志有两个: 1：进程可以被复制，但是不能被执行； 4：进程使用超级用户权限； S 进程状态。具体的状态和"psaux"命令中的 STAT 状态一致；
- UID: 运行此进程的用户的 ID；
- PID: 进程的 ID；
- PPID: 父进程的 ID；
- C: 该进程的 CPU 使用率，单位是百分比；
- PRI: 进程的优先级，数值越小，该进程的优先级越高，越早被 CPU 执行；
- NI: 进程的优先级，数值越小，该进程越早被执行；
- ADDR: 该进程在内存的哪个位置；
- SZ: 该进程占用多大内存；
- WCHAN: 该进程是否运行。"-"代表正在运行；
- TTY: 该进程由哪个终端产生；
- TIME: 该进程占用 CPU 的运算时间，注意不是系统时间；
- CMD: 产生此进程的命令名；

### free 命令输出信息的含义

Mem: 行(第二行)是内存的使用情况。
Swap: 行(第三行)是交换空间的使用情况。
total: 列显示系统总的可用物理内存和交换空间大小。
used: 列显示已经被使用的物理内存和交换空间。
free: 列显示还有多少物理内存和交换空间可用使用。
shared: 列显示被共享使用的物理内存大小。
buff/cache: 列显示被 buffer 和 cache 使用的物理内存大小。
available: 列显示还可以被应用程序使用的物理内存大小。

#### buff/cache

##### buff

- buff: buffer 在操作系统中指 buffer cache， 中文一般翻译为 “缓冲区”

- 扇区： 扇区是设备的最小寻址单元，也叫 “硬扇区” 或 “设备块”

- 块: 块是操作系统中文件系统的最小寻址单元，也叫 “文件块” 或 “I/O 块”

- 每个块包含一个或多个扇区，但大小不能超过一个页面，所以一个页可以容纳一个或多的块

- 当一个块被调入内存时，它要存储在一个缓冲区中。每个缓冲区与一个块对应，它相当于是磁盘块在内存中的表示

- buffer cache 只有块的概念而没有文件的概念，它只是把磁盘上的块直接搬到内存中而不关心块中究竟存放的是什么格式的文件

##### cache

- cache 在操作系统中指 page cache, 中文一般翻译为 “页高速缓存”

- 主要用来减少对磁盘的 I/O 操作。具体地讲，是通过把磁盘中的数据缓存到物理内存中，把对磁盘的访问变为对物理内存的访问

- 缓存中的页来自对普通文件、块设备文件(这个指的就是 buffer cache 呀)和内存映射文件的读写

- 可以这样理解：当内核要读一个文件(比如 /etc/hosts)时，它会先检查这个文件的数据是不是已经在页高速缓存中了。如果在，就放弃访问磁盘，直接从内存中读取。这个行为称为缓存命中。如果数据不在缓存中，就是未命中缓存，此时内核就要调度块 I/O 操作从磁盘去读取数据。然后内核将读来的数据放入页高速缓存中。

- 这种缓存的目标是文件系统可以识别的文件(比如 /etc/hosts)

##### buff & cache

- 无论是缓冲区还是页高速缓存，它们的实现方式都是一样的。缓冲区只不过是一种概念上比较特殊的页高速缓存罢了。那么为什么 free 命令不直接称为 cache 而非要写成 buff/cache？ 这是因为缓冲区和页高速缓存的实现并非天生就是统一的。在 linux 内核 2.4 中才将它们统一。更早的内核中有两个独立的磁盘缓存：页高速缓存和缓冲区高速缓存。前者缓存页面，后者缓存缓冲区。

#### free 与 available

- free： 真正尚未被使用的物理内存数量

- available: 是从应用程序的角度看到的可用内存数量

- Linux 内核为了提升磁盘操作的性能，会消耗一部分内存去缓存磁盘数据，就是我们介绍的 buffer 和 cache。所以对于内核来说，buffer 和 cache 都属于已经被使用的内存。当应用程序需要内存时，如果没有足够的 free 内存可以用，内核就会从 buffer 和 cache 中回收内存来满足应用程序的请求

- 所以从应用程序的角度来说，available = free + buffer + cache。请注意，这只是一个很理想的计算方式，实际中的数据往往有较大的误差

#### swap space (交换空间)

- swap space 是磁盘上的一块区域，可以是一个分区，也可以是一个文件, 所以具体的实现可以是 swap 分区也可以是 swap 文件

- 当系统物理内存吃紧时，Linux 会将内存中不常访问的数据保存到 swap 上，这样系统就有更多的物理内存为各个进程服务，而当系统需要访问 swap 上存储的内容时，再将 swap 上的数据加载到内存中，这就是常说的换出和换入。交换空间可以在一定程度上缓解内存不足的情况，但是它需要读写磁盘数据，所以性能不是很高。

- 类似 Windows 上的虚拟内存

#### /proc/meminfo 文件

- 其实 free 命令中的信息都来自于 /proc/meminfo 文件

## questions

### 1. 命令中 {} 的用法

```bash
echo {01..10} # 01 02 03 ... 10
```

### 2. Linux 命令通配符

```bash
# *
# ?
# [] -> 匹配中括号任意一个字符，如[ljk]代表匹配一个l,j或k的字符
# [-] -> 匹配范围，[0-9]代表匹配任一个数字
# [0-9,A-Z] -> 匹配两个集合中的任一个
# [*] -> 匹配不是中括号的一个字符
```

### 3. 批量创建和修改文件或目录

```bash
#
# 批量创建文件
touch `seq 10`
touch Jayden-{A..N}

# 批量创建文件夹
mkdir $(echo {a..g})
mkdir {h..n}

# 脚本批量创建 (waiting)

# 批量修改名字
# rename
touch Jayden-{A..G}
rename Jayden Alexis ./Jayden??

# ** ls 和 awk 实现批量改名
ls /home/fred/linux-* | awk -F'-' '{print "mv "$0" "$1$2}' | /bin/bash
```

### 4. 如何查看 uid 和 gid

```bash
# 1. check /etc/passwd
cat /etc/passwd | grep username

# 2. id command
id # 查看当前用户的 uid & gid
id username
id root
id -g # only gid
id -u # only uid

# -a 忽略，兼容其它版本
# -Z, –context 只输出当前用户的安全上下文
# -g, –group 只输出有效的GID
# -G, –groups 输出所有的GID
# -n, –name 对于 -ugG 输出名字而不是数值
# -r, –real 对于 -ugG 输出真实ID而不是有效ID
# -u, –user 只输出有效UID
# –help 输出帮助后退出
# –version 输出版本信息后退出
```

### 3. 如何创建指定大小的文件

```bash
# fallocate 命令生成方法：
fallocate -l 10000000 test.log

# truncate 命令生成方法：
truncate -s 25M test.log

# dd 命令生成方法： if: input file; of: output file; bs: block size;
dd if=/dev/urandom of=test.log bs=10MB count=1
dd if=/dev/zero of=test.log bs=10MB count=1

# head 命令生成方法：
head -c 10MB /dev/urandon > test.log
head -c 10M /dev/zero > test.log
```

### 4. CentOS8 如何添加用户的 sudo 权限

```bash
# CentOS8 默认不给用 sudo 权限
# 1. 使用root登陆
su root

# 2. 修改sudouers配置文件
visudo # 好处是在添加规则不太准确时，保存退出时会提示给我们错误信息；配置好后，可以用切换到您授权的用户下，通过sudo -l 来查看哪些命令是可以执行或禁止的
vi /etc/sudoers

# 3. 打开sudoers文件后，找到语句root ALL = (ALL) ALL这一行，在此行的下面新增一行语句：XXX ALL = (ALL)ALL。

# sudoers 文件的简单说明
laoyu   ALL=(ALL)   ALL # 允许用户 laoyu 执行 sudo 命令（需要输入密码）
%laoyu   ALL=(ALL)   ALL #允许用户组 laoyu 执行 sudo 命令（需要输入密码）
%laoyu   ALL=(ALL)   NOPASSWD: ALL #允许用户组 laoyu 执行 sudo 命令（无需输入密码）
laoyu   ALL=(ALL)   NOPASSWD: ALL #允许用户 laoyu 执行 sudo 命令（无需输入密码）

```

### 5. CentOS8 虚拟机 报 kernel:watchdog: BUG: soft lockup - CPU#0 stuck for 23s! [systemd:1]

- 控制面板\硬件和声音\电源选项 -> 选择电源按钮的功能 -> 更改当前不可用的设置 -> 关闭启用快速启动 ( 实测有效 )

### 6. The server has disconnected with an error

- SecureCRT 连接 CentOS 虚拟机时的 error 全文：The server has disconnected with an error. Server message reads: A protocol error occurred. Change of username or service not allowed: (akd,ssh-connection) -> (laoyu,ssh-connection)

- 产生原因： 设置中的用户名和你登录时候输入的用户名不相符

- 解决： Options -> Session Options -> SSH2 -> 修改 Username 为需要登陆的 username
