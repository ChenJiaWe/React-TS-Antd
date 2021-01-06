import React, { useState, FC, HTMLAttributes, ReactNode, MouseEvent } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
export type AlertType = "success" | "default"
    | "danger" | "warning";



interface BaseAlertProps {
    /** 设置Alert的类型 */
    type?: AlertType;
    /** 设置Alert的标题 */
    title?: ReactNode ;
    /** 设置Alert的内容 */
    message?: ReactNode ;
    className?: string;
    /** 设置Alert的关闭按钮是否显示 */
    isIcon?: boolean;
}

export type AlertProps = BaseAlertProps & HTMLAttributes<HTMLElement>
/**
 * ## 这是简单的Alert组件
 * ~~~js
 *  import { Alert } from "chenlegion";
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
    const { type, className, title, message, isIcon, onClick, ...restProps } = props;
    const classes = classNames("alert", className, {
        [`alert-${type}`]: type
    });
    const [isShow, setShow] = useState(true);
    const handlerClick = (e: MouseEvent<HTMLElement>) => {
        setShow(!isShow);
        if (onClick) {
            onClick(e);
        }
    }

    return (

        <Transition animation="zoom-in-left" timeout={300} in={isShow}>
            <div className={classes} {...restProps}>
                <div className="alert-content">
                    <div className="alert-tittle">{title}</div>
                    {!!message && <div className="alert-message">{message}</div>}
                </div>
                {isIcon ? <span
                    className="alert-closeIcon" data-testid="test-alertClosed"
                    onClick={handlerClick} ><Icon icon="times"></Icon></span> : null}
            </div>
        </Transition>
    )
}

Alert.defaultProps = {
    type: "default",
    isIcon: true
}

export default Alert;