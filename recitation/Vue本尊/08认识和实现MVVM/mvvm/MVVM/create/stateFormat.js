import { makeMarkNumber } from '../share/utils';

/**
 * name statePool
 * type: []
 * child: {
 *   mark: Number
 *   state: []
 *
 * }
 */
export const statePool = [];

let o = 0;
let _state = {};
const reg_template = /<(\w+?)>(\s*)?\{\{\s*?(\w+?)\s*?\}\}\2<\/\1>/g;
const reg_var = /\{\{(.+?)\}\}/g;

export function stateFormat(template, states) {
  template = template.replace(reg_template, (item, key1, key2, key3) => {
    const _mark = makeMarkNumber();
    _state.mark = _mark;
    statePool.push(_state);

    _state = {};

    return `<${key1.trim()} data-mark="${_mark}"> {{ ${key3.trim()} }}</${key1.trim()}>`;
  });

  template = template.replace(reg_var, (item, key) => {
    let _var = key.trim();
    const _varArr = _var.split('.');

    statePool[o].state = _varArr;
    o++;

    let i = 0;
    while (i < _varArr.length) {
      _var = states[_varArr[i]];
      i++;
    }

    return _var;
  });

  return template;
}
