;
(function(node) {
    var TodoList = function() {
        var _self = this;
        this.node = node;
        this.inputShow = false;
        this.isEdit = false;
        this.curIdx = null;


        this.defaultConfig = {
            "plusBtn": "",
            "inputArea": "",
            "addBtn": "",
            "list": "",
            "itemClass": ""
        }
        this.config = this.getConfig();
        this.itemClass = this.config.itemClass;

        for (var key in this.defaultConfig) {
            if (!this.config.hasOwnProperty(key)) {
                console.log(errorInfo(key));
                return;
            }
        }
        this.setConfig();

        addEvent(this.plusBtn, 'click', function() {
            _self.showInput.call(_self);

            // 实际直接使用_self.showInput() 是可以的，以为这样调用showInput 的 this 本身就指向_self
            // _self.showInput();
            // 将this单独保存以下是个好习惯
        });

        addEvent(this.addBtn, 'click', function() {
            _self.addBtnClick();
        });

        addEvent(this.oList, 'click', function(e) {
            var e = e || window.event,
                tar = e.target || srcElement;

            _self.listClick(tar);
        })
    }

    TodoList.prototype = {
        getConfig: function() {
            return JSON.parse(this.node.getAttribute('data-config'));
        },

        setConfig: function() {
            var config = this.config,
                node = this.node;

            this.inputArea = node.getElementsByClassName(config.inputArea)[0];
            this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0];
            this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
            this.oList = node.getElementsByClassName(config.list)[0];
            this.content = this.inputArea.getElementsByClassName('content')[0];
        },

        showInput: function() {
            var _self = this;
            if (this.inputShow) {
                setInputShow.call(_self, 'close');
            } else {
                setInputShow.call(_self, 'open');
            }


            // // 原型中的方法，本身this是指向TodoList的实例，可以直接使用this
            // if (this.inputShow) {
            //     setInputShow.call(this, 'close'); //这里必须改变this指向，外部function 默认指向window
            // } else {
            //     setInputShow.call(this, 'open');
            // }
        },

        addBtnClick: function() {
            var content = this.content.value,
                contentLen = content.length,
                oItems = this.oList.getElementsByClassName('item'),
                itemLen = oItems.length,
                text;

            if (contentLen <= 0) {
                return;
            }

            if (itemLen > 0) {
                for (var i = 0; i < itemLen; i++) {
                    text = getChildElements(oItems[i])[0].innerText;

                    if (text === content) {
                        alert('已存在该项');
                        setInputShow.call(this, 'close');
                        return;
                    }
                }
            }

            if (this.isEdit) {
                getChildElements(oItems[this.curIdx])[0].innerText = content;
                setInputStatus.apply(this, [oItems, null, 'add']);
            } else {
                var oLi = document.createElement('li');
                oLi.className = this.itemClass;
                oLi.innerHTML = itemTpl(content);

                this.oList.appendChild(oLi);
            }
            setInputShow.call(this, 'close');
        },

        listClick: function(tar) {
            var _self = this,
                oParent = elemParent(tar, 2),
                className = tar.className,
                oItems = this.oList.getElementsByClassName('item'),
                itemLen = oItems.length,
                item;

            if (className === 'edit-btn fa fa-edit') {
                for (var i = 0; i < itemLen; i++) {
                    item = oItems[i];
                    item.className = 'item';
                }

                oParent.className += ' active';

                setInputShow.call(this, 'open');

                setInputStatus.apply(this, [oItems, oParent, 'edit']);



            } else if (className === 'remove-btn fa fa-times') {
                oParent.remove();
            }
        },
    }

    function itemTpl(text) {
        return '<p class="item-content">' + text + '</p>' +
            '<div class="btn-group">' +
            '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
            '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
            '</div>'
    }

    function setInputShow(action) {
        var oItems = this.oList.getElementsByClassName('items');
        if (action === 'open') {
            this.inputArea.style.display = 'block';
            this.inputShow = true;
        } else if (action === 'close') {
            this.inputArea.style.display = 'none';
            this.inputShow = false;
            this.content.value = '';
            setInputStatus.apply(this, [oItems, null, 'add']);
        }
    }

    function setInputStatus(oItems, target, status) {
        if (status === 'edit') {
            var idx = Array.prototype.indexOf.call(oItems, target),
                text = getChildElements(target)[0].innerText;

            this.addBtn.innerText = '编辑第' + (idx + 1) + '项';
            this.isEdit = true;
            this.curIdx = idx;
            this.content.value = text;
        } else if (status === 'add') {
            var itemLen = oItems.length,
                item;

            for (var i = 0; i < itemLen; i++) {
                item = oItems[i];
                item.className = 'item';
            }
            this.addBtn.innerText = '增加项目';
            this.isEdit = false;
            this.curIdx = null;
        }

    }

    function errorInfo(key) {
        return new Error(
            '您还没有配置参数' + key + '\n' +
            '必须配置的参数列表如下：\n' +
            '打开输入框按钮元素类名：plusBtn \n' +
            '输入框区域元素类名: inputArea \n' +
            '增加项目按钮元素类名： addBtn \n' +
            '列表承载元素类名： list \n' +
            '列表项承载元素类名：itemClass'
        );
    }

    new TodoList();

})(document.getElementsByClassName('wrap')[0]);