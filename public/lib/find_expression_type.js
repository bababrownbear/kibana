import { datasourceRegistry } from '../expression_types/datasource';
import { transformRegistry } from '../expression_types/transform';
import { modelRegistry } from '../expression_types/model';
import { viewRegistry } from '../expression_types/view';

const expressionTypes = [
  'view',
  'model',
  'transform',
  'datasource',
];

export function findExpressionType(name, type) {
  const checkTypes = expressionTypes.filter(expressionType => type == null || expressionType === type);

  const matches = checkTypes.reduce((acc, checkType) => {
    let expression;
    switch(checkType) {
      case 'view':
        expression = viewRegistry.get(name);
        return (!expression) ? acc : acc.concat(expression);
      case 'model':
        expression = modelRegistry.get(name);
        return (!expression) ? acc : acc.concat(expression);
      case 'transform':
        expression = transformRegistry.get(name);
        return (!expression) ? acc : acc.concat(expression);
      case 'datasource':
        expression = datasourceRegistry.get(name);
        return (!expression) ? acc : acc.concat(expression);
      default:
        return acc;
    }
  }, []);

  if (matches.length > 1) throw new Error(`Found multiple expressions with name "${name}"`);
  return matches[0] || null;
}
