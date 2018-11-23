import { helper } from '@ember/component/helper';

export function or(params/*, hash*/) {
  for (let i=0, len=params.length; i<len; i++) {
    if (params[i]) {
      return true;
    }
  }
  return false;
}

export default helper(or);
