# 文档就绪事件

- 这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。

```js
$(document).ready(function () {
  // 开始写 jQuery 代码...
  jquery;
});
```

- 简洁写法

```js
$(function () {
  // 开始写 jQuery 代码...
});
```

## jQuery 入口函数与 JavaScript 入口函数的区别：

- jQuery 的入口函数是在 html 所有标签(DOM)都加载之后，就会去执行。
- JavaScript 的 window.onload 事件是等到所有内容，包括外部图片之类的文件加载完后，才会执行。
  ||window.onload|$(document).ready()|
  |:---:|:---:|:---:|
  |执行时机|必须等待网页全部加载完毕(包括图片等), 然后再执行包裹代码|只需等待网页中的 DOM 解构加载完毕，就能执行包裹代码|
  |执行次数|只能执行一次，如果执行第二次，第一次会被覆盖|可以执行多次，第N次都不能被上一次覆盖|
  |简写方式|无|$(function(){ })|

# 选择器

|           语法           |                          描述                           |     |
| :----------------------: | :-----------------------------------------------------: | :-: |
|          $("p")          |                       元素选择器                        |     |
|        $("#test")        |                        id 选择器                        |     |
|        $(".test")        |                      class 选择器                       |     |
|         $("\*")          |                      选取所有元素                       |     |
|         $(this)          |                   选取当前 HTML 元素                    |     |
|       $("p.intro")       |             选取 class 为 intro 的 <p> 元素             |     |
|       $("p:first")       |                   选取第一个 <p> 元素                   |     |
|     $("ul li:first")     |         选取第一个 <ul> 元素的第一个 <li> 元素          |     |
|  $("ul li:first-child")  |          选取每个 <ul> 元素的第一个 <li> 元素           |     |
|       $("[href]")        |                选取带有 href 属性的元素                 |     |
| $("a[target='_blank']")  |    选取所有 target 属性值等于 "\_blank" 的 <a> 元素     |     |
| $("a[target!='_blank']") |   选取所有 target 属性值不等于 "\_blank" 的 <a> 元素    |     |
|       $(":button")       | 选取所有 type="button" 的 <input> 元素 和 <button> 元素 |     |
|       $("tr:even")       |                选取偶数位置的 <tr> 元素                 |     |
|       $("tr:odd")        |                选取奇数位置的 <tr> 元素                 |     |
