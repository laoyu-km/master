# css3

## 什么是css

- css不是编程语言，

- UA: user agent

- 兼容性
  - -moz-
  - -o-
  - -ms-
  - -webkit-

## 选择器

### 属性选择器

```css
/* E[att ^="val"] -> 属性值以val开头 */
input[type ^= "te"]

/* - E[att $="val"] -> 属性值以val结尾 */
input[type $= "rd"]

/* - E[att *="val"] -> 属性值包含val结尾 */
input[type *= "rd"]

/* 自定义属性选择器 -> <input type="text" textIdent="normal"> */
input[textIndent*="mal"]

/* - E[att ~="val"] -> 属性包含单词"val"的所有元素 -> 必须是单词，前后空格的那种 */
input[type ~= "word"]

/* [attribute|=language] -> [lang|=en] -> 选择 lang 属性等于 en，或者以 en- 为开头的所有元素 -> 一般该选择器只用于lang属性 */
```

### 结构伪类选择器

```css
/* :root -> 选择文档的根元素 === html -> 优先级:root更高*/

/* :not(selector) -> :not(p) -> 选择每个并非p元素的元素 */
/* input:not[textIndent$="den"] 优先级与 input[textIndent$="den"] 相同  */
input:not([textIndent$="den"])

/* :empty -> p:empty -> 选择每个没有任何子级的p元素（包括文本节点, 注释节点等） */

/* :target -> :target{} -> 选择当前选中的锚点所指向的元素（包含该锚名称的点击的URL） */

/* :first-child -> p:first-child -> 指定只有当<p>元素是其父级的第一个子级的样式 */

/* :last-child -> p:last-child -> 选择每个p元素是其父级的最后一个子级 */

/* :nth-child(n) -> p:nth-child(2) -> 选择每个p元素是其父级的第二个子元素 */
/* p:nth-child(odd/even/2n/2n+1) -> p:nth-child(an + b) -> a的循环，b的余数 */
p:nth-child(4n + 1) {background-color: green}
p:nth-child(4n + 2) {background-color: orange}
p:nth-child(4n + 3) {background-color: blue}
p:nth-child(4n + 4) {background-color: red}

/* :nth-last-child(n) -> p:nth-last-child(2) -> 选择每个p元素的是其父级的第二个子元素，从最后一个子项计数 */

/* :first-of-type -> first-of-type -> 某父级下出现的第一次子集type*/

/* :last-of-type -> p:last-of-type -> 选择每个p元素是其父级的最后一个p元素 */

/* :nth-of-type(n) -> p:nth-of-type(2) -> 选择每个p元素是其父级的第二个p元素 */

/* :nth-last-of-type(n) -> p:nth-last-of-type(2) -> 选择每个p元素的是其父级的第二个p元素，从最后一个子项计数 */

/* :only-child -> p:only-child -> 选择每个p元素是其父级的唯一子元素 */
```

### UI 元素状态选择器

```css
/* :hover -> a:hover -> 选择鼠标在链接上面时 */
/* :focus -> input:focus -> 选择具有焦点的输入元素 */
/* :active -> a:active -> 选择活动链接 */

/* :enabled -> input:enabled -> 选择每一个已启用的输入元素 */
/* :disabled -> input:disabled -> 选择每一个禁用的输入元素 */
/* 表单属性readonly 和 disable 的区别，表现上一样，提交时readonly提交，disable不提交 */

/* :read-only -> :read-only -> 用于匹配设置 "readonly"（只读） 属性的元素 */
/* :read-write -> :read-write -> 用于匹配可读及可写的元素 */

/* :checked -> input:checked -> 选择每个选中的输入元素 -> 一般只在radio和checkbox上有用 */
/* :default -> 浏览器打开时的默认选项 -> 可能存在兼容性问题(ie不兼容) */
/* :indeterminate -> 未被指定转态 -> 默认元素的indeterminate属性是false, 需要通过js来进行修改，才生效 */
/* input[type="radio"] 样式不好定义，但是可以定义outline(input, radio) */
```

### 其它伪类选择器

