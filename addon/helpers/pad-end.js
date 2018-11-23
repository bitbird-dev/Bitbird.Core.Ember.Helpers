import { helper } from '@ember/component/helper';

export function padEnd(params/*, hash*/) {
  let str = params[0],
    targetLength  = params[1] >> 0,
    padString = params[2] || ' ';

  if(str === null || str === undefined) return null;

  str = str.toString();

  if(str.padEnd) {
    //return str.padEnd(targetLength, padString);
  }

  while(str.length < targetLength ) {
    str = str + padString;
  }

  str = str.substr(0, targetLength);

  return str;
}

export default helper(padEnd);
