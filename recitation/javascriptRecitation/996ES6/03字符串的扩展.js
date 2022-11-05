// 1. 字符的 Unicode 表示法 -> 大括号表示法
// ES6 加强了对 Unicode 的支持，允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点
// let a = '\u0061';

// 这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示
// let a = '\uD842\uDFB7';
// console.log(a); // 𠮷
// // '\uD842\uDFB7' === '\u20bb7'
// let b = '\u20bb7';
// console.log(b); // ₻7

//上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7

// ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符
// let a = '\u{20BB7}'; // 𠮷

// 大括号表示法与四字节的 UTF-16 编码是等价的
// console.info('\u{20BB7}' === '\uD83D\uDE80'); //true

// JavaScript 共有 6 种方法可以表示一个字符。
// console.log('z');
// console.log('z' === 'z'); // true
// console.log('\172' === 'z'); // true
// console.log('\x7A' === 'z'); // true
// console.log('\u007A' === 'z'); // true
// console.log('\u{7A}' === 'z'); // true

// 2. 字符串的遍历器接口 -> 字符串可被 for...of...遍历
// 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点

// 3. 直接输入 U+2028 和 U+2029
// JavaScript 规定有5个字符，不能在字符串里面直接使用(直接输入或输入转义形式都不行)，只能使用转义形式
// U+005C：反斜杠（reverse solidus)
// U+000D：回车（carriage return）
// U+2028：行分隔符（line separator）
// U+2029：段分隔符（paragraph separator）
// U+000A：换行符（line feed）
// 举例来说，字符串里面不能直接包含反斜杠，一定要转义写成\\或者\u005c

// 这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。
// const json = '"\u2028"';
// console.log(JSON.parse(json)); // 可能报错
// JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）
// const ps = eval("'\u2028'");
// console.log(ps.charCodeAt(0));

// 注意正则表达式依然不允许直接输入这两个字符

// 4. JSON.stringify() 的改造
// UTF-8 标准规定，0xD800到0xDFFF之间的码点，不能单独使用，必须配对使用。比如，\uD834\uDF06是两个码点，但是必须放在一起配对使用，代表字符𝌆。这是为了表示码点大于0xFFFF的字符的一种变通方法
// 单独使用\uD834和\uDF06这两个码点是不合法的，或者颠倒顺序也不行，因为\uDF06\uD834并没有对应的字符
// JSON.stringify()的问题在于，它可能返回0xD800到0xDFFF之间的单个码点
// 为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
// console.log('\uD834'); // � -> 单独使用 \uD800 - \uDFFF 之间的码点出现乱码
// const json = JSON.stringify('\u{D834}'); // -> "\uD834" -> JSON.stringify 遇到 \uD800 - \uDFFF 之间的没有配对的码点会返回码点的转义字符串
// const json2 = JSON.stringify('\u{D834}\u{Df06}'); // -> "𝌆"
// console.log(JSON.stringify('\u{DF06}\u{D834}')); // -> "\udf06\ud834" -> 不出现乱码

// 5. 模板字符串
// 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
// 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
// 模板字符串中嵌入变量，需要将变量名写在${}之中
// 由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出
// 模板字符串甚至还能嵌套
// const porns = [
//   { name: 'jayden', age: '30' },
//   { name: 'alexis', age: '31' },
//   { name: 'nina', age: '36' },
// ];
// let template = `
//   <table>
//     <caption>table</caption>
//     <tr>
//       <th>name</th>
//       <th>age</th>
//     </tr>
//     ${porns
//       .map(
//         (porn) => `
//       <tr>
//         <td>${porn.name}</td>
//         <td>${porn.age}</td>
//       </tr>
//     `
//       )
//       .join(',')
//       .replace(/,/g, '')}
//   </table>
// `;

// 6. 实例：模板编译
// let template = `
// <ul>
//   <% for(let i=0; i < data.porn.length; i++) { %>
//     <li><%= data.porn[i] %></li>
//   <% } %>
// </ul>
// `;

// function compile(template) {
//   // const reg1 = /<%=(.*?)%>/g,
//   //   reg2 = /<%([\s\S]+?)%>/g;

//   const reg1 = /(<[^\s]+>)/g,
//     reg2 = /<%=(.*?)%>/g,
//     reg3 = /<%([\s\S]*?)%>/g;

