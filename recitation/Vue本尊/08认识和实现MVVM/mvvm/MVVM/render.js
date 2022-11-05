import { stateFormat, eventFormat } from './';
import { bindEvent } from './create/eventFormat';

export function createApp(rootDom, { template, states, methods }) {
  rootDom.innerHTML = render(template, states);
  bindEvent(methods);
}

function render(template, states) {
  template = stateFormat(template, states);
  template = eventFormat(template);
  return template;
}

export function update(statePool, key, value) {
  const domAll = document.querySelectorAll('*');
  let oitem = null;

  statePool.forEach((item) => {
    if (item.state[item.state.length - 1] === key) {
      for (let i = 0; i < domAll.length; i++) {
        oitem = domAll[i];
        const mark = parseInt(oitem.dataset.mark);
        if (mark === item.mark) {
          oitem.innerHTML = value;
        }
      }
    }
  });
}
