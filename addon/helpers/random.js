import { helper } from '@ember/component/helper';
import functions from '../services/functions';

export function random(params/*, hash*/) {
  let p1 = (params[0] || '')*1;
  if(isNaN(p1)) {
    return params;
  }

  let functionsInstance = functions.create();

  let p2 = (params[1] || '')*1;
  if(isNaN(p2)) {
    return functionsInstance.makeId(p1, (params[1] || '').toString());
  }

  return functionsInstance.makeNumericId(p1, p2);
}

export default helper(random);
