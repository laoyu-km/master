# Axure 9

## english words

- subscript: 下标
- publish： v. 出版，发行（书、杂志等）；
- outline： n. 轮廓，外形；轮廓图，草图；提纲，大纲；梗概，要点；
- arrange： v. 安排，筹备；整理，布置，排列；改编；商定
- interaction： n. 互动，交流；相互影响，相互作用
- repeater： n. [通信] 中继器；[通信] 转发器；重复者
- horizontal： adj. 水平的 -> horizontal line 水平线
- descending:  adj. 递降的
- ascending:  adj. 上升的，增长的；升（序）的
- colunm

## 使用注意

- 发文件给别人不要发原文件， 发布预览文件， 把整个预览文件夹打包，发给别人, 查看时点击页面同名文件.html

- 快照的使用： page2 要快照page1, 则在page2 里设置快照

- 页面间的顺序： 页面面板，ctrl + 方向键



## 设计尺寸

### 移动端设计尺寸

- 375 * 667 


## 1. 工具练习

### 1.1 制作简单移动端登陆框

### 1.2 如何制作按钮: 图像按钮， 图标按钮(box 设置为按钮)，链接按钮（如何将label设置为链接按钮) -> 交互样式

### 1.3 输入框的美化： -> 转换为模板

![image-20220115110805367](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115110805367.png)

### 1.4 将输入框制作为模板：输入框全选 -> 右键 -> create master

### 1.5 单选按钮的使用和美化： 

- 新内容 -> 组合 -> 交互样式
- 多选 -> 右键 -> 选项组



![image-20220115114656902](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115114656902.png)

### 1.6 复选框的使用和美化

![image-20220115120121906](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115120121906.png)

### 1.7 页面和布局工具

- 最好元素都具名


### 1.8 钢笔工具的使用

![image-20220115130401937](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115130401937.png)

![image-20220115130458431](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115130458431.png)

### 1.9 钢笔工具进阶

![image-20220115132632083](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115132632083.png)

### 1.10 复杂UI页面

- 使用 379 * 667页面
- 最下面使用透明度遮罩

![image-20220115151154473](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115151154473.png)



### 1.11 内部框架

- 类似iframe



##  交互

### 1. 页面跳转， 页面1跳转到页面2， 页面2返回页面1

- 交互逻辑 ：事件 -> 动作 -> 目标

### 2. 热区

- 热区就是事件遮罩
- 任务： 为列表添加热区

### 3.  显示和隐藏（交互事件）

- 用途： 提示信息， 广告等

### 4. 设置文本 （交互事件）

- 组合交互， 点击按钮后同时设置多处的文本  -> 就是为按钮设置多个事件

### 5. 启用和禁用

- 系统控件

![image-20220115155557388](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115155557388.png)

- 自定义控件

![image-20220115155848028](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115155848028.png)



### 6. 移动 （重点）

- 到达： 绝对位置， 移动到指定坐标，再点也不会走
- 经过：相对位置，移动了指定的位置后，再点还会走

![image-20220115160841704](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115160841704.png)



### 7. 等待

- 设置等待的时间 = 需要等待的时间 + 本次等待之前的多个未设置等待的动画的总时间时间
- axure中等待的时间只跟之前没有过等待的动画相关

![image-20220115161600165](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115161600165.png)



###  8. 旋转

- 绝对角度，相对角度
- 可设置任意中心点



### 9. 设置尺寸

- 可设置尺寸变化方向



### 10 设置透明度



### 11. 做个复杂动效

- 动效要求：旋转出去到指定位置 -> 显示 ‘hi' -> 在旋转回来然后显示图标 -> 然后旁边打印 Hello Jayden James
- 开始效果

![image-20220115174451923](D:\WZX\Desktop\images\get_green.png)

- 结尾效果

![image-20220115174525907](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115174525907.png)



### 12 滚动到元件

- 会使用到动态面板功能
- 测试： 对三章小说进行定位，实现章节滚动 -> 转换动态面板，固定面板到页面

### 13.  其他事件

- 主动事件：鼠标，键盘事件，类似web
- 被动事件：其他类型的事件

### 14. 其他动作

- bring to front / back
- selected list option
- others

### 15. 页面交互

- 页面的互动，与其他组件无关比如页面载入时
- 直接对页面添加互动