//   template = template
//     .replace(reg1, 'echo(`$1`);')
//     .replace(reg2, 'echo($1);')
//     .replace(reg3, '$1');

//   let script = ` (function parse(data){
//       let output = "";

//       function echo(html) {
//         output += html;
//       }

//       ${template}

//       return output;
//     }) `;

//   return script;
// }

// let data = { porn: ['jayden', 'alexis', 'arriella'] };
// let res = eval(compile(template));
// console.log(typeof res);

// let show = document.querySelector('.show');
// show.innerHTML = res(data);

// let tem = `echo("<div>");echo(name);echo("<div>");`;
// eval(`
//   function test() {
//     let output = "";
//     let name = "jayden";
//     function echo (html) {
//       output += html;
//     }
//     ${tem}
//   return output;
// }
//   `);

// console.log(test());

// 7. 标签模板
// 模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
// alert`hello`;
// 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数
// 如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数
// tag`Hello ${a + b} Jayden ${a * b}`;  === tag(['Hello ', ' Jayden', ''], a + b, a * b);
// tag 函数的实现
// function tag(strArr, val01, val02) {
//   let s = '';
//   for (let i = 0; i < strArr.length; i++) {
//     s += strArr[i];
//     s += arguments[i + 1] ? arguments[i + 1] : '';
//   }

//   return s;
// }
// let a = 3,
//   b = 5;
// console.log(tag`Hello ${a + b} Jayden ${a * b}`); // Hello 8 Jayden 15

// // 更复杂的例子 -> 形参只指定了strArr, 调用时其他参数也传入
// let total = 30;
// let msg = passthu`The total is ${total} (${total * 0.15} with tax)`;

// function passthu(literals) {
//   let s = '',
//     i = 0;

//   while (i < literals.length) {
//     s += literals[i++];
//     if (i < arguments.length) {
//       s += arguments[i];
//     }
//   }

//   return s;
// }
// console.log(msg);

// // passthru函数采用 rest 参数的写法如下
// let total = 30;
// let msg = passthu`The total is ${total} (${total * 0.15} with tax)`;
// function passthu(literals, ...values) {
//   let s = '',
//     i;
//   for (i = 0; i < literals.length; i++) {
//     s += literals[i];
//     if (values[i]) {
//       s += values[i];
//     }
//   }
//   return s;
// }
// console.log(msg);

// // “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容
// function safeHTML(templateData) {
//   let s = templateData[0];

//   for (let i = 1; i < arguments.length; i++) {
//     let arg = String(arguments[i]);

//     s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

//     s += templateData[i];
//   }

//   return s;
// }
// let sender = '<script>alert("jayden")</script>';
// let message = safeHTML`<p>${sender} has sent your a message</p>`;
// console.log(message); // <p>&lt;script&gt;alert("jayden")&lt;/script&gt; has sent your a message</p>

// 模板标签的模板内容 -> strArr 的属性描述 是不可写， 不可配置的 -> writable: false; configurable: false
// 标签模板的另一个应用，就是多语言转换（国际化处理）
// function i18n(sArr) {
//   const strArr = [];
//   strArr[0] = '欢迎访问';
//   strArr[1] = ', 您是第';
//   strArr[2] = '位访问者';

//   console.log(Object.getOwnPropertyDescriptors(sArr));

//   let s = strArr[0];

//   for (let i = 1; i < arguments.length; i++) {
//     s += arguments[i] + strArr[i];
//   }

//   return s;
// }

// let sitename = 'jayden home';
// let visitornumber = 30;
// let message = i18n`Welcome to ${sitename}, you are visitor number ${visitornumber}`;
// console.log(message);

// 通过标签函数，你可以自己添加条件判断和循环处理功能 -> for...in.. 默认获取键名， for..of.. 默认获取键值
// // 使用新增<script>标签的方法
// function hashTemplate(template) {
//   let str = `
//     let s = ""; \n
//   `;

//   const reg1 = /#{(.+?)\.(.+?)}/g;
//   const reg2 = /#end/g;
//   const reg3 = /#(for)([\s\S]+?)\n/g;

