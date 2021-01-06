import React, { FC, CSSProperties } from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 *## 导入方式
 * ~~~js
 * import Menu from "chenlegion"
 * import MenuItem from "chenlegion"
 * import SubMenu from "chenlegion"
 * ~~~
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
