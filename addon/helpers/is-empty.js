import { helper } from '@ember/component/helper';

export function isEmpty(params/*, hash*/) {
  let val = params[0];

  if(val === null || val === undefined) {
    return true;
  }

  if(typeof val === 'object')
  {
    if(Array.isArray(val)) {
      return val.length === 0;
    }
    return Object.getOwnPropertyNames(params[0]).length === 0;
  }
  else if (typeof val === 'string')
  {
    return val.length === 0;
  }

  return false;
}

export default helper(isEmpty);
