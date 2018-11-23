import { helper } from '@ember/component/helper';

export function nameFor(params/*, hash*/) {
  if (params.length === 0 || params[0] === null || params[0] === undefined || params[0].constructor === undefined) return null;

  return params[0].constructor.modelName || params[0].constructor.name || undefined;
}

export default helper(nameFor);