### 16. 页面框架

* 通过点击首页的内容按钮实现首页页面框架中显示不同内容页的内容

  ![image-20221030163849867](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20221030163849867.png)

---



## 动态面板

### 1. 动态面板基础

- 动态面板的显示和隐藏

- 层的增减

- 动作设置动态面板

- 事件：状态改变时

![image-20220115230506382](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115230506382.png)

### 2. 遮罩

- 实现，遮住下图半圆（移动端滚动控件）

![image-20220115231202305](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115231202305.png)

- scroll in needed

![image-20220115231431834](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115231431834.png)

- pin to browser(固定定位于browser)

![image-20220115231656226](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115231656226.png)

### 3. 浮窗

- 鼠标移入时显示， 移除时隐藏

![image-20220115232833376](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115232833376.png)

### 4. 弹窗

- 01

![image-20220115234301813](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220115234301813.png)

- 02

<img src="C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116000655230.png" alt="image-20220116000655230" style="zoom:50%;" />



### 5. 轮播

- 带交互复制使用 -> 如何复制到其他页面任然有效

  ![image-20220116002521873](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116002521873.png)

### 5 tab 切页

![image-20220116004836862](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116004836862.png)



### 6. 列表切页

![image-20220116010120373](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116010120373.png)



### 7.  拖动

- 需要设置两次动态面板
- 动态面板 father： 设置移除隐藏
- 动态面板 son: 设置拖动，并且设置拖动不溢出（范围）

![image-20220116013458449](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116013458449.png)

---



## 中继器

### 1. 初识 - 商品列表

![image-20220116022457457](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116022457457.png)

### 2. 中继器行之间间隔的两种方法

- 设置行之间的宽度
- 使用hot spot 来制造间隔

### 3. 中继器制作后台管理界面

#### 1. 制作页面

- 头部： 1080 * 70， bg-color:fdf9f9,  corner: 5, shadow: 0 2 10

- 背景： 稍暗， 页面排列居中

- 主体： 1080 * 560，margin-top： 10

- 头部文字：color: d9d9d9

- 头部文本框： 140 * 26  corner: 3  border-color: d9d9d9

- 头部选择框：同上

- 头部按钮： 110 * 35， 去掉border， color: white, bg-color: blue

  中继器第一列跨度30， 其他107， 最后稍长1858

- 中继器交替背景色的设置：设置后还是不能作用，因为需要将当前中继器中的表格的填充色去掉，用交替色代替 -> 将填充色透明度设为0



#### 2. 新增数据

- 方式1： 设置按钮 -> 设置按钮点击事件 -> 中继器添加数据 ；方法交简单，但是没有交互
- 方式2： 交互 -> 通过弹窗新增
- 遮罩和弹窗可以通过隐藏移位的方式来调用，从而不影响编辑
- 数据数量通过操作全局变量的方式来正确获得每条数据ID
- 更新数据条数，多种方式实现，当前使用调用该数据条加载时显示事件



#### 3.  删除数据

- 直接删除数据，调用repeater的删除行，非常简单，但是不具备交互性
- 交互性删除：弹窗确认
- 交互性删除的重点是标记被删除行，**当成功删除时，必须取消标记**，否则标记会默认移动到后面的行



#### 4. 弹窗修改数据

- 注意弹窗中的数据一开始要与需要修改的数据一致





#### 5. 原位置修改数据

- 添加一个隐藏模块，点击时用模块覆盖单元格来实现原位修改

![image-20220117163223240](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220117163223240.png)



#### 6. 查询（筛选）数据

- 复合筛选不能勾选移除其他筛选
- 模糊查询：[[ item.type.indexOf(VAL1) != -1 ]]
- 取消查询：repeter 自带功能

![image-20220117165801626](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220117165801626.png)



#### 7. 排序

- 前期准备：制作升序，降序，动态面板，箭头尺寸 6 * 3
- 通过控制面板来切换升降序的列头
- 点击设备名称列头排序时，就取消价格排序，反之亦然
- 可以到设置一个按钮，来取消排序，同时将排序的两各列头恢复为正常



#### 8. 分页

- 中继器分页设置

- 如何获取当前页和总页数：

  [[LVAR1.pageIndex]] / [[LVAR1.pageCount]]

  ![image-20220117174940446](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220117174940446.png)



