import { NumberProp } from '../../lib/extract/types';
import FilterPrimitive from './FilterPrimitive';
type FeCompositeOperator = 'over' | 'in' | 'out' | 'atop' | 'xor' | 'arithmetic';
export interface FeCompositeProps {
    in?: string;
    in2?: string;
    operator?: FeCompositeOperator;
    k1?: NumberProp;
    k2?: NumberProp;
    k3?: NumberProp;
    k4?: NumberProp;
}
export default class FeComposite extends FilterPrimitive<FeCompositeProps> {
    static displayName: string;
    static defaultProps: {
        x?: NumberProp;
        y?: NumberProp;
        width?: NumberProp;
        height?: NumberProp;
        result?: string;
    };
    render(): null;
}
export {};
//# sourceMappingURL=FeComposite.d.ts.map