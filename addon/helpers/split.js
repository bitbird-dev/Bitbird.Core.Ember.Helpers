import { helper } from '@ember/component/helper';

export function split(params, hash = { separator: null, limit: null, empty: true, trim: false}) {
  let str = params[0],
    separator = hash.separator || params[1],
    limit = hash.limit || params[2] || undefined,
    empty = hash.empty !== undefined && hash.empty !== null ?
      hash.empty : (params[3] !== undefined && params[3] !== null ? params[3] : true),
    trim = hash.trim || params[4] || false;

  if(str == null) return null;

  if(!separator || typeof separator !== 'string' || separator.length === 0) return str;

  let arr = str.split(separator, limit);

  if (trim) {
    arr = arr.map(function(item) {
      return item.trim();
    });
  }

  if(empty === false)
  {
    arr = arr.filter(function(item) {
      return item !== '' || item === null || item === undefined;
    });
  }

  return arr;
}

export default helper(split);
