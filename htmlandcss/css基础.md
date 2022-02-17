# css 基础

## 01 样式表

- 内联样式：行内样式 -> 实际开发中一般不适用 -> 实战中的唯一出现是用来传递数据 -> `<div style="display:none">...data...</div>`

- 内部样式表：`<style type="text/css">...</style>`

- 外部样式表：`<link rel="stylesheet" href="./css/index.css" />`

- 内联样式（行内样式） > 内部样式表 > 外部样式表


## 02 browser 加载html page的方法

```mermaid
graph TB
A(Download HTML) --> |Async/new thread|C(Download Javascript)
A --> |parse|B(DOM Tree)
A --> |Async/new thread|D(Download CSS,8k chunk)
B --> E(Render Tree)
E --> F(Layout/Reflow,shape/resize)
G --> E
F --> G(Paint/Repaint,color)
C --> |DOM API|B
C --> |CSSOM API|E
D --> |Parse|H(CSS Rule Tree)
H --> |construct|E

```

## 03 选择器

### 基础选择器

- id

- class

- 标签

- '*'选择器

- 属性选择器： [id="box"],[href] -> 再表单中使用的多

### 应用优先权

- !important -> 慎用，如果使用说明逻辑有问题


### 选择器优先级

- !important > id > class = 属性 > 标签 > *

### 派生选择器

- 父子选择器： father son -> father and son 可为任一选择器类型(id, class, 属性, 标签) -> #father #son 不行 -> id是唯一的，不需要派生

- 浏览器对父子选择器的匹配规则： 从下到上匹配 -> 因为父亲永远只有一个

- 越级：即使不是父子关系，祖孙关系也一样可以越级生效
```html
<style type="text/css">
      .box span {
        color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box" >
      <h1>
        <span>Yui Nikaido</span>
      </h1>
    </div>
  </body>
```

### 并列选择器

1.  h1.title -> 标签.类名 -> 便于区分

2. .box.box1 -> .classname.sonclassname

3. 练习 

- 文本提示样式类
```css
    <style type="text/css">
      .tip {
        font-weight: bold;
      }

      .tip.tip-sucess {
        color: green;
      }

      .tip.tip-warning {
        color: orange;
      }

      .tip.tip-danger {
        color: red;
      }
    </style>
  </head>
  <body>
   <p class="tip tip-sucess">sucess = green</p> 
   <p class="tip tip-warning">warning = orange</p>
   <p class="tip tip-danger">danger = red</p>

  </body>
```

### 分组选择器

- h1,p,.box: 分组选择器通过","分割


### 相邻兄弟选择器

- el1 + el2 -> .checkbox input[type="checkbox"]:checked + lable
  1. 同父
  2. 相邻
  3. 在其之后


### CSS权重

> 数学：正无穷 = 正无穷 + 1
> 计算机： 正无穷 < 正无穷 + 1

|类型|权重|
|:---:|:---:|
|*|0|
|标签，伪元素|1|
|class,属性,伪类|10|
|id|100|
|内联样式|1000|
|!important|正无穷|

- 实际权重不是10,100，而是256级别的

- 练习
```html
    <style type="text/css">
      #div-id .h1-class{
        color: green;
      }

      .div-class .h1-class{
        color: red;
      }

      .div-class #h1-id.h1-class{
        /* 生效 */
        color: palegreen;
      }
    </style>
  </head>
  <body>
    <div id="div-id" class="div-class">
      <h1 id="h1-id" class="h1-class"> Yui Nikaido</h1>
    </div>
  </body>
```



## css 属性样式

### css参考手册

- css.doyoe.com

### outline(轮廓)

- outline-color: green

- outline-style: dotted;

- outline-width: 30px;

- outline:none; -> 去掉轮廓

### button

- border:none;

- background-color: green;

- color: white;

- font-size: 14px;

### 宽高，高度

> 在浏览器中，inline & inline-block 中空格和换行都被视为文本分隔符

- width

- height

- min-width: 设置后不会产生折行，造成样式被破坏

- max-width：设置后不会宽度不会超过该值

- min-height： 最小高度，内容超不超过都有这个高度

- max-height： 最大高度，盒子最大只能有这个高度

### 溢出管理 overflow

- overflow: hidden;

- overflow: scroll; -> 滚动条一般17px，占用盒子内部宽度

- overflow: auto;

### font

> 浏览器默认的字体大小是16px->pixel

- font-size: 浏览器设置字体时设置的是高度，宽度自动缩放 -> 开发中常用的字体大小：12,14,16,18(偶尔)

- font-weight: 字体粗细 -> lighter/normal/bold/bolder/100-900 -> 不是所有字体都有lighter/bolder/数值等粗细样式
```html
// 标签自带样式时，浏览器自动为标签添加了样式 strong {font-weight:bold}
// f12可查看
<strong>hello Yui Nikaido</storng>
```

- font-style: 字体风格 -》 italic/oblique(斜体/倾斜)(两个效果一样，为什么有两个，因为所有字体中不是所有字体都有italic风格，如果没有就用oblique来强制倾斜)

- font-family: 
   - 通用字体：arial -> widows, linux, Mac 都安装了该字体
   - 可写复合字体：“Times new Roman",Georgia,serif; -> 回退，第一种字体不兼容就用第二种字体，一次类推 -> 名字有空格的字体，中文字体需要加双引号，其他可以不加
   - 兼容性比较好的字体："Hiragino Sans GB","Microsoft Yahei",arial,\5b8b\4f53(宋体),"Helvetica Neue",Helvetica,STHeiTi,sans-serif;

