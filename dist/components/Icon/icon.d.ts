import { FC } from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export declare type ThemProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemProps;
}
/**
 * ## 这是将FFontAwesomeIcon加入自己组件库的Icon
 *~~~js
 * import {Icon} from "chenlegion"
 * ~~~
 */
export declare const Icon: FC<IconProps>;
export default Icon;
