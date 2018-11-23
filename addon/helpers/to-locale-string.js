import { helper } from '@ember/component/helper';

export function toLocaleString(params/*, hash*/) {
  if (params.length === 0 || params[0] === null || params[0] === undefined || typeof params[0].toLocaleString !== 'function') return null;

  let value = params[0];

  return value.toLocaleString();
}

export default helper(toLocaleString);
