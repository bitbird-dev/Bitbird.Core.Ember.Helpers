import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function asHtml(params/*, hash*/) {
  return htmlSafe(params[0]);
}

export default helper(asHtml);
