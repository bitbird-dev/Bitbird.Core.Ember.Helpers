import { helper } from '@ember/component/helper';

export function length(params/*, hash*/) {
  let value = params[0],
    result = false;

  if(Number.isInteger(value.length))
  {
    return value.length;
  }
  else if(Number.isInteger(result = value.get('length')))
  {
      return result;
  }

  return value;
}

export default helper(length);