```css
 /* 只在块级元素中使用才生效  */
/* first-letter -> p:first-letter -> 选择每一个<p>元素的第一个字母 */
/* first-line -> p:first-line -> 选择每一个<p>元素的第一行 */

/* ::selection -> ::selection -> 匹配元素中被用户选中或处于高亮状态的部分 */
```

```css
.box {
  /* 不让用户选择，只能在开发环境使用，生产环境下要使用js实现 */
  user-select: none; 
}
```

### 关系选择器

```css
/* father son */
/* father>son */
/* brother + div+p -> 选择所有紧跟在 <div> 元素之后的第一个 <p> 元素 */
/* brother ~ borther -> p~ul -> 选择p元素之后的每一个ul元素, 包含子元素中的ul */
```

## 背景 和 边框

### 背景

```css
        background-image: url(img/5.jpg);
        background-repeat: no-repeat;
        background-position: 0 0;
        /* background-size: cover -> 覆盖 / contain */
        background-size: contain;
        /* background-attachment: fixed/scroll/local ; */
        background-attachment: local ;
        /*attachement此时背景图片相对于谁定位, 
        fixed相对于整个元素含border定位
        scroll相对于元素定位不含border
        local相对于文本定位*/
        background-origin: border-box;
        /* background-origin: border-box/pading-box/content-box */
        /* background-origin 要生效 attachment不能是fixed */
        background-clip: border-box;
        /* bakcground-clip(裁剪): border-box/padding-box/content-box */

        /* background 简写
        background: url(img/5.jpg) no-repeat scroll 0 0 border-box content-box
        mozilla-> bakcground: url(img/5.jpg) 0 0/ contain fixed border-box content-box
        */
```

### 边框图片

```css
  .box {
    width: 210px;
    height: 210px;
    border: 70px solid #000;
    box-sizing: border-box;
    border-image: url('img/border-img.jpg') 70 / 70px / 3px repeat;
    /* 复合写法: border-imag: url slice width outset repeat */
    /* 如果slice不给值 -> border-image: url(); -> 整个图片作为4个角,中间部分轮空 
    如果slice裁剪超过50%， 只有4个角的图片，但是中间部分为空
    */
    
    /* border-image-source: url('img/border-img.jpg');
    border-image-slice: 70 70 70 70; 四个角的图片,写值不需要单位，默认是px,可用百分比(针对整个图片)
    border-image-repeat: repeat(4个角的图片平铺，中间区域切割)/stretch(拉伸)/round(4个角图片平铺，中间不会切割); 中间的填充方式 */
    border-image-width: 90px;/* 替换border宽度*/
    border-image-outset: 3px; /* 图片边框对外拓宽的距离*/
  }
```

### 边框圆角

```html
<style>
      .box {
        width: 200px;
        height: 200px;
        border: 1px solid #000;
        border-radius: 50%;
        /* border-top-left-radius: 100px 100px;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 50% 50%;
        border-bottom-left-radius: 50%; */
      }

      .box2{
        width: 400px;
        height: 200px;
        border: 1px solid #000;
        border-top-color: orange;
        border-right-color: pink;
        border-bottom-color: greenyellow;
        border-top-left-radius: 200px 100px;
        border-top-right-radius: 200px 100px;
        border-bottom-right-radius: 50% 50%;
        border-bottom-left-radius: 50%;
      }

      .box3{
        width: 300px;
        height: 100px;
        border: 1px solid #000;
        border-top-color: orange;
        border-right-color: pink;
        border-bottom-color: greenyellow;
        /* border-radius: 30px; */
        /* border-radius: 30px 30px; -> 对应顺时针的1 2,1 2-> 左上 右上， 右下 左下*/
        /* border-radius: 30px 30px 30px; -> 右下对应第三个值，然后第四个角取第二个值*/
        /* border-radius: 30px 30px 30px 30px */
        /* border-radius: 30px 30px 30px 30px / 30px 30px 30px 30px */
        /* border-radius: 30px 30px 30px 30px / 30px; */
        /* border-radius: 33.33%; */
        /* border-radius: 100px / 50px -> 一个角的比例 */
        /* border-radius: 100px 50px 80px/ 50px 30px; -> 遵循顺时针1 2, 1 2 */
        /* 取值时，不能超过宽的50%和高的50% */
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <div class="box2"></div>
    <div class="box3"></div>
  </body>
```

