# 如何能够使用 Open AI 和 bing

## 1 实现魔法上网

### 1.1 搭建自己的魔法服务器

> 具体参考： https://github.com/githubvpn007/V2Ray

1. 购买 Hostwinds VPS 服务器, 用户名：yulaogong@outlook.com, 服务器类型：debain 9, 1 核, 1G

```bash
  # 会遇到的问题

  # 1. 服务器IP不能访问
  # 访问 https://www.vps234.com/ipchecker/ 测试IP, 检查国内和国外连通情况，全否可能是服务器问题

  # 2. 服务器IP被墙
  # hostwinds 提供修改IP, 可多次测试。如果实在不行换其他服务器

```

2. 服务器端安装 V2ray 服务端安装

```bash
# 安装 v2ray
bash <(curl -s -L https://git.io/v2ray.sh)

# 如果系统不能使用 curl 命令
# ubuntu/debian 系统安装 Curl 执行命令: apt-get update -y && apt-get install curl -y
# centos 系统安装 Curl 执行命令: yum update -y && yum install curl -y 安装好 curl、、

# 优化 V2Ray
v2ray bbr

# ---------- V2Ray 配置信息 -------------
#
#  地址 (Address) = 104.168.244.132
#
#  端口 (Port) = 43584
#
#  用户ID (User ID / UUID) = 7af3e0f4-773b-42c2-92ef-4a2b856b8a05
#
#  额外ID (Alter Id) = 0
#
#  传输协议 (Network) = tcp
#
#  伪装类型 (header type) = none
#
# ---------- END -------------
#
# V2Ray 客户端使用教程: https://233v2.com/post/4/
#
# 提示: 输入  v2ray url  可生成 vmess URL 链接 / 输入  v2ray qr  可生成二维码链接
#
# 免被墙..推荐使用JMS: https://getjms.com
```

### 1.2 PC 端实现魔法

- 下载 v2rayN-Core.zip: https://github.com/2dust/v2rayN/releases

- 解压后，运行 V2RayN.exe

- 添加对应协议的服务器：实际用的是 vmess 服务器

- 根据服务器端 V2Ray 安装后给出的信息填写客户端的服务器配置

- 设置代理模式即可 (一般用 pac 模式，但是打开 openAI 还是需要用自动选择代理模式或者全局代理模式)

### 1.3 Android 端实现魔法

- 下载 v2rayNG.pkg： https://github.com/2dust/v2rayNG/releases

- 在手机上进行安装

- 安装后打开 APP, 根据服务端的 V2Ray 配置，进行配置，即可使用

- 国内手机不能使用 chorome (实际原因是不能使用 google play) 的解决办法

```bash
# 1. 打开 "应用商店" APP, 打开设置
# 2. 更改 "国家和地区" -> 改为外国 (比如英国)
# 3. 更改成功后就可以在 "应用商店" 中下载国外的APP (如 facebook, tiktok 等)
# 4. 下载 "Gspace" APP 并安装， 在其中安装 Chrome 就可以使用了 (使用需要魔法)
# 5. 使用 Google Play: 在 Gspace 中的 APP 图标上长按，在弹出的菜单中点击升级，就可以进入 Google Play
```

### 1.4 Iphone 实现魔法

- 首先需要一个美国的 AppleID

```bash
不需要魔法申请美国的 AppleID
# 1. 申请一个境外邮箱 -> gmail, outlook -> gmail 申请方法： https://www.youtube.com/watch?v=SDbM7_hEZOg

# 2. 通过美区 Apple ID 注册页面: https://appleid.apple.com/account 来注册

# 3. 注册账号：fulaoyu@outlook.com, 注册时country必须选择美国

# 4. 双重验证后(邮箱验证，手机验证，手机可以使用国内手机), 跳出 Manage your AppleID 页面 -> 选择 Personal Information选项卡 -> 选择 Country/Region -> 点击 Change country or region

# 5. 上一步完成后会进入 payment method 页面，这是 payment method 能够选择 none ，就说明可以注册成功，否则必须要使用美国信用卡

# 6. 通过 美国地址生成器 生成免税州的个人信息, (注册免税州信息，可以通过购买礼品劵来进行购物，非免税州购买东西必须上税) 生成器地址、、：https://www.meiguodizhi.com/usa-address/oregon

# 7. IPhone 退出当前登陆，**在 Appstore 中登陆刚注册的AppleID,注意千万不能去设置中登陆，一旦让美国的AppleID访问到中国的ICloud,账号就会被停用**

# 8. 下载完需要的外网 APP 就退出美国的AppleID

# > 注意：此方法注册美国的 AppleID 手机不需要越狱，但是一定不能登陆Icloud, 美国ID 登陆中国 Icloud 必然被封

# > 详看： https://www.youtube.com/watch?v=Y51VMx4NOfk
```

