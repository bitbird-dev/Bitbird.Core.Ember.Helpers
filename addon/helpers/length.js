import { helper } from '@ember/component/helper';

export function length(params/*, hash*/) {
  let value = params[0],
    result = false;

  if(Number.isInteger(value))
  {
    return value.toString().length;
  }
  else if(Number.isInteger(value.length))
  {
      return value.length.toString().length;
  }
  else if(value.get && Number.isInteger(result = value.get('length')))
  {
      return result.toString().length;
  }

  return value;
}

export default helper(length);