### 阴影

```html
    <style>
      .box {
        width: 200px;
        height: 200px;
        background-color: orange;
        /* box-shadow: x-offset
         y-offset
         blur-radius(模糊半径) 
         spead-radius(扩展半径，改变阴影大小)
         阴影方向 outset(默认)/inset
         color */
         /* box-shadow 尽量不用 */
        box-shadow: 10px 10px 20px;

        /* 多重阴影 */
        box-shadow: 10px 10px 20px orange,
                    5px 5px 10px red,
                    2px 2px 5px green inset;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
```

## Text

```css
    <style>
      p {
        /* text-shadow: 20px 20px 3px  red ,
                     30px 30px 3px blue */
        /* text-shadow -> x-offset y-offset blur-radius color*/


        /* word-wrap: normal/break-word -> 文字折行
        word-wrap === overflow-wrap
        CJK = chinese japanens korean
        word-wrap 对(CJK)的处理方式与english不同
        半角和全角： 一个字符 和 两个字符
        英文换行： 半角空格 和 连字符(-)
        中文换行: 任何一个中文之都是一个单独的值，都可以自动折行
        * 浏览器对中,默认不让标点符号在行首，如果要在行首，就在标点符号前面加一个空格
        * break-word: 如果单词超出范围，会对单词折行
         */

        /* 
        word-break: normal/break-all/keep-all 
        break-all: 只要超出就折行 
        keep-all: 展现所有单词，超出也展现
        */

        white-space: normal;
        /*
        white-space: normal/pre/nowrap/pre-wrap/pre-line
        normal: 换行和空格都合并成一个空格，文字折行
        nowrap: 换行和空格都合并成一个空格，文字不折行
        pre: 保留源码中的格式，超出不折行
        pre-line: 保留换行，空格合并成一个空格，超出正常折行 ie7以下不兼容
        pre-wrap: 和pre一样，但是超出折行 ie7以下不兼容
         */

         /* 文本超出显示省略号 */
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;

         /* 
         css声明：大括号中的，以分号结尾的语句
         声明块：以 {} 形式组合形成 
         选择器+声名块 = css规则
         层叠，算法， 决定那个优先级更好
          */
        
        /* 
        text-overflow: ellipsis / clip(默认值) 
         */
      }
```

## @ 规则

```css
      p {
        /* 
        @规则
        @charset: 定义样式表使用的字符集
        @import: 引入外部样式表
        @namespace: xml中引入新的命名空间
        @media: 不同媒介下的媒体
        @font-face:
        */
        font-family: 'myFont';
      }

      @font-face {
        font-family: 'myFont';
        src: url('font/BelindaScript.otf'),
             url('font/BelindaScript.ttf'),/*多个字体*/
             format('otf'); /*因为浏览器对字体格式的支持不一致，需要指定字体后缀*/
      }
      /* 
        @font-face: 定义字体
        字体格式： otf/ttf
        url()中引入字体文件
        在那里用就在那个块中引入字体： font-family: 'myFont'
        */
```

## 多列布局

```css
      .box {
        /*
        多列布局
        colunms: colunm-width colunm-count
        colunm-width: 每列宽度
        colunm-count: 设成几列 (当前允许的最大列数)
        * 每列中间的空格大小是16px(默认字体大小)
        * 可以通过更改font-size来更改列间距

        colunm-gap: 15px / 10% ; -> css3提供的更改列间距的方法
        百分比基于盒子宽度,兼容性差
        gap: 间隙，缺口

        colunm-rule: 3px solid #000; -> 类似border, 定义列分割线的样式
        colunm-rule-style === boder-style: solid/dotted/dashed/double/groove(凹槽)/ridge(山脊)/inset/outset/none/hidden

        */
        columns: 200px 3;
      }

      .box h2 {
        column-span:all; /* columns 子元素单独占据一行*/
        /* 
        column-span: all / 1 / none / inherit
        1: 内容跨一列
        all：内容跨所有列
        */
      }
```

