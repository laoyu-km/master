### 1. 页面滚动距离兼容性

```js
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else {
        return {
            top: document.body.scrollTop + document.documentElement.scrollTop, 
            left: document.body.scrollLeft + document.documentElement.scrollLeft
        }
    }
}
// document.body.scrollTop 和 document.documentElement.scrollTop 只会有一个有值
```



### 2. 可视区域兼容性函数

```js
unction getViewportSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                hegiht: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}
// 怪异模式和非怪异模式下 document.body.clientHeight 与 document.documentElement.clientHeight 代表的意义不同
```

### 3. 页面原始高度兼容性

```js
function getScrollSize() {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollHeight,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}
// document.body.scrollHeight 包含 padding
// document.documentElement.scrollHeight 包含 padding border margin
```

