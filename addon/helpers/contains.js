import { helper } from '@ember/component/helper';

function _handleArraySource(source, value) {
  return source.includes(value);
}

export function contains(params/*, hash*/) {
  if(params.length === 0) return false;

  let source = params[0];

  if(source && source.toArray) {
    source = source.toArray();
  }

  let sourceIsArray = Array.isArray(source),
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
