import { FC, HTMLAttributes, ReactNode } from "react";
export declare type AlertType = "success" | "default" | "danger" | "warning";
interface BaseAlertProps {
    /** 设置Alert的类型 */
    type?: AlertType;
    /** 设置Alert的标题 */
    title?: ReactNode;
    /** 设置Alert的内容 */
    message?: ReactNode;
    className?: string;
    /** 设置Alert的关闭按钮是否显示 */
    isIcon?: boolean;
}
export declare type AlertProps = BaseAlertProps & HTMLAttributes<HTMLElement>;
/**
 * ## 这是简单的Alert组件
 * ~~~js
 *  import { Alert } from "chenlegion";
 * ~~~
 */
export declare const Alert: FC<AlertProps>;
export default Alert;
