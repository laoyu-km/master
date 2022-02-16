## 初级标签

```html
head 三大件： 
  <title></title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />

title: 30 - 40 个字
  主页： 网站名称 + 主要的关键字 / 关键词描述
  详情页：详情名称 + 网站名称 + 简介
  列表页： 分类名称 + 关键字 + 网站名称
  文章页： 标题 + 分类 + 网站名称

 meta标签
 keywords: 100个字符，网站名称 + 分类信息 + 关键字

 description： 描述信息 80 - 120 汉字，综合title + keywords的简单描述

 搜索引擎认知的优先级：title > description > keywords

 搜索引擎：通过爬虫爬取网站 =》 爬虫最基础都支持head三大件

 <i>i love jayden</i> 物理性标签
 <em>i love jayden</em> 语义型标签 emphasize -> 语义化标签更加迎合爬虫
 
html lang: 
     zh-CN: 简体中文
     en: 英文
     zh-HK:
     zh-TW:
     zh-MO:
     zh-Hans zh-CHS: 纯简体中文
     zh-Hant zh-CHT: 纯繁体中文

meta charset:
     GB2312: 中国信息处理国家标准码 -> 简体中文编码
     GBK: 汉字扩展规范， 扩大汉字收入，增加了繁体中文，增加了藏，蒙，维吾尔等少数名族的名字
     utf-8: unicode 万国码

<!DOCTYPE html> : 
     是一个声明，告诉浏览器用哪一个html版本进行编写
     html5的声明方式
     声明后使用： CSS1Compat mode : w3c 的标准兼容性模式 
     未声明使用： BackCompat mode : 浏览器的怪异兼容性模式
     补充html4.1 时期的声明方式

heading 标签 = 标题标签
     独占一行，粗体，h1 - h6 大小不一致
     h标签的margin: 浏览器不同可能不同，chrome是0.67em, 要一直则cssreset: h1 {margin:0; padding:0}
     浏览器默认文字大小是16px , 可改
     2em = 2 * 16px = 32px
     比较受爬虫喜欢，标题都可使用

<p> : 段落标签 paragraph
     独占一行，
     如何在<p>标签中缩进：
         1. &nbsp; 空格 -> 多加几个
         2. style="text-indent:2em"

<strong> 语义化标签  vs <b> bold 物理性标签
     多数使用语义化标签

<em>emphasize  vs <i> italic
     多数使用语义化标签
     <i>标签在实际工作中多数使用来加图标用的
     斜体标签作用是加强语气

<del>: 中划线 -> 用样式实现 <p style="text-decoration: line-through">我是p标签</p>
<ins>: 下划线 -> 用样式实现 <p style="text-decoration:underline">我是p标签</p>

<address>: 表示地址

division 标签 <div>: 容器 -》 块 -》html5 开始使用了结构化标签 <head> <section> <footer>
     div中为什么中文换行，英文连写不换行：因为浏览器认识英文，不认识中文，认为中文是一个一个的，而英文如果没空格，就看做一个词
     在div中文本的空格和换行都是文本分隔符，所以英文不会被识别错, 下面三行效果一样
     <div>I love Jayden James</div>
     <div>I                        love Jayden James</div>
     <div>I 
         love Jayden James</div>


html实体字符： 
     &lt; : <
     &gt; : >
     &nbsp;: 空格
     如果需要查询实体到w3c school

<br />  <hr />: 换行， 分隔符
     开发项目时严禁使用，因为不同的浏览器渲染不同特别是对于<hr>


<img src="" alt="" title="">
     src: source 资源
     路径问题：网络路径， 绝对路径， 相对路径
     alt: 图片加载失败时，提示图片主题
     title: 鼠标移入图片时，提示图片主题

元素： 
     内联元素: 不独占一行，无法定义宽高 inline element
         strong, em, del, ins, 

     块级元素: 独占一行， 可以定义宽高 block element
         div, p, h, address
 
     内联块级元素： 不独占一行， 可以定义宽高 inline-block element
         img

 
anchor 标签 <a href=""></a>
     1. 超链接标签
     2. 打电话：<a href="tel:13888686353">打电话</a>
     3. 发邮件：<a href="mailto:jayden@163.com">发邮件</a>
     4. 锚点： <a href="#锚点定位">锚点定位</a>
     5. 协议限定符：<a href="javascript:alert('我是a标签')"></a>
         <a href="javascript:void(0)">打开弹窗</a> 没有跳转效果
         <a href="javascript:;">打开弹窗</a> 没有跳转效果
     href: hypetext reference 超文本引用
     target: _blank(新开页面)


标签嵌套： 
     内联元素可以嵌套内联元素
     块级元素可以嵌套任何元素
     p标签不可以嵌套div
     a标签不可以嵌套a标签
     a标签可以嵌套img 

注释： 
     方便后期维护，代码可读性
     检查bug

语义化标签： 可读性强， 可维护性抢， 搜索引擎对语义化标签友好
            html的发展方向就是语义化
```

