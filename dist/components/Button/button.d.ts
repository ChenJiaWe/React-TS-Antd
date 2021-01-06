import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /**设置Button的禁用 */
    disabled?: boolean;
    /**设置Button的尺寸 */
    size?: ButtonSize;
    /**设置Button的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 这是我们的第一个Button组件
 * ## Button header
 * ~~~js
 * import {Button} from "chenlegion"
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
