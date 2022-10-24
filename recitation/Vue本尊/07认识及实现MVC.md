# MVC

```js
/**
 * MVC
 * M: Model      数据模型(模型层) -> 操作数据库(对数据进行增删改查的操作)
 * V: View       视图层 -> 显示视图和视图模板
 * C: Controller 控制器层 -> 逻辑层 数据和视图关联挂在和基本的逻辑操作
 *                           API层 前端请求的API对应的是控制器中的方法
 * 
 *  服务端喧嚷 
 *     View需要数据 -> Controller对应的方法 -> 调用Model的方法 -> 获取数据 -> 返回给Controller对应的方法 -> render 到 View中
 * 
 *   前端渲染
 *     前端 -> 异步请求URL -> 控制器中的一个方法 -> Model层的方法 -> 操作数据库 -> 获取数据 -> 返回给控制器的方法 -> 响应回前端
 * 
 * 前端MVC
 *   Model -> 管理视图所需要的数据 -> 数据与视图关联
 *   View  -> HTML 模板 + 视图喧嚷
 *   controller -> 管理事件逻辑 
 * 
 * 案例
 * 加减乘除计算器
 * Model -> 管理data -> a, b, s(运算符号), r(结果)
 *       -> watch(监听) -> data change -> update view
 * 
 * View -> 提供template -> 进行render
 * 
 * Controller -> 管理event trigger(事件触发) -> 修改model/data
 * 
 * controller -> 操作model -> 操作view
 * view -> controller -> model
 *        
 * MVVM雏形   ViewModel   M data/逻辑 V view 
 * vue -> 关注于视图渲染  ref-> 直接获取DOM节点  MV-> ViewModel whatever
 * ViewModel -> 收集依赖，模板编译， 数据劫持
 * Vue 不是MVVM框架，只是借鉴了MVVM模型 -> 只是视图渲染库
 * 
 * angular -> MVW (whatever)
 */
```

```js
// mvc 案例：加减乘除计算器
(function () {
  function init() {
    model.init(); // 组织数据 + 数据监听操作 / 数据代理
    view.render(); // 组织HTML模板 + 渲染HTML模板
    controller.init(); // 事件处理函数与绑定
  }

  let model = {
    data: {
      a: 0,
      b: 0,
      s: '+',
      r: 0,
    },
    init: function () {
      var _this = this;

      for (let k in _this.data) {
        (function (k) {
          Object.defineProperty(_this, k, {
            // model.a -> get
            get: function () {
              return _this.data[k];
            },
            set: function (newValue) {
              //model.a = 123; -> set
              _this.data[k] = newValue;

              view.render({ [k]: newValue });
            },
          });
        })(k);
      }
    },
  };

  let view = {
    el: '#app',
    template: `
      <p>
        <span class="cal-a">{{ a }}</span>
        <span class="cal-s">{{ s }}</span>
        <span class="cal-b">{{ b }}</span>
        <span class="cal-d">=</span>
        <span class="cal-r">{{ r }}</span>
      </p>
      <p>
        <input type="text" class="cal-input a" />
        <input type="text" class="cal-input b" />
      </p>
      <p>
        <button class="cal-btn">+</button>
        <button class="cal-btn">-</button>
        <button class="cal-btn">*</button>
        <button class="cal-btn">/</button>
      </p>
    `,
    render: function (mutedValue) {
      if (!mutedValue) {
        this.template = this.template.replace(
          /\{\{(.+?)\}\}/g,
          function (item, key) {
            return model[key.trim()];
          }
        );
        // console.log(this.template);

        let container = document.createElement('div');
        container.innerHTML = this.template;
        document.querySelector(this.el).appendChild(container);
      } else {
        for (let k in mutedValue) {
          // document.querySelector('.cal-' + k).innerText = mutedValue[k];
          document.querySelector('.cal-' + k).textContent = mutedValue[k];
        }
      }
    },
  };

  let controller = {
    init: function () {
      let oInputs = document.querySelectorAll('.cal-input'),
        oBtn = document.querySelectorAll('.cal-btn'),
        inputItem,
        btnItem;

      for (let i = 0; i < oInputs.length; i++) {
        inputItem = oInputs[i];
        inputItem.addEventListener('input', this.inputHandel, false);
      }

      for (let i = 0; i < oBtn.length; i++) {
        btnItem = oBtn[i];
        btnItem.addEventListener('click', this.btnHandel, false);
      }
    },
    inputHandel: function (e) {
      let tar = e.target,
        value = Number(tar.value),
        filed = tar.className.split(' ')[1];

      model[filed] = value;
      // model.r = eval('model.a model.s model.b'); // 报错
      // model.r = eval('model.a' + model.s + 'model.b');
      with (model) {
        r = eval('a' + s + 'b');
      }
    },
    btnHandel: function (e) {
      let type = e.target.textContent;

      model.s = type;
      with (model) {
        r = eval('a' + s + 'b');
      }
    },
  };

  init();
})();
```