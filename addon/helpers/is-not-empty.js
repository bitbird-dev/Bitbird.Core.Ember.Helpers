import { helper } from '@ember/component/helper';
import isEmptyHelper from './is-empty';

export function isNotEmpty(params/*, hash*/) {
  return !isEmptyHelper.compute(params);
}

export default helper(isNotEmpty);
