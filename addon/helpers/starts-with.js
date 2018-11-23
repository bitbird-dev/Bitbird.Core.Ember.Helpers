import { helper } from '@ember/component/helper';

export function startsWith(params/*, hash*/) {
  if(params[0] === undefined || params[0] === null || typeof params[0].toString !== 'function') return false;

  let str = params[0],
    containedStr = params[1] || '',
    base = str.toString();

  if(typeof base.startsWith === 'function')
  {
    return base.startsWith(containedStr);
  }

  return base.indexOf(containedStr) === 0;
}

export default helper(startsWith);
