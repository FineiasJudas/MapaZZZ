import { ColorValue } from 'react-native';
import { NumberProp } from '../../lib/extract/types';
import FilterPrimitive from './FilterPrimitive';
export interface FeFloodProps {
    in?: string;
    floodColor?: ColorValue;
    floodOpacity?: NumberProp;
}
export default class FeFlood extends FilterPrimitive<FeFloodProps> {
    static displayName: string;
    static defaultProps: React.ComponentProps<typeof FeFlood>;
    render(): import("react").JSX.Element;
}
//# sourceMappingURL=FeFlood.d.ts.map