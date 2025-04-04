import { warnUnimplementedFilter } from '../../lib/util';
import FilterPrimitive from './FilterPrimitive';
export default class FeDropShadow extends FilterPrimitive {
  static displayName = 'FeDropShadow';
  static defaultProps = {
    ...this.defaultPrimitiveProps
  };
  render() {
    warnUnimplementedFilter();
    return null;
  }
}
//# sourceMappingURL=FeDropShadow.js.map