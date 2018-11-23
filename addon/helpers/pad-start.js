import { helper } from '@ember/component/helper';

export function padStart(params/*, hash*/) {
  let str = params[0],
    targetLength  = params[1] >> 0,
    padString = params[2] || ' ';

  if(str === null || str === undefined) return null;

  str = str.toString();

  if(str.padStart) {
    //return str.padStart(targetLength, padString);
  }

  while(str.length < targetLength ) {
    str = padString + str;
  }

  str = str.substr(str.length-targetLength);

  return str;
}

export default helper(padStart);
