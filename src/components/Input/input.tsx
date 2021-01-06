import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
type InputSize = "lg" | "sm";

//本身拥有了size 忽略本身的
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
    /** 是否禁用 Input */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀 用于配置一些固定 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * //这样引用
 * import { Input } from "chenlegion"
 * ~~~
 * 支持 HTMLInput的所有基本属性
 * 
 */

export const Input: FC<InputProps> = (props) => {
    const { disabled, size, icon, style, className, onClick,
        prepend, append, ...restProps } = props;
    const cnames = classNames("chenlegion-input-wrapper", className, {
        [`input-size-${size}`]: size,
        "is-disabled": disabled,
        "input-group": prepend || append,
        "input-group-append": !!append,
        "input-group-prepend": !!prepend
    });
    const fixControlledValue = (value: any) => {
        if (typeof value === "undefined" || value === null) {
            return "";
        };
        return value;
    };
    if ("value" in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    };
    return (
        <div className={cnames} style={style} onClick={onClick}
        
        data-testid="input-component"
        >
            {prepend && <div
                className="chenlegion-input-group-prepend">
                {prepend}
            </div>}
            {icon && <div className="icon-wrapper">
                <Icon icon={icon} title={`title-${icon}`}></Icon></div>}
            <input className="chenlegion-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="chenlegion-input-group-append">{append}</div>}
        </div>
    )
};

export default Input;