import { helper } from '@ember/component/helper';

export function trimEnd(params/*, hash*/) {
  if (params.length === 0) return null;
  if (params[0] === null || params[0] === undefined) return params[0];

  return params[0].toString().trimEnd();
}

export default helper(trimEnd);
