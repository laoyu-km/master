import { usereactive } from '.';
import { statePool } from '../create/stateFormat';
import { update } from '../render';
import { isObject, hasOwnProperty, isEqual } from '../share/utils';

let set = setter();
let get = getter();

function getter() {
  return function get(target, key, recivere) {
    const res = Reflect.get(target, key, recivere);

    if (isObject(res)) {
      usereactive(res);
    }

    // console.log('动态获取 ' + key);

    return res;
  };
}

function setter() {
  return function set(target, key, value, recivere) {
    const isExist = hasOwnProperty(target, key),
      oldvalue = target[key],
      res = Reflect.set(target, key, value, recivere);

    if (!isExist) {
      // console.log('动态新增 ' + key);
    } else if (!isEqual(value, oldvalue)) {
      update(statePool, key, value);
    }

    return res;
  };
}

const mutibleHandle = {
  get,
  set,
};

export { mutibleHandle };
