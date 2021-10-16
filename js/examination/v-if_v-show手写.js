var Vue = (function () {
  var Vue = function (options) {
    
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

  Vue.prototype._init = function (vm, template, methods, recycleFns) {
    recycleFns.created();
    
    var container = document.createElement('div');
    container.innerHTML = template;

    var showPool = new Map();
    var eventPool = new Map();

    initData(vm, showPool);
    initPool(container, methods, showPool, eventPool);
    bindEvent(vm, eventPool);
    render(vm, showPool, container, recycleFns);
  }

  function initData (vm, showPool) {
    var _data = vm.$data;

    for (var key in _data) {
      (function (key) {
        Object.defineProperty(vm, key, {
          get: function () {
            return _data[key];
          },
          set: function (newValue) {
            _data[key] = newValue;
            update(vm, key, showPool);
          }
        })
      })(key);
    }
  }

  function initPool (container, methods, showPool, eventPool) {
    var allNodes = container.getElementsByTagName('*');
    var dom = null;

    for (var i = 0; i < allNodes.length; i ++) {
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
        });
        dom.removeAttribute('v-show');
      }

      if (vEvent) {
        eventPool.set(dom, methods[vEvent]);
        dom.removeAttribute('@click');
      }
    }
  }

  function bindEvent (vm, eventPool) {
    for (var [dom, fn] of eventPool) {
      vm[fn.name] = fn;
      dom.addEventListener('click', vm[fn.name].bind(vm), false);
    }
  }

  function render (vm, showPool, container, recycleFns ) {
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

  function update (vm, key, showPool) {
    var _data = vm.$data;

    for (var [dom, info] of showPool) {
      if (info.prop === key) {
        switch (info.type) {
          case 'if':
            !_data[key] ? dom.parentNode.replaceChild(info.comment, dom)
                        : info.comment.parentNode.replaceChild(dom, info.comment);
            break;
          case 'show':
            !_data[key] ? (dom.style.display = 'none')
                        : (dom.style.display = 'block');
            break;
          default:
            breakl
        }
      }
    }
  }

  return Vue;
})();

/**
 * 
 * showPool
 * 
 * Map {
 *   dom: {
 *     type,
 *     props
 *   }
 * }
 * 
 * [
 *   [
 *     dom,
    *   {
    *     type: if / show
    *     prop: data.prop
    *   }
 *   ]
 * ]
 * 
 * eventPool 
 * 
 * [
 *   [
 *     dom,
 *     handler -> changeData -> set -> update
 *   ]
 * ]
 * 
 * 
 */

var vm = new Vue({
  el: '#app',
  data () {
    return {
      isShowImg1: false,
      isShowImg2: false
    }
  },
  beforeCreate () {
    console.log(this);
    console.log('beforeCreate');
  },
  created () {
    console.log('created');
  },
  beforeMount () {
    console.log('beforeMount');
  },
  mounted () {
    console.log('mounted');
    this.isShowImg2 = true;
  },
  template: `
    <div>
      <img v-if="isShowImg1" width="200" src="https://seopic.699pic.com/photo/50034/0209.jpg_wh1200.jpg" />
      <img v-show="isShowImg2" width="200" src="https://seopic.699pic.com/photo/50111/4572.jpg_wh1200.jpg" />
    </div>
    <button @click="showImg1">显示图片1</button>
    <button @click="showImg2">显示图片2</button>
  `,
  methods: {
    showImg1 () {
      this.isShowImg1 = !this.isShowImg1;
    },
    showImg2 () {
      this.isShowImg2 = !this.isShowImg2;
    }
  }
});

console.log(vm);