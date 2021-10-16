/**
 * 制作前端埋点
 * 
 * 
 * 前端 埋点
 * 
 * 用户操作或者页面发生了加载或者更新的情况下
 * 要把一系列信息数据收集起来，提交给后端
 * 后端拿到这些数据以后，做数据分析，采样，统计
 * 
 * 
 */

// /**
//  * No.1
//  * 点击 click 和 mouseOver
//  * 
//  * 获取到
//  * 用户UID
//  * 事件类型
//  * 触发这个事件的事件戳
//  * 计算机系统
//  * 浏览器的名称
//  * 跳转的来源地址
//  * 当前的网址
//  */

// var uid = 1;

// HTMLElement.prototype.addEvent = function(
//     eventType,
//     callback,
//     capture
// ) {
//     var _data = {
//         uid: uid,
//         type: eventType
//     }

//     var _this = this;

//     return _this.addEventListener(
//         eventType,
//         function() {
//             var userAgent = navigator.userAgent;
//             console.log(userAgent);
//             _data.timeStamp = new Date().getTime();
//             _data.system = userAgent.match(/\((.+?)\)/)[1].split('; ')[1];
//             _data.broswer = userAgent.match(/(Chrome||Safiri|IE)\/.+\s/)[1];
//             _data.refer = document.referrer;
//             console.log(_data);

//             callback();
//         },
//         capture || false
//     )
// }

// var oMyClick = document.getElementById('myClick');
// var oMyMouseOver = document.getElementById('myMouseOver');

// oMyClick.addEvent('click', function() {
//     console.log('click');
// });

// oMyMouseOver.addEvent('click', function() {
//     console.log('click');
// });



var Vue = (function() {
    var Vue = function(options) {

        var recycleFns = {
            beforeCreate: options.beforeCreate.bind(this),
            created: options.created.bind(this),
            beforeMount: options.beforeMount.bind(this),
            mounted: options.mounted.bind(this)
        }


        recycleFns.beforeCreate();


        this.$el = document.querySelector(options.el);
        this.$data = options.data();

        this._init(this, options.template, options.methods, recycleFns);
    }

    Vue.prototype._init = function(vm, template, methods, recycleFns) {
        var container = document.createElement('div');
        container.innerHTML = template;

        recycleFns.created();

        var showPool = new Map();
        var eventPool = new Map();
        initData(vm);
        initPool(container, methods, showPool, eventPool);
        bindEvent(vm, eventPool);
        render(vm, showPool, container);
    }

    function initData(vm, showPool) {
        var _data = vm.$data;

        for (var key in _data) {
            (function(key) {
                Object.defineProperty(vm, key, {
                    get: function() {
                        return _data[key];
                    },
                    set: function(value) {
                        _data[key] = value;
                        update(vm, key, showPool);
                    }
                })
            })(key);
        }
    }

    function initPool(container, methods, showPool, eventPool) {
        var allNodes = container.getElementsByTagName('*');
        var dom = null;

        for (var i = 0; i < allNodes.length; i++) {
            dom = allNodes[i];
            var vIfData = dom.getAttribute('v-if');
            var vShowData = dom.getAttribute('v-show');
            var vEvent = dom.getAttribute('@click');

            if (vIfData) {
                showPool.set(dom, {
                    type: 'if',
                    prop: vIfData
                });
                dom.removeAttribute('v-if');
            } else if (vShowData) {
                showPool.set(dom, {
                    type: 'show',
                    prop: vShowData
                })
                dom.removeAttribute('v-show');
            }

            if (vEvent) {
                eventPool.set(dom, methods[vEvent]);
                dom.removeAttribute('@click');
            }

        }
    }

    function bindEvent(vm, eventPool) {
        for (var [dom, fn] of eventPool) {
            vm[fn.name] = fn;
            dom.addEventListener('click', vm[fn.name].bind(vm), false);
        }
    }

    function render(vm, showPool, container, recycleFns) {
        var _data = vm.$data;
        var _el = vm.$el;

        for (var [dom, info] of showPool) {
            switch (info.type) {
                case 'if':
                    info.comment = document.createComment('v-if');
                    !_data[info.prop] && dom.parentNode.replaceChild(info.comment, dom);
                    break;
                case 'show':
                    !_data[info.prop] && (dom.style.display = 'none');
                    break;
                default:
                    break;
            }
        }
        recycleFns.beforeMount();
        _el.appendChild(container);
        recycleFns.mounted();
    }

    function update(vm, showPool) {
        var _data = vm.$data;
        for (var [dom, info] of showPool) {
            if (info.prop === key) {
                switch (info.type) {
                    case 'if':
                        !_data[key] ? dom.parentNode.replaceChild(info.comment, dom) :
                            info.comment.parentNode.replaceChild(dom, info.comment);
                        break;
                    case 'show':
                        !_data[key] ? (dom.style.display = 'none') :
                            (dom.style.display = 'block');
                        break;
                    default:
                        break;

                }
            }
        }
    }


    return Vue;
})()


// 实例
var vm = new Vue({
    el: '#app',
    data() {
        return {
            isShowImg1: false,
            isShowImg2: true
        }
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    template: `<div>
                 <img v-if="isShowImg1" width="100" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1211306800,3708358338&fm=26&gp=0.jpg">
                 <img v-show="isShowImg2" width="100" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1211306800,3708358338&fm=26&gp=0.jpg">
               </div>
               <button @click="showImg1>显示图片1</button>
               <button @click="showImg2>显示图片2</button>
               `,
    methods: {
        showImg1() {
            this.isShowImg1 = !this.IsShowImg1
        },
        showImg2() {
            this.isShowImg2 = !this.IsShowImg2
        }
    }
});