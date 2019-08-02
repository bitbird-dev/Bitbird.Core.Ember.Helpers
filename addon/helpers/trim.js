import { helper } from '@ember/component/helper';

export function trim(params/*, hash*/) {
  if (params.length === 0) return null;
  if (params[0] === null || params[0] === undefined) return params[0];

  return params[0].toString().trim();
}

export default helper(trim);
