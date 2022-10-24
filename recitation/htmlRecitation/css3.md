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

```css
/* 基本选择器 */

/* 1. * */
* {}

/* 2. element */
element {}

/* 3. id */
#id {}

/* 4. class */
.class {}

/* ================================================== */

/* 关系选择器 */

/* 5. div.test */
div.test1 { /* all div className === test1 */
  color: #ffc0cb;
  /* font: variant style weight size/line-height famliy */
  font: small-caps oblique bolder 20px/30px 'Microsoft YaHei';
}

div.test2 {
  width: 100px;
  height: 100px;
  /* background: color image repeat attachment position/size */
  background: #faf9de url(./image/tbbg.png) no-repeat left / contain;
}

/* 6. div p */

/* 7. div, p */

/* 8. div>p */
div>p { /* 选择所有父级是 <div> 元素的 <p> 元素*/
  font: small-caps oblique bolder 20px / 30px 'Microsoft HaHei';
  color: #cce8cf;
}

/* 9. div+p */
.header+p { /* 紧跟在 <div> 元素之后的第一个 <p> 元素 (同级关系)*/
  font: normal oblique bold 30px/30px 'Microsoft YaHei';
  color: #ffa500;
}

/* 10. element1~element2	p~ul	选择p元素之后的每一个ul元素 (同级关系)	 */
.footer~p {
  font: normal oblique lighter 10px/30px '宋体';
  color: #cce8cf;
}

/* ================================================== */

/* 属性选择器 */

/* [attribute] */

/* 11. [attribute]	[target]	选择所有带有target属性元素	 */
.attribute [target] {
  border: 2px solid #cce8cf;
  margin-bottom: 10px;
}

/* 12. [attribute=value]	[target=_blank]	选择所有使用target="-blank"的元素	 */

/* 13. [attribute~=value]	[title~=flower]	选择标题属性包含单词"flower"的所有元素	 */
.attribute [title~=flower] { /* <form title="titile1 flower" action="" method="post" >*/
  background-color: #cce8cf;
}

/* 14. [attribute|=language]	[lang|=en]	选择 lang 属性等于 en，或者以 en- 为开头的所有元素	 */

/* 15. [attribute^=value]	a[src^="https"]	选择每一个src属性的值以"https"开头的元素	 */

/* 16. [attribute$=value]	a[src$=".pdf"]	选择每一个src属性的值以".pdf"结尾的元素	 */

/* 17. [attribute*=value]	a[src*="runoob"]	选择每一个src属性的值包含子字符串"runoob"的元素	 */
.attribute [title*="test"] {
  background-color: #ffa500;
}

/* ================================================== */

/* <a> 相关伪类选择器 */

/* 18. :link	a:link	选择所有未访问链接	 */

/* 19. :visited	a:visited	选择所有访问过的链接	 */

/* 20. :active	a:active	选择活动链接	 */

/* 21. :hover	a:hover	选择鼠标在链接上面时	 */

/* ================================================== */

/* 其他伪类 */

/* 22. :focus	input:focus	选择具有焦点的输入元素	 */

/* 23. :first-letter	p:first-letter	选择每一个<p>元素的第一个字母	 */

/* 24. :first-line	p:first-line	选择每一个<p>元素的第一行	 */

/* 25. :first-child	p:first-child	指定只有当<p>元素是其父级的第一个子级的样式。	 */

/* 26. :before	p:before	在每个<p>元素之前插入内容	 */

/* 27. :after	p:after	在每个<p>元素之后插入内容	 */

/* 28. :lang(language)	p:lang(it)	选择一个lang属性的起始值="it"的所有<p>元素	 */

/* 29. :first-of-type	p:first-of-type	选择每个p元素是其父级的第一个p元素	 */

/* 30. :last-of-type	p:last-of-type	选择每个p元素是其父级的最后一个p元素	 */

/* 31. :only-of-type	p:only-of-type	选择每个p元素是其父级的唯一p元素	 */

/* 32. :only-child	p:only-child	选择每个p元素是其父级的唯一子元素	 */

/* 33. :nth-child(n)	p:nth-child(2)	选择p元素是其父级的第二个子元素	 */

/* 34. :nth-last-child(n)	p:nth-last-child(2)	选择p元素的是其父级的第二个子元素，从最后一个子项计数	 */

/* 35. :nth-of-type(n)	p:nth-of-type(2)	选择p元素是其父级的第二个p元素	 */

/* 36. :nth-last-of-type(n)	p:nth-last-of-type(2)	选择p元素的是其父级的第二个p元素，从最后一个子项计数	 */

/* 37. :last-child	p:last-child	选择每个p元素是其父级的最后一个子级。	 */

/* 38. :root	:root	选择文档的根元素	 */

/* 39. :empty	p:empty	选择每个没有任何子级的p元素（包括文本节点）	 */

/* 40. :target	#news:target	选择当前活动的#news元素（包含该锚名称的点击的URL）	 */

/* 41. :not(selector)	:not(p)	选择每个并非p元素的元素	 */

/* ================================================== */

/* 表单相关 */

/* 42. :enabled	input:enabled	选择每一个已启用的输入元素	 */

/* 43. :disabled	input:disabled	选择每一个禁用的输入元素	 */

/* 44. :checked	input:checked	选择每个选中的输入元素	 */

/* 45. ::selection	::selection	匹配元素中被用户选中或处于高亮状态的部分	 */

/* 46. :out-of-range	:out-of-range	匹配值在指定区间之外的input元素	 */

/* 47. :in-range	:in-range	匹配值在指定区间之内的input元素	 */

/* 48. :read-write	:read-write	用于匹配可读及可写的元素	 */

/* 49. :read-only	:read-only	用于匹配设置 "readonly"（只读） 属性的元素	 */

/* 50. :optional	:optional	用于匹配可选的输入元素	 */

/* 51. :required	:required	用于匹配设置了 "required" 属性的元素	 */

/* 52. :valid	:valid	用于匹配输入值为合法的元素	 */

/* 53. :invalid	:invalid	用于匹配输入值为非法的元素 */

```

```css
.box {
  /* 不让用户选择，只能在开发环境使用，生产环境下要使用js实现 */
  user-select: none; 
}
```
