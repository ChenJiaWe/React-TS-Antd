import React, { FC, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { selectContext } from "./select";
import Icon from "../Icon/icon";



export interface OptionProps {
    index?: number;
    value: string | number;
    disabled?: boolean;
};


export const Option: FC<OptionProps> = (porps) => {
    const { index, value, disabled } = porps;
    const context = useContext(selectContext);
    const [optionSelected, setSelected] = useState(false);
    const cnames = classNames("select-option", {
        "option-actived": optionSelected,
        "option-disabled": disabled,
    });
    useEffect(() => {
        const selectedValues = context.selectedValues || [];
        const multiple = context.multiple;
        const optionsisActived = context.optionsisActived || [];
        if (multiple && selectedValues.length && index) {
            if (!selectedValues.includes(value)) {
                setSelected(false);
            }
            selectedValues.forEach((v, i) => {
                if (v === value && context.optionsRef?.current[i] !== index && !optionsisActived[index]) {
                    setSelected(false);
                }
            });
            selectedValues.forEach((v, i) => {
                if (v === value && context.optionsRef?.current[i] === index && optionsisActived[index]) {
                    setSelected(true);
                }
            });
        }
    }, [context.multiple, context.selectedValues, value, 
        context.optionsisActived, index,context.optionsRef]);
    const handleOptionClick = () => {
        if (disabled) {
            return;
        }
        const selectedValues = context.selectedValues || [];
        const multiple = context.multiple;
        const optionsisActived = context.optionsisActived || [];
        if (multiple) {
            if (!selectedValues.includes(value) || (selectedValues.includes(value)
                && index && !optionsisActived[index])) {
                selectedValues.push(value);
                if (context.optionsRef && index) {
                    const i = selectedValues.length - 1;
                    context.optionsRef.current[i] = index;
                }
                if (index && context.ChangeOptionsActived) {
                    context.ChangeOptionsActived(optionsisActived, index);
                };
                setSelected(true);
                if (context.SelectedOption) {
                    context.SelectedOption(value, selectedValues);
                }
            } else {
                selectedValues.splice(selectedValues.indexOf(value), 1);
                context.optionsRef?.current.splice(selectedValues.indexOf(value), 1);
                setSelected(false);
                if (index && context.ChangeOptionsActived) {
                    context.ChangeOptionsActived(optionsisActived, index);
                };
                if (context.SelectedOption) {
                    context.SelectedOption(value, selectedValues);
                }
            }
        } else {
            if (selectedValues.length) {
                selectedValues.pop();
            };
            selectedValues.push(value);
            if (context.SelectedOption) {
                context.SelectedOption(value, selectedValues);
            }
        }
    }
    return (
        <li className={cnames} onClick={handleOptionClick}
            key={index}>{value}
            {optionSelected && <Icon theme="primary" icon="check"></Icon>}</li>
    )
}

export default Option;