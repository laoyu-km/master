// strict mode
// ES6 module mode default strict mode

// 显示报错
/**
 * 1. 只读属性赋值 -> wirtable: fasle
 * 2. delete 不可配置属性 -> configurable: fasle
 * 3. 只有取值函数属性赋值 -> get(), 无 set()
 * 4. 不可扩张对象新增属性 -> preventExtensions()
 * 5. eval，arguments 不可作为标识符 -> 函数名，变量名, 函数形参
 * 6. 函数参数不可重名 -> arguments[i]
 * 7. 8进制数不可用0开头 -> 0x100, 0b100, 0o100
 */

// 安全增强
/**
 * 1. 全局变量，必须显式声明
 * 2. this禁止指向全局对象 -> this -> undefined
 * 3. fn.caller, fn.callee, fn.arguments 不可用 -> 禁止访问函数调用栈
 * 4. arguments.caller, arguments.callee 不可用
 * 5. delete 禁止删除变量， 只可删除对象属性 -> 全局属性delete不了是因为属性的configurable: false
 */

// 静态编译
/**
 * 1. with 不可用 -> with 动态编译 指定属性属于那个对象
 * 2. eval单独作用域 -> 不声明的话还是取外部的变量 -> eval 使用 strict 的两种方式
 * 3. arguemnts 不在关联函数参数, 不在追踪函数参数变化
 */

// 预留
/**
 * 1. 出函数块外，其他块内不得声明函数 -> es6 可以
 * 2. 预留关键字： static, implements, private, protected, public,
 * interface, filed, let, package
 */
