import { helper } from '@ember/component/helper';

export function trimStart(params/*, hash*/) {
  if (params.length === 0) return null;
  if (params[0] === null || params[0] === undefined) return params[];

  return params[0].toString().trimEnd();
}

export default helper(trimStart);
