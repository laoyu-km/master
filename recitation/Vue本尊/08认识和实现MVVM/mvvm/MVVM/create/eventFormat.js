import { checkQuotes, makeMarkNumber } from '../share/utils';

/**
 * name: eventPool
 * type: []
 * child:
 *   {
 *     mark,
 *     method,
 *     type
 *   }
 *
 */
const reg_methods = /on(\w+?)="(.+?)"/g;
const reg_method_name = /^(\w+?)\(/;
const reg_para = /\((.+?)\)/;
const eventPool = [];
export function eventFormat(template) {
  return template.replace(reg_methods, (node, key1, key2) => {
    const _mark = makeMarkNumber();

    eventPool.push({
      mark: _mark,
      method: key2.trim(),
      type: key1.toLowerCase().trim(),
    });

    return `data-mark="${_mark}"`;
  });
}

export function bindEvent(methods) {
  const doms = document.querySelectorAll('*');
  let oitem = null;
  let _mark = 0;

  eventPool.forEach((event) => {
    for (let i = 0; i < doms.length; i++) {
      oitem = doms[i];
      _mark = parseInt(oitem.dataset.mark);
      if (event.mark === _mark) {
        oitem.addEventListener(
          event.type,
          function () {
            const methodName = event.method.match(reg_method_name)[1];
            const para = checkQuotes(event.method.match(reg_para)[1]);
            methods[methodName](para);
          },
          false
        );
      }
    }
  });
}
