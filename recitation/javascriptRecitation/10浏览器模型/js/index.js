// 早起浏览器对JavaScript 的处理过程
/**
 * 1. Lexical analysis -> token (词元)
 * 2. parsing token -> syntax tree
 * 3. translator syntaxtree -> byte code
 * 4. bytecode interpreter -> machine code -> 逐行进行 效率低
 *
 */

// 现代
/**
 * JIT -> just in time -> 运行时编译 -> 只在运行时编译，用到哪一行编译到哪一行
 * inline cache -> 编译结果进行缓存
 * 字节码不能直接运行，而是运行在虚拟机上 -> 虚拟机 === js引擎
 *
 */
