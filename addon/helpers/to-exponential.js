import { helper } from '@ember/component/helper';

export function toExponential(params, hash) {
  if (params.length === 0 || params[0] === null || params[0] === undefined) return null;

  let value = params[0],
    fractions = hash.fractions || params[1];

  if(fractions)
  {
    return value.toExponential(fractions >> 0);
  }
  return value.toExponential();
}

export default helper(toExponential);
