function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        };
    } else {
        return {
            top: document.body.scrollTop + document.documentElement.scrollTop,
            left: document.body.scrollLeft + document.documentElement.scrollLeft
        };
    }
}

function getViewPortSize() {
    if (window.innerHeight) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
    }
}


function getScrollSize() {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        };
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        };
    }
}

function addEvent(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent(type, function() {
            fn.call(el);
        });
    } else {
        el['on' + type] = fn;
    }
}

function getChildElements(el) {
    var temp = {
            length: 0,
            slice: Array.prototype.slice
        },
        children = el.childNodes,
        childLen = children.length,
        tempChild;


    for (var i = 0; i < childLen; i++) {
        tempChild = children[i];
        if (tempChild.nodeType === 1) {
            temp[temp.length] = tempChild;
            temp.length++;
        }
    }
    return temp;
}

function elemParent(node, n) {
    var type = typeof n;

    if (type === undefined) {
        return node.parentNode;
    } else if (n <= 0 || type !== 'number') {
        return undefined;
    }

    while (n) {
        node = node.parentNode;
        n--;
    }

    return node;
}