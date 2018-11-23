import { helper } from '@ember/component/helper';

export function percentage(params/*, hash*/) {
  if (params.length === 0 || params[0] === null || params[0] === undefined) return null;
  if (params[1] === null) return null;

  //When just 1 parameter, we assume decimal value to be represented. i.e. 0.98 => 98%
  if(params[1] === undefined) {
    return Number.parseFloat(params[0]) * 100;
  }

  //Assume a calculation needs to be done
  return 100 / Number.parseFloat(params[1]) * Number.parseFloat(params[0]);
}

export default helper(percentage);
