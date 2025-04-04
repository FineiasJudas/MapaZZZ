import { NumberArray, NumberProp } from '../../lib/extract/types';
import FilterPrimitive from './FilterPrimitive';
export interface FeDropShadowProps {
    in?: string;
    stdDeviation?: NumberArray;
    dx?: NumberProp;
    dy?: NumberProp;
}
export default class FeDropShadow extends FilterPrimitive<FeDropShadowProps> {
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
//# sourceMappingURL=FeDropShadow.d.ts.map