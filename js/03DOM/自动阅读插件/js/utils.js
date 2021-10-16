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