## ul ol
```html
sub, sup 
下标， 上标
    用到的时候很重要
    jayden is good<sup><a href="www.baidu.com" target="_blank">[1]</a></sup>
    Na<sup>+</sup>
    H<sub>2</sub>SO<sub>4</sub>
    sup: superscripted
    sub: subscripted
    inline element


span: 
    inline element
    默认没有样式
    可以在文本区中对部分文本添加样式，或增加class, id 等


ol: 有序列表 order list
    type: <ol type="1/A/a/I/i"></ol> -> i/I 罗马数字
    start: <ol type="1" start="10"></ol> start 只对数字有用
    reversed: <ol type="1" start="5" reversed="reversed"></ol> 倒叙 有超过5个的话，会列出0和负数
    使用不多

ul： 无序列表 unorder list
    type: <ul type="disc|square|circle"></ul>

ol ul li 默认是 block element


definition list 定义列表
    <dl>
        <dt> dt definition term </dt>
        <dd></dd> definition description
    </dl>
```

## table and frame
```html
table: 表格标签
    border: 边框属性
    cellpadding: 单元格内边距
    cellspacing: 单元格间距


caption: 标题标签

tr: table row

th: table header cell
    scope:row, col, colgroup, rowgroup
    scope 属性标识某个单元是否是列、行、列组或行组的表头。

td: table data cell

<td colspan="2"></td> 列合并，不能超过表格的列数

<td rowspan="2"></td> 行合并，不能超过表格的行数

表格对齐：
    <td align="left|center|right"></td>

    thead: 表格页眉标签
    tbody: 表格主体标签
    tfoot: 表格页尾
    以上三个标签必须同时出现，  语义化好
    有这三个标签会先加载 thead, tfoot, 最后加载tbody 
    没有就会等数据加载完才加载表格
    三个标签的加载顺序是 thead -> tfoot -> tbody 
    就算打乱三个标签的顺序也是一样的按照上面的顺序加载
        <table class="table-test"
            border=1
            cellpadding=5px
            cellspacing=0>
            <caption>element display</caption>
            <thead>
                <tr>
                    <th scope="row">display</th>
                    <th>elements</th>
                    <th>comment</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th scope="col">inline element</th>
                    <td align="left">span, sup, sub, strong, em, ins, a, label</td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="col">block</th>
                    <td align="center">div, hx, ul, ol, li, dt, dl, dd, p, address, table, form, fieldset, legend</td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="col">inline-block</th>
                    <td align="right">img, input, select, textarea, iframe</td>
                    <td></td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <th scope="col">sum</th>
                    <td colspan="2">html elements display</td>
                </tr>
            </tfoot>
        </table>


	dl,dt,dd :dl> 标签与 <dt> （定义项目/名字）和 <dd> （描述每一个项目/名字）一起使用。
    <dl>
        <dt style="font-weight:bold">&lt;dl&gt;&nbsp;&lt;dt&gt;&nbsp;&lt;dd&gt;</dt>
        <dd>
            they are all block element
        </dd>
        <dt>jayden</dt>
        <dd>
            this girl is a good girl, she has a big buttom and nice bra
        </dd>
        <dt>aleixs</dt>
        <dd>
            this girl has huge bottom, amazing!
        </dd>
    </dl>





    <frameset>: 设置框架 已不用
        不能写到body当中
        搜索引擎不友好
        容易对网页分栏布局
    
    <frameset rows="10%, 90%">
        <frame src="top.html" />
        <frameset cols="20%, 80%">
            <frame src="left.html" />
            <frame name="mainFrame" src="https://www.baidu.com" />
        </frameset>
    </frameset>



    iframe: 内联框架 
        inline-block element
        好处1. 是不占用整个页面结构，frameset占用真个页面结构
        好处2. 功能性导航比较实用
        缺点1：对搜索引擎不友好，爬虫进不去iframe
        缺点2：滚动条混乱
        缺点3：外页面控制不了iframe页面的加载
        缺点4：页面之间数据传递困难

        frame-border: 一般设为0
        scrolling = "yes|no|auto"

    <p>
        <a href="http://www.jd.com" target="mainFrame">京东网</a>
        <a href="http://www.taobao.com" target="mainFrame">淘宝网</a>
        <a href="http://www.tmall.com" target="mainFrame">天猫网</a>
    </p>
    <iframe width="100%" height="1000" name="mainFrame" src="http://www.jd.com" frameborder="0" scrolling="auto"></iframe>
```