- color: 字体颜色
   - 英文单词颜色名: 在项目当中不使用
   - 16进制颜色值: # red(00-ff) green(00-ff) blue(00-ff)
   - 16进制颜色值: # red(0-255) green(0-255) blue(0-255) -> rgb(255,0,0) -> rgb(100%, 0%, 0%) -> rgb(260, 0, 0)结果还是红色，只认到255


### border

- border: 1px solid #000; 默认变宽是占盒子以外的宽高

- border-top/right/left/bottom: 变宽可单独设置

- border-width: 
   - border-width: 5px 10px 上下，左右
   - border-width: 5px 2px 10px 上，左右，下
   - border-width: 5px 2px 10px 7px 上右下左

- border-style： dotted/dashed/solid/double/groove/ridge/inset/outset

- border-color: border-top-color, border-right-color, border-bottom-color, border-left-color

- border实现三角形：
```css
/* 方法1 */
.test {
        width: 0;
        height:0;
        border-width:100px;
        border-style: solid;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: orange;
      }

/*方法2 常用*/
.test {
        width: 0;
        height:0;
        border: 100px solid transparent;
        border-right-color: orange;
      }
```

### 文本text

- textalign(水平对齐): right/center/left -> 容器必须具有宽高

- line-height(文本行高)：一行所占据的高度，字体为16时默认行高为22，上下3

- 垂直居中： line-height: height

- text-indent(文本缩进)：多用于input标签，或者文本缩进；
```css
p {
    /*每段开头空两个字符*/
    text-indent: 2em; 
}
```

- text-decoration(文本线)： underline/line-through/overline/none;

- cursor(光标): pointer(手势)/not-allowed(禁止)/help(问号)/resize

### 单行文本截断和显示省略号
```css
.test {
  white-space: nowrap; /*不换行*/
  overflow:hidden; 
  text-overflow: ellipsis; /*隐藏溢出部分并加省略号*/
}
```

### 多行文本截断和显示省略号

- 方法1： 截取文本，加省略号；

- 方法2： 根据行高计算盒子高度，设置溢出隐藏，手动增加省略号(伪元素)覆盖行末文字。

### display

- display: none/inline/inline-block/block/table/table-cell

### 伪类

- hover: 移入元素

- disabled: button:disabled
```css
button:disabled {
  background-color: #333;
  color: #fff;
}
```

- checked: 美化原生checkbox
```html
<style type="text/css">
      .checkbox {
        width: 40px;
        height: 40px;
        border: 2px solid #333;
        border-radius: 50%;
      }

      .checkbox input {
        display: none;
      }

      .checkbox label {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #333;
        margin: 10px;
        opacity: 0;
        filter: alpha(opacity=0); /*兼容性 这里的opacity值为0-100*/
      }

      .checkbox input[type="checkbox"]:checked + label {
        opacity: 1;
        filter: alpha(opacity(100));
      }
    </style>
  </head>
  <body>
    <div class="checkbox">
      <input type="checkbox" id="checkbox">
      <label for="checkbox"></label>
    </div>
  </body>
```

- input:focus
```css
ipnut {
  outline: none
}

input:focus{
  border: 1px solid blue
}
```

- :first-child

- :last-child

- :nth-child() -> :ntch-child(odd)(奇数)/:nth-child(even)(偶数)/nth-child(num)


### vertical-align

- 解决行内元素与行内块元素文本对齐的问题：行内块元素无文字默认底部对齐，行内块元素有文字默认与行内块的初始化时的文字对齐

- vertical-align: bottom/top/middle/-30px/30px

- vertical-align 写在两个元素中任何一个都可以

### 容器内多行文本居中的方法

1. 将容器的display设置成table

2. 将容器内文本的display设置成table-cell(表格单元格属性)

3. 将容器内的文本的vertical-align 设置成middle

```css
 .test {
      display: table;
      width: 100px;
      height: 100px;
      border: 1px solid #333;
    }

    .test span {
      display: table-cell;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="test">
    <span>Yui Nikaido Yui Nikaido </span>
  </div>
```

### 去除行内或行内块元素文本间隔符的方法

- 去掉换行或空格，变成连写




### display:none 和 visibility:hidden 的区别

- display:none -> 不保留元素空间

- visibility: hidden -> 隐藏后保留元素空间


### 重写有样式的标签的样式





### 绝对单位和相对单位
- 绝对单位：不会因为环境的变化而造成变化 -> pixel
- 相对单位：根据环境变化而变化 -> em, rem
- 浏览器默认字体大小是16px, 要设置为10px, 就需要在初始化是将字体设为62.5%这样，1em就等于10px, 默认1em = 16px

```css
body,html {
  font-size:62.5%
}
```

- 练习：行高等于1.2倍字体大小如何设置 
```css
.test {
  line-height: 1.2em;
}
```




- 举例
```html
<style type="text/css">
      .test {
        width: 100%;
        min-width: 400px;
        max-width: 700px;
        height: 60px;
        font-size: 20px;
        background-color: orange;
      }
    </style>
  </head>
  <body>
    <div class="test">
      111111111111111111111111
      111111111111111111111111
    </div>
  </body>
```




## tip

- 复合类名：用中横线 .btn-sucess

- 复合id名：用下划线 .btn_sucess

- css 注释：/* 注释 */


## 作业

1. 写一个简单的button样式类
要求： 所有按钮的字体颜色白色，所有按钮无变宽，所有按钮高度34px;所有按钮字大小14px;

总类名：btn

二级类名：
btn-sucess
背景颜色：#5cb85c;

btn-warning
背景颜色：#f0ad4e;

btn-danger
背景颜色：#d9534f;


2. 美化原生的checkbox







