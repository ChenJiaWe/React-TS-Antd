import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
export type ThemProps = "primary" | "secondary"
    | "success" | "info" | "warning" | "danger" | "light" | "dark";

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemProps;
};

/**
 * ## 这是将FFontAwesomeIcon加入自己组件库的Icon
 *~~~js
 * import {Icon} from "chenlegion"
 * ~~~
 */
export const Icon: FC<IconProps> = (props) => {
    //icon-primary
    const { className, theme, ...restProps } = props;
    const classes = classNames("chenlegion-icon", className, {
        [`icon-${theme}`]: theme
    });

    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
};


export default Icon;

