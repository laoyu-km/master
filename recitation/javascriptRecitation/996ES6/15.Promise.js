// promise 成功的条件
// then return javascript 合法的 value
// then return 新的promise成功态的结果 value

// promise 失败的条件
// then return 新的promise失败态的结果 reason
// then 抛出了异常 throw new Error

// promise 链式调用
// then 不具备 this -> 无法想JQuery 那样在函数中返回this, 来实现链式调用
// 所以 then 应该是 return new promise 来实现立案时调用

// reject 中使用new Promise 是没有意义的
