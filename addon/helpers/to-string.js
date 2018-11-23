import { helper } from '@ember/component/helper';

export function toString(params/*, hash*/) {
  if (params.length === 0 || params[0] === null || params[0] === undefined) return null;

  let parseJson = !!params[1];

  if(typeof params[0] === 'object' && parseJson) {
    return JSON.stringify(params[0]);
  }

  if(typeof params[0].toString === 'function') {
    return params[0].toString();
  }

  return null;
}

export default helper(toString);
