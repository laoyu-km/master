const { resolve } = require('path');
const { isPromise } = require('util/types');

const Pending = 'Pending';
const Fulfilled = 'Fulfilled';
const Rejected = 'Rejected';

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>')
    );
  }

  let called = false;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        // promise
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executer) {
    this.status = Pending;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }

      if (this.status === Pending) {
        this.status = Fulfilled;
        this.value = value;

        // 订阅
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === Pending) {
        this.status = Rejected;
        this.reason = reason;

        // 订阅
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executer(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === Fulfilled) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === Rejected) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 发布
      if (this.status === Pending) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(errorCallback) {
    this.then(null, errorCallback);
  }

  finally(finallyCallback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(finallyCallback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(finallyCallback()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(error) {
    return new MyPromise((resolve, reject) => {
      reject(error);
    });
  }

  static all(promiseArr) {
    const resArr = [];
    const idx = 0;

    return new MyPromise((resolve, reject) => {
      promiseArr.map((promise, index) => {
        if (isMyPromise(promise)) {
          promise.then((res) => {
            formatResArr(res, index, resolve);
          }, reject);
        } else {
          formatResArr(promise, index, resolve);
        }
      });
    });

    function formatResArr(res, index, resolve) {
      resArr[index] = res;

      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static allSettled(promiseArr) {
    const resArr = [];
    let idx = 0;

    if (!isIterable(promiseArr)) {
      throw new TypeError(
        'myArr: ' +
          promiseArr +
          'undefined is not iterable (cannot read property Symbol(Symbol.iterator))'
      );
    }

    return new MyPromise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([]);
      }

      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(
            (res) => {
              formatResArr('fulfilled', res, index, resolve);
            },
            (reason) => {
              formatResArr('rejected', reason, index, resolve);
            }
          );
        } else {
          formatResArr('fulfilled', promise, index, resolve);
        }
      });
    });

    function formatResArr(status, value, index, resolve) {
      switch (status) {
        case 'fulfilled':
          resArr[index] = {
            status,
            value,
          };
          break;
        case 'rejected':
          resArr[index] = {
            status,
            reason: value,
          };
          break;
        default:
          break;
      }

      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      });
    });
  }
}

function isMyPromise(x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then;
    if (typeof then === 'function') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isIterable(value) {
  return (
    value !== null &&
    value !== undefined &&
    typeof value[Symbol.iterator] === 'function'
  );
}

module.exports = MyPromise;
