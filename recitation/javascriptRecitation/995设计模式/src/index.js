// 发布订阅模式

function publicSubscribe() {
  const listenList = {};

  function find(key, fn) {
    const listenKeyArr = listenList[key];
    let fnCount = 0;

    for (let i = 0; i < listenKeyArr.length; i++) {
      if (listenKeyArr[i] === fn) {
        fnCount++;
      }
    }

    if (fnCount === 0) {
      console.log(`${fn.name} 还没有订阅`);
      return false;
    }

    if (fnCount > 0) {
      console.log(`${fn.name} 已经订阅啦`);
      return true;
    }
  }

  function listen(key, fn) {
    if (!listenList[key]) {
      listenList[key] = [];
    }

    if (find(key, fn)) {
      console.log(`${fn.name} 已经订阅了 ${key}`);
      return;
    }

    listenList[key].push(fn);
  }

  function trigger(key, ...args) {
    if (!listenList[key] || listenList[key].length === 0) {
      return;
    }

    listenList[key].forEach((fn) => {
      fn.apply(this, args);
    });
  }

  function remove(key, fn) {
    if (!listenList[key] || listenList[key].length === 0) {
      return;
    }

    if (!fn) {
      listenList[key] = [];
      return 'done';
    }

    if (!find(key, fn)) {
      console.log(`没有 ${fn.name} 这个订阅`);
      return;
    } else {
      const index = listenList[key].indexOf(fn);
      listenList[key].splice(index, 1);
      console.log(`${fn.name} 删除成功`);
    }
  }

  return { listen, trigger, remove };
}

class Person {
  constructor(name) {
    this.name = name;
  }

  getInfo(...args) {
    this.response(...args);
  }

  response(...args) {
    console.log(this.name, ...args);
  }
}
const p1 = new Person('zhangsan');
const p2 = new Person('lisi');
const baozipu = publicSubscribe();

const fn1 = function (...args) {
  p1.getInfo(...args);
};

const fn2 = function (...args) {
  p2.getInfo(...args);
};

const fn3 = function (...args) {
  console.log(args);
};

baozipu.listen('roubaozi', fn1);
baozipu.listen('caibao', fn2);
baozipu.listen('roubaozi', fn1);

baozipu.trigger('roubaozi', 2.0);
baozipu.trigger('caibao', '0.5');

baozipu.remove('roubaozi', fn3);
baozipu.remove('roubaozi', fn1);
