import { helper } from '@ember/component/helper';

function _handleArraySource(source, value) {
  return source.includes(value);
}

export function contains(params/*, hash*/) {
  if(params.length === 0) return false;

  let sourceIsArray = Array.isArray(params[0]),
    source = params[0],
    value = params[1];

  if(sourceIsArray) {
    return _handleArraySource(source, value);
  }

  if(value === undefined || value === null) {
    return false;
  }

  return source.toString().indexOf(value.toString()) > -1;
}

export default helper(contains);
