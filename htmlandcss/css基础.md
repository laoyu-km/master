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