//   template = template
//     .replace(reg1, '` + ' + myBooks + '[$1].$2 + `') // for...in... 只能取到键名， 不能取到键值
//     .replace(reg2, '`; \n } \n s +=`')
//     .replace(reg3, '`; \n $1 ($2) { \n s +=`');

//   str = str + 's += `' + template + '`\n;';

//   // return str;
//   return str;
// }

// let shediao = { title: 'sdyxz', author: 'jinyong' };
// let lxf = { title: 'luxiaofeng', author: 'gulong' };

// let myBooks2 = {
//   shediao,
//   lxf,
// };

// // 使用新增<script>标签的方法必须将所有内容转化为字符串放入<script>标签，所以这里需要让${myBooks}成为字符串，而不是对象
// let myBooks = 'myBooks2';

// let template = `
//   <ul>
//     #for book in ${myBooks}
//       <li><i>#{book.title}</i> by #{book.author}</li>
//     #end
//   </ul>
// `;

// let render = `
//   let show = document.querySelector('.show');
//   show.innerHTML = s;
// `;

// let res = hashTemplate(template) + render;

// let body = document.querySelector('body');
// let script = document.createElement('script');
// script.className = 'newscript';

// script.textContent = res;

// // console.log(script.textContent);
// body.appendChild(script);

// // 自写方法
// let myBooks = {
//   book1: {
//     title: 'ztj',
//     author: 'maoni',
//   },
//   book2: {
//     title: 'xzhdx',
//     author: 'fhxzh',
//   },
// };

// let libraryHtml = hashTemplate`
//   <ul>
//     #for book in ${myBooks}
//       <li><i>#{book.title}</i> by #{book.author}</li>
//     #end
//   </ul>
// `;

// function hashTemplate(templateArr) {
//   let strArr = [];
//   let s = ``;
//   for (let i = 0; i < templateArr.length; i++) {
//     strArr[i] = Object.getOwnPropertyDescriptor(templateArr, i).value;
//   }

//   s += isStrHasFor(strArr, arguments);

//   return s;
// }

// function isStrHasFor(strArr, arguments) {
//   for (let i = 0; i < strArr.length; i++) {
//     let s = '';

//     if (strArr[i].search(/#for/g) !== -1) {
//       s += strArr[i].slice(0, strArr[i].indexOf('#'));

//       if (strArr[i].search(/\sin\s/) !== -1) {
//         for (let book in arguments[i + 1]) {
//           let str = strArr[i + 1].match(/([\s\S]+?)#end/)[1];
//           str = str.replace(/#\{\w*?\.(\w*?)\}/g, (item, key1) => {
//             return arguments[i + 1][book][key1];
//           });

//           s += str;
//         }
//       } else if (strArr[i].search(/\sof\s/) !== -1) {
//         console.log('has of');
//       }
//     } else {
//       if (strArr[i].search(/#end/g) !== -1) {
//         if (arguments[i + 1]) {
//           s += strArr[i].match(/#end([\s\S]*)/)[1] + arguments[i + 1];
//         } else {
//           s += strArr[i].match(/#end([\s\S]*)/)[1];
//         }
//       } else {
//         if (arguments[i + 1]) {
//           s += strArr[i] + arguments[i + 1];
//         } else {
//           s += strArr[i];
//         }
//       }
//     }
//   }

//   return s;
// }

// let str = `${libraryHtml}`;

// const show = document.querySelector('.show');
// show.innerHTML = str;

// 模板处理函数的第一个参数（模板字符串数组），还有一个raw属性
// raw属性，也指向一个数组。该数组的成员与strings数组完全一致, 两者唯一的区别，就是字符串里面的斜杠都被转义了, 是为了方便取得转义之前的原始模板而设计的
// tag`First line\nSecond line`; // ['First line\\nSecond line']

// function tag(strArr) {
//   console.log(strArr.raw);
// }

// 8. 模板字符串的限制
// \u和\x在 LaTEX 里面有特殊含义，但是 JavaScript 将它们转义了
// 为了解决这个问题，ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。

// tag`\unicode and \u{55}`;
// function tag(strArr) {
//   strArr[0] === undefined;
//   strArr.raw === '\\unicode and \\{55}';
// }
// 上面代码中，模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了，JavaScript 引擎将第一个字符设置为undefined，但是raw属性依然可以得到原始字符串，因此tag函数还是可以对原字符串进行处理。

// 注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错