## 数据提交，表单

```html
用户提交数据的两大要素：
    数据名称
    数据的值


form：包裹标签 block emement
    没有样式，包裹表单内容
    method: get|post
    action: url 提交数据的地址


input:  inline-block element
    <input type="text" name="username">
    <input type="password" id="password" name="password">
    <input type="submit" value="登陆"> value：用于修改按钮上的明文
    name: 确定了数据名称
    输入的值： 确定了数据的值
    value: 确定了明文默认值
    maxlength: 限定最大可以输入的字符长度,不管是英文，数字，中文，或者其他都只能是限定的长度
    id: 唯一性
    readonly: readonly="readonly" html4都这样写，html5 readonly 只读不可输入，但是会被提交
    disabled: disabled="disabled" 不可输入，禁用后数据不会提交

案例：请输入关键字 (梗：在输入框中输入"请输入关键字"会怎样)
    新浪网就有这个问题，但是处于开发角度，有问题应该思考要不要改
<form action=""></form>
    <input type="text" value="请输入关键字" 
    onfocus="focusInput(this)" onblur="blurInput(this)" />
</form>
<script type="text/javascript">
    function focusInput(obj) {
        if(obj.value ==='请输入关键字') {
            obj.value = '';
        }
    }  

    function blurInput(obj) {
        if (obj.value === '') {
            obj.value = '请输入关键字';
        }
    }
</script>


label: inline element
    <label for="username"></label>
    <input type="text" id="username" name="username">
    点击lable可以聚焦input

验证：
    企业级开发中， 前端和后端都要验证
    md5: 消息摘要的算法，也叫不可逆加密算法，加了密后不能解密，这种加密方式不需要额外的秘钥


单选：
<input type="radio" name="radio" id="male" name="sex" checked="checked" value="male" />
<label for="male">男士</label>
<input type="radio" name="radio" id="female" name="sex" value="female">
<label for="female">女士</label>
    name: 决定了这两个radio是一组

checkbox
<input type="checkbox" name="myFavoriteLan" id="html">
<label for="html"></label>
<input type="checkbox" name="myFavoriteLan" id="javascript">
<label for="javascript"></label>
<input type="checkbox" name="myFavoriteLan" id="java">
<label for="java"></label>
<input type="checkbox" name="myFavoriteLan" id="python">
<label for="python"></label>
    name: 决定了这四个checkbox是一组

select
<select name="myFavoriteLan" id="myselect" disabled="disabled">
    <option value="">请选择</option>
    <option value="js">javascript</option>
    <option value="php">php</option>
    <option value="java">java</option>
</select>
    option 中如果写了value就取value的值，就算是空都选
            如果不写value，就会取option标签中的元素
            所以我们要进行特别一个控制的限制，就是上例中的请选择一项


textarea:
<textarea name="" id="" cols="30" rows="10" placeholder="请输入文本"></textarea>
    cols: 可见宽度：30 不是像素，8px * 30 + 17px ，17px是指滚动条， 8是英文(数字)字符的宽度
    rows: 可见行数：
    多行文本中为什么刷新后光标会有空格：因为textarea标签中间是不能有换行和空格的，原理： textarea的value是在textarea标签之间的，空格和换行会被浏览器解析为字符
    js获取textarea后，不能打印textarea.innertext, 只能打印innerHTML, 或者textarea.value, 推荐使用textarea.value,因为是纯文本
    placeholder: 为什么开发时不使用它，而要模拟 -> 因为其样式不好更改



fieldset legend 都是块级元素, 用于分组, 开发中会修改样式
<fieldset>
    <legend></legend>
</fieldset>
    fieldset 标签可以将表单内的相关元素分组。标签会在相关表单元素周围绘制边框。 
    <legend> 标签为 <fieldset> 元素定义标题。
```


## 总结

```html
 inline element
     span/strong/em/del/ins/sup/sub/a/label 
 
 block element
     div/hx/ol/ul/li/dt/dl/dd/p/address/table/form/fieldset/legend 

 inline-block element
     input/img/select/textarea/iframe

 查看标签网址： w3c school
```
