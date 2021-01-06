import React, { Children, cloneElement, createContext, CSSProperties, FC, FunctionComponentElement, ReactText, useRef, useState } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import { OptionProps } from "./option";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";

export type valueType = string | number;



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
};
export interface iOptionsRef {
    [key: number]: number
}

export interface iContext {
    SelectedOption?: (selectedValue: valueType, selectedValues: valueType[]) => void;
    selectedValues?: ReactText[] | undefined;
    multiple?: boolean;
    optionsisActived?: boolean[];
    ChangeOptionsActived?: (optionsisActived: boolean[], index: number) => void;
    optionsRef?: React.MutableRefObject<number[]>;
}

export const selectContext = createContext<iContext>({});




export const Select: FC<SelectProps> = (props) => {
    let { defaultValues, placeholder, multiple, disabled, className,
        onChange, onVisbleChange, children, ...restProp } = props;
    if (defaultValues?.length) {
        placeholder = "";
    }
    const [selectedValues, setValues] = useState(defaultValues);
    const [switchOp, setSwitch] = useState(false);
    const [inputPla, setPlaceholder] = useState(placeholder);
    const [optionsisActived, setOptionsActived] = useState<boolean[]>([]);

    const optionsRef = useRef<number[]>([]);
    const selectRef = useRef<HTMLDivElement>(null);
    const cnames = classNames("chenlegion-select", className);
    const handelSelected = (value: valueType, selectedValues: valueType[]) => {
        setValues([...selectedValues]);
        if (onChange) {
            onChange(value, selectedValues);
        }
        setPlaceholder("");
        if (!multiple) {
            setSwitch(!switchOp);
        }

    };
    useClickOutside(selectRef, () => {
        if (switchOp) {
            setSwitch(!switchOp)
        };
    });

    const ChangeOptionsActived = (optionsisActived: boolean[], index: number) => {
        if (!optionsisActived) {
            return;
        };
        optionsisActived[index] = !optionsisActived[index];
        setOptionsActived(optionsisActived);
    }
    const passContext: iContext = {
        SelectedOption: handelSelected,
        selectedValues,
        multiple,
        ChangeOptionsActived,
        optionsRef: optionsRef
    }
    const renderChildren = () => {
        const cArr = Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<OptionProps>
            if (!optionsisActived[i]) {
                optionsisActived[i] = false;
            }
            return cloneElement(childElement, {
                index: i
            });
        });
        passContext.optionsisActived = optionsisActived;
        return cArr;
    };
    const handelClick = (switchOp: boolean) => {
        switchOp = !switchOp
        setSwitch(switchOp);
        if (onVisbleChange) {
            onVisbleChange(switchOp);
        };
    };

    return (
        <div className={cnames} {...restProp} ref={selectRef} >
            <selectContext.Provider value={passContext}>
                <Input onClick={() => handelClick(switchOp)}
                    className={`select-input` + ((!disabled && switchOp) ? " is-actived" : "")}
                    readOnly placeholder={inputPla} icon="angle-down"
                    disabled={disabled}
                    value={multiple ? "" : (selectedValues ? selectedValues[0] : "")}
                ></Input>
                <Transition
                    in={!disabled && switchOp}
                    timeout={300}
                    animation="zoom-in-top"
                >
                    <ul className={`select-ul ${switchOp ? "test-selected-ul" : ""}`}>
                        {renderChildren()}
                    </ul>
                </Transition>
                {multiple && <div className="select-options">
                    {
                        selectedValues && (selectedValues.length > 0) && selectedValues.map((child, index) => {
                            return <span key={index} className="option-selected">{child}
                                <Icon icon="times"

                                    data-testid={"select-Icon" + "-" + index}
                                    onClick={() => {
                                        optionsisActived[optionsRef.current[index]] = false;
                                        selectedValues.splice(index, 1);
                                        optionsRef.current.splice(index, 1);
                                        if (selectedValues.length === 0) {
                                            setSwitch(!switchOp);
                                        }
                                        setValues([...selectedValues]);
                                        setOptionsActived(optionsisActived);
                                        passContext.optionsisActived = optionsisActived;

                                    }}></Icon>
                            </span>
                        })
                    }
                </div>}
            </selectContext.Provider>
        </div>
    )
};

Select.defaultProps = {
    defaultValues: [],
};

export default Select;