import React, { CSSProperties, FC, ReactText } from "react";
export declare type valueType = string | number;
export interface SelectProps {
    /**默认选中的数组 */
    defaultValues?: valueType[];
    placeholder?: string;
    /**选择框是否多选 */
    multiple?: boolean;
    /**第一个参数为选中的值，第二个位为总共选中的值数组 */
    onChange?: (selectedValue: valueType, selectedValues: valueType[]) => void;
    /**当打开option时调用的回调 */
    onVisbleChange?: (visible: boolean) => void;
    style?: CSSProperties;
    disabled?: boolean;
    className?: string;
}
export interface iOptionsRef {
    [key: number]: number;
}
export interface iContext {
    SelectedOption?: (selectedValue: valueType, selectedValues: valueType[]) => void;
    selectedValues?: ReactText[] | undefined;
    multiple?: boolean;
    optionsisActived?: boolean[];
    ChangeOptionsActived?: (optionsisActived: boolean[], index: number) => void;
    optionsRef?: React.MutableRefObject<number[]>;
}
export declare const selectContext: React.Context<iContext>;
export declare const Select: FC<SelectProps>;
export default Select;
