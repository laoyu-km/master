const check_reg_quotes = /("|')(\w+?)("|')/;
const reg_quote = /("|')/g;

export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

export function hasOwnProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

export function isEqual(newValue, oldValue) {
  return newValue === oldValue;
}

export function makeMarkNumber() {
  return new Date().getTime() + parseInt(Math.random() * 10000);
}

export function checkQuotes(str) {
  if (check_reg_quotes.test(str)) {
    return str.replace(reg_quote, '');
  }

  switch (str) {
    case 'true':
      return true;
    case 'fasle':
      return false;
    default:
      break;
  }

  if (Number(str)) {
    return Number(str);
  }
}
