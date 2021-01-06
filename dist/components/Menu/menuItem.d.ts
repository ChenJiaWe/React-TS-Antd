import { CSSProperties, FC } from "react";
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