#### 9. 批量操作

- 全选后，如何标记当前页所有行： [[TargetItem.isVisible == true]]，**Insert Variable or Function 中选择isVisible**
- repeater可视元素数量：[[LVAR1.visibleItemCount]]



---



## 变量和判断

### 2.  变量

- 全局变量： 窗口 -> project -> global variable
- 可以通过修改变量的动作来更改全局变量
- 局部变量： 只在当前页面有效的变量
- 局部变量的运算： [[var1 + 1]]
- 技巧，先修改变量在组成字符串

![image-20220116030017487](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116030017487.png)

### 3. 判断

- 输入框

![image-20220116025629031](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116025629031.png)

- 页码

![image-20220116033528240](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116033528240.png)

- 使用判断实现拖动，重点是拖动元素的x坐标的变量表示方法variable.x, 并且实现吸附功能

![image-20220116013458449](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116013458449.png)



### 4. 协议确认页面1

- 协议确认按钮的勾选有效
- 协议拖拽后自动个返回合理位置

- 拖动结束时事件的使用

![image-20220116104333508](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116104333508.png)



### 5. 协议确认页面2

![image-20220116111855192](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116111855192.png)

### 6. 多条件判断

- 设置富文本可以修改提示的颜色
- 匹配所有和匹配任何代表的是 and 和 or

![image-20220116113727437](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116113727437.png)

### 7. 循环

- 页面载入时（动作） ->  设置动态面板 -> 设置动态面板状态循环改变（state设置为next)

- 注意是在页面中设置，不是在空间上设置

  ![image-20220116120422115](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116120422115.png)



### 8. 案例： 注册页面01

- 通过动态面板的循环控制可以造就MVC形式，将页面显示和数据管理分离开来
- 注意这里对多个输入框判断时使用了global variable

![image-20220116124957802](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116124957802.png)



### 9. 案列：注册页面2

- 调用也就是触发事件
- 使用触发事件代替动态面板循环，解决循环不会停止，造成的性能问题

![image-20220116151043628](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116151043628.png)

![image-20220116151100197](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116151100197.png)



### 10. 多重嵌套判断

- 多重嵌套判断：就是多增加用于判断的组件（例子中个就是多增加fx）
- 示例中通过确定键先判断性别，在通过多重判断fx判断年龄从而打开不同的页面

![image-20220116161042251](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116161042251.png)

![image-20220116161147602](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116161147602.png)



### 11.  跨页面传参

- 就是使用 全局变量



### 12. 中间页

- 使用中间页来代替第10章的多重判断，作为中转站，进行跳转页面
- 中间页中干什么都不写，在loaded的时候进行中转



## 函数的应用

### 1. 获取窗口尺寸

![image-20220116162647974](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116162647974.png)

### 2. 窗口改变时获取窗口尺寸

![image-20220116163201985](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116163201985.png)

### 3. 实时获取鼠标位置（通过循环）

![image-20220116164032479](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116164032479.png)



### 4. 实时获取鼠标位置 （通过页面事件，鼠标移动时)

![image-20220116164205553](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116164205553.png)



### 5. 跟随鼠标的文本

- 调整跟随组件相对鼠标的距离：[[Cursor.x+20]],[[Cursor.y+20]]

![image-20220116164708770](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116164708770.png)



### 6. 精准判断手机号

- 截取输入的正确长度的手机号的前3位来判断是否是138,139,136
- 隐藏数据工具fx的办法：
  - 右键设置隐藏
  - 转变为动态面板，拉出动态面板范围影藏
  - z-index 设置为最下层

![image-20220116173900885](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116173900885.png)

![image-20220116173940606](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20220116173940606.png)

## 难点

### 1. 钢笔画图

### 2. 如何让组件不显示

- 动态面板中在设置动态面板，外层动态面板决定了显示范围

## 实例

### 多选下拉框

- 中继器横向显示不要边款：双击中继器 -> 删除表格 -> 放入一个Label -> 设置中继器横向显示 -> 设置列间距 -> 中继器只增加行不增加列

  ![image-20221216105203090](C:\Users\aluca\AppData\Roaming\Typora\typora-user-images\image-20221216105203090.png)

- 