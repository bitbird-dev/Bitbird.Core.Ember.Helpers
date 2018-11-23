import { helper } from '@ember/component/helper';

export function toPrecision(params, hash) {
  if (params.length === 0 || params[0] === null || params[0] === undefined) return null;

  let value = params[0],
    fractions = hash.fractions || params[1];

  if(fractions)
  {
    fractions = fractions >> 0;
    if(fractions > 0 && fractions <= 100)
      return value.toPrecision(fractions);
  }
  return value.toPrecision();
}

export default helper(toPrecision);
