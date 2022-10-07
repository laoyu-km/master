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






