import { FC } from "react";
export interface OptionProps {
    index?: number;
    value: string | number;
    disabled?: boolean;
}
export declare const Option: FC<OptionProps>;
export default Option;
