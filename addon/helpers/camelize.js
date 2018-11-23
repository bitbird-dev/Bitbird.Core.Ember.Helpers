import { helper } from '@ember/component/helper';

function walk (obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (isDate(obj) || isRegex(obj)) return obj;
  if (isArray(obj)) return map(obj, walk);
  return reduce(objectKeys(obj), function (acc, key) {
    let camel = camelCase(key);
    acc[camel] = walk(obj[key]);
    return acc;
  }, {});
}

function camelCase(str) {
  return str.replace(/[_.-](\w|$)/g, function (_,x) {
    return x.toUpperCase();
  });
}

let isArray = Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

let isDate = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
};

let isRegex = function (obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

let has = Object.prototype.hasOwnProperty;
let objectKeys = Object.keys || function (obj) {
  let keys = [];
  for (let key in obj) {
    if (has.call(obj, key)) keys.push(key);
  }
  return keys;
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  let res = [];
  for (let i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

function reduce (xs, f, acc) {
  if (xs.reduce) return xs.reduce(f, acc);
  for (let i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i], i);
  }
  return acc;
}

export function camelize(params/*, hash*/) {
  if (typeof params[0] === 'string') return camelCase(params[0]);
  return walk(params[0]);
}

export default helper(camelize);