- 使用美国的 AppleID 登陆 AppStore, 下载 OneClick App,

- 下载完成后，退出美国的 ID, 使用 oneclick 进行配置，配置按照服务器配置来填，就可以

- 注册 google 邮箱 ，手机号不能用的问题

```bash

```

### 1.5 Ubuntu22.04 魔法

```bash
# 安装 V2Ray 内核 参考： https://v2raya.org/docs/prologue/quick-start/
# V2Ray 安装参考：https://github.com/v2fly/fhs-install-v2ray
# v2rayA 提供的镜像脚本（推荐）
curl -Ls https://mirrors.v2raya.org/go.sh | sudo bash

# 安装后可以关掉服务，因为 v2rayA 不依赖于该 systemd 服务
sudo systemctl disable v2ray --now

# 安装 v2rayA
# 下载 V2rayA: https://github.com/v2rayA/v2rayA/releases 下载.bed 后缀文件
# 安装 V2rayA
sudo apt install /path/download/installer_debian_xxx_vxxx.debsudo apt install v2raya

# 启动 v2rayA / 设置 v2rayA 自动启动
sudo systemctl start v2raya.service
sudo systemctl enable v2raya.service

# 快速使用
# 如果通过 2017 端口 如 http://localhost:2017 可以访问 UI 界面， 说明安装成功，否则则是服务没有启动，或者服务有问题
# 进入 UI, 第一次进入页面时，你需要创建一个管理员账号，请妥善保管你的用户名密码，如果遗忘，使用sudo v2raya --reset-password命令重置
# 创建或者导入节点，根据魔法服务器给出的配置进行填写或导入
# 导入成功后，节点将显示在 SERVER 或新的标签中
# 切换到该标签页，选择一个或多个节点连接。不建议选择过多的节点，6 个以内为佳。
# 选择要使用的节点，在节点列右边点击 select, 在未启动服务时，连接的节点呈现柚红色。我们在左上角点击相应按钮启动服务。
# 启动服务后，所连接的节点呈现蓝色，左上角的图标也显示为蓝色的正在运行，代表服务启动成功

# 配置代理
# 默认情况下 v2rayA 会通过核心开放 20170(socks5), 20171(http), 20172(带分流规则的http) 端口
# 如果是需要为局域网中的其他机器提供代理，请在设置中打开“局域网共享”，并检查防火墙开放情况。
# 透明代理: 是 v2rayA 推荐的方法, 
# Transparent Proxy/System Proxy: 选择 On: Proxy except CN Sites
# Transparent Proxy/System Proxy Implementation: redirect
# Traffic Splitting Mode of Rule Port: Proxy except CN Sites
# Prevent DNS Spoofing: Off
# Special Mode: supervisor
# TcpFastOpen: Keep Default
```

## bing

- 魔法上网成功后，注册国外的邮箱，注册时国家和地区选择外国，这里选的是日本

- account: fulaoyu@outlook.com

- 就可以开始使用 bing 的 chat 功能

## openai

#### 注册需注意

- 前提： 能魔法上网

- 在 OpenAI 上注册账户或者用 google 邮箱登陆后，需要国外手机号进行短信验证

- 在 https://sms-activate.org/cn/ 上购买虚拟手机号短信验证，账号：laoyugou@gmail.com

#### 账户

- account: laoyugou@gmail.com

- password: 常用的那个

- API-Key: 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

## 其他平台的 AI

### 微软的 AI

- Bing 的 chat

- Copilot & CopilotX

### google 的 AI

- bard

### 百度的 AI

- 文心一言

### 华为的 AI

- 盘古
