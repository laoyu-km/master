// 模块名称前面都要加一个init,说明是初始化
// 模块都放入init() 中执行方便调试和卸载
init();

function init() {
    initTodoList;
    // initTest() // 随时取用
}

// 立即执行函数不一定要返回什么，主要是作用域独立
var initTodoList = (function() {
    var showInput = document.getElementsByClassName('j-show-input')[0],
        inputWrap = document.getElementsByClassName('input-wrap')[0],
        addItem = document.getElementsByClassName('j-add-item')[0],
        textInput = document.getElementById('textInput'),
        oList = document.getElementsByClassName('j-list')[0],
        isEdit = false,
        curIdx = null,
        inputShow = false;

    addEvent(showInput, 'click', function() {
        if (inputShow) {
            inputWrap.style.display = 'none';
            inputShow = false;
            curIdx = null;
            isEdit = false;
            textInput.value = '';
            addItem.innerText = '增加项目';
        } else {
            inputWrap.style.display = 'block';
            inputShow = true;
        }
    });

    addEvent(addItem, 'click', function() {
        var oItems = document.getElementsByClassName('item'),
            input = textInput.value,
            length = input.length || 0,
            itemsLen = oItems.length,
            item;

        if (length === 0) {
            return;
        }

        // .运算符最好使用一个变量存储
        if (itemsLen > 0) {
            for (var i = 0; i < itemsLen; i++) {
                item = getChildElements(oItems[i])[0];

                var text = item.innerText;

                if (input === text) {
                    alert('已经有这个值了');
                    textInput.value = '';
                    return;
                }
            }
        }

        if (isEdit) {
            var itemContent = getChildElements(oItems[curIdx])[0];
            itemContent.innerText = input;
            addItem.innerText = '增加项目';
            isEdit = false;
            curIdx = null;

        } else {
            var oLi = document.createElement('li');
            oLi.className = 'item';
            oLi.innerHTML = itemTpl(input);
            oList.appendChild(oLi);


        }
        textInput.value = '';
        inputWrap.style.display = 'none';
        inputShow = false;

    });

    addEvent(oList, 'click', function(e) {
        var e = e || window.event,
            tar = e.target || e.srcElement,
            tarClassName = tar.className,
            oItems = document.getElementsByClassName('item');

        if (tarClassName === 'edit-btn fa fa-edit') {
            var itemsLen = oItems.length,
                tarLi = elemParent(tar, 2),
                tarLiIdx = Array.prototype.indexOf.call(oItems, tarLi),
                item;
            console.log(tarLiIdx);

            for (var i = 0; i < itemsLen; i++) {
                item = oItems[i];
                item.className = 'item';
            }

            curIdx = tarLiIdx;
            isEdit = true;

            tarLi.className += ' active';

            addItem.innerText = '编辑第' + (tarLiIdx + 1) + '项';

            inputWrap.style.display = 'block';
            inputShow = true;
        } else
        if (tarClassName === 'remove-btn fa fa-times') {
            elemParent(tar, 2).remove();
        }
    });

    function restoreStatus() {
        isEdit = false;
        curIdex = null;
        itemContent.value = '';
        addItem.innerText = '增加项目'
    }

    function itemTpl(text) {
        return '<p class="item-content">' + text + '</p>' +
            '<div class="btn-group">' +
            '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
            '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
            '</div>'
    }
})();