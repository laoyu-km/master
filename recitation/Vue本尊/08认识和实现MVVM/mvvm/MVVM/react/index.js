import { isObject } from '../share/utils';
import { mutibleHandle } from './mutibleHandle';

export function usereactive(valueObj) {
  return createReactiveObj(valueObj, mutibleHandle);
}

function createReactiveObj(target, baseHandle) {
  if (!isObject(target)) {
    return target;
  }

  let observe = new Proxy(target, baseHandle);

  return observe;
}
