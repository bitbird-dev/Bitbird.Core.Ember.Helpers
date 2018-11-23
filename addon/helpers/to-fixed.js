import { helper } from '@ember/component/helper';

export function toFixed(params, hash) {
  if (params.length === 0 || params[0] === null || params[0] === undefined) return null;

  let value = params[0],
    fractions = hash.fractions || params[1];

  if(fractions)
  {
    return value.toFixed(fractions >> 0);
  }
  return value.toFixed();
}

export default helper(toFixed);
