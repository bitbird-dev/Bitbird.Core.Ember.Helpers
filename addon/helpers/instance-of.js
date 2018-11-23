import ArrayProxy from '@ember/array/proxy';
import { helper } from '@ember/component/helper';

export function instanceOf(params/*, hash*/) {
  if(!params[1]) return false;

  if(typeof(params[0]) !== 'object') return false;

  if(params[1].toLowerCase() === 'array') {
    return params[0] instanceof ArrayProxy || params[0] instanceof Array;
  }

  if(params[1].toLowerCase() === 'object') {
    return params[0] instanceof Object;
  }

  return false;
}

export default helper(instanceOf);
