import { helper } from '@ember/component/helper';

export function invert(params, hash = { enhancedMode: false }) {
  let enhancedMode = hash.enhancedMode || params[1];
  let type = typeof(params[0]);

  if(enhancedMode !== true) {
    return !params[0];
  }

  switch(params[0]) {
    case 0:
      return 1;
    case 1:
      return 0;
    case "0":
      return "1";
    case "1":
      return "0";
    default:
      if(type === 'number') {
        return params[0] === 0 ? 1 : 0;
      }
      return !params[0];
  }
}

export default helper(invert);