## 颜色

```css
        /* 
        颜色： 
        16位: #FFFFFF
        rgba: rgba(123, 123, 123, .5)
        hsl: hsl(120, 60%, 50%)
          h(色调): -360 到 360
          s(饱和度): 0 - 100 百分比
          l(亮度): 0 - 100 百分比
        hsla: hsla(120, 60%, 50%, .5);


        渐变色：
        线性渐变：
        镜像渐变：
         */
        
         background-image: linear-gradient(red 0%, yellow 50% green 100%);
         /*
         线性渐变
         linear-gradient([derection] colorStart [percent], colorEnd)
         derection: to top/right/left/bottom/top right/ top left / bottom right / bottom left / 45deg(角度)
         percent: 各颜色纯色时的位置(在盒子中的位置)
         * 至少需要提供两个颜色
         * 渐变色本质上是一个图片，所以需要用background-image
         * IE9 及 IE9 一下不兼容
         background-image: -webkit-linear-gradient(red 0%, yellow 50% green 100%);
         background-image: -moz-linear-gradient(red 0%, yellow 50% green 100%);
         background-image: -o-linear-gradient(red 0%, yellow 50% green 100%);
         background-image: linear-gradient(red 0%, yellow 50% green 100%);

         */

         background-image: radial-gradient(circle, red, green);
         /* 
         镜像渐变
         background-mage: radial-gradient(shape 大小 at position, color[percent], color[percent])
         shape at postion: circle at center center / 200 0 / 50% 0
         shape: circle / ellipse(椭圆) 长轴, 短轴
         position: 圆心的位置 (默认center)
         color: 至少两个
         percent: 各颜色纯色时的位置(在盒子中的位置)
          */
      }
```





## 作业

### 1. male female 图标

```html
<link rel="stylesheet" href="./css/font-awesome.min.css" />
    <style type="text/css">
      .clear-fix::after{
        display: block;
        content: '';
        clear: both;
      }

      .radio-wrap{
        width: 300;
      }

      .radio-box{
        position: relative;
        float: left;
        width: 80px;
        height:80px;
        margin-left:15px;
      }

      .radio-box input[type="radio"]{
        visibility: hidden;
      }

      .radio-box label{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ccc;
        border-radius: 50%;
        text-align: center;
        line-height: 80px;
      }

      .radio-box span {
        font-size: 40px;
        color: #fff;
      }

      .radio-box input[type="radio"]:checked + label {
        background-color: pink;
      }

    </style>
  </head>
  <body>
    <div class="radio-wrap clear-fix">
      <div class="radio-box">
        <input type="radio" id="male" name="sex" checked />
        <label for="male">
          <span class="fa fa-mars"></span>
        </label>
      </div>
      <div class="radio-box">
        <input type="radio" id="female" name="sex">
        <label for="female">
          <span class="fa fa-venus"></span>
        </label>
      </div>
    </div>
  </body>
```

### 2. 画半圆

```html
    <style>
      .box {
        width: 200px;
        height: 100px;
        background-color: orange;
        /* border-radius: 100px 100px 0 0 / 100px 100px 0 0; */
        /* border-radius: 100px 100px 0 0; */
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
```

### 画叶子

```html
    <style>
      .box {
        width: 300px;
        height: 100px;
        background-color: orange;
        /* border-top-left-radius: 290px 93px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 290px 93px;
        border-bottom-left-radius: 5px */
        border-radius: 97% 3% 98% 2%
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
```

### 画太阳

```html
    <style>
      .box {
        width: 200px;
        height: 200px;
        border: 1px solid #fff;

        background-image: radial-gradient(circle at center, red 10%, gold 30%, orange 50%, blue 100%);
      }
    </style>
  </head>
  <body>
    <div class="box">
    </div>
  </body>
```





